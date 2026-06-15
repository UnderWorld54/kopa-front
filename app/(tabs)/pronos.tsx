import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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

import { AnimatedCard } from "@/components/AnimatedCard";
import { KopaHeader } from "@/components/KopaHeader";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useScrollTabBar } from "@/hooks/useScrollTabBar";
import { useThemeColors } from "@/hooks/useTheme";

const TABS = ["Mes pronos", "Classement"];

const MY_PRONOS = [
  {
    id: "1",
    match: "PSG vs OM",
    competition: "Ligue 1",
    date: "Aujourd'hui 20:45",
    prediction: "PSG gagne",
    odds: "1.45",
    status: "pending" as const,
    points: 50,
  },
  {
    id: "2",
    match: "Bayern vs Dortmund",
    competition: "Bundesliga",
    date: "Hier 18:30",
    prediction: "Bayern gagne",
    odds: "1.60",
    status: "won" as const,
    points: 80,
  },
  {
    id: "3",
    match: "Liverpool vs Chelsea",
    competition: "Premier League",
    date: "29 Mars 16:00",
    prediction: "Nul",
    odds: "3.20",
    status: "lost" as const,
    points: 0,
  },
  {
    id: "4",
    match: "Barça vs Séville",
    competition: "LaLiga",
    date: "28 Mars 21:00",
    prediction: "Barça gagne",
    odds: "1.35",
    status: "won" as const,
    points: 45,
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    user: "Alex_Pro",
    points: 1240,
    avatar: "#F97316",
    winRate: "82%",
    streak: 7,
  },
  {
    rank: 2,
    user: "Footmaster",
    points: 1180,
    avatar: "#8B5CF6",
    winRate: "76%",
    streak: 4,
  },
  {
    rank: 3,
    user: "PronoBoss",
    points: 1050,
    avatar: "#10B981",
    winRate: "71%",
    streak: 3,
  },
  {
    rank: 4,
    user: "Toi",
    points: 820,
    avatar: "#10B981",
    isMe: true,
    winRate: "68%",
    streak: 2,
  },
  {
    rank: 5,
    user: "SportFan",
    points: 780,
    avatar: "#E05D8A",
    winRate: "65%",
    streak: 1,
  },
  {
    rank: 6,
    user: "KingProno",
    points: 720,
    avatar: "#5D6BE0",
    winRate: "63%",
    streak: 0,
  },
];

type PronoStatus = "pending" | "won" | "lost";
const STATUS_CONFIG: Record<
  PronoStatus,
  { color: string; label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  pending: { color: "#F59E0B", label: "En attente", icon: "time-outline" },
  won: { color: "#10B981", label: "Gagné", icon: "checkmark-circle" },
  lost: { color: "#EF4444", label: "Perdu", icon: "close-circle" },
};

function AnimatedStat({
  value,
  label,
  color,
  index,
}: {
  value: string;
  label: string;
  color: string;
  index: number;
}) {
  const colors = useThemeColors();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    scale.value = withDelay(index * 100, withSpring(1, { damping: 15 }));
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
      <Text style={[s.statValue, { color }]}>{value}</Text>
      <Text style={[s.statLabel, { color: colors.textMuted }]}>{label}</Text>
    </Animated.View>
  );
}

function PronoCard({
  prono,
  index,
}: {
  prono: (typeof MY_PRONOS)[0];
  index: number;
}) {
  const colors = useThemeColors();
  const config = STATUS_CONFIG[prono.status];
  return (
    <AnimatedCard index={index}>
      <View
        style={[
          s.pronoCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={s.pronoHeader}>
          <View style={s.pronoInfo}>
            <Text style={[s.pronoMatch, { color: colors.text }]}>
              {prono.match}
            </Text>
            <Text style={[s.pronoMeta, { color: colors.textMuted }]}>
              {prono.competition} · {prono.date}
            </Text>
          </View>
          <View
            style={[s.statusBadge, { backgroundColor: `${config.color}18` }]}
          >
            <Ionicons name={config.icon} size={12} color={config.color} />
            <Text style={[s.statusText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
        </View>
        <View style={s.pronoFooter}>
          <View style={s.predictionRow}>
            <View
              style={[
                s.predictionChip,
                { backgroundColor: `${colors.accent}18` },
              ]}
            >
              <Text style={[s.predictionText, { color: colors.accent }]}>
                {prono.prediction}
              </Text>
            </View>
            <Text style={[s.oddsText, { color: colors.textMuted }]}>
              ×{prono.odds}
            </Text>
          </View>
          <Text style={[s.pointsText, { color: config.color }]}>
            {prono.status === "lost" ? "0 pt" : `+${prono.points} pts`}
          </Text>
        </View>
      </View>
    </AnimatedCard>
  );
}

export default function PronosScreen() {
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState(0);
  const scrollHandler = useScrollTabBar();

  return (
    <SafeAreaView
      style={[s.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <KopaHeader />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={s.statsRow}>
          <AnimatedStat
            value="820"
            label="Points"
            color={colors.accent}
            index={0}
          />
          <AnimatedStat
            value="68%"
            label="Réussite"
            color={colors.teal}
            index={1}
          />
          <AnimatedStat
            value="24"
            label="Pronos"
            color={colors.purple}
            index={2}
          />
        </View>

        <View style={s.tabRow}>
          <SegmentedControl
            options={TABS}
            value={activeTab}
            onChange={setActiveTab}
          />
        </View>

        {activeTab === 0 ? (
          MY_PRONOS.map((prono, i) => (
            <PronoCard key={prono.id} prono={prono} index={i} />
          ))
        ) : (
          <View
            style={[
              s.leaderboardCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            {LEADERBOARD.map((entry, i) => (
              <AnimatedCard key={entry.rank} index={i}>
                <View
                  style={[
                    s.leaderRow,
                    { borderBottomColor: colors.border },
                    entry.isMe && { backgroundColor: `${colors.accent}12` },
                  ]}
                >
                  <Text style={[s.rankText, { color: colors.textMuted }]}>
                    {entry.rank === 1
                      ? "🥇"
                      : entry.rank === 2
                        ? "🥈"
                        : entry.rank === 3
                          ? "🥉"
                          : `#${entry.rank}`}
                  </Text>
                  <View
                    style={[s.leaderAvatar, { backgroundColor: entry.avatar }]}
                  >
                    <Text style={s.leaderAvatarText}>{entry.user[0]}</Text>
                  </View>
                  <View style={s.leaderInfo}>
                    <Text
                      style={[
                        s.leaderName,
                        {
                          color: entry.isMe ? colors.accent : colors.text,
                          fontWeight: entry.isMe ? "700" : "600",
                        },
                      ]}
                    >
                      {entry.user}
                    </Text>
                    <Text style={[s.leaderMeta, { color: colors.textMuted }]}>
                      {entry.winRate} réussite
                      {entry.streak > 0 ? ` · 🔥${entry.streak}` : ""}
                    </Text>
                  </View>
                  <Text
                    style={[s.leaderPoints, { color: colors.textSecondary }]}
                  >
                    {entry.points} pts
                  </Text>
                </View>
              </AnimatedCard>
            ))}
          </View>
        )}

        <View style={s.newPronoBtn}>
          <Button
            label="Faire un prono"
            icon={
              <Ionicons name="add-circle-outline" size={20} color="white" />
            }
            size="lg"
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
  },
  statValue: { fontSize: 24, fontWeight: "900" },
  statLabel: { fontSize: 11, marginTop: 2, fontWeight: "500" },
  tabRow: { marginHorizontal: 16, marginTop: 16, marginBottom: 14 },
  pronoCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
  },
  pronoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  pronoInfo: { flex: 1 },
  pronoMatch: { fontSize: 15, fontWeight: "700" },
  pronoMeta: { fontSize: 12, marginTop: 2 },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { fontSize: 11, fontWeight: "700" },
  pronoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  predictionRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  predictionChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  predictionText: { fontSize: 13, fontWeight: "600" },
  oddsText: { fontSize: 13, fontWeight: "700" },
  pointsText: { fontSize: 15, fontWeight: "800" },
  leaderboardCard: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
  },
  leaderRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
    borderBottomWidth: 1,
  },
  rankText: { fontSize: 14, width: 28, textAlign: "center" },
  leaderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  leaderAvatarText: { color: "white", fontSize: 14, fontWeight: "700" },
  leaderInfo: { flex: 1 },
  leaderName: { fontSize: 14 },
  leaderMeta: { fontSize: 11, marginTop: 1 },
  leaderPoints: { fontSize: 14, fontWeight: "700" },
  newPronoBtn: { marginHorizontal: 16, marginTop: 16 },
});
