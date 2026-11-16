import React from 'react';
import { Camera, Smartphone, Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PerspectiveDifference: React.FC = () => {
  return (
    <section className="home-craft home-section py-24 md:py-32 bg-panel-rose text-ink relative border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Header */}
        <div className="max-w-4xl mb-16" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            The Contemporary Shift · Perspective
          </p>

          <h2 className="display-title text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-ink leading-[1.05]">
            Your wedding.<br />
            <span className="italic">Two different perspectives.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-ink/80 font-normal leading-relaxed">
            Traditional photography and cinematography preserve the bigger picture. WOWVERSE captures the spontaneous, social-first side of your celebration.
          </p>
        </div>

        {/* Side-by-Side Comparison Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Photography Panel */}
          <div
            className="p-8 md:p-12 rounded-3xl bg-white/60 border border-ink/10 flex flex-col justify-between"
            data-reveal="true"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-ink/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center text-ink">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="display-title text-2xl text-ink">Traditional Photo & Cinema</h3>
                    <p className="meta text-[10px] text-ink/60">Format: 16:9 Landscape · Full Documentary</p>
                  </div>
                </div>
                <span className="meta text-[10px] text-ink/60">60+ DAYS</span>
              </div>

              <ul className="space-y-4 text-xs font-sans text-ink/75">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-2 shrink-0" />
                  <span>Staged mandap portraits, formal family lineups, and wide ritual documentation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-2 shrink-0" />
                  <span>Horizontal cinematic films created primarily for TV screens and archival records.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-2 shrink-0" />
                  <span>Bulky camera rigs, tripods, light setups, and large multi-crew presence on stage.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-2 shrink-0" />
                  <span>Delivery timeline typically spans 45 to 90 days after the celebrations conclude.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/10 meta text-[10px] text-ink/60">
              Purpose: Heirloom archival documentation & printed family albums.
            </div>
          </div>

          {/* WOWVERSE Content Creation Panel */}
          <div
            className="p-8 md:p-12 rounded-3xl bg-ink text-bone flex flex-col justify-between relative shadow-2xl"
            data-reveal="true"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/15">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-panel-blue text-ink flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="display-title text-2xl text-bone font-semibold">WOWVERSE Content Studio</h3>
                    <p className="meta text-[10px] text-bone/60">Format: 9:16 Vertical · Social Cinema</p>
                  </div>
                </div>
                <span className="meta text-[10px] bg-panel-blue text-ink px-3 py-1 rounded-full font-semibold">
                  SAME-DAY LIVE
                </span>
              </div>

              <ul className="space-y-4 text-xs font-sans text-bone/85">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-panel-blue shrink-0 mt-0.5" />
                  <span><strong>Spontaneous, unscripted & candid:</strong> Backstage laughter, mother's tears, Haldi chaos, and electric Baarat reels.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-panel-blue shrink-0 mt-0.5" />
                  <span><strong>Native 9:16 vertical storytelling:</strong> Color-graded specifically for Instagram Reels, mobile screens, and immediate sharing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-panel-blue shrink-0 mt-0.5" />
                  <span><strong>Agile & non-intrusive:</strong> Discreet creators embedded alongside guests, capturing genuine micro-moments without heavy gear.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-panel-blue shrink-0 mt-0.5" />
                  <span><strong>Instant real-time gratification:</strong> Live Instagram stories throughout the day, same-day Reels, and complete delivery in 7–10 days.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
              <span className="meta text-[10px] text-bone/70">
                Purpose: Immediate social-first viral storytelling.
              </span>
              <Link
                to="/packages"
                className="pill bg-panel-blue text-ink hover:bg-[#cbe0f0] text-xs font-sans"
                data-cursor="PACKAGES"
              >
                <span>View packages</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
