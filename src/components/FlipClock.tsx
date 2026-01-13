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
  soundEnabled = false,
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

  const { hours, minutes, seconds, prevHours, prevMinutes, prevSeconds } = useMemo(() => {
    if (mode === 'clock') {
      // Display current time for clock mode (HH:MM:SS)
      const now = currentTime;
      const hrs = now.getHours();
      const mins = now.getMinutes();
      const secs = now.getSeconds();

      // Get previous time for flip animation
      const prevTime = prevTimeRef.current ? new Date(prevTimeRef.current) : now;
      const prevHrs = prevTime.getHours();
      const prevMins = prevTime.getMinutes();
      const prevSecs = prevTime.getSeconds();

      // Split into digits for flip animation
      const hrsStr = hrs.toString().padStart(2, '0');
      const minsStr = mins.toString().padStart(2, '0');
      const secsStr = secs.toString().padStart(2, '0');
      const prevHrsStr = prevHrs.toString().padStart(2, '0');
      const prevMinsStr = prevMins.toString().padStart(2, '0');
      const prevSecsStr = prevSecs.toString().padStart(2, '0');

      return {
        hours: [hrsStr[0], hrsStr[1]],
        minutes: [minsStr[0], minsStr[1]],
        seconds: [secsStr[0], secsStr[1]],
        prevHours: [prevHrsStr[0], prevHrsStr[1]],
        prevMinutes: [prevMinsStr[0], prevMinsStr[1]],
        prevSeconds: [prevSecsStr[0], prevSecsStr[1]],
      };
    } else {
      // Countdown mode (MM:SS) - use formatTime and convert to arrays
      const formatted = formatTime(time, prevTimeRef.current);
      return {
        hours: null,
        minutes: [formatted.minutes[0], formatted.minutes[1]],
        seconds: [formatted.seconds[0], formatted.seconds[1]],
        prevHours: null,
        prevMinutes: [formatted.prevMinutes[0], formatted.prevMinutes[1]],
        prevSeconds: [formatted.prevSeconds[0], formatted.prevSeconds[1]],
      };
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
        <View style={[styles.clockContainer, mode === 'clock' && styles.clockContainerCompact]}>
          {/* Hours - only show in clock mode */}
          {mode === 'clock' && (
            <>
              <FlipDigit
                digit={hours[0]}
                prevDigit={prevHours[0]}
                phaseColor={phaseColors.primary}
                themeColors={themeColors}
                compact={true}
                soundEnabled={soundEnabled}
              />
              <FlipDigit
                digit={hours[1]}
                prevDigit={prevHours[1]}
                phaseColor={phaseColors.primary}
                themeColors={themeColors}
                compact={true}
                soundEnabled={soundEnabled}
              />

              {/* Colon separator */}
              <ColonSeparator color={phaseColors.primary} compact={true} />
            </>
          )}

          {/* Minutes */}
          <FlipDigit
            digit={minutes[0]}
            prevDigit={prevMinutes[0]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
            compact={mode === 'clock'}
            soundEnabled={soundEnabled}
          />
          <FlipDigit
            digit={minutes[1]}
            prevDigit={prevMinutes[1]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
            compact={mode === 'clock'}
            soundEnabled={soundEnabled}
          />

          {/* Colon separator */}
          <ColonSeparator color={phaseColors.primary} compact={mode === 'clock'} />

          {/* Seconds */}
          <FlipDigit
            digit={seconds[0]}
            prevDigit={prevSeconds[0]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
            compact={mode === 'clock'}
            soundEnabled={soundEnabled}
          />
          <FlipDigit
            digit={seconds[1]}
            prevDigit={prevSeconds[1]}
            phaseColor={phaseColors.primary}
            themeColors={themeColors}
            compact={mode === 'clock'}
            soundEnabled={soundEnabled}
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
  clockContainerCompact: {
    gap: 2,
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