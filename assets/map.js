/**
 * Interactive Earth with anonymous country-level presence dots.
 * Modes: satellite texture | political borders. Flat circles; color = activity.
 * pointResolution / ringResolution raised so zoomed markers stay round (not hex).
 */

/** Approximate centroids [lat, lon] for display only. */
const CENTROIDS = {
  US: [39.8, -98.5],
  CA: [56.1, -106.3],
  MX: [23.6, -102.5],
  BR: [-10.8, -52.9],
  AR: [-38.4, -63.6],
  CL: [-35.7, -71.5],
  CO: [4.6, -74.1],
  PE: [-9.2, -75.0],
  GB: [54.0, -2.5],
  IE: [53.1, -8.0],
  FR: [46.2, 2.2],
  DE: [51.2, 10.4],
  NL: [52.1, 5.3],
  BE: [50.5, 4.5],
  ES: [40.5, -3.7],
  PT: [39.4, -8.2],
  IT: [41.9, 12.6],
  CH: [46.8, 8.2],
  AT: [47.5, 14.6],
  SE: [60.1, 18.6],
  NO: [60.5, 8.5],
  DK: [56.3, 9.5],
  FI: [61.9, 25.7],
  PL: [51.9, 19.1],
  CZ: [49.8, 15.5],
  RO: [45.9, 24.9],
  UA: [48.4, 31.2],
  TR: [39.0, 35.2],
  RU: [61.5, 105.3],
  EG: [26.8, 30.8],
  ZA: [-30.6, 22.9],
  NG: [9.1, 8.7],
  KE: [-0.0, 37.9],
  AE: [23.4, 53.8],
  SA: [23.9, 45.1],
  IL: [31.0, 34.9],
  IN: [20.6, 78.9],
  PK: [30.4, 69.3],
  BD: [23.7, 90.4],
  LK: [7.9, 80.8],
  CN: [35.9, 104.2],
  HK: [22.3, 114.2],
  TW: [23.7, 120.9],
  JP: [36.2, 138.3],
  KR: [35.9, 127.8],
  VN: [14.1, 108.3],
  TH: [15.9, 100.9],
  MY: [4.2, 101.9],
  SG: [1.35, 103.8],
  ID: [-2.5, 118.0],
  PH: [12.9, 121.8],
  AU: [-25.3, 133.8],
  NZ: [-40.9, 174.9],
};

const EARTH_SAT =
  'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
const EARTH_TOPO =
  'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-topology.png';
/** Soft daylight texture under political borders */
const EARTH_DAY =
  'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-day.jpg';
const WORLD_TOPO =
  'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

const MODE_KEY = 'gleaner.globeMode';

/**
 * IANA timezone → approximate viewer lat/lng (city/region, not GPS).
 * Same privacy idea as the extension presence ping: timezone only.
 */
const TZ_VIEW = {
  'America/New_York': [40.7, -74.0],
  'America/Chicago': [41.9, -87.6],
  'America/Denver': [39.7, -105.0],
  'America/Los_Angeles': [34.1, -118.2],
  'America/Phoenix': [33.4, -112.1],
  'America/Anchorage': [61.2, -149.9],
  'Pacific/Honolulu': [21.3, -157.9],
  'America/Toronto': [43.7, -79.4],
  'America/Vancouver': [49.3, -123.1],
  'America/Mexico_City': [19.4, -99.1],
  'America/Sao_Paulo': [-23.6, -46.6],
  'America/Argentina/Buenos_Aires': [-34.6, -58.4],
  'America/Santiago': [-33.4, -70.7],
  'America/Bogota': [4.7, -74.1],
  'America/Lima': [-12.0, -77.0],
  'Europe/London': [51.5, -0.1],
  'Europe/Dublin': [53.3, -6.3],
  'Europe/Paris': [48.9, 2.3],
  'Europe/Berlin': [52.5, 13.4],
  'Europe/Amsterdam': [52.4, 4.9],
  'Europe/Brussels': [50.8, 4.4],
  'Europe/Madrid': [40.4, -3.7],
  'Europe/Lisbon': [38.7, -9.1],
  'Europe/Rome': [41.9, 12.5],
  'Europe/Zurich': [47.4, 8.5],
  'Europe/Vienna': [48.2, 16.4],
  'Europe/Stockholm': [59.3, 18.1],
  'Europe/Oslo': [59.9, 10.8],
  'Europe/Copenhagen': [55.7, 12.6],
  'Europe/Helsinki': [60.2, 24.9],
  'Europe/Warsaw': [52.2, 21.0],
  'Europe/Prague': [50.1, 14.4],
  'Europe/Bucharest': [44.4, 26.1],
  'Europe/Kyiv': [50.5, 30.5],
  'Europe/Istanbul': [41.0, 29.0],
  'Europe/Moscow': [55.8, 37.6],
  'Africa/Cairo': [30.0, 31.2],
  'Africa/Johannesburg': [-26.2, 28.0],
  'Africa/Lagos': [6.5, 3.4],
  'Africa/Nairobi': [-1.3, 36.8],
  'Asia/Dubai': [25.2, 55.3],
  'Asia/Riyadh': [24.7, 46.7],
  'Asia/Jerusalem': [31.8, 35.2],
  'Asia/Kolkata': [22.6, 88.4],
  'Asia/Karachi': [24.9, 67.0],
  'Asia/Dhaka': [23.8, 90.4],
  'Asia/Colombo': [6.9, 79.9],
  'Asia/Shanghai': [31.2, 121.5],
  'Asia/Beijing': [39.9, 116.4],
  'Asia/Chongqing': [29.6, 106.5],
  'Asia/Urumqi': [43.8, 87.6],
  'Asia/Hong_Kong': [22.3, 114.2],
  'Asia/Taipei': [25.0, 121.5],
  'Asia/Tokyo': [35.7, 139.7],
  'Asia/Seoul': [37.6, 127.0],
  'Asia/Ho_Chi_Minh': [10.8, 106.7],
  'Asia/Bangkok': [13.8, 100.5],
  'Asia/Kuala_Lumpur': [3.1, 101.7],
  'Asia/Singapore': [1.35, 103.8],
  'Asia/Jakarta': [-6.2, 106.8],
  'Asia/Manila': [14.6, 121.0],
  'Australia/Sydney': [-33.9, 151.2],
  'Australia/Melbourne': [-37.8, 145.0],
  'Australia/Perth': [-31.95, 115.9],
  'Pacific/Auckland': [-36.8, 174.8],
};

/** Fallback when timezone is unknown: browser language region → country centroid. */
const LANG_COUNTRY = {
  zh: 'CN',
  'zh-CN': 'CN',
  'zh-Hans': 'CN',
  'zh-TW': 'TW',
  'zh-Hant': 'TW',
  ja: 'JP',
  ko: 'KR',
  en: 'US',
  'en-GB': 'GB',
  'en-AU': 'AU',
  'en-CA': 'CA',
  'en-IN': 'IN',
  fr: 'FR',
  de: 'DE',
  es: 'ES',
  pt: 'BR',
  'pt-BR': 'BR',
  'pt-PT': 'PT',
  ru: 'RU',
  ar: 'SA',
  hi: 'IN',
  th: 'TH',
  vi: 'VN',
  id: 'ID',
  ms: 'MY',
  nl: 'NL',
  pl: 'PL',
  tr: 'TR',
  it: 'IT',
};

/**
 * Guess a friendly initial camera target from timezone (preferred) or language.
 * No GPS, no IP geolocation — stays country/city-from-timezone only.
 */
function guessViewerView() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  if (TZ_VIEW[tz]) {
    const [lat, lng] = TZ_VIEW[tz];
    return { lat, lng, altitude: 2.1, source: 'timezone', label: tz };
  }

  const langs = [...(navigator.languages || []), navigator.language || ''];
  for (const raw of langs) {
    const tag = String(raw || '').trim();
    if (!tag) continue;
    const exact = LANG_COUNTRY[tag] || LANG_COUNTRY[tag.replace('_', '-')];
    const base = LANG_COUNTRY[tag.split('-')[0]];
    const code = exact || base;
    if (code && CENTROIDS[code]) {
      const [lat, lng] = CENTROIDS[code];
      return { lat, lng, altitude: 2.1, source: 'language', label: code };
    }
  }

  // Previous default faced East Africa / Middle East; use a mild Pacific-neutral fallback.
  return { lat: 25, lng: 105, altitude: 2.1, source: 'default', label: 'fallback' };
}

/**
 * Active-learner scale (avg daily anonymous devices per country, last 14 days).
 * 1 → light blue; 100_000 → deep red; in between by log proportion.
 */
const HITS_FOR_MAX_COLOR = 100_000;

function activityT(hits) {
  const n = Math.max(0, Number(hits) || 0);
  return Math.min(1, Math.log1p(n) / Math.log1p(HITS_FOR_MAX_COLOR));
}

function colorForHits(hits) {
  const t = activityT(hits);
  const stops = [
    [186, 230, 253], // #bae6fd light blue
    [56, 189, 248], // #38bdf8
    [250, 204, 21], // #facc15
    [249, 115, 22], // #f97316
    [220, 38, 38], // #dc2626
    [69, 10, 10], // #450a0a black-red
  ];
  const scaled = t * (stops.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = stops[i];
  const b = stops[Math.min(i + 1, stops.length - 1)];
  const r = Math.round(a[0] + (b[0] - a[0]) * f);
  const g = Math.round(a[1] + (b[1] - a[1]) * f);
  const bl = Math.round(a[2] + (b[2] - a[2]) * f);
  return `rgb(${r},${g},${bl})`;
}

function toPoints(rows) {
  const usable = rows.filter((r) => CENTROIDS[r.country_code]);
  let total = 0;
  const points = usable.map((row) => {
    total += row.hits;
    const [lat, lng] = CENTROIDS[row.country_code];
    const t = activityT(row.hits);
    return {
      lat,
      lng,
      size: 1.15,
      altitude: 0.005,
      country: row.country_code,
      hits: row.hits,
      color: colorForHits(row.hits),
      ringMax: 2.6 + t * 2.4,
    };
  });
  return { points, countries: usable.length, learners: total };
}

async function fetchPresence(days = 14) {
  const cfg = window.GLEANER_SITE || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) return [];

  const url = `${String(cfg.supabaseUrl).replace(/\/$/, '')}/rest/v1/rpc/presence_recent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: cfg.supabaseAnonKey,
      Authorization: `Bearer ${cfg.supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ days }),
  });
  if (!res.ok) throw new Error(`presence_recent ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function loadCountryPolygons() {
  if (typeof topojson === 'undefined') return [];
  const res = await fetch(WORLD_TOPO);
  if (!res.ok) throw new Error(`world-atlas ${res.status}`);
  const world = await res.json();
  const geo = topojson.feature(world, world.objects.countries);
  return geo.features || [];
}

function sizeGlobe(el) {
  const width = el.clientWidth || 640;
  const height = Math.max(380, Math.min(560, Math.round(width * 0.62)));
  return { width, height };
}

function getMode() {
  const saved = localStorage.getItem(MODE_KEY);
  if (saved === 'satellite' || saved === 'borders') return saved;
  return 'borders';
}

function setModeButtons(mode) {
  document.querySelectorAll('[data-globe-mode]').forEach((btn) => {
    const active = btn.getAttribute('data-globe-mode') === mode;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function applyMode(globe, mode, polygons) {
  if (mode === 'borders') {
    elShellMode('borders');
    globe
      .globeImageUrl(EARTH_DAY)
      .bumpImageUrl(null)
      .showAtmosphere(true)
      .atmosphereColor('#9ec5de')
      .atmosphereAltitude(0.1)
      .polygonsData(polygons)
      .polygonCapColor(() => 'rgba(248, 250, 252, 0.55)')
      .polygonSideColor(() => 'rgba(0,0,0,0)')
      .polygonStrokeColor(() => 'rgba(60, 70, 80, 0.55)')
      .polygonAltitude(0.003);
  } else {
    elShellMode('satellite');
    globe
      .globeImageUrl(EARTH_SAT)
      .bumpImageUrl(EARTH_TOPO)
      .showAtmosphere(true)
      .atmosphereColor('#7ec8c3')
      .atmosphereAltitude(0.14)
      .polygonsData([])
      .polygonAltitude(0.01);
  }
}

function elShellMode(mode) {
  const shell = document.querySelector('.map-shell');
  const globeEl = document.getElementById('world-globe');
  if (shell) shell.dataset.mode = mode;
  if (globeEl) globeEl.dataset.mode = mode;
}

async function bootMap() {
  const el = document.getElementById('world-globe');
  const stat = document.getElementById('map-stat');
  const loading = document.getElementById('globe-loading');
  if (!el || typeof Globe !== 'function') {
    if (loading) {
      loading.textContent =
        'Could not load the 3D Earth (network/CDN). Hard-refresh or try another network.';
    }
    if (stat) {
      stat.innerHTML =
        'Unable to load the interactive Earth <span>· try refreshing</span>';
    }
    return;
  }
  if (loading) loading.remove();

  let rows = [];
  try {
    rows = await fetchPresence(14);
  } catch (err) {
    console.warn('[gleaner-site] presence fetch failed', err);
  }

  let polygons = [];
  try {
    polygons = await loadCountryPolygons();
  } catch (err) {
    console.warn('[gleaner-site] country borders failed', err);
  }

  const { points, countries, learners } = toPoints(rows);
  const { width, height } = sizeGlobe(el);
  let mode = getMode();
  setModeButtons(mode);

  if (stat) {
    if (!countries) {
      stat.innerHTML =
        'Waiting for the first sparks <span>· country-level only</span>';
    } else {
      stat.innerHTML = `${countries} regions · ~${learners} active <span>· daily avg, last 14 days</span>`;
    }
  }

  const legend = document.getElementById('map-legend');
  if (legend) legend.hidden = countries === 0;

  const globe = Globe()(el)
    .width(width)
    .height(height)
    .backgroundColor('rgba(0,0,0,0)')
    .pointsData(points)
    .pointLat('lat')
    .pointLng('lng')
    .pointAltitude('altitude')
    .pointRadius('size')
    .pointColor('color')
    // Default ~6–12 segments looks hexagonal when zoomed; 48 stays circular.
    .pointResolution(48)
    .pointLabel(
      (d) =>
        `<div style="font:600 12px/1.35 system-ui,sans-serif;padding:4px 2px">${d.country}<br/><span style="opacity:.75;font-weight:500">~${d.hits} active / day</span></div>`,
    )
    .ringsData(points)
    .ringLat('lat')
    .ringLng('lng')
    .ringAltitude(0.006)
    .ringColor((d) => {
      const base = d.color || 'rgb(220, 38, 38)';
      const m = base.match(/\d+/g);
      if (!m || m.length < 3) {
        return (t) => `rgba(220, 38, 38, ${Math.max(0, 0.75 * (1 - t))})`;
      }
      const [r, g, b] = m;
      return (t) => `rgba(${r}, ${g}, ${b}, ${Math.max(0, 0.8 * (1 - t))})`;
    })
    .ringMaxRadius('ringMax')
    .ringPropagationSpeed(2.2)
    .ringRepeatPeriod(1100)
    .ringResolution(64)
    .polygonsTransitionDuration(400)
    .pointsMerge(false);

  applyMode(globe, mode, polygons);

  const controls = globe.controls();
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.4;
  controls.minDistance = 140;
  controls.maxDistance = 420;

  // Face the viewer's region first (timezone → city/region), then gentle spin.
  const view = guessViewerView();
  globe.pointOfView(
    { lat: view.lat, lng: view.lng, altitude: view.altitude },
    900,
  );

  el.addEventListener(
    'pointerdown',
    () => {
      controls.autoRotate = false;
    },
    { once: true },
  );

  document.querySelectorAll('[data-globe-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.getAttribute('data-globe-mode') === 'borders' ? 'borders' : 'satellite';
      localStorage.setItem(MODE_KEY, mode);
      setModeButtons(mode);
      applyMode(globe, mode, polygons);
    });
  });

  window.addEventListener('resize', () => {
    const next = sizeGlobe(el);
    globe.width(next.width);
    globe.height(next.height);
  });
}

bootMap();
