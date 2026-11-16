import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUpRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Parallax hero drift effect matching says.theroyal.org.in
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--hero-drift', `${scrollY * 0.25}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="feast-hero" aria-label="WOWVERSE Cinematic Hero">
      {/* Background Cinematic Visual with Slow Zoom & Parallax Drift */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80"
        className="feast-hero-image"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-fun-at-their-wedding-41846-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Exact Photo Shade from says.theroyal.org.in */}
      <div className="feast-hero-shade" />

      {/* Floating Audio Control in top-right */}
      <div className="absolute top-8 right-8 md:right-14 z-20">
        <button
          onClick={toggleMute}
          className="pill bg-ink/50 hover:bg-ink text-bone border-white/20 text-xs backdrop-blur-md"
          aria-label="Toggle Sound"
          data-cursor="AUDIO"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 opacity-70" />
              <span className="meta text-[9px] opacity-75 hidden sm:inline">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-panel-blue" />
              <span className="meta text-[9px] text-panel-blue hidden sm:inline">Sound Live</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Central Title Composition matching says.theroyal.org.in */}
      <div className="feast-hero-title">
        <p className="meta text-bone/80 tracking-[0.3em]" data-reveal="true">
          Wedding Content Atelier · Est. 2025 · Vrindavan
        </p>

        {/* Wordmark in Voklea / Fredoka */}
        <h1 className="wordmark text-bone" data-reveal="true">
          WOWVERSE
        </h1>

        {/* Display Title in Avinga / Cormorant Garamond */}
        <span className="display-title italic text-bone/95" data-reveal="true">
          Every celebration has a story. We capture the WOW.
        </span>
      </div>

      {/* Bottom Bar: Supporting Copy & CTAs */}
      <div className="feast-hero-bottom">
        <p className="text-bone/80 leading-relaxed font-sans" data-reveal="true">
          Your wedding is more than a celebration. It's the laughter, the happy tears, the unexpected moments and the beautiful chaos that make it yours. We turn those moments into stories worth reliving.
        </p>

        <div className="flex items-center gap-3 shrink-0" data-reveal="true">
          <Link
            to="/booking"
            className="pill feast-hero-cta"
            data-cursor="DATES"
          >
            <span>Check Your Date</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/stories"
            className="pill bg-transparent hover:bg-white/10 text-bone border-white/30 hidden sm:inline-flex"
            data-cursor="STORIES"
          >
            <span>Explore Stories</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Link>
        </div>
      </div>

      {/* Bottom Tagline & Scroll Indicator */}
      <a
        href="#atelier"
        className="feast-scroll meta text-bone/80 hover:text-white transition-colors"
        aria-label="Scroll to atelier brief"
      >
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-panel-blue" />
        <span>Every wedding has a story · A world of extraordinary experiences</span>
      </a>
    </section>
  );
};
