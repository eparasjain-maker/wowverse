import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye, Film, Heart, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="max-w-4xl mb-20" data-reveal="true">
          <p className="meta text-ink/70 mb-4">
            About WOWVERSE · Atelier Philosophy
          </p>
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-none">
            A world of<br />
            <span className="italic">extraordinary experiences.</span>
          </h1>
          <p className="mt-8 text-xl sm:text-2xl display-title italic text-ink/80 leading-relaxed">
            "Every Wedding Has a Story. We Capture the WOW."
          </p>
        </div>

        {/* Narrative Section 1: Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="space-y-6 text-sm sm:text-base text-ink/80 font-sans leading-relaxed" data-reveal="true">
            <h2 className="display-title text-3xl sm:text-4xl text-ink font-normal">
              Brand Philosophy
            </h2>
            <p>
              Weddings are sacred, electric, and breathtakingly fast. Months of anticipation, rituals passed down for centuries, and families reuniting from across oceans culminate in days that feel like a whirlwind.
            </p>
            <p>
              Traditional cameras tend to capture the ceremonies as an audience looking inward from afar. WOWVERSE was born from a desire to capture what it <strong className="text-ink font-semibold">felt like to be in the middle of it</strong>.
            </p>
            <p>
              We believe the most poetic moments are unscripted: the private tear wiped away by a sister, the burst of laughter when the floral garland tangles, and the pure electric freedom on the late-night dance floor.
            </p>
          </div>

          <div
            className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-xl bg-ink/5"
            data-reveal-img="true"
          >
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
              alt="WOWVERSE Wedding Storytelling"
              className="w-full h-full object-cover filter brightness-95"
            />
            <div className="photo-shade absolute inset-0 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="meta text-panel-blue">Editorial Cinema</p>
              <p className="display-title text-xl text-white mt-1">Unposed, authentic, and forever alive.</p>
            </div>
          </div>
        </div>

        {/* Narrative Section 2: Roots in Vrindavan (Signature Powder Blue Panel) */}
        <div
          className="p-8 md:p-14 rounded-3xl bg-panel-blue text-ink mb-28 relative overflow-hidden shadow-xl"
          data-reveal="true"
        >
          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/10 border border-ink/20 meta text-[9px] text-ink font-semibold">
              <MapPin className="w-3.5 h-3.5" /> Studio Origin: Vrindavan, India
            </div>
            <h2 className="display-title text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-ink">
              Grounded in Sacred Heritage. Engineered for the Digital Age.
            </h2>
            <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-sans">
              Based at <strong className="text-ink font-semibold">A8, Rukmini Vihar, Vrindavan, Uttar Pradesh</strong>, our studio is immersed in the timeless poetry, devotional depth, and sacred romance of Brij Bhumi.
            </p>
            <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-sans">
              From the ghats of Vrindavan and the historic palaces of Mathura to the luxury heritage properties of Agra, Rajasthan, and international destinations, we bring a cinematic editorial eye that honors solemn traditions while creating viral-quality social art.
            </p>
          </div>
        </div>

        {/* Creative Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div
            className="p-8 rounded-3xl bg-white/70 border border-border hover:shadow-lg transition-all"
            data-reveal="true"
          >
            <Film className="w-8 h-8 text-ink mb-4" />
            <h3 className="display-title text-2xl text-ink mb-2">
              Cinema In Your Pocket
            </h3>
            <p className="text-xs text-ink/75 font-sans leading-relaxed">
              We shoot on cutting-edge mobile cinema equipment with professional color grading workflows, delivering high-speed formats you can share immediately.
            </p>
          </div>

          <div
            className="p-8 rounded-3xl bg-white/70 border border-border hover:shadow-lg transition-all"
            data-reveal="true"
          >
            <Eye className="w-8 h-8 text-ink mb-4" />
            <h3 className="display-title text-2xl text-ink mb-2">
              Complete Social Peace
            </h3>
            <p className="text-xs text-ink/75 font-sans leading-relaxed">
              You, your partner, and your families can completely immerse in the celebrations without worrying about capturing content or managing notifications.
            </p>
          </div>

          <div
            className="p-8 rounded-3xl bg-white/70 border border-border hover:shadow-lg transition-all"
            data-reveal="true"
          >
            <Heart className="w-8 h-8 text-ink mb-4" />
            <h3 className="display-title text-2xl text-ink mb-2">
              Emotional Integrity
            </h3>
            <p className="text-xs text-ink/75 font-sans leading-relaxed">
              No awkward staged re-takes. We capture real smiles, spontaneous laughter, and genuine hugs that look and feel 100% true to your story.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-12 border-t border-border" data-reveal="true">
          <h3 className="display-title text-3xl sm:text-4xl text-ink font-normal mb-6">
            Ready to experience WOWVERSE?
          </h3>
          <Link
            to="/booking"
            className="pill bg-ink text-bone hover:bg-black font-sans text-xs tracking-wider uppercase px-8 py-3.5 inline-flex items-center gap-2"
            data-cursor="RESERVE"
          >
            <span>Check Wedding Availability</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
