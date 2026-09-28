import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

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
    // Debug aid: ?loaderhold stretches the intro so design tweaks can be inspected live.
    const hold = new URLSearchParams(window.location.search).has('loaderhold');
    const value = { current: 0 };
    const counterTween = gsap.to(value, {
      current: 100,
      duration: hold ? 30 : reduceMotion ? 0.35 : 1.7,
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
    const failsafe = window.setTimeout(finish, hold ? 40000 : 5000);

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
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(rgba(31,223,100,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31,223,100,.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at center, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 75%)',
        }}
      />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[70vw] max-h-[720px] w-[70vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.045] blur-[90px]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      <div ref={contentRef} className="relative z-10 flex min-h-full flex-col items-center justify-center px-6 py-10">
        <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          <div aria-hidden="true" className="absolute inset-0 rounded-full border border-accent/30" />
          <div aria-hidden="true" className="absolute inset-0 animate-[spin_6s_linear_infinite] motion-reduce:animate-none">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(31,223,100,1)]" />
          </div>

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-accent/25 bg-[#07100b]/90 shadow-[inset_0_0_35px_rgba(31,223,100,.06),0_0_50px_rgba(31,223,100,.14)] sm:h-32 sm:w-32">
            <span className="font-display text-4xl font-bold tracking-[0.12em] text-accent sm:text-5xl">NS</span>
          </div>
        </div>

        <p className="mt-9 font-mono text-[10px] uppercase tracking-[0.42em] text-accent/70 sm:text-xs">
          Initializing portfolio
        </p>

        <div className="mt-6 w-full max-w-xs sm:max-w-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_14px_rgba(31,223,100,.8)] transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs tabular-nums text-accent/80">{progress}%</span>
          </div>
          <div aria-hidden="true" className="mr-12 mt-2 flex justify-between">
            {[0, 1, 2, 3, 4].map((tick) => (
              <span key={tick} className="h-2 w-px bg-white/15" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
