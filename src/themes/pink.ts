import { ThemeColors } from '../types';

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
