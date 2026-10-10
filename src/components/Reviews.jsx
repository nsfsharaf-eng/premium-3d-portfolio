import React from 'react';
import SectionFrame from './SectionFrame';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Reviews({ testimonials = [], onOpenModal }) {
  return (
    <SectionFrame
      id="reviews"
      index="08"
      title="Proof & Endorsements"
      meta="Collaborator & Client Citations"
      headline="Words from"
      italicWord="collaborators"
      headlineAfter="and colleagues."
      subheading="Direct feedback on project delivery, technical execution, communication, and visual craftsmanship."
    >
      <div className="border-t border-line bg-bg">
        {/* 4-Card Gap-px Grid */}
        <div className="grid gap-px border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="bg-bg p-6 md:p-8 flex flex-col justify-between space-y-6 hover:bg-bg-raised transition-colors group"
            >
              <div>
                {/* Top Card Bar */}
                <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                  <span className="hud-label text-faint">
                    0{idx + 1} // CITATION
                  </span>
                  <span className="hud-label text-accent">
                    VERIFIED
                  </span>
                </div>

                <FaQuoteLeft className="text-accent/30 text-lg mb-3" />

                <p className="text-sm text-muted leading-relaxed italic">
                  "{t.message}"
                </p>
              </div>

              {/* Author Row */}
              <div className="pt-4 border-t border-line flex items-center gap-3">
                <div className="w-10 h-10 border border-line bg-bg-raised p-0.5 shrink-0 overflow-hidden">
                  <img
                    src={t.avatar || '/assets/icon.png'}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/assets/icon.png'; }}
                  />
                </div>
                <div>
                  <h4 className="font-display font-medium text-sm text-ink-strong group-hover:text-accent transition-colors">
                    {t.name}
                  </h4>
                  <span className="hud-label text-faint text-[10px] block">
                    {t.role || 'Collaborator'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 md:p-8 flex flex-wrap items-center justify-between gap-4 bg-bg">
          <p className="hud-label text-muted">
            HAVE WORKED TOGETHER? SUBMISSIONS OPEN FOR PEER REVIEWS.
          </p>
          <a
            href="mailto:nashafeng32@gmail.com?subject=Portfolio%20Review%20for%20Naseef"
            className="btn-artcraft text-[10px] py-2 px-4"
          >
            Submit an Endorsement →
          </a>
        </div>
      </div>
    </SectionFrame>
  );
}
