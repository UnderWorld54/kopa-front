import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
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
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColors } from "@/hooks/useTheme";

const MATCH_DATA = {
  competition: "Ligue 1 — Journée 28",
  homeTeam: {
    name: "Paris Saint-Germain",
    abbrev: "PSG",
    bgColor: "#001E62",
    score: 2,
    scorers: ["Mbappé 23'", "Dembélé 67'"],
  },
  awayTeam: {
    name: "Olympique de Marseille",
    abbrev: "OM",
    bgColor: "#009BD6",
    score: 1,
    scorers: ["Greenwood 45+2'"],
  },
  minute: "78'",
  stadium: "Parc des Princes",
  viewers: "24 300",
  possession: { home: 62, away: 38 },
  shots: { home: 14, away: 8 },
  shotsOnTarget: { home: 6, away: 3 },
  corners: { home: 7, away: 3 },
  fouls: { home: 9, away: 12 },
};

const EVENTS = [
  {
    minute: "23'",
    type: "goal",
    team: "home",
    text: "But ! Mbappé",
    icon: "football" as const,
  },
  {
    minute: "34'",
    type: "card",
    team: "away",
    text: "Carton jaune — Balerdi",
    icon: "card" as const,
  },
  {
    minute: "45+2'",
    type: "goal",
    team: "away",
    text: "But ! Greenwood",
    icon: "football" as const,
  },
  {
    minute: "56'",
    type: "sub",
    team: "home",
    text: "Remplacement — Zaïre-Emery",
    icon: "swap-horizontal" as const,
  },
  {
    minute: "67'",
    type: "goal",
    team: "home",
    text: "But ! Dembélé",
    icon: "football" as const,
  },
];

const COMMENTS = [
  {
    id: "1",
    user: "Thomas",
    avatar: "#5DE0A8",
    text: "Quel match de Mbappé ! Intenable ce soir",
    time: "2 min",
    likes: 24,
  },
  {
    id: "2",
    user: "Léa",
    avatar: "#E0A05D",
    text: "L'OM peut encore revenir, il reste du temps",
    time: "5 min",
    likes: 8,
  },
  {
    id: "3",
    user: "Marc",
    avatar: "#5D6BE0",
    text: "Le Parc est en feu",
    time: "8 min",
    likes: 42,
  },
];

function StatBar({
  label,
  home,
  away,
}: {
  label: string;
  home: number;
  away: number;
}) {
  const colors = useThemeColors();
  const total = home + away;
  const homePercent = (home / total) * 100;

  return (
    <View style={s.statBarRow}>
      <Text style={[s.statBarValue, { color: colors.text }]}>{home}</Text>
      <View style={s.statBarCenter}>
        <Text style={[s.statBarLabel, { color: colors.textMuted }]}>
          {label}
        </Text>
        <View style={[s.statBarTrack, { backgroundColor: colors.border }]}>
          <View
            style={[
              s.statBarFillHome,
              { width: `${homePercent}%`, backgroundColor: colors.accent },
            ]}
          />
        </View>
      </View>
      <Text style={[s.statBarValue, { color: colors.text }]}>{away}</Text>
    </View>
  );
}

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams();
  const colors = useThemeColors();
  const scoreScale = useSharedValue(0.5);
  const scoreOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    scoreScale.value = withSpring(1, { damping: 10, stiffness: 80 });
    scoreOpacity.value = withTiming(1, { duration: 600 });
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 600 }),
        withTiming(1, { duration: 600 }),
      ),
      -1,
    );
  }, []);

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scoreScale.value }],
    opacity: scoreOpacity.value,
  }));

  const livePulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
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
        <View style={[s.liveBadge, { backgroundColor: colors.live }]}>
          <Animated.View style={[s.liveDot, livePulseStyle]} />
          <Text style={s.liveText}>EN DIRECT</Text>
        </View>
        <TouchableOpacity style={s.backBtn}>
          <Ionicons name="share-social-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.surface, colors.background]}
          style={s.scoreSection}
        >
          <Text style={[s.competitionLabel, { color: colors.textMuted }]}>
            {MATCH_DATA.competition}
          </Text>

          <View style={s.scoreRow}>
            <View style={s.teamSide}>
              <View
                style={[
                  s.teamCircle,
                  { backgroundColor: MATCH_DATA.homeTeam.bgColor },
                ]}
              >
                <Text style={s.teamAbbrev}>{MATCH_DATA.homeTeam.abbrev}</Text>
              </View>
              <Text style={[s.teamName, { color: colors.textSecondary }]}>
                {MATCH_DATA.homeTeam.name}
              </Text>
            </View>

            <Animated.View style={[s.scoreCenterCol, scoreStyle]}>
              <Text style={[s.mainScore, { color: colors.text }]}>
                {MATCH_DATA.homeTeam.score} - {MATCH_DATA.awayTeam.score}
              </Text>
              <View style={[s.minuteChip, { backgroundColor: colors.live }]}>
                <Text style={s.minuteText}>{MATCH_DATA.minute}</Text>
              </View>
            </Animated.View>

            <View style={s.teamSide}>
              <View
                style={[
                  s.teamCircle,
                  { backgroundColor: MATCH_DATA.awayTeam.bgColor },
                ]}
              >
                <Text style={s.teamAbbrev}>{MATCH_DATA.awayTeam.abbrev}</Text>
              </View>
              <Text style={[s.teamName, { color: colors.textSecondary }]}>
                {MATCH_DATA.awayTeam.name}
              </Text>
            </View>
          </View>

          <View style={s.metaRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.textMuted}
            />
            <Text style={[s.metaText, { color: colors.textMuted }]}>
              {MATCH_DATA.stadium}
            </Text>
            <Ionicons name="eye-outline" size={14} color={colors.textMuted} />
            <Text style={[s.metaText, { color: colors.textMuted }]}>
              {MATCH_DATA.viewers}
            </Text>
          </View>
        </LinearGradient>

        <Text style={[s.sectionTitle, { color: colors.text }]}>Événements</Text>
        <View style={s.timeline}>
          {EVENTS.map((event, i) => (
            <View key={i} style={s.timelineItem}>
              <Text style={[s.eventMinute, { color: colors.textMuted }]}>
                {event.minute}
              </Text>
              <View style={s.timelineLine}>
                <View
                  style={[
                    s.timelineDot,
                    {
                      backgroundColor:
                        event.type === "goal"
                          ? colors.accent
                          : event.type === "card"
                            ? colors.orange
                            : colors.surfaceRaised,
                      borderColor:
                        event.type === "goal"
                          ? colors.accent
                          : event.type === "card"
                            ? colors.orange
                            : colors.border,
                    },
                  ]}
                />
              </View>
              <View
                style={[s.eventContent, { backgroundColor: colors.surface }]}
              >
                <Ionicons
                  name={event.icon}
                  size={16}
                  color={
                    event.type === "goal"
                      ? colors.accent
                      : event.type === "card"
                        ? colors.orange
                        : colors.textMuted
                  }
                />
                <Text style={[s.eventText, { color: colors.textSecondary }]}>
                  {event.text}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={[s.sectionTitle, { color: colors.text }]}>
          Statistiques
        </Text>
        <View
          style={[
            s.statsCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={s.statsTeamNames}>
            <Text style={[s.statsTeamName, { color: colors.text }]}>
              {MATCH_DATA.homeTeam.abbrev}
            </Text>
            <Text style={[s.statsTeamName, { color: colors.text }]}>
              {MATCH_DATA.awayTeam.abbrev}
            </Text>
          </View>
          <StatBar
            label="Possession"
            home={MATCH_DATA.possession.home}
            away={MATCH_DATA.possession.away}
          />
          <StatBar
            label="Tirs"
            home={MATCH_DATA.shots.home}
            away={MATCH_DATA.shots.away}
          />
          <StatBar
            label="Tirs cadrés"
            home={MATCH_DATA.shotsOnTarget.home}
            away={MATCH_DATA.shotsOnTarget.away}
          />
          <StatBar
            label="Corners"
            home={MATCH_DATA.corners.home}
            away={MATCH_DATA.corners.away}
          />
          <StatBar
            label="Fautes"
            home={MATCH_DATA.fouls.home}
            away={MATCH_DATA.fouls.away}
          />
        </View>

        <Text style={[s.sectionTitle, { color: colors.text }]}>Réactions</Text>
        {COMMENTS.map((comment) => (
          <View
            key={comment.id}
            style={[s.commentItem, { borderBottomColor: colors.border }]}
          >
            <View
              style={[s.commentAvatar, { backgroundColor: comment.avatar }]}
            >
              <Text style={s.commentAvatarText}>{comment.user[0]}</Text>
            </View>
            <View style={s.commentBody}>
              <View style={s.commentHeader}>
                <Text style={[s.commentUser, { color: colors.text }]}>
                  {comment.user}
                </Text>
                <Text style={[s.commentTime, { color: colors.textMuted }]}>
                  {comment.time}
                </Text>
              </View>
              <Text style={[s.commentText, { color: colors.textSecondary }]}>
                {comment.text}
              </Text>
              <TouchableOpacity style={s.commentLike}>
                <Ionicons
                  name="heart-outline"
                  size={14}
                  color={colors.textMuted}
                />
                <Text style={[s.commentLikeCount, { color: colors.textMuted }]}>
                  {comment.likes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[
            s.commentInputBtn,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          activeOpacity={0.85}
        >
          <Ionicons name="chatbubble-outline" size={18} color={colors.accent} />
          <Text style={[s.commentInputText, { color: colors.textMuted }]}>
            Ajouter une réaction...
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
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  liveText: {
    color: "white",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  scoreSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  competitionLabel: { fontSize: 13, fontWeight: "600", marginBottom: 16 },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  teamSide: { flex: 1, alignItems: "center", gap: 8 },
  teamCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  teamAbbrev: { color: "white", fontSize: 16, fontWeight: "900" },
  teamName: { fontSize: 12, fontWeight: "600", textAlign: "center" },
  scoreCenterCol: { width: 100, alignItems: "center", gap: 8 },
  mainScore: { fontSize: 38, fontWeight: "900", letterSpacing: 2 },
  minuteChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  minuteText: { color: "white", fontSize: 13, fontWeight: "700" },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  metaText: { fontSize: 12, marginRight: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  timeline: { paddingHorizontal: 16 },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 44,
  },
  eventMinute: {
    width: 40,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "right",
  },
  timelineLine: { width: 20, alignItems: "center" },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  eventContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  eventText: { fontSize: 13, fontWeight: "500" },
  statsCard: {
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    gap: 14,
    borderWidth: 1,
  },
  statsTeamNames: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsTeamName: { fontSize: 14, fontWeight: "700" },
  statBarRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  statBarValue: {
    fontSize: 13,
    fontWeight: "700",
    width: 30,
    textAlign: "center",
  },
  statBarCenter: { flex: 1, gap: 4 },
  statBarLabel: { fontSize: 11, textAlign: "center" },
  statBarTrack: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  statBarFillHome: { height: "100%", borderRadius: 2 },
  commentItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  commentAvatarText: { color: "white", fontSize: 14, fontWeight: "700" },
  commentBody: { flex: 1, gap: 3 },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentUser: { fontSize: 14, fontWeight: "700" },
  commentTime: { fontSize: 11 },
  commentText: { fontSize: 13, lineHeight: 18 },
  commentLike: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  commentLikeCount: { fontSize: 12 },
  commentInputBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  commentInputText: { fontSize: 14 },
});
