export type AvailabilityStatus = 'AVAILABLE' | 'LIMITED' | 'PENDING' | 'BOOKED' | 'UNAVAILABLE';

export interface WeddingAvailability {
  id: string;
  date: string; // YYYY-MM-DD
  status: AvailabilityStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type PackageTier = 'THE SPARK' | 'THE MAGIC' | 'THE WOW' | 'CUSTOM REQUIREMENT';

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'DECLINED';

export interface WeddingEnquiry {
  id: string;
  enquiry_number: string;
  name: string;
  partner_name: string;
  whatsapp_number: string;
  email: string;
  wedding_date: string;
  additional_dates?: string[];
  city_venue: string;
  number_of_functions: number;
  preferred_package: PackageTier;
  additional_requirements?: string;
  message?: string;
  status: EnquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export type ConsultationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface ConsultationBooking {
  id: string;
  booking_number: string;
  date: string;
  time_slot: string;
  name: string;
  whatsapp_number: string;
  email: string;
  preferred_package: string;
  notes?: string;
  status: ConsultationStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BookingSettings {
  business_info: {
    brand_name: string;
    primary_phone: string;
    secondary_phone: string;
    primary_whatsapp: string;
    secondary_whatsapp: string;
    email: string;
    location: string;
    timezone: string;
  };
  consultation_rules: {
    slot_duration_minutes: number;
    available_days: number[]; // 0: Sun, 1: Mon, etc.
    work_start_time: string; // "11:00"
    work_end_time: string;   // "20:00"
    max_advance_days: number;
    min_notice_hours: number;
  };
}
