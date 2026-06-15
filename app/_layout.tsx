import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

import { darkColors, lightColors } from "@/constants/theme";

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme !== "light";
  const colors = isDark ? darkColors : lightColors;

  const theme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: colors.accent,
    },
  };

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="profile"
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="match/[id]" />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </ThemeProvider>
  );
}
