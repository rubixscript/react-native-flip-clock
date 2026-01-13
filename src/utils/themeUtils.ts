import { Theme, ThemeColors, TimerPhase } from '../types';
import { THEMES } from '../constants/colors';

/**
 * Get theme colors based on theme mode
 * @param theme - Theme mode ('dark', 'light', 'purple', 'blue', 'green', 'orange', 'pink', 'glass', 'modern', 'minimal')
 * @returns ThemeColors object for the specified theme
 */
export const getThemeColors = (theme: Theme = 'dark'): ThemeColors => {
  return THEMES[theme] || THEMES.dark;
};

/**
 * Get phase colors for a specific theme
 * @param phase - Timer phase
 * @param theme - Theme mode (defaults to 'dark')
 * @returns Phase colors for the specified theme and phase
 */
export const getPhaseColorsForTheme = (phase: TimerPhase, theme: Theme = 'dark') => {
  const themeColors = getThemeColors(theme);
  return themeColors.phaseColors[phase] || themeColors.phaseColors.work;
};