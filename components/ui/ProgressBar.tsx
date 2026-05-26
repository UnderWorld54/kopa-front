import { StyleSheet, View } from "react-native";

import { useThemeColors } from "@/hooks/useTheme";

type ProgressBarProps = {
  progress: number;
  color?: string;
  height?: number;
};

export function ProgressBar({ progress, color, height = 4 }: ProgressBarProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.track, { height, backgroundColor: colors.border }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: color ?? colors.accent,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 2,
  },
});
