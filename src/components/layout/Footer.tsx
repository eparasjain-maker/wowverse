import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const marqueeItems = [
    'Cinematic Wedding Reels',
    'Real-Time Live Stories',
    'Unposed Raw BTS',
    'Bride & Groom Narratives',
    'Destination Wedding Atelier',
    'Social Storytelling',
  ];

  return (
    <footer className="bg-footer text-footer-foreground border-t border-footer-foreground/15">
      {/* Top Giant Marquee matching says.theroyal.org.in */}
      <div className="overflow-hidden border-b border-footer-foreground/15 py-6">
        <div className="animate-[marquee_24s_linear_infinite] flex w-max gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="wordmark flex items-center gap-10 text-4xl sm:text-6xl text-footer-foreground">
              {item}
              <span className="h-3 w-3 rounded-full bg-ink inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* 3 Column Grid */}
      <div className="grid gap-10 px-6 py-14 md:grid-cols-3 md:px-14">
        <div>
          <p className="display-title text-3xl sm:text-4xl text-footer-foreground">
            Every Celebration Has a Story.
          </p>
          <Link
            to="/booking"
            className="pill border-footer-foreground bg-transparent hover:bg-footer-foreground hover:text-footer mt-6 inline-flex items-center gap-2"
            data-cursor="RESERVE"
          >
            <span>Begin a bespoke inquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="meta space-y-2 text-xs">
          <p className="opacity-60 font-semibold">Studio Desk</p>
          <a href="mailto:contact@wowverse.in" className="block hover:underline">
            contact@wowverse.in
          </a>
          <a href="tel:+919675960505" className="block hover:underline">
            +91 96759 60505
          </a>
          <a href="tel:+919012099666" className="block hover:underline">
            +91 90120 99666
          </a>
          <p className="opacity-80 pt-2 leading-relaxed">
            A8, Rukmini Vihar, Vrindavan, Uttar Pradesh 281121
          </p>
        </div>

        <div className="meta space-y-2 text-xs">
          <p className="opacity-60 font-semibold">Bases & Coverage</p>
          <p>Vrindavan · Mathura · Agra · Jaipur · Delhi NCR</p>
          <p>Pan-India & Global Destination Weddings</p>
          <div className="pt-4">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 hover:underline"
            >
              <Shield className="w-3.5 h-3.5" /> Studio Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Giant Brand Stamp matching says.theroyal.org.in */}
      <div className="px-6 pb-6 md:px-14">
        <div className="flex items-end gap-4 md:gap-8">
          <div className="h-16 w-16 md:h-32 md:w-32 shrink-0 rounded-full bg-ink text-footer flex items-center justify-center font-bold text-2xl md:text-5xl font-wordmark">
            W
          </div>
          <p className="wordmark text-6xl sm:text-8xl md:text-[160px] lg:text-[180px] leading-[0.8] tracking-tight">
            WOWVERSE
          </p>
        </div>

        <p className="meta mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 opacity-70">
          <span>© 2025 WOWVERSE Atelier. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            Atelier open · Booking 2025–2026
          </span>
        </p>
      </div>
    </footer>
  );
};
