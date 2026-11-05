import '@/global.css';
import { Stack } from 'expo-router';

import { StoreProvider } from '@/components/storefront/store-context';

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </StoreProvider>
  );
}
