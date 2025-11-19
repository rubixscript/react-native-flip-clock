/**
 * @component FlipClockModal
 * @description Full-screen modal wrapper for the FlipClock component
 * Locks orientation to landscape when opened
 */

import React, { memo, useEffect } from 'react';
import { Modal, StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import FlipClock from './FlipClock';
import { FlipClockModalProps } from '../types';

const FlipClockModal: React.FC<FlipClockModalProps> = ({
  visible,
  onClose,
  time,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
  phase,
}) => {
  useEffect(() => {
    const lockLandscape = async () => {
      if (visible) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      }
    };

    lockLandscape();

    return () => {
      // Restore portrait on unmount
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, [visible]);

  const handleClose = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <StatusBar hidden />
      <FlipClock
        time={time}
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={onStart}
        onPause={onPause}
        onResume={onResume}
        onStop={onStop}
        onClose={handleClose}
        phase={phase}
      />
    </Modal>
  );
};

export default memo(FlipClockModal);