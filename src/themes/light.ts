import { ThemeColors } from '../types';

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
