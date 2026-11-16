import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="max-w-3xl mb-16" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            Get In Touch · Atelier Studio Vrindavan
          </p>
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-none">
            Let's connect.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
            Have questions about wedding dates, packages, travel outside Vrindavan, or custom requirements? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 md:p-10 rounded-3xl bg-white/80 border border-border space-y-6 shadow-sm" data-reveal="true">
              <h3 className="display-title text-2xl text-ink">
                Studio Information
              </h3>

              {/* Location */}
              <div className="flex items-start gap-4 text-xs font-sans text-ink/80">
                <div className="w-10 h-10 rounded-full bg-panel-blue text-ink flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-ink font-semibold block mb-0.5">Primary Location:</span>
                  <p className="leading-relaxed">
                    A8, Rukmini Vihar,<br />
                    Vrindavan, Uttar Pradesh 281121, India
                  </p>
                  <p className="meta text-[9px] text-ink/60 mt-1 font-semibold">
                    Serving Vrindavan · Mathura · Agra · Destinations Worldwide
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4 text-xs font-sans text-ink/80">
                <div className="w-10 h-10 rounded-full bg-panel-blue text-ink flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-ink font-semibold block mb-0.5">Direct Call Numbers:</span>
                  <div className="space-y-1">
                    <p>
                      Primary: <a href="tel:+919675960505" className="text-ink hover:underline font-semibold">+91 96759 60505</a>
                    </p>
                    <p>
                      Secondary: <a href="tel:+919012099666" className="text-ink hover:underline font-semibold">+91 90120 99666</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="flex items-start gap-4 text-xs font-sans text-ink/80">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-ink font-semibold block mb-1">WhatsApp Fast Track:</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href="https://wa.me/919675960505?text=Hi%20WOWVERSE%2C%20I%20would%20like%20to%20connect%20regarding%20our%20wedding."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill bg-emerald-600/10 border border-emerald-600/30 text-emerald-700 hover:bg-emerald-600/20 text-[11px]"
                    >
                      WhatsApp 96759 60505 →
                    </a>
                    <a
                      href="https://wa.me/919012099666?text=Hi%20WOWVERSE%2C%20I%20would%20like%20to%20connect%20regarding%20our%20wedding."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill bg-white border border-border text-ink/75 hover:text-ink text-[11px]"
                    >
                      WhatsApp 90120 99666 →
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 text-xs font-sans text-ink/80">
                <div className="w-10 h-10 rounded-full bg-ink/5 border border-border flex items-center justify-center text-ink shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-ink font-semibold block mb-0.5">Operating Hours:</span>
                  <p>Monday – Sunday: 09:00 AM – 09:00 PM IST</p>
                  <p className="meta text-[9px] text-ink/60">Real-time event coverage available 24/7 on wedding days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-12 rounded-3xl bg-white/80 border border-border shadow-sm" data-reveal="true">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="display-title text-3xl text-ink">Message Sent Successfully</h3>
                  <p className="text-xs sm:text-sm text-ink/70 max-w-sm mx-auto font-sans">
                    Thank you, {name}! Our team will get back to you via WhatsApp / Phone shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="meta text-ink underline font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="display-title text-2xl md:text-3xl text-ink mb-2">
                    Send Us A Quick Message
                  </h3>
                  <p className="text-xs text-ink/60 font-sans mb-6">
                    For full date reservations and multi-day ceremonies, you can also use our dedicated <Link to="/booking" className="text-ink underline font-semibold">Booking System</Link>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block meta text-ink/60 mb-2 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Radhika Sharma"
                        className="w-full px-4 py-3 rounded-full bg-white border border-border text-xs font-sans text-ink focus:outline-none focus:border-ink shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block meta text-ink/60 mb-2 font-semibold">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 96759 60505"
                        className="w-full px-4 py-3 rounded-full bg-white border border-border text-xs font-sans text-ink focus:outline-none focus:border-ink shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block meta text-ink/60 mb-2 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="radhika@example.com"
                      className="w-full px-4 py-3 rounded-full bg-white border border-border text-xs font-sans text-ink focus:outline-none focus:border-ink shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block meta text-ink/60 mb-2 font-semibold">
                      Your Message / Enquiry *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Wedding dates, location, preferred package, or questions..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-border text-xs font-sans text-ink focus:outline-none focus:border-ink resize-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="pill bg-ink hover:bg-black text-bone font-sans text-xs tracking-wider uppercase px-8 py-3.5 inline-flex items-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
