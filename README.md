# React Native Flip Clock

A premium aesthetic flip clock timer component with smooth animations for React Native applications.

## Features

- 🎯 Beautiful flip animation effects
- 🌅 Automatic landscape orientation support
- 🎨 Phase-based color theming
- ⏱️ Responsive design
- 📱 Full-screen modal support
- 🎪 Smooth animations and gradients

## Installation

```bash
npm install @onepage/react-native-flip-clock
# or
yarn add @onepage/react-native-flip-clock
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install expo-linear-gradient expo-screen-orientation @expo/vector-icons
```

## Usage

```tsx
import React, { useState } from 'react';
import { FlipClock, FlipClockModal, TimerPhase } from '@onepage/react-native-flip-clock';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>('work');

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(1500);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <View>
      <Button
        title="Show Flip Clock"
        onPress={() => setShowModal(true)}
      />

      <FlipClockModal
        visible={showModal}
        onClose={handleClose}
        time={time}
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        phase={phase}
      />
    </View>
  );
};
```

## Props

### FlipClock

| Prop | Type | Description |
|------|------|-------------|
| `time` | `number` | Current time in seconds |
| `isRunning` | `boolean` | Whether the timer is currently running |
| `isPaused` | `boolean` | Whether the timer is paused |
| `onStart` | `() => void` | Callback when timer starts |
| `onPause` | `() => void` | Callback when timer is paused |
| `onResume` | `() => void` | Callback when timer resumes |
| `onStop` | `() => void` | Callback when timer stops |
| `onClose` | `() => void` | Callback when component closes |
| `phase` | `TimerPhase` | Current timer phase (`'work'`, `'break'`, `'longBreak'`) |

### FlipClockModal

Includes all FlipClock props plus:

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Whether the modal is visible |
| `onClose` | `() => void` | Callback when modal closes |

## Timer Phases

- `'work'` - Focus/Focus time (red theme)
- `'break'` - Short break (cyan theme)
- `'longBreak'` - Long break (blue theme)

## License

MIT License - see LICENSE file for details.