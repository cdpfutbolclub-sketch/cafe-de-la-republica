export const FREQUENCIES = ["Weekly", "Bi-weekly", "Monthly"] as const;
export const SIZES       = ["250g",   "500g",      "1kg"]     as const;
export const CHOICES     = ["You Pick", "Curated"]             as const;

export type Frequency = typeof FREQUENCIES[number];
export type Size      = typeof SIZES[number];
export type Choice    = typeof CHOICES[number];

export const PRICING: Record<Size, Record<Frequency, number>> = {
  "250g": { "Weekly": 14.99, "Bi-weekly": 13.99, "Monthly": 12.99 },
  "500g": { "Weekly": 27.99, "Bi-weekly": 25.99, "Monthly": 23.99 },
  "1kg":  { "Weekly": 49.99, "Bi-weekly": 45.99, "Monthly": 41.99 },
};

export function getPrice(size: Size, freq: Frequency): number {
  return PRICING[size][freq];
}
