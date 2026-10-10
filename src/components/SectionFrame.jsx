import React from 'react';

export default function SectionFrame({
  id,
  index = '01',
  title = 'Section',
  meta = '',
  headline,
  italicWord,
  headlineAfter = '',
  subheading,
  children,
  className = '',
}) {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      {/* Top Hairline Rule */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />

      {/* Main Architectural Container */}
      <div className="relative mx-auto max-w-[1280px] border-x border-line bg-bg">
        {/* Corner Crosshair Ticks */}
        <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-faint">
          +
        </span>
        <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-faint">
          +
        </span>

        {/* Sticky Eyebrow HUD Header */}
        <div className="sticky top-12 z-30 border-y border-line bg-bg/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-6 py-3 md:px-10">
            <p className="hud-label text-muted">
              <span className="text-faint">{index}</span>
              <span aria-hidden="true" className="mx-2 text-faint">/</span>
              {title}
            </p>
            {meta && (
              <p className="hud-label hidden text-faint sm:block">
                {meta}
              </p>
            )}
          </div>
        </div>

        {/* Section Headline Area */}
        {(headline || subheading) && (
          <div className="px-6 py-12 md:px-10 md:py-16">
            {headline && (
              <h2 className="max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.035em] text-ink-strong sm:text-4xl md:text-5xl">
                {headline}
                {italicWord && (
                  <>
                    {' '}
                    <span className="font-serif italic font-normal text-ink">
                      {italicWord}
                    </span>
                  </>
                )}
                {headlineAfter}
              </h2>
            )}
            {subheading && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Section Body */}
        {children}
      </div>
    </section>
  );
}
