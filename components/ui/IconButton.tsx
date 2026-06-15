import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

import { useThemeColors } from "@/hooks/useTheme";

type IconButtonProps = TouchableOpacityProps & {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
};

export function IconButton({
  icon,
  size = 22,
  color,
  style,
  ...props
}: IconButtonProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[styles.base, style]}
      activeOpacity={0.6}
      {...props}
    >
      <Ionicons name={icon} size={size} color={color ?? colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: 8,
    borderRadius: 999,
  },
});
