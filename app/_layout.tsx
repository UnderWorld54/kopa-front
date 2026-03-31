import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { KopaColors } from '@/constants/theme';

const KopaDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: KopaColors.background,
    card: KopaColors.surface,
    text: KopaColors.text,
    border: KopaColors.border,
    primary: KopaColors.accent,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={KopaDarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: KopaColors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="profile"
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="notifications"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="match/[id]"
          options={{ animation: 'slide_from_right' }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
