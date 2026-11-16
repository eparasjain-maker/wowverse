-- WOWVERSE Schema Migration
-- Complete Schema for Wedding Content Creation, Availability, Enquiries, Consultations and Settings

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. WEDDING AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS public.wedding_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('AVAILABLE', 'LIMITED', 'PENDING', 'BOOKED', 'UNAVAILABLE')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for date queries
CREATE INDEX IF NOT EXISTS idx_wedding_availability_date ON public.wedding_availability (date);
CREATE INDEX IF NOT EXISTS idx_wedding_availability_status ON public.wedding_availability (status);

-- 3. WEDDING ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.wedding_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    partner_name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    email TEXT NOT NULL,
    wedding_date DATE NOT NULL,
    city_venue TEXT NOT NULL,
    number_of_functions INTEGER NOT NULL DEFAULT 1,
    preferred_package TEXT NOT NULL CHECK (preferred_package IN ('THE SPARK', 'THE MAGIC', 'THE WOW', 'CUSTOM REQUIREMENT')),
    additional_requirements TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'CONFIRMED', 'DECLINED')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wedding_enquiries_date ON public.wedding_enquiries (wedding_date);
CREATE INDEX IF NOT EXISTS idx_wedding_enquiries_status ON public.wedding_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_wedding_enquiries_created ON public.wedding_enquiries (created_at DESC);

-- 4. WEDDING FUNCTION DATES TABLE (For Multi-day Weddings)
CREATE TABLE IF NOT EXISTS public.wedding_function_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_id UUID NOT NULL REFERENCES public.wedding_enquiries(id) ON DELETE CASCADE,
    function_date DATE NOT NULL,
    function_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wedding_function_dates_enquiry ON public.wedding_function_dates (enquiry_id);

-- 5. CONSULTATION AVAILABILITY & TIME SLOTS
CREATE TABLE IF NOT EXISTS public.consultation_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    max_appointments INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (date, start_time)
);

CREATE INDEX IF NOT EXISTS idx_consultation_availability_date ON public.consultation_availability (date);

-- 6. CONSULTATION BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number TEXT UNIQUE NOT NULL,
    date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    email TEXT NOT NULL,
    preferred_package TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_consultation_bookings_date ON public.consultation_bookings (date);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_status ON public.consultation_bookings (status);

-- 7. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. BOOKING SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.booking_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Default Settings Seed
INSERT INTO public.booking_settings (setting_key, setting_value)
VALUES 
('business_info', '{
    "brand_name": "WOWVERSE",
    "primary_phone": "96759 60505",
    "secondary_phone": "9012099666",
    "primary_whatsapp": "+919675960505",
    "secondary_whatsapp": "+919012099666",
    "email": "contact@wowverse.in",
    "location": "A8, Rukmini Vihar, Vrindavan, Uttar Pradesh 281121, India",
    "timezone": "Asia/Kolkata"
}'::jsonb),
('consultation_rules', '{
    "slot_duration_minutes": 30,
    "available_days": [1, 2, 3, 4, 5, 6],
    "work_start_time": "11:00",
    "work_end_time": "20:00",
    "max_advance_days": 60,
    "min_notice_hours": 12
}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.wedding_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_function_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for wedding_availability
-- Public can read date availability
CREATE POLICY "Public read wedding availability"
    ON public.wedding_availability FOR SELECT
    USING (true);

-- Only admins can mutate wedding availability
CREATE POLICY "Admin manage wedding availability"
    ON public.wedding_availability FOR ALL
    USING (public.is_admin() OR auth.role() = 'service_role');

-- Policies for wedding_enquiries
-- Public can submit an enquiry
CREATE POLICY "Public insert wedding enquiries"
    ON public.wedding_enquiries FOR INSERT
    WITH CHECK (true);

-- Only admins can read or update private enquiry records
CREATE POLICY "Admin manage wedding enquiries"
    ON public.wedding_enquiries FOR ALL
    USING (public.is_admin() OR auth.role() = 'service_role');

-- Policies for wedding_function_dates
CREATE POLICY "Public insert wedding function dates"
    ON public.wedding_function_dates FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin manage wedding function dates"
    ON public.wedding_function_dates FOR ALL
    USING (public.is_admin() OR auth.role() = 'service_role');

-- Policies for consultation_availability
CREATE POLICY "Public read consultation availability"
    ON public.consultation_availability FOR SELECT
    USING (true);

CREATE POLICY "Admin manage consultation availability"
    ON public.consultation_availability FOR ALL
    USING (public.is_admin() OR auth.role() = 'service_role');

-- Policies for consultation_bookings
CREATE POLICY "Public insert consultation bookings"
    ON public.consultation_bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin manage consultation bookings"
    ON public.consultation_bookings FOR ALL
    USING (public.is_admin() OR auth.role() = 'service_role');

-- Policies for booking_settings
CREATE POLICY "Public read booking settings"
    ON public.booking_settings FOR SELECT
    USING (true);

CREATE POLICY "Admin manage booking settings"
    ON public.booking_settings FOR ALL
    USING (public.is_admin() OR auth.role() = 'service_role');

-- Sample Initial Calendar Availability (Current & Next Month)
INSERT INTO public.wedding_availability (date, status, notes)
VALUES
(CURRENT_DATE + INTERVAL '5 days', 'LIMITED', '1 slot remaining for Vrindavan/Mathura'),
(CURRENT_DATE + INTERVAL '12 days', 'BOOKED', 'Destination wedding Agra booked'),
(CURRENT_DATE + INTERVAL '18 days', 'LIMITED', 'Evening slot inquiry'),
(CURRENT_DATE + INTERVAL '24 days', 'BOOKED', 'Pre-wedding & Sangeet booked'),
(CURRENT_DATE + INTERVAL '30 days', 'UNAVAILABLE', 'Studio maintenance / festival blackout')
ON CONFLICT (date) DO NOTHING;
