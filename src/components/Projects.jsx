import React from 'react';
import SectionFrame from './SectionFrame';
import { LuArrowUpRight, LuGithub, LuEye } from 'react-icons/lu';

const projectsData = [
  {
    id: 1,
    index: '01',
    code: 'PROJ_PORTFOLIO',
    title: "Portfolio Website",
    image: "/assets/portfolio-website.png",
    description: "Personal engineering and visual design showcase featuring responsive layouts, fluid micro-interactions, clean sections, and clear storytelling.",
    github: "https://github.com/nsfsharaf-eng/Portfolio",
    demo: "https://github.com/nsfsharaf-eng/Portfolio",
    tags: ["React 19", "TailwindCSS", "JavaScript", "Responsive UI"],
    highlight: "Core Digital Identity",
  },
  {
    id: 2,
    index: '02',
    code: 'PROJ_AGRITECH',
    title: "Smart Plant Monitoring System",
    image: "/assets/smart-plantation.png",
    description: "An Arduino-based hardware and IoT monitoring system capturing temperature, humidity, and soil moisture with real-time sensor telemetries.",
    github: "https://smart-plant-monitoring-a-v2npbp4.gamma.site/",
    demo: "https://smart-plant-monitoring-a-v2npbp4.gamma.site/",
    tags: ["Arduino", "Sensors", "IoT Architecture", "C++ Logic"],
    highlight: "Hardware & IoT",
  },
  {
    id: 3,
    index: '03',
    code: 'PROJ_HEALTH',
    title: "BMI Calculator",
    image: "/assets/bmi web.png",
    description: "A precision calculator web interface for instant biometric and health metric checks with responsive form ergonomics and real-time state feedback.",
    github: "https://github.com/nsfsharaf-eng/BMI-Calculator",
    demo: "https://github.com/nsfsharaf-eng/BMI-Calculator",
    tags: ["HTML5", "CSS3", "JavaScript ES6+", "DOM Logic"],
    highlight: "Utility App",
  },
  {
    id: 4,
    index: '04',
    code: 'PROJ_HOSPITALITY',
    title: "Restaurant Website",
    image: "/assets/resturant-website.png",
    description: "A culinary concept platform designed to showcase food, atmosphere, curated menus, and dining booking flows with rich photography framing.",
    github: "https://github.com/nsfsharaf-eng/Sample-website-for-resturant",
    demo: "https://github.com/nsfsharaf-eng/Sample-website-for-resturant",
    tags: ["HTML5", "CSS3", "Responsive Grid", "UX Flow"],
    highlight: "Commercial Web",
  },
  {
    id: 5,
    index: '05',
    code: 'PROJ_TOURISM',
    title: "Travel Agency Website",
    image: "/assets/travel agency.png",
    description: "A tourism-focused web design with destination-led presentation, booking intent optimization, itinerary layouts, and luxury layout aesthetics.",
    github: "https://github.com/nsfsharaf-eng/Travel-agency-website",
    demo: "https://github.com/nsfsharaf-eng/Travel-agency-website",
    tags: ["HTML5", "CSS3", "UI/UX Design", "Booking Layout"],
    highlight: "Travel & Leisure",
  }
];

export default function Projects({ onSelectProject }) {
  return (
    <SectionFrame
      id="work"
      index="05"
      title="Selected Works"
      meta="5 Production Deployments"
      headline="Systems built for"
      italicWord="scale"
      headlineAfter="and structural clarity."
      subheading="A curation of deployed software systems, embedded hardware prototypes, and bespoke user interfaces."
    >
      {/* 2-Column Gap-px Grid in ArtCraft Signature Style */}
      <div className="grid gap-px border-t border-line bg-line md:grid-cols-2">
        {projectsData.map((project) => (
          <article
            key={project.id}
            className="bg-bg flex flex-col justify-between group hover:bg-bg-raised transition-colors"
          >
            <div>
              {/* Card Top HUD Bar */}
              <div className="flex items-center justify-between border-b border-line px-6 py-3">
                <span className="hud-label text-muted">
                  {project.index} // {project.code}
                </span>
                <span className="hud-label text-accent">
                  {project.highlight}
                </span>
              </div>

              {/* Media Viewport */}
              <div
                onClick={() => onSelectProject && onSelectProject(project)}
                className="relative aspect-video w-full overflow-hidden bg-bg-sunken border-b border-line cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = '/assets/cover.png'; }}
                />

                {/* View Details Hover Overlay */}
                <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="btn-artcraft text-xs py-2 px-4 shadow-xl">
                    <LuEye className="w-3.5 h-3.5" />
                    <span>Inspect System</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 space-y-4">
                <h3
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="font-display font-medium text-2xl text-ink-strong group-hover:text-accent transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {project.description}
                </p>

                {/* Tag Cloud */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-faint border border-line bg-bg-sunken"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="border-t border-line p-6 pt-4 flex items-center justify-between">
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-artcraft py-2 px-4 text-[10px]"
              >
                <span>Live Demo</span>
                <LuArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-artcraft-outline py-2 px-3 text-[10px]"
                title="View Source Code"
              >
                <LuGithub className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
