import type { CarbonState, Frequency } from '../types';

/**
 * Calculate overall sustainability score from sub-scores.
 * Packaging (0-3) + Production (0-3) + Ethics (0-2) + Lifecycle (0-2) = 0–10
 */
export function calculateSustainabilityScore(
  packaging: number,
  production: number,
  ethics: number,
  lifecycle: number
): number {
  return Math.min(10, Math.max(0, packaging + production + ethics + lifecycle));
}

/**
 * Convert frequency string to multiplier per month.
 */
function frequencyToMonthly(freq: Frequency): number {
  switch (freq) {
    case 'daily': return 30;
    case 'weekly': return 4.33;
    case 'monthly': return 1;
  }
}

/**
 * Carbon Saved = Users × FrequencyPerMonth × Months × ImpactFactor (kg CO₂)
 */
export function calculateCarbonSaved(state: CarbonState): number {
  const monthly = frequencyToMonthly(state.frequency);
  return +(state.userCount * monthly * state.durationMonths * state.impactFactor).toFixed(1);
}

/**
 * Format CO₂ to human-readable string.
 */
export function formatCO2(kgCo2: number): string {
  if (kgCo2 >= 1000) {
    return `${(kgCo2 / 1000).toFixed(1)} tonnes`;
  }
  return `${kgCo2.toFixed(1)} kg`;
}

/** 1 mature tree absorbs ~22 kg CO₂/year */
export function co2ToTrees(kgCo2: number): number {
  return +(kgCo2 / 22).toFixed(1);
}

/** Average car emits ~4,600 kg CO₂/year */
export function co2ToCars(kgCo2: number): number {
  return +(kgCo2 / 4600).toFixed(2);
}

/** Average pool uses ~2,500 gallons of water → ~10 kg CO₂ equivalent */
export function co2ToPools(kgCo2: number): number {
  return +(kgCo2 / 10).toFixed(1);
}

/**
 * Returns a Tailwind color class string based on score 0–10.
 */
export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-400';
  if (score >= 6) return 'text-lime-400';
  if (score >= 4) return 'text-amber-400';
  if (score >= 2) return 'text-orange-400';
  return 'text-red-400';
}

export function getScoreBg(score: number): string {
  if (score >= 8) return 'bg-emerald-500';
  if (score >= 6) return 'bg-lime-500';
  if (score >= 4) return 'bg-amber-500';
  if (score >= 2) return 'bg-orange-500';
  return 'bg-red-500';
}

export function getScoreLabel(score: number): string {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  if (score >= 2) return 'Poor';
  return 'Critical';
}

export function getScoreGradient(score: number): [string, string] {
  if (score >= 8) return ['#10b981', '#059669'];
  if (score >= 6) return ['#84cc16', '#65a30d'];
  if (score >= 4) return ['#f59e0b', '#d97706'];
  if (score >= 2) return ['#f97316', '#ea580c'];
  return ['#ef4444', '#dc2626'];
}

/**
 * Generate a unique ID.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format date string to readable date.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
