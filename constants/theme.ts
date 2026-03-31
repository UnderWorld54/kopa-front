import { Platform } from 'react-native';

export const KopaColors = {
  background: '#0F1724',
  surface: '#1A2540',
  surfaceLight: '#243050',
  tabBar: '#16213A',
  accent: '#4BAF7A',
  accentDark: '#3A9165',
  accentLight: '#5DC98E',
  text: '#FFFFFF',
  textSecondary: '#C8D3E0',
  textMuted: '#7A8CA0',
  border: '#2A3A55',
  live: '#FF4757',
  warning: '#F59E0B',
  error: '#EF4444',
  purple: '#8B5CF6',
  orange: '#F97316',
  teal: '#10B981',
  gold: '#FFD700',
};

export const KopaGradients = {
  accent: ['#4BAF7A', '#3A9165'] as const,
  surface: ['#1A2540', '#162035'] as const,
  header: ['#0F1724', '#1A2540'] as const,
  live: ['#FF4757', '#E0313F'] as const,
  gold: ['#FFD700', '#F59E0B'] as const,
  purple: ['#8B5CF6', '#6D28D9'] as const,
  welcome: ['#0F1724', '#162540', '#1A3050'] as const,
};

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
