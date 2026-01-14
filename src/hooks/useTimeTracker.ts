/**
 * @module useTimeTracker
 * @description Custom hook for tracking time in stopwatch mode with lap functionality
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Lap, TimeSession, TimerPhase } from '../types';

export interface UseTimeTrackerOptions {
  /** Callback when a session completes */
  onSessionComplete?: (session: TimeSession) => void;
  /** Maximum number of laps to keep (default: 10) */
  maxLaps?: number;
  /** Auto-save sessions to storage (requires AsyncStorage) */
  autoSave?: boolean;
  /** Storage key for sessions */
  storageKey?: string;
}

export interface UseTimeTrackerReturn {
  /** Current elapsed time in seconds */
  elapsedSeconds: number;
  /** Whether the tracker is currently running */
  isRunning: boolean;
  /** Whether the tracker is paused */
  isPaused: boolean;
  /** Recorded laps */
  laps: Lap[];
  /** Start the tracker */
  start: () => void;
  /** Pause the tracker */
  pause: () => void;
  /** Resume from pause */
  resume: () => void;
  /** Stop and complete the session */
  stop: () => void;
  /** Reset the tracker */
  reset: () => void;
  /** Record a lap */
  recordLap: () => void;
  /** Clear all laps */
  clearLaps: () => void;
  /** Get formatted time string */
  getFormattedTime: () => string;
}

/**
 * Formats seconds into HH:MM:SS format
 */
export const formatStopwatchTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Custom hook for tracking time with stopwatch functionality
 *
 * @example
 * ```tsx
 * const tracker = useTimeTracker({
 *   onSessionComplete: (session) => console.log('Session:', session),
 *   maxLaps: 10,
 * });
 *
 * <TouchableOpacity onPress={tracker.start}>
 *   <Text>{tracker.getFormattedTime()}</Text>
 * </TouchableOpacity>
 * ```
 */
export const useTimeTracker = (options: UseTimeTrackerOptions = {}): UseTimeTrackerReturn => {
  const {
    onSessionComplete,
    maxLaps = 10,
    autoSave = false,
    storageKey = '@fliplib_sessions',
  } = options;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const lastLapTimeRef = useRef<number>(0);

  // Timer tick effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  // Start the tracker
  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    setElapsedSeconds(0);
    setLaps([]);
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
    lastLapTimeRef.current = 0;
  }, []);

  // Pause the tracker
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume from pause
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Stop and complete the session
  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);

    if (startTimeRef.current && elapsedSeconds > 0) {
      const session: TimeSession = {
        id: `session-${Date.now()}`,
        type: 'stopwatch',
        duration: elapsedSeconds,
        laps: laps.length > 0 ? laps : undefined,
        startTime: startTimeRef.current,
        endTime: Date.now(),
      };

      onSessionComplete?.(session);

      // Auto-save if enabled
      if (autoSave) {
        saveSession(session, storageKey).catch(console.error);
      }
    }

    // Reset state
    setElapsedSeconds(0);
    setLaps([]);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    lastLapTimeRef.current = 0;
  }, [elapsedSeconds, laps, onSessionComplete, autoSave, storageKey]);

  // Reset the tracker
  const reset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    setLaps([]);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    lastLapTimeRef.current = 0;
  }, []);

  // Record a lap
  const recordLap = useCallback(() => {
    if (!isRunning || isPaused) return;

    const lapTime = elapsedSeconds - lastLapTimeRef.current;
    const newLap: Lap = {
      id: Date.now(),
      lapTime,
      totalTime: elapsedSeconds,
      timestamp: Date.now(),
    };

    setLaps((prev) => [newLap, ...prev].slice(0, maxLaps));
    lastLapTimeRef.current = elapsedSeconds;
  }, [isRunning, isPaused, elapsedSeconds, maxLaps]);

  // Clear all laps
  const clearLaps = useCallback(() => {
    setLaps([]);
    lastLapTimeRef.current = 0;
  }, []);

  // Get formatted time string
  const getFormattedTime = useCallback(() => {
    return formatStopwatchTime(elapsedSeconds);
  }, [elapsedSeconds]);

  return {
    elapsedSeconds,
    isRunning,
    isPaused,
    laps,
    start,
    pause,
    resume,
    stop,
    reset,
    recordLap,
    clearLaps,
    getFormattedTime,
  };
};

/**
 * Save a session to AsyncStorage (optional utility)
 * Note: This requires @react-native-async-storage/async-storage to be installed
 */
async function saveSession(session: TimeSession, storageKey: string): Promise<void> {
  try {
    // Dynamic import to avoid requiring the package
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const existingData = await AsyncStorage.getItem(storageKey);
    const sessions: TimeSession[] = existingData ? JSON.parse(existingData) : [];
    const updatedSessions = [session, ...sessions].slice(0, 100); // Keep last 100
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedSessions));
  } catch (error) {
    console.warn('AsyncStorage not available or save failed:', error);
  }
}

/**
 * Load sessions from AsyncStorage (optional utility)
 */
export async function loadSessions(storageKey: string = '@fliplib_sessions'): Promise<TimeSession[]> {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const existingData = await AsyncStorage.getItem(storageKey);
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.warn('AsyncStorage not available or load failed:', error);
    return [];
  }
}

/**
 * Clear all sessions from AsyncStorage (optional utility)
 */
export async function clearSessions(storageKey: string = '@fliplib_sessions'): Promise<void> {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.removeItem(storageKey);
  } catch (error) {
    console.warn('AsyncStorage not available or clear failed:', error);
  }
}
