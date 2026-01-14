/**
 * React Native Flip Clock Library
 *
 * A premium aesthetic flip clock timer component with smooth animations.
 * Designed for React Native and Expo applications.
 *
 * @author OnePage Team
 * @version 1.0.0
 */

// Export main components
export { default as FlipClock } from './components/FlipClock';
export { default as FlipClockModal } from './components/FlipClockModal';
export { default as FlipDigit } from './components/FlipDigit';
export { default as ColonSeparator } from './components/ColonSeparator';

// Export hooks
export {
  useTimeTracker,
  formatStopwatchTime,
  loadSessions,
  clearSessions,
} from './hooks/useTimeTracker';
export type { UseTimeTrackerOptions, UseTimeTrackerReturn } from './hooks/useTimeTracker';

// Export utilities
export { getPhaseColors, getPhaseLabel } from './utils/phaseUtils';
export { formatTime } from './utils/timeUtils';
export type { FormattedTime } from './utils/timeUtils';
export { getThemeColors, getPhaseColorsForTheme } from './utils/themeUtils';

// Export constants
export { DIMENSIONS, ANIMATION_DURATION } from './constants/dimensions';
export {
  PHASE_COLORS,
  BACKGROUND_GRADIENT_COLORS,
  CARD_GRADIENT_COLORS,
  DARK_THEME,
  LIGHT_THEME,
  THEMES,
} from './constants/colors';

// Export themes
export { THEMES as THEMES_NEW } from './themes/index';

// Export types
export type {
  TimerPhase,
  ClockMode,
  Theme,
  ThemeColors,
  FlipClockProps,
  FlipClockModalProps,
  FlipDigitProps,
  Lap,
  TimeSession,
} from './types';