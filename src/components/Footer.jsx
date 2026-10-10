import React from 'react';
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { LuArrowUp } from 'react-icons/lu';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: '00 / Home', id: 'home' },
    { label: '01 / Briefing', id: 'briefing' },
    { label: '02 / Persona', id: 'about' },
    { label: '03 / Capabilities', id: 'expertise' },
    { label: '04 / Tech Stack', id: 'skills' },
    { label: '05 / Selected Works', id: 'work' },
    { label: '06 / Academic', id: 'education' },
    { label: '07 / Certifications', id: 'certifications' },
    { label: '08 / Endorsements', id: 'reviews' },
    { label: '09 / Transmission', id: 'contact' },
  ];

  const socialLinks = [
    { label: 'GitHub Profile', url: 'https://github.com/Nashaf-engr', icon: FaGithub },
    { label: 'LinkedIn Network', url: 'https://www.linkedin.com/in/naseef-sharaf-mfa-291293346/', icon: FaLinkedinIn },
    { label: 'WhatsApp Direct', url: 'https://wa.me/94720243581?text=Hello%20Naseef%2C%20I%20visited%20your%20portfolio.', icon: FaWhatsapp },
    { label: 'Instagram Profile', url: 'https://www.instagram.com/itz.ur.nx_shx_f', icon: FaInstagram },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full border-t border-line bg-bg">
      {/* Top Hairline Rule */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />

      {/* Main Architectural Container */}
      <div className="relative mx-auto max-w-[1280px] border-x border-line bg-bg">
        
        {/* Corner Ticks */}
        <span aria-hidden="true" className="tick -top-[5px] -left-[5px] text-faint">+</span>
        <span aria-hidden="true" className="tick -top-[5px] -right-[5px] text-faint">+</span>

        {/* Directory Grid */}
        <div className="grid gap-px bg-line md:grid-cols-12">
          
          {/* Column 1: Monogram & Bio (5 cols) */}
          <div className="md:col-span-5 bg-bg p-6 md:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 border border-line bg-bg-raised text-ink flex items-center justify-center font-mono font-bold text-xs tracking-wider">
                NS
              </span>
              <span className="font-display font-medium text-base text-ink-strong">
                MFA Naseef Sharaf
              </span>
            </div>

            <p className="text-sm text-muted leading-relaxed max-w-sm">
              Computer Engineering undergraduate at the Faculty of Engineering, University of Peradeniya. Designing and constructing robust full-stack software, embedded hardware telemetries, and architectural web experiences.
            </p>

            <div className="pt-2 text-[11px] font-mono text-faint space-y-1">
              <p>LOCATION: PERADENIYA, SRI LANKA</p>
              <p>STATUS: ACCEPTING WORK INQUIRIES</p>
              <p>DIRECT: nashafeng32@gmail.com</p>
            </div>
          </div>

          {/* Column 2: Navigation Links (4 cols) */}
          <div className="md:col-span-4 bg-bg p-6 md:p-10 space-y-4">
            <p className="hud-label text-faint">INDEX DIRECTORY</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-muted hover:text-ink transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Social & External (3 cols) */}
          <div className="md:col-span-3 bg-bg p-6 md:p-10 space-y-4">
            <p className="hud-label text-faint">EXTERNAL NETWORKS</p>
            <div className="space-y-2.5">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-xs font-mono text-muted hover:text-ink transition-colors"
                  >
                    <Icon className="text-accent text-xs" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="btn-artcraft-outline py-2 px-3 text-[10px] w-full flex items-center justify-between cursor-pointer"
              >
                <span>Back To Top</span>
                <LuArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-line px-6 py-4 flex flex-wrap items-center justify-between gap-4 hud-label text-faint text-[10px]">
          <div>
            © 2026 MFA NASEEF SHARAF • ALL RIGHTS RESERVED
          </div>

          <div>
            UI/UX ARCHITECTURE INSPIRED BY{' '}
            <a
              href="https://getartcraft.com"
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:underline"
            >
              ARTCRAFT
            </a>
          </div>

          <div>
            SRI LANKA • 07°15'N 80°35'E
          </div>
        </div>

      </div>
    </footer>
  );
}
