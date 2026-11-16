import React, { useState, useEffect } from 'react';
import { format, addDays, isSunday, startOfToday } from 'date-fns';
import { Clock, Calendar as CalendarIcon, CheckCircle2, Video, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { ConsultationBooking } from '../../types';
import { bookingService } from '../../services/bookingService';
import { Button } from '../common/Button';
import confetti from 'canvas-confetti';

export const ConsultationBookingFlow: React.FC = () => {
  const today = startOfToday();

  // Generate next 14 available consultation dates (excluding Sundays)
  const availableDates: Date[] = [];
  let d = addDays(today, 1);
  while (availableDates.length < 10) {
    if (!isSunday(d)) {
      availableDates.push(d);
    }
    d = addDays(d, 1);
  }

  const [selectedDate, setSelectedDate] = useState<string>(format(availableDates[0], 'yyyy-MM-dd'));
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState<boolean>(true);

  // Form State
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [preferredPackage, setPreferredPackage] = useState('THE MAGIC');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<ConsultationBooking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // When date changes, load slots
  useEffect(() => {
    loadSlots(selectedDate);
  }, [selectedDate]);

  const loadSlots = async (dateStr: string) => {
    setLoadingSlots(true);
    setSelectedSlot('');
    setErrorMsg('');
    try {
      const slots = await bookingService.getAvailableConsultationSlots(dateStr);
      setAvailableSlots(slots);
      if (slots.length > 0) {
        setSelectedSlot(slots[0]);
      }
    } catch (err) {
      console.error('Error fetching consultation slots', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMsg('Please select a time slot.');
      return;
    }
    if (!name.trim() || !whatsapp.trim() || !email.trim()) {
      setErrorMsg('Please fill in all required contact details.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const result = await bookingService.bookConsultation({
        date: selectedDate,
        time_slot: selectedSlot,
        name,
        whatsapp_number: whatsapp,
        email,
        preferred_package: preferredPackage,
        notes,
      });

      setBookingResult(result);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF4D00', '#F5F3EC', '#00E5FF'],
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not complete consultation reservation. Please choose another slot.');
    } finally {
      setSubmitting(false);
    }
  };

  if (bookingResult) {
    const formattedDate = format(new Date(bookingResult.date), 'EEEE, MMMM d, yyyy');
    const waText = encodeURIComponent(
      `Hi WOWVERSE! I have scheduled a wedding consultation call (${bookingResult.booking_number}) on ${formattedDate} at ${bookingResult.time_slot}. Looking forward to discussing ${bookingResult.preferred_package}!`
    );

    return (
      <div className="bg-surface border border-surface-border rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest text-wow font-semibold">Consultation Scheduled</span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mt-1">
          Call Request Confirmed
        </h3>
        <p className="text-xs text-ivory-muted mt-2">
          Your video consultation appointment reference is <strong className="text-wow font-mono">{bookingResult.booking_number}</strong>.
        </p>

        <div className="my-6 p-5 rounded-2xl bg-surface-light border border-surface-border text-left space-y-2.5 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-ivory-dim">Date</span>
            <span className="text-ivory font-semibold">{formattedDate}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-ivory-dim">Time Slot (IST)</span>
            <span className="text-white font-mono font-medium">{bookingResult.time_slot}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-ivory-dim">Client</span>
            <span className="text-ivory">{bookingResult.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ivory-dim">Package of Interest</span>
            <span className="text-wow font-semibold">{bookingResult.preferred_package}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 text-left mb-6 flex items-start gap-2.5">
          <Video className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            A Google Meet invitation link will be sent to <strong>{bookingResult.email}</strong> and shared on WhatsApp prior to the call.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/919675960505?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Confirmation
          </a>
          <button
            onClick={() => {
              setBookingResult(null);
              loadSlots(selectedDate);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-surface-light text-ivory text-xs uppercase tracking-wider hover:bg-surface-hover"
          >
            Book Another Time
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-surface-border rounded-3xl p-6 md:p-10 backdrop-blur-xl">
      <div className="pb-6 mb-8 border-b border-surface-border">
        <span className="text-xs uppercase tracking-widest text-wow font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> 1-on-1 Creative Direction Call
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mt-1">
          Schedule A 30-Minute Consultation
        </h3>
        <p className="text-xs text-ivory-dim mt-1.5">
          Meet with our creative lead to review your ceremony timelines, reel concepts, and package deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Date Selection */}
        <div className="lg:col-span-4 space-y-4">
          <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim">
            1. Select Consultation Date
          </label>
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {availableDates.map((dateObj) => {
              const dStr = format(dateObj, 'yyyy-MM-dd');
              const isSelected = selectedDate === dStr;
              return (
                <button
                  key={dStr}
                  type="button"
                  onClick={() => setSelectedDate(dStr)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-wow/10 border-wow text-white ring-1 ring-wow'
                      : 'bg-surface-light/40 border-surface-border text-ivory-muted hover:border-ivory/30 hover:bg-surface-light'
                  }`}
                >
                  <div>
                    <span className="text-xs font-semibold block text-ivory">
                      {format(dateObj, 'EEEE, MMM d')}
                    </span>
                    <span className="text-[10px] text-ivory-dim">30-min Video Call</span>
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-wow" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle: Time Slot Selection */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim">
              2. Available Time Slots (IST)
            </label>
            <span className="text-[11px] text-ivory-dim flex items-center gap-1">
              <Clock className="w-3 h-3 text-wow" /> Asia/Kolkata
            </span>
          </div>

          {loadingSlots ? (
            <div className="h-60 flex items-center justify-center text-xs text-ivory-dim">
              Loading available slots...
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="p-6 rounded-2xl bg-surface-light border border-surface-border text-center text-xs text-ivory-dim">
              <AlertCircle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              All consultation slots for this date are fully reserved. Please pick another date.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 max-h-[360px] overflow-y-auto pr-1">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl border text-xs font-mono text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-wow text-white border-wow font-semibold shadow-md shadow-wow/20'
                        : 'bg-surface-light/50 border-surface-border text-ivory hover:border-ivory/30 hover:bg-surface-light'
                    }`}
                  >
                    <span>{slot}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Contact & Confirmation */}
        <div className="lg:col-span-4">
          <form onSubmit={handleBook} className="space-y-4">
            <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim">
              3. Your Details
            </label>

            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name *"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
              />
            </div>

            <div>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp Number *"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address (for Meet invite) *"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
              />
            </div>

            <div>
              <select
                value={preferredPackage}
                onChange={(e) => setPreferredPackage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
              >
                <option value="THE SPARK">Interested in: THE SPARK (₹14,999)</option>
                <option value="THE MAGIC">Interested in: THE MAGIC (₹29,999)</option>
                <option value="THE WOW">Interested in: THE WOW (₹54,999)</option>
                <option value="CUSTOM REQUIREMENT">Interested in: Custom Destination Requirement</option>
              </select>
            </div>

            <div>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific questions or wedding dates? (Optional)"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                {errorMsg}
              </p>
            )}

            <Button
              variant="primary"
              size="md"
              disabled={submitting || !selectedSlot}
              className="w-full"
            >
              {submitting ? 'Confirming Appointment...' : 'Schedule Call →'}
            </Button>

            <p className="text-[10px] text-center text-ivory-dim">
              *A consultation does not mark a wedding date as booked.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
