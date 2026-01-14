import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import FlipClock from '../src/components/FlipClock';
import FlipClockModal from '../src/components/FlipClockModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme gradients
const THEME_GRADIENTS = {
  dark: ['#0A0A0A', '#1A1A1A'],
  light: ['#F5F5F5', '#E8E8E8'],
  purple: ['#1A0A2E', '#2D1B4E'],
  blue: ['#0A1628', '#1A2D4E'],
  green: ['#0A1A0F', '#1A2E1E'],
  orange: ['#1A0F0A', '#2E1E12'],
  pink: ['#1A0A1A', '#2E1A2E'],
  glass: ['#0A0A0A', '#151515'],
  modern: ['#0F0F0F', '#1A1A1A'],
  minimal: ['#FFFFFF', '#F0F0F0'],
};

// Clean accent color
const ACCENT_COLOR = '#3B82F6'; // Blue accent
const ACCENT_COLOR_LIGHT = 'rgba(59, 130, 246, 0.15)';

// Format seconds to HH:MM:SS
const formatStopwatchTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function App() {
  // Timer state
  const [countdownTime, setCountdownTime] = useState(25 * 60);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(true);

  // Stopwatch laps
  const [laps, setLaps] = useState([]);

  // Settings
  const [selectedPhase, setSelectedPhase] = useState('work');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mode: 'countdown' | 'stopwatch' | 'clock'
  const [timerMode, setTimerMode] = useState('countdown');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const intervalRef = useRef(null);

  // Initial animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        if (timerMode === 'countdown') {
          setCountdownTime((prev) => {
            if (prev <= 1) {
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          });
        } else if (timerMode === 'stopwatch') {
          setStopwatchTime((prev) => prev + 1);
        }
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
  }, [isRunning, isPaused, timerMode]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setStopwatchTime(0);
    setLaps([]);
    resetCountdown();
  };

  const resetCountdown = () => {
    switch (selectedPhase) {
      case 'work':
        setCountdownTime(25 * 60);
        break;
      case 'shortBreak':
        setCountdownTime(5 * 60);
        break;
      case 'longBreak':
        setCountdownTime(15 * 60);
        break;
    }
  };

  const handleLap = () => {
    if (timerMode === 'stopwatch' && stopwatchTime > 0) {
      const prevLapTime = laps.length > 0 ? laps[0].totalTime : 0;
      setLaps([
        { id: Date.now(), lapTime: stopwatchTime - prevLapTime, totalTime: stopwatchTime },
        ...laps,
      ].slice(0, 10));
    }
  };

  const handleModeChange = (mode) => {
    setTimerMode(mode);
    setIsRunning(false);
    setIsPaused(false);
    setStopwatchTime(0);
    setLaps([]);
    if (mode === 'countdown') {
      resetCountdown();
    }
  };

  const handlePhaseChange = (phase) => {
    setSelectedPhase(phase);
    setIsRunning(false);
    setIsPaused(false);
    setTimerMode('countdown');
    switch (phase) {
      case 'work':
        setCountdownTime(25 * 60);
        break;
      case 'shortBreak':
        setCountdownTime(5 * 60);
        break;
      case 'longBreak':
        setCountdownTime(15 * 60);
        break;
    }
  };

  const getCurrentTime = () => {
    if (timerMode === 'stopwatch') {
      return formatStopwatchTime(stopwatchTime);
    }
    if (timerMode === 'clock') {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      const secs = now.getSeconds();
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    const mins = Math.floor(countdownTime / 60);
    const secs = countdownTime % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    if (timerMode === 'clock') return 'Clock Mode';
    if (timerMode === 'stopwatch') {
      if (isRunning && !isPaused) return 'Tracking...';
      if (isPaused) return 'Paused';
      return 'Ready';
    }
    if (isRunning && !isPaused) return 'Focusing...';
    if (isPaused) return 'Paused';
    return 'Ready';
  };

  const getStatusColor = () => {
    if (isRunning && !isPaused) return '#10B981';
    if (isPaused) return '#F59E0B';
    return '#6B7280';
  };

  const isLightTheme = selectedTheme === 'light' || selectedTheme === 'minimal';

  return (
    <View style={[styles.container, { backgroundColor: THEME_GRADIENTS[selectedTheme]?.[0] || '#0A0A0A' }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>
              {timerMode === 'stopwatch' ? '⏱ Stopwatch' : '⏰ Flip Clock'}
            </Text>
            <Text style={[styles.subtitle, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
              Beautiful animated time display
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
              <Text style={[styles.statusText, { color: getStatusColor() }]}>{getStatusText()}</Text>
            </View>
          </View>

          {/* Mode Selector */}
          <View style={[styles.card, { backgroundColor: isLightTheme ? '#FFFFFF' : '#1A1A2E' }]}>
            <Text style={[styles.cardTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Mode</Text>
            <View style={styles.modeButtons}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  timerMode === 'countdown' && styles.modeButtonActive,
                  timerMode === 'countdown' && { backgroundColor: ACCENT_COLOR },
                ]}
                onPress={() => handleModeChange('countdown')}
              >
                <Text style={[styles.modeButtonText, { color: timerMode === 'countdown' ? '#FFFFFF' : isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Timer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  timerMode === 'stopwatch' && styles.modeButtonActive,
                  timerMode === 'stopwatch' && { backgroundColor: ACCENT_COLOR },
                ]}
                onPress={() => handleModeChange('stopwatch')}
              >
                <Text style={[styles.modeButtonText, { color: timerMode === 'stopwatch' ? '#FFFFFF' : isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Stopwatch
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  timerMode === 'clock' && styles.modeButtonActive,
                  timerMode === 'clock' && { backgroundColor: ACCENT_COLOR },
                ]}
                onPress={() => handleModeChange('clock')}
              >
                <Text style={[styles.modeButtonText, { color: timerMode === 'clock' ? '#FFFFFF' : isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Clock
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Time Display */}
          <View style={[styles.timeDisplay, { backgroundColor: isLightTheme ? '#FFFFFF' : '#1A1A2E' }]}>
            <Text style={[styles.timeText, { color: ACCENT_COLOR }]}>
              {getCurrentTime()}
            </Text>
          </View>

          {/* Controls */}
          {timerMode !== 'clock' && (
            <View style={[styles.card, { backgroundColor: isLightTheme ? '#FFFFFF' : '#1A1A2E' }]}>
              <Text style={[styles.cardTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Controls</Text>
              <View style={styles.controlsRow}>
                {!isRunning ? (
                  <TouchableOpacity
                    style={[styles.controlButton, styles.controlButtonPrimary]}
                    onPress={handleStart}
                  >
                    <Text style={styles.controlButtonText}>▶ Start</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    {!isPaused ? (
                      <TouchableOpacity
                        style={[styles.controlButton, styles.controlButtonWarning]}
                        onPress={handlePause}
                      >
                        <Text style={styles.controlButtonText}>⏸ Pause</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[styles.controlButton, styles.controlButtonSuccess]}
                        onPress={handleResume}
                      >
                        <Text style={styles.controlButtonText}>▶ Resume</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={[styles.controlButton, styles.controlButtonDanger]}
                      onPress={handleStop}
                    >
                      <Text style={styles.controlButtonText}>⏹ Stop</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              {timerMode === 'stopwatch' && isRunning && !isPaused && (
                <TouchableOpacity
                  style={[styles.controlButton, styles.controlButtonSecondary, styles.lapButton]}
                  onPress={handleLap}
                >
                  <Text style={styles.controlButtonText}>🏁 Lap</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Laps */}
          {timerMode === 'stopwatch' && laps.length > 0 && (
            <View style={[styles.card, { backgroundColor: isLightTheme ? '#FFFFFF' : '#1A1A2E' }]}>
              <Text style={[styles.cardTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Laps</Text>
              {laps.map((lap, index) => (
                <View key={lap.id} style={styles.lapRow}>
                  <Text style={[styles.lapNumber, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                    {laps.length - index}
                  </Text>
                  <Text style={[styles.lapTime, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>
                    +{formatStopwatchTime(lap.lapTime)}
                  </Text>
                  <Text style={[styles.lapTotal, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                    {formatStopwatchTime(lap.totalTime)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Settings */}
          <View style={[styles.card, { backgroundColor: isLightTheme ? '#FFFFFF' : '#1A1A2E' }]}>
            <Text style={[styles.cardTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Settings</Text>

            {/* Theme Picker */}
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Theme</Text>
              <View style={[styles.pickerContainer, { backgroundColor: isLightTheme ? '#F3F4F6' : '#2A2A3E' }]}>
                <Picker
                  selectedValue={selectedTheme}
                  onValueChange={setSelectedTheme}
                  style={styles.picker}
                  dropdownIconColor={isLightTheme ? '#1A1A1A' : '#FFFFFF'}
                  mode="dropdown"
                >
                  <Picker.Item label="Purple" value="purple" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Dark" value="dark" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Light" value="light" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Blue" value="blue" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Green" value="green" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Orange" value="orange" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Pink" value="pink" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Glass" value="glass" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Modern" value="modern" style={{ color: '#1A1A1A' }} />
                  <Picker.Item label="Minimal" value="minimal" style={{ color: '#1A1A1A' }} />
                </Picker>
              </View>
            </View>

            {/* Phase Picker - only for countdown */}
            {timerMode === 'countdown' && (
              <View style={styles.settingRow}>
                <Text style={[styles.settingLabel, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Timer Phase</Text>
                <View style={[styles.pickerContainer, { backgroundColor: isLightTheme ? '#F3F4F6' : '#2A2A3E' }]}>
                  <Picker
                    selectedValue={selectedPhase}
                    onValueChange={handlePhaseChange}
                    style={styles.picker}
                    dropdownIconColor={isLightTheme ? '#1A1A1A' : '#FFFFFF'}
                    mode="dropdown"
                  >
                    <Picker.Item label="Focus (25m)" value="work" style={{ color: '#1A1A1A' }} />
                    <Picker.Item label="Short Break (5m)" value="shortBreak" style={{ color: '#1A1A1A' }} />
                    <Picker.Item label="Long Break (15m)" value="longBreak" style={{ color: '#1A1A1A' }} />
                  </Picker>
                </View>
              </View>
            )}

            {/* Switches */}
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Flip Sound</Text>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                thumbColor={soundEnabled ? '#3B82F6' : '#F3F4F6'}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Full Screen Modal</Text>
              <Switch
                value={showModal}
                onValueChange={setShowModal}
                trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                thumbColor={showModal ? '#3B82F6' : '#F3F4F6'}
              />
            </View>
          </View>

          {/* Features */}
          <View style={[styles.card, { backgroundColor: isLightTheme ? '#FFFFFF' : '#1A1A2E' }]}>
            <Text style={[styles.cardTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>Features</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✨</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>
                  Smooth Flip Animation
                </Text>
                <Text style={[styles.featureDesc, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Beautiful 3D flip animation on every digit change
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎨</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>
                  10 Beautiful Themes
                </Text>
                <Text style={[styles.featureDesc, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Dark, light, and colorful themes to match your style
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⏱</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>
                  Stopwatch with Laps
                </Text>
                <Text style={[styles.featureDesc, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Track time with lap functionality for intervals
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔊</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>
                  Optional Flip Sound
                </Text>
                <Text style={[styles.featureDesc, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Satisfying mechanical flip sound effect
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: isLightTheme ? '#1A1A1A' : '#FFFFFF' }]}>
                  Full Screen Modal
                </Text>
                <Text style={[styles.featureDesc, { color: isLightTheme ? '#6B7280' : '#9CA3AF' }]}>
                  Immersive landscape mode experience
                </Text>
              </View>
            </View>
          </View>

          {/* Modal Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowModal(true)}
          >
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>🖥 Open Full Screen Flip Clock</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>

      {/* Full Screen Modal */}
      <FlipClockModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        mode={timerMode}
        time={timerMode === 'stopwatch' ? stopwatchTime : countdownTime}
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        onLap={handleLap}
        laps={laps}
        phase={selectedPhase}
        theme={selectedTheme}
        soundEnabled={soundEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  modeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  modeButtonActive: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modeButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  timeDisplay: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  controlButtonPrimary: {
    backgroundColor: '#3B82F6',
  },
  controlButtonSuccess: {
    backgroundColor: '#10B981',
  },
  controlButtonWarning: {
    backgroundColor: '#F59E0B',
  },
  controlButtonDanger: {
    backgroundColor: '#EF4444',
  },
  controlButtonSecondary: {
    backgroundColor: '#2563EB',
    marginTop: 12,
  },
  lapButton: {
    paddingVertical: 14,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  lapNumber: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
  },
  lapTime: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  lapTotal: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  pickerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 160,
  },
  picker: {
    height: 50,
    width: 160,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  modalButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
