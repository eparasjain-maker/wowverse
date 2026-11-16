import { PackageDetail, AddOnService } from '../types';

export const OFFICIAL_PACKAGES: PackageDetail[] = [
  {
    id: 'the-spark',
    name: 'THE SPARK',
    tagline: 'One celebration. A thousand little WOW moments.',
    price: 14999,
    formattedPrice: '₹14,999',
    specs: {
      creators: 1,
      days: 1,
      functions: '1 Function',
      duration: 'Up to 4 Hours'
    },
    highlights: [
      '1 dedicated content creator',
      '6 professionally edited vertical Reels',
      'Candid moments and behind-the-scenes coverage',
      'Instagram Stories posted live during the event',
      "Couple's Instagram page setup and basic styling",
      'Final delivery within 7 working days'
    ],
    deliverables: [
      '1 dedicated content creator on-site',
      '6 professionally edited vertical Reels (9:16 format)',
      'Candid moments & behind-the-scenes coverage',
      'Instagram Stories posted live during the event',
      "Couple's Instagram page setup and basic styling",
      'Final delivery within 7 working days'
    ],
    turnaround: 'Within 7 working days',
    isPopular: false,
  },
  {
    id: 'the-magic',
    name: 'THE MAGIC',
    tagline: 'More celebrations. More memories. More magic.',
    price: 29999,
    formattedPrice: '₹29,999',
    specs: {
      creators: 1,
      days: '2 Days',
      functions: 'Up to 3 Functions',
    },
    highlights: [
      '1 dedicated content creator',
      '12 professionally edited vertical Reels',
      'Couple, family and guest moments',
      'Real-time Instagram Stories throughout coverage',
      "Couple's Instagram page setup and styling",
      '1 same-day Instagram Reel',
      'Final delivery within 7 working days'
    ],
    deliverables: [
      '1 dedicated content creator',
      '12 professionally edited vertical Reels (cinematic grade)',
      'Couple, family and guest emotional moments',
      'Real-time Instagram Stories throughout coverage',
      "Couple's Instagram page setup and styling",
      '1 same-day Instagram Reel ready for immediate posting',
      'Final delivery within 7 working days'
    ],
    turnaround: '1 same-day Reel + Full delivery in 7 working days',
    isPopular: true,
  },
  {
    id: 'the-wow',
    name: 'THE WOW',
    tagline: 'Every moment. Every emotion. The complete story.',
    price: 54999,
    formattedPrice: '₹54,999',
    specs: {
      creators: 2,
      days: '3 Days',
      functions: 'Up to 4 Functions',
    },
    highlights: [
      '2 dedicated content creators',
      '20 professionally edited vertical Reels',
      'Complete wedding storytelling & BTS coverage',
      'Bride & groom focused content + family interactions',
      'Real-time Instagram Stories across all functions',
      "Couple's Instagram page handling & event-period management",
      '6 customised wedding creatives (countdowns, graphics)',
      '1 same-day Reel per main function (up to 3 Reels)',
      'Digital invitation or save-the-date card included',
      'Complete raw footage handover (4K)',
      'Final delivery within 7–10 working days'
    ],
    deliverables: [
      '2 dedicated content creators for dual-angle coverage',
      '20 professionally edited vertical Reels',
      'Complete wedding storytelling and behind-the-scenes coverage',
      'Bride and groom focused cinematic content',
      'Family interactions and guest moments',
      'Real-time Instagram Stories across all functions',
      "Couple's Instagram page setup, styling and event-period handling",
      '6 customised wedding creatives, including countdowns, function announcements and digital graphics',
      '1 same-day Reel per main function, up to 3 Reels',
      'Digital invitation or save-the-date card',
      'Complete raw footage handover',
      'Final delivery within 7–10 working days'
    ],
    turnaround: 'Same-day Reels + Final within 7–10 working days',
    isPopular: false,
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    name: 'Extra function / coverage day',
    price: '₹9,000',
    description: 'Add an additional function or extended day coverage to your package.'
  },
  {
    name: 'Additional content creator / day',
    price: '₹6,500',
    description: 'Secondary creator for parallel venues, groom & bride separate preparations.'
  },
  {
    name: 'Additional edited Reel',
    price: '₹2,000',
    description: 'Each extra bespoke vertical Reel edited with trending audio and color grading.'
  },
  {
    name: 'Same-day Reel within 6 hours',
    price: '₹4,500',
    description: 'Hyper-fast turnaround edit delivered within 6 hours of function conclusion.'
  },
  {
    name: 'Digital invitation / motion card',
    price: '₹5,500',
    description: 'Custom animated video invitation or save-the-date for WhatsApp & social sharing.'
  },
  {
    name: 'Instagram page management (30 days)',
    price: '₹12,000',
    description: 'Pre-wedding build-up, wedding week live publishing, highlights curation, and post-wedding recap.'
  },
  {
    name: 'Drone coverage',
    price: 'On Request',
    description: 'Cinematic aerial vertical perspectives (subject to venue permissions and local regulations).'
  }
];

export const BOOKING_TERMS = [
  'All prices exclude applicable GST (18%).',
  'A 40% advance deposit is required to confirm and lock your date on our calendar.',
  '50% is payable on the first day of coverage, and the remaining 10% upon final content delivery.',
  'Travel, food, and accommodation outside Vrindavan / Mathura are to be borne by the client.',
  'Raw footage is provided via high-speed cloud drive within 48 hours of wedding completion (included in THE WOW or available as add-on).',
  'Date modifications are subject to availability and mutual agreement with at least 30 days prior notice.'
];
