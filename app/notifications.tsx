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
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColors } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

type NotifType = "match" | "prono" | "social" | "club" | "system";

const NOTIFICATIONS: {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}[] = [
  {
    id: "1",
    type: "match",
    title: "PSG vs OM commence !",
    body: "Le Classique démarre dans 5 minutes. Ne rate pas le coup d'envoi !",
    time: "Il y a 2 min",
    read: false,
  },
  {
    id: "2",
    type: "prono",
    title: "Prono gagné ! +80 pts",
    body: "Bayern Munich a bien gagné contre Dortmund. Bravo !",
    time: "Il y a 1h",
    read: false,
  },
  {
    id: "3",
    type: "social",
    title: "Marc a aimé ton post",
    body: '"PSG va écraser l\'OM ce soir" a reçu 12 likes',
    time: "Il y a 2h",
    read: true,
  },
  {
    id: "4",
    type: "club",
    title: "Nouveau dans PSG Nation",
    body: "12 nouveaux messages dans ton club depuis ta dernière visite",
    time: "Il y a 3h",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "Bienvenue sur Kopa !",
    body: "Explore les matchs live, fais tes pronos et rejoins des clubs",
    time: "Hier",
    read: true,
  },
  {
    id: "6",
    type: "prono",
    title: "Prono perdu",
    body: "Liverpool vs Chelsea : le match s'est terminé 2-1, pas un nul",
    time: "Hier",
    read: true,
  },
  {
    id: "7",
    type: "match",
    title: "Barça vs Real Madrid demain",
    body: "El Clásico à 20:45 — fais ton prono maintenant !",
    time: "Hier",
    read: true,
  },
];

function getNotifIcon(
  type: NotifType,
  colors: ThemeColors,
): { icon: keyof typeof Ionicons.glyphMap; color: string } {
  switch (type) {
    case "match":
      return { icon: "football", color: colors.accent };
    case "prono":
      return { icon: "trending-up", color: colors.orange };
    case "social":
      return { icon: "heart", color: colors.live };
    case "club":
      return { icon: "people", color: colors.purple };
    case "system":
      return { icon: "information-circle", color: colors.textMuted };
  }
}

function NotifItem({
  notif,
  index,
}: {
  notif: (typeof NOTIFICATIONS)[0];
  index: number;
}) {
  const colors = useThemeColors();
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-20);

  useEffect(() => {
    opacity.value = withDelay(index * 60, withTiming(1, { duration: 400 }));
    translateX.value = withDelay(index * 60, withSpring(0, { damping: 20 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const { icon, color } = getNotifIcon(notif.type, colors);

  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity
        style={[
          s.notifItem,
          { borderBottomColor: colors.border },
          !notif.read && { backgroundColor: `${colors.accent}08` },
        ]}
        activeOpacity={0.7}
      >
        <View style={[s.notifIcon, { backgroundColor: color + "22" }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={s.notifContent}>
          <View style={s.notifHeader}>
            <Text
              style={[
                s.notifTitle,
                {
                  color: notif.read ? colors.textSecondary : colors.text,
                  fontWeight: notif.read ? "500" : "700",
                },
              ]}
              numberOfLines={1}
            >
              {notif.title}
            </Text>
            {!notif.read && (
              <View style={[s.unreadDot, { backgroundColor: colors.accent }]} />
            )}
          </View>
          <Text style={[s.notifBody, { color: colors.textMuted }]}>
            {notif.body}
          </Text>
          <Text style={[s.notifTime, { color: colors.textMuted }]}>
            {notif.time}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function NotificationsScreen() {
  const colors = useThemeColors();

  return (
    <SafeAreaView
      style={[s.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={s.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[s.navTitle, { color: colors.text }]}>Notifications</Text>
        <TouchableOpacity style={s.backBtn}>
          <Ionicons name="checkmark-done" size={22} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[s.sectionLabel, { color: colors.textMuted }]}>
          Nouvelles
        </Text>
        {NOTIFICATIONS.filter((n) => !n.read).map((notif, i) => (
          <NotifItem key={notif.id} notif={notif} index={i} />
        ))}

        <Text style={[s.sectionLabel, { color: colors.textMuted }]}>
          Plus anciennes
        </Text>
        {NOTIFICATIONS.filter((n) => n.read).map((notif, i) => (
          <NotifItem key={notif.id} notif={notif} index={i + 2} />
        ))}
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
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  notifItem: {
    flexDirection: "row",
    padding: 14,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  notifIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  notifContent: { flex: 1, gap: 3 },
  notifHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  notifTitle: { fontSize: 14, flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  notifBody: { fontSize: 13, lineHeight: 18 },
  notifTime: { fontSize: 11, marginTop: 2 },
});
