import { useSyncExternalStore } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

const wideQuery = '(min-width: 820px)';

function subscribe(onChange: () => void) {
  if (
    Platform.OS !== 'web' ||
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return () => {};
  }

  const mediaQuery = window.matchMedia(wideQuery);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

function getSnapshot() {
  return (
    Platform.OS === 'web' &&
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(wideQuery).matches
  );
}

export function useWideLayout() {
  const { width } = useWindowDimensions();
  const wideOnWeb = useSyncExternalStore(subscribe, getSnapshot, () => false);
  return Platform.OS === 'web' ? wideOnWeb : width >= 820;
}