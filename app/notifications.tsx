import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KopaColors } from '@/constants/theme';

type NotifType = 'match' | 'prono' | 'social' | 'club' | 'system';

const NOTIFICATIONS: {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}[] = [
  {
    id: '1',
    type: 'match',
    title: 'PSG vs OM commence !',
    body: 'Le Classique démarre dans 5 minutes. Ne rate pas le coup d\'envoi !',
    time: 'Il y a 2 min',
    read: false,
  },
  {
    id: '2',
    type: 'prono',
    title: 'Prono gagné ! +80 pts',
    body: 'Bayern Munich a bien gagné contre Dortmund. Bravo !',
    time: 'Il y a 1h',
    read: false,
  },
  {
    id: '3',
    type: 'social',
    title: 'Marc a aimé ton post',
    body: '"PSG va écraser l\'OM ce soir" a reçu 12 likes',
    time: 'Il y a 2h',
    read: true,
  },
  {
    id: '4',
    type: 'club',
    title: 'Nouveau dans PSG Nation',
    body: '12 nouveaux messages dans ton club depuis ta dernière visite',
    time: 'Il y a 3h',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Bienvenue sur Kopa !',
    body: 'Explore les matchs live, fais tes pronos et rejoins des clubs',
    time: 'Hier',
    read: true,
  },
  {
    id: '6',
    type: 'prono',
    title: 'Prono perdu',
    body: 'Liverpool vs Chelsea : le match s\'est terminé 2-1, pas un nul',
    time: 'Hier',
    read: true,
  },
  {
    id: '7',
    type: 'match',
    title: 'Barça vs Real Madrid demain',
    body: 'El Clásico à 20:45 — fais ton prono maintenant !',
    time: 'Hier',
    read: true,
  },
];

const NOTIF_ICONS: Record<NotifType, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  match: { icon: 'football', color: KopaColors.accent },
  prono: { icon: 'trending-up', color: KopaColors.orange },
  social: { icon: 'heart', color: KopaColors.live },
  club: { icon: 'people', color: KopaColors.purple },
  system: { icon: 'information-circle', color: KopaColors.textMuted },
};

function NotifItem({ notif, index }: { notif: (typeof NOTIFICATIONS)[0]; index: number }) {
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

  const { icon, color } = NOTIF_ICONS[notif.type];

  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity
        style={[styles.notifItem, !notif.read && styles.notifUnread]}
        activeOpacity={0.7}
      >
        <View style={[styles.notifIcon, { backgroundColor: color + '22' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.notifContent}>
          <View style={styles.notifHeader}>
            <Text style={[styles.notifTitle, !notif.read && styles.notifTitleUnread]} numberOfLines={1}>
              {notif.title}
            </Text>
            {!notif.read && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notifBody} numberOfLines={2}>{notif.body}</Text>
          <Text style={styles.notifTime}>{notif.time}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={KopaColors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Notifications</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="checkmark-done" size={22} color={KopaColors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Nouvelles</Text>
        {NOTIFICATIONS.filter((n) => !n.read).map((notif, i) => (
          <NotifItem key={notif.id} notif={notif} index={i} />
        ))}

        <Text style={styles.sectionLabel}>Plus anciennes</Text>
        {NOTIFICATIONS.filter((n) => n.read).map((notif, i) => (
          <NotifItem key={notif.id} notif={notif} index={i + 2} />
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KopaColors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  navTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLabel: {
    color: KopaColors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  notifItem: {
    flexDirection: 'row',
    padding: 14,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
  },
  notifUnread: {
    backgroundColor: KopaColors.accent + '08',
  },
  notifIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifContent: {
    flex: 1,
    gap: 3,
  },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notifTitle: {
    color: KopaColors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  notifTitleUnread: {
    color: KopaColors.text,
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: KopaColors.accent,
  },
  notifBody: {
    color: KopaColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  notifTime: {
    color: KopaColors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
});
