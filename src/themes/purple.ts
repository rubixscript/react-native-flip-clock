import { ThemeColors } from '../types';

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
