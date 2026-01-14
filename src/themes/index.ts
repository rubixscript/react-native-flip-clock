import { Theme, ThemeColors } from '../types';
import { DARK_THEME } from './dark';
import { LIGHT_THEME } from './light';
import { PURPLE_THEME } from './purple';
import { BLUE_THEME } from './blue';
import { GREEN_THEME } from './green';
import { ORANGE_THEME } from './orange';
import { PINK_THEME } from './pink';
import { GLASS_THEME } from './glass';
import { MODERN_THEME } from './modern';
import { MINIMAL_THEME } from './minimal';

// Theme map
export const THEMES: Record<Theme, ThemeColors> = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
  purple: PURPLE_THEME,
  blue: BLUE_THEME,
  green: GREEN_THEME,
  orange: ORANGE_THEME,
  pink: PINK_THEME,
  glass: GLASS_THEME,
  modern: MODERN_THEME,
  minimal: MINIMAL_THEME,
};

// Re-export individual themes for backward compatibility
export { DARK_THEME } from './dark';
export { LIGHT_THEME } from './light';
export { PURPLE_THEME } from './purple';
export { BLUE_THEME } from './blue';
export { GREEN_THEME } from './green';
export { ORANGE_THEME } from './orange';
export { PINK_THEME } from './pink';
export { GLASS_THEME } from './glass';
export { MODERN_THEME } from './modern';
export { MINIMAL_THEME } from './minimal';

// Legacy exports for backward compatibility
export const PHASE_COLORS = DARK_THEME.phaseColors;
export const BACKGROUND_GRADIENT_COLORS = DARK_THEME.backgroundGradient;
export const CARD_GRADIENT_COLORS = DARK_THEME.cardGradients;
export const DEFAULT_TEXT_COLOR = DARK_THEME.text;
export const DIVIDER_LINE_COLOR = DARK_THEME.dividerLine;
export const CARD_BACKGROUND_COLOR = DARK_THEME.cardBackground;
