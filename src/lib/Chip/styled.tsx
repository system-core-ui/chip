import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import type { ThemeSchema } from '@thanh-libs/theme';
import { pxToRem, alpha } from '@thanh-libs/utils';
import type { ChipColor, ChipSize, ChipVariant } from '../models';
import { CHIP_SIZE_MAP } from '../constants';
import { getColorPalette } from './helpers';


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
