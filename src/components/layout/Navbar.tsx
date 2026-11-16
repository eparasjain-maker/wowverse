import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Stories', path: '/stories' },
    { label: 'Services', path: '/services' },
    { label: 'Packages', path: '/packages' },
    { label: 'About', path: '/about' },
    { label: 'Availability', path: '/booking' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`site-header is-home flex items-center justify-between ${
          scrolled ? 'is-scrolled' : ''
        }`}
      >
        {/* Brand Wordmark matching says.theroyal.org.in */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-cursor="WOWVERSE"
        >
          <div className="w-8 h-8 rounded-full bg-panel-blue text-ink flex items-center justify-center font-bold font-mono text-xs">
            W
          </div>
          <span className="wordmark text-2xl tracking-normal">
            WOWVERSE
          </span>
          <span className="meta hidden lg:inline-block opacity-70 ml-1">
            [Est. 2025 · Vrindavan]
          </span>
        </Link>

        {/* Desktop Nav Links (Hidden when scrolled into pill or on mobile) */}
        {!scrolled && (
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-panel-blue font-semibold'
                      : 'text-bone/75 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-panel-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Action: Studio Portal & Orbit Menu Button */}
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            title="Studio Portal"
            className="p-2 rounded-full opacity-65 hover:opacity-100 transition-opacity"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Signature Orbit Menu Control matching says.theroyal.org.in */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-control group"
            aria-label="Toggle Menu"
            type="button"
          >
            <span className="menu-control-orbit" aria-hidden="true">
              <span />
            </span>
            <span className="menu-control-label">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Signature Curtain Menu Overlay from says.theroyal.org.in */}
      {menuOpen && (
        <div className="fixed inset-0 z-[85] bg-[#0e0e0e]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-14 animate-[menu-curtain-in_.6s_cubic-bezier(.77,0,.18,1)_forwards]">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="wordmark text-3xl text-bone">WOWVERSE</span>
              <span className="meta text-panel-blue">[Studio Atelier]</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-bone transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links Grid with Staggered Link Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-8">
            <div className="flex flex-col space-y-3">
              <span className="meta text-panel-blue mb-2">Navigation Archive</span>
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between py-1 text-2xl sm:text-4xl md:text-5xl font-serif text-bone hover:text-panel-blue transition-colors animate-[menu-link-in_.6s_cubic-bezier(.16,1,.3,1)_forwards]"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="meta text-white/40 text-xs font-mono">0{idx + 1}</span>
                      <span className={isActive ? 'italic underline underline-offset-8 text-panel-blue' : ''}>
                        {link.label}
                      </span>
                    </span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>

            {/* Atelier Info & Quick Action Panel in Signature Powder Blue */}
            <div className="flex flex-col justify-between bg-panel-blue text-ink p-8 rounded-3xl shadow-2xl">
              <div>
                <span className="meta text-ink/70">Atelier Brief · Vrindavan</span>
                <h3 className="display-title text-2xl md:text-3xl font-normal mt-3 leading-snug">
                  Every Wedding Has a Story.<br />
                  <span className="italic">We Capture the WOW.</span>
                </h3>
                <p className="font-sans text-sm text-ink/80 mt-4 leading-relaxed">
                  Spontaneous, social-first wedding content creation. Vertical 4K reels, real-time live stories, and authentic behind-the-scenes magic.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  to="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-4 rounded-full bg-ink text-bone text-center text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  <span>Check Date Availability</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-xs text-ink/75 pt-2 meta">
                  <span>A8, Rukmini Vihar, Vrindavan</span>
                  <span>+91 96759 60505</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of Curtain */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-bone/60">
            <span className="meta">WOWVERSE Digital Storytelling Studio © 2025</span>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="meta hover:text-bone text-panel-blue flex items-center gap-1.5 mt-2 sm:mt-0"
            >
              <Shield className="w-3 h-3" /> Studio Portal Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
