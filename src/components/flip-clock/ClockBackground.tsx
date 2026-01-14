/**
 * @component ClockBackground
 * @description Background gradient and close button for flip clock
 */

import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ClockBackgroundProps {
  backgroundGradient: readonly (string | number)[];
  closeButtonColor: string;
  onClose?: () => void;
  theme: 'light' | 'dark' | 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'glass' | 'modern' | 'minimal';
}

const ClockBackground: React.FC<ClockBackgroundProps> = memo(({
  backgroundGradient,
  closeButtonColor,
  onClose,
  theme
}) => {
  return (
    <>
      <LinearGradient
        colors={backgroundGradient as any}
        style={StyleSheet.absoluteFill}
      />

      <TouchableOpacity
        style={[
          styles.closeButton,
          { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)' }
        ]}
        onPress={onClose}
      >
        <MaterialCommunityIcons name="close" size={24} color={closeButtonColor} />
      </TouchableOpacity>
    </>
  );
});

const styles = StyleSheet.create({
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
});

ClockBackground.displayName = 'ClockBackground';

export default ClockBackground;
