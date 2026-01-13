/**
 * @component FlipDigit
 * @description Individual flip digit with smooth animation and sound
 */

import React, { memo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { FlipDigitProps } from '../types';
import { DIMENSIONS, ANIMATION_DURATION } from '../constants/dimensions';

// Sound object - shared across all instances to avoid reloading
let flipSound: Audio.Sound | null = null;
let soundLoaded = false;
let soundLoadingAttempted = false;

const loadFlipSound = async () => {
  if (soundLoaded || soundLoadingAttempted) return;
  soundLoadingAttempted = true;

  try {
    // Try to load the flip sound - will fail silently if file doesn't exist
    flipSound = new Audio.Sound();
    await flipSound.loadAsync(require('../../assets/flip.mp3'));
    soundLoaded = true;
  } catch (error) {
    // Sound file doesn't exist - silently continue without sound
    soundLoaded = false;
  }
};

const playFlipSound = async () => {
  if (!flipSound || !soundLoaded) return;
  try {
    await flipSound.replayAsync();
  } catch (error) {
    // Silently fail if sound can't play
  }
};

const FlipDigit: React.FC<FlipDigitProps> = memo(({ digit, prevDigit, phaseColor, themeColors, compact = false, soundEnabled = false }) => {
  const flipAnim = useRef(new Animated.Value(1)).current;
  const shadowAnim = useRef(new Animated.Value(0)).current;
  const hasPlayedSound = useRef(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      // Load sound if enabled
      if (soundEnabled && !soundLoaded) {
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
          // Easing for more natural flip
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

  // Enhanced flip angles with more realistic motion
  const topFlapRotate = flipAnim.interpolate({
    inputRange: [0, 0.3, 0.5, 1],
    outputRange: ['0deg', '-45deg', '-90deg', '-90deg'],
  });

  const bottomFlapRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.7, 1],
    outputRange: ['90deg', '90deg', '45deg', '0deg'],
  });

  // Dynamic shadow during flip
  const shadowOpacity = shadowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 0],
  });

  // Z-index elevation during flip
  const flipElevation = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={[styles.digitWrapper, compact && styles.digitWrapperCompact]}>
      <Animated.View style={[
        styles.digitContainer,
        compact && styles.digitContainerCompact,
        { shadowOpacity: Animated.add(0.4, Animated.multiply(shadowOpacity, 0.4)) as any }
      ]}>
        {/* Static top half - shows NEW digit (revealed after flip) */}
        <View style={styles.topHalf}>
          <LinearGradient
            colors={themeColors.cardGradients.top}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.topText, { color: themeColors.text }, compact && styles.digitTextCompact]}>{digit}</Text>
          </LinearGradient>
        </View>

        {/* Static bottom half - shows OLD digit (covered by flap) */}
        <View style={styles.bottomHalf}>
          <LinearGradient
            colors={themeColors.cardGradients.bottom}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.bottomText, { color: themeColors.text }, compact && styles.digitTextCompact]}>{prevDigit}</Text>
          </LinearGradient>
        </View>

        {/* Enhanced animated top flap - flips down showing OLD digit */}
        <Animated.View
          style={[
            styles.flipCardTop,
            {
              transform: [
                { perspective: 1200 },
                { rotateX: topFlapRotate },
                { scale: flipAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.02, 1],
                }) },
              ],
              zIndex: flipElevation as any,
              shadowOpacity: shadowOpacity as any,
            },
          ]}
        >
          <LinearGradient
            colors={themeColors.cardGradients.top}
            end={{ x: 0, y: 1 }}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.topText, { color: themeColors.text }, compact && styles.digitTextCompact]}>{prevDigit}</Text>
          </LinearGradient>
          {/* Dynamic shadow overlay */}
          <Animated.View
            style={[
              styles.flipShadow,
              { opacity: shadowAnim }
            ]}
          />
        </Animated.View>

        {/* Enhanced animated bottom flap - flips up showing NEW digit */}
        <Animated.View
          style={[
            styles.flipCardBottom,
            {
              transform: [
                { perspective: 1200 },
                { rotateX: bottomFlapRotate },
                { scale: flipAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.02, 1],
                }) },
              ],
              zIndex: flipElevation as any,
              shadowOpacity: shadowOpacity as any,
            },
          ]}
        >
          <LinearGradient
            colors={themeColors.cardGradients.bottom}
            end={{ x: 0, y: 0 }}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.bottomText, { color: themeColors.text }, compact && styles.digitTextCompact]}>{digit}</Text>
          </LinearGradient>
          {/* Dynamic shadow overlay */}
          <Animated.View
            style={[
              styles.flipShadow,
              { opacity: shadowAnim }
            ]}
          />
        </Animated.View>

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
  topText: {
    position: 'absolute',
    top: 0,
  },
  bottomText: {
    position: 'absolute',
    bottom: 0,
  },
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
  flipShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    pointerEvents: 'none',
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
  // Compact styles for clock mode
  digitWrapperCompact: {
    transform: [{ scale: 0.82 }],
  },
  digitContainerCompact: {
    width: DIMENSIONS.DIGIT_WIDTH * 0.82,
    height: DIMENSIONS.DIGIT_HEIGHT * 0.82,
    borderRadius: 8,
  },
  digitTextCompact: {
    fontSize: DIMENSIONS.FONT_SIZE * 0.82,
  },
});

FlipDigit.displayName = 'FlipDigit';

export default FlipDigit;
