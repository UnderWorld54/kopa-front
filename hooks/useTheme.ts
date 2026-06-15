import { useColorScheme } from "react-native";

import {
  darkColors,
  darkGradients,
  lightColors,
  lightGradients,
  type ThemeColors,
} from "@/constants/theme";

export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === "light" ? lightColors : darkColors;
}

export function useThemeGradients() {
  const scheme = useColorScheme();
  return scheme === "light" ? lightGradients : darkGradients;
}

export function useIsDark(): boolean {
  return useColorScheme() !== "light";
}
