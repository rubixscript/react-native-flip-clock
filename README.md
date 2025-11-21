# React Native Flip Clock

A premium aesthetic flip clock timer component with smooth animations for React Native applications.

## Features

- 🎯 Beautiful flip animation effects
- 🌅 Automatic landscape orientation support
- 🎨 Light & dark theme support
- 🎭 Phase-based color theming
- ⏱️ Responsive design
- 📱 Full-screen modal support
- 🎪 Smooth animations and gradients
- 🧩 Modular architecture
- 🎛️ Highly customizable

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
```

## Usage

```tsx
import React, { useState } from 'react';
import { FlipClock, FlipClockModal, TimerPhase } from '@rubixscript/react-native-flip-clock';

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
        theme="dark" // or "light"
      />
    </View>
  );
};
```

## Theme Support

The flip clock supports both light and dark themes:

### Dark Theme (Default)
```tsx
<FlipClock
  {...props}
  theme="dark" // optional, defaults to dark
/>
```

### Light Theme
```tsx
<FlipClock
  {...props}
  theme="light"
/>
```

### Theme Customization
```tsx
import { DARK_THEME, LIGHT_THEME, getThemeColors } from '@rubixscript/react-native-flip-clock';

// Use built-in themes
const darkColors = getThemeColors('dark');
const lightColors = getThemeColors('light');

// Components respond to theme automatically
<FlipClock theme="light" />
```

## Modular Components

You can use individual components for custom implementations:

```tsx
import { FlipDigit, ColonSeparator } from '@rubixscript/react-native-flip-clock';

const CustomClock = () => (
  <View style={{ flexDirection: 'row' }}>
    <FlipDigit digit="1" prevDigit="0" phaseColor="#FF6B6B" themeColors={themeColors} />
    <FlipDigit digit="2" prevDigit="1" phaseColor="#FF6B6B" themeColors={themeColors} />
    <ColonSeparator color="#FF6B6B" />
    <FlipDigit digit="0" prevDigit="5" phaseColor="#FF6B6B" themeColors={themeColors} />
    <FlipDigit digit="0" prevDigit="9" phaseColor="#FF6B6B" themeColors={themeColors} />
  </View>
);
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
| `theme` | `Theme` | Theme mode (`'dark'` | `'light'`, defaults to `'dark'`) |

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

## 🚀 Future Updates

We're continuously working to improve the flip clock library. Here's our roadmap of planned features:

### **Priority 1: Essential Developer Experience**

#### **🎨 Comprehensive Customization API**
- Size scaling options (`scale` prop for 0.5x - 2.0x)
- Custom digit spacing and layout options
- Toggleable UI elements (phase indicator, close button, controls)
- Custom color overrides and theme extensions
- Advanced styling options

#### **⚡ Animation Configuration**
- Adjustable flip duration and easing functions
- Spring physics configuration
- Animation performance tuning
- Reduced motion support for accessibility

### **Priority 2: Visual Enhancements**

#### **🎭 Multiple Animation Styles**
- `'flip'` (current default)
- `'slide'` - Smooth digit transitions
- `'fade'` - Crossfade effects
- `'scale'` - Zoom transitions
- `'rotate'` - Rotation effects

#### **📊 Additional Display Formats**
- `'MM:SS'` - 25:00 (current)
- `'HH:MM:SS'` - 01:25:00
- `'MM'` - 25
- `'SS'` - 1500
- `'fractional'` - 24.5

#### **✨ Visual Effects**
- Gradient glow effects for phase indicators
- Smooth color transitions between phases
- Pulse effects for active states
- Glassmorphism options for modern aesthetics
- Custom shadow and blur effects

### **Priority 3: Functionality Improvements**

#### **🔊 Sound Support**
- Configurable tick sounds
- Phase change notifications
- Completion sounds
- Custom sound file support
- Mute/vibration options

#### **♿ Accessibility Features**
- Screen reader compatibility
- Phase change announcements
- Time remaining voice notifications
- High contrast mode
- Comprehensive ARIA support

#### **📈 State Management Integration**
- React hooks for easy state management
- Built-in time tracking utilities
- Session history and analytics
- Progress monitoring and insights

### **Priority 4: Platform-Specific Enhancements**

#### **📱 Responsive Design**
- Auto-adjusting sizes for all screen dimensions
- Tablet and phone optimizations
- Adaptive landscape/portrait layouts
- Dynamic font scaling integration
- Safe area handling

#### **🔄 Native Platform Features**
- Haptic feedback on controls
- System theme detection (auto light/dark)
- Push notification integration
- Background timer support
- Battery optimization

### **Priority 5: Developer Tools**

#### **🛠 Development Utilities**
- Debug mode with visual overlays
- FPS monitoring and performance metrics
- Animation slow-motion for testing
- Component inspector integration
- Hot reload optimization

#### **🎨 Theme Builder**
```typescript
// Planned theme builder utility
const customTheme = buildTheme({
  base: 'light',
  primaryColor: '#6366f1',
  accentColor: '#ec4899',
  borderRadius: 'rounded' | 'sharp' | 'custom',
  style: 'minimal' | 'detailed' | 'custom',
});
```

### **Priority 6: Advanced Components**

#### **⏱️ Timer Presets**
```typescript
// Planned preset configurations
const TIMER_PRESETS = {
  pomodoro: { work: 25 * 60, break: 5 * 60, longBreak: 15 * 60 },
  shortBreak: { work: 5 * 60, break: 1 * 60, longBreak: 3 * 60 },
  deepWork: { work: 52 * 60, break: 17 * 60, longBreak: 30 * 60 },
  custom: { /* user-defined */ }
};
```

#### **🎛️ Standalone Controls**
- Separate control button components
- Customizable layouts (horizontal/vertical)
- Minimal and detailed control styles
- Gesture support and shortcuts

#### **📊 Analytics & Insights**
- Usage tracking and statistics
- Productivity metrics
- Session analytics
- Export functionality

### **How to Contribute**

We welcome community contributions! Here's how you can help:

1. **Feature Requests** - Open an issue with detailed requirements
2. **Bug Reports** - Include steps to reproduce and expected behavior
3. **Pull Requests** - Follow our contribution guidelines
4. **Documentation** - Help improve examples and guides

### **Timeline Estimate**

- **Next Major Release (v2.0)**: Customization API + Animation Configuration
- **Q2 2024**: Visual Enhancements + Sound Support
- **Q3 2024**: Platform Features + Developer Tools
- **Q4 2024**: Advanced Components + Analytics

*Timeline is subject to change based on community feedback and priorities.*

---

## License

MIT License - see LICENSE file for details.