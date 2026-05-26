import { StyleSheet, Text, View, type ViewStyle } from "react-native";

import { useThemeColors } from "@/hooks/useTheme";

type AvatarProps = {
  size?: "sm" | "md" | "lg" | "xl";
  fallback: string;
  color?: string;
  style?: ViewStyle;
};

const SIZES = { sm: 32, md: 40, lg: 56, xl: 80 } as const;
const FONTS = { sm: 12, md: 15, lg: 20, xl: 32 } as const;

export function Avatar({ size = "md", fallback, color, style }: AvatarProps) {
  const colors = useThemeColors();
  const s = SIZES[size];

  return (
    <View
      style={[
        styles.base,
        {
          width: s,
          height: s,
          borderRadius: s / 2,
          backgroundColor: color ?? colors.accent,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: FONTS[size] }]}>{fallback}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
