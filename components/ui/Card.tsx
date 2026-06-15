import { View, type ViewProps, StyleSheet } from "react-native";

import { radius as r } from "@/constants/theme";
import { useThemeColors } from "@/hooks/useTheme";

type CardProps = ViewProps & {
  variant?: "default" | "elevated";
};

export function Card({ variant = "default", style, ...props }: CardProps) {
  const colors = useThemeColors();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor:
            variant === "elevated" ? colors.surfaceRaised : colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: r.lg,
    padding: 16,
    borderWidth: 1,
  },
});
