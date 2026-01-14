/**
 * @component ClockControls
 * @description Control buttons for countdown and stopwatch modes
 */

import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ClockMode, Lap } from '../../types';

interface ClockControlsProps {
  mode?: ClockMode;
  isRunning: boolean;
  isPaused: boolean;
  phaseColor: string;
  controlButtonColor: string;
  theme: 'light' | 'dark' | 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'glass' | 'modern' | 'minimal';
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onSkip?: () => void;
  onLap?: () => void;
  laps?: Lap[];
}

const ClockControls: React.FC<ClockControlsProps> = memo(({
  mode = 'countdown',
  isRunning,
  isPaused,
  phaseColor,
  controlButtonColor,
  theme,
  onStart,
  onPause,
  onResume,
  onStop,
  onSkip,
  onLap,
  laps = []
}) => {
  const handlePlayPausePress = () => {
    if (!isRunning || isPaused) {
      // Start or Resume
      if (isPaused) {
        onResume?.();
      } else {
        onStart?.();
      }
    } else {
      // Pause
      onPause?.();
    }
  };

  // For stopwatch mode, show lap button when running
  const showLapButton = mode === 'stopwatch' && isRunning && !isPaused;

  return (
    <View style={styles.controlsContainer}>
      {/* Left button - Reset/Stop */}
      <TouchableOpacity
        style={[
          styles.controlButton,
          { backgroundColor: theme === 'light' || theme === 'minimal' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' }
        ]}
        onPress={onStop}
      >
        <MaterialCommunityIcons
          name={isRunning ? 'stop' : 'refresh'}
          size={22}
          color={controlButtonColor}
        />
      </TouchableOpacity>

      {/* Center button - Play/Pause */}
      <TouchableOpacity
        style={[
          styles.playPauseButton,
          { backgroundColor: phaseColor }
        ]}
        onPress={handlePlayPausePress}
      >
        <MaterialCommunityIcons
          name={!isRunning || isPaused ? 'play' : 'pause'}
          size={28}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* Right button - Lap (stopwatch) or Skip (countdown) */}
      {showLapButton ? (
        <TouchableOpacity
          style={[
            styles.controlButton,
            styles.lapButton,
            { backgroundColor: 'rgba(139, 92, 246, 0.2)' }
          ]}
          onPress={onLap}
        >
          <MaterialCommunityIcons name="flag-checkered" size={22} color="#8B5CF6" />
          {laps.length > 0 && (
            <View style={styles.lapCountBadge}>
              <MaterialCommunityIcons name="flag" size={10} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.controlButton,
            { backgroundColor: theme === 'light' || theme === 'minimal' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' }
          ]}
          onPress={onSkip}
          disabled={mode === 'stopwatch'}
        >
          <MaterialCommunityIcons
            name={mode === 'stopwatch' ? 'flag-outline' : 'skip-next'}
            size={22}
            color={mode === 'stopwatch' ? (theme === 'light' || theme === 'minimal' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)') : controlButtonColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
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
  lapButton: {
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  lapCountBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
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

ClockControls.displayName = 'ClockControls';

export default ClockControls;
