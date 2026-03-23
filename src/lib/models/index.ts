import type { ReactNode } from 'react';

/* ─── Chip ─────────────────────────────────────────────────── */
export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps {
  /** Text content */
  label: ReactNode;
  /** Visual style */
  variant?: ChipVariant;
  /** Theme color */
  color?: ChipColor;
  /** Size */
  size?: ChipSize;
  /** Leading icon */
  icon?: ReactNode;
  /** Avatar element (replaces icon) */
  avatar?: ReactNode;
  /** Delete handler — shows delete icon when provided */
  onDelete?: () => void;
  /** Custom delete icon */
  deleteIcon?: ReactNode;
  /** Makes chip clickable with hover/press effects */
  clickable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/* ─── ChipGroup ────────────────────────────────────────────── */
export interface ChipGroupProps {
  children: ReactNode;
  /** Gap between chips (theme spacing scale) */
  spacing?: number;
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Max chips before overflow — shows "+N" */
  maxVisible?: number;
  /** Template for overflow text. {count} is replaced with hidden count. Default: `+{count}` */
  expandText?: string;
  /** Text for collapse button. Default: `-` */
  collapseText?: string;
  /** Custom render for overflow indicator. Receives hiddenCount, expanded, and toggle handler */
  renderOverflow?: (props: { hiddenCount: number; expanded: boolean; onToggle: () => void }) => ReactNode;
  /** Callback when overflow chip is clicked */
  onExpand?: (expanded: boolean) => void;
  /** Additional CSS class */
  className?: string;
}
