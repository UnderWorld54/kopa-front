import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { fontSize as fs, radius as r } from "@/constants/theme";
import { useThemeColors } from "@/hooks/useTheme";

type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function Chip({ label, active, onPress }: ChipProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: active ? colors.accentMuted : colors.surface,
          borderColor: active ? colors.accent : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          {
            color: active ? colors.accent : colors.textMuted,
            fontWeight: active ? "600" : "500",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: r.full,
    borderWidth: 1,
  },
  text: {
    fontSize: fs.sm,
  },
});
