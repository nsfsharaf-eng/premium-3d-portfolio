import React from 'react';
import { LuX, LuGithub, LuArrowUpRight } from 'react-icons/lu';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-bg/85 backdrop-blur-md">
      <div className="bg-bg w-full max-w-3xl border border-line overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Corner Ticks */}
        <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-faint">+</span>
        <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-faint">+</span>
        <span aria-hidden="true" className="tick -bottom-[5px] -left-[5px] text-faint">+</span>
        <span aria-hidden="true" className="tick -bottom-[5px] -right-[5px] text-faint">+</span>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 border border-line bg-bg hover:bg-invert-bg hover:text-invert-fg flex items-center justify-center transition-colors z-20 cursor-pointer"
          title="Close Inspector"
        >
          <LuX className="text-sm" />
        </button>

        {/* Left Side (Image Viewport) */}
        <div className="w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden relative border-b md:border-b-0 md:border-r border-line bg-bg-sunken flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            onError={(e) => { e.target.src = '/assets/cover.png'; }}
          />
        </div>

        {/* Right Side (Details & Metadata) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3 pr-8">
              <span className="hud-label text-faint">
                SYSTEM INSPECTOR // 0{project.id}
              </span>
              <span className="hud-label text-accent">
                DEPLOYED
              </span>
            </div>

            <h3 className="font-display font-medium text-2xl text-ink-strong">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="pt-2">
              <p className="hud-label text-faint text-[10px] mb-2">
                TECHNOLOGY TELEMETRY
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-faint border border-line bg-bg-sunken"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 border-t border-line pt-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-artcraft flex-1 text-center"
              >
                <span>Live Launch</span>
                <LuArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-artcraft-outline flex-1 text-center"
              >
                <LuGithub className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
