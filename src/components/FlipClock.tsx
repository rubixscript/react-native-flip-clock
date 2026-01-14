/**
 * @component FlipClock
 * @description Premium aesthetic flip clock timer with smooth animations
 * Always displays horizontally with elegant styling
 */

import React, { memo, useMemo, useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TimerPhase, FlipClockProps } from '../types';
import { getPhaseLabel } from '../utils/phaseUtils';
import { formatTime } from '../utils/timeUtils';
import { getThemeColors, getPhaseColorsForTheme } from '../utils/themeUtils';
import ClockBackground from './flip-clock/ClockBackground';
import PhaseIndicator from './flip-clock/PhaseIndicator';
import ClockDisplay from './flip-clock/ClockDisplay';
import ClockControls from './flip-clock/ClockControls';

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
        hours: [hrsStr[0], hrsStr[1]] as [string, string],
        minutes: [minsStr[0], minsStr[1]] as [string, string],
        seconds: [secsStr[0], secsStr[1]] as [string, string],
        prevHours: [prevHrsStr[0], prevHrsStr[1]] as [string, string],
        prevMinutes: [prevMinsStr[0], prevMinsStr[1]] as [string, string],
        prevSeconds: [prevSecsStr[0], prevSecsStr[1]] as [string, string],
      };
    } else {
      // Countdown mode (MM:SS) - use formatTime and convert to arrays
      const formatted = formatTime(time, prevTimeRef.current);
      return {
        hours: null,
        minutes: [formatted.minutes[0], formatted.minutes[1]] as [string, string],
        seconds: [formatted.seconds[0], formatted.seconds[1]] as [string, string],
        prevHours: null,
        prevMinutes: [formatted.prevMinutes[0], formatted.prevMinutes[1]] as [string, string],
        prevSeconds: [formatted.prevSeconds[0], formatted.prevSeconds[1]] as [string, string],
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
      <ClockBackground
        backgroundGradient={themeColors.backgroundGradient}
        closeButtonColor={themeColors.closeButtonText}
        onClose={onClose}
        theme={theme}
      />

      <PhaseIndicator
        phaseLabel={phaseLabel}
        phaseColor={phaseColors.primary}
      />

      <View style={styles.clockWrapper}>
        <ClockDisplay
          mode={mode}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          prevHours={prevHours}
          prevMinutes={prevMinutes}
          prevSeconds={prevSeconds}
          phaseColor={phaseColors.primary}
          themeColors={themeColors}
          soundEnabled={soundEnabled}
        />
      </View>

      {/* Control buttons - only show in countdown mode */}
      {mode === 'countdown' && (
        <ClockControls
          isRunning={isRunning}
          isPaused={isPaused}
          phaseColor={phaseColors.primary}
          controlButtonColor={themeColors.controlButtonText}
          theme={theme}
          onStart={onStart}
          onPause={onPause}
          onResume={onResume}
          onStop={onStop}
          onSkip={onStop}
        />
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
  clockWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(FlipClock);
