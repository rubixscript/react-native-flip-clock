/**
 * @component FlippingCard
 * @description Animated flapping card for flip digit animation
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DIMENSIONS } from '../../constants/dimensions';

interface FlippingCardProps {
  digit: string;
  position: 'top' | 'bottom';
  themeColors: {
    cardGradients: {
      top: readonly [string, string];
      bottom: readonly [string, string];
    };
    text: string;
  };
  flipAnim: Animated.Value;
  shadowAnim: Animated.Value;
  compact?: boolean;
}

const FlippingCard: React.FC<FlippingCardProps> = memo(({
  digit,
  position,
  themeColors,
  flipAnim,
  shadowAnim,
  compact = false
}) => {
  const isTop = position === 'top';
  const gradient = isTop ? themeColors.cardGradients.top : themeColors.cardGradients.bottom;

  // Rotation animation based on position
  const rotate = isTop
    ? flipAnim.interpolate({
        inputRange: [0, 0.3, 0.5, 1],
        outputRange: ['0deg', '-45deg', '-90deg', '-90deg'],
      })
    : flipAnim.interpolate({
        inputRange: [0, 0.5, 0.7, 1],
        outputRange: ['90deg', '90deg', '45deg', '0deg'],
      });

  // Z-index elevation during flip
  const flipElevation = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const gradientDirection = isTop ? { end: { x: 0, y: 1 } } : { end: { x: 0, y: 0 } };

  return (
    <Animated.View
      style={[
        isTop ? styles.flipCardTop : styles.flipCardBottom,
        {
          transform: [
            { perspective: 1200 },
            { rotateX: rotate },
            { scale: flipAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 1.02, 1],
            }) },
          ],
          zIndex: flipElevation as any,
          shadowOpacity: shadowAnim as any,
        },
      ]}
    >
      <LinearGradient
        colors={gradient}
        style={styles.cardGradient}
        {...gradientDirection}
      >
        <Text style={[
          styles.digitText,
          isTop ? styles.topText : styles.bottomText,
          { color: themeColors.text },
          compact && styles.digitTextCompact
        ]}>
          {digit}
        </Text>
      </LinearGradient>
      <Animated.View
        style={[
          styles.flipShadow,
          { opacity: shadowAnim }
        ]}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  flipCardTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backfaceVisibility: 'hidden' as any,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 15,
  },
  flipCardBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    overflow: 'hidden',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backfaceVisibility: 'hidden' as any,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 15,
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
  flipShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    pointerEvents: 'none',
  },
});

FlippingCard.displayName = 'FlippingCard';

export default FlippingCard;
