import type { ChipColor, ChipSize, ChipVariant } from '../models';

/* ─── Size Map ─────────────────────────────────────────────── */
export const CHIP_SIZE_MAP: Record<ChipSize, { height: number; fontSize: number; padding: string; iconSize: number }> = {
  sm: { height: 24, fontSize: 12, padding: '0 8px', iconSize: 14 },
  md: { height: 32, fontSize: 13, padding: '0 12px', iconSize: 18 },
  lg: { height: 40, fontSize: 14, padding: '0 16px', iconSize: 20 },
};

/* ─── Default Values ───────────────────────────────────────── */
export const CHIP_DEFAULTS = {
  variant: 'filled' as ChipVariant,
  color: 'default' as ChipColor,
  size: 'md' as ChipSize,
} as const;
