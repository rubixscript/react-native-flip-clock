import { ThemeColors } from '../types';

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
