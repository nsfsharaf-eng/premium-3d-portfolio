import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const obj = { value: 0 };
    const counterTween = gsap.to(obj, {
      value: 100,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      },
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    return () => {
      counterTween.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#121316] text-[#f2f1ee]"
    >
      <div className="w-72 space-y-4 border border-[#f2f1ee26] p-6 bg-[#101014] relative">
        <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-[#f2f1ee61]">+</span>
        <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-[#f2f1ee61]">+</span>
        <span aria-hidden="true" className="tick -bottom-[5px] -left-[5px] text-[#f2f1ee61]">+</span>
        <span aria-hidden="true" className="tick -bottom-[5px] -right-[5px] text-[#f2f1ee61]">+</span>

        <div className="flex items-center justify-between border-b border-[#f2f1ee26] pb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#f2f1ee99]">
            INITIALIZING
          </span>
          <span className="font-mono text-[10px] text-[#2d81ff]">
            SYSTEM_OK
          </span>
        </div>

        <div className="flex items-center gap-3 py-1">
          <span className="w-8 h-8 border border-[#f2f1ee26] bg-[#121316] flex items-center justify-center font-mono font-bold text-xs text-[#f2f1ee]">
            NS
          </span>
          <div>
            <p className="font-mono font-bold text-xs tracking-wider text-white">
              NASEEF SHARAF
            </p>
            <p className="font-mono text-[9px] text-[#f2f1ee61]">
              PORTFOLIO ARCHITECTURE
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-2 font-mono text-[10px]">
          <div className="flex justify-between text-[#f2f1ee99]">
            <span>LOADING ASSETS</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1 bg-[#060607] border border-[#f2f1ee26] overflow-hidden">
            <div
              className="h-full bg-[#2d81ff] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
