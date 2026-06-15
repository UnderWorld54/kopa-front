import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeColors } from "@/hooks/useTheme";

export function KopaHeader() {
  const colors = useThemeColors();

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={[styles.logoCircle, { backgroundColor: colors.accent }]}>
          <Ionicons name="football" size={16} color="#FFF" />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Kopa</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.textSecondary}
          />
          <View
            style={[
              styles.notifDot,
              {
                backgroundColor: colors.live,
                borderColor: colors.background,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.avatarBtn, { backgroundColor: colors.accent }]}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.avatarText}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBtn: {
    padding: 6,
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
  avatarBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
