import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedCard } from "@/components/AnimatedCard";
import { KopaHeader } from "@/components/KopaHeader";
import { PulsingDot } from "@/components/PulsingDot";
import { useScrollTabBar } from "@/hooks/useScrollTabBar";
import { useThemeColors } from "@/hooks/useTheme";

const LIVE_MATCHES = [
  {
    id: "1",
    competition: "Champions League",
    competitionColor: "#1A237E",
    homeTeam: {
      name: "Bayern Munich",
      abbrev: "BAY",
      bgColor: "#DC052D",
      score: 2,
    },
    awayTeam: {
      name: "Inter Milan",
      abbrev: "INT",
      bgColor: "#1A1A6E",
      score: 1,
    },
    minute: "67'",
    viewers: "12 450",
    hot: true,
  },
  {
    id: "2",
    competition: "Europa League",
    competitionColor: "#F97316",
    homeTeam: {
      name: "Atletico Madrid",
      abbrev: "ATM",
      bgColor: "#CB3524",
      score: 0,
    },
    awayTeam: { name: "AS Roma", abbrev: "ROM", bgColor: "#8B0000", score: 0 },
    minute: "23'",
    viewers: "7 230",
    hot: false,
  },
  {
    id: "3",
    competition: "Ligue 1",
    competitionColor: "#1B3FA0",
    homeTeam: { name: "Lyon", abbrev: "OL", bgColor: "#001F5B", score: 1 },
    awayTeam: { name: "Monaco", abbrev: "ASM", bgColor: "#E50000", score: 1 },
    minute: "45'",
    viewers: "5 120",
    hot: false,
  },
];

const UPCOMING = [
  {
    id: "1",
    home: "PSG",
    away: "OM",
    time: "20:45",
    competition: "Ligue 1",
    hype: 95,
  },
  {
    id: "2",
    home: "Barça",
    away: "Real Madrid",
    time: "20:45",
    competition: "LaLiga",
    hype: 88,
  },
  {
    id: "3",
    home: "Liverpool",
    away: "Man City",
    time: "17:30",
    competition: "Premier League",
    hype: 82,
  },
];

function LiveBadge() {
  return (
    <View style={s.liveBadge}>
      <PulsingDot color="white" size={6} />
      <Text style={s.liveText}>EN DIRECT</Text>
    </View>
  );
}

function LiveMatchCard({
  match,
  index,
}: {
  match: (typeof LIVE_MATCHES)[0];
  index: number;
}) {
  const colors = useThemeColors();
  return (
    <AnimatedCard index={index}>
      <TouchableOpacity
        style={[
          s.matchCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
        activeOpacity={0.85}
        onPress={() => router.push(`/match/${match.id}`)}
      >
        <View style={s.cardHeader}>
          <View
            style={[
              s.competitionBadge,
              { backgroundColor: match.competitionColor },
            ]}
          >
            <Text style={s.competitionText}>{match.competition}</Text>
          </View>
          <View style={[s.minuteRow, { backgroundColor: `${colors.live}20` }]}>
            <PulsingDot color={colors.live} size={6} />
            <Text style={[s.minuteText, { color: colors.live }]}>
              {match.minute}
            </Text>
          </View>
        </View>
        <View style={s.teamsRow}>
          <View style={s.teamSide}>
            <View
              style={[
                s.teamCircle,
                { backgroundColor: match.homeTeam.bgColor },
              ]}
            >
              <Text style={s.teamAbbrev}>{match.homeTeam.abbrev}</Text>
            </View>
            <Text
              style={[s.teamName, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {match.homeTeam.name}
            </Text>
          </View>
          <View style={s.scoreCenter}>
            <Text style={[s.scoreText, { color: colors.text }]}>
              {match.homeTeam.score} - {match.awayTeam.score}
            </Text>
          </View>
          <View style={s.teamSide}>
            <View
              style={[
                s.teamCircle,
                { backgroundColor: match.awayTeam.bgColor },
              ]}
            >
              <Text style={s.teamAbbrev}>{match.awayTeam.abbrev}</Text>
            </View>
            <Text
              style={[s.teamName, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {match.awayTeam.name}
            </Text>
          </View>
        </View>
        <View style={s.cardFooter}>
          <View style={s.viewersRow}>
            <Ionicons name="eye-outline" size={14} color={colors.textMuted} />
            <Text style={[s.viewersText, { color: colors.textMuted }]}>
              {match.viewers}
            </Text>
          </View>
          {match.hot && (
            <View
              style={[s.hotBadge, { backgroundColor: `${colors.orange}18` }]}
            >
              <Ionicons name="flame" size={12} color={colors.orange} />
              <Text style={[s.hotText, { color: colors.orange }]}>Hot</Text>
            </View>
          )}
          <TouchableOpacity
            style={[s.watchBtn, { backgroundColor: colors.accent }]}
            activeOpacity={0.85}
          >
            <Text style={s.watchBtnText}>Suivre</Text>
            <Ionicons name="chevron-forward" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </AnimatedCard>
  );
}

export default function LiveScreen() {
  const colors = useThemeColors();
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
        <View style={s.topRow}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>
            En direct
          </Text>
          <LiveBadge />
          <View
            style={[
              s.matchCountBadge,
              { backgroundColor: colors.surfaceRaised },
            ]}
          >
            <Text style={[s.matchCountText, { color: colors.textSecondary }]}>
              {LIVE_MATCHES.length}
            </Text>
          </View>
        </View>

        {LIVE_MATCHES.map((match, i) => (
          <LiveMatchCard key={match.id} match={match} index={i} />
        ))}

        <AnimatedCard index={LIVE_MATCHES.length}>
          <Text style={[s.sectionTitlePadded, { color: colors.text }]}>
            À venir aujourd'hui
          </Text>
        </AnimatedCard>

        {UPCOMING.map((match, i) => (
          <AnimatedCard key={match.id} index={LIVE_MATCHES.length + 1 + i}>
            <TouchableOpacity
              style={[s.upcomingItem, { borderBottomColor: colors.border }]}
              activeOpacity={0.8}
            >
              <View style={s.upcomingLeft}>
                <Text style={[s.upcomingTeams, { color: colors.text }]}>
                  {match.home} vs {match.away}
                </Text>
                <Text style={[s.upcomingMeta, { color: colors.textMuted }]}>
                  {match.competition} · {match.time}
                </Text>
              </View>
              <View style={s.upcomingRight}>
                <View style={[s.hypeMeter, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      s.hypeMeterFill,
                      {
                        width: `${match.hype}%`,
                        backgroundColor: colors.accent,
                      },
                    ]}
                  />
                </View>
                <Text style={[s.hypePercent, { color: colors.textMuted }]}>
                  {match.hype}% hype
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  sectionTitlePadded: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  matchCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  matchCountText: { fontSize: 12, fontWeight: "700" },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  liveText: {
    color: "white",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  matchCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  competitionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  competitionText: { color: "white", fontSize: 10, fontWeight: "700" },
  minuteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  minuteText: { fontSize: 12, fontWeight: "700" },
  teamsRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  teamSide: { flex: 1, alignItems: "center", gap: 4 },
  teamCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  teamAbbrev: { color: "white", fontSize: 12, fontWeight: "800" },
  teamName: { fontSize: 11, fontWeight: "600", textAlign: "center" },
  scoreCenter: { width: 80, alignItems: "center" },
  scoreText: { fontSize: 26, fontWeight: "900", letterSpacing: 1 },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 8 },
  viewersRow: { flexDirection: "row", alignItems: "center", gap: 4, flex: 1 },
  viewersText: { fontSize: 12 },
  hotBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  hotText: { fontSize: 11, fontWeight: "700" },
  watchBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 2,
  },
  watchBtnText: { color: "white", fontSize: 13, fontWeight: "600" },
  upcomingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  upcomingLeft: { flex: 1 },
  upcomingTeams: { fontSize: 14, fontWeight: "700" },
  upcomingMeta: { fontSize: 12, marginTop: 2 },
  upcomingRight: { alignItems: "flex-end", gap: 4 },
  hypeMeter: { width: 60, height: 3, borderRadius: 2, overflow: "hidden" },
  hypeMeterFill: { height: "100%", borderRadius: 2 },
  hypePercent: { fontSize: 10, fontWeight: "600" },
});
