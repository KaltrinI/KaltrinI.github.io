import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import {
  INTERACT_RADIUS, LAKE, Landmark, LandmarkId, PLAZA, SPAWN, WORLD_H, WORLD_W,
  decor, findPath, fireflies, fountain, isBlocked, lamps, landmarkById, landmarks, pathD, paths, trees,
} from './world';
import { FountainSprite, LampSprite, PlayerSprite, TreeSprite, landmarkSprites } from './sprites';

export interface GameWorldHandle {
  walkTo: (id: LandmarkId) => void;
  teleportTo: (id: LandmarkId) => void;
}

interface Props {
  night: boolean;
  paused: boolean;
  discovered: Set<LandmarkId>;
  isTouch: boolean;
  onInteract: (id: LandmarkId) => void;
  onNearbyChange: (id: LandmarkId | null) => void;
  onFirstMove: () => void;
}

const MOVE_KEYS: Record<string, [number, number]> = {
  ArrowUp: [0, -1], KeyW: [0, -1],
  ArrowDown: [0, 1], KeyS: [0, 1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0],
  ArrowRight: [1, 0], KeyD: [1, 0],
};

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName));

function computeScale(vw: number, vh: number) {
  const base = vw < 640 ? 0.72 : vw < 1024 ? 0.85 : 1;
  return Math.max(base, vw / WORLD_W, vh / WORLD_H);
}

const GameWorld = forwardRef<GameWorldHandle, Props>(function GameWorld(
  { night, paused, discovered, isTouch, onInteract, onNearbyChange, onFirstMove },
  ref,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const lanternRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const miniDotRef = useRef<SVGCircleElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const [nearby, setNearby] = useState<LandmarkId | null>(null);

  // Mutable game state lives in a ref so the render loop never triggers React re-renders.
  const s = useRef({
    x: SPAWN.x, y: SPAWN.y,
    camX: 0, camY: 0, scale: 1, vw: 0, vh: 0,
    keys: new Set<string>(), sprint: false,
    target: null as null | { x: number; y: number },
    route: [] as [number, number][],
    pending: null as LandmarkId | null,
    stuck: 0,
    nearby: null as LandmarkId | null,
    moved: false, snapCam: true,
  });

  const cb = useRef({ onInteract, onNearbyChange, onFirstMove, paused });
  cb.current = { onInteract, onNearbyChange, onFirstMove, paused };

  const goTo = (id: LandmarkId) => {
    const st = s.current;
    const l = landmarkById[id];
    if (Math.hypot(st.x - l.door.x, st.y - l.door.y) < INTERACT_RADIUS) {
      cb.current.onInteract(id);
      return;
    }
    planRoute(l.door.x, l.door.y);
    st.pending = id;
  };

  // Plans a walkable route and starts following it; the marker shows where the player will end up.
  const planRoute = (x: number, y: number) => {
    const st = s.current;
    st.route = findPath(st.x, st.y, x, y);
    st.target = null;
    st.pending = null;
    st.stuck = 0;
    const end = st.route[st.route.length - 1];
    if (end) {
      const [first, ...rest] = st.route;
      st.target = { x: first[0], y: first[1] };
      st.route = rest;
      showMarker(end[0], end[1]);
    }
  };

  const showMarker = (x: number, y: number) => {
    const m = markerRef.current;
    if (!m) return;
    m.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    m.classList.remove('active');
    void m.offsetWidth; // restart the CSS animation
    m.classList.add('active');
  };

  useImperativeHandle(ref, () => ({
    walkTo: goTo,
    teleportTo: (id: LandmarkId) => {
      const st = s.current;
      const l = landmarkById[id];
      st.x = l.door.x;
      st.y = l.door.y;
      st.target = null;
      st.route = [];
      st.pending = null;
      st.snapCam = true;
      flashRef.current?.classList.remove('active');
      void flashRef.current?.offsetWidth;
      flashRef.current?.classList.add('active');
    },
  }));

  // Pause: drop held keys and any walk target so the player doesn't drift.
  useEffect(() => {
    if (paused) {
      s.current.keys.clear();
    }
  }, [paused]);

  useEffect(() => {
    const st = s.current;
    const viewport = viewportRef.current!;

    const resize = () => {
      st.vw = viewport.clientWidth;
      st.vh = viewport.clientHeight;
      st.scale = computeScale(st.vw, st.vh);
      st.snapCam = true;
    };
    resize();
    window.addEventListener('resize', resize);

    const markMoved = () => {
      if (!st.moved) {
        st.moved = true;
        cb.current.onFirstMove();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (cb.current.paused || isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (MOVE_KEYS[e.code]) {
        e.preventDefault();
        st.keys.add(e.code);
        st.target = null;
        st.route = [];
        st.pending = null;
        markMoved();
      } else if (e.key === 'Shift') {
        st.sprint = true;
      } else if ((e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') && st.nearby) {
        e.preventDefault();
        cb.current.onInteract(st.nearby);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      st.keys.delete(e.code);
      if (e.key === 'Shift') st.sprint = false;
    };
    const onBlur = () => st.keys.clear();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);

    const onPointerDown = (e: PointerEvent) => {
      if (cb.current.paused || e.button !== 0) return;
      const el = (e.target as HTMLElement).closest('[data-landmark]') as HTMLElement | null;
      markMoved();
      if (el) {
        goTo(el.dataset.landmark as LandmarkId);
        return;
      }
      const rect = viewport.getBoundingClientRect();
      const x = (e.clientX - rect.left) / st.scale + st.camX;
      const y = (e.clientY - rect.top) / st.scale + st.camY;
      planRoute(x, y);
    };
    viewport.addEventListener('pointerdown', onPointerDown);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      let dx = 0;
      let dy = 0;
      if (!cb.current.paused) {
        st.keys.forEach(k => {
          dx += MOVE_KEYS[k][0];
          dy += MOVE_KEYS[k][1];
        });
        if (!dx && !dy && st.target) {
          const tx = st.target.x - st.x;
          const ty = st.target.y - st.y;
          const dist = Math.hypot(tx, ty);
          if (dist < 4 && st.route.length) {
            const [nx, ny] = st.route.shift()!;
            st.target = { x: nx, y: ny };
          } else if (dist < 4) {
            const pending = st.pending;
            st.target = null;
            st.pending = null;
            if (pending) cb.current.onInteract(pending);
          } else {
            dx = tx / dist;
            dy = ty / dist;
          }
        }
      }

      const moving = dx !== 0 || dy !== 0;
      if (moving) {
        const len = Math.hypot(dx, dy);
        const speed = st.sprint ? 380 : 240;
        let step = speed * dt;
        if (st.target) step = Math.min(step, Math.hypot(st.target.x - st.x, st.target.y - st.y));
        const mx = (dx / len) * step;
        const my = (dy / len) * step;
        const ox = st.x;
        const oy = st.y;
        if (!isBlocked(st.x + mx, st.y)) st.x += mx;
        if (!isBlocked(st.x, st.y + my)) st.y += my;
        if (st.target) {
          // Safety net: stop if something unexpected blocks the planned route.
          st.stuck = Math.abs(st.x - ox) + Math.abs(st.y - oy) < step * 0.2 ? st.stuck + 1 : 0;
          if (st.stuck > 12) {
            const pending = st.pending;
            st.target = null;
            st.route = [];
            st.pending = null;
            if (pending && Math.hypot(st.x - landmarkById[pending].door.x, st.y - landmarkById[pending].door.y) < INTERACT_RADIUS * 1.5) {
              cb.current.onInteract(pending);
            }
          }
        }
      }

      // Camera follows the player, clamped to the world edges.
      const viewW = st.vw / st.scale;
      const viewH = st.vh / st.scale;
      const camTX = Math.max(0, Math.min(WORLD_W - viewW, st.x - viewW / 2));
      const camTY = Math.max(0, Math.min(WORLD_H - viewH, st.y - viewH / 2 - 30));
      if (st.snapCam) {
        st.camX = camTX;
        st.camY = camTY;
        st.snapCam = false;
      } else {
        const k = Math.min(1, dt * 7);
        st.camX += (camTX - st.camX) * k;
        st.camY += (camTY - st.camY) * k;
      }

      const world = worldRef.current;
      if (world) {
        world.style.transform = `translate3d(${-st.camX * st.scale}px, ${-st.camY * st.scale}px, 0) scale(${st.scale})`;
      }
      const p = playerRef.current;
      if (p) {
        p.style.transform = `translate3d(${st.x - 20}px, ${st.y - 57}px, 0)`;
        p.style.zIndex = String(Math.round(st.y));
        p.dataset.walking = moving ? 'true' : 'false';
        if (moving) {
          p.dataset.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up';
        }
      }
      if (lanternRef.current) {
        lanternRef.current.style.transform = `translate3d(${st.x - 160}px, ${st.y - 190}px, 0)`;
      }
      if (miniDotRef.current) {
        miniDotRef.current.setAttribute('cx', String(st.x));
        miniDotRef.current.setAttribute('cy', String(st.y));
      }

      // Nearest landmark within interaction range.
      let best: Landmark | null = null;
      let bestD = INTERACT_RADIUS;
      for (const l of landmarks) {
        const d = Math.hypot(st.x - l.door.x, st.y - l.door.y);
        if (d < bestD) {
          bestD = d;
          best = l;
        }
      }
      const id = best ? best.id : null;
      if (id !== st.nearby) {
        st.nearby = id;
        setNearby(id);
        cb.current.onNearbyChange(id);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      viewport.removeEventListener('pointerdown', onPointerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`game-viewport ${night ? 'night' : 'day'}`}
      role="application"
      aria-label="Explorable world map. Use the arrow keys or WASD to walk, E to interact, or open the map to jump to a location."
    >
      <div ref={worldRef} className="world" style={{ width: WORLD_W, height: WORLD_H }}>
        <Ground />
        <Scenery />

        {landmarks.map(l => {
          const Sprite = landmarkSprites[l.id];
          return (
            <div
              key={l.id}
              data-landmark={l.id}
              className={`sprite landmark ${nearby === l.id ? 'is-near' : ''}`}
              style={{ left: l.x - l.w / 2, top: l.y - l.h, width: l.w, height: l.h, zIndex: l.y }}
              aria-hidden="true"
            >
              <Sprite />
            </div>
          );
        })}

        <div ref={markerRef} className="walk-marker" />
        <div ref={playerRef} className="player" data-dir="down" data-walking="false">
          <PlayerSprite />
        </div>

        <div className="clouds" aria-hidden="true">
          <span className="cloud c1" />
          <span className="cloud c2" />
          <span className="cloud c3" />
        </div>

        <div className="night-overlay" />
        <Lights />
        <div ref={lanternRef} className="light lantern" style={{ width: 320, height: 320 }} />
        <div className="fireflies" aria-hidden="true">
          {fireflies.map((f, i) => (
            <span
              key={i}
              className="firefly"
              style={{ left: f.x, top: f.y, animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }}
            />
          ))}
        </div>

        {landmarks.map(l => (
          <div
            key={l.id}
            data-landmark={l.id}
            className={`map-label ${nearby === l.id ? 'is-near' : ''} ${discovered.has(l.id) ? 'is-found' : ''}`}
            style={{ left: l.x, top: l.y - l.h - 6 }}
          >
            <span className="map-label-name">
              {discovered.has(l.id) && <FaCheck className="map-label-check" aria-hidden="true" />}
              {l.name}
            </span>
            {nearby === l.id && (
              <span className="map-label-prompt">
                {isTouch ? 'Tap' : <kbd>E</kbd>} {l.verb}
              </span>
            )}
          </div>
        ))}
      </div>

      <div ref={flashRef} className="travel-flash" />

      <Minimap dotRef={miniDotRef} discovered={discovered} onPick={goTo} />
    </div>
  );
});

// ---------- Static layers (memoised; they never change) ----------

const FLOWER_COLORS = ['#f472b6', '#facc15', '#fb7185', '#c4b5fd'];

const Ground = memo(() => (
  <svg className="ground" width={WORLD_W} height={WORLD_H} viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} aria-hidden="true">
    <defs>
      <pattern id="grassPat" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M10 20 l3 -7 l3 7 M50 60 l3 -7 l3 7 M60 18 l2 -5 l2 5 M24 64 l2 -5 l2 5" stroke="#7dbf63" strokeWidth="2" fill="none" strokeLinecap="round" />
      </pattern>
      <radialGradient id="lakeGrad" cx="45%" cy="40%" r="70%">
        <stop offset="0%" stopColor="#7fd0f3" />
        <stop offset="100%" stopColor="#3d96d1" />
      </radialGradient>
      <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
        <stop offset="70%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(20,50,20,0.35)" />
      </radialGradient>
    </defs>
    <rect width={WORLD_W} height={WORLD_H} fill="#8fd174" />
    <ellipse cx="600" cy="400" rx="380" ry="220" fill="#9ad97f" />
    <ellipse cx="1800" cy="1150" rx="420" ry="200" fill="#9ad97f" />
    <ellipse cx="1500" cy="300" rx="300" ry="160" fill="#85c76a" />
    <ellipse cx="400" cy="1450" rx="320" ry="160" fill="#85c76a" />
    <rect width={WORLD_W} height={WORLD_H} fill="url(#grassPat)" />

    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={`b${i}`} d={pathD(p)} stroke="#d2bb86" strokeWidth="66" />)}
      {paths.map((p, i) => <path key={`f${i}`} d={pathD(p)} stroke="#ead6a4" strokeWidth="56" />)}
      {paths.map((p, i) => (
        <path key={`s${i}`} d={pathD(p)} stroke="#f5e7c2" strokeWidth="14" strokeDasharray="3 30" opacity="0.8" />
      ))}
    </g>

    <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.r + 6} fill="#d2bb86" />
    <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.r} fill="#e9dcc0" />
    <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.r - 30} fill="none" stroke="#dccca6" strokeWidth="6" strokeDasharray="22 10" />
    <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.r - 70} fill="none" stroke="#dccca6" strokeWidth="5" strokeDasharray="16 10" />

    <ellipse cx={LAKE.x} cy={LAKE.y} rx={LAKE.rx + 20} ry={LAKE.ry + 18} fill="#ead6a4" />
    <ellipse cx={LAKE.x} cy={LAKE.y} rx={LAKE.rx} ry={LAKE.ry} fill="url(#lakeGrad)" />
    <ellipse className="lake-ripple" cx={LAKE.x - 60} cy={LAKE.y - 20} rx="60" ry="16" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="3" />
    <ellipse className="lake-ripple r2" cx={LAKE.x + 70} cy={LAKE.y + 40} rx="50" ry="12" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="3" />
    {[[-140, 50], [-120, 70], [120, -60], [150, -40]].map(([dx, dy], i) => (
      <g key={i} transform={`translate(${LAKE.x + dx} ${LAKE.y + dy})`}>
        <circle r="13" fill="#4caf6a" />
        <path d="M0 0 L13 -4 L13 4 Z" fill="url(#lakeGrad)" />
        {i % 2 === 0 && <circle cx="-4" cy="-3" r="4" fill="#f9a8d4" />}
      </g>
    ))}
    <g className="boat" transform={`translate(${LAKE.x + 20} ${LAKE.y + 10})`}>
      <path d="M-34 0 Q0 22 34 0 Z" fill="#a46b47" />
      <path d="M-30 0 H30" stroke="#7f5539" strokeWidth="3" />
    </g>

    {decor.map((d, i) => {
      switch (d.kind) {
        case 'flowers':
          return (
            <g key={i} transform={`translate(${d.x} ${d.y})`}>
              {[[-6, 0], [5, -4], [2, 6]].map(([fx, fy], j) => (
                <g key={j}>
                  <circle cx={fx} cy={fy} r="4" fill={FLOWER_COLORS[(d.hue + j) % 4]} />
                  <circle cx={fx} cy={fy} r="1.5" fill="#fff7cc" />
                </g>
              ))}
            </g>
          );
        case 'rock':
          return (
            <g key={i} transform={`translate(${d.x} ${d.y})`}>
              <ellipse cx="0" cy="4" rx="14" ry="5" fill="rgba(20,40,20,0.18)" />
              <path d="M-12 4 Q-12 -10 0 -10 Q12 -10 12 4 Z" fill="#a8b0b8" />
              <path d="M-5 -6 Q0 -9 5 -6" stroke="#c6ccd2" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          );
        case 'bush':
          return (
            <g key={i} transform={`translate(${d.x} ${d.y})`}>
              <ellipse cx="0" cy="6" rx="22" ry="6" fill="rgba(20,40,20,0.18)" />
              <circle cx="-10" cy="-2" r="11" fill="#4f9f5e" />
              <circle cx="10" cy="-2" r="11" fill="#4f9f5e" />
              <circle cx="0" cy="-8" r="13" fill="#5fb06d" />
            </g>
          );
        default:
          return (
            <path key={i} d={`M${d.x - 6} ${d.y} l3 -9 l3 9 l3 -12 l3 12`} stroke="#6fb456" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          );
      }
    })}
    <rect width={WORLD_W} height={WORLD_H} fill="url(#vignette)" />
  </svg>
));

const Scenery = memo(() => (
  <>
    {trees.map((t, i) => (
      <div
        key={i}
        className="sprite tree"
        style={{
          left: t.x - 45 * t.scale,
          top: t.y - 104 * t.scale,
          width: 90 * t.scale,
          height: 110 * t.scale,
          zIndex: Math.round(t.y),
          animationDelay: `${(i % 7) * -0.6}s`,
        }}
      >
        <TreeSprite kind={t.kind} tint={t.tint} />
      </div>
    ))}
    {lamps.map((l, i) => (
      <div key={i} className="sprite" style={{ left: l.x - 12, top: l.y - 66, width: 24, height: 70, zIndex: l.y }}>
        <LampSprite />
      </div>
    ))}
    <div className="sprite" style={{ left: fountain.x - 80, top: fountain.y - 92, width: 160, height: 110, zIndex: fountain.y }}>
      <FountainSprite />
    </div>
  </>
));

const Lights = memo(() => (
  <div className="lights" aria-hidden="true">
    {landmarks.flatMap(l =>
      l.lights.map((li, i) => (
        <div
          key={`${l.id}${i}`}
          className="light"
          style={{
            left: l.x - l.w / 2 + li.x - li.r,
            top: l.y - l.h + li.y - li.r,
            width: li.r * 2,
            height: li.r * 2,
            background: `radial-gradient(circle, ${li.color ?? 'rgba(255, 196, 110, 0.75)'} 0%, transparent 70%)`,
          }}
        />
      )),
    )}
    {lamps.map((l, i) => (
      <div key={i} className="light" style={{ left: l.x - 90, top: l.y - 150, width: 180, height: 180 }} />
    ))}
  </div>
));

const Minimap: React.FC<{
  dotRef: React.RefObject<SVGCircleElement>;
  discovered: Set<LandmarkId>;
  onPick: (id: LandmarkId) => void;
}> = ({ dotRef, discovered, onPick }) => (
  <div className="minimap" onPointerDown={e => e.stopPropagation()}>
    <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} aria-label="Minimap">
      <rect width={WORLD_W} height={WORLD_H} fill="#8fd174" />
      <g fill="none" stroke="#ead6a4" strokeWidth="40" strokeLinecap="round">
        {paths.map((p, i) => <path key={i} d={pathD(p)} />)}
      </g>
      <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.r} fill="#ead6a4" />
      <ellipse cx={LAKE.x} cy={LAKE.y} rx={LAKE.rx} ry={LAKE.ry} fill="#4fa8dc" />
      {landmarks.map(l => (
        <g key={l.id} className="mini-landmark" onClick={() => onPick(l.id)}>
          <title>{`Walk to ${l.name}`}</title>
          <circle cx={l.x} cy={l.y - 40} r="70" fill="transparent" />
          <circle
            cx={l.x}
            cy={l.y - 40}
            r="42"
            fill={l.color}
            stroke="#fff"
            strokeWidth="14"
            opacity={discovered.has(l.id) ? 1 : 0.7}
          />
        </g>
      ))}
      <circle ref={dotRef} cx={SPAWN.x} cy={SPAWN.y} r="44" fill="#fff" stroke="#0f172a" strokeWidth="16" className="mini-player" />
    </svg>
  </div>
);

export default GameWorld;
