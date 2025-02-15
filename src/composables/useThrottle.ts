import { onUnmounted } from 'vue';

function useThrottle<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: number | null = null;

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  });

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      return;
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay) as unknown as number;
  };
}

export default useThrottle;