# Quickstart: Presence Component

**Branch**: `009-presence-component` | **Date**: 2026-05-03

## Setup

```bash
npm run storybook
```

Open the Presence component stories in Storybook after implementation.

## Scenario 1: Present Status

1. Open the Present story.
2. Confirm the avatar appears in color.
3. Confirm the avatar has a blue status border.
4. Confirm the status is available as text or assistive text.

## Scenario 2: Near Status

1. Open the Near story.
2. Confirm the avatar appears in color.
3. Confirm the avatar has a yellow/amber status border.
4. Confirm the status is distinguishable from Present without changing avatar clarity.

## Scenario 3: Away Status

1. Open the Away story.
2. Confirm the avatar has a grey status border.
3. Confirm the avatar appears black and white with a subdued treatment.
4. Confirm the person remains identifiable.

## Scenario 4: All Statuses

1. Open the All Statuses story.
2. Compare Present, Near, and Away examples side by side.
3. Expected: all three statuses are identifiable within 5 seconds.
4. Expected: Away appears less available than Present and Near.

## Scenario 5: Missing Avatar

1. Open the Missing Avatar story.
2. Confirm the component shows a stable fallback instead of broken-image UI.
3. Confirm the fallback preserves the status border.
4. Confirm the component dimensions do not change compared with image avatars.

## Scenario 6: Compact Size

1. Open the Compact story.
2. Confirm compact Present, Near, and Away examples remain recognizable.
3. Expected: avatar content, border, and status label do not overlap.
4. Expected: status changes do not shift surrounding layout.

## Scenario 7: Status Label Hidden

1. Open the story where the visible status label is hidden.
2. Run the Storybook accessibility check.
3. Expected: status is still exposed through accessible text.
4. Expected: color is not the only available status signal.

## Scenario 8: Validation Commands

```bash
npm run typecheck
npm run lint
npm test
```

Expected: all commands pass after implementation.

## Validation Notes

- 2026-05-03: Present, Near, Away, All Statuses, Missing Avatar, Compact, and Status Label Hidden stories implemented in Storybook.
- 2026-05-03: Storybook accessibility checks passed through `npm test` for all Presence stories.
- 2026-05-03: `npm run typecheck`, `npm run lint`, and `npm test` passed from the repository root.
