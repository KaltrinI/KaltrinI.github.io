import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import GameWorld, { GameWorldHandle } from './game/GameWorld';
import Panel from './game/Panel';
import { ActionButton, ControlsHint, HudButton, Intro, MapIcon, MapMenu, PlayerCard, ThemeIcon, Toast } from './game/Hud';
import { LandmarkId, landmarkById, landmarks } from './game/world';
import './game/game.css';

const STORAGE_KEY = 'kaltrini-world';

interface Saved {
  discovered?: LandmarkId[];
  introSeen?: boolean;
  night?: boolean;
}

function load(): Saved {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Saved;
  } catch {
    return {};
  }
}

function save(data: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); progress just won't persist.
  }
}

const isTypingTarget = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName));

const App: React.FC = () => {
  const saved = useRef(load()).current;
  const worldRef = useRef<GameWorldHandle>(null);

  const [isTouch] = useState(() => window.matchMedia('(pointer: coarse)').matches);
  const [night, setNight] = useState<boolean>(
    () => saved.night ?? window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const [discovered, setDiscovered] = useState<Set<LandmarkId>>(
    () => new Set((saved.discovered ?? []).filter(id => id in landmarkById)),
  );
  const [openId, setOpenId] = useState<LandmarkId | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showIntro, setShowIntro] = useState(!saved.introSeen);
  const [hintVisible, setHintVisible] = useState(true);
  const [nearby, setNearby] = useState<LandmarkId | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', night);
  }, [night]);

  useEffect(() => {
    save({ discovered: Array.from(discovered), introSeen: !showIntro, night });
  }, [discovered, showIntro, night]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const discoveredRef = useRef(discovered);
  discoveredRef.current = discovered;

  const openLandmark = useCallback((id: LandmarkId) => {
    setOpenId(id);
    if (discoveredRef.current.has(id)) return;
    const next = new Set(discoveredRef.current).add(id);
    discoveredRef.current = next;
    setDiscovered(next);
    setToast(
      next.size === landmarks.length
        ? 'World fully explored. Thanks for visiting!'
        : `New location discovered: ${landmarkById[id].name}`,
    );
  }, []);

  const closePanel = useCallback(() => setOpenId(null), []);

  const walkTo = useCallback((id: LandmarkId) => {
    setOpenId(null);
    setShowMap(false);
    worldRef.current?.walkTo(id);
  }, []);

  const fastTravel = useCallback(
    (id: LandmarkId) => {
      setShowMap(false);
      setShowIntro(false);
      worldRef.current?.teleportTo(id);
      openLandmark(id);
    },
    [openLandmark],
  );

  const openMap = useCallback(() => {
    setOpenId(null);
    setShowIntro(false);
    setShowMap(true);
  }, []);

  const handleFirstMove = useCallback(() => {
    setTimeout(() => setHintVisible(false), 5000);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenId(null);
        setShowMap(false);
        setShowIntro(false);
        return;
      }
      if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.code === 'KeyM' && !showIntro) {
        setOpenId(null);
        setShowMap(v => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showIntro]);

  const paused = openId !== null || showMap || showIntro;

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeIprwqAAAAACIsOjtQc-I96AkQvb5ZvBNB_EMB">
      <div className="app-root">
        <GameWorld
          ref={worldRef}
          night={night}
          paused={paused}
          discovered={discovered}
          isTouch={isTouch}
          onInteract={openLandmark}
          onNearbyChange={setNearby}
          onFirstMove={handleFirstMove}
        />

        <div className="hud-top">
          <PlayerCard found={discovered.size} />
          <div className="flex gap-2">
            <HudButton label="Open map" hotkey="M" onClick={openMap}>
              <MapIcon />
            </HudButton>
            <HudButton label={night ? 'Switch to day' : 'Switch to night'} onClick={() => setNight(n => !n)}>
              <ThemeIcon night={night} />
            </HudButton>
          </div>
        </div>

        <div className="hud-bottom">
          {nearby && !paused ? (
            <ActionButton id={nearby} onClick={openLandmark} isTouch={isTouch} />
          ) : (
            <ControlsHint visible={hintVisible && !paused} isTouch={isTouch} />
          )}
        </div>

        <Toast message={toast} />

        {openId && (
          <Panel
            id={openId}
            discovered={discovered}
            isTouch={isTouch}
            onClose={closePanel}
            onWalkTo={walkTo}
            onOpenMap={openMap}
          />
        )}
        {showMap && <MapMenu discovered={discovered} onPick={fastTravel} onClose={() => setShowMap(false)} />}
        {showIntro && <Intro isTouch={isTouch} onStart={() => setShowIntro(false)} onMap={openMap} />}
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default App;
