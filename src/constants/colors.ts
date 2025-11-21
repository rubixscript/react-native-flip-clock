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

// Legacy exports for backward compatibility
export const PHASE_COLORS = DARK_THEME.phaseColors;
export const BACKGROUND_GRADIENT_COLORS = DARK_THEME.backgroundGradient;
export const CARD_GRADIENT_COLORS = DARK_THEME.cardGradients;
export const DEFAULT_TEXT_COLOR = DARK_THEME.text;
export const DIVIDER_LINE_COLOR = DARK_THEME.dividerLine;
export const CARD_BACKGROUND_COLOR = DARK_THEME.cardBackground;