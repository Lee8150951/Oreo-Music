/* Set a local storage solution with an expiration date */
const storage = {
  set(key: string, value: string) {
    localStorage.setItem(
      key,
      JSON.stringify({
        time: +new Date(),
        value,
      })
    );
  },
  get(key: string, cycle: number = 2592000000) {
    cycle = +cycle;
    if (isNaN(cycle)) cycle = 2592000000;
    const data = localStorage.getItem(key);
    if (data == null) return null;
    const { time, value } = JSON.parse(data);
    if (+new Date() - time > cycle) {
      storage.remove(key);
      return null;
    }
    return value;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};

const deepClone = (obj: Record<string, any>): any => {
  if (obj === null || typeof obj !== 'object') return obj;
  const newObj: Record<string, any> = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
};

// Millisecond conversion
const formatMillisecondsToMinutesSeconds = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export default {
  storage,
  deepClone,
  formatMillisecondsToMinutesSeconds,
};
