# Data Model: Fix All Accessibility Violations

**Branch**: `002-fix-a11y-violations` | **Date**: 2026-04-19

## Overview

This feature has no new data entities or storage. The changes are structural — modifying component props, HTML attributes, and a CSS token value. The relevant "model" is the accessibility contract each component exposes to assistive technologies.

## Component Accessibility Contracts

### Button

| Attribute | Current | Target |
|-----------|---------|--------|
| `outline` (base style) | `'none'` | `'2px solid transparent'` |
| `outlineOffset` (base style) | absent | `'2px'` |
| `onFocus` outline | `2px solid var(--fvs-amber)` | unchanged |
| `onBlur` outline | `'none'` | `'2px solid transparent'` |
| `aria-label` prop | optional | optional (required for icon variant in stories) |

### Badge

| Element | Current | Target |
|---------|---------|--------|
| Dot `<span>` | no aria attributes | `aria-hidden="true"` |

### Input (text / number)

| Attribute | Current | Target |
|-----------|---------|--------|
| `<label>` | no `htmlFor` | `htmlFor={id}` |
| `<input>` | no `id` | `id={id}` (from `useId()`) |
| `<input>` | no `aria-describedby` | `aria-describedby={hintId}` when hint/error present |
| Hint/error `<span>` | no `id` | `id={hintId}` (from `useId()`) |

### Select

Same changes as Input (htmlFor/id, aria-describedby, hint id).

### Toggle

| Element | Current | Target |
|---------|---------|--------|
| Label `<span>` | no `id` | `id={labelId}` (from `useId()`) |
| `<button role="switch">` | no `aria-labelledby` | `aria-labelledby={labelId}` |

### Checkbox

| Element | Current | Target |
|---------|---------|--------|
| Label `<span>` | no `id` | `id={labelId}` (from `useId()`) |
| `<button role="checkbox">` | no `aria-labelledby` | `aria-labelledby={labelId}` |

### DataTable

| Element | Current | Target |
|---------|---------|--------|
| `<th>` | no `scope` | `scope="col"` |

## Token Changes

| Token | Theme | Current | Target |
|-------|-------|---------|--------|
| `--fg-subtle` | light | `--fvs-steel` (#8A8A93) | `#727279` (TBD — verify ≥4.5:1 on #FBFAF7) |
| `--fg-subtle` | console | #6A6A72 (implicit) | #8A8A93 (TBD — verify ≥4.5:1 on #151517) |

> **Note**: Exact values must be computed with a contrast calculator before committing. The targets above are starting estimates. The final values will be recorded in the commit.
