# React Native Flip Clock

A premium aesthetic flip clock timer component with smooth animations for React Native applications.

## Features

- 🎯 Beautiful flip animation effects
- 🌅 Automatic landscape orientation support
- ⏱️ **Stopwatch mode with lap tracking**
- 🎨 10 beautiful themes (dark, light, purple, blue, green, orange, pink, glass, modern, minimal)
- 🎭 Phase-based color theming
- ⏱️ Responsive design
- 📱 Full-screen modal support
- 🎪 Smooth animations and gradients
- 🧩 Modular architecture
- 🎛️ Highly customizable
- 🪝 Built-in time tracking hook

## Installation

```bash
npm install @rubixscript/react-native-flip-clock
# or
yarn add @rubixscript/react-native-flip-clock
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install expo-linear-gradient expo-screen-orientation @expo/vector-icons
# Optional (for session persistence)
npm install @react-native-async-storage/async-storage
```

## Quick Start

### Countdown Timer Mode

```tsx
import React, { useState } from 'react';
import { FlipClockModal, TimerPhase } from '@rubixscript/react-native-flip-clock';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <FlipClockModal
      visible={showModal}
      onClose={() => setShowModal(false)}
      mode="countdown"
      time={time}
      isRunning={isRunning}
      isPaused={isPaused}
      onStart={() => { setIsRunning(true); setIsPaused(false); }}
      onPause={() => setIsPaused(true)}
      onResume={() => setIsPaused(false)}
      onStop={() => { setIsRunning(false); setIsPaused(false); setTime(1500); }}
      phase="work"
      theme="dark"
      soundEnabled={true}
    />
  );
};
```

### Stopwatch Mode

```tsx
import React, { useState } from 'react';
import { FlipClockModal, useTimeTracker } from '@rubixscript/react-native-flip-clock';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  // Built-in hook for stopwatch functionality
  const tracker = useTimeTracker({
    onSessionComplete: (session) => {
      console.log('Session completed:', session);
    },
    maxLaps: 10,
  });

  return (
    <FlipClockModal
      visible={showModal}
      onClose={() => setShowModal(false)}
      mode="stopwatch"
      time={tracker.elapsedSeconds}
      isRunning={tracker.isRunning}
      isPaused={tracker.isPaused}
      onStart={tracker.start}
      onPause={tracker.pause}
      onResume={tracker.resume}
      onStop={tracker.stop}
      onLap={tracker.recordLap}
      laps={tracker.laps}
      theme="dark"
      soundEnabled={true}
    />
  );
};
```

### Clock Mode

```tsx
<FlipClockModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  mode="clock"
  theme="dark"
/>
```

## Clock Modes

The flip clock supports three modes:

| Mode | Description | Display Format |
|------|-------------|----------------|
| `'countdown'` | Timer that counts down | MM:SS |
| `'stopwatch'` | Timer that counts up with lap support | HH:MM:SS |
| `'clock'` | Real-time clock display | HH:MM:SS |

## Stopwatch Features

The stopwatch mode includes built-in lap tracking functionality:

### Using the `useTimeTracker` Hook

```tsx
import { useTimeTracker, formatStopwatchTime } from '@rubixscript/react-native-flip-clock';

function StopwatchApp() {
  const tracker = useTimeTracker({
    onSessionComplete: (session) => {
      // Handle session completion
      console.log('Duration:', session.duration);
      console.log('Laps:', session.laps);
    },
    maxLaps: 10,
    autoSave: true,
    storageKey: '@myapp_stopwatch_sessions',
  });

  return (
    <View>
      <Text>{formatStopwatchTime(tracker.elapsedSeconds)}</Text>
      <Text>Status: {tracker.isRunning ? 'Running' : 'Stopped'}</Text>

      <Button title="Start" onPress={tracker.start} />
      <Button title="Pause" onPress={tracker.pause} />
      <Button title="Resume" onPress={tracker.resume} />
      <Button title="Stop" onPress={tracker.stop} />
      <Button title="Lap" onPress={tracker.recordLap} />

      {/* Display laps */}
      {tracker.laps.map((lap, index) => (
        <Text key={lap.id}>
          Lap {tracker.laps.length - index}: +{formatStopwatchTime(lap.lapTime)}
          {' '}({formatStopwatchTime(lap.totalTime)})
        </Text>
      ))}
    </View>
  );
}
```

### `useTimeTracker` Return Values

| Property | Type | Description |
|----------|------|-------------|
| `elapsedSeconds` | `number` | Current elapsed time in seconds |
| `isRunning` | `boolean` | Whether the tracker is running |
| `isPaused` | `boolean` | Whether the tracker is paused |
| `laps` | `Lap[]` | Array of recorded laps |
| `start` | `() => void` | Start the tracker |
| `pause` | `() => void` | Pause the tracker |
| `resume` | `() => void` | Resume from pause |
| `stop` | `() => void` | Stop and complete the session |
| `reset` | `() => void` | Reset to initial state |
| `recordLap` | `() => void` | Record a lap time |
| `clearLaps` | `() => void` | Clear all laps |
| `getFormattedTime` | `() => string` | Get formatted time string |

### `useTimeTracker` Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `onSessionComplete` | `(session: TimeSession) => void` | `undefined` | Callback when session completes |
| `maxLaps` | `number` | `10` | Maximum number of laps to keep |
| `autoSave` | `boolean` | `false` | Auto-save to AsyncStorage |
| `storageKey` | `string` | `'@fliplib_sessions'` | Storage key for sessions |

### Lap Data Structure

```tsx
interface Lap {
  id: number;          // Unique lap ID
  lapTime: number;     // Time for this lap (seconds)
  totalTime: number;   // Total elapsed time (seconds)
  timestamp: number;   // When the lap was recorded
}
```

### Session Data Structure

```tsx
interface TimeSession {
  id: string;          // Unique session ID
  type: 'countdown' | 'stopwatch';
  duration: number;    // Duration in seconds
  phase?: TimerPhase;  // Phase for countdown sessions
  laps?: Lap[];        // Recorded laps
  startTime: number;   // Session start timestamp
  endTime: number;     // Session end timestamp
}
```

### Session Persistence (Optional)

```tsx
import {
  loadSessions,
  clearSessions,
  type TimeSession
} from '@rubixscript/react-native-flip-clock';

// Load saved sessions
async function loadHistory() {
  const sessions = await loadSessions('@myapp_sessions');
  console.log('Total sessions:', sessions.length);
  // Process sessions...
}

// Clear all sessions
async function clearHistory() {
  await clearSessions('@myapp_sessions');
}
```

## Theme Support

The flip clock supports 10 beautiful themes:

```tsx
<FlipClock theme="dark" />      // Default
<FlipClock theme="light" />
<FlipClock theme="purple" />
<FlipClock theme="blue" />
<FlipClock theme="green" />
<FlipClock theme="orange" />
<FlipClock theme="pink" />
<FlipClock theme="glass" />
<FlipClock theme="modern" />
<FlipClock theme="minimal" />
```

### Theme Customization

```tsx
import { getThemeColors, getPhaseColorsForTheme } from '@rubixscript/react-native-flip-clock';

// Get theme colors
const colors = getThemeColors('dark');

// Get phase colors for a specific theme
const workColors = getPhaseColorsForTheme('work', 'dark');
```

## Modular Components

You can use individual components for custom implementations:

```tsx
import { FlipDigit, ColonSeparator } from '@rubixscript/react-native-flip-clock';

const CustomClock = () => (
  <View style={{ flexDirection: 'row' }}>
    <FlipDigit digit="1" prevDigit="0" phaseColor="#3B82F6" themeColors={themeColors} />
    <FlipDigit digit="2" prevDigit="1" phaseColor="#3B82F6" themeColors={themeColors} />
    <ColonSeparator color="#3B82F6" />
    <FlipDigit digit="0" prevDigit="5" phaseColor="#3B82F6" themeColors={themeColors} />
    <FlipDigit digit="0" prevDigit="9" phaseColor="#3B82F6" themeColors={themeColors} />
  </View>
);
```

## Props

### FlipClock

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'countdown' \| 'stopwatch' \| 'clock'` | `'countdown'` | Clock mode |
| `time` | `number` | `0` | Current time in seconds |
| `isRunning` | `boolean` | `false` | Whether timer is running |
| `isPaused` | `boolean` | `false` | Whether timer is paused |
| `onStart` | `() => void` | `undefined` | Callback when timer starts |
| `onPause` | `() => void` | `undefined` | Callback when timer is paused |
| `onResume` | `() => void` | `undefined` | Callback when timer resumes |
| `onStop` | `() => void` | `undefined` | Callback when timer stops |
| `onLap` | `() => void` | `undefined` | Callback when lap button pressed (stopwatch only) |
| `laps` | `Lap[]` | `[]` | Current laps (stopwatch only) |
| `onClose` | `() => void` | **required** | Callback when component closes |
| `phase` | `TimerPhase` | `'work'` | Timer phase for countdown mode |
| `theme` | `Theme` | `'dark'` | Theme mode |
| `soundEnabled` | `boolean` | `false` | Enable flip sound |

### FlipClockModal

Includes all FlipClock props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Whether the modal is visible |
| `onClose` | `() => void` | **required** | Callback when modal closes |

### FlipDigit

Individual flip digit component for custom implementations.

| Prop | Type | Description |
|------|------|-------------|
| `digit` | `string` | Current digit value (0-9) |
| `prevDigit` | `string` | Previous digit value for animation |
| `phaseColor` | `string` | Color for the current phase |
| `themeColors` | `ThemeColors` | Theme color object |
| `compact` | `boolean` | Use smaller size (for 6-digit clock mode) |
| `soundEnabled` | `boolean` | Enable flip sound |

### ColonSeparator

Time separator component (:) for clock displays.

| Prop | Type | Description |
|------|------|-------------|
| `color` | `string` | Color of the separator |
| `size` | `number` | Optional custom size |

## Timer Phases

- `'work'` - Focus/Focus time
- `'break'` - Short break
- `'longBreak'` - Long break

## Utility Functions

### `formatTime`

Format seconds into minutes and seconds (for countdown mode).

```tsx
import { formatTime, type FormattedTime } from '@rubixscript/react-native-flip-clock';

const formatted: FormattedTime = formatTime(3665, 3600);
// Returns: { minutes: '01', seconds: '05', prevMinutes: '60', prevSeconds: '00' }
```

### `formatStopwatchTime`

Format seconds into HH:MM:SS format (for stopwatch mode).

```tsx
import { formatStopwatchTime } from '@rubixscript/react-native-flip-clock';

const time = formatStopwatchTime(3665);
// Returns: "01:01:05"
```

### `getPhaseColors`

Get colors for a specific timer phase.

```tsx
import { getPhaseColors } from '@rubixscript/react-native-flip-clock';

const colors = getPhaseColors('work');
// Returns: { primary: '#FF6B6B', secondary: '#FF8E8E', ... }
```

### `getPhaseLabel`

Get a human-readable label for a phase.

```tsx
import { getPhaseLabel } from '@rubixscript/react-native-flip-clock';

const label = getPhaseLabel('work');      // Returns: "FOCUS"
const label2 = getPhaseLabel('break');    // Returns: "BREAK"
const label3 = getPhaseLabel('longBreak'); // Returns: "LONG BREAK"
```

### `getThemeColors`

Get theme colors for any of the 10 available themes.

```tsx
import { getThemeColors } from '@rubixscript/react-native-flip-clock';

const darkColors = getThemeColors('dark');
const lightColors = getThemeColors('light');
// Returns: ThemeColors object with gradients, card colors, etc.
```

### `getPhaseColorsForTheme`

Get phase colors combined with theme colors.

```tsx
import { getPhaseColorsForTheme } from '@rubixscript/react-native-flip-clock';

const workColors = getPhaseColorsForTheme('work', 'dark');
```

## Constants

### Dimension Constants

```tsx
import { DIMENSIONS } from '@rubixscript/react-native-flip-clock';

DIMENSIONS.DIGIT_WIDTH;      // Card width
DIMENSIONS.DIGIT_HEIGHT;     // Card height
DIMENSIONS.FONT_SIZE;        // Font size
// ... and more
```

### Animation Constants

```tsx
import { ANIMATION_DURATION } from '@rubixscript/react-native-flip-clock';

ANIMATION_DURATION.flip; // Flip animation duration in ms (300)
```

## TypeScript Types

```tsx
import type {
  // Mode types
  ClockMode,
  TimerPhase,
  Theme,

  // Component props
  FlipClockProps,
  FlipClockModalProps,
  FlipDigitProps,

  // Data types
  Lap,
  TimeSession,
  ThemeColors,

  // Hook types
  UseTimeTrackerOptions,
  UseTimeTrackerReturn,

  // Utility types
  FormattedTime
} from '@rubixscript/react-native-flip-clock';

// ClockMode: 'countdown' | 'stopwatch' | 'clock'
// TimerPhase: 'work' | 'break' | 'longBreak'
// Theme: 'dark' | 'light' | 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'glass' | 'modern' | 'minimal'
```

## Examples

### Simple Countdown Timer

```tsx
import { FlipClock } from '@rubixscript/react-native-flip-clock';

<FlipClock
  mode="countdown"
  time={1500}
  phase="work"
  theme="dark"
  onClose={() => {}}
/>
```

### Stopwatch with Manual Control

```tsx
import { FlipClock } from '@rubixscript/react-native-flip-clock';

<FlipClock
  mode="stopwatch"
  time={elapsedSeconds}
  isRunning={isRunning}
  laps={laps}
  onStart={handleStart}
  onPause={handlePause}
  onStop={handleStop}
  onLap={handleLap}
  theme="dark"
  onClose={() => {}}
/>
```

### Real-time Clock

```tsx
import { FlipClock } from '@rubixscript/react-native-flip-clock';

<FlipClock
  mode="clock"
  theme="light"
  onClose={() => {}}
/>
```

## License

MIT License - see LICENSE file for details.
