import { useState, useEffect } from 'react';
import { FaGithub, FaWhatsapp, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Briefing', id: 'briefing' },
  { label: 'About', id: 'about' },
  { label: 'Capabilities', id: 'expertise' },
  { label: 'Tech Stack', id: 'skills' },
  { label: 'Works', id: 'work' },
  { label: 'Credentials', id: 'education' },
  { label: 'Proof', id: 'reviews' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ theme, setTheme, onAddTestimonial }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 48; // nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b border-line bg-bg/95 backdrop-blur-md">
      <div className="flex h-12 items-stretch justify-between">
        
        {/* Left: Brand Monogram + Desktop Nav */}
        <div className="flex min-w-0 items-stretch">
          {/* Logo Cell */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 border-r border-line px-4 hover:opacity-80 sm:px-6 transition-opacity text-left"
            title="MFA Naseef Sharaf"
          >
            <span className="w-6 h-6 border border-line bg-bg-raised text-ink flex items-center justify-center font-mono font-bold text-[11px] tracking-wider">
              NS
            </span>
            <span className="hidden sm:inline font-mono font-bold text-xs uppercase tracking-[0.14em] text-ink">
              Naseef Sharaf
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav aria-label="Main" className="hidden lg:flex min-w-0 items-stretch">
            <ul className="flex h-full items-stretch">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="flex items-stretch border-r border-line">
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`group flex h-full items-center px-3 hud-label whitespace-nowrap transition-colors ${
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
            </ul>
          </nav>
        </div>

        {/* Right: Social Links, Theme Toggle & CTA Button */}
        <div className="flex shrink-0 items-stretch">
          {/* GitHub Icon Cell */}
          <a
            href="https://github.com/Nashaf-engr"
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

          {/* Launch App Style CTA Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:inline-flex items-center justify-center font-mono font-bold uppercase tracking-[0.12em] whitespace-nowrap bg-invert-bg text-invert-fg hover:opacity-85 h-full border-l border-line px-5 text-[11px] transition-opacity cursor-pointer"
          >
            Get In Touch
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Open mobile navigation menu"
            className="flex lg:hidden w-12 items-center justify-center border-l border-line text-muted hover:bg-invert-bg hover:text-invert-fg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-line bg-bg">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-line">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`bg-bg p-4 hud-label text-left transition-colors ${
                  activeSection === item.id ? 'bg-invert-bg text-invert-fg' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex border-t border-line">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full bg-invert-bg text-invert-fg font-mono font-bold uppercase tracking-[0.12em] text-[11px] py-3.5 text-center"
            >
              Get In Touch →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
