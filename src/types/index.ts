/**
 * Timer phase types for FlipClock component
 */
export type TimerPhase = 'work' | 'break' | 'longBreak';

/**
 * Clock mode types - countdown timer, stopwatch, or regular clock
 */
export type ClockMode = 'countdown' | 'stopwatch' | 'clock';

/**
 * Lap entry for stopwatch mode
 */
export interface Lap {
  id: number;
  lapTime: number;  // Time for this lap in seconds
  totalTime: number; // Total elapsed time at this lap in seconds
  timestamp: number; // When the lap was recorded
}

/**
 * Session record for time tracking
 */
export interface TimeSession {
  id: string;
  type: 'countdown' | 'stopwatch';
  duration: number; // Duration in seconds
  phase?: TimerPhase;
  laps?: Lap[];
  startTime: number;
  endTime: number;
}

/**
 * Theme types for FlipClock component
 */
export type Theme = 'dark' | 'light' | 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'glass' | 'modern' | 'minimal';

/**
 * Theme configuration interface
 */
export interface ThemeColors {
  // Background colors
  backgroundGradient: readonly (string | number)[];
  cardBackground: string;

  // Phase colors (for dark theme)
  phaseColors: {
    work: { primary: string; secondary: string; glow: string };
    break: { primary: string; secondary: string; glow: string };
    longBreak: { primary: string; secondary: string; glow: string };
  };

  // Card gradient colors
  cardGradients: {
    top: readonly [string, string];
    bottom: readonly [string, string];
  };

  // Text and UI colors
  text: string;
  dividerLine: string;
  closeButtonText: string;
  controlButtonText: string;
}

/**
 * Props for FlipClock component
 */
export interface FlipClockProps {
  /** Clock mode - countdown timer, stopwatch, or regular clock (default: 'countdown') */
  mode?: ClockMode;
  /** Current time in seconds (for countdown and stopwatch modes) */
  time?: number;
  /** Whether the timer is currently running (for countdown and stopwatch modes) */
  isRunning?: boolean;
  /** Whether the timer is paused (for countdown and stopwatch modes) */
  isPaused?: boolean;
  /** Callback when timer starts (for countdown and stopwatch modes) */
  onStart?: () => void;
  /** Callback when timer is paused (for countdown and stopwatch modes) */
  onPause?: () => void;
  /** Callback when timer resumes from pause (for countdown and stopwatch modes) */
  onResume?: () => void;
  /** Callback when timer stops (for countdown and stopwatch modes) */
  onStop?: () => void;
  /** Callback when lap button is pressed (only for stopwatch mode) */
  onLap?: () => void;
  /** Current laps for stopwatch mode */
  laps?: Lap[];
  /** Callback when component closes */
  onClose: () => void;
  /** Current timer phase (only for countdown mode) */
  phase?: TimerPhase;
  /** Theme mode (default: 'dark') */
  theme?: Theme;
  /** Whether to enable flip sound (default: false) */
  soundEnabled?: boolean;
}

/**
 * Props for FlipClockModal component
 */
export interface FlipClockModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when modal closes */
  onClose: () => void;
  /** Clock mode - countdown timer, stopwatch, or regular clock (default: 'countdown') */
  mode?: ClockMode;
  /** Current time in seconds (for countdown and stopwatch modes) */
  time?: number;
  /** Whether the timer is currently running (for countdown and stopwatch modes) */
  isRunning?: boolean;
  /** Whether the timer is paused (for countdown and stopwatch modes) */
  isPaused?: boolean;
  /** Callback when timer starts (for countdown and stopwatch modes) */
  onStart?: () => void;
  /** Callback when timer is paused (for countdown and stopwatch modes) */
  onPause?: () => void;
  /** Callback when timer resumes from pause (for countdown and stopwatch modes) */
  onResume?: () => void;
  /** Callback when timer stops (for countdown and stopwatch modes) */
  onStop?: () => void;
  /** Callback when lap button is pressed (only for stopwatch mode) */
  onLap?: () => void;
  /** Current laps for stopwatch mode */
  laps?: Lap[];
  /** Current timer phase (only for countdown mode) */
  phase?: TimerPhase;
  /** Theme mode (default: 'dark') */
  theme?: Theme;
  /** Whether to enable flip sound (default: false) */
  soundEnabled?: boolean;
}

/**
 * Props for FlipDigit component (internal)
 */
export interface FlipDigitProps {
  /** Current digit to display */
  digit: string;
  /** Previous digit for animation */
  prevDigit: string;
  /** Phase color for styling */
  phaseColor: string;
  /** Theme colors for the component */
  themeColors: ThemeColors;
  /** Whether to use compact size (for clock mode with 6 digits) */
  compact?: boolean;
  /** Whether to enable flip sound */
  soundEnabled?: boolean;
}