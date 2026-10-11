/**
 * Interactive Earth with anonymous country-level presence dots.
 * Modes: satellite texture | political borders. Flat circles; color = activity.
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

/** Heatmap: few → many (light blue → deep / black-red). */
function colorForHits(hits, maxHits) {
  const t = Math.min(1, Math.max(0, hits / Math.max(maxHits, 1)));
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
  const maxHits = Math.max(...usable.map((r) => r.hits), 1);
  let total = 0;
  const points = usable.map((row) => {
    total += row.hits;
    const [lat, lng] = CENTROIDS[row.country_code];
    return {
      lat,
      lng,
      size: 0.85,
      altitude: 0.004,
      country: row.country_code,
      hits: row.hits,
      color: colorForHits(row.hits, maxHits),
    };
  });
  return { points, countries: usable.length, hits: total, maxHits };
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

  const { points, countries, hits } = toPoints(rows);
  const { width, height } = sizeGlobe(el);
  let mode = getMode();
  setModeButtons(mode);

  if (stat) {
    if (!countries) {
      stat.innerHTML =
        'Waiting for the first sparks <span>· country-level only</span>';
    } else {
      stat.innerHTML = `${countries} regions · ~${hits} signals <span>· last 14 days</span>`;
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
    .pointLabel(
      (d) =>
        `<div style="font:600 12px/1.35 system-ui,sans-serif;padding:4px 2px">${d.country}<br/><span style="opacity:.75;font-weight:500">${d.hits} anonymous signals</span></div>`,
    )
    .polygonsTransitionDuration(400)
    .pointsMerge(false);

  applyMode(globe, mode, polygons);

  const controls = globe.controls();
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.4;
  controls.minDistance = 140;
  controls.maxDistance = 420;
  globe.pointOfView({ lat: 20, lng: 40, altitude: 2.1 }, 0);

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
