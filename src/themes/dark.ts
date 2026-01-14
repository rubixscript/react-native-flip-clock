import { ThemeColors } from '../types';

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
