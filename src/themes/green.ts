import { ThemeColors } from '../types';

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
