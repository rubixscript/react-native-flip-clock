/**
 * @component ClockDisplay
 * @description Clock digit display with flip digits and colons
 */

import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { DIMENSIONS } from '../../constants/dimensions';
import { ThemeColors } from '../../types';
import FlipDigit from '../FlipDigit';
import ColonSeparator from '../ColonSeparator';

interface ClockDisplayProps {
  mode: 'countdown' | 'clock';
  hours: [string, string] | null;
  minutes: [string, string];
  seconds: [string, string];
  prevHours: [string, string] | null;
  prevMinutes: [string, string];
  prevSeconds: [string, string];
  phaseColor: string;
  themeColors: ThemeColors;
  soundEnabled: boolean;
}

const ClockDisplay: React.FC<ClockDisplayProps> = memo(({
  mode,
  hours,
  minutes,
  seconds,
  prevHours,
  prevMinutes,
  prevSeconds,
  phaseColor,
  themeColors,
  soundEnabled
}) => {
  const compact = mode === 'clock';

  return (
    <View style={[styles.clockContainer, compact && styles.clockContainerCompact]}>
      {/* Hours - only show in clock mode */}
      {mode === 'clock' && hours && prevHours && (
        <>
          <FlipDigit
            digit={hours[0]}
            prevDigit={prevHours[0]}
            phaseColor={phaseColor}
            themeColors={themeColors}
            compact={true}
            soundEnabled={soundEnabled}
          />
          <FlipDigit
            digit={hours[1]}
            prevDigit={prevHours[1]}
            phaseColor={phaseColor}
            themeColors={themeColors}
            compact={true}
            soundEnabled={soundEnabled}
          />

          <ColonSeparator color={phaseColor} compact={true} />
        </>
      )}

      {/* Minutes */}
      <FlipDigit
        digit={minutes[0]}
        prevDigit={prevMinutes[0]}
        phaseColor={phaseColor}
        themeColors={themeColors}
        compact={compact}
        soundEnabled={soundEnabled}
      />
      <FlipDigit
        digit={minutes[1]}
        prevDigit={prevMinutes[1]}
        phaseColor={phaseColor}
        themeColors={themeColors}
        compact={compact}
        soundEnabled={soundEnabled}
      />

      {/* Colon separator */}
      <ColonSeparator color={phaseColor} compact={compact} />

      {/* Seconds */}
      <FlipDigit
        digit={seconds[0]}
        prevDigit={prevSeconds[0]}
        phaseColor={phaseColor}
        themeColors={themeColors}
        compact={compact}
        soundEnabled={soundEnabled}
      />
      <FlipDigit
        digit={seconds[1]}
        prevDigit={prevSeconds[1]}
        phaseColor={phaseColor}
        themeColors={themeColors}
        compact={compact}
        soundEnabled={soundEnabled}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMENSIONS.GAP,
  },
  clockContainerCompact: {
    gap: 2,
  },
});

ClockDisplay.displayName = 'ClockDisplay';

export default ClockDisplay;
