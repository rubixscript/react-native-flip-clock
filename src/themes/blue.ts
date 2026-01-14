import { ThemeColors } from '../types';

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
