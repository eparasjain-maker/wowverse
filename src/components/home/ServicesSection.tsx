import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../../data/services';
import { ArrowUpRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-bone text-ink relative border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-ink/10" data-reveal="true">
          <div>
            <p className="meta text-ink/70 mb-3">
              Craft & Capabilities · Vrindavan Atelier
            </p>
            <h2 className="display-title text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-ink leading-none">
              Your moments.<br />
              <span className="italic">Our perspective.</span>
            </h2>
          </div>

          <Link
            to="/services"
            className="mt-6 md:mt-0 pill bg-ink text-bone hover:bg-black font-sans text-xs tracking-wider uppercase"
            data-cursor="SERVICES"
          >
            <span>Explore all services</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 8 Wedding Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const accentBg = index % 3 === 0 ? 'hover:bg-panel-blue/30' : index % 3 === 1 ? 'hover:bg-panel-rose/30' : 'hover:bg-panel-sage/20';

            return (
              <div
                key={service.id}
                className={`group p-8 rounded-3xl bg-white/70 border border-ink/10 transition-all duration-500 flex flex-col justify-between hover:shadow-lg ${accentBg}`}
                data-reveal="true"
                data-cursor="VIEW"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/10">
                    <span className="display-title text-3xl text-ink/40 group-hover:text-ink transition-colors font-medium">
                      {service.number}
                    </span>
                    <span className="meta text-[9px] text-ink/60 bg-ink/5 px-2.5 py-1 rounded-full">
                      Service
                    </span>
                  </div>

                  <h3 className="display-title text-2xl text-ink mb-1 group-hover:underline decoration-1 underline-offset-4">
                    {service.title}
                  </h3>

                  <p className="meta text-[10px] text-ink/70 mb-3 tracking-wider font-semibold">
                    {service.subtitle}
                  </p>

                  <p className="text-xs text-ink/70 leading-relaxed font-sans line-clamp-3 mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink/60 group-hover:text-ink">
                  <span className="meta text-[9px]">Deliverables Included</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
