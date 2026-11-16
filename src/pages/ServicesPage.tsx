import React, { useEffect, useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem } from '../types';
import { Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(SERVICES_DATA[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeService: ServiceItem = SERVICES_DATA.find((s: ServiceItem) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <div className="pt-32 pb-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="max-w-3xl mb-16" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            Atelier Capabilities · Vrindavan
          </p>
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-none">
            Our services.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
            From high-impact vertical Reels and live Instagram Stories to complete page management and animated digital invitations, we craft the complete digital ecosystem for your wedding.
          </p>
        </div>

        {/* Interactive Service Selector + Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          {/* Navigation Pills */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="meta text-ink/60 mb-4 px-2">
              Select A Service:
            </h3>
            {SERVICES_DATA.map((srv: ServiceItem) => {
              const isSelected = srv.id === activeTab;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-panel-blue text-ink border-ink/20 font-medium shadow-md'
                      : 'bg-white/70 border-border text-ink/75 hover:bg-white hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="display-title text-base font-semibold">{srv.number}</span>
                    <span className="display-title text-lg tracking-normal">{srv.title}</span>
                  </div>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-ink" />}
                </button>
              );
            })}
          </div>

          {/* Detailed Service Display Card */}
          <div className="lg:col-span-8">
            <div className="p-8 md:p-12 rounded-3xl bg-white/80 border border-border flex flex-col justify-between h-full relative overflow-hidden shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
                  <div>
                    <span className="meta text-ink/70">
                      Service {activeService.number}
                    </span>
                    <h2 className="display-title text-3xl sm:text-4xl text-ink mt-1 font-normal">
                      {activeService.title}
                    </h2>
                    <p className="meta text-[10px] text-ink/60 mt-1">
                      {activeService.subtitle}
                    </p>
                  </div>
                  <span className="w-12 h-12 rounded-full bg-panel-blue text-ink flex items-center justify-center display-title text-xl font-semibold">
                    {activeService.number}
                  </span>
                </div>

                <div className="space-y-6 text-sm sm:text-base text-ink/80 font-sans leading-relaxed mb-8">
                  <p>{activeService.description}</p>
                </div>

                {/* Deliverables */}
                <div className="mb-8">
                  <h4 className="meta text-ink/70 mb-4">
                    Key Deliverables & Specifications:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.deliverables.map((deliv: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white border border-border flex items-start gap-2.5 text-xs text-ink shadow-sm"
                      >
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-sans">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div className="p-4 rounded-2xl bg-panel-blue/30 border border-border mb-8 text-xs text-ink/80">
                  <strong className="text-ink font-semibold">Ideal for: </strong>
                  {activeService.idealFor}
                </div>
              </div>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="meta text-[9px] text-ink/60">
                  Included in official packages or available as studio add-on.
                </span>
                <Link
                  to="/booking"
                  className="pill bg-ink text-bone hover:bg-black font-sans text-xs tracking-wider uppercase"
                >
                  <span>Book for your wedding</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All 8 Services Full Grid Overview */}
        <div className="pt-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16" data-reveal="true">
            <p className="meta text-ink/70 mb-2">
              Comprehensive Roster
            </p>
            <h3 className="display-title text-3xl sm:text-4xl text-ink font-normal">
              Everything Your Wedding Deserves
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((srv: ServiceItem) => (
              <div
                key={srv.id}
                className="p-6 rounded-3xl bg-white/70 border border-border hover:shadow-md transition-all flex flex-col justify-between"
                data-reveal="true"
              >
                <div>
                  <span className="display-title text-xl text-ink/60 mb-2 block">{srv.number}</span>
                  <h4 className="display-title text-2xl text-ink mb-2">{srv.title}</h4>
                  <p className="text-xs text-ink/70 font-sans leading-relaxed line-clamp-3 mb-4">{srv.description}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab(srv.id);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="meta text-[10px] text-ink hover:underline inline-flex items-center gap-1 pt-3 border-t border-border font-semibold"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
