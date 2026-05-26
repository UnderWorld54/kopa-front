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
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedCard } from "@/components/AnimatedCard";
import { Chip } from "@/components/ui/Chip";
import { KopaHeader } from "@/components/KopaHeader";
import { useScrollTabBar } from "@/hooks/useScrollTabBar";
import { useThemeColors } from "@/hooks/useTheme";

const FILTERS = [
  { id: "hype", label: "Hype 🔥" },
  { id: "football", label: "Football ⚽" },
  { id: "basket", label: "Basket 🏀" },
  { id: "tennis", label: "Tennis 🎾" },
  { id: "rugby", label: "Rugby 🏉" },
];

const MATCHES = [
  {
    id: "1",
    label: "MATCH HYPE DU JOUR 🔥",
    competition: "Ligue 1",
    competitionColor: "#1B3FA0",
    homeTeam: {
      name: "Paris Saint-Germain",
      shortName: "Paris",
      abbrev: "PSG",
      rank: "1er du classement",
      bgColor: "#001E62",
    },
    awayTeam: {
      name: "Olympique de Marseille",
      shortName: "Marseille",
      abbrev: "OM",
      rank: "3ème du classement",
      bgColor: "#009BD6",
    },
    time: "20:45",
    votes: { home: 65, draw: 15, away: 20 },
    totalVotes: 2450,
  },
  {
    id: "2",
    label: "EL CLÁSICO",
    competition: "LaLiga",
    competitionColor: "#EE3024",
    homeTeam: {
      name: "Barcelone",
      shortName: "Barça",
      abbrev: "FCB",
      rank: "1er du classement",
      bgColor: "#A50044",
    },
    awayTeam: {
      name: "Real Madrid",
      shortName: "Madrid",
      abbrev: "RM",
      rank: "2ème du classement",
      bgColor: "#1A1A1A",
    },
    time: "20:45",
    votes: { home: 42, draw: 18, away: 40 },
    totalVotes: 1820,
  },
  {
    id: "3",
    label: "TOP AFFICHE",
    competition: "Premier League",
    competitionColor: "#3D195B",
    homeTeam: {
      name: "Manchester City",
      shortName: "City",
      abbrev: "MCI",
      rank: "2ème du classement",
      bgColor: "#6DCFF6",
    },
    awayTeam: {
      name: "Arsenal",
      shortName: "Arsenal",
      abbrev: "ARS",
      rank: "1er du classement",
      bgColor: "#EF0107",
    },
    time: "18:30",
    votes: { home: 35, draw: 25, away: 40 },
    totalVotes: 1340,
  },
];

function AnimatedVoteBar({
  percent,
  delay: delayMs,
}: {
  percent: number;
  delay: number;
}) {
  const colors = useThemeColors();
  const width = useSharedValue(0);
  useEffect(() => {
    width.value = withDelay(
      delayMs,
      withSpring(percent, { damping: 20, stiffness: 80 }),
    );
  }, [percent]);
  const animStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    height: "100%",
    backgroundColor: colors.accent,
    borderRadius: 2,
  }));
  return (
    <View style={[s.voteBarBg, { backgroundColor: colors.border }]}>
      <Animated.View style={animStyle} />
    </View>
  );
}

function TeamColumn({
  abbrev,
  name,
  rank,
  bgColor,
}: {
  abbrev: string;
  name: string;
  rank: string;
  bgColor: string;
}) {
  const colors = useThemeColors();
  return (
    <View style={s.teamColumn}>
      <View style={[s.teamCircle, { backgroundColor: bgColor }]}>
        <Text style={s.teamAbbrev}>{abbrev}</Text>
      </View>
      <Text style={[s.teamName, { color: colors.text }]} numberOfLines={2}>
        {name}
      </Text>
      <Text style={[s.teamRank, { color: colors.textMuted }]}>{rank}</Text>
    </View>
  );
}

function MatchCard({
  match,
  index,
}: {
  match: (typeof MATCHES)[0];
  index: number;
}) {
  const colors = useThemeColors();
  const [voted, setVoted] = useState<"home" | "draw" | "away" | null>(null);

  return (
    <AnimatedCard index={index}>
      <View
        style={[
          s.matchCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={s.matchCardHeader}>
          <Text style={[s.matchLabel, { color: colors.textMuted }]}>
            {match.label}
          </Text>
          <View
            style={[
              s.competitionBadge,
              { backgroundColor: match.competitionColor },
            ]}
          >
            <Text style={s.competitionText}>{match.competition}</Text>
          </View>
        </View>
        <View style={s.teamsRow}>
          <TeamColumn
            abbrev={match.homeTeam.abbrev}
            name={match.homeTeam.name}
            rank={match.homeTeam.rank}
            bgColor={match.homeTeam.bgColor}
          />
          <View style={s.timeCenter}>
            <Text style={[s.timeText, { color: colors.text }]}>
              {match.time}
            </Text>
            <Text style={[s.totalVotes, { color: colors.textMuted }]}>
              {match.totalVotes.toLocaleString("fr-FR")} votes
            </Text>
          </View>
          <TeamColumn
            abbrev={match.awayTeam.abbrev}
            name={match.awayTeam.name}
            rank={match.awayTeam.rank}
            bgColor={match.awayTeam.bgColor}
          />
        </View>
        <View style={s.voteButtons}>
          {(
            [
              {
                key: "home",
                label: match.homeTeam.shortName,
                pct: match.votes.home,
              },
              { key: "draw", label: "Nul", pct: match.votes.draw },
              {
                key: "away",
                label: match.awayTeam.shortName,
                pct: match.votes.away,
              },
            ] as const
          ).map(({ key, label, pct }) => (
            <TouchableOpacity
              key={key}
              style={[
                s.voteBtn,
                {
                  backgroundColor:
                    voted === key ? colors.accent : colors.surfaceRaised,
                },
              ]}
              onPress={() => setVoted(key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  s.voteBtnText,
                  {
                    color: voted === key ? "white" : colors.textSecondary,
                    fontWeight: voted === key ? "700" : "600",
                  },
                ]}
              >
                {label}
              </Text>
              <Text
                style={[
                  s.votePct,
                  {
                    color:
                      voted === key
                        ? "rgba(255,255,255,0.7)"
                        : colors.textMuted,
                  },
                ]}
              >
                {pct}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.voteBars}>
          <AnimatedVoteBar
            percent={match.votes.home}
            delay={index * 100 + 200}
          />
          <AnimatedVoteBar
            percent={match.votes.draw}
            delay={index * 100 + 300}
          />
          <AnimatedVoteBar
            percent={match.votes.away}
            delay={index * 100 + 400}
          />
        </View>
        <TouchableOpacity style={s.commentRow}>
          <Ionicons
            name="chatbubble-outline"
            size={15}
            color={colors.textMuted}
          />
          <Text style={[s.commentText, { color: colors.textMuted }]}>
            Commenter
          </Text>
          <View style={{ flex: 1 }} />
          <Ionicons
            name="share-social-outline"
            size={15}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      </View>
    </AnimatedCard>
  );
}

export default function HypeScreen() {
  const colors = useThemeColors();
  const [activeFilter, setActiveFilter] = useState("hype");
  const scrollHandler = useScrollTabBar();

  return (
    <SafeAreaView
      style={[s.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <KopaHeader />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.filtersScroll}
        contentContainerStyle={s.filtersContent}
      >
        {FILTERS.map((f) => (
          <Chip
            key={f.id}
            label={f.label}
            active={activeFilter === f.id}
            onPress={() => setActiveFilter(f.id)}
          />
        ))}
      </ScrollView>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={[s.sectionTitle, { color: colors.text }]}>
          Matchs du jour
        </Text>
        {MATCHES.map((match, i) => (
          <MatchCard key={match.id} match={match} index={i} />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  filtersScroll: { flexGrow: 0 },
  filtersContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  matchCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  matchCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  matchLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 0.6, flex: 1 },
  competitionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  competitionText: { color: "white", fontSize: 10, fontWeight: "700" },
  teamsRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  teamColumn: { flex: 1, alignItems: "center", gap: 5 },
  teamCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  teamAbbrev: { color: "white", fontSize: 13, fontWeight: "800" },
  teamName: { fontSize: 12, fontWeight: "600", textAlign: "center" },
  teamRank: { fontSize: 10, textAlign: "center" },
  timeCenter: { width: 70, alignItems: "center", gap: 4 },
  timeText: { fontSize: 18, fontWeight: "800" },
  totalVotes: { fontSize: 10, fontWeight: "500" },
  voteButtons: { flexDirection: "row", gap: 8, marginBottom: 8 },
  voteBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  voteBtnText: { fontSize: 13 },
  votePct: { fontSize: 10, fontWeight: "600" },
  voteBars: { flexDirection: "row", gap: 8, marginBottom: 12 },
  voteBarBg: { flex: 1, height: 4, borderRadius: 2, overflow: "hidden" },
  commentRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  commentText: { fontSize: 13 },
});
