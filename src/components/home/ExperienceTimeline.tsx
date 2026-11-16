import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'DISCOVER',
      tagline: 'Checking Dates & Vision',
      description: 'Explore our portfolio, check live calendar availability, and book a consultation with our creative lead.'
    },
    {
      step: '02',
      title: 'PLAN',
      tagline: 'Timelines & Moodboards',
      description: 'We review your celebration itinerary, sound preferences, guest dynamics, and create your custom wedding Instagram aesthetic.'
    },
    {
      step: '03',
      title: 'CAPTURE',
      tagline: 'Discreet Storytelling',
      description: 'Our creators shoot handheld with cinematic 4K mobile rigs, capturing unposed BTS while traditional crews handle formal staging.'
    },
    {
      step: '04',
      title: 'CREATE',
      tagline: 'Same-Day Edits & Live Stories',
      description: 'We publish real-time Instagram Stories throughout the celebration and deliver your first same-day highlight reel before the night ends.'
    },
    {
      step: '05',
      title: 'RELIVE',
      tagline: 'Permanent Digital Archive',
      description: 'Within 7 working days, your complete suite of vertical reels and raw footage archive is handed over ready for a lifetime of replay.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background text-foreground relative border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="max-w-4xl mb-16" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            The Method · 5-Stage Journey
          </p>

          <h2 className="display-title text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ink leading-[1.08]">
            DISCOVER → PLAN → CAPTURE → CREATE → RELIVE.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink/75 font-sans">
            How we bring effortless wedding storytelling to life for your celebrations.
          </p>
        </div>

        {/* Step Flow Grid with Subtle Pastel Accents */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((item, idx) => {
            const cardBg = idx === 0 ? 'hover:bg-panel-blue/30' : idx === 1 ? 'hover:bg-panel-rose/30' : idx === 2 ? 'hover:bg-panel-sage/20' : idx === 3 ? 'hover:bg-panel-apricot/30' : 'hover:bg-panel-blue/30';

            return (
              <div
                key={item.step}
                className={`p-6 rounded-3xl bg-white/70 border border-border transition-all flex flex-col justify-between group shadow-sm hover:shadow-md ${cardBg}`}
                data-reveal="true"
              >
                <div>
                  <div className="flex justify-between items-center pb-4 mb-4 border-b border-border">
                    <span className="display-title text-3xl font-medium text-ink/40 group-hover:text-ink transition-colors">
                      {item.step}
                    </span>
                    {idx < steps.length - 1 ? (
                      <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-ink transition-colors" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-ink animate-pulse" />
                    )}
                  </div>

                  <h3 className="display-title text-xl text-ink uppercase mb-1">
                    {item.title}
                  </h3>
                  <p className="meta text-[9px] text-ink/70 mb-3 font-semibold">
                    {item.tagline}
                  </p>
                  <p className="text-xs font-sans text-ink/70 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-border meta text-[9px] text-ink/50">
                  Stage 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
