# Tasks: Slider Component

**Input**: Design documents from `/specs/004-slider-component/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/slider-props.md ✅, quickstart.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create component directory structure.

- [x] T001 Create `src/components/Slider/` directory and empty `index.ts` file
- [x] T002 Create `src/components/Slider/Slider.tsx` with exported placeholder

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define shared types, utility functions, and shared style constants used by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Define `SliderProps` TypeScript interface in `src/components/Slider/Slider.tsx` — matches `contracts/slider-props.md` exactly (value, defaultValue, min, max, step, onChange, disabled, showValue, unit, label, aria-label)
- [x] T004 Implement `clamp(value, min, max)` and `snapToStep(raw, min, max, step)` utilities inline in `Slider.tsx` — handles `min >= max` guard (returns 0), non-positive step (treated as 1), and clamping after snap
- [x] T005 Implement controlled/uncontrolled state pattern in `Slider.tsx` using `useState` for internal value + `value` prop override: `const currentValue = value !== undefined ? clamp(value, min, max) : internalValue`
- [x] T006 Define shared style constants in `Slider.tsx` — `labelStyle` (matches Input.tsx: `var(--font-mono)`, 10px, `letterSpacing: 0.12em`, uppercase, `var(--fg-muted)`), `fieldWrap` (`flex-column`, `gap: 6`), `valueStyle` (`var(--font-mono)`, 11px, `var(--fg-muted)`)
- [x] T007 Implement `computePercentage(currentValue, min, max)` inline in `Slider.tsx` — returns 0 when min >= max, else `(currentValue - min) / (max - min) * 100` clamped 0..100

**Checkpoint**: Types, utilities, and style constants in place — user story phases can now proceed.

---

## Phase 3: User Story 1 — Drag or Click to Select a Value (Priority: P1) 🎯 MVP

**Goal**: Render a horizontal track with a draggable thumb. Clicking anywhere on the track jumps to that value. Dragging the thumb (with pointer capture) updates the value continuously. `onChange` is called on every change.

**Independent Test**: Render `<Slider defaultValue={50} showValue />`. Confirm thumb is at midpoint. Click the right end → value shows 100. Drag thumb left → value decreases continuously. Drag past the right boundary → clamps at 100.

### Implementation for User Story 1

- [x] T008 [US1] Implement track container structure in `Slider.tsx` — outer `fieldWrap` div, optional `<label>` with `id={labelId}` from `useId()`, track container (`position: relative`, `height: 20px`, `cursor: pointer` when not disabled)
- [x] T009 [US1] Add track rail and fill layers in `Slider.tsx` — rail: `position: absolute`, `top: 50%`, `left: 0`, `right: 0`, `height: 2px`, `transform: translateY(-50%)`, `background: var(--line)`; fill: same but `width: ${percentage}%`, `background: var(--fg)`
- [x] T010 [US1] Add thumb element in `Slider.tsx` — `position: absolute`, `top: 50%`, `left: ${percentage}%`, `transform: translate(-50%, -50%)`, 16×16px, `background: var(--bg-elevated)`, `border: 1px solid var(--line-strong)`, `borderRadius: var(--r-1)`, `cursor: grab` when not disabled
- [x] T011 [US1] Implement `onPointerDown` handler on the **track container** in `Slider.tsx` — calculates value from `(e.clientX - trackRef.current.getBoundingClientRect().left) / trackWidth`, snaps, clamps, calls `setInternalValue` + `onChange`; then calls `e.currentTarget.setPointerCapture(e.pointerId)` to capture subsequent moves; attach `onPointerMove` and `onPointerUp` on the track container that use the same value-from-position calculation
- [x] T012 [US1] Add `trackRef = useRef<HTMLDivElement>(null)` and `isDragging` state in `Slider.tsx`; set `cursor: grabbing` on thumb during drag; suppress interaction (early return in pointer handlers) when `disabled` is true
- [x] T013 [US1] Create `src/components/Slider/Slider.stories.tsx` — add `Default` (`defaultValue={50}`), `MinValue` (`defaultValue={0}`), `MaxValue` (`defaultValue={100}`) stories with Storybook meta for `Components/Slider`

**Checkpoint**: Drag and click-to-jump work correctly. US1 independently complete.

---

## Phase 4: User Story 2 — Keyboard Navigation (Priority: P2)

**Goal**: The focused thumb responds to ArrowLeft/Right/Up/Down (±1 step), Home (min), End (max), PageUp (+10% range), PageDown (−10% range). Focus ring is amber 2px outline. Tab reaches the thumb; disabled thumb is skipped.

**Independent Test**: Tab to the slider. Press ArrowRight 5 times → value increases by 5 (1 step each). Press End → value is 100. Press Home → value is 0. Press PageUp → value is 10 (10% of 0–100). Tab with disabled slider → thumb not reachable.

### Implementation for User Story 2

- [x] T014 [US2] Add `tabIndex={disabled ? -1 : 0}` and `onKeyDown` handler to the thumb div in `Slider.tsx` — handle: `ArrowRight`/`ArrowUp` (+step), `ArrowLeft`/`ArrowDown` (−step), `End` (max), `Home` (min), `PageUp` (+10% range), `PageDown` (−10% range); all results passed through `snapToStep` + `clamp`; `e.preventDefault()` on all handled keys to block page scroll
- [x] T015 [US2] Add focus state to thumb in `Slider.tsx` using `onFocus`/`onBlur` with `useState(false)` — set `outline: focused ? '2px solid var(--fvs-amber)' : '2px solid transparent'` and `outlineOffset: 2` on thumb style (matches Input/Toggle pattern)
- [x] T016 [US2] Add `aria-label` prop wiring and `aria-labelledby={labelId}` to thumb div in `Slider.tsx`; set `aria-disabled={disabled}` on thumb; confirm `tabIndex` works correctly for disabled state
- [x] T017 [US2] Add `KeyboardNav` story to `Slider.stories.tsx` — `defaultValue={50} label="Volume" step={5} showValue` (focused by default via Storybook `play` function or documented manual step); add `Disabled` story with `value={60} disabled label="Locked" unit="%" showValue`

**Checkpoint**: Full keyboard navigation works. Focus ring visible. Disabled thumb unreachable by Tab. US2 independently complete.

---

## Phase 5: User Story 3 — Display Current Value Label (Priority: P3)

**Goal**: When `showValue` is true, the current numeric value (with optional `unit` suffix) is shown below the track in Space Mono. The label updates live during drag and keyboard navigation.

**Independent Test**: Render `<Slider defaultValue={42} showValue unit="%" />`. Confirm "42%" appears below the track. Drag to 75 → label shows "75%". Render without `showValue` → no label visible. Render without `unit` → "42" with no symbol.

### Implementation for User Story 3

- [x] T018 [US3] Add value label `<span>` below the track container in `Slider.tsx` — rendered only when `showValue` is true; content: `` `${currentValue}${unit ?? ''}` ``; style uses `valueStyle` constant (`var(--font-mono)`, 11px, `var(--fg-muted)`)
- [x] T019 [US3] Add `WithValueDisplay` story to `Slider.stories.tsx` — `defaultValue={72} showValue unit="%" label="Battery"`
- [x] T020 [P] [US3] Add `UnitOnly` story to `Slider.stories.tsx` — `defaultValue={42} showValue unit="%"` (no label)
- [x] T021 [P] [US3] Add `NoUnit` story to `Slider.stories.tsx` — `defaultValue={42} showValue` (no unit)
- [x] T022 [US3] Add `NoValueDisplay` story to `Slider.stories.tsx` — `defaultValue={50}` (no showValue, confirm label absent); confirm value label is absent by visual inspection

**Checkpoint**: Value label appears, updates live, and is absent when `showValue` is false. US3 independently complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Wire re-exports, add remaining story variants, verify themes and a11y, run quickstart checklist.

- [x] T023 Export `Slider` and `SliderProps` from `src/components/Slider/index.ts`
- [x] T024 [P] Add `StepTen` story to `Slider.stories.tsx` — `defaultValue={50} step={10} showValue label="Volume"`
- [x] T025 [P] Add `CustomRange` story to `Slider.stories.tsx` — `defaultValue={0} min={-50} max={50} step={5} unit="°C" showValue label="Offset"`
- [x] T026 [P] Add `FractionalStep` story to `Slider.stories.tsx` — `defaultValue={0.5} min={0} max={1} step={0.1} showValue`
- [x] T027 [P] Add `Controlled` story to `Slider.stories.tsx` — wraps `<Slider>` in a render function with `useState` showing the live value in an external `<span>` next to the component
- [ ] T028 Toggle light / console themes in Storybook — confirm track, fill, thumb, label, and focus ring all adapt via tokens with no hardcoded colors
- [ ] T029 Run through `quickstart.md` verification checklist — confirm all pointer, keyboard, value-label, disabled, and a11y scenarios pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — blocks all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — needs types, utilities, style constants
- **US2 (Phase 4)**: Depends on US1 track/thumb structure (T008–T012) — keyboard handler attaches to thumb that must exist
- **US3 (Phase 5)**: Depends on US1 value state being live (T011) — label reads `currentValue`
- **Polish (Phase 6)**: Depends on US1 + US2 + US3 complete

### Within Each Story

- T003–T007 (Foundational) before any story
- US1: T008 → T009 → T010 → T011 → T012 (sequential — each layer builds on the prior); T013 (stories) can follow
- US2: T014 → T015 → T016 (sequential — keyboard, then focus ring, then ARIA); T017 last
- US3: T018 first (the span), then T019 → T020/T021/T022 can overlap
- Polish: T023 first; T024–T027 all parallel; T028–T029 sequential after stories exist

### Parallel Opportunities

- T020–T021 (US3 story variants) are independent of each other
- T024–T027 (Polish stories) are all independent of each other
- T028 and T029 are both independent of T024–T027 but depend on stories existing

---

## Parallel Example: Polish Phase

```
# After T023 (index.ts), launch story variants in parallel:
T024: StepTen story
T025: CustomRange story
T026: FractionalStep story
T027: Controlled story
# Then T028 (theme check) and T029 (quickstart) once stories exist
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (types, utilities, style constants)
3. Complete Phase 3: User Story 1 (track + thumb + pointer interaction)
4. **STOP and VALIDATE**: Confirm drag, click-to-jump, and `onChange` work at 0, 50, 100 and past boundaries
5. The Slider is functionally usable (mouse users) with `onChange` wired

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. US1 → draggable slider (MVP — mouse only)
3. US2 → full keyboard support + ARIA (accessibility complete)
4. US3 → live value label with unit
5. Polish → all story variants, theme check, quickstart sign-off

---

## Notes

- [P] tasks = different files, no dependencies between them
- The thumb div must have `role="slider"` on it, not on the track container — axe-core will flag `role="slider"` without `aria-valuenow`
- `e.preventDefault()` in `onKeyDown` is required to block browser scroll on ArrowUp/Down/PageUp/PageDown
- `setPointerCapture` is called on `e.currentTarget` (the track container), not `e.target` (which may be the thumb or fill)
- All colors from CSS custom properties; `var(--bg-elevated)` for thumb background ensures correct inversion in console theme
- Commit after each checkpoint to allow clean rollback per story
