import { TimerPhase, ThemeColors, Theme } from '../types';

// Dark theme colors (current default)
export const DARK_THEME: ThemeColors = {
  backgroundGradient: ['#0D0D0F', '#151518', '#0D0D0F'] as const,
  cardBackground: '#1A1A1E',
  phaseColors: {
    work: {
      primary: '#FF6B6B',
      secondary: '#FF8E8E',
      glow: 'rgba(255, 107, 107, 0.3)',
    },
    break: {
      primary: '#4ECDC4',
      secondary: '#7EDDD7',
      glow: 'rgba(78, 205, 196, 0.3)',
    },
    longBreak: {
      primary: '#45B7D1',
      secondary: '#72CAE0',
      glow: 'rgba(69, 183, 209, 0.3)',
    },
  },
  cardGradients: {
    top: ['#2A2A2E', '#1E1E22'] as const,
    bottom: ['#252529', '#1A1A1E'] as const,
  },
  text: '#FFFFFF',
  dividerLine: '#0D0D0F',
  closeButtonText: '#FFFFFF99',
  controlButtonText: '#FFFFFF60',
};

// Light theme colors
export const LIGHT_THEME: ThemeColors = {
  backgroundGradient: ['#F8F9FA', '#E9ECEF', '#F8F9FA'] as const,
  cardBackground: '#FFFFFF',
  phaseColors: {
    work: {
      primary: '#DC3545',
      secondary: '#F86C6B',
      glow: 'rgba(220, 53, 69, 0.2)',
    },
    break: {
      primary: '#20C997',
      secondary: '#63E6BE',
      glow: 'rgba(32, 201, 151, 0.2)',
    },
    longBreak: {
      primary: '#0D6EFD',
      secondary: '#74C0FC',
      glow: 'rgba(13, 110, 253, 0.2)',
    },
  },
  cardGradients: {
    top: ['#FFFFFF', '#F8F9FA'] as const,
    bottom: ['#F8F9FA', '#E9ECEF'] as const,
  },
  text: '#212529',
  dividerLine: '#DEE2E6',
  closeButtonText: '#21252999',
  controlButtonText: '#21252960',
};

// Purple theme
export const PURPLE_THEME: ThemeColors = {
  backgroundGradient: ['#1A0B2E', '#2D1B4E', '#1A0B2E'] as const,
  cardBackground: '#3D2B5E',
  phaseColors: {
    work: { primary: '#A78BFA', secondary: '#C4B5FD', glow: 'rgba(167, 139, 250, 0.4)' },
    break: { primary: '#F472B6', secondary: '#F9A8D4', glow: 'rgba(244, 114, 182, 0.4)' },
    longBreak: { primary: '#A78BFA', secondary: '#C4B5FD', glow: 'rgba(167, 139, 250, 0.4)' },
  },
  cardGradients: {
    top: ['#4C3A7D', '#3D2B5E'] as const,
    bottom: ['#3D2B5E', '#2E1B4F'] as const,
  },
  text: '#FFFFFF',
  dividerLine: '#1A0B2E',
  closeButtonText: '#FFFFFF99',
  controlButtonText: '#FFFFFF60',
};

// Blue theme
export const BLUE_THEME: ThemeColors = {
  backgroundGradient: ['#0B1A3E', '#1B3366', '#0B1A3E'] as const,
  cardBackground: '#2B4A7E',
  phaseColors: {
    work: { primary: '#60A5FA', secondary: '#93C5FD', glow: 'rgba(96, 165, 250, 0.4)' },
    break: { primary: '#34D399', secondary: '#6EE7B7', glow: 'rgba(52, 211, 153, 0.4)' },
    longBreak: { primary: '#60A5FA', secondary: '#93C5FD', glow: 'rgba(96, 165, 250, 0.4)' },
  },
  cardGradients: {
    top: ['#3B5A9E', '#2B4A7E'] as const,
    bottom: ['#2B4A7E', '#1B3A6E'] as const,
  },
  text: '#FFFFFF',
  dividerLine: '#0B1A3E',
  closeButtonText: '#FFFFFF99',
  controlButtonText: '#FFFFFF60',
};

// Green theme
export const GREEN_THEME: ThemeColors = {
  backgroundGradient: ['#0B2E1A', '#1B663D', '#0B2E1A'] as const,
  cardBackground: '#2B7E4E',
  phaseColors: {
    work: { primary: '#4ADE80', secondary: '#86EFAC', glow: 'rgba(74, 222, 128, 0.4)' },
    break: { primary: '#FBBF24', secondary: '#FCD34D', glow: 'rgba(251, 191, 36, 0.4)' },
    longBreak: { primary: '#4ADE80', secondary: '#86EFAC', glow: 'rgba(74, 222, 128, 0.4)' },
  },
  cardGradients: {
    top: ['#3B9E6E', '#2B7E4E'] as const,
    bottom: ['#2B7E4E', '#1B6E3E'] as const,
  },
  text: '#FFFFFF',
  dividerLine: '#0B2E1A',
  closeButtonText: '#FFFFFF99',
  controlButtonText: '#FFFFFF60',
};

// Orange theme
export const ORANGE_THEME: ThemeColors = {
  backgroundGradient: ['#2E1A0B', '#66401B', '#2E1A0B'] as const,
  cardBackground: '#7E4E2B',
  phaseColors: {
    work: { primary: '#FB923C', secondary: '#FDBA74', glow: 'rgba(251, 146, 60, 0.4)' },
    break: { primary: '#60A5FA', secondary: '#93C5FD', glow: 'rgba(96, 165, 250, 0.4)' },
    longBreak: { primary: '#FB923C', secondary: '#FDBA74', glow: 'rgba(251, 146, 60, 0.4)' },
  },
  cardGradients: {
    top: ['#9E6E3B', '#7E4E2B'] as const,
    bottom: ['#7E4E2B', '#6E3E1B'] as const,
  },
  text: '#FFFFFF',
  dividerLine: '#2E1A0B',
  closeButtonText: '#FFFFFF99',
  controlButtonText: '#FFFFFF60',
};

// Pink theme
export const PINK_THEME: ThemeColors = {
  backgroundGradient: ['#2E0B2E', '#661B66', '#2E0B2E'] as const,
  cardBackground: '#7E2B7E',
  phaseColors: {
    work: { primary: '#F472B6', secondary: '#F9A8D4', glow: 'rgba(244, 114, 182, 0.4)' },
    break: { primary: '#A78BFA', secondary: '#C4B5FD', glow: 'rgba(167, 139, 250, 0.4)' },
    longBreak: { primary: '#F472B6', secondary: '#F9A8D4', glow: 'rgba(244, 114, 182, 0.4)' },
  },
  cardGradients: {
    top: ['#9E3B9E', '#7E2B7E'] as const,
    bottom: ['#7E2B7E', '#6E1B6E'] as const,
  },
  text: '#FFFFFF',
  dividerLine: '#2E0B2E',
  closeButtonText: '#FFFFFF99',
  controlButtonText: '#FFFFFF60',
};

// Glass theme (frosted glass effect)
export const GLASS_THEME: ThemeColors = {
  backgroundGradient: ['rgba(15, 15, 35, 0.8)', 'rgba(25, 25, 55, 0.8)', 'rgba(15, 15, 35, 0.8)'] as const,
  cardBackground: 'rgba(255, 255, 255, 0.1)',
  phaseColors: {
    work: { primary: '#818CF8', secondary: '#A5B4FC', glow: 'rgba(129, 140, 248, 0.5)' },
    break: { primary: '#34D399', secondary: '#6EE7B7', glow: 'rgba(52, 211, 153, 0.5)' },
    longBreak: { primary: '#FBBF24', secondary: '#FCD34D', glow: 'rgba(251, 191, 36, 0.5)' },
  },
  cardGradients: {
    top: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)'] as const,
    bottom: ['rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.05)'] as const,
  },
  text: '#FFFFFF',
  dividerLine: 'rgba(255, 255, 255, 0.2)',
  closeButtonText: '#FFFFFFCC',
  controlButtonText: '#FFFFFF80',
};

// Modern theme (clean, vibrant)
export const MODERN_THEME: ThemeColors = {
  backgroundGradient: ['#0F172A', '#1E293B', '#0F172A'] as const,
  cardBackground: '#1E293B',
  phaseColors: {
    work: { primary: '#F43F5E', secondary: '#FB7185', glow: 'rgba(244, 63, 94, 0.5)' },
    break: { primary: '#10B981', secondary: '#34D399', glow: 'rgba(16, 185, 129, 0.5)' },
    longBreak: { primary: '#3B82F6', secondary: '#60A5FA', glow: 'rgba(59, 130, 246, 0.5)' },
  },
  cardGradients: {
    top: ['#334155', '#1E293B'] as const,
    bottom: ['#1E293B', '#0F172A'] as const,
  },
  text: '#F8FAFC',
  dividerLine: '#334155',
  closeButtonText: '#F8FAFCCC',
  controlButtonText: '#F8FAFC80',
};

// Minimal theme (black and white)
export const MINIMAL_THEME: ThemeColors = {
  backgroundGradient: ['#000000', '#111111', '#000000'] as const,
  cardBackground: '#1A1A1A',
  phaseColors: {
    work: { primary: '#FFFFFF', secondary: '#E5E5E5', glow: 'rgba(255, 255, 255, 0.2)' },
    break: { primary: '#FFFFFF', secondary: '#E5E5E5', glow: 'rgba(255, 255, 255, 0.2)' },
    longBreak: { primary: '#FFFFFF', secondary: '#E5E5E5', glow: 'rgba(255, 255, 255, 0.2)' },
  },
  cardGradients: {
    top: ['#262626', '#1A1A1A'] as const,
    bottom: ['#1A1A1A', '#0D0D0D'] as const,
  },
  text: '#FFFFFF',
  dividerLine: '#262626',
  closeButtonText: '#FFFFFF99',
  controlButtonText: '#FFFFFF60',
};

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

// Legacy exports for backward compatibility
export const PHASE_COLORS = DARK_THEME.phaseColors;
export const BACKGROUND_GRADIENT_COLORS = DARK_THEME.backgroundGradient;
export const CARD_GRADIENT_COLORS = DARK_THEME.cardGradients;
export const DEFAULT_TEXT_COLOR = DARK_THEME.text;
export const DIVIDER_LINE_COLOR = DARK_THEME.dividerLine;
export const CARD_BACKGROUND_COLOR = DARK_THEME.cardBackground;
