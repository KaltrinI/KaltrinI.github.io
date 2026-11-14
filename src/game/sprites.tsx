import React from 'react';
import { LandmarkId } from './world';

// All sprites are drawn in their own viewBox; the base line (ground contact) is near the bottom edge.

const Shadow: React.FC<{ cx: number; cy: number; rx: number; ry?: number }> = ({ cx, cy, rx, ry = 10 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(20, 40, 20, 0.22)" />
);

const House = () => (
  <svg viewBox="0 0 240 220" width="240" height="220">
    <Shadow cx={120} cy={210} rx={118} ry={12} />
    <g className="smoke">
      <circle cx="176" cy="44" r="7" />
      <circle cx="180" cy="30" r="9" />
      <circle cx="174" cy="14" r="11" />
    </g>
    <rect x="30" y="110" width="180" height="98" rx="4" fill="#f6ecd8" />
    <rect x="30" y="110" width="180" height="14" fill="#e7d8b9" />
    <rect x="165" y="58" width="22" height="42" fill="#a46b47" />
    <rect x="161" y="52" width="30" height="10" rx="2" fill="#7f5539" />
    <polygon points="12,120 120,38 228,120" fill="#e07a5f" />
    <polygon points="120,38 228,120 120,120" fill="#cc6a50" />
    <polygon points="12,120 228,120 218,130 22,130" fill="#b5573f" />
    <circle cx="120" cy="92" r="13" fill="#fff" />
    <circle className="win" cx="120" cy="92" r="10" />
    <rect x="48" y="140" width="40" height="32" rx="5" fill="#fff" />
    <rect className="win" x="52" y="144" width="32" height="24" rx="3" />
    <path d="M68 144 V168 M52 156 H84" stroke="#fff" strokeWidth="3" />
    <rect x="152" y="140" width="40" height="32" rx="5" fill="#fff" />
    <rect className="win" x="156" y="144" width="32" height="24" rx="3" />
    <path d="M172 144 V168 M156 156 H188" stroke="#fff" strokeWidth="3" />
    <rect x="46" y="172" width="44" height="9" rx="3" fill="#8a5a44" />
    <rect x="150" y="172" width="44" height="9" rx="3" fill="#8a5a44" />
    {[54, 64, 74, 84, 158, 168, 178, 188].map((x, i) => (
      <circle key={x} cx={x} cy="171" r="4" fill={['#f472b6', '#facc15', '#fb7185', '#a78bfa'][i % 4]} />
    ))}
    <path d="M104 208 V168 A16 16 0 0 1 136 168 V208 Z" fill="#6b4f3a" />
    <circle cx="130" cy="188" r="2.5" fill="#f3d27a" />
    <rect x="96" y="204" width="48" height="7" rx="2" fill="#cdbb95" />
  </svg>
);

const Tower = () => (
  <svg viewBox="0 0 170 280" width="170" height="280">
    <Shadow cx={85} cy={268} rx={78} />
    <path d="M35 268 L45 110 L125 110 L135 268 Z" fill="#d5dbe7" />
    <path d="M85 110 L125 110 L135 268 L85 268 Z" fill="#c4cbdb" />
    {[140, 170, 200, 230].map(y => (
      <line key={y} x1="40" x2="130" y1={y} y2={y} stroke="#b4bccd" strokeWidth="2" />
    ))}
    <rect x="36" y="96" width="98" height="18" rx="2" fill="#b4bccd" />
    {[36, 58, 80, 102, 124].map(x => (
      <rect key={x} x={x} y="86" width="10" height="12" rx="1" fill="#b4bccd" />
    ))}
    <polygon points="30,100 85,18 140,100" fill="#5b6ee1" />
    <polygon points="85,18 140,100 85,100" fill="#4a5bc4" />
    <line x1="85" y1="20" x2="85" y2="0" stroke="#6b7280" strokeWidth="3" />
    <path className="flag" d="M86 2 L114 8 L86 15 Z" fill="#f2c14e" />
    <rect x="72" y="134" width="26" height="32" rx="13" fill="#fff" />
    <rect className="win" x="75" y="137" width="20" height="28" rx="10" />
    <rect x="72" y="184" width="26" height="32" rx="13" fill="#fff" />
    <rect className="win" x="75" y="187" width="20" height="28" rx="10" />
    <rect x="44" y="118" width="18" height="48" fill="#e07a5f" />
    <polygon points="44,166 53,158 62,166" fill="#d5dbe7" />
    <rect x="108" y="118" width="18" height="48" fill="#e07a5f" />
    <polygon points="108,166 117,158 126,166" fill="#c4cbdb" />
    <path d="M70 268 V240 A15 15 0 0 1 100 240 V268 Z" fill="#4a3b5c" />
  </svg>
);

const Campfire = () => (
  <svg viewBox="0 0 160 110" width="160" height="110">
    <rect x="6" y="74" width="34" height="14" rx="7" fill="#8a5a44" />
    <circle cx="13" cy="81" r="5" fill="#c69c72" />
    <rect x="120" y="74" width="34" height="14" rx="7" fill="#8a5a44" />
    <circle cx="147" cy="81" r="5" fill="#c69c72" />
    <ellipse cx="80" cy="92" rx="36" ry="14" fill="rgba(40,30,20,0.25)" />
    <ellipse cx="80" cy="90" rx="34" ry="13" fill="none" stroke="#9aa1a8" strokeWidth="8" strokeDasharray="12 4" />
    <rect x="56" y="80" width="48" height="9" rx="4" fill="#7a4b33" transform="rotate(18 80 84)" />
    <rect x="56" y="80" width="48" height="9" rx="4" fill="#8a5a44" transform="rotate(-18 80 84)" />
    <g className="flame">
      <path d="M80 30 C96 52 100 66 92 80 C88 88 72 88 68 80 C60 66 66 50 80 30 Z" fill="#ff7a3d" />
      <path d="M80 48 C90 62 92 72 86 80 C83 84 77 84 74 80 C69 72 72 62 80 48 Z" fill="#ffd166" />
    </g>
    <g className="sparks">
      <circle cx="74" cy="34" r="2" fill="#ffd166" />
      <circle cx="88" cy="26" r="1.6" fill="#ffb347" />
      <circle cx="82" cy="18" r="1.4" fill="#ffd166" />
    </g>
  </svg>
);

const PostOffice = () => (
  <svg viewBox="0 0 200 190" width="200" height="190">
    <Shadow cx={100} cy={180} rx={96} />
    <rect x="30" y="85" width="140" height="95" fill="#fdf6e3" />
    <rect x="30" y="85" width="140" height="10" fill="#efe3c4" />
    <polygon points="16,92 40,48 160,48 184,92" fill="#4f7cac" />
    <polygon points="100,48 160,48 184,92 100,92" fill="#46709c" />
    <rect x="16" y="88" width="168" height="8" rx="2" fill="#3e6590" />
    <rect x="68" y="56" width="64" height="28" rx="5" fill="#fff" />
    <rect x="85" y="62" width="30" height="17" rx="2" fill="#fbbf24" />
    <polyline points="85,62 100,72 115,62" stroke="#b45309" strokeWidth="2" fill="none" />
    <rect x="40" y="108" width="34" height="30" rx="4" fill="#fff" />
    <rect className="win" x="43" y="111" width="28" height="24" rx="3" />
    <rect x="126" y="108" width="34" height="30" rx="4" fill="#fff" />
    <rect className="win" x="129" y="111" width="28" height="24" rx="3" />
    <rect x="84" y="128" width="32" height="52" rx="3" fill="#3e6590" />
    <rect className="win" x="91" y="136" width="18" height="14" rx="2" />
    <rect x="176" y="150" width="5" height="30" fill="#6b4f3a" />
    <rect x="166" y="132" width="26" height="20" rx="7" fill="#ef4444" />
    <rect x="171" y="140" width="12" height="3" rx="1" fill="#7f1d1d" />
    <rect className="mailflag" x="190" y="124" width="3" height="14" fill="#fbbf24" />
  </svg>
);

const Portal = () => (
  <svg viewBox="0 0 150 200" width="150" height="200">
    <defs>
      <radialGradient id="portalGrad" cx="50%" cy="60%" r="60%">
        <stop offset="0%" stopColor="#e0f7ff" />
        <stop offset="40%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#7c3aed" />
      </radialGradient>
    </defs>
    <ellipse cx="75" cy="186" rx="66" ry="12" fill="#a8a29e" />
    <ellipse cx="75" cy="182" rx="60" ry="9" fill="#d6d3d1" />
    <path d="M42 182 L42 82 A33 33 0 0 1 108 82 L108 182 Z" fill="url(#portalGrad)" />
    <g className="swirl" style={{ transformOrigin: '75px 125px' }}>
      <ellipse cx="75" cy="125" rx="22" ry="40" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeDasharray="20 10" />
      <ellipse cx="75" cy="125" rx="12" ry="24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeDasharray="10 8" />
    </g>
    <path d="M20 184 L20 80 A55 55 0 0 1 130 80 L130 184 L108 184 L108 82 A33 33 0 0 0 42 82 L42 184 Z" fill="#8b8d98" />
    <path d="M20 120 H42 M108 120 H130 M20 155 H42 M108 155 H130 M34 44 L48 60 M116 44 L102 60" stroke="#767884" strokeWidth="2" />
    <circle className="gem" cx="75" cy="27" r="7" fill="#22d3ee" />
  </svg>
);

const RideShare = () => (
  <svg viewBox="0 0 200 150" width="200" height="150">
    <Shadow cx={100} cy={140} rx={96} />
    <rect x="32" y="56" width="76" height="62" rx="3" fill="#bfe3dd" opacity="0.75" />
    <rect x="26" y="50" width="6" height="90" fill="#5b6b73" />
    <rect x="108" y="50" width="6" height="90" fill="#5b6b73" />
    <rect x="18" y="40" width="104" height="12" rx="4" fill="#3d8b7d" />
    <rect x="40" y="104" width="60" height="8" rx="3" fill="#8a5a44" />
    <rect x="44" y="112" width="4" height="14" fill="#6b4f3a" />
    <rect x="92" y="112" width="4" height="14" fill="#6b4f3a" />
    <rect x="148" y="34" width="4" height="70" fill="#5b6b73" />
    <circle cx="150" cy="30" r="15" fill="#3d8b7d" />
    <path d="M143 35 C143 24 152 20 158 21 C158 30 152 36 143 35 Z" fill="#a7f3d0" />
    <g className="car">
      <path d="M128 112 Q136 92 154 92 L168 92 Q182 92 188 112 Z" fill="#5fc488" />
      <path d="M137 111 Q143 97 154 97 L160 97 L160 111 Z M164 97 L168 97 Q177 97 182 111 L164 111 Z" fill="#d9f3ff" />
      <rect x="118" y="108" width="80" height="24" rx="9" fill="#6ccf8e" />
      <rect x="192" y="114" width="6" height="5" rx="2" fill="#fef08a" />
      <circle cx="136" cy="133" r="8" fill="#2f3640" />
      <circle cx="136" cy="133" r="3" fill="#9ca3af" />
      <circle cx="180" cy="133" r="8" fill="#2f3640" />
      <circle cx="180" cy="133" r="3" fill="#9ca3af" />
    </g>
  </svg>
);

const Parking = () => (
  <svg viewBox="0 0 220 180" width="220" height="180">
    <Shadow cx={110} cy={170} rx={106} />
    <rect x="20" y="60" width="180" height="110" fill="#dde1e7" />
    <rect x="14" y="58" width="192" height="10" rx="2" fill="#b8bfc9" />
    <rect x="14" y="112" width="192" height="8" rx="2" fill="#b8bfc9" />
    <rect x="28" y="72" width="164" height="36" rx="2" fill="#4b5563" />
    {[
      [38, '#f87171'], [76, '#60a5fa'], [114, '#facc15'], [152, '#a78bfa'],
    ].map(([x, c]) => (
      <rect key={x as number} x={x as number} y="88" width="30" height="16" rx="5" fill={c as string} />
    ))}
    <rect x="80" y="124" width="60" height="46" rx="2" fill="#374151" />
    <rect x="160" y="16" width="40" height="40" rx="9" fill="#3b82f6" />
    <text x="180" y="47" textAnchor="middle" fontSize="28" fontWeight="800" fill="#fff" fontFamily="Outfit, sans-serif">P</text>
    <rect x="8" y="40" width="4" height="130" fill="#6b7280" />
    <rect x="2" y="30" width="24" height="13" rx="3" fill="#374151" />
    <circle className="blink" cx="20" cy="36" r="2.6" fill="#ef4444" />
    <rect x="146" y="140" width="8" height="30" rx="2" fill="#f59e0b" />
    <g className="barrier" style={{ transformOrigin: '150px 146px' }}>
      <rect x="84" y="143" width="66" height="6" rx="3" fill="#ef4444" />
      <line x1="88" y1="146" x2="146" y2="146" stroke="#fff" strokeWidth="6" strokeDasharray="8 8" />
    </g>
  </svg>
);

const Vault = () => (
  <svg viewBox="0 0 200 190" width="200" height="190">
    <Shadow cx={100} cy={182} rx={98} />
    <rect x="10" y="168" width="180" height="14" rx="2" fill="#cfc6b4" />
    <rect x="20" y="160" width="160" height="9" rx="2" fill="#ddd5c3" />
    <rect x="25" y="80" width="150" height="80" fill="#efe7d6" />
    <polygon points="12,84 100,30 188,84" fill="#e3d7bd" />
    <polygon points="34,78 100,40 166,78" fill="none" stroke="#d1c19e" strokeWidth="2" />
    <rect x="12" y="76" width="176" height="9" rx="2" fill="#d6c7a6" />
    {[34, 62, 126, 154].map(x => (
      <g key={x}>
        <rect x={x} y="86" width="14" height="74" fill="#fbf7ee" />
        <rect x={x - 2} y="86" width="18" height="5" fill="#d6c7a6" />
        <rect x={x - 2} y="155" width="18" height="5" fill="#d6c7a6" />
      </g>
    ))}
    <circle cx="100" cy="122" r="30" fill="#9ca3af" stroke="#6b7280" strokeWidth="5" />
    <g className="spin-slow" style={{ transformOrigin: '100px 122px' }}>
      <circle cx="100" cy="122" r="19" fill="#b8bec7" />
      {[0, 60, 120].map(a => (
        <rect key={a} x="97" y="102" width="6" height="40" rx="3" fill="#6b7280" transform={`rotate(${a} 100 122)`} />
      ))}
    </g>
    <circle cx="100" cy="122" r="6" fill="#4b5563" />
    <circle cx="100" cy="62" r="10" fill="#8b5cf6" />
    <path d="M96 62 a4 4 0 1 1 8 0 v1 h-2 v5 h-4 v-5 h-2 z" fill="#ede9fe" />
  </svg>
);

const Stage = () => (
  <svg viewBox="0 0 230 190" width="230" height="190">
    <defs>
      <linearGradient id="vbGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <Shadow cx={115} cy={182} rx={110} />
    <polygon className="beam" points="60,28 30,136 90,136" fill="rgba(255,240,180,0.25)" />
    <polygon className="beam beam2" points="170,28 140,136 200,136" fill="rgba(255,240,180,0.25)" />
    <rect x="35" y="20" width="160" height="8" rx="2" fill="#6b6b80" />
    <rect x="35" y="20" width="8" height="120" fill="#6b6b80" />
    <rect x="187" y="20" width="8" height="120" fill="#6b6b80" />
    <rect x="54" y="26" width="12" height="8" rx="2" fill="#2b2a3a" />
    <rect x="164" y="26" width="12" height="8" rx="2" fill="#2b2a3a" />
    <rect x="48" y="40" width="134" height="86" rx="6" fill="#1f1d2e" />
    <rect x="54" y="46" width="122" height="74" rx="3" fill="url(#vbGrad)" />
    <polygon points="106,68 106,98 130,83" fill="#fff" />
    <rect x="15" y="138" width="200" height="44" rx="3" fill="#3f3d56" />
    <rect x="15" y="134" width="200" height="8" rx="2" fill="#57557a" />
    <rect x="6" y="94" width="30" height="46" rx="4" fill="#2b2a3a" />
    <circle cx="21" cy="108" r="6" fill="#4b4a63" />
    <circle cx="21" cy="126" r="9" fill="#4b4a63" />
    <rect x="194" y="94" width="30" height="46" rx="4" fill="#2b2a3a" />
    <circle cx="209" cy="108" r="6" fill="#4b4a63" />
    <circle cx="209" cy="126" r="9" fill="#4b4a63" />
    <text className="note" x="20" y="86" fontSize="18" fill="#f472b6">♪</text>
    <text className="note note2" x="200" y="84" fontSize="18" fill="#a78bfa">♫</text>
  </svg>
);

const Signpost = () => (
  <svg viewBox="0 0 90 110" width="90" height="110">
    <ellipse cx="45" cy="104" rx="18" ry="5" fill="rgba(20,40,20,0.22)" />
    <rect x="41" y="18" width="8" height="86" rx="2" fill="#8a5a44" />
    <path d="M14 24 L70 24 L82 35 L70 46 L14 46 Z" fill="#c98b56" />
    <path d="M76 54 L20 54 L8 65 L20 76 L76 76 Z" fill="#b8784a" />
    <path d="M24 32 H60 M24 38 H50 M30 62 H66 M40 68 H66" stroke="#7a4b33" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="45" cy="15" r="6" fill="#fbbf24" className="gem" />
  </svg>
);

export const landmarkSprites: Record<LandmarkId, React.FC> = {
  guide: Signpost,
  home: House,
  skills: Tower,
  campfire: Campfire,
  post: PostOffice,
  portal: Portal,
  rideshare: RideShare,
  parking: Parking,
  wallet: Vault,
  vidsbeats: Stage,
};

// ---------- Scenery sprites ----------

const ROUND_TINTS = [
  ['#4caf6a', '#5fc27c', '#7bd391'],
  ['#3f9e63', '#52b574', '#6fca8a'],
  ['#6bb25a', '#80c56c', '#9ad683'],
];
const PINE_TINTS = [
  ['#2f855a', '#38a169'],
  ['#276749', '#2f855a'],
  ['#3a8f5e', '#48a870'],
];

export const TreeSprite: React.FC<{ kind: 'round' | 'pine'; tint: number }> = ({ kind, tint }) =>
  kind === 'round' ? (
    <svg viewBox="0 0 90 110" width="90" height="110">
      <ellipse cx="45" cy="104" rx="30" ry="7" fill="rgba(20,40,20,0.22)" />
      <rect x="39" y="66" width="12" height="38" rx="4" fill="#8a5a44" />
      <g className="sway">
        <circle cx="30" cy="56" r="24" fill={ROUND_TINTS[tint][0]} />
        <circle cx="60" cy="56" r="24" fill={ROUND_TINTS[tint][0]} />
        <circle cx="45" cy="36" r="30" fill={ROUND_TINTS[tint][1]} />
        <circle cx="36" cy="28" r="12" fill={ROUND_TINTS[tint][2]} opacity="0.8" />
      </g>
    </svg>
  ) : (
    <svg viewBox="0 0 90 110" width="90" height="110">
      <ellipse cx="45" cy="104" rx="24" ry="6" fill="rgba(20,40,20,0.22)" />
      <rect x="40" y="78" width="10" height="26" rx="3" fill="#7a4b33" />
      <g className="sway">
        <polygon points="45,40 14,86 76,86" fill={PINE_TINTS[tint][0]} />
        <polygon points="45,22 20,64 70,64" fill={PINE_TINTS[tint][1]} />
        <polygon points="45,4 26,42 64,42" fill={PINE_TINTS[tint][0]} />
        <polygon points="45,4 45,42 64,42" fill="rgba(0,0,0,0.08)" />
      </g>
    </svg>
  );

export const LampSprite = () => (
  <svg viewBox="0 0 24 70" width="24" height="70">
    <ellipse cx="12" cy="66" rx="8" ry="3" fill="rgba(20,40,20,0.22)" />
    <rect x="10" y="16" width="4" height="50" fill="#374151" />
    <rect x="6" y="62" width="12" height="5" rx="2" fill="#374151" />
    <path d="M4 16 L20 16 L17 4 L7 4 Z" fill="#374151" />
    <rect className="lamp-glass" x="7" y="7" width="10" height="8" rx="1" />
  </svg>
);

export const FountainSprite = () => (
  <svg viewBox="0 0 160 110" width="160" height="110">
    <ellipse cx="80" cy="92" rx="76" ry="16" fill="rgba(20,40,20,0.2)" />
    <ellipse cx="80" cy="84" rx="72" ry="20" fill="#b9c0c9" />
    <ellipse cx="80" cy="80" rx="64" ry="15" fill="#7cc8ec" />
    <ellipse className="ripple" cx="80" cy="80" rx="30" ry="7" fill="none" stroke="#d6f1ff" strokeWidth="2" />
    <rect x="72" y="40" width="16" height="40" rx="4" fill="#cbd2da" />
    <ellipse cx="80" cy="42" rx="24" ry="7" fill="#b9c0c9" />
    <ellipse cx="80" cy="40" rx="19" ry="5" fill="#7cc8ec" />
    <g className="spray">
      <path d="M80 36 C80 20 66 16 60 34" stroke="#bfe8ff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 36 C80 20 94 16 100 34" stroke="#bfe8ff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 38 V14" stroke="#e0f4ff" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

export const PlayerSprite = () => (
  <svg viewBox="0 0 40 60" width="40" height="60" className="player-svg">
    <ellipse cx="20" cy="56" rx="12" ry="4" fill="rgba(20,40,20,0.28)" />
    <g className="leg leg-l">
      <rect x="13" y="40" width="6" height="14" rx="3" fill="#334155" />
    </g>
    <g className="leg leg-r">
      <rect x="21" y="40" width="6" height="14" rx="3" fill="#334155" />
    </g>
    <g className="torso">
      <rect x="8" y="26" width="24" height="18" rx="7" fill="#0ea5a4" />
      <rect x="18" y="26" width="4" height="10" rx="2" fill="#0b8a89" />
      <circle className="arm arm-l" cx="9" cy="34" r="4" fill="#f1c7a3" />
      <circle className="arm arm-r" cx="31" cy="34" r="4" fill="#f1c7a3" />
      <circle cx="20" cy="17" r="11" fill="#f1c7a3" />
      <path className="hair-front" d="M9 16 C9 6 15 3 21 3 C28 3 32 8 31 16 C27 12 22 10 16 12 C13 13 11 15 9 16 Z" fill="#3b2a20" />
      <path className="hair-back" d="M9 18 C8 6 15 3 20 3 C27 3 32 7 31 18 C31 25 26 27 20 27 C14 27 9 25 9 18 Z" fill="#3b2a20" />
      <g className="eyes">
        <circle cx="16" cy="19" r="1.7" fill="#1f2937" />
        <circle cx="24" cy="19" r="1.7" fill="#1f2937" />
      </g>
    </g>
  </svg>
);
