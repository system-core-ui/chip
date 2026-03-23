import { forwardRef, useState, Children, useMemo } from 'react';

import type { ChipGroupProps } from '../models';
import { Chip } from '../Chip';
import { ChipGroupStyled } from './styled';

/**
 * ChipGroup — container for multiple Chips with overflow support.
 *
 * When `maxVisible` is set and children exceed it, shows first N chips
 * plus a "+N" overflow chip. Click the overflow chip to expand/collapse.
 *
 * @example
 * ```tsx
 * <ChipGroup maxVisible={3}>
 *   <Chip label="React" />
 *   <Chip label="Vue" />
 *   <Chip label="Angular" />
 *   <Chip label="Svelte" />
 *   <Chip label="Solid" />
 * </ChipGroup>
 * ```
 */
export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      children,
      spacing = 1,
      direction = 'row',
      maxVisible,
      expandText = '+{count}',
      collapseText = '-',
      renderOverflow,
      onExpand,
      className,
      ...rest
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);

    const childArray = useMemo(() => Children.toArray(children), [children]);
    const totalCount = childArray.length;
    const hasOverflow = maxVisible !== undefined && totalCount > maxVisible;

    const visibleChildren = hasOverflow && !expanded
      ? childArray.slice(0, maxVisible)
      : childArray;

    const hiddenCount = totalCount - (maxVisible ?? totalCount);

    const handleToggle = () => {
      const next = !expanded;
      setExpanded(next);
      onExpand?.(next);
    };

    const overflowLabel = expanded
      ? collapseText
      : expandText.replace('{count}', String(hiddenCount));

    return (
      <ChipGroupStyled
        ref={ref}
        ownerDirection={direction}
        ownerSpacing={spacing}
        className={className}
        role="group"
        {...rest}
      >
        {visibleChildren}
        {hasOverflow && (
          renderOverflow
            ? renderOverflow({ hiddenCount, expanded, onToggle: handleToggle })
            : (
              <Chip
                label={overflowLabel}
                variant="outlined"
                color="default"
                size="sm"
                clickable
                onClick={handleToggle}
                aria-expanded={expanded}
                aria-label={expanded ? 'Show fewer items' : `Show ${hiddenCount} more items`}
              />
            )
        )}
      </ChipGroupStyled>
    );
  },
);

ChipGroup.displayName = 'ChipGroup';
