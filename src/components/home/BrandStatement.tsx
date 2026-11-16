import React, { useState } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrandStatement: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <section
        id="atelier"
        className="home-section bg-panel-blue text-ink py-24 md:py-32 px-6 md:px-14 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Micro Meta Header */}
          <p className="meta text-ink/75 mb-3" data-reveal="true">
            The Atelier Brief · Vrindavan
          </p>

          {/* Statement in Avinga Display Serif */}
          <h2 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink font-normal leading-[1.02] max-w-4xl" data-reveal="true">
            The best moments<br />
            <span className="italic">aren't always planned.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-14">
            {/* Left Editorial Video / Film Frame with data-reveal-img */}
            <div className="lg:col-span-5" data-reveal="true">
              <div
                onClick={() => setPlaying(true)}
                className="group relative aspect-[4/5] max-w-md rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-ink/10"
                data-reveal-img="true"
                data-cursor="PLAY"
              >
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Still frame from the WOWVERSE wedding film"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/30 transition-colors" />

                {/* Circular Play Button matching says.theroyal.org.in */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-bone text-ink flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5 text-ink" />
                  </div>
                  <span className="meta text-bone mt-4 text-[9px] bg-ink/60 px-3 py-1 rounded-full backdrop-blur-sm">
                    The WOWVERSE film · Watch the reel
                  </span>
                </div>
              </div>
            </div>

            {/* Right Editorial Copy in DM Sans */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6" data-reveal="true">
              <p className="display-title text-2xl sm:text-3xl md:text-4xl text-ink leading-snug">
                "They're the last-minute dance rehearsals, your mother's happy tears, your best friend's crazy moves and that one moment everyone talks about."
              </p>

              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed font-normal">
                Traditional photography preserves the bigger picture. WOWVERSE lives in the spontaneous, social-first side of your celebration — creating curated vertical films and real-time live stories you can share before the night ends.
              </p>

              <div className="pt-4 border-t border-ink/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="meta text-ink/60 block mb-1">Our Core Promise</span>
                  <p className="font-sans text-base md:text-lg font-semibold tracking-wide text-ink">
                    YOU LIVE IT. WE'LL MAKE SURE YOU CAN RELIVE IT.
                  </p>
                </div>

                <Link
                  to="/about"
                  className="pill bg-ink text-bone hover:bg-black"
                  data-cursor="ABOUT"
                >
                  <span>Our philosophy & craft</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Reel Modal */}
      {playing && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-bone"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-sm w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/20">
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
              src="https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-fun-at-their-wedding-41846-large.mp4"
            />
          </div>
        </div>
      )}
    </>
  );
};
