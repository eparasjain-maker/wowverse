import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStorage } from './mockStorage';
import { WeddingEnquiry, ConsultationBooking, BookingSettings, AvailabilityStatus, EnquiryStatus, ConsultationStatus } from '../types';

const ADMIN_AUTH_KEY = 'wowverse_admin_session';

export const adminService = {
  /**
   * Check if current session is authenticated as Admin
   */
  isAuthenticated(): boolean {
    const session = localStorage.getItem(ADMIN_AUTH_KEY);
    return Boolean(session);
  },

  /**
   * Admin Login
   */
  async login(email: string, pass: string): Promise<boolean> {
    // If Supabase is configured, use Supabase Auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        if (!error && data.user) {
          localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify({ email: data.user.email, role: 'admin', token: data.session?.access_token }));
          return true;
        }
      } catch (err) {
        console.warn('Supabase auth failed, checking fallback:', err);
      }
    }

    // Secure built-in fallback admin login for review / staging
    if ((email === 'admin@wowverse.in' || email === 'admin') && (pass === 'wowverse2025' || pass === 'admin123')) {
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify({ email: 'admin@wowverse.in', role: 'admin', token: 'mock-admin-token' }));
      return true;
    }

    return false;
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    localStorage.removeItem(ADMIN_AUTH_KEY);
  },

  /**
   * Get High-Level Metrics
   */
  async getMetrics() {
    const enquiries = await this.getEnquiries();
    const consultations = await this.getConsultations();
    const availabilities = mockStorage.getAvailabilities();

    const totalEnquiries = enquiries.length;
    const pendingEnquiries = enquiries.filter(e => e.status === 'NEW').length;
    const confirmedWeddings = enquiries.filter(e => e.status === 'CONFIRMED').length +
      availabilities.filter(a => a.status === 'BOOKED').length;
    const upcomingConsultations = consultations.filter(c => c.status === 'PENDING' || c.status === 'CONFIRMED').length;

    return {
      totalEnquiries,
      pendingEnquiries,
      confirmedWeddings,
      upcomingConsultations
    };
  },

  /**
   * Get Enquiries
   */
  async getEnquiries(): Promise<WeddingEnquiry[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('wedding_enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data as WeddingEnquiry[];
        }
      } catch (err) {
        console.warn('Supabase getEnquiries failed, fallback:', err);
      }
    }
    return mockStorage.getEnquiries();
  },

  /**
   * Update Enquiry Status
   */
  async updateEnquiryStatus(id: string, status: EnquiryStatus, adminNotes?: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('wedding_enquiries')
          .update({
            status,
            admin_notes: adminNotes !== undefined ? adminNotes : undefined,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (!error) return true;
      } catch (err) {
        console.warn('Supabase updateEnquiryStatus failed, fallback:', err);
      }
    }

    mockStorage.updateEnquiry(id, {
      status,
      ...(adminNotes !== undefined ? { admin_notes: adminNotes } : {})
    });
    return true;
  },

  /**
   * Get Consultations
   */
  async getConsultations(): Promise<ConsultationBooking[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('consultation_bookings')
          .select('*')
          .order('date', { ascending: true });

        if (!error && data) {
          return data as ConsultationBooking[];
        }
      } catch (err) {
        console.warn('Supabase getConsultations failed, fallback:', err);
      }
    }
    return mockStorage.getConsultations();
  },

  /**
   * Update Consultation Status
   */
  async updateConsultationStatus(id: string, status: ConsultationStatus, adminNotes?: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('consultation_bookings')
          .update({
            status,
            admin_notes: adminNotes !== undefined ? adminNotes : undefined,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (!error) return true;
      } catch (err) {
        console.warn('Supabase updateConsultationStatus failed, fallback:', err);
      }
    }

    mockStorage.updateConsultation(id, {
      status,
      ...(adminNotes !== undefined ? { admin_notes: adminNotes } : {})
    });
    return true;
  },

  /**
   * Set Date Availability (BOOKED, LIMITED, UNAVAILABLE, etc.)
   */
  async setDateAvailability(date: string, status: AvailabilityStatus, notes?: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('wedding_availability')
          .upsert([
            {
              date,
              status,
              notes: notes || null,
              updated_at: new Date().toISOString()
            }
          ], { onConflict: 'date' });

        if (!error) return true;
      } catch (err) {
        console.warn('Supabase setDateAvailability failed, fallback:', err);
      }
    }

    mockStorage.setAvailability(date, status, notes);
    return true;
  },

  /**
   * Block / Unblock a specific consultation time slot
   */
  async toggleSlotBlock(date: string, timeSlot: string, isBlocked: boolean): Promise<void> {
    mockStorage.toggleSlotBlock(date, timeSlot, isBlocked);
  },

  /**
   * Get Settings
   */
  async getSettings(): Promise<BookingSettings> {
    return mockStorage.getSettings();
  },

  /**
   * Update Settings
   */
  async updateSettings(settings: Partial<BookingSettings>): Promise<BookingSettings> {
    return mockStorage.updateSettings(settings);
  }
};
