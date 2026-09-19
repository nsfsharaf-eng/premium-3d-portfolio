import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const loadingStages = [
  { at: 0, label: 'Booting interface' },
  { at: 34, label: 'Mapping experience' },
  { at: 68, label: 'Rendering workspace' },
  { at: 94, label: 'Ready to explore' },
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stage = [...loadingStages].reverse().find(({ at }) => progress >= at)?.label;

  useEffect(() => {
    // Keep time tied to the wall clock in throttled tabs and on low-power devices.
    gsap.ticker.lagSmoothing(0);

    let finished = false;
    let exitTimeline;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (onCompleteRef.current) onCompleteRef.current();
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const value = { current: 0 };
    const counterTween = gsap.to(value, {
      current: 100,
      duration: reduceMotion ? 0.35 : 1.7,
      ease: 'power2.out',
      onUpdate: () => setProgress(Math.floor(value.current)),
      onComplete: () => {
        exitTimeline = gsap.timeline({ onComplete: finish });
        exitTimeline
          .to(contentRef.current, {
            y: reduceMotion ? 0 : -18,
            opacity: 0,
            duration: reduceMotion ? 0.12 : 0.35,
            ease: 'power3.in',
          })
          .to(containerRef.current, {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            duration: reduceMotion ? 0.18 : 0.65,
            ease: 'power4.inOut',
          }, reduceMotion ? '>' : '-=0.08');
      },
    });

    // A wall-clock failsafe guarantees the intro can never trap a visitor.
    const failsafe = window.setTimeout(finish, 5000);

    return () => {
      counterTween.kill();
      exitTimeline?.kill();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#020503] text-white"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${progress} percent`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: 'linear-gradient(rgba(31,223,100,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(31,223,100,.07) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at center, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 75%)',
        }}
      />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[70vw] max-h-[720px] w-[70vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.045] blur-[90px]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      <span aria-hidden="true" className="absolute left-5 top-5 h-7 w-7 border-l border-t border-accent/60 sm:left-8 sm:top-8" />
      <span aria-hidden="true" className="absolute right-5 top-5 h-7 w-7 border-r border-t border-accent/60 sm:right-8 sm:top-8" />
      <span aria-hidden="true" className="absolute bottom-5 left-5 h-7 w-7 border-b border-l border-accent/60 sm:bottom-8 sm:left-8" />
      <span aria-hidden="true" className="absolute bottom-5 right-5 h-7 w-7 border-b border-r border-accent/60 sm:bottom-8 sm:right-8" />

      <div ref={contentRef} className="relative z-10 flex min-h-full flex-col items-center justify-center px-6 py-10">
        <div className="mb-7 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.32em] text-accent/75 sm:text-[10px]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_10px_rgba(31,223,100,.9)] motion-reduce:animate-none" />
          Portfolio system / 2026
        </div>

        <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
          <div aria-hidden="true" className="absolute inset-0 animate-[spin_11s_linear_infinite] rounded-full border border-dashed border-accent/25 motion-reduce:animate-none" />
          <div aria-hidden="true" className="absolute inset-3 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-white/[0.08] motion-reduce:animate-none">
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(31,223,100,1)]" />
          </div>
          <svg aria-hidden="true" className="absolute inset-5 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="#1fdf64"
              strokeLinecap="round"
              strokeWidth="1.8"
              strokeDasharray={2 * Math.PI * 47}
              strokeDashoffset={2 * Math.PI * 47 * (1 - progress / 100)}
              className="transition-[stroke-dashoffset] duration-75"
              style={{ filter: 'drop-shadow(0 0 5px rgba(31,223,100,.65))' }}
            />
          </svg>

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-accent/35 bg-[#07100b]/90 p-1.5 shadow-[inset_0_0_35px_rgba(31,223,100,.06),0_0_50px_rgba(31,223,100,.16)] sm:h-32 sm:w-32">
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[#07100b]">
              <img
                src="/assets/profile.png"
                alt="MFA Naseef Sharaf"
                className="h-full w-full object-cover object-top"
                onError={(event) => {
                  event.currentTarget.src = '/assets/profile.jpg';
                }}
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020503]/25 via-transparent to-accent/[0.06]" />
              <div aria-hidden="true" className="absolute inset-x-0 h-px animate-[scan_1.7s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-accent/80 to-transparent shadow-[0_0_10px_rgba(31,223,100,.8)] motion-reduce:animate-none" />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-sm sm:mt-9">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">Sequence status</p>
              <p className="mt-1 font-display text-sm font-medium tracking-wide text-white/80">{stage}</p>
            </div>
            <div className="font-display text-4xl font-bold tabular-nums tracking-tight text-snow sm:text-5xl">
              {String(progress).padStart(2, '0')}<span className="ml-1 text-sm text-accent">%</span>
            </div>
          </div>

          <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_14px_rgba(31,223,100,.8)] transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
            <span>Colombo / LK</span>
            <span>36.927° N · 79.861° E</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan { 0%, 100% { top: 12%; opacity: 0; } 20%, 80% { opacity: .8; } 50% { top: 88%; } }
      `}</style>
    </div>
  );
}
