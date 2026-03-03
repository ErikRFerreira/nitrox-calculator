# Nitrox + Trimix Calculator

## Safety Notice
- This app is **not a decompression planner**.
- This app is **not a dive computer replacement**.
- Always analyze and label your gas before diving.
- Follow your training and agency standards for all dive planning decisions.

## What This App Does
- Calculates MOD from gas mix and selected ppO2 (1.4 or 1.6).
- Calculates END in Trimix mode.
- Generates a tank label view with diver name, date, mix, MOD, and END (when applicable).
- Saves entries locally to history with type and date filtering.
- Provides concise learn/reference content for reinforcement.

## What This App Does Not Do (v1)
- No decompression profile planning.
- No OTU/CNS exposure tracking.
- No gas blending calculator.
- No cloud sync, user accounts, or push notifications.

## Features
- Calculator tab: Nitrox and Trimix workflows, ppO2 selection, presets, mix validation, MOD display, and END display in Trimix mode.
- Label flow: shows a clear tank label layout and saves entries to history.
- History tab: filters by all/nitrox/trimix, supports single-day and date-range filtering, and allows entry deletion.
- Learn tab: renders JSON-driven articles with defensive content parsing.
- Settings tab: unit system toggle, label name update, and delete-all history with explicit confirmation.

## Calculation Model
- Gas calculations are domain-owned in `domain/gas/`.
- MOD is calculated in meters in the domain layer.
- END uses a nitrogen-only narcotic model; oxygen is not treated as narcotic in this app.
- Validation rule: O2 + He must not exceed 100%; invalid mixes surface explicit errors and disable valid-looking outputs.
- Domain returns raw numeric values; UI handles rounding and unit formatting.

## Data & Privacy (Offline-First)
- Uses local AsyncStorage only.
- History and settings use defensive JSON parsing.
- No remote sync or cloud account model.

## Tech Stack
- Expo
- React Native
- TypeScript
- React Navigation
- NativeWind
- AsyncStorage
- Jest

## Architecture Notes
- UI does not perform gas math.
- Math lives in `domain/gas/` and remains pure/testable.
- Persistence lives in `storage/`.
- Learn content lives in `content/learn.json`.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run start
   ```
3. Optional platform targets:
   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Test
Run the test suite:

```bash
npm test
```

Current coverage areas include:
- Gas calculations and validation.
- MOD display formatting by unit system.
- History storage robustness and malformed JSON handling.
- Learn screen rendering from JSON content.
- History date-filter behavior.

## Project Structure
```text
nitrox-app/
|-- domain/
|   `-- gas/
|-- screens/
|-- components/
|-- storage/
|-- content/
|-- tests/
|-- app/
|-- assets/
`-- utils/
```
