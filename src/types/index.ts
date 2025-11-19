/**
 * Timer phase types for FlipClock component
 */
export type TimerPhase = 'work' | 'break' | 'longBreak';

/**
 * Props for FlipClock component
 */
export interface FlipClockProps {
  /** Current time in seconds */
  time: number;
  /** Whether the timer is currently running */
  isRunning: boolean;
  /** Whether the timer is paused */
  isPaused: boolean;
  /** Callback when timer starts */
  onStart: () => void;
  /** Callback when timer is paused */
  onPause: () => void;
  /** Callback when timer resumes from pause */
  onResume: () => void;
  /** Callback when timer stops */
  onStop: () => void;
  /** Callback when component closes */
  onClose: () => void;
  /** Current timer phase */
  phase: TimerPhase;
}

/**
 * Props for FlipClockModal component
 */
export interface FlipClockModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when modal closes */
  onClose: () => void;
  /** Current time in seconds */
  time: number;
  /** Whether the timer is currently running */
  isRunning: boolean;
  /** Whether the timer is paused */
  isPaused: boolean;
  /** Callback when timer starts */
  onStart: () => void;
  /** Callback when timer is paused */
  onPause: () => void;
  /** Callback when timer resumes from pause */
  onResume: () => void;
  /** Callback when timer stops */
  onStop: () => void;
  /** Current timer phase */
  phase: TimerPhase;
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
}