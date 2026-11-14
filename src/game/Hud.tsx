import React, { useEffect, useRef } from 'react';
import { FaCheck, FaMap, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { landmarkIcons } from './Panel';
import { LandmarkId, landmarkById, landmarks } from './world';

export const PlayerCard: React.FC<{ found: number }> = ({ found }) => {
  const total = landmarks.length;
  return (
    <div className="hud-card glass flex items-center gap-3 p-2 pr-4 rounded-2xl">
      <img src="portrait.jpg" alt="" className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/80 dark:ring-white/20" />
      <div className="min-w-0">
        <h1 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Kaltrin Ismaili</h1>
        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Lv. 8</span> · Software Engineer
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <div
            className="h-1.5 w-24 sm:w-32 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden"
            role="progressbar"
            aria-label="Locations explored"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={found}
          >
            <div className="xp-fill h-full rounded-full transition-all duration-700" style={{ width: `${(found / total) * 100}%` }} />
          </div>
          <span className="text-[10px] font-semibold tabular-nums text-slate-500 dark:text-slate-400">
            {found}/{total}
          </span>
        </div>
      </div>
    </div>
  );
};

export const HudButton: React.FC<{ label: string; onClick: () => void; children: React.ReactNode; hotkey?: string }> = ({
  label, onClick, children, hotkey,
}) => (
  <button onClick={onClick} className="hud-btn glass" aria-label={label} title={hotkey ? `${label} (${hotkey})` : label}>
    {children}
  </button>
);

export const ThemeIcon: React.FC<{ night: boolean }> = ({ night }) => (night ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />);
export const MapIcon = () => <FaMap aria-hidden="true" />;

export const ControlsHint: React.FC<{ visible: boolean; isTouch: boolean }> = ({ visible, isTouch }) => (
  <div className={`controls-hint glass ${visible ? '' : 'is-hidden'}`} aria-hidden={!visible}>
    {isTouch ? (
      <span>Tap to walk · Tap a building to visit it</span>
    ) : (
      <>
        <span><kbd className="kbd">W</kbd><kbd className="kbd">A</kbd><kbd className="kbd">S</kbd><kbd className="kbd">D</kbd> move</span>
        <span><kbd className="kbd">E</kbd> interact</span>
        <span><kbd className="kbd">M</kbd> map</span>
        <span className="hidden sm:inline">or click to walk</span>
      </>
    )}
  </div>
);

export const ActionButton: React.FC<{ id: LandmarkId | null; onClick: (id: LandmarkId) => void; isTouch: boolean }> = ({
  id, onClick, isTouch,
}) => {
  if (!id) return null;
  const l = landmarkById[id];
  const Icon = landmarkIcons[id];
  return (
    <button
      onClick={() => onClick(id)}
      className="action-btn"
      style={{ '--accent': l.color } as React.CSSProperties}
    >
      {!isTouch && <kbd className="kbd kbd-light">E</kbd>}
      <Icon aria-hidden="true" />
      <span>
        {l.verb} {l.name}
      </span>
    </button>
  );
};

export const Toast: React.FC<{ message: string | null }> = ({ message }) => (
  <div className="toast-wrap" role="status" aria-live="polite">
    {message && (
      <div key={message} className="toast glass">
        {message}
      </div>
    )}
  </div>
);

const useFocusOnMount = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  return ref;
};

export const MapMenu: React.FC<{
  discovered: Set<LandmarkId>;
  onPick: (id: LandmarkId) => void;
  onClose: () => void;
}> = ({ discovered, onPick, onClose }) => {
  const closeRef = useFocusOnMount<HTMLButtonElement>();
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-title"
        onClick={e => e.stopPropagation()}
        className="panel-pop relative w-full max-w-2xl max-h-[88dvh] overflow-y-auto glass rounded-3xl shadow-2xl p-6"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-500 dark:text-slate-400">Fast travel</p>
            <h2 id="map-title" className="text-2xl font-bold text-slate-900 dark:text-white">Where to?</h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="grid place-items-center w-9 h-9 rounded-full bg-slate-200/70 hover:bg-slate-300/70 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200"
            aria-label="Close map"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {landmarks.map(l => {
            const Icon = landmarkIcons[l.id];
            const found = discovered.has(l.id);
            return (
              <li key={l.id}>
                <button
                  onClick={() => onPick(l.id)}
                  className="travel-card w-full text-left flex items-center gap-3 p-3 rounded-2xl"
                  style={{ '--accent': l.color } as React.CSSProperties}
                >
                  <span className="grid place-items-center w-11 h-11 rounded-xl text-white shrink-0" style={{ background: l.color }}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-900 dark:text-white truncate">{l.name}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{l.district}</span>
                  </span>
                  {found && (
                    <span className="text-emerald-600 dark:text-emerald-400" title="Visited">
                      <FaCheck aria-label="Visited" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const Intro: React.FC<{ isTouch: boolean; onStart: () => void; onMap: () => void }> = ({ isTouch, onStart, onMap }) => {
  const startRef = useFocusOnMount<HTMLButtonElement>();
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900/60 backdrop-blur-[3px]" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-title"
        className="panel-pop relative w-full max-w-md glass rounded-3xl shadow-2xl p-7 text-center"
      >
        <img src="portrait.jpg" alt="" className="mx-auto w-20 h-20 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-lg" />
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-600 dark:text-emerald-400">Kaltrin Ismaili · Software Engineer</p>
        <h2 id="intro-title" className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">Welcome to my world</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          This portfolio is a small world to explore. Walk around and visit the landmarks to find out who I am, what I’ve
          built, and how to reach me.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {isTouch ? 'Tap anywhere to walk.' : (
            <>
              <kbd className="kbd">W</kbd><kbd className="kbd">A</kbd><kbd className="kbd">S</kbd><kbd className="kbd">D</kbd> to walk,{' '}
              <kbd className="kbd">E</kbd> to interact, or just click.
            </>
          )}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button ref={startRef} onClick={onStart} className="btn-accent justify-center" style={{ '--accent': '#059669' } as React.CSSProperties}>
            Start exploring
          </button>
          <button onClick={onMap} className="btn-ghost justify-center">
            Skip to the map
          </button>
        </div>
      </div>
    </div>
  );
};
