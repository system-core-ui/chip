import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from '../Chip';
import { ChipGroup } from '../ChipGroup';

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
    <Row label="default group">
      <ChipGroup>
        <Chip label="React" color="primary" />
        <Chip label="Vue" color="success" />
        <Chip label="Angular" color="error" />
        <Chip label="Svelte" color="warning" />
        <Chip label="Solid" color="info" />
      </ChipGroup>
    </Row>
  </div>
);

// ─── Overflow ────────────────────────────────────────────

const OverflowStory = () => {
  const [expanded, setExpanded] = useState(false);

  const technologies = [
    'React', 'Vue', 'Angular', 'Svelte', 'Solid',
    'Next.js', 'Nuxt', 'Remix', 'Astro', 'Qwik',
  ];

  return (
    <div style={{ padding: 32 }}>
      <Row label="maxVisible={3}">
        <ChipGroup maxVisible={3}>
          {technologies.map((tech) => (
            <Chip key={tech} label={tech} color="primary" variant="outlined" />
          ))}
        </ChipGroup>
      </Row>
      <Row label="maxVisible={5}">
        <ChipGroup maxVisible={5}>
          {technologies.map((tech) => (
            <Chip key={tech} label={tech} color="secondary" />
          ))}
        </ChipGroup>
      </Row>
      <Row label="with onExpand callback">
        <ChipGroup maxVisible={2} onExpand={setExpanded}>
          <Chip label="First" color="info" />
          <Chip label="Second" color="info" />
          <Chip label="Third" color="info" />
          <Chip label="Fourth" color="info" />
        </ChipGroup>
      </Row>
      <div style={{ fontSize: 14, color: '#666' }}>Expanded: {String(expanded)}</div>
    </div>
  );
};

// ─── Direction ───────────────────────────────────────────

const DirectionStory = () => (
  <div style={{ padding: 32 }}>
    <Row label="row (default)">
      <ChipGroup>
        <Chip label="JavaScript" color="warning" />
        <Chip label="TypeScript" color="info" />
        <Chip label="Python" color="success" />
      </ChipGroup>
    </Row>
    <Row label="column">
      <ChipGroup direction="column">
        <Chip label="JavaScript" color="warning" />
        <Chip label="TypeScript" color="info" />
        <Chip label="Python" color="success" />
      </ChipGroup>
    </Row>
  </div>
);

// ─── Spacing ─────────────────────────────────────────────

const SpacingStory = () => (
  <div style={{ padding: 32 }}>
    {[0.5, 1, 2, 3].map((s) => (
      <Row key={s} label={`spacing={${s}}`}>
        <ChipGroup spacing={s}>
          <Chip label="One" variant="outlined" />
          <Chip label="Two" variant="outlined" />
          <Chip label="Three" variant="outlined" />
        </ChipGroup>
      </Row>
    ))}
  </div>
);

// ─── Deletable Group ─────────────────────────────────────

const DeletableGroupStory = () => {
  const [skills, setSkills] = useState([
    'React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'AWS',
  ]);

  return (
    <div style={{ padding: 32 }}>
      <Row label="deletable chips with overflow">
        <ChipGroup maxVisible={4}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              color="primary"
              variant="outlined"
              onDelete={() => setSkills((prev) => prev.filter((s) => s !== skill))}
            />
          ))}
        </ChipGroup>
      </Row>
      {skills.length === 0 && (
        <button
          onClick={() => setSkills(['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'AWS'])}
          style={{ marginTop: 8 }}
        >
          Reset
        </button>
      )}
    </div>
  );
};

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Chip/ChipGroup',
};

export default meta;

export const Basic: StoryObj = { name: 'Basic', render: () => <BasicStory /> };
export const Overflow: StoryObj = { name: 'Overflow', render: () => <OverflowStory /> };
export const Direction: StoryObj = { name: 'Direction', render: () => <DirectionStory /> };
export const Spacing: StoryObj = { name: 'Spacing', render: () => <SpacingStory /> };
export const DeletableGroup: StoryObj = { name: 'Deletable Group', render: () => <DeletableGroupStory /> };
