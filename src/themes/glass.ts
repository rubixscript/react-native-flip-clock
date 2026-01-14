import { ThemeColors } from '../types';

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
