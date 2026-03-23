import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from '../Chip';
import type { ChipVariant, ChipColor, ChipSize } from '../models';

// ─── Simple SVG Icons for stories ────────────────────────

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const FaceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
);

// ─── Row helper ──────────────────────────────────────────

const Row = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <div style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>}
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
  </div>
);

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => (
  <div style={{ padding: 32 }}>
    <Chip label="Basic Chip" />
  </div>
);

// ─── Variants ────────────────────────────────────────────

const VariantsStory = () => (
  <div style={{ padding: 32 }}>
    {(['filled', 'outlined'] as ChipVariant[]).map((v) => (
      <Row key={v} label={v}>
        <Chip variant={v} label="Default" />
        <Chip variant={v} color="primary" label="Primary" />
        <Chip variant={v} color="secondary" label="Secondary" />
        <Chip variant={v} color="error" label="Error" />
      </Row>
    ))}
  </div>
);

// ─── Colors ──────────────────────────────────────────────

const ColorsStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="filled">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as ChipColor[]).map((c) => (
        <Chip key={c} color={c} label={c} />
      ))}
    </Row>
    <Row label="outlined">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as ChipColor[]).map((c) => (
        <Chip key={c} variant="outlined" color={c} label={c} />
      ))}
    </Row>
  </div>
);

// ─── Sizes ───────────────────────────────────────────────

const SizesStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="filled">
      {(['sm', 'md', 'lg'] as ChipSize[]).map((s) => (
        <Chip key={s} size={s} label={`Size ${s}`} />
      ))}
    </Row>
    <Row label="outlined">
      {(['sm', 'md', 'lg'] as ChipSize[]).map((s) => (
        <Chip key={s} variant="outlined" size={s} label={`Size ${s}`} />
      ))}
    </Row>
  </div>
);

// ─── Icons & Avatars ─────────────────────────────────────

const IconsStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="with icon">
      <Chip icon={<StarIcon />} label="Favorite" color="warning" />
      <Chip icon={<CheckIcon />} label="Done" color="success" />
      <Chip icon={<FaceIcon />} label="Mood" color="info" variant="outlined" />
    </Row>
    <Row label="with avatar">
      <Chip
        avatar={
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="User"
            style={{ borderRadius: '50%' }}
          />
        }
        label="John Doe"
      />
      <Chip
        avatar={
          <img
            src="https://i.pravatar.cc/40?img=2"
            alt="User"
            style={{ borderRadius: '50%' }}
          />
        }
        label="Jane Smith"
        variant="outlined"
      />
    </Row>
  </div>
);

// ─── Deletable ───────────────────────────────────────────

const DeletableStory = () => {
  const [chips, setChips] = useState(['React', 'Vue', 'Angular', 'Svelte', 'Solid']);
  const [outlinedChips, setOutlinedChips] = useState(['Tag 1', 'Tag 2', 'Tag 3']);

  return (
    <div style={{ padding: 32 }}>
      <Row label="deletable chips">
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            color="primary"
            onDelete={() => setChips((prev) => prev.filter((c) => c !== chip))}
          />
        ))}
      </Row>
      <Row label="outlined deletable">
        {outlinedChips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            variant="outlined"
            color="secondary"
            onDelete={() => setOutlinedChips((prev) => prev.filter((c) => c !== chip))}
          />
        ))}
      </Row>
      {(chips.length === 0 || outlinedChips.length === 0) && (
        <button
          onClick={() => {
            setChips(['React', 'Vue', 'Angular', 'Svelte', 'Solid']);
            setOutlinedChips(['Tag 1', 'Tag 2', 'Tag 3']);
          }}
          style={{ marginTop: 8 }}
        >
          Reset
        </button>
      )}
    </div>
  );
};

// ─── Clickable ───────────────────────────────────────────

const ClickableStory = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const tags = ['Frontend', 'Backend', 'DevOps', 'Design', 'QA'];

  return (
    <div style={{ padding: 32 }}>
      <Row label="click to select">
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant={selected === tag ? 'filled' : 'outlined'}
            color={selected === tag ? 'primary' : 'default'}
            clickable
            onClick={() => setSelected(selected === tag ? null : tag)}
          />
        ))}
      </Row>
      {selected && <div style={{ marginTop: 8, fontSize: 14, color: '#666' }}>Selected: {selected}</div>}
    </div>
  );
};

// ─── Disabled ────────────────────────────────────────────

const DisabledStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="disabled">
      <Chip label="Filled" disabled />
      <Chip label="Outlined" variant="outlined" disabled />
      <Chip label="Clickable" clickable disabled />
      <Chip label="Deletable" onDelete={() => console.log('delete')} disabled />
      <Chip label="With icon" icon={<StarIcon />} disabled />
    </Row>
  </div>
);

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  variant: ChipVariant;
  color: ChipColor;
  size: ChipSize;
  clickable: boolean;
  disabled: boolean;
  deletable: boolean;
  withIcon: boolean;
  label: string;
}) => (
  <div style={{ padding: 32 }}>
    <Chip
      variant={args.variant}
      color={args.color}
      size={args.size}
      clickable={args.clickable}
      disabled={args.disabled}
      onDelete={args.deletable ? () => console.log('Delete clicked') : undefined}
      icon={args.withIcon ? <StarIcon /> : undefined}
      label={args.label}
    />
  </div>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Chip/Chip',
};

export default meta;

export const Basic: StoryObj = { name: 'Basic', render: () => <BasicStory /> };
export const Variants: StoryObj = { name: 'Variants', render: () => <VariantsStory /> };
export const Colors: StoryObj = { name: 'Colors', render: () => <ColorsStory /> };
export const Sizes: StoryObj = { name: 'Sizes', render: () => <SizesStory /> };
export const Icons: StoryObj = { name: 'Icons & Avatars', render: () => <IconsStory /> };
export const Deletable: StoryObj = { name: 'Deletable', render: () => <DeletableStory /> };
export const Clickable: StoryObj = { name: 'Clickable', render: () => <ClickableStory /> };
export const Disabled: StoryObj = { name: 'Disabled', render: () => <DisabledStory /> };

export const Playground: StoryObj = {
  name: 'Playground',
  argTypes: {
    variant: { control: { type: 'select' }, options: ['filled', 'outlined'] },
    color: { control: { type: 'select' }, options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    clickable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    deletable: { control: 'boolean' },
    withIcon: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    variant: 'filled',
    color: 'default',
    size: 'md',
    clickable: false,
    disabled: false,
    deletable: false,
    withIcon: false,
    label: 'Chip',
  },
  render: (args: any) => <PlaygroundStory {...args} />,
};
