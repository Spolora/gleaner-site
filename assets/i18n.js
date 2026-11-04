/**
 * Shared site language: auto (follow browser) | zh | en.
 * Local language today = Chinese when the browser prefers zh*; otherwise English.
 */
(function () {
  var STORAGE = 'gleaner.siteLang';
  var LEGACY = 'gleaner.policyLang';
  var dict = {
    en: {
      navCommunity: 'Community',
      navProduct: 'Product',
      navPrivacy: 'Privacy',
      navSupport: 'Support',
      navHome: 'Home',
      navContact: 'Contact',
      langLocal: '中文',
      langEn: 'English',
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
        'Country-level only. No cities, no IP pins, no names — we cannot tell who you are from this map. The globe opens facing your region (guessed from your timezone, not GPS). Color ≈ active learners per country (avg. daily anonymous check-ins over the last 14 days; turn off in Settings).',
      mapBorders: 'Borders',
      mapSatellite: 'Satellite',
      mapLegendFewer: 'Fewer active',
      mapLegendMore: 'More active',
      mapHint: 'Drag to spin · Scroll to zoom · Color ≈ active learners by country',
      mapEarthLabel: 'Interactive Earth with anonymous country-level activity',
      mapGlobeLoading: 'Loading Earth…',
      mapGlobeFail:
        'Could not load the 3D Earth (network/CDN). Hard-refresh or try another network.',
      mapStatFail: 'Unable to load the interactive Earth <span>· try refreshing</span>',
      mapStatEmpty: 'Waiting for the first sparks <span>· country-level only</span>',
      mapStatReady: '{countries} regions · ~{learners} active <span>· daily avg, last 14 days</span>',
      mapPointHits: '~{hits} active / day',
      footerStore: 'Chrome Web Store',
      footerPrivacy: 'Privacy Policy',
      footerContact: 'Contact',
      policyKicker: 'Spolora · Gleaner',
      policyLead:
        'Cards stay on your device by default. Sign-in is optional. When a lookup needs the network, we only send the text you selected — not your browsing history.',
      policyMeta: 'Last updated: October 21, 2026',
      policySum1: 'Local-first by default',
      policySum2: 'Offline English lexicon on device',
      policySum3: 'No sale of your data',
      policySum4: 'Optional sign-in sync',
      docTitleHome: 'Gleaner · Learn English where you already read',
      docTitlePrivacy: 'Gleaner Privacy Policy · 隐私政策',
      metaHome:
        'Gleaner by Spolora — save English words while you read, review in a side panel, export to Anki. A quiet community of learners on one shared planet.',
    },
    zh: {
      navCommunity: '社区',
      navProduct: '产品',
      navPrivacy: '隐私',
      navSupport: '支持',
      navHome: '首页',
      navContact: '联系',
      langLocal: '中文',
      langEn: 'English',
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
        '仅到国家级别；没有城市、没有 IP 钉点、没有姓名——无法从这张地图认出你是谁；地球默认朝向你的地区（由时区猜测，不是 GPS）；颜色 ≈ 各国活跃学习者（近 14 日匿名签到日均；可在扩展设置中关闭）',
      mapBorders: '国界',
      mapSatellite: '卫星',
      mapLegendFewer: '较少活跃',
      mapLegendMore: '较多活跃',
      mapHint: '拖动旋转 · 滚轮缩放 · 颜色 ≈ 各国活跃学习者',
      mapEarthLabel: '带匿名国家级活跃的交互地球',
      mapGlobeLoading: '正在加载地球…',
      mapGlobeFail: '无法加载三维地球（网络/CDN）；请强制刷新或换网络再试',
      mapStatFail: '无法加载交互地球 <span>· 请刷新重试</span>',
      mapStatEmpty: '等待第一批光点 <span>· 仅国家级</span>',
      mapStatReady: '{countries} 个地区 · 约 {learners} 活跃 <span>· 近 14 日日均</span>',
      mapPointHits: '约 {hits} 活跃 / 日',
      footerStore: 'Chrome 应用商店',
      footerPrivacy: '隐私政策',
      footerContact: '联系',
      policyKicker: 'Spolora · Gleaner',
      policyLead:
        '卡片默认只留在本机；登录可选；需要联网查词时，我们只发送你划选的文本——不会上传浏览历史',
      policyMeta: '最近更新：2026 年 10 月 21 日',
      policySum1: '默认本地优先',
      policySum2: '本机离线英语词库',
      policySum3: '不出售你的数据',
      policySum4: '可选登录同步',
      docTitleHome: 'Gleaner · 在你本来阅读的地方学英语',
      docTitlePrivacy: 'Gleaner 隐私政策 · Privacy Policy',
      metaHome:
        'Spolora 出品的 Gleaner——边读边收藏英语单词，侧边栏复习，可导出 Anki；同一颗星球上的安静学习者社区',
    },
  };

  function browserPrefersZh() {
    var langs = [];
    try {
      langs = Array.prototype.slice.call(navigator.languages || []);
    } catch (e) {}
    if (!langs.length && navigator.language) langs = [navigator.language];
    return langs.some(function (l) {
      return /^zh\b/i.test(l || '');
    });
  }

  /** Locale language we can render (zh for Chinese browsers, else en). */
  function localLang() {
    return browserPrefersZh() ? 'zh' : 'en';
  }

  function readPref() {
    try {
      var v = localStorage.getItem(STORAGE) || '';
      if (v === 'auto' || v === 'en' || v === 'zh') return v;
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
    if (p === 'zh' || p === 'en') return p;
    return localLang();
  }

  function t(key, lang) {
    var L = lang || resolve();
    var pack = dict[L] || dict.en;
    return pack[key] != null ? pack[key] : dict.en[key] || key;
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

  function syncControls(_pref, lang) {
    document.querySelectorAll('[data-lang-choice]').forEach(function (btn) {
      var on = btn.getAttribute('data-lang-choice') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function applyPolicyPanels(lang) {
    var panels = document.querySelectorAll('[data-policy-panel]');
    if (!panels.length) return;
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-policy-panel') !== lang;
    });
  }

  function apply(pref) {
    var p = pref || readPref();
    var lang = resolve(p);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.setAttribute('data-site-lang', lang);
    document.documentElement.setAttribute('data-site-lang-pref', p);
    document.documentElement.setAttribute('data-policy-lang', lang);
    applyTexts(lang);
    applyPolicyPanels(lang);
    syncControls(p, lang);
    try {
      window.dispatchEvent(
        new CustomEvent('gleaner:lang', { detail: { pref: p, lang: lang } }),
      );
    } catch (e) {}
    return lang;
  }

  function setPref(pref) {
    if (pref !== 'auto' && pref !== 'en' && pref !== 'zh') return;
    writePref(pref);
    apply(pref);
  }

  function bindControls() {
    document.querySelectorAll('[data-lang-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var choice = btn.getAttribute('data-lang-choice');
        if (choice === 'en' || choice === 'zh') setPref(choice);
      });
    });
  }

  function boot() {
    bindControls();
    apply(readPref());
  }

  window.GleanerI18n = {
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
