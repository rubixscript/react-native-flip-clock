/**
 * @component FlipDigit
 * @description Individual flip digit with smooth animation
 */

import React, { memo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlipDigitProps } from '../types';
import { DIMENSIONS, ANIMATION_DURATION } from '../constants/dimensions';

const FlipDigit: React.FC<FlipDigitProps> = memo(({ digit, prevDigit, phaseColor, themeColors }) => {
  const flipAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (digit !== prevDigit) {
      flipAnim.setValue(0);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [digit, prevDigit, flipAnim]);

  // Top flap flips down (old digit disappears)
  const topFlapRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '-90deg', '-90deg'],
  });

  // Bottom flap flips up (new digit appears)
  const bottomFlapRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['90deg', '90deg', '0deg'],
  });

  return (
    <View style={styles.digitWrapper}>
      <View style={styles.digitContainer}>
        {/* Static top half - shows NEW digit (revealed after flip) */}
        <View style={styles.topHalf}>
          <LinearGradient
            colors={themeColors.cardGradients.top}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.topText, { color: themeColors.text }]}>{digit}</Text>
          </LinearGradient>
        </View>

        {/* Static bottom half - shows OLD digit (covered by flap) */}
        <View style={styles.bottomHalf}>
          <LinearGradient
            colors={themeColors.cardGradients.bottom}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.bottomText, { color: themeColors.text }]}>{prevDigit}</Text>
          </LinearGradient>
        </View>

        {/* Animated top flap - flips down showing OLD digit */}
        <Animated.View
          style={[
            styles.flipCardTop,
            {
              transform: [
                { perspective: 1000 },
                { rotateX: topFlapRotate },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={themeColors.cardGradients.top}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.topText, { color: themeColors.text }]}>{prevDigit}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Animated bottom flap - flips up showing NEW digit */}
        <Animated.View
          style={[
            styles.flipCardBottom,
            {
              transform: [
                { perspective: 1000 },
                { rotateX: bottomFlapRotate },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={themeColors.cardGradients.bottom}
            style={styles.cardGradient}
          >
            <Text style={[styles.digitText, styles.bottomText, { color: themeColors.text }]}>{digit}</Text>
          </LinearGradient>
        </Animated.View>

        {/* Center divider line */}
        <View style={[styles.dividerLine, { backgroundColor: themeColors.dividerLine }]} />

        {/* Highlight effect on top */}
        <View style={styles.topHighlight} />
      </View>
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
    fontVariant: ['tabular-nums'],
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
    backfaceVisibility: 'hidden',
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
    backfaceVisibility: 'hidden',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

FlipDigit.displayName = 'FlipDigit';

export default FlipDigit;