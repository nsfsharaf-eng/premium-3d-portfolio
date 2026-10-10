import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile3DSection from './components/Profile3DSection';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

// Floating action icons
import { FaWhatsapp } from 'react-icons/fa';
import { LuArrowUp } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('noload')) {
      return false;
    }
    return true;
  });
  const [activeProject, setActiveProject] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  const [theme, setTheme] = useState(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const urlTheme = params ? params.get('theme') : null;
    if (urlTheme === 'light' || urlTheme === 'dark') return urlTheme;
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return preferredDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Support direct section scrolling via query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 48;
          window.scrollTo(0, y);
        }
      }, 100);
    }
  }, []);
  
  const defaultTestimonials = [
    {
      name: "Peradeniya AgriTech",
      role: "Co-Founder",
      message: "Outstanding engineering and eye for detail. The smart plant monitoring system was integrated flawlessly!",
      avatar: "/assets/icon.png"
    },
    {
      name: "Bistro Cafe",
      role: "Owner",
      message: "Naseef brought our restaurant layout to life with smooth animations. Highly recommend his creative stack.",
      avatar: "/assets/icon.png"
    },
    {
      name: "UOP Engineering Faculty",
      role: "Coordinator",
      message: "A brilliant student and designer. His care for code logic is matched by his graphic layouts.",
      avatar: "/assets/icon.png"
    },
    {
      name: "Destino Travel",
      role: "Manager",
      message: "Very easy to work with, responsive, and produced a beautiful travel agency website theme.",
      avatar: "/assets/icon.png"
    }
  ];

  // Testimonials State
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('portfolio-testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing testimonials from localStorage:", e);
      }
    }
    return defaultTestimonials;
  });

  // Load reviews from public/reviews.json
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/reviews.json');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews from reviews.json:", error);
      }
    };
    fetchReviews();
  }, []);

  // Save testimonials to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Initialise Lenis smooth scroll & AOS
  useEffect(() => {
    if (loading) return;

    AOS.init({
      duration: 700,
      once: true,
      easing: 'ease-out-cubic'
    });

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, [loading]);

  // Toast handler
  const handleShowToast = (type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, leaving: true } : t));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 220);
    }, 3200);
  };

  const handleAddTestimonial = async (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
    handleShowToast('success', 'Submitting Review', 'Sending your review to GitHub...');

    try {
      const response = await fetch('/api/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newReview.name,
          role: newReview.role,
          message: newReview.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        handleShowToast('success', 'Review Saved', 'Your review was saved to GitHub! It will display for everyone in a few minutes.');
      } else {
        if (response.status === 404) {
          handleShowToast('success', 'Review Added (Local)', 'Review added locally! (GitHub sync active in deployment).');
        } else {
          const errorMsg = result.error || 'Server error';
          handleShowToast('error', 'Sync Failed', `Added locally, could not sync to GitHub: ${errorMsg}`);
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      handleShowToast('success', 'Review Added (Local)', 'Review added locally.');
    }
  };

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen w-full bg-bg text-ink font-sans selection:bg-invert-bg selection:text-invert-fg relative transition-colors duration-300">
          
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Background Subtle Architectural Grid */}
          <BackgroundEffects theme={theme} />

          {/* Fixed Top Segmented ArtCraft Navbar */}
          <Navbar
            theme={theme}
            setTheme={setTheme}
            onAddTestimonial={handleAddTestimonial}
          />

          {/* ═══════════════ Seamless Architectural Sections ═══════════════ */}
          <main className="relative w-full z-10">
            <Hero theme={theme} />
            <Profile3DSection theme={theme} />
            <About />
            <Expertise />
            <Skills />
            <Projects onSelectProject={setActiveProject} />
            <Education />
            <Certifications />
            <Reviews testimonials={testimonials} onOpenModal={() => {}} />
            <Contact onShowToast={handleShowToast} />
          </main>

          {/* Directory Footer */}
          <Footer />

          {/* Project Details Modal */}
          {activeProject && (
            <ProjectModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}

          {/* Toast Notification Stack */}
          <div className="fixed bottom-6 left-6 z-[110] flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`flex gap-3 bg-bg border border-line p-4 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-300 max-w-sm ${
                  toast.leaving ? 'opacity-0 -translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'
                }`}
              >
                <div className={`w-6 h-6 border flex items-center justify-center shrink-0 font-mono text-[11px] font-bold ${
                  toast.type === 'success'
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-danger bg-danger/10 text-danger'
                }`}>
                  {toast.type === 'success' ? '✓' : '!'}
                </div>
                <div>
                  <strong className="block text-xs font-mono uppercase tracking-wider text-ink-strong">{toast.title}</strong>
                  <p className="text-xs text-muted mt-0.5">{toast.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Actions */}
          <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-2">
            <a
              href="https://wa.me/94720243581?text=Hello%20Naseef%2C%20I%20visited%20your%20portfolio."
              target="_blank"
              rel="noreferrer"
              aria-label="Contact on WhatsApp"
              className="w-10 h-10 border border-line bg-bg hover:bg-invert-bg hover:text-invert-fg text-muted flex items-center justify-center shadow-xl transition-all cursor-pointer"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="text-base" />
            </a>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="w-10 h-10 border border-line bg-bg hover:bg-invert-bg hover:text-invert-fg text-muted flex items-center justify-center shadow-xl transition-all cursor-pointer"
              title="Return to Top"
            >
              <LuArrowUp className="text-base" />
            </button>
          </div>

          {/* Vercel Speed Insights */}
          <SpeedInsights />
          
          {/* Vercel Web Analytics */}
          <Analytics />

        </div>
      )}
    </>
  );
}
