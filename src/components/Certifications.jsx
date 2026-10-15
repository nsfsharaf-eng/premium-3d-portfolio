import { useState } from 'react';
import SectionFrame from './SectionFrame';
import { LuExternalLink, LuAward } from 'react-icons/lu';

const certificationsData = [
  {
    index: '01',
    provider: "Google via Coursera",
    title: "Introduction to AI",
    category: "ai",
    url: "https://www.coursera.org/account/accomplishments/verify/7IT9T9F4FSG1",
    date: "Verified"
  },
  {
    index: '02',
    provider: "Google via Coursera",
    title: "Maximize Productivity With AI Tools",
    category: "productivity",
    url: "https://www.coursera.org/account/accomplishments/verify/WLLSOTNRZLZX",
    date: "Verified"
  },
  {
    index: '03',
    provider: "Google via Coursera",
    title: "Discover the Art of Prompting",
    category: "ai",
    url: "https://www.coursera.org/account/accomplishments/verify/UAZDU6PM0CVF",
    date: "Verified"
  },
  {
    index: '04',
    provider: "Coursera Project Network",
    title: "Use Canva to Design Digital Course Collateral",
    category: "design",
    url: "https://www.coursera.org/account/accomplishments/verify/YOLIMSTGFCNV",
    date: "Verified"
  },
  {
    index: '05',
    provider: "Canva Design School",
    title: "Canva Essentials",
    category: "design",
    url: "https://www.canva.com/design-school/certification-award/443c0855-46ad-4663-8080-4788524b044e",
    date: "Verified"
  },
  {
    index: '06',
    provider: "Alison Learning",
    title: "Graphic Design - Visual and Graphic Design",
    category: "design",
    url: "https://alison.com/verify/d54a627364",
    date: "Verified"
  },
  {
    index: '07',
    provider: "LinkedIn Learning",
    title: "Introduction to Prompt Engineering for Generative AI",
    category: "ai",
    url: "https://www.linkedin.com/learning/certificates/713d8e25dbae9e47d16c06ece518b322a5902b2759fb89682e2b17d3027ce693",
    date: "Verified"
  },
  {
    index: '08',
    provider: "LinkedIn Learning",
    title: "Tips to Work with Difficult People",
    category: "professional",
    url: "https://www.linkedin.com/learning/certificates/3fb23e40ab005ed1cdaea9350672f877911a27aadc3f6e4a0b101cf69d6ad53c",
    date: "Verified"
  },
  {
    index: '09',
    provider: "Claude Academy (Anthropic)",
    title: "Claude Code in action",
    category: "ai",
    url: "https://academy.claude.com/verify/2a39a2da83b534851290dc3b192ba710",
    date: "Verified"
  },
  {
    index: '10',
    provider: "Dubai Centre for AI (Dubai Future Foundation)",
    title: "1 Million Prompters - Certificate of Completion",
    category: "ai",
    url: "https://omp.dub.ai/certificate/Ar7tBVwI3SgF",
    date: "Verified"
  }
];

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterChips = [
    { label: 'All (10)', id: 'all' },
    { label: 'AI & Prompts', id: 'ai' },
    { label: 'Graphic Design', id: 'design' },
    { label: 'Productivity', id: 'productivity' },
    { label: 'Professional', id: 'professional' }
  ];

  const filtered = activeFilter === 'all'
    ? certificationsData
    : certificationsData.filter((c) => c.category === activeFilter);

  return (
    <SectionFrame
      id="certifications"
      index="07"
      title="Certifications"
      meta="10 Industry Verified Credentials"
      headline="Verified"
      italicWord="competency"
      headlineAfter="& technical training."
      subheading="Continuous professional learning across generative AI, graphic collateral design, workflow efficiency, and team collaboration."
    >
      {/* Filter Segmented Bar */}
      <div className="border-t border-line bg-bg">
        <div className="flex flex-wrap items-center gap-px bg-line p-px">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`px-4 py-2.5 hud-label transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-invert-bg text-invert-fg'
                    : 'bg-bg text-muted hover:text-ink hover:bg-bg-raised'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Gap-px Grid */}
        <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((cert) => (
            <article
              key={cert.index}
              className="bg-bg p-6 flex flex-col justify-between group hover:bg-bg-raised transition-colors space-y-4"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line pb-2.5 mb-3">
                  <span className="hud-label text-faint">
                    {cert.index} / {cert.category.toUpperCase()}
                  </span>
                  <span className="w-1.5 h-1.5 bg-accent" />
                </div>

                <p className="hud-label text-accent text-[10px] mb-1">
                  {cert.provider}
                </p>

                <h4 className="font-display font-medium text-sm text-ink-strong group-hover:text-accent transition-colors leading-snug">
                  {cert.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between">
                <span className="text-[10px] font-mono text-faint">
                  ACCOMPLISHMENT
                </span>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ink transition-colors"
                >
                  <span>Verify</span>
                  <LuExternalLink className="w-3 h-3 text-accent" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

