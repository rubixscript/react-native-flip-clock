import { ThemeColors } from '../types';

export const MODERN_THEME: ThemeColors = {
  backgroundGradient: ['#0F172A', '#1E293B', '#0F172A'] as const,
  cardBackground: '#1E293B',
  phaseColors: {
    work: { primary: '#F43F5E', secondary: '#FB7185', glow: 'rgba(244, 63, 94, 0.5)' },
    break: { primary: '#10B981', secondary: '#34D399', glow: 'rgba(16, 185, 129, 0.5)' },
    longBreak: { primary: '#3B82F6', secondary: '#60A5FA', glow: 'rgba(59, 130, 246, 0.5)' },
  },
  cardGradients: {
    top: ['#334155', '#1E293B'] as const,
    bottom: ['#1E293B', '#0F172A'] as const,
  },
  text: '#F8FAFC',
  dividerLine: '#334155',
  closeButtonText: '#F8FAFCCC',
  controlButtonText: '#F8FAFC80',
};
