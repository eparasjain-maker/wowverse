import React, { useState, useEffect } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, Search, MessageCircle, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Packages', 'Booking & Dates', 'On-Ground & BTS', 'Delivery & Tech'];

  const toggleAccordion = (idx: number) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter((i) => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  const filteredFaqs = FAQS_DATA.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="max-w-3xl mb-12" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            Frequently Asked Questions · Atelier Guide
          </p>
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-none">
            Everything you need to know.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
            Clear answers on turnaround times, creator gear, coordination with traditional crews, travel policies, and payment terms.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="space-y-4 mb-12" data-reveal="true">
          <div className="relative">
            <Search className="w-4 h-4 text-ink/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any question (e.g. raw footage, drone, Instagram password)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/70 border border-border text-xs font-sans text-ink focus:outline-none focus:border-ink transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`pill text-xs font-sans transition-all ${
                  selectedCat === cat
                    ? 'bg-ink text-bone font-semibold shadow-md'
                    : 'bg-white/70 border-border text-ink/70 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-20">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs font-sans text-ink/60 bg-white/70 rounded-3xl border border-border">
              No matching questions found for "{search}". Please reach out to us on WhatsApp!
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white/70 border border-border overflow-hidden transition-all duration-200 shadow-sm"
                  data-reveal="true"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 hover:bg-white transition-colors"
                  >
                    <div>
                      <span className="meta text-[9px] text-ink/60 block mb-1 font-semibold">
                        {faq.category}
                      </span>
                      <h3 className="display-title text-xl md:text-2xl text-ink font-normal">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-ink/50 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-ink' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 md:px-8 pb-6 pt-2 text-xs md:text-sm text-ink/80 font-sans leading-relaxed border-t border-border bg-white/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions card in signature powder blue */}
        <div className="p-8 md:p-12 rounded-3xl bg-panel-blue text-ink text-center max-w-2xl mx-auto shadow-xl" data-reveal="true">
          <HelpCircle className="w-10 h-10 text-ink/80 mx-auto mb-4" />
          <h3 className="display-title text-3xl text-ink font-normal mb-2">
            Still Have Questions?
          </h3>
          <p className="text-xs sm:text-sm font-sans text-ink/80 mb-6">
            Our creative directors are happy to answer any questions or build a custom quote for your wedding.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919675960505?text=Hi%20WOWVERSE%2C%20I%20have%20a%20question%20about%20your%20wedding%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="pill bg-ink hover:bg-black text-bone text-xs font-sans tracking-wider uppercase px-6 py-3.5 inline-flex items-center gap-2"
              data-cursor="WHATSAPP"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask On WhatsApp</span>
            </a>
            <Link
              to="/booking?tab=consultation"
              className="pill bg-white/80 hover:bg-white text-ink text-xs font-sans tracking-wider uppercase px-6 py-3.5 inline-flex items-center gap-2"
              data-cursor="CALL"
            >
              <span>Book A Video Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
