/**
 * Site UI languages (aligned with the extension).
 * Preference: gleaner.siteLang = one of SITE_LANGS | 'auto'.
 * Privacy body panels: zh → Chinese text, all others → English text.
 */
(function () {
  var STORAGE = 'gleaner.siteLang';
  var LEGACY = 'gleaner.policyLang';

  var SITE_LANGS = [
    'en',
    'zh',
    'ja',
    'ko',
    'de',
    'fr',
    'es',
    'pt',
    'ar',
    'ru',
  ];
  var SITE_LANG_SET = {};
  SITE_LANGS.forEach(function (l) {
    SITE_LANG_SET[l] = true;
  });

  var LOCALE_TAGS = {
    en: 'en',
    zh: 'zh-CN',
    ja: 'ja',
    ko: 'ko',
    de: 'de',
    fr: 'fr',
    es: 'es',
    pt: 'pt',
    ar: 'ar',
    ru: 'ru',
  };

  var BROWSER_PREFIX = [
    { lang: 'zh', prefix: 'zh' },
    { lang: 'ja', prefix: 'ja' },
    { lang: 'ko', prefix: 'ko' },
    { lang: 'de', prefix: 'de' },
    { lang: 'fr', prefix: 'fr' },
    { lang: 'es', prefix: 'es' },
    { lang: 'pt', prefix: 'pt' },
    { lang: 'ar', prefix: 'ar' },
    { lang: 'ru', prefix: 'ru' },
  ];

  /** Compact SVG flags (emoji flags often render as letters on Windows). */
  var FLAG_SVG = {
    en:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="14" fill="#B22234"/><path fill="#fff" d="M0 1.08h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0z"/><rect width="8.4" height="7.56" fill="#3C3B6E"/></svg>',
    zh:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="14" fill="#DE2910"/><path fill="#FFDE00" d="M4.2 3.2 4.7 4.7 6.2 4.7 5 5.6 5.4 7.1 4.2 6.2 3 7.1 3.4 5.6 2.2 4.7 3.7 4.7Z"/></svg>',
    ja:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><circle cx="10" cy="7" r="3.15" fill="#BC002D"/></svg>',
    ko:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><circle cx="10" cy="7" r="3.2" fill="#CD2E3A"/><path d="M10 3.8a3.2 3.2 0 0 1 0 6.4 1.6 1.6 0 0 1 0-3.2 1.6 1.6 0 0 0 0-3.2Z" fill="#0047A0"/></svg>',
    de:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="4.67" fill="#000"/><rect y="4.67" width="20" height="4.67" fill="#D00"/><rect y="9.34" width="20" height="4.66" fill="#FFCE00"/></svg>',
    fr:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="6.67" height="14" fill="#002395"/><rect x="6.67" width="6.67" height="14" fill="#fff"/><rect x="13.34" width="6.66" height="14" fill="#ED2939"/></svg>',
    es:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="14" fill="#C60B1E"/><rect y="3.5" width="20" height="7" fill="#FFC400"/></svg>',
    pt:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="14" fill="#FF0000"/><rect width="8" height="14" fill="#006600"/><circle cx="8" cy="7" r="2.35" fill="#FFCC00"/></svg>',
    ar:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="14" fill="#006C35"/><rect x="3" y="6.2" width="14" height="1.6" rx="0.3" fill="#fff"/></svg>',
    ru:
      '<svg viewBox="0 0 20 14" width="18" height="12" aria-hidden="true"><rect width="20" height="4.67" fill="#fff"/><rect y="4.67" width="20" height="4.67" fill="#0039A6"/><rect y="9.34" width="20" height="4.66" fill="#D52B1E"/></svg>',
  };

  var LANG_LABEL = {
    en: 'English',
    zh: '中文',
    ja: '日本語',
    ko: '한국어',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    pt: 'Português',
    ar: 'العربية',
    ru: 'Русский',
  };

  var en = {
    navCommunity: 'Community',
    navProduct: 'Product',
    navPrivacy: 'Privacy',
    navSupport: 'Support',
    navHome: 'Home',
    navContact: 'Contact',
    langGroup: 'Language',
    heroTitle: 'English, gathered from the pages you already love.',
    heroLead:
      'Highlight a word. Keep the sentence. Review later. Export to Anki when you are ready — calm tools for curious readers.',
    ctaChrome: 'Add to Chrome',
    ctaCommunity: 'See who’s learning',
    ctaPrivacy: 'Privacy, plainly',
    productTitle: 'Designed to disappear into reading.',
    productLead:
      'Gleaner stays out of the way until you need it — then captures just enough context to remember why a word mattered.',
    featSelectTitle: 'Select & save',
    featSelectBody: 'Words, phrases, and sentences — with the line you found them in.',
    featReviewTitle: 'Review quietly',
    featReviewBody: 'A side panel for glosses, notes, and a light vocab check.',
    featExportTitle: 'Export to Anki',
    featExportBody: 'When you want spaced repetition, take your deck with you.',
    communityTitle: 'One planet. Many readers.',
    communityLead:
      'Soft lights mark countries where someone used Gleaner recently — a reminder that we share the same Earth, learning in parallel. Drag to spin, scroll to zoom.',
    mapLoading: 'Loading presence…',
    mapNote:
      'This map stays at country or region level only. It shows anonymous activity in aggregate: no city detail, no precise location from network addresses, and no names, so no user can be identified from the globe. When the page opens, Earth gently turns toward a familiar side of the world to make browsing easier. Color roughly reflects average daily anonymous check-ins by country or region over the last fourteen days, and you can turn that sharing off in the extension settings.',
    mapBorders: 'Borders',
    mapSatellite: 'Satellite',
    mapLegendFewer: 'Fewer active',
    mapLegendMore: 'More active',
    mapHint: 'Drag to spin · Scroll to zoom · Color ≈ active learners by country/region',
    mapEarthLabel: 'Interactive Earth with anonymous country/region-level activity',
    mapGlobeLoading: 'Loading Earth…',
    mapGlobeFail:
      'Could not load the 3D Earth (network/CDN). Hard-refresh or try another network.',
    mapStatFail: 'Unable to load the interactive Earth <span>· try refreshing</span>',
    mapStatEmpty: 'Waiting for the first sparks <span>· country/region-level only</span>',
    mapStatReady:
      '{countries} regions · ~{learners} active <span>· daily avg, last 14 days</span>',
    mapPointHits: '~{hits} active / day',
    footerStore: 'Chrome Web Store',
    footerPrivacy: 'Privacy Policy',
    footerContact: 'Contact',
    policyKicker: 'Spolora · Gleaner',
    policyLead:
      'Cards stay on your device by default. Sign-in is optional. When a lookup needs the network, we only send the text you selected — not your browsing history.',
    policyMeta: 'Last updated: November 12, 2026',
    policySum1: 'Local-first by default',
    policySum2: 'Offline English lexicon on device',
    policySum3: 'No sale of your data',
    policySum4: 'Optional sign-in sync',
    policyBodyNote:
      'Full policy text below is shown in English (or Chinese when that language is selected).',
    docTitleHome: 'Gleaner · Learn English where you already read',
    docTitlePrivacy: 'Gleaner Privacy Policy',
    metaHome:
      'Gleaner by Spolora — save English words while you read, review in a side panel, export to Anki. A quiet community of learners on one shared planet.',
  };

  function pack(overrides) {
    var out = {};
    var k;
    for (k in en) {
      if (Object.prototype.hasOwnProperty.call(en, k)) out[k] = en[k];
    }
    for (k in overrides) {
      if (Object.prototype.hasOwnProperty.call(overrides, k)) out[k] = overrides[k];
    }
    return out;
  }

  var dict = {
    en: en,
    zh: pack({
      navCommunity: '社区',
      navProduct: '产品',
      navPrivacy: '隐私',
      navSupport: '支持',
      navHome: '首页',
      navContact: '联系',
      langGroup: '语言',
      heroTitle: '从你本来就爱读的页面里，拾起英语',
      heroLead:
        '划一个词，留下整句；稍后再复习，需要时导出到 Anki——安静地陪你阅读',
      ctaChrome: '添加到 Chrome',
      ctaCommunity: '看看谁在学',
      ctaPrivacy: '隐私说明',
      productTitle: '为阅读而隐身',
      productLead: '平时不打扰；需要时记下刚好够让你想起「为什么记住这个词」的语境',
      featSelectTitle: '划选收藏',
      featSelectBody: '单词、短语与句子——连同你读到的那一行一起留下',
      featReviewTitle: '安静复习',
      featReviewBody: '侧边栏查看释义、笔记，也可做一次轻量词汇自测',
      featExportTitle: '导出 Anki',
      featExportBody: '想用间隔复习时，把牌组带走即可',
      communityTitle: '同一个地球，许多读者',
      communityLead:
        '柔和的光点标出近期有人使用 Gleaner 的国家——提醒我们在同一颗星球上并行学习；拖动旋转，滚轮缩放',
      mapLoading: '正在加载活跃数据…',
      mapNote:
        '仅到国家（地区）级别，地图只汇总国家或地区维度的匿名活跃，不会落到城市，也不会根据ip精确定位，更不会显示任何姓名，因此无法从这张图认出具体的用户。打开页面时，地球会先大致转到与您相近的一面，方便您从熟悉的方位开始浏览。颜色深浅约等于各国（地区）近十四日匿名签到的日均活跃，也可在扩展设置中关闭该分享',
      mapBorders: '国界',
      mapSatellite: '卫星',
      mapLegendFewer: '较少活跃',
      mapLegendMore: '较多活跃',
      mapHint: '拖动旋转 · 滚轮缩放 · 颜色 ≈ 各国（地区）活跃学习者',
      mapEarthLabel: '带匿名国家（地区）级活跃的交互地球',
      mapGlobeLoading: '正在加载地球…',
      mapGlobeFail: '无法加载三维地球（网络/CDN）；请强制刷新或换网络再试',
      mapStatFail: '无法加载交互地球 <span>· 请刷新重试</span>',
      mapStatEmpty: '等待第一批光点 <span>· 仅国家（地区）级</span>',
      mapStatReady: '{countries} 个地区 · 约 {learners} 活跃 <span>· 近 14 日日均</span>',
      mapPointHits: '约 {hits} 活跃 / 日',
      footerStore: 'Chrome 应用商店',
      footerPrivacy: '隐私政策',
      footerContact: '联系',
      policyLead:
        '卡片默认只留在本机；登录可选；需要联网查词时，我们只发送你划选的文本——不会上传浏览历史',
      policyMeta: '最近更新：2026 年 11 月 12 日',
      policySum1: '默认本地优先',
      policySum2: '本机离线英语词库',
      policySum3: '不出售你的数据',
      policySum4: '可选登录同步',
      policyBodyNote: '下方正文为完整中文隐私政策。',
      docTitleHome: 'Gleaner · 在你本来阅读的地方学英语',
      docTitlePrivacy: 'Gleaner 隐私政策',
      metaHome:
        'Spolora 出品的 Gleaner——边读边收藏英语单词，侧边栏复习，可导出 Anki；同一颗星球上的安静学习者社区',
    }),
    ja: pack({
      navCommunity: 'コミュニティ',
      navProduct: 'プロダクト',
      navPrivacy: 'プライバシー',
      navSupport: 'サポート',
      navHome: 'ホーム',
      navContact: 'お問い合わせ',
      langGroup: '言語',
      heroTitle: 'いつもの読書のページから、英語を拾う',
      heroLead:
        '単語をハイライトし、文ごと残す。あとで復習し、必要なら Anki へ——静かに読書に寄り添う',
      ctaChrome: 'Chrome に追加',
      ctaCommunity: '誰が学んでいるか見る',
      ctaPrivacy: 'プライバシーについて',
      productTitle: '読書の邪魔をしないために',
      productLead:
        '普段は静か。必要なときだけ、その語を覚えた理由が残るだけの文脈を残します',
      featSelectTitle: '選択して保存',
      featSelectBody: '単語・フレーズ・文——出会った一文ごと',
      featReviewTitle: '静かに復習',
      featReviewBody: 'サイドパネルで訳・メモ・軽い語彙チェック',
      featExportTitle: 'Anki へ書き出し',
      featExportBody: '間隔反復が必要なら、デッキをそのまま持ち出せます',
      communityTitle: 'ひとつの地球、多くの読者',
      communityLead:
        '最近 Gleaner が使われた国をやわらかい光で示します。ドラッグで回転、スクロールでズーム',
      mapLoading: 'アクティブデータを読み込み中…',
      mapNote:
        '地図は国・地域レベルの匿名アクティビティのみ。都市や個人は特定できません。色の濃さは直近14日の日次平均に近い値です。拡張の設定で共有をオフにできます',
      mapBorders: '国境',
      mapSatellite: '衛星',
      mapLegendFewer: '少ない',
      mapLegendMore: '多い',
      mapHint: 'ドラッグで回転 · スクロールでズーム · 色 ≈ 国/地域の学習者',
      mapEarthLabel: '匿名の国・地域アクティビティ付きの地球',
      mapGlobeLoading: '地球を読み込み中…',
      mapGlobeFail: '3D地球を読み込めませんでした。再読み込みするか別のネットワークを試してください',
      mapStatFail: '地球を表示できません <span>· 再読み込み</span>',
      mapStatEmpty: '最初の光を待っています <span>· 国/地域レベルのみ</span>',
      mapStatReady: '{countries} 地域 · 約 {learners} アクティブ <span>· 直近14日の日次平均</span>',
      mapPointHits: '約 {hits} / 日',
      footerStore: 'Chrome ウェブストア',
      footerPrivacy: 'プライバシーポリシー',
      footerContact: 'お問い合わせ',
      policyLead:
        'カードは既定で端末内。サインインは任意。ネット検索が必要なとき送るのは選択したテキストだけです',
      policyMeta: '最終更新：2026年11月12日',
      policySum1: 'ローカル優先',
      policySum2: '端末内の英語レキシコン',
      policySum3: 'データの販売なし',
      policySum4: '任意の同期',
      policyBodyNote: '以下の全文は英語（または中国語選択時は中国語）で表示されます。',
      docTitleHome: 'Gleaner · いつもの読書の場所で英語を',
      docTitlePrivacy: 'Gleaner プライバシーポリシー',
      metaHome:
        'Spolora の Gleaner——読みながら英語を保存、サイドパネルで復習、Anki へ書き出し',
    }),
    ko: pack({
      navCommunity: '커뮤니티',
      navProduct: '제품',
      navPrivacy: '개인정보',
      navSupport: '지원',
      navHome: '홈',
      navContact: '문의',
      langGroup: '언어',
      heroTitle: '이미 읽는 페이지에서 영어를 거두세요',
      heroLead:
        '단어를 하이라이트하고 문장을 남기세요. 나중에 복습하고, 필요하면 Anki로——조용히 독서를 돕습니다',
      ctaChrome: 'Chrome에 추가',
      ctaCommunity: '누가 배우는지 보기',
      ctaPrivacy: '개인정보 안내',
      productTitle: '독서에 스며들도록',
      productLead:
        '평소엔 방해하지 않고, 필요할 때 그 단어를 기억할 만큼의 맥락만 남깁니다',
      featSelectTitle: '선택 & 저장',
      featSelectBody: '단어·구·문장—만난 그 줄과 함께',
      featReviewTitle: '조용한 복습',
      featReviewBody: '사이드패널에서 뜻·메모·가벼운 어휘 점검',
      featExportTitle: 'Anki보내기',
      featExportBody: '간격 반복이 필요하면 덱을 그대로 가져가세요',
      communityTitle: '하나의 지구, 많은 독자',
      communityLead:
        '최근에 Gleaner를 쓴 나라를 부드러운 빛으로 표시합니다. 드래그로 회전, 스크롤로 확대',
      mapLoading: '활동 데이터 불러오는 중…',
      mapNote:
        '지도는 국가/지역 단위의 익명 활동만 보여 줍니다. 도시·개인은 식별되지 않습니다. 색은 최근 14일 일평균에 가깝습니다. 확장 설정에서 공유를 끌 수 있습니다',
      mapBorders: '국경',
      mapSatellite: '위성',
      mapLegendFewer: '적음',
      mapLegendMore: '많음',
      mapHint: '드래그로 회전 · 스크롤로 확대 · 색 ≈ 국가/지역 학습자',
      mapEarthLabel: '익명 국가/지역 활동이 표시된 지구',
      mapGlobeLoading: '지구 불러오는 중…',
      mapGlobeFail: '3D 지구를 불러오지 못했습니다. 새로고침하거나 다른 네트워크를 시도하세요',
      mapStatFail: '지구를 표시할 수 없음 <span>· 새로고침</span>',
      mapStatEmpty: '첫 불빛을 기다리는 중 <span>· 국가/지역만</span>',
      mapStatReady: '{countries}개 지역 · 약 {learners} 활성 <span>· 최근 14일 일평균</span>',
      mapPointHits: '약 {hits} / 일',
      footerStore: 'Chrome 웹 스토어',
      footerPrivacy: '개인정보 처리방침',
      footerContact: '문의',
      policyLead:
        '카드는 기본적으로 기기에만 남습니다. 로그인은 선택 사항이며, 네트워크 조회 시 선택한 텍스트만 전송합니다',
      policyMeta: '최종 업데이트: 2026년 11월 12일',
      policySum1: '로컬 우선',
      policySum2: '기기 내 영어 사전',
      policySum3: '데이터 판매 없음',
      policySum4: '선택적 동기화',
      policyBodyNote: '아래 전문은 영어(중국어 선택 시 중국어)로 표시됩니다.',
      docTitleHome: 'Gleaner · 이미 읽는 곳에서 영어를',
      docTitlePrivacy: 'Gleaner 개인정보 처리방침',
      metaHome:
        'Spolora의 Gleaner—읽으며 영어를 저장하고, 사이드패널에서 복습하며, Anki로 내보냅니다',
    }),
    de: pack({
      navCommunity: 'Community',
      navProduct: 'Produkt',
      navPrivacy: 'Datenschutz',
      navSupport: 'Support',
      navHome: 'Start',
      navContact: 'Kontakt',
      langGroup: 'Sprache',
      heroTitle: 'Englisch von den Seiten, die du ohnehin liest.',
      heroLead:
        'Wort markieren, Satz behalten, später wiederholen, bei Bedarf nach Anki exportieren — ruhige Werkzeuge für neugierige Leser.',
      ctaChrome: 'Zu Chrome hinzufügen',
      ctaCommunity: 'Wer lernt gerade?',
      ctaPrivacy: 'Datenschutz, klar',
      productTitle: 'Gemacht, um im Lesen zu verschwinden.',
      productLead:
        'Gleaner bleibt im Hintergrund — und speichert genau genug Kontext, warum ein Wort zählte.',
      featSelectTitle: 'Markieren & speichern',
      featSelectBody: 'Wörter, Phrasen und Sätze — mit der Zeile, in der du sie fandest.',
      featReviewTitle: 'Ruhig wiederholen',
      featReviewBody: 'Seitenleiste für Glossare, Notizen und einen leichten Wortschatz-Check.',
      featExportTitle: 'Nach Anki exportieren',
      featExportBody: 'Wenn du Spaced Repetition willst, nimm dein Deck mit.',
      communityTitle: 'Ein Planet. Viele Leser.',
      communityLead:
        'Sanfte Lichter markieren Länder mit kürzlicher Gleaner-Nutzung. Ziehen zum Drehen, scrollen zum Zoomen.',
      mapLoading: 'Präsenz wird geladen…',
      mapNote:
        'Nur Länder-/Regionsebene, anonym aggregiert — keine Stadt, keine IP-Ortung, keine Namen. Farbe ≈ täglicher Durchschnitt der letzten 14 Tage. Teilen lässt sich in den Einstellungen abschalten.',
      mapBorders: 'Grenzen',
      mapSatellite: 'Satellit',
      mapLegendFewer: 'Weniger aktiv',
      mapLegendMore: 'Mehr aktiv',
      mapHint: 'Ziehen · Scrollen · Farbe ≈ aktive Lernende nach Land/Region',
      mapEarthLabel: 'Interaktive Erde mit anonymer Länder-/Regionsaktivität',
      mapGlobeLoading: 'Erde wird geladen…',
      mapGlobeFail: '3D-Erde konnte nicht geladen werden. Neu laden oder anderes Netzwerk versuchen.',
      mapStatFail: 'Erde nicht ladbar <span>· bitte neu laden</span>',
      mapStatEmpty: 'Warte auf erste Funken <span>· nur Land/Region</span>',
      mapStatReady:
        '{countries} Regionen · ~{learners} aktiv <span>· Tagesmittel, 14 Tage</span>',
      mapPointHits: '~{hits} aktiv / Tag',
      footerStore: 'Chrome Web Store',
      footerPrivacy: 'Datenschutzrichtlinie',
      footerContact: 'Kontakt',
      policyLead:
        'Karten bleiben standardmäßig lokal. Anmeldung ist optional. Bei Netz-Lookups senden wir nur den markierten Text.',
      policyMeta: 'Zuletzt aktualisiert: 12. November 2026',
      policySum1: 'Lokal zuerst',
      policySum2: 'Offline-Englischlexikon auf dem Gerät',
      policySum3: 'Kein Verkauf deiner Daten',
      policySum4: 'Optionale Sync-Anmeldung',
      policyBodyNote:
        'Der vollständige Richtlinientext unten erscheint auf Englisch (oder Chinesisch, wenn gewählt).',
      docTitleHome: 'Gleaner · Englisch dort lernen, wo du schon liest',
      docTitlePrivacy: 'Gleaner Datenschutzrichtlinie',
      metaHome:
        'Gleaner von Spolora — Englisch beim Lesen speichern, in der Seitenleiste wiederholen, nach Anki exportieren.',
    }),
    fr: pack({
      navCommunity: 'Communauté',
      navProduct: 'Produit',
      navPrivacy: 'Confidentialité',
      navSupport: 'Assistance',
      navHome: 'Accueil',
      navContact: 'Contact',
      langGroup: 'Langue',
      heroTitle: 'L’anglais glané dans les pages que vous lisez déjà.',
      heroLead:
        'Surlignez un mot, gardez la phrase, révisez plus tard, exportez vers Anki si besoin — des outils calmes pour lecteurs curieux.',
      ctaChrome: 'Ajouter à Chrome',
      ctaCommunity: 'Voir qui apprend',
      ctaPrivacy: 'Confidentialité, clairement',
      productTitle: 'Conçu pour disparaître dans la lecture.',
      productLead:
        'Gleaner reste discret — puis capture juste assez de contexte pour se souvenir pourquoi un mot comptait.',
      featSelectTitle: 'Sélectionner & enregistrer',
      featSelectBody: 'Mots, expressions et phrases — avec la ligne où vous les avez trouvés.',
      featReviewTitle: 'Réviser en silence',
      featReviewBody: 'Panneau latéral pour glosses, notes et un léger test de vocabulaire.',
      featExportTitle: 'Exporter vers Anki',
      featExportBody: 'Pour la répétition espacée, emportez votre paquet.',
      communityTitle: 'Une planète. Beaucoup de lecteurs.',
      communityLead:
        'Des lumières douces marquent les pays où Gleaner a été utilisé récemment. Glissez pour tourner, défilez pour zoomer.',
      mapLoading: 'Chargement de la présence…',
      mapNote:
        'Carte au niveau pays/région uniquement, activité anonyme agrégée — pas de ville, pas de géolocalisation IP, pas de noms. Couleur ≈ moyenne quotidienne sur 14 jours. Désactivable dans les réglages.',
      mapBorders: 'Frontières',
      mapSatellite: 'Satellite',
      mapLegendFewer: 'Moins actif',
      mapLegendMore: 'Plus actif',
      mapHint: 'Glisser · Défiler · Couleur ≈ apprenants par pays/région',
      mapEarthLabel: 'Terre interactive avec activité anonyme pays/région',
      mapGlobeLoading: 'Chargement de la Terre…',
      mapGlobeFail: 'Impossible de charger la Terre 3D. Actualisez ou changez de réseau.',
      mapStatFail: 'Terre indisponible <span>· réessayez</span>',
      mapStatEmpty: 'En attente des premières lueurs <span>· pays/région seulement</span>',
      mapStatReady:
        '{countries} régions · ~{learners} actifs <span>· moy. journalière, 14 j</span>',
      mapPointHits: '~{hits} actifs / jour',
      footerStore: 'Chrome Web Store',
      footerPrivacy: 'Politique de confidentialité',
      footerContact: 'Contact',
      policyLead:
        'Les cartes restent sur l’appareil par défaut. La connexion est optionnelle. Pour une recherche réseau, seul le texte sélectionné est envoyé.',
      policyMeta: 'Dernière mise à jour : 12 novembre 2026',
      policySum1: 'Local d’abord',
      policySum2: 'Lexique anglais hors ligne sur l’appareil',
      policySum3: 'Pas de vente de vos données',
      policySum4: 'Sync optionnelle',
      policyBodyNote:
        'Le texte intégral ci-dessous s’affiche en anglais (ou en chinois si cette langue est choisie).',
      docTitleHome: 'Gleaner · Apprendre l’anglais là où vous lisez déjà',
      docTitlePrivacy: 'Politique de confidentialité Gleaner',
      metaHome:
        'Gleaner par Spolora — enregistrez l’anglais en lisant, révisez dans le panneau, exportez vers Anki.',
    }),
    es: pack({
      navCommunity: 'Comunidad',
      navProduct: 'Producto',
      navPrivacy: 'Privacidad',
      navSupport: 'Soporte',
      navHome: 'Inicio',
      navContact: 'Contacto',
      langGroup: 'Idioma',
      heroTitle: 'Inglés recogido de las páginas que ya lees.',
      heroLead:
        'Resalta una palabra, guarda la frase, repasa después y exporta a Anki cuando quieras — herramientas tranquilas para lectores curiosos.',
      ctaChrome: 'Añadir a Chrome',
      ctaCommunity: 'Ver quién aprende',
      ctaPrivacy: 'Privacidad, clara',
      productTitle: 'Hecho para desaparecer en la lectura.',
      productLead:
        'Gleaner no molesta hasta que lo necesitas — entonces guarda el contexto justo para recordar por qué importaba esa palabra.',
      featSelectTitle: 'Seleccionar y guardar',
      featSelectBody: 'Palabras, frases y oraciones — con la línea donde las encontraste.',
      featReviewTitle: 'Repasar en calma',
      featReviewBody: 'Panel lateral para glosas, notas y una prueba ligera de vocabulario.',
      featExportTitle: 'Exportar a Anki',
      featExportBody: 'Si quieres repetición espaciada, llévate tu mazo.',
      communityTitle: 'Un planeta. Muchos lectores.',
      communityLead:
        'Luces suaves marcan países con uso reciente de Gleaner. Arrastra para girar, desplázate para acercar.',
      mapLoading: 'Cargando presencia…',
      mapNote:
        'Solo nivel país/región, actividad anónima agregada: sin ciudad, sin IP precisa, sin nombres. El color ≈ media diaria de 14 días. Puedes desactivar el uso compartido en ajustes.',
      mapBorders: 'Fronteras',
      mapSatellite: 'Satélite',
      mapLegendFewer: 'Menos activo',
      mapLegendMore: 'Más activo',
      mapHint: 'Arrastrar · Desplazar · Color ≈ aprendices por país/región',
      mapEarthLabel: 'Tierra interactiva con actividad anónima por país/región',
      mapGlobeLoading: 'Cargando la Tierra…',
      mapGlobeFail: 'No se pudo cargar la Tierra 3D. Actualiza o prueba otra red.',
      mapStatFail: 'No se puede cargar la Tierra <span>· actualiza</span>',
      mapStatEmpty: 'Esperando las primeras luces <span>· solo país/región</span>',
      mapStatReady:
        '{countries} regiones · ~{learners} activos <span>· media diaria, 14 días</span>',
      mapPointHits: '~{hits} activos / día',
      footerStore: 'Chrome Web Store',
      footerPrivacy: 'Política de privacidad',
      footerContact: 'Contacto',
      policyLead:
        'Las tarjetas quedan en tu dispositivo por defecto. El inicio de sesión es opcional. En búsquedas en red solo enviamos el texto seleccionado.',
      policyMeta: 'Última actualización: 12 de noviembre de 2026',
      policySum1: 'Local primero',
      policySum2: 'Léxico inglés sin conexión en el dispositivo',
      policySum3: 'No vendemos tus datos',
      policySum4: 'Sincronización opcional',
      policyBodyNote:
        'El texto completo abajo se muestra en inglés (o en chino si eliges ese idioma).',
      docTitleHome: 'Gleaner · Aprende inglés donde ya lees',
      docTitlePrivacy: 'Política de privacidad de Gleaner',
      metaHome:
        'Gleaner de Spolora — guarda inglés al leer, repasa en el panel y exporta a Anki.',
    }),
    pt: pack({
      navCommunity: 'Comunidade',
      navProduct: 'Produto',
      navPrivacy: 'Privacidade',
      navSupport: 'Suporte',
      navHome: 'Início',
      navContact: 'Contacto',
      langGroup: 'Idioma',
      heroTitle: 'Inglês colhido nas páginas que já lês.',
      heroLead:
        'Destaca uma palavra, guarda a frase, revê depois e exporta para o Anki quando quiseres — ferramentas calmas para leitores curiosos.',
      ctaChrome: 'Adicionar ao Chrome',
      ctaCommunity: 'Ver quem está a aprender',
      ctaPrivacy: 'Privacidade, em claro',
      productTitle: 'Feito para desaparecer na leitura.',
      productLead:
        'O Gleaner fica de lado até seres preciso — e guarda só o contexto suficiente para lembrar por que a palavra importava.',
      featSelectTitle: 'Selecionar e guardar',
      featSelectBody: 'Palavras, expressões e frases — com a linha onde as encontraste.',
      featReviewTitle: 'Rever em silêncio',
      featReviewBody: 'Painel lateral para glosas, notas e um teste leve de vocabulário.',
      featExportTitle: 'Exportar para Anki',
      featExportBody: 'Quando quiseres repetição espaçada, leva o baralho contigo.',
      communityTitle: 'Um planeta. Muitos leitores.',
      communityLead:
        'Luzes suaves marcam países com uso recente do Gleaner. Arrasta para girar, faz scroll para aproximar.',
      mapLoading: 'A carregar presença…',
      mapNote:
        'Apenas nível país/região, atividade anónima agregada — sem cidade, sem IP preciso, sem nomes. Cor ≈ média diária de 14 dias. Podes desativar a partilha nas definições.',
      mapBorders: 'Fronteiras',
      mapSatellite: 'Satélite',
      mapLegendFewer: 'Menos ativo',
      mapLegendMore: 'Mais ativo',
      mapHint: 'Arrastar · Scroll · Cor ≈ aprendentes por país/região',
      mapEarthLabel: 'Terra interativa com atividade anónima por país/região',
      mapGlobeLoading: 'A carregar a Terra…',
      mapGlobeFail: 'Não foi possível carregar a Terra 3D. Atualiza ou tenta outra rede.',
      mapStatFail: 'Terra indisponível <span>· atualiza</span>',
      mapStatEmpty: 'À espera das primeiras luzes <span>· só país/região</span>',
      mapStatReady:
        '{countries} regiões · ~{learners} ativos <span>· média diária, 14 dias</span>',
      mapPointHits: '~{hits} ativos / dia',
      footerStore: 'Chrome Web Store',
      footerPrivacy: 'Política de privacidade',
      footerContact: 'Contacto',
      policyLead:
        'Os cartões ficam no dispositivo por predefinição. O início de sessão é opcional. Em pesquisas na rede só enviamos o texto selecionado.',
      policyMeta: 'Última atualização: 12 de novembro de 2026',
      policySum1: 'Local primeiro',
      policySum2: 'Léxico inglês offline no dispositivo',
      policySum3: 'Não vendemos os teus dados',
      policySum4: 'Sincronização opcional',
      policyBodyNote:
        'O texto completo abaixo aparece em inglês (ou em chinês se escolheres esse idioma).',
      docTitleHome: 'Gleaner · Aprende inglês onde já lês',
      docTitlePrivacy: 'Política de privacidade do Gleaner',
      metaHome:
        'Gleaner da Spolora — guarda inglês ao ler, revê no painel e exporta para Anki.',
    }),
    ar: pack({
      navCommunity: 'المجتمع',
      navProduct: 'المنتج',
      navPrivacy: 'الخصوصية',
      navSupport: 'الدعم',
      navHome: 'الرئيسية',
      navContact: 'تواصل',
      langGroup: 'اللغة',
      heroTitle: 'إنجليزية تُلتقط من الصفحات التي تقرأها أصلًا.',
      heroLead:
        'ظلل كلمة، احتفظ بالجملة، راجع لاحقًا، وصدّر إلى Anki عند الحاجة — أدوات هادئة لقرّاء فضوليين.',
      ctaChrome: 'إضافة إلى Chrome',
      ctaCommunity: 'من يتعلّم الآن',
      ctaPrivacy: 'الخصوصية بوضوح',
      productTitle: 'مصمم ليختفي داخل القراءة.',
      productLead:
        'يبقى Gleaner بعيدًا عن الطريق حتى تحتاجه — ثم يحفظ ما يكفي لتذكّر لماذا أهمّت تلك الكلمة.',
      featSelectTitle: 'تحديد وحفظ',
      featSelectBody: 'كلمات وعبارات وجمل — مع السطر الذي وجدتها فيه.',
      featReviewTitle: 'مراجعة هادئة',
      featReviewBody: 'لوحة جانبية للشروح والملاحظات واختبار مفردات خفيف.',
      featExportTitle: 'تصدير إلى Anki',
      featExportBody: 'عندما تريد التكرار المتباعد، خذ رزمك معك.',
      communityTitle: 'كوكب واحد. قرّاء كُثر.',
      communityLead:
        'أضواء ناعمة تحدد البلدان التي استُخدم فيها Gleaner مؤخرًا. اسحب للدوران ومرّر للتكبير.',
      mapLoading: 'جارٍ تحميل الحضور…',
      mapNote:
        'الخريطة على مستوى البلد/المنطقة فقط، بنشاط مجهول مجمّع — بلا مدينة أو موقع IP دقيق أو أسماء. اللون ≈ متوسط يومي لـ14 يومًا. يمكن إيقاف المشاركة من الإعدادات.',
      mapBorders: 'حدود',
      mapSatellite: 'قمر صناعي',
      mapLegendFewer: 'أقل نشاطًا',
      mapLegendMore: 'أكثر نشاطًا',
      mapHint: 'اسحب · مرّر · اللون ≈ متعلمون حسب البلد/المنطقة',
      mapEarthLabel: 'أرض تفاعلية بنشاط مجهول على مستوى البلد/المنطقة',
      mapGlobeLoading: 'جارٍ تحميل الأرض…',
      mapGlobeFail: 'تعذّر تحميل الأرض ثلاثية الأبعاد. حدّث الصفحة أو جرّب شبكة أخرى.',
      mapStatFail: 'تعذّر تحميل الأرض <span>· حدّث</span>',
      mapStatEmpty: 'بانتظار أولى الشرارات <span>· بلد/منطقة فقط</span>',
      mapStatReady:
        '{countries} مناطق · ~{learners} نشطون <span>· متوسط يومي، 14 يومًا</span>',
      mapPointHits: '~{hits} نشط / يوم',
      footerStore: 'متجر Chrome',
      footerPrivacy: 'سياسة الخصوصية',
      footerContact: 'تواصل',
      policyLead:
        'تبقى البطاقات على جهازك افتراضيًا. تسجيل الدخول اختياري. عند البحث عبر الشبكة نرسل النص المحدد فقط.',
      policyMeta: 'آخر تحديث: 12 نوفمبر 2026',
      policySum1: 'محلي أولًا',
      policySum2: 'معجم إنجليزي دون اتصال على الجهاز',
      policySum3: 'لا نبيع بياناتك',
      policySum4: 'مزامنة اختيارية',
      policyBodyNote:
        'يُعرض النص الكامل أدناه بالإنجليزية (أو بالصينية عند اختيارها).',
      docTitleHome: 'Gleaner · تعلّم الإنجليزية حيث تقرأ أصلًا',
      docTitlePrivacy: 'سياسة خصوصية Gleaner',
      metaHome:
        'Gleaner من Spolora — احفظ الإنجليزية أثناء القراءة، راجع في اللوحة، وصدّر إلى Anki.',
    }),
    ru: pack({
      navCommunity: 'Сообщество',
      navProduct: 'Продукт',
      navPrivacy: 'Конфиденциальность',
      navSupport: 'Поддержка',
      navHome: 'Главная',
      navContact: 'Контакт',
      langGroup: 'Язык',
      heroTitle: 'Английский со страниц, которые вы и так читаете.',
      heroLead:
        'Выделите слово, сохраните предложение, повторите позже и при необходимости экспортируйте в Anki — спокойные инструменты для любопытных читателей.',
      ctaChrome: 'Добавить в Chrome',
      ctaCommunity: 'Кто учится',
      ctaPrivacy: 'О конфиденциальности',
      productTitle: 'Сделано, чтобы раствориться в чтении.',
      productLead:
        'Gleaner не мешает — а когда нужно, сохраняет ровно столько контекста, чтобы вспомнить, почему слово было важным.',
      featSelectTitle: 'Выделить и сохранить',
      featSelectBody: 'Слова, фразы и предложения — вместе со строкой, где вы их нашли.',
      featReviewTitle: 'Тихое повторение',
      featReviewBody: 'Боковая панель для глосс, заметок и лёгкой проверки словаря.',
      featExportTitle: 'Экспорт в Anki',
      featExportBody: 'Когда нужна интервальная повторяемость — заберите колоду с собой.',
      communityTitle: 'Одна планета. Много читателей.',
      communityLead:
        'Мягкие огоньки отмечают страны с недавним использованием Gleaner. Тяните, чтобы вращать; прокручивайте, чтобы приближать.',
      mapLoading: 'Загрузка присутствия…',
      mapNote:
        'Только уровень страны/региона, анонимная агрегация — без города, точного IP и имён. Цвет ≈ среднесуточная активность за 14 дней. Обмен можно отключить в настройках.',
      mapBorders: 'Границы',
      mapSatellite: 'Спутник',
      mapLegendFewer: 'Меньше активности',
      mapLegendMore: 'Больше активности',
      mapHint: 'Тянуть · Прокрутка · Цвет ≈ учащиеся по стране/региону',
      mapEarthLabel: 'Интерактивная Земля с анонимной активностью по стране/региону',
      mapGlobeLoading: 'Загрузка Земли…',
      mapGlobeFail: 'Не удалось загрузить 3D-Землю. Обновите страницу или смените сеть.',
      mapStatFail: 'Земля недоступна <span>· обновите</span>',
      mapStatEmpty: 'Ждём первые искорки <span>· только страна/регион</span>',
      mapStatReady:
        '{countries} регионов · ~{learners} активных <span>· ср./день, 14 дней</span>',
      mapPointHits: '~{hits} активных / день',
      footerStore: 'Chrome Web Store',
      footerPrivacy: 'Политика конфиденциальности',
      footerContact: 'Контакт',
      policyLead:
        'Карточки по умолчанию остаются на устройстве. Вход необязателен. При сетевом запросе отправляется только выделенный текст.',
      policyMeta: 'Обновлено: 12 ноября 2026',
      policySum1: 'Сначала локально',
      policySum2: 'Офлайн-английский лексикон на устройстве',
      policySum3: 'Мы не продаём ваши данные',
      policySum4: 'Опциональная синхронизация',
      policyBodyNote:
        'Полный текст ниже показан на английском (или на китайском, если выбран китайский).',
      docTitleHome: 'Gleaner · Учите английский там, где уже читаете',
      docTitlePrivacy: 'Политика конфиденциальности Gleaner',
      metaHome:
        'Gleaner от Spolora — сохраняйте английский при чтении, повторяйте в панели, экспортируйте в Anki.',
    }),
  };

  function browserLangs() {
    var langs = [];
    try {
      langs = Array.prototype.slice.call(navigator.languages || []);
    } catch (e) {}
    if (!langs.length && navigator.language) langs = [navigator.language];
    return langs;
  }

  function browserUiLanguage() {
    var list = browserLangs();
    var i;
    var lower;
    var j;
    for (i = 0; i < list.length; i++) {
      lower = String(list[i] || '').toLowerCase();
      for (j = 0; j < BROWSER_PREFIX.length; j++) {
        if (lower.indexOf(BROWSER_PREFIX[j].prefix) === 0) {
          return BROWSER_PREFIX[j].lang;
        }
      }
    }
    return 'en';
  }

  function localLang() {
    return browserUiLanguage();
  }

  function isSiteLang(v) {
    return typeof v === 'string' && SITE_LANG_SET[v];
  }

  function readPref() {
    try {
      var v = localStorage.getItem(STORAGE) || '';
      if (v === 'auto' || isSiteLang(v)) return v;
      var legacy = localStorage.getItem(LEGACY) || '';
      if (legacy === 'en' || legacy === 'zh') return legacy;
    } catch (e) {}
    return 'auto';
  }

  function writePref(pref) {
    try {
      localStorage.setItem(STORAGE, pref);
      if (pref === 'en' || pref === 'zh') {
        localStorage.setItem(LEGACY, pref);
      } else {
        localStorage.removeItem(LEGACY);
      }
    } catch (e) {}
  }

  function resolve(pref) {
    var p = pref || readPref();
    if (isSiteLang(p)) return p;
    return localLang();
  }

  function t(key, lang) {
    var L = lang || resolve();
    var packL = dict[L] || dict.en;
    return packL[key] != null ? packL[key] : dict.en[key] || key;
  }

  function format(template, vars) {
    return String(template).replace(/\{(\w+)\}/g, function (_, k) {
      return vars && vars[k] != null ? String(vars[k]) : '';
    });
  }

  function applyTexts(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var val = t(key, lang);
      if (el.getAttribute('data-i18n-html') === '1') el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key, lang));
    });
    var titleKey = document.body.getAttribute('data-i18n-title');
    if (titleKey) document.title = t(titleKey, lang);
    var meta = document.querySelector('meta[name="description"]');
    var metaKey = document.body.getAttribute('data-i18n-desc');
    if (meta && metaKey) meta.setAttribute('content', t(metaKey, lang));
  }

  function closeAllLangMenus() {
    document.querySelectorAll('[data-lang-switch].is-open').forEach(function (host) {
      host.classList.remove('is-open');
      var trigger = host.querySelector('[data-lang-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  function syncControls(_pref, lang) {
    document.querySelectorAll('[data-lang-switch]').forEach(function (host) {
      var trigger = host.querySelector('[data-lang-trigger]');
      var current = host.querySelector('[data-lang-current]');
      if (current) {
        current.innerHTML =
          '<span class="lang-flag" aria-hidden="true">' +
          (FLAG_SVG[lang] || '') +
          '</span><span class="lang-name">' +
          (LANG_LABEL[lang] || lang) +
          '</span>';
      }
      if (trigger) {
        trigger.setAttribute(
          'aria-label',
          (t('langGroup', lang) || 'Language') + ': ' + (LANG_LABEL[lang] || lang),
        );
      }
      host.querySelectorAll('[data-lang-choice]').forEach(function (btn) {
        var on = btn.getAttribute('data-lang-choice') === lang;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    });
  }

  /** Privacy full text: zh panel for Chinese; English for every other UI language. */
  function applyPolicyPanels(lang) {
    var panels = document.querySelectorAll('[data-policy-panel]');
    if (!panels.length) return;
    var bodyLang = lang === 'zh' ? 'zh' : 'en';
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-policy-panel') !== bodyLang;
    });
    var note = document.querySelector('[data-policy-body-note]');
    if (note) {
      note.hidden = lang === 'zh' || lang === 'en';
    }
  }

  function ensureLangSwitch() {
    document.querySelectorAll('[data-lang-switch]').forEach(function (host) {
      if (host.getAttribute('data-built') === '1') return;
      host.setAttribute('data-built', '1');
      host.classList.add('lang-switch');

      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'lang-trigger';
      trigger.setAttribute('data-lang-trigger', '1');
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML =
        '<span class="lang-current" data-lang-current></span>' +
        '<span class="lang-caret" aria-hidden="true"></span>';

      var menu = document.createElement('div');
      menu.className = 'lang-menu';
      menu.setAttribute('role', 'listbox');
      menu.setAttribute('data-lang-menu', '1');

      SITE_LANGS.forEach(function (code) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lang-option';
        btn.setAttribute('role', 'option');
        btn.setAttribute('data-lang-choice', code);
        btn.setAttribute('aria-selected', 'false');
        btn.innerHTML =
          '<span class="lang-flag" aria-hidden="true">' +
          (FLAG_SVG[code] || '') +
          '</span><span class="lang-name">' +
          (LANG_LABEL[code] || code) +
          '</span>';
        menu.appendChild(btn);
      });

      host.appendChild(trigger);
      host.appendChild(menu);
    });
  }

  function apply(pref) {
    var p = pref || readPref();
    var lang = resolve(p);
    document.documentElement.lang = LOCALE_TAGS[lang] || 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-site-lang', lang);
    document.documentElement.setAttribute('data-site-lang-pref', p);
    document.documentElement.setAttribute(
      'data-policy-lang',
      lang === 'zh' ? 'zh' : 'en',
    );
    ensureLangSwitch();
    applyTexts(lang);
    applyPolicyPanels(lang);
    syncControls(p, lang);
    closeAllLangMenus();
    try {
      window.dispatchEvent(
        new CustomEvent('gleaner:lang', { detail: { pref: p, lang: lang } }),
      );
    } catch (e) {}
    return lang;
  }

  function setPref(pref) {
    if (pref !== 'auto' && !isSiteLang(pref)) return;
    writePref(pref);
    apply(pref);
  }

  function bindControls() {
    document.addEventListener('click', function (e) {
      var target = e.target;
      if (!target || !target.closest) return;

      var option = target.closest('[data-lang-choice]');
      if (option) {
        var choice = option.getAttribute('data-lang-choice');
        if (isSiteLang(choice)) setPref(choice);
        return;
      }

      var trigger = target.closest('[data-lang-trigger]');
      if (trigger) {
        var host = trigger.closest('[data-lang-switch]');
        if (!host) return;
        var open = !host.classList.contains('is-open');
        closeAllLangMenus();
        if (open) {
          host.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        return;
      }

      if (!target.closest('[data-lang-switch]')) closeAllLangMenus();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllLangMenus();
    });
  }

  function boot() {
    ensureLangSwitch();
    bindControls();
    apply(readPref());
  }

  window.GleanerI18n = {
    SITE_LANGS: SITE_LANGS,
    LANG_LABEL: LANG_LABEL,
    t: t,
    format: format,
    localLang: localLang,
    readPref: readPref,
    resolve: resolve,
    setPref: setPref,
    apply: apply,
    boot: boot,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
