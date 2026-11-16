import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStorage } from './mockStorage';
import { WeddingAvailability, WeddingEnquiry, ConsultationBooking, BookingSettings, AvailabilityStatus } from '../types';

export const bookingService = {
  /**
   * Fetch availability for a specific month or list of dates
   */
  async getWeddingAvailability(): Promise<Record<string, { status: AvailabilityStatus; notes?: string }>> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('wedding_availability')
          .select('date, status, notes');

        if (!error && data) {
          const map: Record<string, { status: AvailabilityStatus; notes?: string }> = {};
          data.forEach(item => {
            map[item.date] = { status: item.status as AvailabilityStatus, notes: item.notes };
          });
          return map;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage:', err);
      }
    }

    // Fallback to local storage
    const items = mockStorage.getAvailabilities();
    const map: Record<string, { status: AvailabilityStatus; notes?: string }> = {};
    items.forEach(item => {
      map[item.date] = { status: item.status, notes: item.notes };
    });
    return map;
  },

  /**
   * Submit a new wedding enquiry
   */
  async submitWeddingEnquiry(
    enquiry: Omit<WeddingEnquiry, 'id' | 'enquiry_number' | 'created_at' | 'updated_at' | 'status'>
  ): Promise<WeddingEnquiry> {
    if (isSupabaseConfigured && supabase) {
      try {
        const randomHex = Math.floor(1000 + Math.random() * 9000);
        const enquiryNumber = `WOW-${new Date().getFullYear()}-${randomHex}`;

        const { data, error } = await supabase
          .from('wedding_enquiries')
          .insert([
            {
              enquiry_number: enquiryNumber,
              name: enquiry.name,
              partner_name: enquiry.partner_name,
              whatsapp_number: enquiry.whatsapp_number,
              email: enquiry.email,
              wedding_date: enquiry.wedding_date,
              city_venue: enquiry.city_venue,
              number_of_functions: enquiry.number_of_functions,
              preferred_package: enquiry.preferred_package,
              additional_requirements: enquiry.additional_requirements || null,
              message: enquiry.message || null,
              status: 'NEW'
            }
          ])
          .select()
          .single();

        if (!error && data) {
          // Also insert multi-date rows if present
          if (enquiry.additional_dates && enquiry.additional_dates.length > 0) {
            const dateRows = enquiry.additional_dates.map(date => ({
              enquiry_id: data.id,
              function_date: date,
              function_name: 'Additional Function'
            }));
            await supabase.from('wedding_function_dates').insert(dateRows);
          }
          return data as WeddingEnquiry;
        }
      } catch (err) {
        console.warn('Supabase enquiry insert failed, falling back to local storage:', err);
      }
    }

    return mockStorage.addEnquiry(enquiry);
  },

  /**
   * Get available consultation slots for a date
   */
  async getAvailableConsultationSlots(date: string): Promise<string[]> {
    const defaultSlots = [
      '11:00 AM - 11:30 AM',
      '11:30 AM - 12:00 PM',
      '12:30 PM - 01:00 PM',
      '02:00 PM - 02:30 PM',
      '03:00 PM - 03:30 PM',
      '04:00 PM - 04:30 PM',
      '05:00 PM - 05:30 PM',
      '06:00 PM - 06:30 PM',
      '07:00 PM - 07:30 PM'
    ];

    if (isSupabaseConfigured && supabase) {
      try {
        // Query booked slots for this date
        const { data: booked } = await supabase
          .from('consultation_bookings')
          .select('time_slot')
          .eq('date', date)
          .neq('status', 'CANCELLED');

        // Query blocked slots
        const { data: blocked } = await supabase
          .from('consultation_availability')
          .select('start_time, end_time, is_blocked')
          .eq('date', date)
          .eq('is_blocked', true);

        const bookedSlots = new Set((booked || []).map(b => b.time_slot));
        return defaultSlots.filter(slot => !bookedSlots.has(slot));
      } catch (err) {
        console.warn('Supabase consultation slots check failed:', err);
      }
    }

    // Fallback: check local storage booked + blocked
    const consultations = mockStorage.getConsultations();
    const blocked = mockStorage.getBlockedSlots(date);
    const booked = new Set(
      consultations
        .filter(c => c.date === date && c.status !== 'CANCELLED')
        .map(c => c.time_slot)
    );

    return defaultSlots.filter(slot => !booked.has(slot) && !blocked.includes(slot));
  },

  /**
   * Book a consultation appointment
   */
  async bookConsultation(
    booking: Omit<ConsultationBooking, 'id' | 'booking_number' | 'created_at' | 'updated_at' | 'status'>
  ): Promise<ConsultationBooking> {
    if (isSupabaseConfigured && supabase) {
      try {
        const randomHex = Math.floor(1000 + Math.random() * 9000);
        const bookingNumber = `WOW-CALL-${randomHex}`;

        const { data, error } = await supabase
          .from('consultation_bookings')
          .insert([
            {
              booking_number: bookingNumber,
              date: booking.date,
              time_slot: booking.time_slot,
              name: booking.name,
              whatsapp_number: booking.whatsapp_number,
              email: booking.email,
              preferred_package: booking.preferred_package,
              notes: booking.notes || null,
              status: 'PENDING'
            }
          ])
          .select()
          .single();

        if (!error && data) {
          return data as ConsultationBooking;
        }
      } catch (err) {
        console.warn('Supabase consultation booking failed, fallback to local storage:', err);
      }
    }

    return mockStorage.addConsultation(booking);
  },

  /**
   * Get Settings
   */
  async getSettings(): Promise<BookingSettings> {
    return mockStorage.getSettings();
  }
};
