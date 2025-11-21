import { Theme, ThemeColors, TimerPhase } from '../types';
import { DARK_THEME, LIGHT_THEME } from '../constants/colors';

/**
 * Get theme colors based on theme mode
 * @param theme - Theme mode ('dark' or 'light', defaults to 'dark')
 * @returns ThemeColors object for the specified theme
 */
export const getThemeColors = (theme: Theme = 'dark'): ThemeColors => {
  return theme === 'light' ? LIGHT_THEME : DARK_THEME;
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