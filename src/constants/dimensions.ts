import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate responsive sizes for landscape layout - bigger clock
export const DIMENSIONS = {
  DIGIT_WIDTH: Math.min(SCREEN_HEIGHT * 0.35, 140),
  DIGIT_HEIGHT: Math.min(SCREEN_HEIGHT * 0.35, 140) * 1.4,
  FONT_SIZE: Math.min(SCREEN_HEIGHT * 0.35, 140) * 1.4 * 0.85,
  GAP: 10,
  COLON_SIZE: Math.min(SCREEN_HEIGHT * 0.35, 140) * 1.4 * 0.85 * 0.12,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} as const;

export const ANIMATION_DURATION = 300;