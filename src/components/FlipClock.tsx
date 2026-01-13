/**
 * @component FlipClock
 * @description Premium aesthetic flip clock timer with smooth animations
 * Always displays horizontally with elegant styling
 */

import React, { memo, useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TimerPhase, FlipClockProps } from '../types';
import { DIMENSIONS } from '../constants/dimensions';
import { getPhaseLabel } from '../utils/phaseUtils';
import { formatTime } from '../utils/timeUtils';
import { getThemeColors, getPhaseColorsForTheme } from '../utils/themeUtils';
import FlipDigit from './FlipDigit';
import ColonSeparator from './ColonSeparator';

const FlipClock: React.FC<FlipClockProps> = ({
  mode = 'countdown',
  time = 0,
  isRunning = false,
  isPaused = false,
  onStart,
  onPause,
  onResume,
  onStop,
  onClose,
  phase = 'work',
  theme = 'dark',
}) => {
  const prevTimeRef = useRef(time);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second when in clock mode
  useEffect(() => {
    if (mode === 'clock') {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const { minutes, seconds, prevMinutes, prevSeconds } = useMemo(() => {
    if (mode === 'clock') {
      // Display current time for clock mode
      const hours = currentTime.getHours();
      const mins = currentTime.getMinutes();
      const secs = currentTime.getSeconds();

      // Format as HH:MM:SS
      const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      const prevTimeStr = `${prevTimeRef.current ? new Date(prevTimeRef.current).getHours() : hours}:${prevTimeRef.current ? new Date(prevTimeRef.current).getMinutes() : mins}:${prevTimeRef.current ? new Date(prevTimeRef.current).getSeconds() : secs}`;

      // Split into digits for flip animation
      return {
        minutes: [timeStr[0], timeStr[1]],
        seconds: [timeStr[3], timeStr[4]],
        prevMinutes: [prevTimeStr[0], prevTimeStr[1]],
        prevSeconds: [prevTimeStr[3], prevTimeStr[4]],
      };
    } else {
      // Countdown mode
      return formatTime(time, prevTimeRef.current);
    }
  }, [time, currentTime, mode]);

  useEffect(() => {
    if (mode === 'clock') {
      prevTimeRef.current = currentTime.getTime();
    } else {
      prevTimeRef.current = time;
    }
  }, [time, currentTime, mode]);

  const themeColors = useMemo(() => {
    return getThemeColors(theme);
  }, [theme]);

  const phaseColors = useMemo(() => {
    if (mode === 'clock') {
      // Use work colors as default for clock mode
      return getPhaseColorsForTheme('work', theme);
    }
    return getPhaseColorsForTheme(phase, theme);
  }, [phase, theme, mode]);

  const phaseLabel = useMemo(() => {
    return mode === 'clock' ? 'CLOCK' : getPhaseLabel(phase);
  }, [phase, mode]);

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={themeColors.backgroundGradient}
        style={StyleSheet.absoluteFill}
      />

      {/* Close button */}
      <TouchableOpacity style={[styles.closeButton, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)' }]} onPress={onClose}>
        <MaterialCommunityIcons name="close" size={24} color={themeColors.closeButtonText} />
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
          <FlipDigit
            digit={minutes[0]}
            prevDigit={prevMinutes[0]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
          />
          <FlipDigit
            digit={minutes[1]}
            prevDigit={prevMinutes[1]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
          />

          {/* Colon separator */}
          <ColonSeparator color={phaseColors.primary} />

          {/* Seconds */}
          <FlipDigit
            digit={seconds[0]}
            prevDigit={prevSeconds[0]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
          />
          <FlipDigit
            digit={seconds[1]}
            prevDigit={prevSeconds[1]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
          />
        </View>
      </View>

      {/* Control buttons - only show in countdown mode */}
      {mode === 'countdown' && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)' }]}
            onPress={onStop}
          >
            <MaterialCommunityIcons name="refresh" size={22} color={themeColors.controlButtonText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.playPauseButton,
              { backgroundColor: phaseColors.primary }
            ]}
            onPress={() => {
              if (!isRunning) {
                onStart?.();
              } else if (isPaused) {
                onResume?.();
              } else {
                onPause?.();
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
            style={[styles.controlButton, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)' }]}
            onPress={onStop}
          >
            <MaterialCommunityIcons name="skip-next" size={22} color={themeColors.controlButtonText} />
          </TouchableOpacity>
        </View>
      )}
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
    gap: DIMENSIONS.GAP,
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


export default memo(FlipClock);