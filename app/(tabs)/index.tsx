import { Ionicons } from "@expo/vector-icons";
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
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedCard } from "@/components/AnimatedCard";
import { KopaHeader } from "@/components/KopaHeader";
import { useThemeColors } from "@/hooks/useTheme";
import { useScrollTabBar } from "@/hooks/useScrollTabBar";

function TeamLogo({ abbrev, bgColor }: { abbrev: string; bgColor: string }) {
  return (
    <View style={[s.teamLogo, { backgroundColor: bgColor }]}>
      <Text style={s.teamLogoText}>{abbrev}</Text>
    </View>
  );
}

function HypeMatchCard() {
  const colors = useThemeColors();
  const fireScale = useSharedValue(1);

  useEffect(() => {
    fireScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 600 }),
        withTiming(1, { duration: 600 }),
      ),
      -1,
    );
  }, []);

  const fireStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }],
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push("/match/1")}
    >
      <View
        style={[
          s.matchCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={s.matchLabelRow}>
          <Text style={[s.matchLabel, { color: colors.textMuted }]}>
            MATCH HYPE DU JOUR
          </Text>
          <Animated.Text style={[s.fireEmoji, fireStyle]}>🔥</Animated.Text>
        </View>
        <View style={s.matchTeams}>
          <View style={s.teamCol}>
            <TeamLogo abbrev="PSG" bgColor="#001E62" />
            <Text style={[s.teamNameSmall, { color: colors.textSecondary }]}>
              Paris
            </Text>
          </View>
          <View style={s.vsContainer}>
            <Text style={[s.vsText, { color: colors.text }]}>VS</Text>
            <Text style={[s.timeText, { color: colors.textMuted }]}>20:45</Text>
          </View>
          <View style={s.teamCol}>
            <TeamLogo abbrev="OM" bgColor="#009BD6" />
            <Text style={[s.teamNameSmall, { color: colors.textSecondary }]}>
              Marseille
            </Text>
          </View>
        </View>
        <View style={[s.hypeBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              s.hypeBarFill,
              { width: "85%", backgroundColor: colors.accent },
            ]}
          />
        </View>
        <Text style={[s.hypeText, { color: colors.textSecondary }]}>
          85% pensent que le PSG va gagner
        </Text>
        <TouchableOpacity
          style={[s.statsButton, { backgroundColor: colors.accent }]}
          activeOpacity={0.85}
          onPress={() => router.push("/match/1")}
        >
          <Text style={s.statsButtonText}>Voir le match</Text>
          <Ionicons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const STORIES = [
  { id: "1", user: "PSG", color: "#001E62", live: true },
  { id: "2", user: "OM", color: "#009BD6", live: true },
  { id: "3", user: "Barça", color: "#A50044", live: false },
  { id: "4", user: "Real", color: "#1A1A1A", live: false },
  { id: "5", user: "Bayern", color: "#DC052D", live: false },
];

const FEED_ITEMS = [
  {
    id: "1",
    user: "Thomas",
    handle: "@thomas_foot99",
    text: "PSG va écraser l'OM ce soir, aucun doute possible 🔥 Le Classique c'est sacré !",
    avatarColor: "#5DE0A8",
    likes: 42,
    comments: 12,
    time: "2h",
  },
  {
    id: "2",
    user: "Léa",
    handle: "@lea_supporter",
    text: "Hâte de voir ce Classique ce soir ! L'OM peut créer la surprise ⚽",
    avatarColor: "#E0A05D",
    likes: 18,
    comments: 5,
    time: "3h",
  },
  {
    id: "3",
    user: "Marc",
    handle: "@marc2535382_",
    text: "Le Barça-Real de demain sera encore plus fou. Vini Jr va régaler",
    avatarColor: "#5D6BE0",
    likes: 31,
    comments: 8,
    time: "4h",
  },
  {
    id: "4",
    user: "Eme",
    handle: "@eme_856",
    text: "Mon prono du jour : PSG 3-1 OM. Mbappé doublé et Dembélé en feu 🔥",
    avatarColor: "#E05D8A",
    likes: 56,
    comments: 21,
    time: "5h",
  },
];

function FeedItem({
  user,
  handle,
  text,
  avatarColor,
  likes,
  comments,
  time,
  index,
}: {
  user: string;
  handle: string;
  text: string;
  avatarColor: string;
  likes: number;
  comments: number;
  time: string;
  index: number;
}) {
  const colors = useThemeColors();
  return (
    <AnimatedCard index={index + 2}>
      <View style={[s.feedItem, { borderBottomColor: colors.border }]}>
        <View style={s.feedTop}>
          <View style={[s.avatar, { backgroundColor: avatarColor }]}>
            <Text style={s.avatarText}>{user[0]}</Text>
          </View>
          <View style={s.feedBody}>
            <View style={s.feedHeader}>
              <View>
                <Text style={[s.feedUsername, { color: colors.text }]}>
                  {user}
                </Text>
                <Text style={[s.feedHandle, { color: colors.textMuted }]}>
                  {handle} · {time}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>
            <Text style={[s.feedText, { color: colors.textSecondary }]}>
              {text}
            </Text>
          </View>
        </View>
        <View style={s.feedActions}>
          <TouchableOpacity style={s.feedAction}>
            <Ionicons name="heart-outline" size={18} color={colors.textMuted} />
            <Text style={[s.feedActionText, { color: colors.textMuted }]}>
              {likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.feedAction}>
            <Ionicons
              name="chatbubble-outline"
              size={16}
              color={colors.textMuted}
            />
            <Text style={[s.feedActionText, { color: colors.textMuted }]}>
              {comments}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.feedAction}>
            <Ionicons
              name="share-social-outline"
              size={16}
              color={colors.textMuted}
            />
          </TouchableOpacity>
          <TouchableOpacity style={s.feedAction}>
            <Ionicons
              name="bookmark-outline"
              size={16}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedCard>
  );
}

export default function AccueilScreen() {
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.storiesRow}
        >
          {STORIES.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={s.storyItem}
              activeOpacity={0.8}
            >
              <View
                style={[
                  s.storyRing,
                  { borderColor: story.live ? colors.accent : colors.border },
                ]}
              >
                <View style={[s.storyAvatar, { backgroundColor: story.color }]}>
                  <Text style={s.storyAvatarText}>{story.user[0]}</Text>
                </View>
              </View>
              <Text
                style={[s.storyName, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                {story.user}
              </Text>
              {story.live && (
                <View
                  style={[
                    s.storyLiveDot,
                    {
                      backgroundColor: colors.accent,
                      borderColor: colors.background,
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <AnimatedCard index={0}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>
            Hype du jour
          </Text>
          <View style={s.cardPadding}>
            <HypeMatchCard />
          </View>
        </AnimatedCard>

        <AnimatedCard index={1}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>Feed</Text>
        </AnimatedCard>

        {FEED_ITEMS.map((item, i) => (
          <FeedItem key={item.id} {...item} index={i} />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  storiesRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 16 },
  storyItem: { alignItems: "center", width: 62 },
  storyRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 2,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  storyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  storyAvatarText: { color: "white", fontSize: 16, fontWeight: "800" },
  storyName: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  storyLiveDot: {
    position: "absolute",
    bottom: 16,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  cardPadding: { paddingHorizontal: 16 },
  matchCard: { borderRadius: 16, padding: 18, borderWidth: 1 },
  matchLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  matchLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 0.8 },
  fireEmoji: { fontSize: 14 },
  matchTeams: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
  },
  teamCol: { alignItems: "center", gap: 6 },
  teamLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  teamLogoText: { color: "white", fontSize: 16, fontWeight: "900" },
  teamNameSmall: { fontSize: 13, fontWeight: "600" },
  vsContainer: { alignItems: "center", gap: 4 },
  vsText: { fontSize: 24, fontWeight: "900" },
  timeText: { fontSize: 13, fontWeight: "600" },
  hypeBar: { height: 4, borderRadius: 2, overflow: "hidden", marginBottom: 8 },
  hypeBarFill: { height: "100%", borderRadius: 2 },
  hypeText: { fontSize: 13, marginBottom: 14 },
  statsButton: {
    borderRadius: 12,
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  statsButtonText: { color: "white", fontSize: 15, fontWeight: "700" },
  feedItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  feedTop: { flexDirection: "row", gap: 10 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "white", fontSize: 16, fontWeight: "700" },
  feedBody: { flex: 1 },
  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  feedUsername: { fontSize: 15, fontWeight: "700" },
  feedHandle: { fontSize: 12, marginBottom: 6 },
  feedText: { fontSize: 14, lineHeight: 20 },
  feedActions: { flexDirection: "row", marginTop: 10, marginLeft: 52, gap: 24 },
  feedAction: { flexDirection: "row", alignItems: "center", gap: 4 },
  feedActionText: { fontSize: 12, fontWeight: "500" },
});
