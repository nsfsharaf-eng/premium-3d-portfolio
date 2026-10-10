import React from 'react';
import SectionFrame from './SectionFrame';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

export default function Education() {
  const coursework = [
    'Computer Architecture & Microprocessors',
    'Data Structures & Algorithm Design',
    'Digital Logic Synthesis & HDL',
    'Object-Oriented Programming (C++ & Java)',
    'Signals, Systems & Mathematical Modeling',
    'Database Management & Software Engineering',
  ];

  return (
    <SectionFrame
      id="education"
      index="06"
      title="Academic Credentials"
      meta="BSc Eng (Hons) • Peradeniya"
      headline="Formed by"
      italicWord="rigor"
      headlineAfter="and foundational theory."
      subheading="Undergraduate engineering studies in the Faculty of Engineering, University of Peradeniya — combining hardware logic, software architecture, and engineering principles."
    >
      <div className="border-t border-line bg-bg">
        <div className="p-6 md:p-10 space-y-8">
          
          {/* Main Institution Card */}
          <div className="border border-line bg-bg-raised p-6 md:p-8 space-y-6 relative">
            <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-faint">+</span>
            <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-faint">+</span>
            <span aria-hidden="true" className="tick -bottom-[5px] -left-[5px] text-faint">+</span>
            <span aria-hidden="true" className="tick -bottom-[5px] -right-[5px] text-faint">+</span>

            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 border border-line bg-bg flex items-center justify-center text-accent">
                  <FaUniversity className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-display font-medium text-xl md:text-2xl text-ink-strong">
                    University of Peradeniya
                  </h3>
                  <p className="hud-label text-muted text-[10px]">
                    Faculty of Engineering • Department of Computer Engineering
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 border border-line bg-bg text-xs font-mono text-ink">
                  2024 — Present
                </span>
                <span className="px-2 py-1 hud-label text-accent bg-accent/10 border border-accent/30">
                  UNDERGRADUATE
                </span>
              </div>
            </div>

            {/* Degree Title & Narrative */}
            <div className="space-y-3">
              <h4 className="font-display font-medium text-lg text-ink">
                Bachelor of the Science of Engineering (Honours)
              </h4>
              <p className="text-sm text-muted leading-relaxed max-w-4xl">
                Rigorous study integrating core physical sciences, electronic logic, and computer systems architecture. Focus areas include algorithmic complexity, hardware-software co-design, embedded firmware synthesis, and high-performance computing frameworks.
              </p>
            </div>

            {/* Key Engineering Modules Grid */}
            <div className="pt-4 border-t border-line space-y-3">
              <p className="hud-label text-faint text-[10px]">
                KEY COMPUTING & ENGINEERING DOMAINS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 border border-line bg-bg text-xs font-mono text-muted"
                  >
                    <span className="text-accent text-[11px]">+</span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Line */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-faint">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-accent text-xs" />
                <span>Peradeniya, Central Province, Sri Lanka</span>
              </span>
              <span>ESTABLISHED 1942 • LEADING SRI LANKAN ENGINEERING FACULTY</span>
            </div>
          </div>

        </div>
      </div>
    </SectionFrame>
  );
}
