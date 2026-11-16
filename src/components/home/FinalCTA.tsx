import React from 'react';
import { Calendar, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 bg-panel-blue text-ink overflow-hidden border-b border-ink/10">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-14 text-center">
        <p className="meta text-ink/75 mb-4" data-reveal="true">
          Reserve Your Wedding Window · 2025–2026
        </p>

        <h2 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-tight mb-6" data-reveal="true">
          Your story<br />
          <span className="italic">deserves its WOW.</span>
        </h2>

        <p className="display-title text-2xl sm:text-3xl text-ink/80 max-w-2xl mx-auto mb-12 italic" data-reveal="true">
          "Let's make something unforgettable."
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-reveal="true">
          <Link
            to="/booking"
            className="w-full sm:w-auto pill bg-ink hover:bg-black text-bone font-sans text-xs tracking-wider uppercase px-9 py-4 shadow-xl transition-all hover:scale-105 active:scale-95"
            data-cursor="RESERVE"
          >
            <Calendar className="w-4 h-4" />
            <span>CHECK YOUR DATE NOW</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/919675960505?text=Hi%20WOWVERSE%2C%20I%20would%20like%20to%20check%20wedding%20dates%20and%20package%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto pill bg-white/70 hover:bg-white text-ink border border-ink/15 font-sans text-xs tracking-wider uppercase px-9 py-4 transition-all hover:scale-105 active:scale-95"
            data-cursor="WHATSAPP"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/15 flex flex-wrap items-center justify-center gap-6 meta text-[10px] text-ink/70" data-reveal="true">
          <span>A8, Rukmini Vihar, Vrindavan, UP 281121</span>
          <span>•</span>
          <span>+91 96759 60505 · +91 9012099666</span>
          <span>•</span>
          <span>Destinations Across India & Beyond</span>
        </div>
      </div>
    </section>
  );
};
