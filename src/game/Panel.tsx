import React, { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import {
  FaArrowRight, FaBookOpen, FaCarSide, FaChessRook, FaCheck, FaEnvelope, FaExternalLinkAlt, FaFilm,
  FaFingerprint, FaFire, FaGithub, FaHome, FaLinkedin, FaMapSigns, FaParking, FaTimes,
} from 'react-icons/fa';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import PolygonSkillsChart from '../components/PolygonSkillsChart';
import { Project, about, links, projects, skills } from './content';
import { LandmarkId, landmarkById, landmarks } from './world';

export const landmarkIcons: Record<LandmarkId, IconType> = {
  guide: FaMapSigns,
  home: FaHome,
  skills: FaChessRook,
  campfire: FaFire,
  post: FaEnvelope,
  portal: FaBookOpen,
  rideshare: FaCarSide,
  parking: FaParking,
  wallet: FaFingerprint,
  vidsbeats: FaFilm,
};

interface PanelProps {
  id: LandmarkId;
  discovered: Set<LandmarkId>;
  isTouch: boolean;
  onClose: () => void;
  onWalkTo: (id: LandmarkId) => void;
  onOpenMap: () => void;
}

const Panel: React.FC<PanelProps> = ({ id, discovered, isTouch, onClose, onWalkTo, onOpenMap }) => {
  const l = landmarkById[id];
  const Icon = landmarkIcons[id];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, [id]);

  const next = landmarks.filter(x => x.id !== id && !discovered.has(x.id)).slice(0, 3);

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-stretch md:justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/30 md:bg-slate-900/10 backdrop-blur-[2px]" aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        onClick={e => e.stopPropagation()}
        className="panel-enter relative w-full md:w-[460px] max-h-[86dvh] md:max-h-none md:m-4 flex flex-col overflow-hidden rounded-t-3xl md:rounded-3xl glass shadow-2xl"
        style={{ '--accent': l.color } as React.CSSProperties}
      >
        <header className="panel-header relative px-6 pt-6 pb-5 text-white">
          <div className="flex items-start gap-4">
            <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white/20 ring-1 ring-white/30 shrink-0">
              <Icon size={22} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/80 font-semibold">{l.district}</p>
              <h2 id="panel-title" className="text-2xl font-bold leading-tight">{l.name}</h2>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              className="grid place-items-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 transition-colors shrink-0"
              aria-label="Close panel"
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <PanelBody id={id} isTouch={isTouch} onOpenMap={onOpenMap} />
        </div>

        <footer className="px-6 py-4 border-t border-slate-200/70 dark:border-white/10">
          {next.length > 0 ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Where next?</p>
              <div className="flex flex-wrap gap-2">
                {next.map(n => {
                  const NIcon = landmarkIcons[n.id];
                  return (
                    <button
                      key={n.id}
                      onClick={() => onWalkTo(n.id)}
                      className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-slate-100 transition-colors"
                    >
                      <NIcon style={{ color: n.color }} aria-hidden="true" />
                      {n.name}
                      <FaArrowRight size={10} className="opacity-50 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <FaCheck aria-hidden="true" /> You’ve explored the whole world. Thanks for visiting!
            </p>
          )}
        </footer>
      </aside>
    </div>
  );
};

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[color:var(--accent)] dark:text-white dark:bg-[color-mix(in_srgb,var(--accent)_35%,transparent)]">
    {children}
  </span>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">{children}</h3>
);

const PanelBody: React.FC<{ id: LandmarkId; isTouch: boolean; onOpenMap: () => void }> = ({ id, isTouch, onOpenMap }) => {
  switch (id) {
    case 'guide':
      return (
        <>
          <p className="text-lg text-slate-900 dark:text-white font-medium">
            Welcome, traveler! This little world is my portfolio. Every landmark holds part of my story.
          </p>
          <div className="space-y-2">
            <H3>How to explore</H3>
            {isTouch ? (
              <ul className="space-y-1.5">
                <li>Tap anywhere to walk there.</li>
                <li>Tap a building to walk up and look inside.</li>
              </ul>
            ) : (
              <ul className="space-y-1.5">
                <li><kbd className="kbd">W</kbd><kbd className="kbd">A</kbd><kbd className="kbd">S</kbd><kbd className="kbd">D</kbd> or arrow keys to walk, <kbd className="kbd">Shift</kbd> to run.</li>
                <li><kbd className="kbd">E</kbd> to interact when you’re near a landmark.</li>
                <li>Or just click anywhere, or on a building, to walk there.</li>
                <li><kbd className="kbd">M</kbd> opens the map.</li>
              </ul>
            )}
          </div>
          <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-400/10 ring-1 ring-amber-200 dark:ring-amber-300/20">
            <p className="text-sm text-amber-900 dark:text-amber-100">
              In a hurry? The map lets you jump straight to any location.
            </p>
            <button onClick={onOpenMap} className="mt-3 btn-accent" style={{ '--accent': '#d97706' } as React.CSSProperties}>
              Open the map
            </button>
          </div>
        </>
      );

    case 'home':
      return (
        <>
          <div className="flex items-center gap-4">
            <img src="portrait.jpg" alt="Portrait of Kaltrin Ismaili" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md" />
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">Hello, I’m Kaltrin</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Software Engineer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip>8 years experience</Chip>
            <Chip>BSc Computer Science &amp; Engineering</Chip>
            <Chip>C# · JavaScript · TypeScript</Chip>
          </div>
          <p>{about.intro}</p>
          <p>{about.experience}</p>
        </>
      );

    case 'skills':
      return (
        <>
          <p>Climbing the tower reveals the full skill tree, from mobile to analytics.</p>
          <div className="space-y-3">
            {skills.map(s => (
              <div key={s.name}>
                <div className="flex justify-between text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  <span>{s.name}</span>
                  <span className="tabular-nums">{s.percent}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div className="skill-fill h-full rounded-full" style={{ width: `${s.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-4 pb-2 text-slate-700 dark:text-slate-200">
            <PolygonSkillsChart skills={skills} size={230} color="#5b6ee1" />
          </div>
        </>
      );

    case 'campfire':
      return (
        <>
          <p>{about.hobbies}</p>
          <div className="flex flex-wrap gap-2">
            <Chip>Programming languages</Chip>
            <Chip>Spoken languages</Chip>
            <Chip>Mathematics</Chip>
          </div>
          <blockquote className="rounded-2xl p-5 bg-orange-50 dark:bg-orange-400/10 ring-1 ring-orange-200 dark:ring-orange-300/20">
            <p className="text-xl font-bold text-orange-900 dark:text-orange-100">“{about.motto}”</p>
            <p className="mt-1 text-sm text-orange-800/80 dark:text-orange-100/70">I live by this motto {about.mottoNote}</p>
          </blockquote>
        </>
      );

    case 'post':
      return <ContactForm />;

    case 'portal':
      return (
        <>
          <p>
            This portal leads out of the world to my blog, where I write about software engineering, learning,
            and whatever I’m currently curious about.
          </p>
          <a href={links.blog} target="_blank" rel="noopener noreferrer" className="btn-accent">
            Step through to the blog <FaExternalLinkAlt size={12} aria-hidden="true" />
          </a>
          <p className="text-xs text-slate-500 dark:text-slate-400">Opens blog.kaltrini.com in a new tab.</p>
        </>
      );

    default:
      return <ProjectDetails project={projects[id]} />;
  }
};

const ProjectDetails: React.FC<{ project: Project }> = ({ project }) => (
  <>
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Project</p>
    <p className="-mt-3 text-xl font-bold text-slate-900 dark:text-white">{project.title}</p>
    <p>{project.description}</p>
    <div className="space-y-2">
      <H3>My role</H3>
      <div className="flex flex-wrap gap-2">
        {project.roles.map(r => <Chip key={r}>{r}</Chip>)}
      </div>
    </div>
    <div className="space-y-2">
      <H3>Tech stack</H3>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map(t => (
          <span key={t} className="rounded-lg px-2.5 py-1 text-xs font-mono font-semibold bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200">
            {t}
          </span>
        ))}
      </div>
    </div>
  </>
);

const RECAPTCHA_ACTION = 'contact_form';

const SUBMIT_ERRORS: Record<string, string> = {
  captcha_failed: 'Our spam check couldn’t verify you. Please try again, or reach out on LinkedIn.',
  invalid_email: 'That email address doesn’t look right. Please check it and try again.',
  missing_fields: 'Please fill in your name, email and message.',
};

const ContactForm: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!links.contactEndpoint) {
      setError('The contact form isn’t set up yet. Please reach out on LinkedIn instead.');
      setStatus('error');
      return;
    }
    if (!executeRecaptcha) {
      setError('The spam check is still loading. Please try again in a moment.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const token = await executeRecaptcha(RECAPTCHA_ACTION);
      // text/plain keeps this a "simple" CORS request, which Google Apps Script can answer.
      const res = await fetch(links.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...formData, token }),
      });
      const result: { ok: boolean; error?: string } = await res.json();
      if (!result.ok) throw new Error(result.error || 'unknown_error');
      setStatus('sent');
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      setError(SUBMIT_ERRORS[code] ?? 'Something went wrong sending your message. Please try again or reach out on LinkedIn.');
      setStatus('error');
    }
  };

  const input =
    'w-full rounded-xl px-4 py-2.5 bg-white/80 dark:bg-white/5 ring-1 ring-slate-200 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] text-slate-900 dark:text-white placeholder:text-slate-400';

  return (
    <>
      <p>Feel free to reach out to me for collaboration, questions, or opportunities!</p>
      {status === 'sent' ? (
        <div className="rounded-2xl p-5 bg-emerald-50 dark:bg-emerald-400/10 ring-1 ring-emerald-200 dark:ring-emerald-300/20 text-emerald-900 dark:text-emerald-100">
          <p className="font-bold flex items-center gap-2"><FaCheck aria-hidden="true" /> Letter posted!</p>
          <p className="text-sm mt-1">Thanks for writing, {formData.name || 'traveler'}.</p>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">Name</label>
            <input type="text" id="name" name="name" required maxLength={100} className={input} value={formData.name} onChange={handleChange} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">Email</label>
            <input type="email" id="email" name="email" required maxLength={200} className={input} value={formData.email} onChange={handleChange} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">Message</label>
            <textarea id="message" name="message" rows={4} required maxLength={5000} className={input} value={formData.message} onChange={handleChange} />
          </div>
          {/* Honeypot: hidden from people, but naive bots fill it in. */}
          <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
          </div>
          {status === 'error' && (
            <p role="alert" className="rounded-xl px-4 py-3 text-sm bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-400/10 dark:text-rose-100 dark:ring-rose-300/20">
              {error}
            </p>
          )}
          <button type="submit" disabled={status === 'sending'} className="btn-accent w-full justify-center disabled:opacity-70 disabled:cursor-wait">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
      <div className="flex gap-2">
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
          <FaLinkedin aria-hidden="true" /> LinkedIn
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="social-link">
          <FaGithub aria-hidden="true" /> GitHub
        </a>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms of Service</a>{' '}
        apply.
      </p>
    </>
  );
};

export default Panel;
