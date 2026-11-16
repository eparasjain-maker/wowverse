import { WeddingAvailability, WeddingEnquiry, ConsultationBooking, BookingSettings } from '../types';
import { format, addDays } from 'date-fns';

const AVAILABILITY_STORAGE_KEY = 'wowverse_wedding_availability';
const ENQUIRIES_STORAGE_KEY = 'wowverse_wedding_enquiries';
const CONSULTATIONS_STORAGE_KEY = 'wowverse_consultation_bookings';
const BLOCKED_SLOTS_STORAGE_KEY = 'wowverse_blocked_consultation_slots';
const SETTINGS_STORAGE_KEY = 'wowverse_booking_settings';

// Generate default dates relative to current date
function getDefaultAvailabilities(): WeddingAvailability[] {
  const today = new Date();
  const list: WeddingAvailability[] = [];

  const add = (offset: number, status: WeddingAvailability['status'], notes?: string) => {
    const d = addDays(today, offset);
    const dateStr = format(d, 'yyyy-MM-dd');
    list.push({
      id: `avail-${dateStr}`,
      date: dateStr,
      status,
      notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  };

  // Populate some realistic dates
  add(3, 'LIMITED', '1 slot remaining for Vrindavan/Mathura');
  add(5, 'BOOKED', 'Confirmed destination palace wedding');
  add(8, 'PENDING', 'Enquiry pending deposit');
  add(12, 'LIMITED', 'Only 1 creator available');
  add(15, 'BOOKED', 'Vrindavan temple wedding booked');
  add(19, 'UNAVAILABLE', 'Studio maintenance / festival blackout');
  add(22, 'BOOKED', 'Agra Sangeet & Reception');
  add(26, 'LIMITED', 'Afternoon slot reserved');
  add(32, 'BOOKED', 'Royal Heritage Wedding');
  add(40, 'LIMITED', 'Inquiry under discussion');

  return list;
}

function getDefaultEnquiries(): WeddingEnquiry[] {
  const today = new Date();
  return [
    {
      id: 'enq-101',
      enquiry_number: 'WOW-2025-0891',
      name: 'Priyanka Sharma',
      partner_name: 'Aditya Verma',
      whatsapp_number: '+919876543210',
      email: 'priyanka.sharma@example.com',
      wedding_date: format(addDays(today, 18), 'yyyy-MM-dd'),
      additional_dates: [format(addDays(today, 17), 'yyyy-MM-dd')],
      city_venue: 'The Bagh, Bharatpur / Vrindavan',
      number_of_functions: 3,
      preferred_package: 'THE WOW',
      additional_requirements: 'Same-day reel needed for Sangeet night + Drone coverage',
      message: 'Looking for cinematic vertical storytelling and aesthetic live stories for our Instagram page.',
      status: 'NEW',
      admin_notes: 'Spoke briefly on WhatsApp. High intent client.',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'enq-102',
      enquiry_number: 'WOW-2025-0892',
      name: 'Karan Mehra',
      partner_name: 'Simran Kaur',
      whatsapp_number: '+919811223344',
      email: 'karan.mehra@example.com',
      wedding_date: format(addDays(today, 25), 'yyyy-MM-dd'),
      city_venue: 'Radisson Blu, Agra',
      number_of_functions: 2,
      preferred_package: 'THE MAGIC',
      additional_requirements: 'Need 1 creator focused specifically on bridal candid BTS',
      message: 'Loved your Monument-style reel edits on Instagram.',
      status: 'CONTACTED',
      admin_notes: 'Sent quote and package breakdown via WhatsApp.',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: 'enq-103',
      enquiry_number: 'WOW-2025-0890',
      name: 'Riddhi Agarwal',
      partner_name: 'Tanmay Gupta',
      whatsapp_number: '+919712345678',
      email: 'riddhi.agarwal@example.com',
      wedding_date: format(addDays(today, 5), 'yyyy-MM-dd'),
      city_venue: 'Brij Bhumi Heritage, Vrindavan',
      number_of_functions: 4,
      preferred_package: 'THE WOW',
      additional_requirements: 'Dual creators for 3 days',
      message: 'Confirmed with deposit.',
      status: 'CONFIRMED',
      admin_notes: 'Advance 40% received via UPI. Date locked on calendar.',
      created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ];
}

function getDefaultConsultations(): ConsultationBooking[] {
  const today = new Date();
  return [
    {
      id: 'cons-201',
      booking_number: 'WOW-CALL-4401',
      date: format(addDays(today, 2), 'yyyy-MM-dd'),
      time_slot: '04:00 PM - 04:30 PM',
      name: 'Vikram Singhania',
      whatsapp_number: '+919988776655',
      email: 'vikram.s@example.com',
      preferred_package: 'THE WOW',
      notes: 'Planning a 3-day destination celebration in Mathura & Vrindavan.',
      status: 'CONFIRMED',
      admin_notes: 'Google Meet link shared on WhatsApp.',
      created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 8).toISOString()
    },
    {
      id: 'cons-202',
      booking_number: 'WOW-CALL-4402',
      date: format(addDays(today, 4), 'yyyy-MM-dd'),
      time_slot: '06:30 PM - 07:00 PM',
      name: 'Ananya Deshmukh',
      whatsapp_number: '+919822334455',
      email: 'ananya.d@example.com',
      preferred_package: 'THE MAGIC',
      notes: 'Want to understand how same-day reel turnaround works.',
      status: 'PENDING',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ];
}

export const defaultSettings: BookingSettings = {
  business_info: {
    brand_name: 'WOWVERSE',
    primary_phone: '96759 60505',
    secondary_phone: '9012099666',
    primary_whatsapp: '+919675960505',
    secondary_whatsapp: '+919012099666',
    email: 'contact@wowverse.in',
    location: 'A8, Rukmini Vihar, Vrindavan, Uttar Pradesh 281121, India',
    timezone: 'Asia/Kolkata (IST)'
  },
  consultation_rules: {
    slot_duration_minutes: 30,
    available_days: [1, 2, 3, 4, 5, 6], // Mon - Sat
    work_start_time: '11:00',
    work_end_time: '20:00',
    max_advance_days: 60,
    min_notice_hours: 12
  }
};

export const mockStorage = {
  getAvailabilities(): WeddingAvailability[] {
    const raw = localStorage.getItem(AVAILABILITY_STORAGE_KEY);
    if (!raw) {
      const defaults = getDefaultAvailabilities();
      localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return getDefaultAvailabilities();
    }
  },

  setAvailability(date: string, status: WeddingAvailability['status'], notes?: string): WeddingAvailability {
    const items = this.getAvailabilities();
    const existingIndex = items.findIndex(item => item.date === date);
    const updated: WeddingAvailability = {
      id: existingIndex >= 0 ? items[existingIndex].id : `avail-${date}`,
      date,
      status,
      notes: notes !== undefined ? notes : (existingIndex >= 0 ? items[existingIndex].notes : ''),
      created_at: existingIndex >= 0 ? items[existingIndex].created_at : new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      items[existingIndex] = updated;
    } else {
      items.push(updated);
    }
    localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(items));
    return updated;
  },

  getEnquiries(): WeddingEnquiry[] {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) {
      const defaults = getDefaultEnquiries();
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return getDefaultEnquiries();
    }
  },

  addEnquiry(enquiry: Omit<WeddingEnquiry, 'id' | 'enquiry_number' | 'created_at' | 'updated_at' | 'status'>): WeddingEnquiry {
    const items = this.getEnquiries();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newRecord: WeddingEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      enquiry_number: `WOW-${new Date().getFullYear()}-${randomHex}`,
      status: 'NEW',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    items.unshift(newRecord);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(items));
    return newRecord;
  },

  updateEnquiry(id: string, updates: Partial<WeddingEnquiry>): WeddingEnquiry | null {
    const items = this.getEnquiries();
    const idx = items.findIndex(e => e.id === id);
    if (idx === -1) return null;
    items[idx] = {
      ...items[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(items));
    return items[idx];
  },

  getConsultations(): ConsultationBooking[] {
    const raw = localStorage.getItem(CONSULTATIONS_STORAGE_KEY);
    if (!raw) {
      const defaults = getDefaultConsultations();
      localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return getDefaultConsultations();
    }
  },

  addConsultation(booking: Omit<ConsultationBooking, 'id' | 'booking_number' | 'created_at' | 'updated_at' | 'status'>): ConsultationBooking {
    const items = this.getConsultations();
    
    // Check if slot already booked for that date
    const isConflict = items.some(c => 
      c.date === booking.date && 
      c.time_slot === booking.time_slot && 
      c.status !== 'CANCELLED'
    );
    if (isConflict) {
      throw new Error('This consultation time slot has already been reserved. Please select another slot.');
    }

    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newBooking: ConsultationBooking = {
      ...booking,
      id: `cons-${Date.now()}`,
      booking_number: `WOW-CALL-${randomHex}`,
      status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    items.unshift(newBooking);
    localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(items));
    return newBooking;
  },

  updateConsultation(id: string, updates: Partial<ConsultationBooking>): ConsultationBooking | null {
    const items = this.getConsultations();
    const idx = items.findIndex(c => c.id === id);
    if (idx === -1) return null;
    items[idx] = {
      ...items[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(items));
    return items[idx];
  },

  getBlockedSlots(date: string): string[] {
    const raw = localStorage.getItem(BLOCKED_SLOTS_STORAGE_KEY);
    if (!raw) return [];
    try {
      const map: Record<string, string[]> = JSON.parse(raw);
      return map[date] || [];
    } catch {
      return [];
    }
  },

  toggleSlotBlock(date: string, timeSlot: string, isBlocked: boolean): void {
    const raw = localStorage.getItem(BLOCKED_SLOTS_STORAGE_KEY);
    let map: Record<string, string[]> = {};
    if (raw) {
      try { map = JSON.parse(raw); } catch { map = {}; }
    }
    const current = new Set(map[date] || []);
    if (isBlocked) {
      current.add(timeSlot);
    } else {
      current.delete(timeSlot);
    }
    map[date] = Array.from(current);
    localStorage.setItem(BLOCKED_SLOTS_STORAGE_KEY, JSON.stringify(map));
  },

  getSettings(): BookingSettings {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return defaultSettings;
    }
  },

  updateSettings(settings: Partial<BookingSettings>): BookingSettings {
    const current = this.getSettings();
    const merged = { ...current, ...settings };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }
};
