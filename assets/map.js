/**
 * Anonymous country-level presence dots for the Gleaner community map.
 * Data: country ISO-3166-1 alpha-2 + hit counts only (no user ids).
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

const WIDTH = 1000;
const HEIGHT = 500;

function project(lat, lon) {
  const x = ((lon + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return [x, y];
}

function drawBase(svg) {
  const ns = 'http://www.w3.org/2000/svg';
  const earth = document.createElementNS(ns, 'ellipse');
  earth.setAttribute('class', 'map-earth');
  earth.setAttribute('cx', String(WIDTH / 2));
  earth.setAttribute('cy', String(HEIGHT / 2));
  earth.setAttribute('rx', String(WIDTH * 0.42));
  earth.setAttribute('ry', String(HEIGHT * 0.38));
  svg.appendChild(earth);

  for (let i = 1; i < 4; i += 1) {
    const line = document.createElementNS(ns, 'ellipse');
    line.setAttribute('class', 'map-grid');
    line.setAttribute('cx', String(WIDTH / 2));
    line.setAttribute('cy', String(HEIGHT / 2));
    line.setAttribute('rx', String(WIDTH * 0.42));
    line.setAttribute('ry', String(HEIGHT * 0.12 * i));
    svg.appendChild(line);
  }
  for (let i = -2; i <= 2; i += 1) {
    const meridian = document.createElementNS(ns, 'ellipse');
    meridian.setAttribute('class', 'map-grid');
    meridian.setAttribute('cx', String(WIDTH / 2 + i * 70));
    meridian.setAttribute('cy', String(HEIGHT / 2));
    meridian.setAttribute('rx', String(90 - Math.abs(i) * 12));
    meridian.setAttribute('ry', String(HEIGHT * 0.38));
    svg.appendChild(meridian);
  }
}

function radiusForHits(hits, maxHits) {
  const t = Math.sqrt(hits / Math.max(maxHits, 1));
  return 4 + t * 14;
}

function renderDots(svg, rows) {
  const ns = 'http://www.w3.org/2000/svg';
  const usable = rows.filter((r) => CENTROIDS[r.country_code]);
  const maxHits = Math.max(...usable.map((r) => r.hits), 1);

  if (!usable.length) {
    const label = document.createElementNS(ns, 'text');
    label.setAttribute('class', 'map-empty');
    label.setAttribute('x', String(WIDTH / 2));
    label.setAttribute('y', String(HEIGHT / 2 + 6));
    label.setAttribute('text-anchor', 'middle');
    label.textContent = 'The map will light up as learners arrive.';
    svg.appendChild(label);
    return { countries: 0, hits: 0 };
  }

  let total = 0;
  for (const row of usable) {
    total += row.hits;
    const [lat, lon] = CENTROIDS[row.country_code];
    const [x, y] = project(lat, lon);
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('class', 'map-dot');
    dot.setAttribute('cx', String(x));
    dot.setAttribute('cy', String(y));
    dot.setAttribute('r', String(radiusForHits(row.hits, maxHits)));
    dot.setAttribute(
      'aria-label',
      `${row.country_code}: ${row.hits} anonymous daily signals`,
    );
    svg.appendChild(dot);
  }
  return { countries: usable.length, hits: total };
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

async function bootMap() {
  const svg = document.getElementById('world-map');
  const stat = document.getElementById('map-stat');
  if (!svg) return;

  while (svg.firstChild) svg.removeChild(svg.firstChild);
  drawBase(svg);

  let rows = [];
  try {
    rows = await fetchPresence(14);
  } catch (err) {
    console.warn('[gleaner-site] presence fetch failed', err);
  }

  const summary = renderDots(svg, rows);
  if (stat) {
    if (!summary.countries) {
      stat.innerHTML =
        'Waiting for the first sparks <span>· country-level only</span>';
    } else {
      stat.innerHTML = `${summary.countries} regions · ~${summary.hits} signals <span>· last 14 days</span>`;
    }
  }
}

bootMap();
