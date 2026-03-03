# AGENTS.md — Nitrox + Trimix Calculator

This document defines development rules and architectural constraints for this project.
All AI agents (Codex, ChatGPT, etc.) must follow these guidelines.

---

## 1. Product Philosophy

This app is:

- Offline-first
- Minimal
- Fast
- Safety-conscious
- Instructor-level tone
- Not a decompression planner
- Not a dive computer replacement

Do not introduce unnecessary complexity or features.

Resist scope creep.

If unsure, choose the simpler implementation.

---

## 2. Architecture Rules

### Domain layer owns ALL gas math

- UI must never perform gas calculations.
- Domain returns raw numbers (no rounding).
- UI handles formatting and rounding.

Domain location:
`src/domain/gas/`

All gas math must be pure and testable.

---

### Validation before calculation

Invalid gas mixes must:

- Not produce valid-looking outputs
- Produce explicit errors
- Never crash the UI

O₂ + He must never exceed 100%.

---

### UI Principles

- Keep layout calm and uncluttered.
- No aggressive warning colors unless truly necessary.
- No flashing animations.
- No marketing-style language.

Tone must remain instructional and professional.

---

## 3. State & Storage

- Keep state simple.
- Avoid introducing global state libraries unless clearly justified.
- AsyncStorage must use defensive JSON parsing.
- Deleting history must be explicit and confirmed.

No cloud sync.
No user accounts.

---

## 4. Learn Section

- Learn content is reinforcement, not a course.
- Content must remain concise.
- Unknown block types must not crash rendering.
- Images must be minimal vector style.
- Avoid alarmist language.

---

## 5. Units & Rounding

- Domain layer returns raw metric values.
- UI converts to imperial when needed.
- Rounding happens only in UI.
- Maintain consistency across Calculator, Label, and History.

---

## 6. What NOT to Add (v1)

Do not add:

- Dive profile planning
- Gas blending calculator
- OTU tracking
- Cloud sync
- Accounts
- Push notifications
- Ads
- Complex animations

This is v1. Keep it stable and shippable.

---

## 7. Definition of Done (v1)

The app is considered complete when:

- No crashes
- No NaN outputs
- Invalid mixes handled safely
- History persists across restarts
- Settings persist
- Learn content renders correctly
- Release build runs offline
- UI feels calm and intentional

Shipping > perfection.
