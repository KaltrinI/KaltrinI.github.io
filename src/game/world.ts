// World layout: landmark placement, paths, scenery and collision.
// Coordinates are in world pixels; a sprite's (x, y) is the centre of its base (where it touches the ground).

export const WORLD_W = 2400;
export const WORLD_H = 1700;
export const SPAWN = { x: 1200, y: 1040 };
export const PLAZA = { x: 1200, y: 900, r: 150 };
export const LAKE = { x: 2010, y: 370, rx: 240, ry: 145 };

export type LandmarkId =
  | 'guide'
  | 'home'
  | 'skills'
  | 'campfire'
  | 'post'
  | 'portal'
  | 'rideshare'
  | 'parking'
  | 'wallet'
  | 'vidsbeats';

export interface Light {
  x: number; // relative to sprite top-left
  y: number;
  r: number;
  color?: string;
}

export interface Landmark {
  id: LandmarkId;
  name: string;
  district: string;
  verb: string; // shown in the interaction prompt, e.g. "Enter"
  color: string; // accent used on the minimap and in the info panel
  x: number;
  y: number;
  w: number;
  h: number;
  collider: { w: number; h: number };
  door: { x: number; y: number }; // where the player stands to interact
  lights: Light[];
}

export const landmarks: Landmark[] = [
  {
    id: 'guide', name: 'Traveler’s Guide', district: 'Town Square', verb: 'Read', color: '#d97706',
    x: 1105, y: 1000, w: 90, h: 110, collider: { w: 20, h: 10 },
    door: { x: 1105, y: 1030 }, lights: [],
  },
  {
    id: 'home', name: 'Kaltrin’s House', district: 'North Hill', verb: 'Enter', color: '#e07a5f',
    x: 1200, y: 560, w: 240, h: 220, collider: { w: 196, h: 76 },
    door: { x: 1200, y: 596 },
    lights: [{ x: 68, y: 155, r: 70 }, { x: 172, y: 155, r: 70 }, { x: 120, y: 92, r: 45 }],
  },
  {
    id: 'skills', name: 'Skill Tower', district: 'North Hill', verb: 'Climb', color: '#5b6ee1',
    x: 1660, y: 640, w: 170, h: 280, collider: { w: 100, h: 46 },
    door: { x: 1660, y: 672 },
    lights: [{ x: 85, y: 149, r: 55 }, { x: 85, y: 199, r: 55 }],
  },
  {
    id: 'campfire', name: 'Campfire', district: 'Western Woods', verb: 'Sit by', color: '#f97316',
    x: 740, y: 640, w: 160, h: 110, collider: { w: 64, h: 26 },
    door: { x: 740, y: 676 },
    lights: [{ x: 80, y: 70, r: 190, color: 'rgba(255, 150, 60, 0.85)' }],
  },
  {
    id: 'post', name: 'Post Office', district: 'East Road', verb: 'Write to', color: '#4f7cac',
    x: 1880, y: 980, w: 200, h: 190, collider: { w: 160, h: 50 },
    door: { x: 1880, y: 1014 },
    lights: [{ x: 57, y: 123, r: 55 }, { x: 143, y: 123, r: 55 }],
  },
  {
    id: 'portal', name: 'Blog Portal', district: 'West Road', verb: 'Step into', color: '#0891b2',
    x: 480, y: 980, w: 150, h: 200, collider: { w: 120, h: 24 },
    door: { x: 480, y: 1014 },
    lights: [{ x: 75, y: 130, r: 150, color: 'rgba(110, 200, 255, 0.85)' }],
  },
  {
    id: 'rideshare', name: 'Ride Share Stop', district: 'Project District', verb: 'Inspect', color: '#3d8b7d',
    x: 680, y: 1330, w: 200, h: 150, collider: { w: 180, h: 30 },
    door: { x: 680, y: 1362 },
    lights: [{ x: 70, y: 70, r: 70 }, { x: 190, y: 118, r: 40 }],
  },
  {
    id: 'parking', name: 'Smart Parking', district: 'Project District', verb: 'Inspect', color: '#3b82f6',
    x: 1030, y: 1420, w: 220, h: 180, collider: { w: 200, h: 60 },
    door: { x: 1030, y: 1452 },
    lights: [{ x: 110, y: 92, r: 95 }, { x: 15, y: 38, r: 30, color: 'rgba(255, 80, 80, 0.8)' }],
  },
  {
    id: 'wallet', name: 'Identity Vault', district: 'Project District', verb: 'Inspect', color: '#8b5cf6',
    x: 1380, y: 1420, w: 200, h: 190, collider: { w: 180, h: 50 },
    door: { x: 1380, y: 1452 },
    lights: [{ x: 100, y: 122, r: 70, color: 'rgba(190, 150, 255, 0.8)' }],
  },
  {
    id: 'vidsbeats', name: 'VIDSBEATS Stage', district: 'Project District', verb: 'Inspect', color: '#db2777',
    x: 1730, y: 1330, w: 230, h: 190, collider: { w: 210, h: 50 },
    door: { x: 1730, y: 1362 },
    lights: [{ x: 115, y: 83, r: 130, color: 'rgba(255, 110, 200, 0.8)' }],
  },
];

export const landmarkById = Object.fromEntries(landmarks.map(l => [l.id, l])) as Record<LandmarkId, Landmark>;

// ---------- Paths ----------

type Pt = [number, number];

export const paths: Pt[][] = [
  [[1200, 900], [1200, 600]],
  [[1200, 900], [1420, 800], [1660, 680]],
  [[1200, 900], [980, 780], [740, 680]],
  [[1200, 900], [1520, 960], [1880, 1020]],
  [[1200, 900], [880, 980], [480, 1020]],
  [[1200, 900], [1200, 1190]],
  [[1200, 1190], [920, 1260], [680, 1366]],
  [[1200, 1190], [1090, 1300], [1030, 1456]],
  [[1200, 1190], [1310, 1300], [1380, 1456]],
  [[1200, 1190], [1480, 1260], [1730, 1366]],
  [[1660, 680], [1790, 600], [1850, 520]],
];

export function pathD(p: Pt[]): string {
  if (p.length === 2) return `M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]}`;
  return `M${p[0][0]} ${p[0][1]} Q${p[1][0]} ${p[1][1]} ${p[2][0]} ${p[2][1]}`;
}

function samplePath(p: Pt[], steps = 24): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    if (p.length === 2) {
      out.push([p[0][0] + (p[1][0] - p[0][0]) * t, p[0][1] + (p[1][1] - p[0][1]) * t]);
    } else {
      const u = 1 - t;
      out.push([
        u * u * p[0][0] + 2 * u * t * p[1][0] + t * t * p[2][0],
        u * u * p[0][1] + 2 * u * t * p[1][1] + t * t * p[2][1],
      ]);
    }
  }
  return out;
}

const pathSamples = paths.flatMap(p => samplePath(p));

// ---------- Scenery ----------

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Tree {
  x: number;
  y: number;
  kind: 'round' | 'pine';
  scale: number;
  tint: number; // 0..2 colour variant
}

export interface Lamp {
  x: number;
  y: number;
}

export const lamps: Lamp[] = [
  { x: 1140, y: 720 }, { x: 1260, y: 720 },
  { x: 1440, y: 850 }, { x: 960, y: 850 },
  { x: 1560, y: 1010 }, { x: 840, y: 1040 },
  { x: 1140, y: 1160 }, { x: 1260, y: 1160 },
];

const inLake = (x: number, y: number, pad = 0) =>
  ((x - LAKE.x) / (LAKE.rx + pad)) ** 2 + ((y - LAKE.y) / (LAKE.ry + pad)) ** 2 < 1;

function clearOfStuff(x: number, y: number, minPath: number): boolean {
  if (inLake(x, y, 50)) return false;
  if (Math.hypot(x - PLAZA.x, y - PLAZA.y) < PLAZA.r + 90) return false;
  if (Math.hypot(x - SPAWN.x, y - SPAWN.y) < 120) return false;
  for (const l of landmarks) {
    if (Math.abs(x - l.x) < l.w / 2 + 50 && y > l.y - l.h * 0.55 && y < l.y + 90) return false;
  }
  for (const [px, py] of pathSamples) {
    if (Math.hypot(x - px, y - py) < minPath) return false;
  }
  for (const lamp of lamps) {
    if (Math.hypot(x - lamp.x, y - lamp.y) < 50) return false;
  }
  return true;
}

function makeTrees(): Tree[] {
  const r = rng(42);
  const trees: Tree[] = [];
  const tooClose = (x: number, y: number, d: number) => trees.some(t => Math.hypot(t.x - x, t.y - y) < d);
  const add = (x: number, y: number) =>
    trees.push({ x, y, kind: r() < 0.35 ? 'pine' : 'round', scale: 0.85 + r() * 0.4, tint: Math.floor(r() * 3) });

  // Border forest so the world edge feels natural.
  for (let row = 0; row < 2; row++) {
    const inset = 40 + row * 70;
    for (let x = 30; x < WORLD_W; x += 70 + r() * 30) {
      add(x + r() * 20, inset + r() * 20);
      add(x + r() * 20, WORLD_H - inset + 30 + r() * 10);
    }
    for (let y = 160; y < WORLD_H - 80; y += 70 + r() * 30) {
      add(inset - 20 + r() * 20, y + r() * 20);
      add(WORLD_W - inset + 10 + r() * 20, y + r() * 20);
    }
  }

  // Scattered interior trees and a few groves.
  let attempts = 0;
  let placed = 0;
  while (placed < 110 && attempts < 4000) {
    attempts++;
    const x = 180 + r() * (WORLD_W - 360);
    const y = 220 + r() * (WORLD_H - 420);
    if (!clearOfStuff(x, y, 70) || tooClose(x, y, 75)) continue;
    add(x, y);
    placed++;
  }
  return trees;
}

export const trees = makeTrees();

export interface Decor {
  x: number;
  y: number;
  kind: 'flowers' | 'rock' | 'bush' | 'tuft';
  hue: number;
}

function makeDecor(): Decor[] {
  const r = rng(7);
  const out: Decor[] = [];
  const kinds: Decor['kind'][] = ['flowers', 'flowers', 'tuft', 'tuft', 'tuft', 'rock', 'bush'];
  let tries = 0;
  while (out.length < 260 && tries < 6000) {
    tries++;
    const x = 120 + r() * (WORLD_W - 240);
    const y = 160 + r() * (WORLD_H - 300);
    if (!clearOfStuff(x, y, 40)) continue;
    out.push({ x, y, kind: kinds[Math.floor(r() * kinds.length)], hue: Math.floor(r() * 4) });
  }
  return out;
}

export const decor = makeDecor();

export const fireflies = Array.from({ length: 36 }, (_, i) => {
  const r = rng(100 + i);
  return { x: 200 + r() * (WORLD_W - 400), y: 200 + r() * (WORLD_H - 400), delay: r() * 6, dur: 5 + r() * 6 };
});

// ---------- Collision ----------

interface Rect { x: number; y: number; w: number; h: number }

const FOUNTAIN = { x: PLAZA.x, y: PLAZA.y + 10 };

const solids: Rect[] = [
  ...landmarks.map(l => ({ x: l.x - l.collider.w / 2, y: l.y - l.collider.h, w: l.collider.w, h: l.collider.h })),
  ...trees.map(t => ({ x: t.x - 10 * t.scale, y: t.y - 10, w: 20 * t.scale, h: 12 })),
  ...lamps.map(l => ({ x: l.x - 6, y: l.y - 8, w: 12, h: 10 })),
  { x: FOUNTAIN.x - 72, y: FOUNTAIN.y - 46, w: 144, h: 50 },
];

export const fountain = FOUNTAIN;

const HALF_W = 12;
const HALF_H = 7;
const EDGE = 60;

export function isBlocked(x: number, y: number): boolean {
  if (x < EDGE || x > WORLD_W - EDGE || y < EDGE + 40 || y > WORLD_H - EDGE) return true;
  if (inLake(x, y, -22)) return true;
  for (const s of solids) {
    if (x + HALF_W > s.x && x - HALF_W < s.x + s.w && y + HALF_H > s.y && y - HALF_H < s.y + s.h) return true;
  }
  return false;
}

export const INTERACT_RADIUS = 80;

// ---------- Pathfinding (A* on a coarse grid, then smoothed with line-of-sight checks) ----------

const CELL = 16;
const COLS = Math.ceil(WORLD_W / CELL);
const ROWS = Math.ceil(WORLD_H / CELL);
let grid: Uint8Array | null = null;

function getGrid(): Uint8Array {
  if (!grid) {
    grid = new Uint8Array(COLS * ROWS);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        grid[r * COLS + c] = isBlocked(c * CELL + CELL / 2, r * CELL + CELL / 2) ? 1 : 0;
      }
    }
  }
  return grid;
}

const cellOf = (x: number, y: number) => [
  Math.max(0, Math.min(COLS - 1, Math.floor(x / CELL))),
  Math.max(0, Math.min(ROWS - 1, Math.floor(y / CELL))),
];

function nearestOpen(c0: number, r0: number): number | null {
  const g = getGrid();
  for (let rad = 0; rad < 30; rad++) {
    let best: number | null = null;
    let bestD = Infinity;
    for (let dr = -rad; dr <= rad; dr++) {
      for (let dc = -rad; dc <= rad; dc++) {
        if (Math.max(Math.abs(dr), Math.abs(dc)) !== rad) continue;
        const c = c0 + dc;
        const r = r0 + dr;
        if (c < 0 || r < 0 || c >= COLS || r >= ROWS || g[r * COLS + c]) continue;
        const d = dc * dc + dr * dr;
        if (d < bestD) {
          bestD = d;
          best = r * COLS + c;
        }
      }
    }
    if (best !== null) return best;
  }
  return null;
}

function clearLine(x0: number, y0: number, x1: number, y1: number): boolean {
  const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 6);
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    if (isBlocked(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)) return false;
  }
  return true;
}

/** Returns waypoints from (sx, sy) towards (tx, ty), ending at the closest reachable point. */
export function findPath(sx: number, sy: number, tx: number, ty: number): Pt[] {
  if (!isBlocked(tx, ty) && clearLine(sx, sy, tx, ty)) return [[tx, ty]];

  const g = getGrid();
  const [sc, sr] = cellOf(sx, sy);
  const [tc, tr] = cellOf(tx, ty);
  const start = g[sr * COLS + sc] ? nearestOpen(sc, sr) : sr * COLS + sc;
  const goal = g[tr * COLS + tc] ? nearestOpen(tc, tr) : tr * COLS + tc;
  if (start === null || goal === null) return [];

  const gx = goal % COLS;
  const gy = Math.floor(goal / COLS);
  const h = (i: number) => {
    const dx = Math.abs((i % COLS) - gx);
    const dy = Math.abs(Math.floor(i / COLS) - gy);
    return Math.max(dx, dy) + 0.414 * Math.min(dx, dy);
  };

  const cost = new Float32Array(COLS * ROWS).fill(Infinity);
  const from = new Int32Array(COLS * ROWS).fill(-1);
  const closed = new Uint8Array(COLS * ROWS);
  // Binary min-heap of [f, index].
  const heap: [number, number][] = [];
  const push = (n: [number, number]) => {
    heap.push(n);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };

  cost[start] = 0;
  push([h(start), start]);
  let found = false;
  while (heap.length) {
    const [, cur] = pop();
    if (closed[cur]) continue;
    closed[cur] = 1;
    if (cur === goal) {
      found = true;
      break;
    }
    const cx = cur % COLS;
    const cy = Math.floor(cur / COLS);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) continue;
        const ni = ny * COLS + nx;
        if (g[ni] || closed[ni]) continue;
        if (dx && dy && (g[cy * COLS + nx] || g[ny * COLS + cx])) continue; // no corner cutting
        const nc = cost[cur] + (dx && dy ? 1.414 : 1);
        if (nc < cost[ni]) {
          cost[ni] = nc;
          from[ni] = cur;
          push([nc + h(ni), ni]);
        }
      }
    }
  }
  if (!found) return [];

  const cells: Pt[] = [];
  for (let i = goal; i !== -1; i = from[i]) {
    cells.push([(i % COLS) * CELL + CELL / 2, Math.floor(i / COLS) * CELL + CELL / 2]);
  }
  cells.reverse();
  if (goal === tr * COLS + tc && !isBlocked(tx, ty)) cells[cells.length - 1] = [tx, ty];

  // String-pull: skip waypoints that are directly visible.
  const out: Pt[] = [];
  let px = sx;
  let py = sy;
  let i = 0;
  while (i < cells.length) {
    let j = cells.length - 1;
    while (j > i && !clearLine(px, py, cells[j][0], cells[j][1])) j--;
    out.push(cells[j]);
    [px, py] = cells[j];
    i = j + 1;
  }
  return out;
}
