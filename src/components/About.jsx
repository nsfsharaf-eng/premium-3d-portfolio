import React from 'react';
import SectionFrame from './SectionFrame';
import { FaDownload, FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaCodeBranch } from 'react-icons/fa';

export default function About() {
  const details = [
    { label: 'Residence', value: 'Sri Lanka', icon: FaMapMarkerAlt },
    { label: 'Institution', value: 'University of Peradeniya', icon: FaUniversity },
    { label: 'Faculty', value: 'Faculty of Engineering', icon: FaGraduationCap },
    { label: 'Program', value: 'BSc Engineering (Honours)', icon: FaCodeBranch },
  ];

  return (
    <SectionFrame
      id="about"
      index="02"
      title="Persona & Philosophy"
      meta="BSc Engineering • UoP"
      headline="Formed by"
      italicWord="curiosity"
      headlineAfter="and rigorous systems thinking."
      subheading="Blending foundational computer engineering science with modern creative development to engineer digital systems that are reliable, performant, and beautifully composed."
    >
      {/* 3-Column Architectural Grid with Gap-px Hairlines */}
      <div className="grid gap-px border-t border-line bg-line md:grid-cols-3">
        
        {/* Card A: Identity & Profile */}
        <article className="bg-bg p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <span className="hud-label text-faint">A / IDENTITY</span>
              <span className="hud-label text-accent">ENGINEER</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 border border-line bg-bg-raised p-0.5 shrink-0 overflow-hidden">
                <img
                  src="/assets/profile.png"
                  alt="MFA Naseef Sharaf"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.target.src = '/assets/icon.png'; }}
                />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg text-ink-strong">
                  MFA Naseef Sharaf
                </h3>
                <p className="hud-label text-muted text-[10px]">
                  Creative Developer & Undergrad
                </p>
              </div>
            </div>

            {/* Metadata Rows */}
            <div className="space-y-2.5">
              {details.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono py-1 border-b border-line/60 last:border-0">
                    <span className="text-muted flex items-center gap-2">
                      <Icon className="text-accent text-[11px]" />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-ink font-medium text-right">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-line">
            <a
              href="/assets/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-artcraft w-full text-center"
            >
              <FaDownload className="text-xs" />
              <span>Download Full CV (PDF)</span>
            </a>
          </div>
        </article>

        {/* Card B: Engineering Logic */}
        <article className="bg-bg p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <span className="hud-label text-faint">B / CORE DISCIPLINE</span>
              <span className="hud-label text-muted">010101</span>
            </div>

            <h3 className="font-display font-medium text-xl text-ink-strong mb-3">
              Hardware Logic & Systems Architecture
            </h3>

            <p className="text-sm text-muted leading-relaxed mb-4">
              Trained in the core scientific and mathematical foundations of Computer Engineering at the University of Peradeniya. My academic work encompasses digital logic synthesis, computer architecture, memory hierarchies, and algorithm complexity.
            </p>

            <ul className="space-y-2 text-xs font-mono text-muted">
              <li className="flex items-center gap-2">
                <span className="text-accent">+</span> Low-level logic synthesis & microcontroller interfacing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">+</span> High-performance algorithmic optimization in C++ & Python
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">+</span> Embedded sensor telemetries & IoT architectures
              </li>
            </ul>
          </div>

          <div className="border-t border-line pt-4">
            <span className="hud-label text-faint">FACULTY OF ENGINEERING • UOP</span>
          </div>
        </article>

        {/* Card C: Creative Front-End */}
        <article className="bg-bg p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <span className="hud-label text-faint">C / INTERFACE CRAFT</span>
              <span className="hud-label text-muted">UI/UX</span>
            </div>

            <h3 className="font-display font-medium text-xl text-ink-strong mb-3">
              Fluid Creative Coding & Design Systems
            </h3>

            <p className="text-sm text-muted leading-relaxed mb-4">
              Software is only as effective as the clarity of its interface. I combine engineering discipline with visual taste — creating responsive, accessible, and mathematically balanced user experiences.
            </p>

            <ul className="space-y-2 text-xs font-mono text-muted">
              <li className="flex items-center gap-2">
                <span className="text-accent">+</span> Component-driven React 19 & Tailwind CSS systems
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">+</span> 3D WebGL scenes using Three.js & hardware shaders
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">+</span> Typographic hierarchies & visual assets in Adobe Suite
              </li>
            </ul>
          </div>

          <div className="border-t border-line pt-4">
            <span className="hud-label text-faint">CREATIVE DEVELOPER PROTOCOL</span>
          </div>
        </article>

      </div>
    </SectionFrame>
  );
}
