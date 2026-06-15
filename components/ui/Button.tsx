import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

import { fontSize as fs, radius as r } from "@/constants/theme";
import { useThemeColors } from "@/hooks/useTheme";

type ButtonProps = TouchableOpacityProps & {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  label: string;
  loading?: boolean;
  icon?: React.ReactNode;
};

const PAD = { sm: 8, md: 12, lg: 16 } as const;
const FONT = { sm: fs.sm, md: fs.base, lg: fs.lg } as const;

export function Button({
  variant = "primary",
  size = "md",
  label,
  loading,
  icon,
  style,
  ...props
}: ButtonProps) {
  const colors = useThemeColors();

  const bg = {
    primary: colors.accent,
    secondary: "transparent",
    ghost: "transparent",
    destructive: colors.live,
  }[variant];

  const fg = {
    primary: "#FFFFFF",
    secondary: colors.text,
    ghost: colors.textSecondary,
    destructive: "#FFFFFF",
  }[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: bg,
          paddingVertical: PAD[size],
          borderWidth: variant === "secondary" ? 1 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
      activeOpacity={0.7}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={fg} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, { color: fg, fontSize: FONT[size] }]}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: r.lg,
    paddingHorizontal: 20,
    gap: 8,
  },
  label: {
    fontWeight: "600",
  },
});
