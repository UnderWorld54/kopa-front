import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontSize as fs, radius as r } from "@/constants/theme";
import { useThemeColors } from "@/hooks/useTheme";

type SegmentedControlProps = {
  options: string[];
  value: number;
  onChange: (index: number) => void;
};

export function SegmentedControl({
  options,
  value,
  onChange,
}: SegmentedControlProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      {options.map((option, i) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            value === i && { backgroundColor: colors.accent },
          ]}
          onPress={() => onChange(i)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.text,
              {
                color: value === i ? "#FFFFFF" : colors.textMuted,
                fontWeight: value === i ? "700" : "600",
              },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: r.lg,
    padding: 3,
    borderWidth: 1,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: r.md,
  },
  text: {
    fontSize: fs.sm,
  },
});
