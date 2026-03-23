import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from '../src/lib/Chip';

describe('Chip', () => {
  it('renders with label', () => {
    render(<Chip label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders as span by default (not clickable)', () => {
    const { container } = render(<Chip label="Tag" />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders as button when clickable', () => {
    render(<Chip label="Click me" clickable onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Chip label="Click" clickable onClick={onClick} />);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Chip label="Disabled" clickable onClick={onClick} disabled />);
    fireEvent.click(screen.getByText('Disabled'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows delete icon when onDelete is provided', () => {
    render(<Chip label="Deletable" onDelete={() => {}} />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('calls onDelete when delete icon is clicked', () => {
    const onDelete = vi.fn();
    render(<Chip label="Test" onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('does not call onDelete when disabled', () => {
    const onDelete = vi.fn();
    render(<Chip label="Test" onDelete={onDelete} disabled />);
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('renders icon when provided', () => {
    render(<Chip label="With icon" icon={<span data-testid="icon">★</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    render(<Chip label="With avatar" avatar={<img data-testid="avatar" src="" alt="A" />} />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Chip label="Disabled" clickable onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles keyboard Delete key for onDelete', () => {
    const onDelete = vi.fn();
    render(<Chip label="Key test" clickable onClick={() => {}} onDelete={onDelete} />);
    fireEvent.keyDown(screen.getByText('Key test'), { key: 'Delete' });
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
