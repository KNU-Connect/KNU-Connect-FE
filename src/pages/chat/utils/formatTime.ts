export const formatTime = (timestamp: string): string => {
  if (!timestamp) {
    return '--:--';
  }
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return '--:--';
  }
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
