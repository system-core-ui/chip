import { forwardRef } from 'react';

import type { ChipProps } from '../models';
import { CHIP_DEFAULTS } from '../constants';
import { ChipStyled, ChipLabelStyled, ChipIconStyled, ChipDeleteStyled } from './styled';

/** Default close/delete icon (×) */
const DefaultDeleteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

/**
 * Chip — compact element for tags, attributes, or actions.
 *
 * @example
 * ```tsx
 * <Chip label="React" color="primary" />
 * <Chip label="Deletable" onDelete={() => {}} />
 * <Chip label="Clickable" clickable onClick={() => {}} />
 * ```
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      label,
      variant = CHIP_DEFAULTS.variant,
      color = CHIP_DEFAULTS.color,
      size = CHIP_DEFAULTS.size,
      icon,
      avatar,
      onDelete,
      deleteIcon,
      clickable = false,
      onClick,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const isClickable = clickable || !!onClick;

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onDelete) {
        onDelete();
      }
    };

    const handleClick = () => {
      if (!disabled && onClick) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        onDelete?.();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    const leadingElement = avatar || icon;

    return (
      <ChipStyled
        as={isClickable ? 'button' : 'span'}
        ref={ref}
        ownerVariant={variant}
        ownerColor={color}
        ownerSize={size}
        ownerClickable={isClickable}
        ownerDisabled={disabled}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={handleKeyDown}
        role={isClickable ? undefined : 'status'}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        aria-disabled={disabled || undefined}
        className={className}
        {...rest}
      >
        {leadingElement && (
          <ChipIconStyled ownerSize={size} aria-hidden="true">
            {leadingElement}
          </ChipIconStyled>
        )}
        <ChipLabelStyled>{label}</ChipLabelStyled>
        {onDelete && (
          <ChipDeleteStyled
            ownerSize={size}
            ownerColor={color}
            ownerVariant={variant}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={`Remove ${typeof label === 'string' ? label : ''}`}
            onClick={handleDelete}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDelete(e as unknown as React.MouseEvent);
              }
            }}
          >
            {deleteIcon || <DefaultDeleteIcon />}
          </ChipDeleteStyled>
        )}
      </ChipStyled>
    );
  },
);

Chip.displayName = 'Chip';
