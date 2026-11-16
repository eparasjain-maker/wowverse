import React, { useState } from 'react';
import { format } from 'date-fns';
import { PackageTier, WeddingEnquiry } from '../../types';
import { bookingService } from '../../services/bookingService';
import { Check, ArrowLeft, Send, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WeddingEnquiryFormProps {
  initialDate?: string;
  initialAdditionalDates?: string[];
  initialPackage?: PackageTier;
  onBackToCalendar?: () => void;
}

export const WeddingEnquiryForm: React.FC<WeddingEnquiryFormProps> = ({
  initialDate = '',
  initialAdditionalDates = [],
  initialPackage = 'THE MAGIC',
  onBackToCalendar,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    partner_name: '',
    whatsapp_number: '',
    email: '',
    wedding_date: initialDate,
    additional_dates: initialAdditionalDates.join(', '),
    city_venue: '',
    number_of_functions: 2,
    preferred_package: initialPackage,
    additional_requirements: [] as string[],
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<WeddingEnquiry | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const packagesList: PackageTier[] = ['THE SPARK', 'THE MAGIC', 'THE WOW', 'CUSTOM REQUIREMENT'];

  const addonOptions = [
    'Same-Day Reel (within 6 hours)',
    'Digital Animated Invitation Card',
    'Additional Content Creator / Day',
    'Extra Wedding Function / Day Coverage',
    '30-Day Instagram Page Management',
    'Drone Aerial Coverage',
  ];

  const handleToggleAddon = (addon: string) => {
    if (formData.additional_requirements.includes(addon)) {
      setFormData({
        ...formData,
        additional_requirements: formData.additional_requirements.filter((a) => a !== addon),
      });
    } else {
      setFormData({
        ...formData,
        additional_requirements: [...formData.additional_requirements, addon],
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Your name is required';
    if (!formData.partner_name.trim()) errs.partner_name = "Partner's name is required";
    if (!formData.whatsapp_number.trim() || formData.whatsapp_number.length < 10) {
      errs.whatsapp_number = 'A valid 10-digit WhatsApp number is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'A valid email address is required';
    }
    if (!formData.wedding_date) errs.wedding_date = 'Wedding date is required';
    if (!formData.city_venue.trim()) errs.city_venue = 'City or venue is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const addDatesArray = formData.additional_dates
        ? formData.additional_dates.split(',').map((d) => d.trim()).filter(Boolean)
        : [];

      const result = await bookingService.submitWeddingEnquiry({
        name: formData.name,
        partner_name: formData.partner_name,
        whatsapp_number: formData.whatsapp_number,
        email: formData.email,
        wedding_date: formData.wedding_date,
        additional_dates: addDatesArray,
        city_venue: formData.city_venue,
        number_of_functions: Number(formData.number_of_functions),
        preferred_package: formData.preferred_package,
        additional_requirements: formData.additional_requirements.join(', '),
        message: formData.message,
      });

      setSubmittedResult(result);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0E0E0E', '#B8D4E8', '#B692A1'],
      });
    } catch (err: any) {
      alert(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // If successfully submitted, show success state
  if (submittedResult) {
    const formattedDate = format(new Date(submittedResult.wedding_date), 'MMMM d, yyyy');
    const whatsappText = encodeURIComponent(
      `Hi WOWVERSE Team! We just submitted wedding enquiry ${submittedResult.enquiry_number} for ${submittedResult.name} & ${submittedResult.partner_name} on ${formattedDate} (${submittedResult.preferred_package} at ${submittedResult.city_venue}). Looking forward to connecting!`
    );

    return (
      <div className="bg-white/90 border border-border rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-xl backdrop-blur-xl animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 text-emerald-700">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="meta text-ink/70 font-semibold">Enquiry Received</span>
        <h3 className="display-title text-3xl md:text-4xl text-ink mt-2">
          Your Story Begins Here.
        </h3>
        <p className="text-sm text-ink/75 mt-3 max-w-md mx-auto font-sans">
          Thank you, <strong className="text-ink">{submittedResult.name} & {submittedResult.partner_name}</strong>! Your wedding enquiry has been registered in the WOWVERSE studio portal.
        </p>

        {/* Enquiry Details Card */}
        <div className="my-8 p-6 rounded-2xl bg-panel-blue/30 border border-border text-left space-y-3 font-sans">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="meta text-[10px] text-ink/70">Enquiry Reference</span>
            <span className="font-mono text-sm font-bold text-ink tracking-wider">{submittedResult.enquiry_number}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-ink/70">Primary Wedding Date</span>
            <span className="text-ink font-semibold">{formattedDate}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-ink/70">Venue / Location</span>
            <span className="text-ink font-semibold">{submittedResult.city_venue}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-ink/70">Selected Package</span>
            <span className="text-ink font-bold">{submittedResult.preferred_package}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-ink/70">Status</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[10px] uppercase">
              {submittedResult.status}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/919675960505?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Notify Team on WhatsApp Now</span>
          </a>

          <p className="text-[11px] text-ink/60 meta">
            Our creative lead will review your date requirements and confirm availability within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 border border-border rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
        <div>
          <span className="meta text-ink/70 font-semibold">Step 2: Celebration Details</span>
          <h3 className="display-title text-2xl md:text-3xl text-ink mt-1">
            Tell Us About Your Celebration
          </h3>
        </div>

        {onBackToCalendar && (
          <button
            onClick={onBackToCalendar}
            className="meta text-[10px] text-ink/70 hover:text-ink flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Change Date
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Couple Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block meta text-ink/70 mb-2 font-semibold">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Radhika Sharma"
              className={`w-full px-4 py-3 rounded-full bg-white border ${
                errors.name ? 'border-red-500' : 'border-border'
              } text-ink text-sm focus:outline-none focus:border-ink transition-colors shadow-sm`}
            />
            {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block meta text-ink/70 mb-2 font-semibold">
              Partner's Name *
            </label>
            <input
              type="text"
              required
              value={formData.partner_name}
              onChange={(e) => setFormData({ ...formData, partner_name: e.target.value })}
              placeholder="e.g. Aditya Verma"
              className={`w-full px-4 py-3 rounded-full bg-white border ${
                errors.partner_name ? 'border-red-500' : 'border-border'
              } text-ink text-sm focus:outline-none focus:border-ink transition-colors shadow-sm`}
            />
            {errors.partner_name && <p className="text-[11px] text-red-500 mt-1">{errors.partner_name}</p>}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block meta text-ink/70 mb-2 font-semibold">
              WhatsApp Number *
            </label>
            <input
              type="tel"
              required
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
              placeholder="+91 96759 60505"
              className={`w-full px-4 py-3 rounded-full bg-white border ${
                errors.whatsapp_number ? 'border-red-500' : 'border-border'
              } text-ink text-sm focus:outline-none focus:border-ink transition-colors shadow-sm`}
            />
            {errors.whatsapp_number && <p className="text-[11px] text-red-500 mt-1">{errors.whatsapp_number}</p>}
          </div>

          <div>
            <label className="block meta text-ink/70 mb-2 font-semibold">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="radhika@example.com"
              className={`w-full px-4 py-3 rounded-full bg-white border ${
                errors.email ? 'border-red-500' : 'border-border'
              } text-ink text-sm focus:outline-none focus:border-ink transition-colors shadow-sm`}
            />
            {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Date and Venue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block meta text-ink/70 mb-2 font-semibold">
              Primary Wedding Date *
            </label>
            <input
              type="date"
              required
              value={formData.wedding_date}
              onChange={(e) => setFormData({ ...formData, wedding_date: e.target.value })}
              className={`w-full px-4 py-3 rounded-full bg-white border ${
                errors.wedding_date ? 'border-red-500' : 'border-border'
              } text-ink text-sm focus:outline-none focus:border-ink shadow-sm`}
            />
            {errors.wedding_date && <p className="text-[11px] text-red-500 mt-1">{errors.wedding_date}</p>}
          </div>

          <div>
            <label className="block meta text-ink/70 mb-2 font-semibold">
              City / Venue *
            </label>
            <input
              type="text"
              required
              value={formData.city_venue}
              onChange={(e) => setFormData({ ...formData, city_venue: e.target.value })}
              placeholder="e.g. Vrindavan / Udaipur"
              className={`w-full px-4 py-3 rounded-full bg-white border ${
                errors.city_venue ? 'border-red-500' : 'border-border'
              } text-ink text-sm focus:outline-none focus:border-ink shadow-sm`}
            />
            {errors.city_venue && <p className="text-[11px] text-red-500 mt-1">{errors.city_venue}</p>}
          </div>

          <div>
            <label className="block meta text-ink/70 mb-2 font-semibold">
              Number of Functions
            </label>
            <select
              value={formData.number_of_functions}
              onChange={(e) => setFormData({ ...formData, number_of_functions: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-full bg-white border border-border text-ink text-sm focus:outline-none focus:border-ink shadow-sm"
            >
              <option value={1}>1 Function (Single Event)</option>
              <option value={2}>2 Functions (e.g. Sangeet + Wedding)</option>
              <option value={3}>3 Functions (e.g. Haldi + Sangeet + Wedding)</option>
              <option value={4}>4 Functions (Full 3-Day Wedding)</option>
              <option value={5}>5+ Functions (Grand Celebration)</option>
            </select>
          </div>
        </div>

        {/* Preferred Package Selection */}
        <div>
          <label className="block meta text-ink/70 mb-3 font-semibold">
            Preferred Package Collection *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {packagesList.map((pkg) => {
              const isSelected = formData.preferred_package === pkg;
              return (
                <div
                  key={pkg}
                  onClick={() => setFormData({ ...formData, preferred_package: pkg })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-panel-blue text-ink border-ink font-semibold shadow-md'
                      : 'bg-white border-border text-ink/80 hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs">{pkg}</span>
                    {isSelected && <Check className="w-4 h-4 text-ink" />}
                  </div>
                  <span className="text-[11px] text-ink/60 font-sans block">
                    {pkg === 'THE SPARK' && '₹14,999 · 1 Creator'}
                    {pkg === 'THE MAGIC' && '₹29,999 · 2 Days'}
                    {pkg === 'THE WOW' && '₹54,999 · 2 Creators'}
                    {pkg === 'CUSTOM REQUIREMENT' && 'Tailored quotation'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add-on Services Checklist */}
        <div>
          <label className="block meta text-ink/70 mb-3 font-semibold">
            Interested In Add-On Services (Optional)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {addonOptions.map((addon) => {
              const isChecked = formData.additional_requirements.includes(addon);
              return (
                <div
                  key={addon}
                  onClick={() => handleToggleAddon(addon)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-ink/5 border-ink text-ink font-medium'
                      : 'bg-white border-border text-ink/75 hover:bg-[#faf9f7]'
                  }`}
                >
                  <span>{addon}</span>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isChecked ? 'bg-ink border-ink text-bone' : 'border-border'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Special Message */}
        <div>
          <label className="block meta text-ink/70 mb-2 font-semibold">
            Wedding Vision / Message
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about the vibe, decor aesthetic, family expectations, or special requests..."
            className="w-full px-4 py-3 rounded-2xl bg-white border border-border text-xs text-ink focus:outline-none focus:border-ink resize-none shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <p className="meta text-[9px] text-ink/60">
            *No payment required today. Submitting reserves your date enquiry window.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="pill bg-ink text-bone hover:bg-black font-sans text-xs tracking-wider uppercase px-8 py-3.5 inline-flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            {submitting ? (
              <span>Locking Dates...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Wedding Enquiry</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
