# Component Contract: Presence

**Branch**: `009-presence-component` | **Date**: 2026-05-03

## Public Component

### `Presence`

Displays one person's avatar and presence status.

```ts
type PresenceStatus = 'present' | 'near' | 'away';
type PresenceSize = 'compact' | 'standard';

interface PresencePerson {
  name?: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

interface PresenceProps {
  person: PresencePerson;
  status: PresenceStatus;
  size?: PresenceSize;
  showStatusLabel?: boolean;
  ariaLabel?: string;
  className?: string;
}
```

## Contract Rules

- `person` is required, even when no avatar image is available.
- `status` is required and supports only `present`, `near`, and `away`.
- `size` defaults to `standard`.
- `showStatusLabel` controls whether the status label is visibly rendered; status must remain available to assistive technology either way.
- `ariaLabel` overrides the generated accessible summary.
- `className` may be accepted for layout composition, but visual status styling remains owned by the component.
- Present renders a blue tokenized border and color avatar treatment.
- Near renders a yellow/amber tokenized border and color avatar treatment.
- Away renders a grey tokenized border and subdued black-and-white avatar treatment.
- Missing or failed avatar images render a stable fallback using initials when available.
- Unsupported runtime status values are treated as Away for visual safety.

## Required Stories

- **Present**: color avatar with blue border.
- **Near**: color avatar with yellow/amber border.
- **Away**: subdued black-and-white avatar with grey border.
- **All Statuses**: three or more example avatars shown together for comparison.
- **Missing Avatar**: fallback identity display with each status treatment.
- **Compact**: compact size with all statuses.
- **Status Label Hidden**: accessible status remains available when visible label is omitted.

## Accessibility Contract

- Status is available as text and is not communicated by border color alone.
- Avatar image alt text does not duplicate the generated accessible summary.
- Fallback identity is accessible when no avatar image is available.
- If any focusable behavior is added later, focus must use the visible amber focus outline with 2px offset.
- Component examples must pass Storybook accessibility checks.
