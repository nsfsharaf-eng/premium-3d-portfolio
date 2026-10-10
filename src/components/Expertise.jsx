import React from 'react';
import SectionFrame from './SectionFrame';

const expertiseData = [
  {
    index: '01',
    code: 'CORP_WEB',
    title: 'Business Website',
    desc: 'Corporate websites engineered for brand authority, crystal-clear messaging, high-conversion user pathways, and responsive mobile rendering.',
    category: 'Corporate',
    deliverables: ['Custom Brand Identity', 'SEO & Performance', 'Responsive Architecture'],
  },
  {
    index: '02',
    code: 'SAAS_DASH',
    title: 'Admin Dashboard',
    desc: 'High-density operational dashboards with intuitive data visualization, live metric feeds, tabular controls, and structured role-based access.',
    category: 'SaaS & Web App',
    deliverables: ['Interactive Charts', 'State Management', 'REST API Integration'],
  },
  {
    index: '03',
    code: 'ECOM_FLOW',
    title: 'E-Commerce Store',
    desc: 'Modern online storefronts with responsive product grids, fast search and filtering, frictionless checkout journeys, and luxury micro-interactions.',
    category: 'Digital Retail',
    deliverables: ['Product Catalog', 'Cart Flows', 'Payment Gateway Ready'],
  },
  {
    index: '04',
    code: 'FULL_STACK',
    title: 'Full Stack Web App',
    desc: 'Scalable web applications combining robust backend services, structured database schemas, modular API endpoints, and fluid client interfaces.',
    category: 'Systems Software',
    deliverables: ['Node.js & Python', 'Database Schema', 'Secure Auth Systems'],
  },
  {
    index: '05',
    code: '3D_EXPERIENCE',
    title: 'Portfolio & Creative 3D',
    desc: 'Immersive showcase experiences for artists, engineers, and agencies leveraging Three.js WebGL, cinematic typography, and scroll choreography.',
    category: 'Creative Tech',
    deliverables: ['Three.js WebGL', 'Custom Audio/Video', 'Aesthetic Typography'],
  },
  {
    index: '06',
    code: 'REDESIGN_REV',
    title: 'Website Redesign & Audit',
    desc: 'Transforming legacy, slow, or template-based websites into modern, architectural digital products with 100/100 Lighthouse performance scores.',
    category: 'Optimization',
    deliverables: ['Core Web Vitals', 'UI/UX Elevation', 'Code Modernization'],
  },
];

export default function Expertise() {
  return (
    <SectionFrame
      id="expertise"
      index="03"
      title="Capabilities"
      meta="6 Production Disciplines"
      headline="What I"
      italicWord="deliver"
      headlineAfter="for clients & teams."
      subheading="Engineering bespoke digital solutions with zero bloat, uncompromising speed, and architectural visual design."
    >
      {/* 6-Card Gap-px Grid */}
      <div className="grid gap-px border-t border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {expertiseData.map((item) => (
          <article
            key={item.index}
            className="bg-bg p-6 md:p-8 flex flex-col justify-between group hover:bg-bg-raised transition-colors"
          >
            <div>
              {/* Card Top HUD Bar */}
              <div className="flex items-center justify-between border-b border-line pb-3 mb-6">
                <span className="hud-label text-faint">
                  {item.index} / {item.code}
                </span>
                <span className="hud-label text-muted">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-medium text-xl text-ink-strong mb-3 group-hover:text-accent transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            {/* Deliverables Tags */}
            <div className="pt-4 border-t border-line">
              <div className="flex flex-wrap gap-1.5">
                {item.deliverables.map((deliv, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono uppercase tracking-wider text-faint px-2 py-0.5 border border-line bg-bg-sunken"
                  >
                    {deliv}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
