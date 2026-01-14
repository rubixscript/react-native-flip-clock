/**
 * @module soundManager
 * @description Manages flip sound loading and playback
 */

import { Audio } from 'expo-av';

// Sound object - shared across all instances to avoid reloading
let flipSound: Audio.Sound | null = null;
let soundLoaded = false;
let isLoading = false;

/**
 * Load the flip sound asynchronously
 */
export const loadFlipSound = async (): Promise<void> => {
  // Return early if already loaded or currently loading
  if (soundLoaded || isLoading) return;

  isLoading = true;

  try {
    flipSound = new Audio.Sound();
    await flipSound.loadAsync(require('../../assets/flip.mp3'));
    soundLoaded = true;
  } catch (error) {
    // If loading fails, reset to allow retry
    soundLoaded = false;
    flipSound = null;
  } finally {
    isLoading = false;
  }
};

/**
 * Play the flip sound
 */
export const playFlipSound = async (): Promise<void> => {
  if (!flipSound || !soundLoaded) return;
  try {
    await flipSound.replayAsync();
  } catch (error) {
    // If playing fails, try reloading
    soundLoaded = false;
    flipSound = null;
  }
};

/**
 * Check if sound is loaded
 */
export const isSoundLoaded = (): boolean => soundLoaded;

/**
 * Check if sound is currently loading
 */
export const isSoundLoading = (): boolean => isLoading;
