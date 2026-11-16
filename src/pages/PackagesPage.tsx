import React, { useEffect } from 'react';
import { OFFICIAL_PACKAGES, ADD_ON_SERVICES, BOOKING_TERMS } from '../data/packages';
import { Check, ArrowUpRight, ShieldCheck, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PackagesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="max-w-3xl mb-16" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            Official Packages & Pricing · Atelier Collections
          </p>
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-none">
            The investment.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
            Transparent pricing crafted for modern celebrations. Every package includes dedicated creators, vertical cinematic reels, and live social broadcasting.
          </p>
        </div>

        {/* 3 Main Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          {OFFICIAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between transition-all relative ${
                pkg.isPopular
                  ? 'bg-panel-blue text-ink shadow-2xl scale-100 lg:-translate-y-2 border border-ink/20'
                  : 'bg-white/80 border border-border hover:border-ink/20 text-ink shadow-sm'
              }`}
              data-reveal="true"
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-ink text-bone meta text-[9px] shadow-md">
                  Recommended Tier
                </div>
              )}

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h2 className="display-title text-3xl font-normal">
                    {pkg.name}
                  </h2>
                  <span className="display-title text-3xl font-semibold">
                    {pkg.formattedPrice}
                  </span>
                </div>

                <p className="text-xs sm:text-sm italic font-serif opacity-80 mb-6">
                  "{pkg.tagline}"
                </p>

                {/* Specs */}
                <div className={`p-3 rounded-full mb-8 flex items-center justify-between meta text-[9px] ${
                  pkg.isPopular ? 'bg-ink/10 text-ink' : 'bg-ink/5 text-ink/70'
                }`}>
                  <span className="font-medium">{pkg.specs.creators} Creator{pkg.specs.creators > 1 ? 's' : ''}</span>
                  <span>•</span>
                  <span>{pkg.specs.days}</span>
                  <span>•</span>
                  <span>{pkg.specs.functions}</span>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  <span className="meta text-[9px] opacity-70 block mb-2 font-semibold">
                    Included Deliverables:
                  </span>
                  <ul className="space-y-3 text-xs font-sans opacity-90">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 opacity-90" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-current/15 space-y-3">
                <Link
                  to={`/booking?package=${encodeURIComponent(pkg.name)}`}
                  className="w-full py-3.5 rounded-full font-sans text-xs tracking-wider uppercase text-center block transition-all bg-ink text-bone hover:bg-black font-medium"
                  data-cursor="RESERVE"
                >
                  Book {pkg.name} →
                </Link>
                <p className="meta text-[9px] text-center opacity-60">
                  Turnaround: {pkg.turnaround}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Matrix */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/80 border border-border mb-24 overflow-x-auto shadow-sm" data-reveal="true">
          <div className="mb-8">
            <p className="meta text-ink/70 mb-2">
              Side-By-Side Matrix
            </p>
            <h3 className="display-title text-3xl text-ink font-normal">
              Package Deliverables Comparison
            </h3>
          </div>

          <table className="w-full text-left text-xs text-ink/80 border-collapse min-w-[650px] font-sans">
            <thead>
              <tr className="border-b border-border text-ink meta">
                <th className="py-4 px-3 font-semibold">Features & Deliverables</th>
                <th className="py-4 px-3 font-semibold text-center">THE SPARK (₹14,999)</th>
                <th className="py-4 px-3 font-semibold text-center text-ink font-bold bg-panel-blue/40 rounded-t-lg">THE MAGIC (₹29,999)</th>
                <th className="py-4 px-3 font-semibold text-center">THE WOW (₹54,999)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Dedicated Content Creators</td>
                <td className="py-3.5 px-3 text-center">1 Creator</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20 font-semibold">1 Creator</td>
                <td className="py-3.5 px-3 text-center text-ink font-semibold">2 Creators</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Coverage Duration</td>
                <td className="py-3.5 px-3 text-center">1 Function (Up to 4 Hours)</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20">2 Days (Up to 3 Functions)</td>
                <td className="py-3.5 px-3 text-center text-ink font-semibold">3 Days (Up to 4 Functions)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Edited 9:16 Vertical Reels</td>
                <td className="py-3.5 px-3 text-center">6 Reels</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20 font-semibold">12 Reels</td>
                <td className="py-3.5 px-3 text-center text-ink font-semibold">20 Reels</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Real-Time Live Instagram Stories</td>
                <td className="py-3.5 px-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="py-3.5 px-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Same-Day Instagram Reel</td>
                <td className="py-3.5 px-3 text-center text-ink/40">—</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20 font-semibold">1 Same-Day Reel</td>
                <td className="py-3.5 px-3 text-center text-ink font-semibold">Up to 3 Same-Day Reels</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Couple's Instagram Page Styling</td>
                <td className="py-3.5 px-3 text-center">Basic Setup</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20">Setup & Styling</td>
                <td className="py-3.5 px-3 text-center text-ink font-semibold">Full Event Period Handling</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Custom Wedding Creatives (Countdowns)</td>
                <td className="py-3.5 px-3 text-center text-ink/40">—</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20 text-ink/40">—</td>
                <td className="py-3.5 px-3 text-center text-ink font-semibold">6 Custom Creatives</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Digital Video Invitation / Save-the-Date</td>
                <td className="py-3.5 px-3 text-center text-ink/40">—</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20 text-ink/40">—</td>
                <td className="py-3.5 px-3 text-center text-emerald-600 font-semibold"><Check className="w-4 h-4 mx-auto" /> Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">4K Raw Footage Handover</td>
                <td className="py-3.5 px-3 text-center text-ink/40">Add-on</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20 text-ink/40">Add-on</td>
                <td className="py-3.5 px-3 text-center text-emerald-600 font-semibold"><Check className="w-4 h-4 mx-auto" /> Full Handover</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 text-ink font-medium">Turnaround Time</td>
                <td className="py-3.5 px-3 text-center">Within 7 working days</td>
                <td className="py-3.5 px-3 text-center bg-panel-blue/20 font-semibold">Within 7 working days</td>
                <td className="py-3.5 px-3 text-center text-ink font-semibold">7–10 working days</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add-on Services */}
        <div className="mb-24">
          <div className="mb-10" data-reveal="true">
            <p className="meta text-ink/70 mb-2">
              Customize Your Coverage
            </p>
            <h3 className="display-title text-3xl sm:text-4xl text-ink font-normal">
              Official Add-On Services
            </h3>
            <p className="meta text-[10px] text-ink/60 mt-2">
              All add-ons can be selected during booking or added to any base package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADD_ON_SERVICES.map((addon, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/70 border border-border hover:shadow-md transition-all flex flex-col justify-between"
                data-reveal="true"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="display-title text-xl text-ink">{addon.name}</h4>
                    <span className="meta text-xs text-ink font-semibold">{addon.price}</span>
                  </div>
                  <p className="text-xs text-ink/75 font-sans leading-relaxed mt-2">{addon.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between meta text-[10px] text-ink/50">
                  <span>Available on request</span>
                  <Plus className="w-3.5 h-3.5 text-ink" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Booking Terms */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/70 border border-border mb-16" data-reveal="true">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-ink" />
            <h3 className="display-title text-2xl text-ink font-normal">
              Official Booking & Payment Terms
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-ink/80 font-sans">
            {BOOKING_TERMS.map((term, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ink mt-1.5 shrink-0" />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="text-center" data-reveal="true">
          <Link
            to="/booking"
            className="pill bg-ink text-bone hover:bg-black font-sans text-xs tracking-wider uppercase px-8 py-3.5 inline-flex items-center gap-2"
          >
            <span>Check Wedding Dates & Reserve</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
