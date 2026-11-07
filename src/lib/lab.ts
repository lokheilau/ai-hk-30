/**
 * AI Principle Lab — in-browser transfer learning.
 *
 * Everything here runs on the user's device: MobileNet turns each uploaded
 * photo into a feature vector, then a tiny softmax head is trained on those
 * vectors with tfjs `fit()`. No image ever leaves the browser.
 *
 * TensorFlow.js and MobileNet are imported *lazily* (dynamic import), so the
 * heavy runtime only downloads when the lab is actually used and never bloats
 * the initial page. The MobileNet weights themselves are fetched once from the
 * official Google tfjs-models CDN the first time training starts; after that,
 * feature extraction, training and prediction are all local compute.
 *
 * `import type` is erased at compile time, so none of the tfjs types pull the
 * runtime into the main bundle.
 */
import type * as tf from '@tensorflow/tfjs'
import type { MobileNet } from '@tensorflow-models/mobilenet'

export interface TfBundle {
  tf: typeof import('@tensorflow/tfjs')
  net: MobileNet
}

export interface TrainProgress {
  epoch: number
  epochs: number
  loss: number
  acc: number
}

let bundlePromise: Promise<TfBundle> | null = null

async function initTf(tfMod: typeof import('@tensorflow/tfjs')): Promise<void> {
  // Prefer WebGL for speed; fall back to CPU when a context cannot be created
  // (some mobile browsers). A handful of images is fast on CPU either way.
  try {
    if (await tfMod.setBackend('webgl')) {
      await tfMod.ready()
      return
    }
  } catch {
    /* fall through to CPU */
  }
  await tfMod.setBackend('cpu')
  await tfMod.ready()
}

async function loadBundle(): Promise<TfBundle> {
  const tfMod = await import('@tensorflow/tfjs')
  const mobilenet = await import('@tensorflow-models/mobilenet')
  await initTf(tfMod)
  // MobileNet v1 @ alpha 0.25: ~1.7 MB weights, ample for a two-class food
  // demo and light on a phone. v1's embedding layer always has 1024 units.
  const net = await mobilenet.load({ version: 1, alpha: 0.25 })
  return { tf: tfMod, net }
}

/** Load (once) and reuse the MobileNet feature extractor across the session. */
export function getBundle(): Promise<TfBundle> {
  if (!bundlePromise) bundlePromise = loadBundle()
  return bundlePromise
}

/**
 * Decode a File into a drawable source. Uses `createImageBitmap` with EXIF
 * orientation when the browser supports it (so phone photos are upright), and
 * falls back to a plain <img> otherwise.
 */
export async function fileToImage(file: File): Promise<HTMLCanvasElement | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
      const canvas = document.createElement('canvas')
      canvas.width = bmp.width
      canvas.height = bmp.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(bmp, 0, 0)
        bmp.close()
        return canvas
      }
      bmp.close()
    } catch {
      /* fall through to <img> below */
    }
  }
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('decode-failed'))
    }
    img.src = url
  })
}

/** Run one image through MobileNet and return its embedding vector. */
export function embeddingOf(
  bundle: TfBundle,
  img: HTMLCanvasElement | HTMLImageElement,
): Float32Array {
  const emb = bundle.net.infer(img as HTMLCanvasElement, true)
  const data = Float32Array.from(emb.dataSync())
  emb.dispose()
  return data
}

/** Train a small softmax head on pre-extracted embeddings. */
export async function trainHead(
  bundle: TfBundle,
  xs: Float32Array[],
  ys: number[][],
  onEpoch: (p: TrainProgress) => void,
): Promise<tf.LayersModel> {
  const dim = xs[0].length
  const classes = ys[0].length
  const xTensor = bundle.tf.tensor2d(xs.map((a) => Array.from(a)), [xs.length, dim])
  const yTensor = bundle.tf.tensor2d(ys, [ys.length, classes])

  const head = bundle.tf.sequential()
  head.add(bundle.tf.layers.dense({ units: 64, activation: 'relu', inputShape: [dim] }))
  head.add(bundle.tf.layers.dropout({ rate: 0.2 }))
  head.add(bundle.tf.layers.dense({ units: classes, activation: 'softmax' }))
  head.compile({
    optimizer: bundle.tf.train.adam(0.002),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  })

  const epochs = 50
  await head.fit(xTensor, yTensor, {
    epochs,
    batchSize: Math.min(8, xs.length),
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        onEpoch({ epoch: epoch + 1, epochs, loss: logs?.loss ?? 0, acc: logs?.acc ?? 0 }),
    },
  })

  xTensor.dispose()
  yTensor.dispose()
  return head
}

/** Predict per-class probabilities for one image. */
export function predictHead(
  bundle: TfBundle,
  head: tf.LayersModel,
  emb: Float32Array,
): number[] {
  const input = bundle.tf.tensor2d([Array.from(emb)], [1, emb.length])
  const out = head.predict(input) as tf.Tensor
  const probs = Array.from(out.dataSync())
  input.dispose()
  out.dispose()
  return probs
}

export function disposeModel(model: tf.LayersModel | null): void {
  model?.dispose()
}
