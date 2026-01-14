/**
 * @component PhaseIndicator
 * @description Phase label and indicator for flip clock
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PhaseIndicatorProps {
  phaseLabel: string;
  phaseColor: string;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = memo(({ phaseLabel, phaseColor }) => {
  return (
    <View style={styles.phaseContainer}>
      <Text style={[styles.phaseText, { color: phaseColor }]}>
        {phaseLabel}
      </Text>
      <View style={[styles.phaseIndicator, { backgroundColor: phaseColor }]} />
    </View>
  );
});

const styles = StyleSheet.create({
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
});

PhaseIndicator.displayName = 'PhaseIndicator';

export default PhaseIndicator;
