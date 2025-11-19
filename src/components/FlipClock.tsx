/**
 * @component FlipClock
 * @description Premium aesthetic flip clock timer with smooth animations
 * Always displays horizontally with elegant styling
 */

import React, { memo, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TimerPhase, FlipClockProps, FlipDigitProps } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate responsive sizes for landscape layout - bigger clock
const DIGIT_WIDTH = Math.min(SCREEN_HEIGHT * 0.35, 140);
const DIGIT_HEIGHT = DIGIT_WIDTH * 1.4;
const FONT_SIZE = DIGIT_HEIGHT * 0.85;
const GAP = 10;
const COLON_SIZE = FONT_SIZE * 0.12;

const FlipDigit: React.FC<FlipDigitProps> = memo(({ digit, prevDigit, phaseColor }) => {
  const flipAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (digit !== prevDigit) {
      flipAnim.setValue(0);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [digit, prevDigit, flipAnim]);

  // Top flap flips down (old digit disappears)
  const topFlapRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-90deg', '-90deg'],
  });

  // Bottom flap flips up (new digit appears)
  const bottomFlapRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['90deg', '90deg', '0deg'],
  });

  return (
    <View style={styles.digitWrapper}>
      <View style={styles.digitContainer}>
        {/* Static top half - shows NEW digit (revealed after flip) */}
        <View style={styles.topHalf}>
          <LinearGradient
            colors={['#2A2A2E', '#1E1E22']}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.topText]}>{digit}</Text>
          </LinearGradient>
        </View>

        {/* Static bottom half - shows OLD digit (covered by flap) */}
        <View style={styles.bottomHalf}>
          <LinearGradient
            colors={['#252529', '#1A1A1E']}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.bottomText]}>{prevDigit}</Text>
          </LinearGradient>
        </View>

        {/* Animated top flap - flips down showing OLD digit */}
        <Animated.View
          style={[
            styles.flipCardTop,
            {
              transform: [
                { perspective: 1000 },
                { rotateX: topFlapRotate },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#2A2A2E', '#1E1E22']}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.topText]}>{prevDigit}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Animated bottom flap - flips up showing NEW digit */}
        <Animated.View
          style={[
            styles.flipCardBottom,
            {
              transform: [
                { perspective: 1000 },
                { rotateX: bottomFlapRotate },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#252529', '#1A1A1E']}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.bottomText]}>{digit}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Center divider line */}
        <View style={styles.dividerLine} />

        {/* Highlight effect on top */}
        <View style={styles.topHighlight} />
      </View>
    </View>
  );
});

const ColonSeparator: React.FC<{ color: string }> = memo(({ color }) => {
  return (
    <View style={styles.colonContainer}>
      <View style={[styles.colonDot, { backgroundColor: color }]} />
      <View style={[styles.colonDot, { backgroundColor: color }]} />
    </View>
  );
});

const FlipClock: React.FC<FlipClockProps> = ({
  time,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
  onClose,
  phase,
}) => {
  const prevTimeRef = useRef(time);

  const { minutes, seconds, prevMinutes, prevSeconds } = useMemo(() => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    const prevMins = Math.floor(prevTimeRef.current / 60);
    const prevSecs = prevTimeRef.current % 60;

    return {
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
      prevMinutes: prevMins.toString().padStart(2, '0'),
      prevSeconds: prevSecs.toString().padStart(2, '0'),
    };
  }, [time]);

  useEffect(() => {
    prevTimeRef.current = time;
  }, [time]);

  const phaseColors = useMemo(() => {
    switch (phase) {
      case 'work':
        return { primary: '#FF6B6B', secondary: '#FF8E8E', glow: 'rgba(255, 107, 107, 0.3)' };
      case 'break':
        return { primary: '#4ECDC4', secondary: '#7EDDD7', glow: 'rgba(78, 205, 196, 0.3)' };
      case 'longBreak':
        return { primary: '#45B7D1', secondary: '#72CAE0', glow: 'rgba(69, 183, 209, 0.3)' };
      default:
        return { primary: '#FF6B6B', secondary: '#FF8E8E', glow: 'rgba(255, 107, 107, 0.3)' };
    }
  }, [phase]);

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case 'work': return 'FOCUS';
      case 'break': return 'BREAK';
      case 'longBreak': return 'LONG BREAK';
      default: return 'FOCUS';
    }
  }, [phase]);

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#0D0D0F', '#151518', '#0D0D0F']}
        style={StyleSheet.absoluteFill}
      />

      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialCommunityIcons name="close" size={24} color="#FFFFFF99" />
      </TouchableOpacity>

      {/* Phase indicator */}
      <View style={styles.phaseContainer}>
        <Text style={[styles.phaseText, { color: phaseColors.primary }]}>
          {phaseLabel}
        </Text>
        <View style={[styles.phaseIndicator, { backgroundColor: phaseColors.primary }]} />
      </View>

      {/* Flip clock display - always horizontal */}
      <View style={styles.clockWrapper}>
        <View style={styles.clockContainer}>
          {/* Minutes */}
          <FlipDigit digit={minutes[0]} prevDigit={prevMinutes[0]} phaseColor={phaseColors.primary} />
          <FlipDigit digit={minutes[1]} prevDigit={prevMinutes[1]} phaseColor={phaseColors.primary} />

          {/* Colon separator */}
          <ColonSeparator color={phaseColors.primary} />

          {/* Seconds */}
          <FlipDigit digit={seconds[0]} prevDigit={prevSeconds[0]} phaseColor={phaseColors.primary} />
          <FlipDigit digit={seconds[1]} prevDigit={prevSeconds[1]} phaseColor={phaseColors.primary} />
        </View>
      </View>

      {/* Control buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onStop}
        >
          <MaterialCommunityIcons name="refresh" size={22} color="#FFFFFF60" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.playPauseButton,
            { backgroundColor: phaseColors.primary }
          ]}
          onPress={() => {
            if (!isRunning) {
              onStart();
            } else if (isPaused) {
              onResume();
            } else {
              onPause();
            }
          }}
        >
          <MaterialCommunityIcons
            name={!isRunning || isPaused ? 'play' : 'pause'}
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={onStop}
        >
          <MaterialCommunityIcons name="skip-next" size={22} color="#FFFFFF60" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  phaseContainer: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 3,
  },
  phaseIndicator: {
    width: 40,
    height: 3,
    borderRadius: 1.5,
    marginTop: 8,
  },
  clockWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP,
  },
  digitWrapper: {
    position: 'relative',
  },
  digitContainer: {
    width: DIGIT_WIDTH,
    height: DIGIT_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1A1A1E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  topHalf: {
    height: '50%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomHalf: {
    height: '50%',
    overflow: 'hidden',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardGradient: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  digitText: {
    fontSize: FONT_SIZE,
    fontWeight: '300',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  topText: {
    position: 'absolute',
    top: 0,
  },
  bottomText: {
    position: 'absolute',
    bottom: 0,
  },
  flipCardTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backfaceVisibility: 'hidden',
  },
  flipCardBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    overflow: 'hidden',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backfaceVisibility: 'hidden',
  },
  dividerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    backgroundColor: '#0D0D0F',
    marginTop: -1,
    zIndex: 10,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  colonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: DIGIT_HEIGHT * 0.2,
    marginHorizontal: 4,
  },
  colonDot: {
    width: COLON_SIZE,
    height: COLON_SIZE,
    borderRadius: COLON_SIZE / 2,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

FlipDigit.displayName = 'FlipDigit';
ColonSeparator.displayName = 'ColonSeparator';

export default memo(FlipClock);