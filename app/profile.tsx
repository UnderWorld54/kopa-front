import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColors } from "@/hooks/useTheme";

const BADGES_CONFIG = [
  {
    id: "1",
    icon: "flame" as const,
    label: "Série de 7",
    colorKey: "live" as const,
    unlocked: true,
  },
  {
    id: "2",
    icon: "trophy" as const,
    label: "Top 10",
    colorKey: "gold" as const,
    unlocked: true,
  },
  {
    id: "3",
    icon: "star" as const,
    label: "50 pronos",
    colorKey: "purple" as const,
    unlocked: true,
  },
  {
    id: "4",
    icon: "diamond" as const,
    label: "Expert",
    colorKey: "teal" as const,
    unlocked: false,
  },
  {
    id: "5",
    icon: "medal" as const,
    label: "#1 Club",
    colorKey: "orange" as const,
    unlocked: false,
  },
];

const SETTINGS_ITEMS = [
  {
    icon: "notifications-outline" as const,
    label: "Notifications",
    chevron: true,
  },
  { icon: "shield-outline" as const, label: "Confidentialité", chevron: true },
  { icon: "color-palette-outline" as const, label: "Apparence", chevron: true },
  {
    icon: "help-circle-outline" as const,
    label: "Aide & Support",
    chevron: true,
  },
  {
    icon: "information-circle-outline" as const,
    label: "À propos",
    chevron: true,
  },
];

function AnimatedStat({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const colors = useThemeColors();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(
      200 + index * 100,
      withTiming(1, { duration: 500 }),
    );
    scale.value = withDelay(200 + index * 100, withSpring(1, { damping: 15 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        s.statCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
        animStyle,
      ]}
    >
      <Text style={[s.statValue, { color: colors.accent }]}>{value}</Text>
      <Text style={[s.statLabel, { color: colors.textMuted }]}>{label}</Text>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const colors = useThemeColors();
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    headerTranslateY.value = withSpring(0, { damping: 20 });
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  return (
    <SafeAreaView
      style={[s.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={s.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[s.navTitle, { color: colors.text }]}>Profil</Text>
        <TouchableOpacity style={s.backBtn}>
          <Ionicons name="create-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={headerStyle}>
          <LinearGradient
            colors={[colors.surface, colors.background]}
            style={s.profileHeader}
          >
            <View
              style={[
                s.avatarLarge,
                {
                  backgroundColor: colors.accent,
                  shadowColor: colors.accent,
                },
              ]}
            >
              <Text style={s.avatarLargeText}>A</Text>
            </View>
            <Text style={[s.profileName, { color: colors.text }]}>Angelo</Text>
            <Text style={[s.profileHandle, { color: colors.textMuted }]}>
              @angelo_kopa
            </Text>
            <Text style={[s.profileBio, { color: colors.textSecondary }]}>
              Fan de foot. PSG en force. Pronostiqueur depuis 2024.
            </Text>

            <View style={s.followRow}>
              <View style={s.followItem}>
                <Text style={[s.followCount, { color: colors.text }]}>142</Text>
                <Text style={[s.followLabel, { color: colors.textMuted }]}>
                  Abonnés
                </Text>
              </View>
              <View
                style={[s.followDivider, { backgroundColor: colors.border }]}
              />
              <View style={s.followItem}>
                <Text style={[s.followCount, { color: colors.text }]}>89</Text>
                <Text style={[s.followLabel, { color: colors.textMuted }]}>
                  Abonnements
                </Text>
              </View>
              <View
                style={[s.followDivider, { backgroundColor: colors.border }]}
              />
              <View style={s.followItem}>
                <Text style={[s.followCount, { color: colors.text }]}>3</Text>
                <Text style={[s.followLabel, { color: colors.textMuted }]}>
                  Clubs
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={s.statsRow}>
          <AnimatedStat value="820" label="Points" index={0} />
          <AnimatedStat value="68%" label="Réussite" index={1} />
          <AnimatedStat value="24" label="Pronos" index={2} />
          <AnimatedStat value="#4" label="Rang" index={3} />
        </View>

        <Text style={[s.sectionTitle, { color: colors.text }]}>Badges</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.badgesContent}
        >
          {BADGES_CONFIG.map((badge) => {
            const badgeColor = colors[badge.colorKey];
            return (
              <View
                key={badge.id}
                style={[
                  s.badgeCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                  !badge.unlocked && s.badgeLocked,
                ]}
              >
                <View
                  style={[
                    s.badgeIcon,
                    {
                      backgroundColor: badge.unlocked
                        ? badgeColor + "22"
                        : colors.surfaceRaised,
                    },
                  ]}
                >
                  <Ionicons
                    name={badge.icon}
                    size={22}
                    color={badge.unlocked ? badgeColor : colors.textMuted}
                  />
                </View>
                <Text
                  style={[
                    s.badgeLabel,
                    {
                      color: badge.unlocked
                        ? colors.textSecondary
                        : colors.textMuted,
                    },
                  ]}
                >
                  {badge.label}
                </Text>
                {!badge.unlocked && (
                  <Ionicons
                    name="lock-closed"
                    size={10}
                    color={colors.textMuted}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>

        <Text style={[s.sectionTitle, { color: colors.text }]}>Paramètres</Text>
        <View
          style={[
            s.settingsCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {SETTINGS_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[
                s.settingsRow,
                i < SETTINGS_ITEMS.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={colors.textSecondary}
              />
              <Text style={[s.settingsLabel, { color: colors.text }]}>
                {item.label}
              </Text>
              {item.chevron && (
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textMuted}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            s.logoutBtn,
            {
              backgroundColor: `${colors.live}15`,
              borderColor: `${colors.live}30`,
            },
          ]}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.live} />
          <Text style={[s.logoutText, { color: colors.live }]}>
            Se déconnecter
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  navTitle: { fontSize: 18, fontWeight: "700" },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 6,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarLargeText: { color: "white", fontSize: 32, fontWeight: "800" },
  profileName: { fontSize: 24, fontWeight: "800" },
  profileHandle: { fontSize: 14 },
  profileBio: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  followRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 20,
  },
  followItem: { alignItems: "center" },
  followCount: { fontSize: 18, fontWeight: "800" },
  followLabel: { fontSize: 12, marginTop: 2 },
  followDivider: { width: 1, height: 24 },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: { fontSize: 18, fontWeight: "800" },
  statLabel: { fontSize: 11, marginTop: 2 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  badgesContent: { paddingHorizontal: 16, gap: 10 },
  badgeCard: {
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 6,
    width: 90,
    borderWidth: 1,
  },
  badgeLocked: { opacity: 0.5 },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeLabel: { fontSize: 11, fontWeight: "600", textAlign: "center" },
  settingsCard: {
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  settingsLabel: { fontSize: 15, fontWeight: "500", flex: 1 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  logoutText: { fontSize: 15, fontWeight: "600" },
});
