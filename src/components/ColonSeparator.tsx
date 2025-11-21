/**
 * @component ColonSeparator
 * @description Colon separator for flip clock display
 */

import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { DIMENSIONS } from '../constants/dimensions';

interface ColonSeparatorProps {
  color: string;
}

const ColonSeparator: React.FC<ColonSeparatorProps> = memo(({ color }) => {
  return (
    <View style={styles.colonContainer}>
      <View style={[styles.colonDot, { backgroundColor: color }]} />
      <View style={[styles.colonDot, { backgroundColor: color }]} />
    </View>
  );
});

const styles = StyleSheet.create({
  colonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: DIMENSIONS.DIGIT_HEIGHT * 0.2,
    marginHorizontal: 4,
  },
  colonDot: {
    width: DIMENSIONS.COLON_SIZE,
    height: DIMENSIONS.COLON_SIZE,
    borderRadius: DIMENSIONS.COLON_SIZE / 2,
  },
});

ColonSeparator.displayName = 'ColonSeparator';

export default ColonSeparator;