/**
 * All fixed interface copy. Content lives in the data modules; this file only
 * holds chrome, so a translator can see every string the user can read.
 */
export const ui = {
  siteName: { zh: 'AI·香港30', en: 'AI · HK 30' },
  siteFull: { zh: 'AI·香港30：青年AI科普站', en: 'AI · HK 30 — A Youth AI Science Station' },
  siteTagline: {
    zh: '從「下一詞預測」到智慧城市，和香港一起走進 2027。',
    en: 'From next-token prediction to smart city — walking into 2027 with Hong Kong.',
  },

  nav: {
    timeline: { zh: '時間軸', en: 'Timeline' },
    map: { zh: '成就地圖', en: 'Map' },
    lab: { zh: 'AI 實驗室', en: 'AI Lab' },
    vision: { zh: '願景卡', en: 'Vision' },
    ethics: { zh: '承諾卡', en: 'Commit' },
    sources: { zh: '來源', en: 'Sources' },
  },

  langToggle: { zh: 'EN', en: '繁中' },
  langLabel: { zh: '切換至英文', en: 'Switch to Chinese' },
  menuLabel: { zh: '主選單', en: 'Main menu' },

  hero: {
    kicker: { zh: '香港特別行政區成立 30 周年 · 2027', en: '30th Anniversary of the HKSAR · 2027' },
    countdownLabel: { zh: '距 2027 年 7 月 1 日還有', en: 'Days until 1 July 2027' },
    days: { zh: '日', en: 'days' },
    hours: { zh: '時', en: 'hrs' },
    mins: { zh: '分', en: 'min' },
    secs: { zh: '秒', en: 'sec' },
    ctaPrimary: { zh: '開始探索', en: 'Start exploring' },
    ctaSecondary: { zh: '看成就地圖', en: 'See the map' },
    premise: {
      zh: '五個互動單元：一條三十年的時間軸、一張國家與香港的 AI 成就地圖、一個可以親手訓練的 AI 原理實驗室、一張可以下載的 2027 願景卡，以及一張由你自己訂立的青年承諾卡。',
      en: 'Five interactive units: a thirty-year timeline, a map of national and Hong Kong AI achievements, an AI Principle Lab you train yourself, a downloadable 2027 vision card, and a commitment card you write yourself.',
    },
    rules: {
      zh: '每個數字都附官方來源與查閱日期。沒有登入，不收集個人資料。',
      en: 'Every figure carries an official source and the date it was checked. No sign-in, no personal data collected.',
    },
    scrollHint: { zh: '向下滑動', en: 'Scroll' },
  },

  timeline: {
    title: { zh: '三十年，兩條軌跡', en: 'Thirty years, two tracks' },
    intro: {
      zh: '1997 到 2027，國家的科技實力和香港的創科角色並行推進。左右滑動時間軸，點擊任一節點看它為 2027 留下了甚麼。',
      en: 'From 1997 to 2027, national technological capability and Hong Kong’s innovation role advanced in parallel. Swipe the rail and tap any marker to see what it left for 2027.',
    },
    trackCn: { zh: '國家', en: 'National' },
    trackHk: { zh: '香港', en: 'Hong Kong' },
    filterAll: { zh: '全部', en: 'All' },
    swipeHint: { zh: '滑動 →', en: 'Swipe →' },
    anniversary: { zh: '香港特區成立 30 周年', en: '30th anniversary of the HKSAR' },
    whichTrack: { zh: '軌道', en: 'Track' },
  },

  map: {
    title: { zh: '國家能力，香港角色', en: 'National capability, Hong Kong’s role' },
    intro: {
      zh: '左邊是國家的 AI 能力，右邊是香港正在做的事；連線代表兩者的對接。點擊任何節點，看它的運作原理、國家進展、香港角色、青年機會與官方來源。',
      en: 'National AI capability on the left, what Hong Kong is doing on the right; the lines show how they connect. Tap any node for its mechanism, national progress, Hong Kong role, youth opportunity and official sources.',
    },
    diagramTitle: { zh: '成就連線圖', en: 'Achievement link diagram' },
    diagramNote: {
      zh: '示意圖，非地理邊界。本圖以關係表達「國家能力 → 香港角色」，並非地圖測繪；地理地圖須依《地圖管理條例》使用附審圖號的標準地圖。',
      en: 'Schematic, not a geographic boundary map. This diagram expresses relationships, not survey geography; geographic maps require a standard map carrying a 審圖號 under the Map Regulation.',
    },
    officialMap: { zh: '查閱自然資源部標準地圖', en: 'Open the official standard map service' },
    bandCn: { zh: '國家 AI 能力', en: 'National AI capability' },
    bandHk: { zh: '香港角色', en: 'Hong Kong’s role' },
    viewDiagram: { zh: '連線圖', en: 'Diagram' },
    viewList: { zh: '列表', en: 'List' },
    tapHint: { zh: '點擊節點', en: 'Tap a node' },
    tabs: {
      principle: { zh: '原理', en: 'Mechanism' },
      national: { zh: '國家進展', en: 'National' },
      hkRole: { zh: '香港角色', en: 'HK role' },
      youth: { zh: '青年機會', en: 'For youth' },
      sources: { zh: '官方來源', en: 'Sources' },
    },
    mythLabel: { zh: '迷思與事實', en: 'Myth vs fact' },
    metricAsOf: { zh: '截至', en: 'as of' },
    close: { zh: '關閉', en: 'Close' },
    detailLabel: { zh: '節點詳情', en: 'Node detail' },
    nationalLabel: { zh: '國家', en: 'National' },
    hkLabel: { zh: '香港', en: 'Hong Kong' },
    hkMapTitle: { zh: '香港 AI 中心位置示意', en: 'Where Hong Kong’s AI hubs are located' },
    hkMapTap: { zh: '點擊地圖上的號碼查看詳情', en: 'Tap a number on the map for details' },
    hkMapNote: {
      zh: '示意圖，非精確測繪：輪廓與位置僅表示大致方位。如需精確地理地圖，須使用附審圖號的標準地圖。',
      en: 'Schematic, not a survey map: the outline and positions show approximate location only. For a precise geographic map, use a standard map carrying an official 審圖號.',
    },
    hkMapLoc: {
      sciencePark: { zh: '科學園', en: 'Science Park' },
      cyberport: { zh: '數碼港', en: 'Cyberport' },
      lokMaChau: { zh: '落馬洲河套', en: 'Lok Ma Chau Loop' },
      northernMetro: { zh: '北部都會區', en: 'Northern Metropolis' },
    },
    shenzhen: { zh: '深圳', en: 'Shenzhen' },
    nt: { zh: '新界', en: 'New Territories' },
    kowloon: { zh: '九龍', en: 'Kowloon' },
    hkIsland: { zh: '香港島', en: 'Hong Kong Island' },
    lantau: { zh: '大嶼山', en: 'Lantau' },
  },

  lab: {
    title: { zh: 'AI 原理實驗室', en: 'AI Principle Lab' },
    intro: {
      zh: '親手教一個分類器分辨兩種食物：為每類上傳 5–10 張圖片，看它如何「學習」，再用一張新圖片測試。模型在你的瀏覽器內運行，圖片不會離開這部裝置。',
      en: 'Teach a classifier to tell two foods apart: upload 5–10 images per class, watch it learn, then test it with a new photo. The model runs in your browser — images never leave this device.',
    },
    disclaimer: { zh: 'AI 預測是概率性的，並非確定。', en: 'AI predictions are probabilistic, not certain.' },
    howTitle: { zh: '如何運作', en: 'How it works' },
    how: {
      zh: '先用 MobileNet 把每張圖片壓成特徵向量，再在瀏覽器內訓練一個小型分類器。特徵提取、訓練與預測全部在本機完成。',
      en: 'MobileNet turns each image into a feature vector, then a small classifier is trained in the browser. Feature extraction, training and prediction all happen on this device.',
    },
    classLabel: { zh: '類別', en: 'Class' },
    addImages: { zh: '上傳圖片', en: 'Add images' },
    addImagesHint: { zh: '每類 5–10 張', en: '5–10 per class' },
    count: { zh: '{n} 張', en: '{n} images' },
    emptyHint: { zh: '尚未上傳圖片', en: 'No images yet' },
    full: { zh: '已達上限', en: 'Limit reached' },
    removeImage: { zh: '移除圖片', en: 'Remove image' },
    minHint: { zh: '每類至少上傳 5 張圖片才能開始訓練。', en: 'Upload at least 5 images per class to start training.' },
    train: { zh: '開始訓練', en: 'Start training' },
    retrain: { zh: '重新訓練', en: 'Retrain' },
    reset: { zh: '清空重來', en: 'Reset' },
    loadingModel: { zh: '載入模型…', en: 'Loading model…' },
    extracting: { zh: '提取特徵', en: 'Extracting features' },
    epoch: { zh: '第 {e}/{n} 輪', en: 'Epoch {e}/{n}' },
    loss: { zh: '損失', en: 'loss' },
    accuracy: { zh: '準確率', en: 'accuracy' },
    done: { zh: '訓練完成', en: 'Training complete' },
    errorModel: {
      zh: '無法載入模型，請檢查網絡連線後重試。',
      en: 'Could not load the model. Check your connection and try again.',
    },
    errorGeneric: { zh: '發生錯誤，請重試。', en: 'Something went wrong — please retry.' },
    testTitle: { zh: '用新圖片測試', en: 'Test with a new image' },
    testHint: { zh: '上傳一張沒用於訓練的圖片', en: 'Upload a photo you did not use for training' },
    testPreview: { zh: '測試圖片預覽', en: 'Test image preview' },
    testButton: { zh: '選擇測試圖片', en: 'Choose test image' },
    analyzing: { zh: '分析中…', en: 'Analyzing…' },
    noTestYet: { zh: '上傳一張測試圖片', en: 'Upload a test image' },
    trainFirst: { zh: '先訓練模型', en: 'Train the model first' },
    awaitTest: {
      zh: '訓練完成後，用一張新圖片看模型怎麼判斷。',
      en: 'Once trained, test with a new image to see how the model decides.',
    },
    prediction: { zh: '預測：', en: 'Prediction: ' },
    confidence: { zh: '信心', en: 'confidence' },
    uncertain: { zh: '兩個分數接近，AI 沒有把握。', en: 'The two scores are close — the AI is unsure.' },
    privacy: {
      zh: '圖片只用於本機訓練與測試，不會上載、不會儲存。',
      en: 'Images are used for on-device training and testing only; not uploaded, not stored.',
    },
  },

  vision: {
    title: { zh: '你的 2027 願景卡', en: 'Your 2027 vision card' },
    intro: {
      zh: '選一個 2027 年的場景，看它要解決的社會問題，然後生成一張可下載的願景卡。卡上的畫面是設想，不是已經發生的事。',
      en: 'Choose a 2027 scenario, read the social problem it addresses, then generate a downloadable vision card. The picture is a proposal, not a record of something that happened.',
    },
    pick: { zh: '選擇場景', en: 'Choose a scenario' },
    problem: { zh: '要解決的問題', en: 'The problem' },
    youthAction: { zh: '青年可以做甚麼', en: 'What youth can do' },
    nameLabel: { zh: '你的名字（可留空）', en: 'Your name (optional)' },
    namePlaceholder: { zh: '例如：陳小美', en: 'e.g. Mei Chan' },
    nameNote: {
      zh: '只留在這部裝置上，不會上載、不會儲存。',
      en: 'Stays on this device. Not uploaded, not stored.',
    },
    generate: { zh: '生成願景卡', en: 'Generate card' },
    regenerate: { zh: '重新生成', en: 'Regenerate' },
    download: { zh: '下載 PNG', en: 'Download PNG' },
    downloadHint: {
      zh: '若下載沒有反應，長按下方圖片選擇「儲存影像」。',
      en: 'If the download does nothing, long-press the image and choose “Save Image”.',
    },
    cardTag: { zh: '2027 願景 · 設想', en: '2027 vision · a proposal' },
    fictional: {
      zh: '本卡為科普設想，非既成事實。',
      en: 'A science-communication proposal, not an established fact.',
    },
    canvasAlt: { zh: '2027 願景卡預覽', en: '2027 vision card preview' },
  },

  ethics: {
    title: { zh: '青年 AI 倫理承諾卡', en: 'Youth AI ethics commitment card' },
    intro: {
      zh: '五條承諾，是可以用得著的判斷。勾選至少四條，生成一張屬於你的承諾卡——這是這個網站唯一會寫上你名字的地方。',
      en: 'Five commitments you can actually use. Tick at least four to generate your card — the only place on this site your name appears.',
    },
    why: { zh: '為甚麼', en: 'Why' },
    counter: { zh: '已選', en: 'Selected' },
    needMore: { zh: '再選 {n} 條即可生成', en: 'Select {n} more to unlock' },
    ready: { zh: '可以生成承諾卡了', en: 'Ready to generate' },
    make: { zh: '生成承諾卡', en: 'Generate commitment card' },
    nameLabel: { zh: '你的名字', en: 'Your name' },
    namePlaceholder: { zh: '簽署用', en: 'to sign' },
    dateLabel: { zh: '日期', en: 'Date' },
    statement: {
      zh: '我明白 AI 會出錯，而我會為自己使用它的方式負責。',
      en: 'I understand AI can be wrong, and I take responsibility for how I use it.',
    },
    cardTag: { zh: '青年 AI 承諾', en: 'Youth AI commitment' },
    canvasAlt: { zh: '承諾卡預覽', en: 'Commitment card preview' },
    note: {
      zh: '本卡由你自行訂立，非任何機構發出。',
      en: 'Self-declared; not issued by any organisation.',
    },
    selectAll: { zh: '全選', en: 'Select all' },
    clear: { zh: '清除', en: 'Clear' },
  },

  sources: {
    title: { zh: '關於與來源', en: 'About & sources' },
    intro: {
      zh: '這個網站的所有事實陳述都指向下列官方公開資料。表格列出機構、資料名稱、查閱日期與連結；你可以在任何一個節點旁找到對應編號。',
      en: 'Every factual claim on this site points to the official public material below: organisation, document, date checked and link. Each node shows the matching number.',
    },
    methodTitle: { zh: '資料方法', en: 'Method' },
    method: {
      zh: '只採用政府、大學及法定機構的公開資料。無法在官方頁面核實的數字不會出現在網站上；時間敏感的數字會標明「截至」的年月。全站不連接任何第三方 API，所有內容隨網站一併載入，因此離線亦可閱讀。',
      en: 'Only public material from government, universities and statutory bodies is used. Figures that could not be verified on an official page are omitted; time-sensitive figures carry an “as of” month. The site calls no third-party API — all content ships with the site, so it also reads offline.',
    },
    aiTitle: { zh: 'AI 生成內容標註', en: 'AI-generated content' },
    ai: {
      zh: '本網站的介面、圖示、連線圖與卡片圖案均由程式即時繪製，不含第三方照片或圖庫素材。文字與資料經人手核對後輸入；AI 工具曾用於協助起草與檢查，最終內容由參賽者負責。願景卡畫面為設想，並非真實照片。',
      en: 'The interface, icons, link diagram and card artwork are drawn live by code; no third-party photography or stock assets are used. Copy and data were checked by hand before entry; AI tools assisted with drafting and checking, and the entrant is responsible for the final content. Vision-card artwork is a proposal, not a photograph.',
    },
    privacyTitle: { zh: '私隱', en: 'Privacy' },
    privacy: {
      zh: '沒有帳戶、沒有表格提交、沒有追蹤碼。你輸入的名字只存在瀏覽器記憶體中，重新載入即消失；語言偏好會存在瀏覽器本機，僅用於記住你的選擇。',
      en: 'No accounts, no form submissions, no trackers. A name you type exists only in browser memory and disappears on reload; your language preference is stored locally, only to remember your choice.',
    },
    licenceTitle: { zh: '原創與版權', en: 'Originality & rights' },
    licence: {
      zh: '介面與圖表為原創程式碼繪製。引用官方資料時以連結與查閱日期標示，不複製其圖像。地圖部分為關係示意圖，並非測繪地圖；如需地理地圖，應使用附審圖號的標準地圖。',
      en: 'Interface and diagrams are drawn by original code. Quoted official material is referenced by link and date-checked, not reproduced as imagery. The map is a relationship diagram, not a survey map; any geographic map should use a standard map carrying a 審圖號.',
    },
    tableOrg: { zh: '機構', en: 'Organisation' },
    tableDoc: { zh: '資料', en: 'Document' },
    tableAccessed: { zh: '查閱日期', en: 'Checked' },
    tableLink: { zh: '連結', en: 'Link' },
    open: { zh: '開啟', en: 'Open' },
    empty: { zh: '暫無', en: '—' },
  },

  footer: {
    built: {
      zh: '「夢溪少年談」國家成就科普計劃 2026 · 青少年創科實踐挑戰賽（公開組）參賽作品',
      en: 'Entry for the 2026 Youth Innovation Challenge (Open Division), National Achievement Science Popularisation Programme',
    },
    theme: { zh: '主題：人工智能', en: 'Theme: Artificial intelligence' },
    noTrack: { zh: '本網站不使用追蹤碼或第三方 API。', en: 'No trackers and no third-party APIs.' },
    backTop: { zh: '回到頂部', en: 'Back to top' },
  },

  a11y: {
    skip: { zh: '跳至主要內容', en: 'Skip to main content' },
    citeRef: { zh: '來源', en: 'Source' },
    opensNew: { zh: '在新視窗開啟', en: 'opens in a new tab' },
  },
} satisfies Record<string, unknown>
