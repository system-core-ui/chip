import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import type { ThemeSchema } from '@thanh-libs/theme';
import { pxToRem, alpha } from '@thanh-libs/utils';
import type { ChipColor, ChipSize, ChipVariant } from '../models';
import { CHIP_SIZE_MAP } from '../constants';

/* ─── Helpers ──────────────────────────────────────────────── */

/** Parse hex color to relative luminance (0 = black, 1 = white) */
const getLuminance = (hex: string): number => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

/** Auto-detect contrast text: white for dark backgrounds, dark for light */
const getContrastText = (bgColor: string): string => {
  try {
    return getLuminance(bgColor) < 0.5 ? '#fff' : '#212121';
  } catch {
    return '#212121';
  }
};

const getColorPalette = (theme: ThemeSchema, color: ChipColor) => {
  const palette = (theme as ThemeSchema)?.palette;

  // Default: use mid-gray that's visible on white backgrounds
  if (color === 'default') {
    return {
      main: palette?.disabled?.dark ?? '#8c8c8c',
      light: palette?.background?.default ?? '#fafafa',
      contrastText: palette?.text?.primary ?? '#424242',
    };
  }

  // Semantic colors: theme uses light/pastel values for main, use dark for vivid colors
  const semanticMap: Record<string, { fallbackMain: string; fallbackLight: string }> = {
    error:   { fallbackMain: '#f44336', fallbackLight: '#ffebee' },
    success: { fallbackMain: '#52c41a', fallbackLight: '#f6ffed' },
    warning: { fallbackMain: '#faad14', fallbackLight: '#fffbe6' },
  };

  if (color in semanticMap) {
    const semantic = semanticMap[color];
    const colorPalette = palette?.[color as keyof typeof palette] as
      | { main: string; dark?: string; light?: string }
      | undefined;
    const main = colorPalette?.dark ?? semantic.fallbackMain;
    return {
      main,
      light: colorPalette?.light ?? semantic.fallbackLight,
      contrastText: getContrastText(main),
    };
  }

  // Standard colors (primary, secondary, info, etc.)
  const colorPalette = palette?.[color as keyof typeof palette] as
    | { main: string; light?: string; contrastText?: string }
    | undefined;
  const main = colorPalette?.main ?? '#9e9e9e';
  return {
    main,
    light: colorPalette?.light ?? '#f5f5f5',
    contrastText: colorPalette?.contrastText ?? getContrastText(main),
  };
};

/* ─── Chip Root ────────────────────────────────────────────── */
export const ChipStyled = styled.span<{
  ownerVariant: ChipVariant;
  ownerColor: ChipColor;
  ownerSize: ChipSize;
  ownerClickable: boolean;
  ownerDisabled: boolean;
}>(({ ownerVariant, ownerColor, ownerSize, ownerClickable, ownerDisabled }) => {
  const theme = useTheme() as ThemeSchema;
  const colorPalette = getColorPalette(theme, ownerColor);
  const sizeConfig = CHIP_SIZE_MAP[ownerSize];

  const isFilled = ownerVariant === 'filled';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToRem(sizeConfig.height),
    padding: sizeConfig.padding,
    borderRadius: pxToRem(sizeConfig.height / 2),
    fontSize: pxToRem(sizeConfig.fontSize),
    fontFamily: theme.typography?.fontFamily ?? 'inherit',
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: 'nowrap' as const,
    boxSizing: 'border-box' as const,
    transition: 'background-color 0.2s, box-shadow 0.2s, opacity 0.2s',
    maxWidth: '100%',
    verticalAlign: 'middle',

    // Color
    backgroundColor: isFilled ? colorPalette.main : 'transparent',
    color: isFilled ? colorPalette.contrastText : colorPalette.main,
    border: isFilled ? 'none' : `1px solid ${alpha(colorPalette.main, 0.5)}`,

    // Clickable
    ...(ownerClickable && !ownerDisabled && {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: isFilled
          ? alpha(colorPalette.main, 0.85)
          : alpha(colorPalette.main, 0.08),
      },
      '&:active': {
        backgroundColor: isFilled
          ? alpha(colorPalette.main, 0.7)
          : alpha(colorPalette.main, 0.16),
      },
      '&:focus-visible': {
        outline: `2px solid ${colorPalette.main}`,
        outlineOffset: '2px',
      },
    }),

    // Disabled
    ...(ownerDisabled && {
      opacity: 0.5,
      pointerEvents: 'none' as const,
    }),
  };
});

/* ─── Label ────────────────────────────────────────────────── */
export const ChipLabelStyled = styled.span({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as const,
  paddingLeft: pxToRem(4),
  paddingRight: pxToRem(4),
});

/* ─── Icon / Avatar ────────────────────────────────────────── */
export const ChipIconStyled = styled.span<{ ownerSize: ChipSize }>(({ ownerSize }) => {
  const sizeConfig = CHIP_SIZE_MAP[ownerSize];
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: pxToRem(-4),
    marginRight: pxToRem(2),
    fontSize: pxToRem(sizeConfig.iconSize),
    '& > svg': {
      width: pxToRem(sizeConfig.iconSize),
      height: pxToRem(sizeConfig.iconSize),
    },
    '& > img': {
      width: pxToRem(sizeConfig.iconSize + 4),
      height: pxToRem(sizeConfig.iconSize + 4),
      borderRadius: '50%',
    },
  };
});

/* ─── Delete Button ────────────────────────────────────────── */
export const ChipDeleteStyled = styled.span<{
  ownerSize: ChipSize;
  ownerColor: ChipColor;
  ownerVariant: ChipVariant;
}>(({ ownerSize, ownerColor, ownerVariant }) => {
  const theme = useTheme() as ThemeSchema;
  const colorPalette = getColorPalette(theme, ownerColor);
  const sizeConfig = CHIP_SIZE_MAP[ownerSize];
  const isFilled = ownerVariant === 'filled';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: pxToRem(-4),
    marginLeft: pxToRem(2),
    cursor: 'pointer',
    fontSize: pxToRem(sizeConfig.iconSize),
    color: isFilled
      ? alpha(colorPalette.contrastText, 0.7)
      : alpha(colorPalette.main, 0.7),
    borderRadius: '50%',
    transition: 'color 0.2s, background-color 0.2s',
    padding: pxToRem(2),
    '&:hover': {
      color: isFilled ? colorPalette.contrastText : colorPalette.main,
      backgroundColor: alpha(isFilled ? colorPalette.contrastText : colorPalette.main, 0.15),
    },
    '&:focus-visible': {
      outline: `2px solid ${colorPalette.main}`,
      outlineOffset: '1px',
    },
    '& > svg': {
      width: pxToRem(sizeConfig.iconSize - 2),
      height: pxToRem(sizeConfig.iconSize - 2),
    },
  };
});
