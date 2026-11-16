# WOWVERSE — Cinematic Wedding Content Creation & Availability Booking System

> *"Every Wedding Has a Story. We Capture the WOW."*
> *"A World of Extraordinary Experiences."*

WOWVERSE is an award-winning, editorial-grade digital experience and full-stack booking system designed for a premium wedding content creation and digital storytelling studio based in **Vrindavan, Uttar Pradesh, India**.

---

## 🌟 Key Highlights & Creative Direction

- **Cinematic & Editorial Aesthetic:** Inspired by Monument's immersive visual storytelling, dark charcoal canvas (`#09090B`), warm ivory typography (`#F5F3EC`), and signature WOWVERSE orange accents (`#FF4D00`).
- **Native 9:16 Video Storytelling:** Built-in vertical reel player interfaces with 4K-ready video loops, poster fallbacks, view counters, and sound controls.
- **Two-Way Connected Booking System:**
  1. **Wedding Date Availability Calendar:** Live monthly matrix displaying official availability statuses (`AVAILABLE`, `LIMITED`, `PENDING`, `BOOKED`, `UNAVAILABLE`) with multi-function date support.
  2. **Wedding Enquiry Flow:** Validated multi-field enquiry form generating reference IDs (`WOW-2025-XXXX`), confetti celebration state, and one-tap WhatsApp integration.
  3. **1-on-1 Consultation Flow:** Independent video call reservation system with IST (Asia/Kolkata) slot validation, preventing double bookings.
- **Full Studio Admin Dashboard:** Protected creative director portal with real-time metrics, date status switcher, enquiry CRM, consultation management, and studio settings.
- **Comprehensive Database Integration:** Supabase schema with Row Level Security (RLS) policies, UUIDs, foreign keys, and indexes, backed by a resilient offline-capable state fallback.

---

## 📁 Technical Architecture & Project Structure

```text
wowverse/
├── public/
│   ├── logo-icon.svg             # Vector brand icon
│   ├── robots.txt                # SEO crawler rules
│   └── sitemap.xml               # Complete XML sitemap
├── src/
│   ├── components/
│   │   ├── booking/              # Date calendar, enquiry form, consultation flow
│   │   ├── common/               # Reusable Button, Badge, Modal
│   │   ├── home/                 # Hero, Manifesto, Services, Why Wowverse, Difference, Stories, Timeline, Packages, CTA
│   │   └── layout/               # Navbar, Footer, Floating WhatsApp
│   ├── data/
│   │   ├── faqs.ts               # Categorized FAQ data
│   │   ├── packages.ts           # Official packages (The Spark, The Magic, The WOW) & Add-ons
│   │   ├── services.ts           # 8 core wedding services
│   │   └── stories.ts            # Featured wedding portfolio projects
│   ├── lib/
│   │   └── supabase.ts           # Supabase client initialization & connection check
│   ├── pages/
│   │   ├── admin/                # Admin portal & login screens
│   │   ├── AboutPage.tsx         # Brand philosophy, Vrindavan heritage
│   │   ├── BookingPage.tsx       # Live Calendar & consultation booking
│   │   ├── ContactPage.tsx       # Contact numbers, location, inquiry form
│   │   ├── FAQPage.tsx           # Searchable accordion FAQ
│   │   ├── HomePage.tsx          # Cinematic homepage
│   │   ├── PackagesPage.tsx      # Packages, deliverables matrix & terms
│   │   ├── ServicesPage.tsx      # Interactive 8-service showcase
│   │   └── StoriesPage.tsx       # Filterable vertical reels portfolio
│   ├── services/
│   │   ├── adminService.ts       # Admin mutations, metrics & settings
│   │   ├── bookingService.ts     # Public availability, enquiries & slots
│   │   └── mockStorage.ts        # Resilient local storage backend
│   ├── types/                    # TypeScript interfaces & database definitions
│   ├── App.tsx                   # Route definitions & Lenis smooth scroll
│   ├── index.css                 # Tailwind directives & typography
│   ├── main.tsx                  # React entry point
│   └── vite-env.d.ts             # Vite environment typings
├── supabase/
│   └── migrations/               # Production SQL migrations with RLS
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies & build scripts
├── tailwind.config.js            # Custom color palette & typography
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite config with optimized manual chunking
```

---

## 💎 Official Package Data (Standardized)

1. **THE SPARK — ₹14,999**
   - *1 Creator · 1 Function · Up to 4 Hours*
   - 1 dedicated content creator
   - 6 professionally edited vertical Reels
   - Candid moments and behind-the-scenes coverage
   - Instagram Stories posted live during the event
   - Couple's Instagram page setup and basic styling
   - Final delivery within 7 working days

2. **THE MAGIC — ₹29,999**
   - *1 Creator · 2 Days · Up to 3 Functions*
   - 1 dedicated content creator
   - 12 professionally edited vertical Reels
   - Couple, family and guest moments
   - Real-time Instagram Stories throughout coverage
   - Couple's Instagram page setup and styling
   - 1 same-day Instagram Reel
   - Final delivery within 7 working days

3. **THE WOW — ₹54,999**
   - *2 Creators · 3 Days · Up to 4 Functions*
   - 2 dedicated content creators
   - 20 professionally edited vertical Reels
   - Complete wedding storytelling and behind-the-scenes coverage
   - Bride and groom focused content + family interactions
   - Real-time Instagram Stories across all functions
   - Couple's Instagram page setup, styling and event-period handling
   - 6 customised wedding creatives (countdowns, graphics)
   - 1 same-day Reel per main function (up to 3 Reels)
   - Digital invitation or save-the-date card included
   - Complete raw footage handover (4K)
   - Final delivery within 7–10 working days

### Official Add-On Services:
- Extra function / coverage day: **₹9,000**
- Additional content creator / day: **₹6,500**
- Additional edited Reel: **₹2,000**
- Same-day Reel within 6 hours: **₹4,500**
- Digital invitation / motion card: **₹5,500**
- Instagram page management (30 days): **₹12,000**
- Drone coverage: **On Request**

*(All prices exclude applicable GST).*

---

## 🗄️ Database Schema & Supabase Setup

The database migration is located in `supabase/migrations/20250101000000_create_wowverse_schema.sql`.

### Tables Created:
1. `wedding_availability`: Manages date availability statuses (`AVAILABLE`, `LIMITED`, `PENDING`, `BOOKED`, `UNAVAILABLE`) and public notes.
2. `wedding_enquiries`: Stores client wedding submissions, contact info, venue, selected package, and private admin notes.
3. `wedding_function_dates`: Stores multi-day function dates linked to enquiries.
4. `consultation_availability`: Stores configured slots and blackout times.
5. `consultation_bookings`: Tracks video call appointments and IST slots.
6. `admin_users`: Manages authorized studio administrators.
7. `booking_settings`: Holds studio phone numbers, address, and consultation preferences.

### How to apply to Supabase:
1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Paste the contents of `supabase/migrations/20250101000000_create_wowverse_schema.sql` and click **Run**.
4. Retrieve your `Project URL` and `anon public` key under Project Settings > API.
5. Add them to your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

---

## 🔐 Admin Dashboard Access

- **Route:** `/admin` (Redirects to `/admin/login` if not authenticated)
- **Default Master Credentials:**
  - **Email:** `admin@wowverse.in`
  - **Password:** `wowverse2025`

### Features inside Admin Portal:
- **Overview:** View high-level metrics (Total enquiries, pending reviews, locked dates, upcoming video calls).
- **Wedding Calendar:** Click any date to switch status to `BOOKED`, `LIMITED`, or `UNAVAILABLE` and add custom notes. Changes immediately reflect on the public calendar.
- **Enquiries:** Review all incoming enquiries, filter by status, view customer phone/email, add admin notes, and confirm/lock dates.
- **Consultations:** Review video call requests, mark completed, or cancel.
- **Settings:** Update studio contact numbers, address, consultation durations, and working hours.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm.cmd install

# 2. Run local development server
npm.cmd run dev

# 3. Build for production
npm.cmd run build

# 4. Preview production build
npm.cmd run preview
```

---

## 📍 Contact & Studio Verification

- **Location:** A8, Rukmini Vihar, Vrindavan, Uttar Pradesh 281121, India
- **Primary Phone & WhatsApp:** +91 96759 60505
- **Secondary Contact:** +91 90120 99666
- **Email:** contact@wowverse.in
