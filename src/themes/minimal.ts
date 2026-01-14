import { ThemeColors } from '../types';

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
