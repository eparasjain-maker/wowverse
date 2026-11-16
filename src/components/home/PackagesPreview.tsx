import React from 'react';
import { OFFICIAL_PACKAGES } from '../../data/packages';
import { Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PackagesPreview: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-bone text-ink relative border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-ink/10" data-reveal="true">
          <div>
            <p className="meta text-ink/70 mb-3">
              Transparent Investment · Vrindavan Atelier
            </p>
            <h2 className="display-title text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-ink leading-none">
              Choose your WOW.
            </h2>
          </div>

          <Link
            to="/packages"
            className="mt-6 md:mt-0 pill bg-ink text-bone hover:bg-black font-sans text-xs tracking-wider uppercase"
            data-cursor="PACKAGES"
          >
            <span>Compare all packages</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {OFFICIAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between transition-all duration-500 relative ${
                pkg.isPopular
                  ? 'bg-panel-blue text-ink shadow-2xl scale-100 lg:-translate-y-2 border border-ink/15'
                  : 'bg-white/80 border border-ink/10 hover:border-ink/25 text-ink'
              }`}
              data-reveal="true"
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-ink text-bone meta text-[9px] shadow-md">
                  Most Selected Atelier Tier
                </div>
              )}

              <div>
                <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-ink/15">
                  <h3 className="display-title text-2xl md:text-3xl font-normal">
                    {pkg.name}
                  </h3>
                  <span className="display-title text-3xl font-semibold">
                    {pkg.formattedPrice}
                  </span>
                </div>

                <p className="text-xs sm:text-sm italic font-serif opacity-80 mb-6">
                  "{pkg.tagline}"
                </p>

                {/* Specs Pill Bar */}
                <div className="p-3 rounded-full bg-ink/5 border border-ink/10 mb-8 flex items-center justify-between meta text-[9px]">
                  <span>{pkg.specs.creators} Creator{pkg.specs.creators > 1 ? 's' : ''}</span>
                  <span>•</span>
                  <span>{pkg.specs.days}</span>
                  <span>•</span>
                  <span>{pkg.specs.functions}</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-8 text-xs font-sans opacity-85">
                  {pkg.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 opacity-90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-ink/15 space-y-3">
                <Link
                  to={`/booking?package=${encodeURIComponent(pkg.name)}`}
                  className="w-full py-3.5 rounded-full font-sans text-xs tracking-wider uppercase text-center block transition-all bg-ink text-bone hover:bg-black font-medium"
                  data-cursor="RESERVE"
                >
                  Select {pkg.name} →
                </Link>
                <p className="meta text-[9px] text-center opacity-60">
                  Turnaround: {pkg.turnaround}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
