import styled from '@emotion/styled';
import { pxToRem } from '@thanh-libs/utils';

export const ChipGroupStyled = styled.div<{
  ownerDirection: 'row' | 'column';
  ownerSpacing: number;
}>(({ ownerDirection, ownerSpacing }) => ({
  display: 'flex',
  flexDirection: ownerDirection,
  flexWrap: 'wrap' as const,
  gap: pxToRem(ownerSpacing * 8),
  alignItems: ownerDirection === 'row' ? 'center' : 'flex-start',
}));
