# Quickstart: Light Control Tile

**Branch**: `008-light-control-tile` | **Date**: 2026-04-25

## Setup

```bash
npm run storybook
```

Open the Light Control Tile stories in Storybook after implementation.

## Scenario 1: Dimmable Light

1. Open the dimmable Light Control Tile story.
2. Confirm the tile shows the light name, primary status, and brightness percentage.
3. Adjust brightness from 70% to 35%.
4. Expected: the visible brightness value updates to 35%.
5. Expected: keyboard focus is visible on the brightness control.

## Scenario 2: Effectively Off

1. Open a Light Control Tile story with brightness set to 0%.
2. Confirm the tile communicates off or effectively off status.
3. Expected: the status is understandable without relying on dimmed color alone.

## Scenario 3: Tunable Warmth

1. Open the tunable warmth story.
2. Confirm the tile shows brightness plus warmth status.
3. Adjust warmth left to right through Cool White, Daylight, Neutral White, Soft White, Warm White, and Candlelight.
4. Expected: the warmth value and label update to communicate the selected setting.
5. Expected: unsupported night mode controls are absent.

## Scenario 4: Red LED Night Mode

1. Open the night mode story.
2. Toggle night mode on.
3. Expected: the tile keeps the primary light status text stable while displaying that status in red.
4. Expected: the warmth setting displays Red and the warmth slider is disabled.
5. Toggle night mode off.
6. Expected: the tile returns to normal light status and warmth adjustment is available again.

## Scenario 5: Full Capability Tile

1. Open the full capability story.
2. Confirm brightness, warmth, and night mode are all visible and distinguishable.
3. Tab through the controls.
4. Expected: tab order is predictable and each control has a visible amber focus ring.
5. Expected: each control has a meaningful accessible name.

## Scenario 6: Unsupported Capabilities

1. Open a dimmer-only light story.
2. Confirm warmth and night mode controls are not shown as actionable controls.
3. Expected: the tile remains compact and does not imply missing device features are broken.

## Scenario 7: Updating State

1. Open the updating story.
2. Confirm the tile communicates that a change is being applied.
3. Expected: the tile avoids presenting both previous and next values as final.

## Scenario 8: Unavailable State

1. Open the unavailable story.
2. Confirm last known status remains readable.
3. Try to operate brightness, warmth, and night mode controls.
4. Expected: unavailable controls do not appear operable and cannot be activated.

## Scenario 9: Accessibility Sweep

1. Run Storybook accessibility checks on every Light Control Tile story.
2. Expected: zero automated accessibility violations.
3. Manually verify that brightness, warmth, night mode, updating, and unavailable states can be understood without color alone.

## Scenario 10: Compact Layout

1. View the full capability tile at the standard Control Tile preview width.
2. Expected: title, primary status, current values, and controls do not overlap.
3. Expected: labels do not truncate beyond recognition.

## Validation Notes

- 2026-04-25: Automated Storybook accessibility validation passes for all Light Control Tile stories.
- 2026-04-25: Standard 260px preview layout reviewed through Storybook stories; no remaining compact-layout gaps documented.
