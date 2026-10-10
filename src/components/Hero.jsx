import { useState, useEffect } from 'react';
import { LuArrowUpRight, LuFolderOpen } from 'react-icons/lu';
import Hero3DCanvas from './Hero3DCanvas';

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
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Top Hairline Rule */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />

      {/* Main Architectural Container */}
      <div className="relative mx-auto max-w-[1280px] border-x border-line bg-bg min-h-[640px] lg:min-h-[calc(100vh-3rem)] lg:max-h-[920px] flex flex-col justify-between">
        
        {/* Corner Crosshair Ticks */}
        <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-faint">
          +
        </span>
        <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-faint">
          +
        </span>

        {/* Ambient Subtle Brand Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.025] dark:opacity-[0.04]">
          <span className="font-display font-extrabold text-[22vw] tracking-tighter text-ink leading-none whitespace-nowrap">
            NASEEF
          </span>
        </div>

        {/* Top Eyebrow Status Bar */}
        <div className="border-b border-line bg-bg/80 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-6 py-3 md:px-10">
            <div className="flex items-center gap-3">
              <span className="hud-label text-muted">
                <span className="text-faint">00</span>
                <span className="mx-2 text-faint">/</span>
                Portfolio 2026
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-line" />
              <span className="hud-label text-faint hidden sm:inline-block">
                Computer Engineering • University of Peradeniya
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="hud-label text-muted">
                Available for Select Roles
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Hero Content Grid ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 py-12 md:px-10 md:py-20 flex-1">
          
          {/* Left Column (7 cols): Editorial Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* HUD Category Tag */}
            <div className="inline-flex items-center gap-2 border border-line bg-bg-raised px-3 py-1">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span className="hud-label text-muted">
                Faculty of Engineering • UoP
              </span>
            </div>

            {/* Editorial Headline with Instrument Serif Accent */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.035em] text-ink-strong leading-[1.03]">
              Engineering digital{' '}
              <span className="font-serif italic font-normal text-ink">
                craft
              </span>{' '}
              with architectural precision.
            </h1>

            {/* Monospace Typewriter Focus */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted py-1 border-y border-line w-fit">
              <span className="text-accent">&gt; Focus:</span>
              <span className="text-ink font-semibold min-h-[1.2rem] inline-block">
                [{text || ' '}]
              </span>
              <span className="w-1.5 h-3.5 bg-accent animate-pulse" />
            </div>

            {/* Subtitle Bio */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted">
              I am <strong className="text-ink font-semibold">MFA Naseef Sharaf</strong> — a computer engineering undergraduate at the University of Peradeniya. I build high-performance web applications, interactive 3D computing experiences, and precision interfaces.
            </p>

            {/* Dual CTAs in ArtCraft High-Contrast Style */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('work')}
                className="btn-artcraft cursor-pointer"
              >
                <LuFolderOpen className="w-3.5 h-3.5" />
                <span>Explore Selected Works</span>
              </button>

              <a
                href="/assets/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-artcraft-outline"
              >
                <span>Download Resume</span>
                <LuArrowUpRight className="w-3.5 h-3.5 text-muted" />
              </a>
            </div>

            {/* System Status Line */}
            <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-faint">
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
          </div>

          {/* Right Column (5 cols): 3D Viewport in ArtCraft Frame */}
          <div className="lg:col-span-5 relative">
            <div className="border border-line bg-bg-raised relative overflow-hidden">
              
              {/* Corner crosshair ticks */}
              <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-faint">+</span>
              <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-faint">+</span>
              <span aria-hidden="true" className="tick -bottom-[5px] -left-[5px] text-faint">+</span>
              <span aria-hidden="true" className="tick -bottom-[5px] -right-[5px] text-faint">+</span>

              {/* Viewport Top HUD Bar */}
              <div className="flex items-center justify-between border-b border-line px-4 py-2 hud-label text-faint bg-bg">
                <span>[ 3D_VIEWPORT // KINETIC_CORE ]</span>
                <span className="text-accent flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  WebGL 60FPS
                </span>
              </div>

              {/* Three.js Canvas Container */}
              <div className="h-[360px] sm:h-[400px] w-full relative">
                <Hero3DCanvas theme={theme} />
              </div>

              {/* Viewport Bottom HUD Bar */}
              <div className="flex items-center justify-between border-t border-line px-4 py-2 hud-label text-faint bg-bg">
                <span>DRAG TO ROTATE 360°</span>
                <span>INTERACTIVE THREE.JS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Segmented Stats Strip ── */}
        <div className="border-t border-line bg-bg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line">
            {stats.map((stat) => (
              <div key={stat.index} className="bg-bg px-6 py-4 md:px-8 md:py-6">
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
