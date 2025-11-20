import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import FlipClock from '@rubixscript/react-native-flip-clock';

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  return (
    <View style={styles.container}>
      <FlipClock
        time={time}
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onStop={() => {
          setIsRunning(false);
          setIsPaused(false);
          setTime(25 * 60);
        }}
        onClose={() => {}}
        phase="work"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
