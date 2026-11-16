import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight, Phone } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const primaryNumber = '919675960505';
  const secondaryNumber = '919012099666';

  const defaultMessage = encodeURIComponent(
    'Hello WOWVERSE team! I would like to check date availability and package details for our upcoming wedding.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-surface border border-surface-border rounded-2xl shadow-2xl p-5 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h5 className="font-display font-bold text-sm text-ivory">WOWVERSE Concierge</h5>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online & Ready to Assist
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory-dim hover:text-white p-1 rounded-lg hover:bg-surface-light"
              aria-label="Close WhatsApp card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-ivory-muted py-3">
            Reach out directly for rapid date checks, bespoke wedding packages, or custom quotes.
          </p>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${primaryNumber}?text=${defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 text-xs font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Primary WhatsApp (+91 96759 60505)</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`https://wa.me/${secondaryNumber}?text=${defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface-light hover:bg-surface-hover border border-surface-border text-ivory-muted hover:text-white text-xs font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-wow" />
                <span>Alternate Contact (+91 90120 99666)</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-center text-ivory-dim border-t border-white/5">
            Typical response time: Under 15 minutes
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/25 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-wow rounded-full border-2 border-background" />
      </button>
    </div>
  );
};
