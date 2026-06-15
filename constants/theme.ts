import { Platform } from "react-native";

// --- Spacing scale (Tailwind 4px base) ---
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
} as const;

// --- Border radius ---
export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  "2xl": 26,
  full: 9999,
} as const;

// --- Font sizes ---
export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

// --- Raw palette (Tailwind zinc + emerald) ---
const p = {
  zinc50: "#FAFAFA",
  zinc100: "#F4F4F5",
  zinc200: "#E4E4E7",
  zinc300: "#D4D4D8",
  zinc400: "#A1A1AA",
  zinc500: "#71717A",
  zinc600: "#52525B",
  zinc700: "#3F3F46",
  zinc800: "#27272A",
  zinc900: "#18181B",
  zinc950: "#09090B",

  emerald400: "#34D399",
  emerald500: "#10B981",
  emerald600: "#059669",
  emerald700: "#047857",

  red500: "#EF4444",
  amber500: "#F59E0B",
  blue500: "#3B82F6",
  violet500: "#8B5CF6",
  orange500: "#F97316",
  teal500: "#14B8A6",
  gold: "#FFD700",
} as const;

// --- Theme color contract ---
export type ThemeColors = {
  background: string;
  surface: string;
  surfaceRaised: string;
  muted: string;
  border: string;
  ring: string;

  accent: string;
  accentDark: string;
  accentLight: string;
  accentMuted: string;

  text: string;
  textSecondary: string;
  textMuted: string;

  live: string;
  warning: string;
  info: string;
  purple: string;
  orange: string;
  teal: string;
  gold: string;

  tabBar: string;
  card: string;
};

export const darkColors: ThemeColors = {
  background: p.zinc950,
  surface: p.zinc900,
  surfaceRaised: "#1E1E23",
  muted: p.zinc800,
  border: p.zinc800,
  ring: p.zinc700,

  accent: p.emerald500,
  accentDark: p.emerald600,
  accentLight: p.emerald400,
  accentMuted: `${p.emerald500}15`,

  text: p.zinc50,
  textSecondary: p.zinc400,
  textMuted: p.zinc500,

  live: p.red500,
  warning: p.amber500,
  info: p.blue500,
  purple: p.violet500,
  orange: p.orange500,
  teal: p.teal500,
  gold: p.gold,

  tabBar: p.zinc900,
  card: p.zinc900,
};

export const lightColors: ThemeColors = {
  background: "#FFFFFF",
  surface: p.zinc50,
  surfaceRaised: p.zinc100,
  muted: p.zinc200,
  border: p.zinc200,
  ring: p.zinc300,

  accent: p.emerald600,
  accentDark: p.emerald700,
  accentLight: p.emerald500,
  accentMuted: `${p.emerald600}10`,

  text: p.zinc950,
  textSecondary: p.zinc600,
  textMuted: p.zinc400,

  live: p.red500,
  warning: p.amber500,
  info: p.blue500,
  purple: p.violet500,
  orange: p.orange500,
  teal: p.teal500,
  gold: p.gold,

  tabBar: "#FFFFFF",
  card: "#FFFFFF",
};

// --- Gradients per theme ---
export const darkGradients = {
  accent: [p.emerald500, p.emerald600] as const,
  surface: [p.zinc900, p.zinc950] as const,
  live: ["#EF4444", "#DC2626"] as const,
  welcome: [p.zinc950, "#101014", p.zinc900] as const,
};

export const lightGradients = {
  accent: [p.emerald500, p.emerald600] as const,
  surface: [p.zinc100, "#FFFFFF"] as const,
  live: ["#EF4444", "#DC2626"] as const,
  welcome: ["#FFFFFF", p.zinc50, p.zinc100] as const,
};

// Legacy compat (screens not yet migrated)
export const KopaColors = {
  ...darkColors,
  surfaceLight: "#1E1E23",
  error: "#EF4444",
};
export const KopaGradients = darkGradients;

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

// Fonts
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
