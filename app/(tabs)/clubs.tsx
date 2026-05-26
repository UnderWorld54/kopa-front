import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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
import { SearchBar } from "@/components/ui/SearchBar";
import { useScrollTabBar } from "@/hooks/useScrollTabBar";
import { useThemeColors } from "@/hooks/useTheme";

const MY_CLUBS = [
  {
    id: "1",
    name: "PSG Nation",
    members: 4820,
    category: "Football",
    color: "#001E62",
    abbrev: "PSG",
    joined: true,
    newPosts: 12,
    description: "La communauté #1 des supporters du PSG",
  },
  {
    id: "2",
    name: "Classico Fans",
    members: 2340,
    category: "Football",
    color: "#A50044",
    abbrev: "CL",
    joined: true,
    newPosts: 5,
    description: "Barça vs Real, le débat éternel",
  },
];
const TRENDING_CLUBS = [
  {
    id: "6",
    name: "Le Classique",
    members: 15200,
    category: "Football",
    color: "#FF4757",
    abbrev: "⚡",
    joined: false,
    trending: true,
    description: "PSG vs OM — Le match de la saison",
  },
];
const SUGGESTED_CLUBS = [
  {
    id: "3",
    name: "NBA France",
    members: 8900,
    category: "Basket",
    color: "#C9082A",
    abbrev: "NBA",
    joined: false,
    description: "Toute la NBA en français",
  },
  {
    id: "4",
    name: "Ligue 1 Officiel",
    members: 22100,
    category: "Football",
    color: "#1B3FA0",
    abbrev: "L1",
    joined: false,
    description: "Le club officiel de la Ligue 1",
  },
  {
    id: "5",
    name: "Tennis Masters",
    members: 3400,
    category: "Tennis",
    color: "#16A34A",
    abbrev: "TM",
    joined: false,
    description: "ATP, WTA et Grand Chelems",
  },
];

type ClubType = {
  id: string;
  name: string;
  members: number;
  category: string;
  color: string;
  abbrev: string;
  joined: boolean;
  newPosts?: number;
  trending?: boolean;
  description?: string;
};

function TrendingClubCard({ club, index }: { club: ClubType; index: number }) {
  return (
    <AnimatedCard index={index}>
      <TouchableOpacity activeOpacity={0.85}>
        <LinearGradient
          colors={[`${club.color}CC`, `${club.color}88`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.trendingCard}
        >
          <View style={s.trendingBadge}>
            <Ionicons name="trending-up" size={12} color="white" />
            <Text style={s.trendingBadgeText}>Trending</Text>
          </View>
          <Text style={s.trendingEmoji}>{club.abbrev}</Text>
          <Text style={s.trendingName}>{club.name}</Text>
          <Text style={s.trendingDesc}>{club.description}</Text>
          <View style={s.trendingFooter}>
            <Text style={s.trendingMembers}>
              {club.members.toLocaleString("fr-FR")} membres
            </Text>
            <TouchableOpacity style={s.trendingJoinBtn} activeOpacity={0.85}>
              <Text style={s.trendingJoinText}>Rejoindre</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedCard>
  );
}

function ClubCard({
  club,
  showJoined,
  index,
}: {
  club: ClubType;
  showJoined?: boolean;
  index: number;
}) {
  const colors = useThemeColors();
  return (
    <AnimatedCard index={index}>
      <TouchableOpacity
        style={[s.clubCard, { borderBottomColor: colors.border }]}
        activeOpacity={0.85}
      >
        <View style={[s.clubAvatar, { backgroundColor: club.color }]}>
          <Text style={s.clubAvatarText}>{club.abbrev}</Text>
        </View>
        <View style={s.clubInfo}>
          <View style={s.clubNameRow}>
            <Text style={[s.clubName, { color: colors.text }]}>
              {club.name}
            </Text>
            {club.newPosts ? (
              <View
                style={[s.newPostsBadge, { backgroundColor: colors.accent }]}
              >
                <Text style={s.newPostsText}>{club.newPosts}</Text>
              </View>
            ) : null}
          </View>
          <Text style={[s.clubMeta, { color: colors.textMuted }]}>
            {club.category} · {club.members.toLocaleString("fr-FR")} membres
          </Text>
        </View>
        {showJoined ? (
          <View style={s.joinedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
          </View>
        ) : (
          <TouchableOpacity
            style={[s.joinBtn, { backgroundColor: colors.accent }]}
            activeOpacity={0.85}
          >
            <Text style={s.joinBtnText}>Rejoindre</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </AnimatedCard>
  );
}

export default function ClubsScreen() {
  const colors = useThemeColors();
  const [search, setSearch] = useState("");
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
        <View style={s.searchPadding}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher un club..."
          />
        </View>

        <Text style={[s.sectionTitle, { color: colors.text }]}>Tendance</Text>
        {TRENDING_CLUBS.map((club, i) => (
          <TrendingClubCard key={club.id} club={club} index={i} />
        ))}

        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>
            Mes clubs
          </Text>
          <Text style={[s.sectionCount, { color: colors.textMuted }]}>
            {MY_CLUBS.length}
          </Text>
        </View>
        {MY_CLUBS.map((club, i) => (
          <ClubCard key={club.id} club={club} showJoined index={i + 1} />
        ))}

        <Text style={[s.sectionTitle, { color: colors.text }]}>
          Suggérés pour toi
        </Text>
        {SUGGESTED_CLUBS.map((club, i) => (
          <ClubCard key={club.id} club={club} index={i + 3} />
        ))}

        <AnimatedCard index={6}>
          <TouchableOpacity
            style={[
              s.createBtn,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            activeOpacity={0.85}
          >
            <View
              style={[s.createIcon, { backgroundColor: `${colors.accent}18` }]}
            >
              <Ionicons name="add" size={22} color={colors.accent} />
            </View>
            <View>
              <Text style={[s.createTitle, { color: colors.text }]}>
                Créer un club
              </Text>
              <Text style={[s.createSubtitle, { color: colors.textMuted }]}>
                Rassemble ta communauté
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        </AnimatedCard>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  searchPadding: { paddingHorizontal: 16, marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionCount: { fontSize: 14, fontWeight: "600", marginTop: 8 },
  trendingCard: { marginHorizontal: 16, borderRadius: 16, padding: 18, gap: 6 },
  trendingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  trendingBadgeText: { color: "white", fontSize: 11, fontWeight: "700" },
  trendingEmoji: { fontSize: 32 },
  trendingName: { color: "white", fontSize: 20, fontWeight: "800" },
  trendingDesc: { color: "rgba(255,255,255,0.8)", fontSize: 13 },
  trendingFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  trendingMembers: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "500",
  },
  trendingJoinBtn: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trendingJoinText: { color: "#1A1A1A", fontSize: 13, fontWeight: "700" },
  clubCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  clubAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  clubAvatarText: { color: "white", fontSize: 14, fontWeight: "800" },
  clubInfo: { flex: 1, gap: 2 },
  clubNameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  clubName: { fontSize: 15, fontWeight: "700" },
  newPostsBadge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  newPostsText: { color: "white", fontSize: 11, fontWeight: "700" },
  clubMeta: { fontSize: 12 },
  joinedBadge: { padding: 4 },
  joinBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 14 },
  joinBtnText: { color: "white", fontSize: 13, fontWeight: "600" },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 6,
    padding: 14,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  createIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  createTitle: { fontSize: 15, fontWeight: "700" },
  createSubtitle: { fontSize: 12, marginTop: 1 },
});
