// Related news articles and videos, keyed by node/milestone id. These are
// external links that open in a new tab — no runtime fetch, so the site stays
// offline-capable apart from these opt-in links.
import type { Bi } from './types'

export interface MediaLink {
  label: Bi
  url: string
  kind: 'video' | 'news'
}

const BLUEPRINT: MediaLink = {
  label: { zh: '《香港創新科技發展藍圖》公布', en: 'Hong Kong I&T Development Blueprint announced' },
  url: 'https://www.news.gov.hk/chi/2022/12/20221222/20221222_150544_916.html',
  kind: 'news',
}

const HKGAI_V1: MediaLink = {
  label: { zh: '港產大模型 HKGAI V1 全球首發', en: 'HKGAI V1, Hong Kong’s own LLM, launched' },
  url: 'https://www.youtube.com/watch?v=TIHz4hrQnXg',
  kind: 'video',
}

const AISC: MediaLink = {
  label: { zh: '數碼港人工智能超算中心開幕', en: 'AI Supercomputing Centre opens at Cyberport' },
  url: 'https://www.youtube.com/watch?v=xcXCj_iITb0',
  kind: 'video',
}

const HSITP: MediaLink = {
  label: { zh: '河套香港園區正式開園', en: 'HK Park of the I&T Co-operation Zone opens' },
  url: 'https://www.facebook.com/govnews.hk/videos/665755323287630/',
  kind: 'video',
}

const WAICO: MediaLink = {
  label: { zh: '世界人工智能合作組織在上海成立', en: 'World AI Cooperation Organization established in Shanghai' },
  url: 'https://news.tvb.com/tc/1183260-29%E5%9C%8B%E4%B8%8A%E6%B5%B7%E7%B0%BD%E7%B4%84%E6%88%90%E7%AB%8B%E4%B8%96%E7%95%8C%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E5%90%88%E4%BD%9C%E7%B5%84%E7%B9%94%E6%97%A8%E5%9C%A8%E4%BF%83%E9%80%B2AI%E5%9C%8B%E9%9A%9B%E5%90%88%E4%BD%9C%E5%8F%8A%E5%85%A8%E7%90%83%E6%B2%BB%E7%90%86',
  kind: 'news',
}

export const mediaByNode: Record<string, MediaLink[]> = {
  'node-hkgai': [HKGAI_V1],
  'node-aisc': [AISC],
  'node-hsitp': [HSITP],
  'node-governance': [WAICO],
}

export const mediaByMilestone: Record<string, MediaLink[]> = {
  'hk-2022-blueprint': [BLUEPRINT],
  'hk-2025-hkgaiv1': [HKGAI_V1],
  'hk-2024-aisc': [AISC],
  'hk-2025-hsitp': [HSITP],
  'cn-2026-waico': [WAICO],
}
