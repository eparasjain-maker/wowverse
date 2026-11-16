import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DateAvailabilityCalendar } from '../components/booking/DateAvailabilityCalendar';
import { WeddingEnquiryForm } from '../components/booking/WeddingEnquiryForm';
import { ConsultationBookingFlow } from '../components/booking/ConsultationBookingFlow';
import { PackageTier } from '../types';
import { Calendar, Video, FileText } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Tab State: 'calendar' | 'enquiry' | 'consultation'
  const initialTab = searchParams.get('tab') === 'consultation' ? 'consultation' : 'calendar';
  const initialPackage = (searchParams.get('package') as PackageTier) || 'THE MAGIC';

  const [activeTab, setActiveTab] = useState<'calendar' | 'enquiry' | 'consultation'>(initialTab);

  // Selected Dates State
  const [selectedPrimaryDate, setSelectedPrimaryDate] = useState<string | null>(null);
  const [additionalDates, setAdditionalDates] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleToggleAdditionalDate = (dateStr: string) => {
    if (additionalDates.includes(dateStr)) {
      setAdditionalDates(additionalDates.filter((d) => d !== dateStr));
    } else {
      setAdditionalDates([...additionalDates, dateStr]);
    }
  };

  return (
    <div className="pt-32 pb-28 bg-background text-foreground min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="max-w-3xl mb-12" data-reveal="true">
          <p className="meta text-ink/70 mb-3">
            Reservations & Availability · Vrindavan Atelier
          </p>
          <h1 className="display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink font-normal leading-none">
            Reserve your dates.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
            Check live creator availability, request a wedding date lock, or book a 1-on-1 video consultation with our creative lead.
          </p>
        </div>

        {/* Tab Switcher Styled with Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/70 border border-border mb-12 max-w-xl shadow-sm" data-reveal="true">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-3 px-4 rounded-full text-xs font-sans transition-all flex items-center justify-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-ink text-bone font-semibold shadow-md'
                : 'text-ink/70 hover:text-ink'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>1. Date Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiry')}
            className={`flex-1 py-3 px-4 rounded-full text-xs font-sans transition-all flex items-center justify-center gap-2 ${
              activeTab === 'enquiry'
                ? 'bg-ink text-bone font-semibold shadow-md'
                : 'text-ink/70 hover:text-ink'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Wedding Enquiry</span>
          </button>

          <button
            onClick={() => setActiveTab('consultation')}
            className={`flex-1 py-3 px-4 rounded-full text-xs font-sans transition-all flex items-center justify-center gap-2 ${
              activeTab === 'consultation'
                ? 'bg-ink text-bone font-semibold shadow-md'
                : 'text-ink/70 hover:text-ink'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>3. Video Call</span>
          </button>
        </div>

        {/* Tab 1: Wedding Date Availability Calendar */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <DateAvailabilityCalendar
              selectedPrimaryDate={selectedPrimaryDate}
              onSelectPrimaryDate={(dateStr) => setSelectedPrimaryDate(dateStr)}
              additionalDates={additionalDates}
              onToggleAdditionalDate={handleToggleAdditionalDate}
              onProceedToEnquiry={() => setActiveTab('enquiry')}
            />
          </div>
        )}

        {/* Tab 2: Wedding Enquiry Form */}
        {activeTab === 'enquiry' && (
          <WeddingEnquiryForm
            initialDate={selectedPrimaryDate || ''}
            initialAdditionalDates={additionalDates}
            initialPackage={initialPackage}
            onBackToCalendar={() => setActiveTab('calendar')}
          />
        )}

        {/* Tab 3: Consultation Appointment Calendar */}
        {activeTab === 'consultation' && (
          <ConsultationBookingFlow />
        )}
      </div>
    </div>
  );
};
