import { View, type ViewStyle } from "react-native";

import { useThemeColors } from "@/hooks/useTheme";

export function Separator({ style }: { style?: ViewStyle }) {
  const colors = useThemeColors();
  return (
    <View style={[{ height: 1, backgroundColor: colors.border }, style]} />
  );
}
