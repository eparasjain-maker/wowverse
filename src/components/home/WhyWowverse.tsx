import React from 'react';

export const WhyWowverse: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Real-Time Gratification',
      desc: 'No waiting 60 days for highlights. Your Instagram Stories go live while your celebration is happening, and your first cinematic Reel lands same-day.'
    },
    {
      num: '02',
      title: 'Native 9:16 Vertical Artistry',
      desc: 'We do not crop landscape footage. Every frame is composed, color-graded, and sound-engineered specifically for the way people actually experience media today.'
    },
    {
      num: '03',
      title: 'Unobtrusive Discretion',
      desc: 'No massive tripods, heavy cranes, or intrusive cables blocking your guests. We blend into the celebration like close friends with cinema cameras.'
    },
    {
      num: '04',
      title: 'Raw Emotion & True Chaos',
      desc: 'We hunt for the candid tears, unposed bursts of laughter, backstage nervousness, and wild dance floor energy that staged photography misses.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-bone text-ink relative border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="max-w-4xl mb-16" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            The WOWVERSE Philosophy · Ethos
          </p>

          <h2 className="display-title text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-ink leading-[1.05]">
            We don't just capture what happened.<br />
            <span className="italic text-panel-sage font-medium">We capture what it felt like.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-ink/75 font-normal leading-relaxed">
            We are filmmakers, social storytellers, and aesthetic curators obsessed with the candid magic between the planned ceremonies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="p-8 rounded-3xl bg-white/70 border border-ink/10 transition-all duration-500 flex flex-col justify-between hover:shadow-lg hover:border-ink/20"
              data-reveal="true"
            >
              <div>
                <div className="flex justify-between items-baseline pb-4 mb-6 border-b border-ink/10">
                  <span className="display-title text-3xl text-ink/40 font-medium">
                    {pillar.num}
                  </span>
                  <span className="meta text-[9px] text-ink/60 bg-ink/5 px-2.5 py-1 rounded-full">
                    Standard
                  </span>
                </div>

                <h3 className="display-title text-2xl text-ink mb-3 font-normal">
                  {pillar.title}
                </h3>

                <p className="text-xs font-sans text-ink/70 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-ink/10 meta text-[9px] text-ink/50">
                Purity of Moment
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
