import React, { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isBefore,
  startOfToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Check, AlertCircle, Lock, Sparkles, Plus, Trash2 } from 'lucide-react';
import { AvailabilityStatus } from '../../types';
import { bookingService } from '../../services/bookingService';

interface DateAvailabilityCalendarProps {
  selectedPrimaryDate: string | null;
  onSelectPrimaryDate: (dateStr: string) => void;
  additionalDates: string[];
  onToggleAdditionalDate: (dateStr: string) => void;
  onProceedToEnquiry?: () => void;
}

export const DateAvailabilityCalendar: React.FC<DateAvailabilityCalendarProps> = ({
  selectedPrimaryDate,
  onSelectPrimaryDate,
  additionalDates,
  onToggleAdditionalDate,
  onProceedToEnquiry
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, { status: AvailabilityStatus; notes?: string }>>({});
  const [loading, setLoading] = useState(true);

  const today = startOfToday();

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getWeddingAvailability();
      setAvailabilityMap(data);
    } catch (err) {
      console.error('Failed to load wedding calendar availability', err);
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let days = [];
  let day = startDate;

  // Helper to determine status for a date
  const getDateStatus = (dateStr: string): AvailabilityStatus => {
    const item = availabilityMap[dateStr];
    if (item) return item.status;
    return 'AVAILABLE'; // default status unless admin specified otherwise
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const currentDay = day;
      const dateStr = format(currentDay, 'yyyy-MM-dd');
      const isPast = isBefore(currentDay, today);
      const isPrimary = selectedPrimaryDate === dateStr;
      const isAdditional = additionalDates.includes(dateStr);
      const isCurrentMonth = isSameMonth(currentDay, monthStart);
      const status = isPast ? 'UNAVAILABLE' : getDateStatus(dateStr);
      const note = availabilityMap[dateStr]?.notes;

      // Status indicator colors
      const getStatusPill = () => {
        if (isPast) return 'bg-zinc-200 text-zinc-500';
        switch (status) {
          case 'AVAILABLE':
            return 'bg-emerald-100 text-emerald-800';
          case 'LIMITED':
            return 'bg-amber-100 text-amber-800';
          case 'PENDING':
            return 'bg-blue-100 text-blue-800';
          case 'BOOKED':
            return 'bg-red-100 text-red-800';
          case 'UNAVAILABLE':
            return 'bg-zinc-200 text-zinc-500';
          default:
            return 'bg-emerald-100 text-emerald-800';
        }
      };

      const isSelectable = !isPast && status !== 'BOOKED' && status !== 'UNAVAILABLE';

      days.push(
        <div
          key={dateStr}
          onClick={() => {
            if (!isSelectable) return;
            if (!selectedPrimaryDate) {
              onSelectPrimaryDate(dateStr);
            } else if (selectedPrimaryDate === dateStr) {
              // Deselect if clicked again
              onSelectPrimaryDate('');
            } else {
              // Toggle additional function date
              onToggleAdditionalDate(dateStr);
            }
          }}
          className={`relative group min-h-[76px] md:min-h-[88px] p-2 rounded-xl transition-all duration-200 border flex flex-col justify-between ${
            !isCurrentMonth
              ? 'opacity-30 border-transparent'
              : isPrimary
              ? 'bg-panel-blue/40 border-ink shadow-md ring-1 ring-ink'
              : isAdditional
              ? 'bg-panel-rose/30 border-panel-rose ring-1 ring-panel-rose'
              : isSelectable
              ? 'bg-white border-border hover:border-ink/30 hover:bg-[#fcfbf9] cursor-pointer shadow-sm'
              : 'bg-[#eee] border-transparent opacity-40 cursor-not-allowed'
          }`}
        >
          {/* Day number & selection badge */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs md:text-sm font-semibold font-sans ${
                isPrimary
                  ? 'text-ink font-bold scale-110'
                  : isAdditional
                  ? 'text-ink font-bold'
                  : isSameDay(currentDay, today)
                  ? 'text-ink underline decoration-ink decoration-2'
                  : 'text-ink'
              }`}
            >
              {format(currentDay, 'd')}
            </span>

            {isPrimary && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-ink text-bone">
                Main
              </span>
            )}
            {isAdditional && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-panel-rose text-ink">
                +Day
              </span>
            )}
          </div>

          {/* Status Label */}
          <div className="mt-1">
            <span
              className={`inline-block text-[9px] md:text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded transition-colors ${getStatusPill()}`}
            >
              {isPast ? 'PAST' : status}
            </span>
          </div>

          {note && (
            <div className="hidden md:block truncate text-[9px] text-ink/60 mt-0.5" title={note}>
              {note}
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1.5 md:gap-2">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="bg-white/80 border border-border rounded-3xl p-6 md:p-8 shadow-sm">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span className="meta text-[10px] text-ink font-semibold">Live Availability</span>
          </div>
          <h3 className="display-title text-2xl md:text-3xl text-ink mt-1">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2.5 rounded-full bg-white border border-border hover:border-ink text-ink transition-colors"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3.5 py-1.5 rounded-full bg-white border border-border hover:border-ink text-xs uppercase tracking-wider text-ink transition-colors font-medium"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2.5 rounded-full bg-white border border-border hover:border-ink text-ink transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1.5 md:gap-2 text-center py-4">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
          <div key={d} className="meta text-[11px] font-semibold text-ink/70">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days Matrix */}
      <div className="space-y-1.5 md:space-y-2">{rows}</div>

      {/* Availability Status Legend */}
      <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-ink/80 font-medium">AVAILABLE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-ink/80 font-medium">LIMITED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-ink/80 font-medium">PENDING</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-ink/80 font-medium">BOOKED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
            <span className="text-ink/60 font-medium">UNAVAILABLE</span>
          </div>
        </div>

        <p className="meta text-[10px] text-ink/60">
          *Click date once for Primary Date; click other dates to add Sangeet / Mehendi functions.
        </p>
      </div>

      {/* Selected Dates Summary Bar */}
      {selectedPrimaryDate && (
        <div className="mt-6 p-5 rounded-2xl bg-panel-blue text-ink flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-300 shadow-md">
          <div>
            <div className="meta text-[10px] text-ink/75 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Selected Wedding Dates
            </div>
            <p className="text-sm font-semibold mt-1">
              Primary Date: <span className="font-bold underline">{format(new Date(selectedPrimaryDate), 'EEEE, MMMM d, yyyy')}</span>
            </p>
            {additionalDates.length > 0 && (
              <p className="text-xs text-ink/80 mt-0.5 font-sans">
                Additional functions: {additionalDates.map(d => format(new Date(d), 'MMM d')).join(', ')} ({additionalDates.length} extra day{additionalDates.length > 1 ? 's' : ''})
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectPrimaryDate('')}
              className="meta text-[10px] text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-black/5 transition-colors"
            >
              Clear
            </button>
            {onProceedToEnquiry && (
              <button
                onClick={onProceedToEnquiry}
                className="pill bg-ink text-bone hover:bg-black text-xs font-sans tracking-wider uppercase shadow-md"
              >
                Proceed to Enquiry →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
