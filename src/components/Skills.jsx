import { useEffect, useRef, useState } from 'react';
import SectionFrame from './SectionFrame';

const linearSkills = [
  { label: 'Frontend Development (React 19, JavaScript, HTML5/CSS3)', percent: 92, code: 'FE_DEV' },
  { label: 'UI/UX & Visual Design (Figma, Photoshop, Illustrator)', percent: 85, code: 'UI_UX' },
  { label: 'Programming & Logic (Python, C++, Algorithms)', percent: 78, code: 'CORE_LOGIC' },
  { label: 'IoT & Hardware Systems (Arduino, Sensor Telemetry)', percent: 72, code: 'EMBEDDED' },
];

const circularMeters = [
  { title: 'Web Systems', percent: 95, detail: 'Architecture, State & Speed' },
  { title: 'Interface Design', percent: 88, detail: 'Typography & Visual Taste' },
  { title: 'Hardware Logic', percent: 82, detail: 'Logic Synthesis & Systems' },
];

const toolCategories = [
  {
    category: 'LANGUAGES',
    tools: ['JavaScript (ES6+)', 'Python 3', 'C++ (STL)', 'HTML5', 'CSS3 / PostCSS'],
  },
  {
    category: 'FRAMEWORKS & WEB',
    tools: ['React 19', 'Vite 8.0', 'Tailwind CSS 3.4', 'Three.js (WebGL)', 'GSAP 3', 'REST APIs'],
  },
  {
    category: 'EMBEDDED & HARDWARE',
    tools: ['Arduino Microcontrollers', 'Hardware Sensors', 'Circuit Synthesis', 'I2C / SPI Telemetry'],
  },
  {
    category: 'CREATIVE & DESIGN',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva Pro', 'Design Tokens'],
  },
  {
    category: 'WORKFLOW & VCS',
    tools: ['Git & GitHub', 'VS Code Pro', 'Node.js', 'Vercel / Cloudflare', 'Linux Shell'],
  },
];

export default function Skills() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionFrame
      id="skills"
      index="04"
      title="Technical Stack"
      meta="Telemetry & Toolset"
      headline="Languages,"
      italicWord="systems"
      headlineAfter="& precision tools."
      subheading="A disciplined technical repertoire spanning full-stack web architectures, hardware microcontroller engineering, and graphic design systems."
    >
      <div ref={containerRef} className="grid gap-px border-t border-line bg-line lg:grid-cols-12">
        
        {/* Left Column (5 cols): Telemetry & Dynamic Meters */}
        <div className="lg:col-span-5 bg-bg p-6 md:p-8 space-y-8">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-3 mb-6">
              <span className="hud-label text-faint">TELEMETRY // PROFICIENCY</span>
              <span className="hud-label text-accent">REAL-TIME</span>
            </div>

            {/* Circular Gauges Row */}
            <div className="grid grid-cols-3 gap-2 py-2">
              {circularMeters.map((meter, idx) => {
                const radius = 34;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (meter.percent / 100) * circumference;

                return (
                  <div key={idx} className="flex flex-col items-center text-center p-2 border border-line bg-bg-raised">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          stroke="var(--line)"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          stroke="var(--accent)"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={inView ? strokeDashoffset : circumference}
                          strokeLinecap="square"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute font-mono font-bold text-xs text-ink-strong">
                        {inView ? `${meter.percent}%` : '0%'}
                      </span>
                    </div>

                    <span className="font-mono font-medium text-[11px] text-ink mt-2">
                      {meter.title}
                    </span>
                    <span className="text-[9px] font-mono text-faint mt-0.5">
                      {meter.detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Linear Progress Bars */}
          <div className="space-y-4 pt-2">
            <p className="hud-label text-faint">CAPABILITY BREAKDOWN</p>
            {linearSkills.map((skill, idx) => (
              <div key={idx} className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-muted text-[11px]">
                  <span>{skill.label}</span>
                  <span className="text-ink font-semibold">{inView ? `${skill.percent}%` : '0%'}</span>
                </div>
                <div className="w-full h-1.5 bg-bg-sunken border border-line overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-1000 ease-out"
                    style={{ width: inView ? `${skill.percent}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (7 cols): The Complete Toolset Grid */}
        <div className="lg:col-span-7 bg-bg p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="hud-label text-faint">TOOLING DIRECTORY // 5 CATEGORIES</span>
            <span className="hud-label text-muted">VERIFIED SKILLS</span>
          </div>

          <div className="space-y-5">
            {toolCategories.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <p className="hud-label text-faint text-[10px]">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 border border-line bg-bg-raised text-xs font-mono text-ink hover:bg-invert-bg hover:text-invert-fg transition-all cursor-default select-none"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line pt-4 flex items-center justify-between hud-label text-faint text-[10px]">
            <span>TOTAL SKILLSETS: 22+</span>
            <span>PRODUCTION READY</span>
          </div>
        </div>

      </div>
    </SectionFrame>
  );
}
