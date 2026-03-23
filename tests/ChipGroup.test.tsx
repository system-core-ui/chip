import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from '../src/lib/Chip';
import { ChipGroup } from '../src/lib/ChipGroup';

describe('ChipGroup', () => {
  it('renders all children', () => {
    render(
      <ChipGroup>
        <Chip label="A" />
        <Chip label="B" />
        <Chip label="C" />
      </ChipGroup>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('has role="group"', () => {
    render(
      <ChipGroup>
        <Chip label="A" />
      </ChipGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('shows overflow chip when maxVisible is set', () => {
    render(
      <ChipGroup maxVisible={2}>
        <Chip label="A" />
        <Chip label="B" />
        <Chip label="C" />
        <Chip label="D" />
      </ChipGroup>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();
    expect(screen.queryByText('D')).not.toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('expands to show all chips when overflow chip is clicked', () => {
    render(
      <ChipGroup maxVisible={1}>
        <Chip label="First" />
        <Chip label="Second" />
        <Chip label="Third" />
      </ChipGroup>,
    );
    expect(screen.queryByText('Second')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('+2'));

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('collapses back when "Show less" is clicked', () => {
    render(
      <ChipGroup maxVisible={1}>
        <Chip label="A" />
        <Chip label="B" />
      </ChipGroup>,
    );
    fireEvent.click(screen.getByText('+1'));
    fireEvent.click(screen.getByText('-'));
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });

  it('calls onExpand callback', () => {
    const onExpand = vi.fn();
    render(
      <ChipGroup maxVisible={1} onExpand={onExpand}>
        <Chip label="A" />
        <Chip label="B" />
      </ChipGroup>,
    );
    fireEvent.click(screen.getByText('+1'));
    expect(onExpand).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('-'));
    expect(onExpand).toHaveBeenCalledWith(false);
  });

  it('renders all children when maxVisible is not set', () => {
    render(
      <ChipGroup>
        <Chip label="A" />
        <Chip label="B" />
        <Chip label="C" />
      </ChipGroup>,
    );
    expect(screen.queryByText(/more/i)).not.toBeInTheDocument();
  });
});
