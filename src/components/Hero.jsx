import { useState, useEffect } from 'react';
import { LuArrowUpRight, LuFolderOpen } from 'react-icons/lu';
import HeroInteractiveCanvas from './HeroInteractiveCanvas';

const roles = [
  'Creative Developer',
  'UI/UX Designer',
  'Computer Engineer',
  'Front-End Specialist',
];

const stats = [
  { index: '01', value: '5+', label: 'Projects Completed' },
  { index: '02', value: '8+', label: 'Certifications Verified' },
  { index: '03', value: '3+', label: 'Design Tools Mastered' },
  { index: '04', value: '1st', label: 'BSc Eng Undergraduate' },
];

export default function Hero({ theme = 'dark' }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 30 : 65;

    if (!isDeleting && text === currentRole) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && text === '') {
      const switchTimeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 250);
      return () => clearTimeout(switchTimeout);
    }

    const timer = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 48;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden pt-12 pb-8">
      {/* Dedicated Interactive Live Background (3D Perspective Wave Grid) */}
      <HeroInteractiveCanvas theme={theme} />

      {/* Ambient Giant Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03] dark:opacity-[0.04] z-0">
        <span className="font-display font-extrabold text-[24vw] tracking-tighter text-ink leading-none whitespace-nowrap">
          NASEEF
        </span>
      </div>

      {/* Centered Hero Content Container (NO BORDERS) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center space-y-7">
        
        {/* Top Status Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-bg-raised/80 backdrop-blur-sm border border-line">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="hud-label text-muted">
            00 / PORTFOLIO 2026 • FACULTY OF ENGINEERING • UOP
          </span>
        </div>

        {/* Centered Editorial Headline with Instrument Serif Accent */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] text-ink-strong leading-[1.03] max-w-3xl">
          Engineering digital{' '}
          <span className="font-serif italic font-normal text-ink">
            craft
          </span>{' '}
          with architectural precision.
        </h1>

        {/* Centered Typewriter Role Pill */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-muted px-4 py-1.5 bg-bg/60 backdrop-blur-sm border border-line">
          <span className="text-accent font-semibold">&gt; Focus:</span>
          <span className="text-ink font-semibold min-h-[1.2rem] inline-block">
            [{text || ' '}]
          </span>
          <span className="w-1.5 h-3.5 bg-accent animate-pulse" />
        </div>

        {/* Centered Bio Narrative */}
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
          I am <strong className="text-ink font-semibold">MFA Naseef Sharaf</strong> — a computer engineering undergraduate at the University of Peradeniya. I build high-performance web applications, interactive creative technology, and precision user interfaces.
        </p>

        {/* Centered High-Contrast CTAs */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => scrollTo('work')}
            className="btn-artcraft cursor-pointer shadow-lg hover:shadow-xl"
          >
            <LuFolderOpen className="w-3.5 h-3.5" />
            <span>Explore Selected Works</span>
          </button>

          <a
            href="/assets/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-artcraft-outline shadow-sm hover:shadow-md"
          >
            <span>Download Resume</span>
            <LuArrowUpRight className="w-3.5 h-3.5 text-muted" />
          </a>
        </div>

        {/* Centered System Telemetry Line */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-faint">
          <span>TypeScript</span>
          <span>•</span>
          <span>React 19</span>
          <span>•</span>
          <span>Three.js</span>
          <span>•</span>
          <span>C++ / Python</span>
          <span>•</span>
          <span>Hardware IoT</span>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="pt-10 w-full max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line/80 border border-line/80">
            {stats.map((stat) => (
              <div key={stat.index} className="bg-bg/80 backdrop-blur-sm px-4 py-4 md:px-6 md:py-5 text-center">
                <p className="hud-label text-faint mb-1">{stat.index} / METRIC</p>
                <div className="font-display font-medium text-2xl sm:text-3xl text-ink-strong">
                  {stat.value}
                </div>
                <p className="text-xs text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
