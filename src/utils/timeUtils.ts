export interface FormattedTime {
  minutes: string;
  seconds: string;
  prevMinutes: string;
  prevSeconds: string;
}

export const formatTime = (currentTime: number, previousTime: number): FormattedTime => {
  const mins = Math.floor(currentTime / 60);
  const secs = currentTime % 60;
  const prevMins = Math.floor(previousTime / 60);
  const prevSecs = previousTime % 60;

  return {
    minutes: mins.toString().padStart(2, '0'),
    seconds: secs.toString().padStart(2, '0'),
    prevMinutes: prevMins.toString().padStart(2, '0'),
    prevSeconds: prevSecs.toString().padStart(2, '0'),
  };
};