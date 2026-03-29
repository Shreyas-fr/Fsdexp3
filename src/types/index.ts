// ─── Product & Scanning ─────────────────────────────────────
export interface ScoreBreakdown {
  packaging: number;    // 0–3
  production: number;   // 0–3
  ethics: number;       // 0–2
  lifecycle: number;    // 0–2
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  barcode?: string;
  score: number;          // 0–10
  breakdown: ScoreBreakdown;
  certifications: string[];
  description: string;
}

export interface ScanResult {
  id: string;
  product: Product;
  scannedAt: string;       // ISO date
  inputMethod: 'camera' | 'url' | 'manual';
  aiSummary: string;
  tips: string[];
}

// ─── Alternatives ───────────────────────────────────────────
export type Retailer = 'Target' | 'REI' | 'Whole Foods' | 'Local' | 'Amazon' | 'Thrive Market';

export interface Alternative {
  id: string;
  name: string;
  brand: string;
  score: number;
  priceRange: string;
  certifications: string[];
  retailer: Retailer;
  imageUrl: string;
  description: string;
  availableOnline: boolean;
}

// ─── Carbon Calculator ──────────────────────────────────────
export type Frequency = 'daily' | 'weekly' | 'monthly';

export interface CarbonState {
  userCount: number;
  frequency: Frequency;
  durationMonths: number;
  impactFactor: number;
  totalSaved: number;
}

export interface Equivalency {
  icon: string;
  label: string;
  value: number;
  unit: string;
}

// ─── Recycling Centers ──────────────────────────────────────
export type WasteType = 'plastic' | 'glass' | 'e-waste' | 'paper' | 'compost' | 'metal' | 'textiles';

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  acceptedTypes: WasteType[];
  rating: number;
  website?: string;
}

// ─── User & Achievements ────────────────────────────────────
export interface UserStats {
  totalScans: number;
  co2SavedKg: number;
  alternativesChosen: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  threshold: number;
  thresholdType: 'scans' | 'co2' | 'alternatives' | 'streak';
  unlockedAt?: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  joinedAt: string;
  stats: UserStats;
  achievements: Achievement[];
}

// ─── Settings ───────────────────────────────────────────────
export type Theme = 'light' | 'dark' | 'auto';

export interface Settings {
  searchRadiusKm: number;
  theme: Theme;
  language: string;
}

// ─── Weekly Progress ────────────────────────────────────────
export interface WeeklyDataPoint {
  day: string;
  scans: number;
  co2Saved: number;
}
