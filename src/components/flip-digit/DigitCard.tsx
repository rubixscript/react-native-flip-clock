/**
 * @component DigitCard
 * @description Static top/bottom card display for flip digit (non-animated parts)
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DIMENSIONS } from '../../constants/dimensions';

interface DigitCardProps {
  digit: string;
  position: 'top' | 'bottom';
  themeColors: {
    cardGradients: {
      top: readonly [string, string];
      bottom: readonly [string, string];
    };
    text: string;
  };
  compact?: boolean;
}

const DigitCard: React.FC<DigitCardProps> = memo(({ digit, position, themeColors, compact = false }) => {
  const isTop = position === 'top';
  const gradient = isTop ? themeColors.cardGradients.top : themeColors.cardGradients.bottom;
  const gradientDirection = isTop ? { end: { x: 0, y: 1 } } : { end: { x: 0, y: 0 } };

  return (
    <View style={[isTop ? styles.topHalf : styles.bottomHalf]}>
      <LinearGradient colors={gradient} style={styles.cardGradient} {...gradientDirection}>
        <Text style={[
          styles.digitText,
          isTop ? styles.topText : styles.bottomText,
          { color: themeColors.text },
          compact && styles.digitTextCompact
        ]}>
          {digit}
        </Text>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
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
    fontSize: DIMENSIONS.FONT_SIZE,
    fontWeight: '300',
    fontVariant: ['tabular-nums'] as any,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  digitTextCompact: {
    fontSize: DIMENSIONS.FONT_SIZE * 0.82,
  },
  topText: {
    position: 'absolute',
    top: 0,
  },
  bottomText: {
    position: 'absolute',
    bottom: 0,
  },
});

DigitCard.displayName = 'DigitCard';

export default DigitCard;
