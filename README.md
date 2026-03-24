# @thanh-libs/chip

Chip and ChipGroup components for System Core UI. Styled with Emotion, themed via `@thanh-libs/theme`.

## Installation

```bash
npm install @thanh-libs/chip
```

### Peer Dependencies

```json
{
  "@emotion/react": ">=11.0.0",
  "@emotion/styled": ">=11.0.0",
  "@thanh-libs/theme": ">=0.0.3",
  "@thanh-libs/utils": ">=0.0.5",
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

## Components

### `<Chip />`

A compact element for displaying labels, tags, or actions.

```tsx
import { Chip } from '@thanh-libs/chip';

<Chip label="Default" />
<Chip label="Primary" color="primary" variant="filled" />
<Chip label="Outlined" color="success" variant="outlined" />
<Chip label="Small" size="sm" />
<Chip label="Deletable" onDelete={() => handleDelete()} />
<Chip label="Clickable" clickable onClick={() => handleClick()} />
<Chip label="With Icon" icon={<StarIcon />} />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | Text content (required) |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style |
| `color` | `ChipColor` | `'default'` | Theme color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `icon` | `ReactNode` | — | Leading icon |
| `avatar` | `ReactNode` | — | Avatar element (replaces icon) |
| `onDelete` | `() => void` | — | Delete handler — shows delete icon |
| `deleteIcon` | `ReactNode` | — | Custom delete icon |
| `clickable` | `boolean` | `false` | Enables hover/press effects |
| `onClick` | `() => void` | — | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | — | Additional CSS class |

**ChipColor:** `'default'` | `'primary'` | `'secondary'` | `'error'` | `'warning'` | `'info'` | `'success'`

---

### `<ChipGroup />`

A layout wrapper for multiple chips with overflow support.

```tsx
import { Chip, ChipGroup } from '@thanh-libs/chip';

<ChipGroup spacing={1} maxVisible={3}>
  <Chip label="React" color="primary" />
  <Chip label="Vue" color="success" />
  <Chip label="Angular" color="error" />
  <Chip label="Svelte" color="warning" />
  <Chip label="Solid" color="info" />
</ChipGroup>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Chip elements (required) |
| `spacing` | `number` | — | Gap between chips (theme spacing) |
| `direction` | `'row' \| 'column'` | `'row'` | Layout direction |
| `maxVisible` | `number` | — | Max chips before overflow (`+N`) |
| `expandText` | `string` | `'+{count}'` | Overflow text template |
| `collapseText` | `string` | `'-'` | Collapse button text |
| `renderOverflow` | `(props) => ReactNode` | — | Custom overflow renderer |
| `onExpand` | `(expanded: boolean) => void` | — | Expand/collapse callback |
| `className` | `string` | — | Additional CSS class |

## Running unit tests

```bash
nx test @thanh-libs/chip
```
