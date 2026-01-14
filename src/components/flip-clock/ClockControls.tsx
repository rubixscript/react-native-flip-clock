/**
 * @component ClockControls
 * @description Control buttons for countdown mode (reset, play/pause, skip)
 */

import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ClockControlsProps {
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
}

const ClockControls: React.FC<ClockControlsProps> = memo(({
  isRunning,
  isPaused,
  phaseColor,
  controlButtonColor,
  theme,
  onStart,
  onPause,
  onResume,
  onStop,
  onSkip
}) => {
  const handlePlayPausePress = () => {
    if (!isRunning || isPaused) {
      onStart?.();
    } else {
      onPause?.();
    }
  };

  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity
        style={[
          styles.controlButton,
          { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)' }
        ]}
        onPress={onStop}
      >
        <MaterialCommunityIcons name="refresh" size={22} color={controlButtonColor} />
      </TouchableOpacity>

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

      <TouchableOpacity
        style={[
          styles.controlButton,
          { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)' }
        ]}
        onPress={onSkip}
      >
        <MaterialCommunityIcons name="skip-next" size={22} color={controlButtonColor} />
      </TouchableOpacity>
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
