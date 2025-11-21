import { TimerPhase } from '../types';
import { PHASE_COLORS } from '../constants/colors';

export const getPhaseColors = (phase: TimerPhase) => {
  return PHASE_COLORS[phase] || PHASE_COLORS.work;
};

export const getPhaseLabel = (phase: TimerPhase): string => {
  switch (phase) {
    case 'work': return 'FOCUS';
    case 'break': return 'BREAK';
    case 'longBreak': return 'LONG BREAK';
    default: return 'FOCUS';
  }
};