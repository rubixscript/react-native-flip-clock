import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FlipClock from '../src/components/FlipClock';
import FlipClockModal from '../src/components/FlipClockModal';

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState('work');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [clockMode, setClockMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef(null);

  // Countdown timer logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
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
    switch (selectedPhase) {
      case 'work':
        setTime(25 * 60);
        break;
      case 'shortBreak':
        setTime(5 * 60);
        break;
      case 'longBreak':
        setTime(15 * 60);
        break;
    }
  };

  const handlePhaseChange = (phase) => {
    setSelectedPhase(phase);
    setIsRunning(false);
    setIsPaused(false);
    switch (phase) {
      case 'work':
        setTime(25 * 60);
        break;
      case 'shortBreak':
        setTime(5 * 60);
        break;
      case 'longBreak':
        setTime(15 * 60);
        break;
    }
  };

  const formatTimeDisplay = (seconds) => {
    if (clockMode) {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      const secs = now.getSeconds();
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update time display every second in clock mode
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (clockMode) {
      const interval = setInterval(() => setTick(t => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [clockMode]);

  return (
    <ScrollView style={[styles.scrollView, selectedTheme === 'light' && styles.scrollViewLight]}>
      <View style={styles.container}>
        <Text style={[styles.mainTitle, selectedTheme === 'light' && styles.textLight]}>
          Flip Clock Timer
        </Text>

        {/* Time Display */}
        <View style={[styles.timeDisplay, selectedTheme !== 'light' && styles.timeDisplayDark]}>
          <Text style={[styles.timeText, selectedTheme === 'light' && styles.textLight]}>
            {formatTimeDisplay(time)}
          </Text>
        </View>

        {/* Timer Controls - only show in countdown mode */}
        {!clockMode && (
          <View style={[styles.controlsContainer, selectedTheme !== 'light' && styles.controlsContainerDark]}>
            <View style={styles.buttonRow}>
              {!isRunning ? (
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: selectedTheme === 'light' ? '#7C3AED' : '#8B5CF6' }]}
                  onPress={handleStart}
                >
                  <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {!isPaused ? (
                    <TouchableOpacity
                      style={[styles.controlButton, { backgroundColor: '#F59E0B' }]}
                      onPress={handlePause}
                    >
                      <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.controlButton, { backgroundColor: '#10B981' }]}
                      onPress={handleResume}
                    >
                      <Text style={styles.buttonText}>Resume</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.controlButton, { backgroundColor: '#EF4444' }]}
                    onPress={handleStop}
                  >
                    <Text style={styles.buttonText}>Stop</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}

        {/* Settings */}
        <View style={[styles.settingsContainer, selectedTheme !== 'light' && styles.settingsContainerDark]}>
          <Text style={[styles.sectionTitle, selectedTheme === 'light' && styles.textLight]}>Settings</Text>

          <View style={[styles.settingRow, { flexDirection: 'column', alignItems: 'flex-start', paddingVertical: 16 }]}>
            <Text style={[styles.settingLabel, selectedTheme === 'light' && styles.textLight, { marginBottom: 12 }]}>Theme</Text>
            <View style={[styles.pickerContainer, selectedTheme !== 'light' && styles.pickerContainerDark, { width: '100%' }]}>
              <Picker
                selectedValue={selectedTheme}
                onValueChange={setSelectedTheme}
                style={[styles.picker, selectedTheme === 'light' && styles.pickerLight]}
                dropdownIconColor={selectedTheme !== 'light' ? '#FFFFFF' : '#000000'}
              >
                <Picker.Item label="Dark" value="dark" />
                <Picker.Item label="Light" value="light" />
                <Picker.Item label="Purple" value="purple" />
                <Picker.Item label="Blue" value="blue" />
                <Picker.Item label="Green" value="green" />
                <Picker.Item label="Orange" value="orange" />
                <Picker.Item label="Pink" value="pink" />
                <Picker.Item label="Glass" value="glass" />
                <Picker.Item label="Modern" value="modern" />
                <Picker.Item label="Minimal" value="minimal" />
              </Picker>
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, selectedTheme === 'light' && styles.textLight]}>Show Modal</Text>
            <Switch
              value={showModal}
              onValueChange={setShowModal}
              trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
              thumbColor={showModal ? '#8B5CF6' : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, selectedTheme === 'light' && styles.textLight]}>Clock Mode</Text>
            <Switch
              value={clockMode}
              onValueChange={setClockMode}
              trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
              thumbColor={clockMode ? '#8B5CF6' : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, selectedTheme === 'light' && styles.textLight]}>Flip Sound</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
              thumbColor={soundEnabled ? '#8B5CF6' : '#F3F4F6'}
            />
          </View>

          {!clockMode && (
            <View style={[styles.settingRow, { flexDirection: 'column', alignItems: 'flex-start', paddingVertical: 16 }]}>
              <Text style={[styles.settingLabel, selectedTheme === 'light' && styles.textLight, { marginBottom: 12 }]}>Timer Phase</Text>
            <View style={[styles.pickerContainer, selectedTheme !== 'light' && styles.pickerContainerDark, { width: '100%' }]}>
              <Picker
                selectedValue={selectedPhase}
                onValueChange={handlePhaseChange}
                style={[styles.picker, selectedTheme === 'light' && styles.pickerLight]}
                dropdownIconColor={selectedTheme !== 'light' ? '#FFFFFF' : '#000000'}
              >
                <Picker.Item label="Work Session (25 min)" value="work" />
                <Picker.Item label="Short Break (5 min)" value="shortBreak" />
                <Picker.Item label="Long Break (15 min)" value="longBreak" />
              </Picker>
            </View>
          </View>
          )}

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, selectedTheme === 'light' && styles.textLight]}>
              Status: {clockMode ? 'Clock' : (isRunning ? (isPaused ? 'Paused' : 'Running') : 'Stopped')}
            </Text>
          </View>
        </View>

        {/* Modal Button */}
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: selectedTheme === 'light' ? '#7C3AED' : '#8B5CF6' }]}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.modalButtonText}>Open Full Screen Flip Clock</Text>
        </TouchableOpacity>

        {/* Full Screen Modal */}
        <FlipClockModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          mode={clockMode ? 'clock' : 'countdown'}
          time={time}
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onStop={handleStop}
          phase={selectedPhase}
          theme={selectedTheme}
          soundEnabled={soundEnabled}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollViewLight: {
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  textLight: {
    color: '#1A1A1A',
  },
  timeDisplay: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    alignItems: 'center',
  },
  timeDisplayDark: {
    backgroundColor: '#1A1A1A',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#8B5CF6',
    fontFamily: 'monospace',
  },
  controlsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  controlsContainerDark: {
    backgroundColor: '#1A1A1A',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  settingsContainerDark: {
    backgroundColor: '#1A1A1A',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  pickerContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  pickerContainerDark: {
    backgroundColor: '#2A2A2A',
  },
  picker: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
  },
  pickerLight: {
    backgroundColor: '#F3F4F6',
    color: '#1A1A1A',
  },
  modalButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
