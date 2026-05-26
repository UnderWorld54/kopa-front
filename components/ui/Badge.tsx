import { StyleSheet, Text, View } from "react-native";

import { fontSize as fs, radius as r } from "@/constants/theme";
import { useThemeColors } from "@/hooks/useTheme";

type BadgeProps = {
  label: string;
  color?: string;
  variant?: "default" | "outline" | "dot";
  size?: "sm" | "md";
  icon?: React.ReactNode;
};

export function Badge({
  label,
  color,
  variant = "default",
  size = "sm",
  icon,
}: BadgeProps) {
  const colors = useThemeColors();
  const c = color ?? colors.accent;
  const textSize = size === "sm" ? fs.xs : fs.sm;

  if (variant === "dot") {
    return (
      <View style={[styles.base, { backgroundColor: `${c}15` }]}>
        <View style={[styles.dot, { backgroundColor: c }]} />
        <Text style={[styles.text, { color: c, fontSize: textSize }]}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: variant === "outline" ? "transparent" : `${c}15`,
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: c,
        },
      ]}
    >
      {icon}
      <Text style={[styles.text, { color: c, fontSize: textSize }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: r.sm,
    gap: 4,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontWeight: "600",
  },
});
