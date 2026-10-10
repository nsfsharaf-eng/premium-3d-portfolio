import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaWhatsapp, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { LuChevronDown } from 'react-icons/lu';

const primaryNavItems = [
  { label: 'Home', id: 'home' },
  { label: 'Briefing', id: 'briefing' },
  { label: 'Works', id: 'work' },
];

const dropdownItems = [
  { label: 'About & Persona', id: 'about', index: '02' },
  { label: 'Capabilities', id: 'expertise', index: '03' },
  { label: 'Tech Stack', id: 'skills', index: '04' },
  { label: 'Credentials', id: 'education', index: '06' },
  { label: 'Certifications', id: 'certifications', index: '07' },
  { label: 'Endorsements', id: 'reviews', index: '08' },
];

const allSections = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'briefing', label: 'Broadcast Briefing', index: '01' },
  { id: 'about', label: 'Persona & Philosophy', index: '02' },
  { id: 'expertise', label: 'Capabilities', index: '03' },
  { id: 'skills', label: 'Technical Stack', index: '04' },
  { id: 'work', label: 'Selected Works', index: '05' },
  { id: 'education', label: 'Academic Credentials', index: '06' },
  { id: 'certifications', label: 'Certifications', index: '07' },
  { id: 'reviews', label: 'Proof & Endorsements', index: '08' },
  { id: 'contact', label: 'Transmission Channels', index: '09' },
];

export default function Navbar({ theme, setTheme, onAddTestimonial }) {
  const [activeSection, setActiveSection] = useState('home');
  const [activeLabel, setActiveLabel] = useState('Home');
  const [activeIdx, setActiveIdx] = useState('00');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = allSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(allSections[i].id);
          setActiveLabel(allSections[i].label);
          setActiveIdx(allSections[i].index);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id) => {
    setIsDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 48; // fixed header height
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  };

  const isDropdownActive = dropdownItems.some((item) => item.id === activeSection);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-line bg-bg/85 backdrop-blur-md transition-colors duration-200">
      <div className="flex h-12 items-stretch justify-between">
        
        {/* Left: NS Monogram Only + Primary Navigation */}
        <div className="flex min-w-0 items-stretch">
          
          {/* Logo Cell: ONLY NS logo, no Naseef Sharaf text */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center justify-center border-r border-line px-4 hover:opacity-80 transition-opacity cursor-pointer group"
            title="NS Portfolio"
          >
            <span className="w-7 h-7 border border-line bg-bg-raised text-ink flex items-center justify-center font-mono font-bold text-xs tracking-wider group-hover:bg-invert-bg group-hover:text-invert-fg transition-colors">
              NS
            </span>
          </button>

          {/* Primary Nav Links */}
          <nav aria-label="Main" className="hidden md:flex min-w-0 items-stretch">
            <ul className="flex h-full items-stretch">
              
              {primaryNavItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="flex items-stretch border-r border-line">
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`group flex h-full items-center px-3 hud-label whitespace-nowrap transition-colors cursor-pointer ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`}
                    >
                      <span
                        className={`flex items-center gap-1.5 px-2 py-0.5 transition-all ${
                          isActive
                            ? 'bg-invert-bg text-invert-fg'
                            : 'group-hover:bg-invert-bg group-hover:text-invert-fg'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}

              {/* Reduced Tabs: Dropdown Menu (Sections ▾) */}
              <li
                ref={dropdownRef}
                className="relative flex items-stretch border-r border-line"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`group flex h-full items-center px-3 hud-label whitespace-nowrap transition-colors cursor-pointer ${
                    isDropdownActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  <span
                    className={`flex items-center gap-1 px-2 py-0.5 transition-all ${
                      isDropdownActive
                        ? 'bg-invert-bg text-invert-fg'
                        : 'group-hover:bg-invert-bg group-hover:text-invert-fg'
                    }`}
                  >
                    <span>Sections</span>
                    <LuChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </button>

                {/* Dropdown Menu Panel matching ArtCraft */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-56 border border-line bg-bg/95 backdrop-blur-md shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="p-1.5 space-y-0.5">
                      {dropdownItems.map((item) => {
                        const isItemActive = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left hud-label transition-colors cursor-pointer ${
                              isItemActive
                                ? 'bg-invert-bg text-invert-fg font-semibold'
                                : 'text-muted hover:bg-bg-raised hover:text-ink'
                            }`}
                          >
                            <span>{item.label}</span>
                            <span className="text-[9px] text-faint">
                              {item.index}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>

              {/* Direct Contact Tab */}
              <li className="flex items-stretch border-r border-line">
                <button
                  onClick={() => scrollTo('contact')}
                  className={`group flex h-full items-center px-3 hud-label whitespace-nowrap transition-colors cursor-pointer ${
                    activeSection === 'contact' ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  <span
                    className={`flex items-center gap-1.5 px-2 py-0.5 transition-all ${
                      activeSection === 'contact'
                        ? 'bg-invert-bg text-invert-fg'
                        : 'group-hover:bg-invert-bg group-hover:text-invert-fg'
                    }`}
                  >
                    Contact
                  </span>
                </button>
              </li>

            </ul>
          </nav>

          {/* Active Section Telemetry Docked Pill (Light Blurry Effect on Scroll) */}
          {activeSection !== 'home' && (
            <div className="hidden lg:flex items-center gap-2 border-r border-line px-3.5 hud-label text-accent bg-bg/60 backdrop-blur-sm animate-in fade-in duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-faint">{activeIdx} /</span>
              <span className="text-ink truncate max-w-[150px]">{activeLabel}</span>
            </div>
          )}

        </div>

        {/* Right Side: GitHub, WhatsApp, Theme Switcher & CTA */}
        <div className="flex shrink-0 items-stretch">
          
          {/* GitHub Icon Cell */}
          <a
            href="https://github.com/nsfsharaf-eng"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:flex w-12 items-center justify-center border-l border-line text-muted hover:bg-invert-bg hover:text-invert-fg transition-colors"
          >
            <FaGithub className="w-4 h-4" />
          </a>

          {/* WhatsApp Cell */}
          <a
            href="https://wa.me/94720243581?text=Hello%20Naseef%2C%20I%20visited%20your%20portfolio."
            target="_blank"
            rel="noreferrer"
            aria-label="Direct WhatsApp Message"
            className="hidden sm:flex w-12 items-center justify-center border-l border-line text-muted hover:bg-invert-bg hover:text-invert-fg transition-colors"
          >
            <FaWhatsapp className="w-4 h-4" />
          </a>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="flex w-12 items-center justify-center border-l border-line text-muted hover:bg-invert-bg hover:text-invert-fg transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
          </button>

          {/* High-Contrast CTA Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex items-center justify-center font-mono font-bold uppercase tracking-[0.12em] whitespace-nowrap bg-invert-bg text-invert-fg hover:opacity-85 h-full border-l border-line px-5 text-[11px] transition-opacity cursor-pointer"
          >
            Get In Touch
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Open mobile navigation menu"
            className="flex md:hidden w-12 items-center justify-center border-l border-line text-muted hover:bg-invert-bg hover:text-invert-fg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-bg/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-px bg-line">
            {allSections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`bg-bg p-3.5 hud-label text-left transition-colors cursor-pointer ${
                  activeSection === item.id ? 'bg-invert-bg text-invert-fg' : 'text-muted hover:text-ink'
                }`}
              >
                <span className="text-[9px] text-faint block">{item.index} /</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex border-t border-line">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full bg-invert-bg text-invert-fg font-mono font-bold uppercase tracking-[0.12em] text-[11px] py-3 text-center cursor-pointer"
            >
              Get In Touch →
            </button>
          </div>
        </div>
      )}
    </header>
  );
          }
