/**
 * @component FlipDigit
 * @description Individual flip digit with smooth animation and sound
 */

import React, { memo, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { FlipDigitProps } from '../types';
import { DIMENSIONS, ANIMATION_DURATION } from '../constants/dimensions';
import { loadFlipSound, playFlipSound } from './flip-digit/soundManager';
import DigitCard from './flip-digit/DigitCard';
import FlippingCard from './flip-digit/FlippingCard';

const FlipDigit: React.FC<FlipDigitProps> = memo(({
  digit,
  prevDigit,
  phaseColor,
  themeColors,
  compact = false,
  soundEnabled = false
}) => {
  const flipAnim = useRef(new Animated.Value(1)).current;
  const shadowAnim = useRef(new Animated.Value(0)).current;
  const hasPlayedSound = useRef(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      // Load sound if enabled
      if (soundEnabled) {
        loadFlipSound();
      }

      flipAnim.setValue(0);
      shadowAnim.setValue(0);
      hasPlayedSound.current = false;

      // Enhanced animation with easing
      Animated.parallel([
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(shadowAnim, {
            toValue: 1,
            duration: ANIMATION_DURATION * 0.5,
            useNativeDriver: true,
          }),
          Animated.timing(shadowAnim, {
            toValue: 0,
            duration: ANIMATION_DURATION * 0.5,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        hasPlayedSound.current = true;
      });

      // Play sound at the midpoint of animation
      if (soundEnabled) {
        setTimeout(() => {
          if (!hasPlayedSound.current) {
            playFlipSound();
            hasPlayedSound.current = true;
          }
        }, ANIMATION_DURATION * 0.3);
      }
    }
  }, [digit, prevDigit, flipAnim, shadowAnim, soundEnabled]);

  // Dynamic shadow during flip
  const shadowOpacity = shadowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 0],
  });

  return (
    <View style={[styles.digitWrapper, compact && styles.digitWrapperCompact]}>
      <Animated.View style={[
        styles.digitContainer,
        compact && styles.digitContainerCompact,
        { shadowOpacity: Animated.add(0.4, Animated.multiply(shadowOpacity, 0.4)) as any }
      ]}>
        {/* Static top half - shows NEW digit (revealed after flip) */}
        <DigitCard digit={digit} position="top" themeColors={themeColors} compact={compact} />

        {/* Static bottom half - shows OLD digit (covered by flap) */}
        <DigitCard digit={prevDigit} position="bottom" themeColors={themeColors} compact={compact} />

        {/* Animated top flap - flips down showing OLD digit */}
        <FlippingCard
          digit={prevDigit}
          position="top"
          themeColors={themeColors}
          flipAnim={flipAnim}
          shadowAnim={shadowAnim}
          compact={compact}
        />

        {/* Animated bottom flap - flips up showing NEW digit */}
        <FlippingCard
          digit={digit}
          position="bottom"
          themeColors={themeColors}
          flipAnim={flipAnim}
          shadowAnim={shadowAnim}
          compact={compact}
        />

        {/* Center divider line */}
        <View style={[styles.dividerLine, { backgroundColor: themeColors.dividerLine }]} />

        {/* Highlight effect on top */}
        <View style={styles.topHighlight} />

        {/* Side highlight for depth */}
        <View style={styles.sideHighlight} />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  digitWrapper: {
    position: 'relative',
  },
  digitContainer: {
    width: DIMENSIONS.DIGIT_WIDTH,
    height: DIMENSIONS.DIGIT_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  dividerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    marginTop: -1,
    zIndex: 10,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sideHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  digitWrapperCompact: {
    transform: [{ scale: 0.82 }],
  },
  digitContainerCompact: {
    width: DIMENSIONS.DIGIT_WIDTH * 0.82,
    height: DIMENSIONS.DIGIT_HEIGHT * 0.82,
    borderRadius: 8,
  },
});

FlipDigit.displayName = 'FlipDigit';

export default FlipDigit;
