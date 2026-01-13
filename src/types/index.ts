/**
 * Timer phase types for FlipClock component
 */
export type TimerPhase = 'work' | 'break' | 'longBreak';

/**
 * Clock mode types - countdown timer or regular clock
 */
export type ClockMode = 'countdown' | 'clock';

/**
 * Theme types for FlipClock component
 */
export type Theme = 'dark' | 'light';

/**
 * Theme configuration interface
 */
export interface ThemeColors {
  // Background colors
  backgroundGradient: readonly [string, string, string];
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
  /** Clock mode - countdown timer or regular clock (default: 'countdown') */
  mode?: ClockMode;
  /** Current time in seconds (only for countdown mode) */
  time?: number;
  /** Whether the timer is currently running (only for countdown mode) */
  isRunning?: boolean;
  /** Whether the timer is paused (only for countdown mode) */
  isPaused?: boolean;
  /** Callback when timer starts (only for countdown mode) */
  onStart?: () => void;
  /** Callback when timer is paused (only for countdown mode) */
  onPause?: () => void;
  /** Callback when timer resumes from pause (only for countdown mode) */
  onResume?: () => void;
  /** Callback when timer stops (only for countdown mode) */
  onStop?: () => void;
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
  /** Clock mode - countdown timer or regular clock (default: 'countdown') */
  mode?: ClockMode;
  /** Current time in seconds (only for countdown mode) */
  time?: number;
  /** Whether the timer is currently running (only for countdown mode) */
  isRunning?: boolean;
  /** Whether the timer is paused (only for countdown mode) */
  isPaused?: boolean;
  /** Callback when timer starts (only for countdown mode) */
  onStart?: () => void;
  /** Callback when timer is paused (only for countdown mode) */
  onPause?: () => void;
  /** Callback when timer resumes from pause (only for countdown mode) */
  onResume?: () => void;
  /** Callback when timer stops (only for countdown mode) */
  onStop?: () => void;
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