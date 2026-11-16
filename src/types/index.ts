export * from './database';

export interface PackageDetail {
  id: string;
  name: string;
  tagline: string;
  price: number;
  formattedPrice: string;
  specs: {
    creators: number;
    days: number | string;
    functions: number | string;
    duration?: string;
  };
  highlights: string[];
  deliverables: string[];
  turnaround: string;
  isPopular?: boolean;
}

export interface AddOnService {
  name: string;
  price: string;
  description: string;
}

export interface WeddingStory {
  id: string;
  couple: string;
  location: string;
  category: string;
  date: string;
  tagline: string;
  posterUrl: string;
  videoUrl?: string;
  stats: {
    views?: string;
    reelsCount: number;
    hoursCoverage: number;
  };
  highlights: string[];
  quote?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Packages' | 'Booking & Dates' | 'On-Ground & BTS' | 'Delivery & Tech';
}
