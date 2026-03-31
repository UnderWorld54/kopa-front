import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

const BADGES = [
  { id: '1', icon: 'flame' as const, label: 'Série de 7', color: KopaColors.live, unlocked: true },
  { id: '2', icon: 'trophy' as const, label: 'Top 10', color: KopaColors.gold, unlocked: true },
  { id: '3', icon: 'star' as const, label: '50 pronos', color: KopaColors.purple, unlocked: true },
  { id: '4', icon: 'diamond' as const, label: 'Expert', color: KopaColors.teal, unlocked: false },
  { id: '5', icon: 'medal' as const, label: '#1 Club', color: KopaColors.orange, unlocked: false },
];

const SETTINGS_ITEMS = [
  { icon: 'notifications-outline' as const, label: 'Notifications', chevron: true },
  { icon: 'shield-outline' as const, label: 'Confidentialité', chevron: true },
  { icon: 'color-palette-outline' as const, label: 'Apparence', chevron: true },
  { icon: 'help-circle-outline' as const, label: 'Aide & Support', chevron: true },
  { icon: 'information-circle-outline' as const, label: 'À propos', chevron: true },
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
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(200 + index * 100, withTiming(1, { duration: 500 }));
    scale.value = withDelay(200 + index * 100, withSpring(1, { damping: 15 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.statCard, animStyle]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

export default function ProfileScreen() {
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={KopaColors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Profil</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="create-outline" size={22} color={KopaColors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={headerStyle}>
          <LinearGradient
            colors={[KopaColors.surface, KopaColors.background]}
            style={styles.profileHeader}
          >
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>A</Text>
            </View>
            <Text style={styles.profileName}>Angelo</Text>
            <Text style={styles.profileHandle}>@angelo_kopa</Text>
            <Text style={styles.profileBio}>Fan de foot. PSG en force. Pronostiqueur depuis 2024.</Text>

            <View style={styles.followRow}>
              <View style={styles.followItem}>
                <Text style={styles.followCount}>142</Text>
                <Text style={styles.followLabel}>Abonnés</Text>
              </View>
              <View style={styles.followDivider} />
              <View style={styles.followItem}>
                <Text style={styles.followCount}>89</Text>
                <Text style={styles.followLabel}>Abonnements</Text>
              </View>
              <View style={styles.followDivider} />
              <View style={styles.followItem}>
                <Text style={styles.followCount}>3</Text>
                <Text style={styles.followLabel}>Clubs</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.statsRow}>
          <AnimatedStat value="820" label="Points" index={0} />
          <AnimatedStat value="68%" label="Réussite" index={1} />
          <AnimatedStat value="24" label="Pronos" index={2} />
          <AnimatedStat value="#4" label="Rang" index={3} />
        </View>

        <Text style={styles.sectionTitle}>Badges</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgesContent}
        >
          {BADGES.map((badge) => (
            <View
              key={badge.id}
              style={[styles.badgeCard, !badge.unlocked && styles.badgeLocked]}
            >
              <View style={[styles.badgeIcon, { backgroundColor: badge.unlocked ? badge.color + '22' : KopaColors.surfaceLight }]}>
                <Ionicons
                  name={badge.icon}
                  size={22}
                  color={badge.unlocked ? badge.color : KopaColors.textMuted}
                />
              </View>
              <Text style={[styles.badgeLabel, !badge.unlocked && styles.badgeLabelLocked]}>
                {badge.label}
              </Text>
              {!badge.unlocked && (
                <Ionicons name="lock-closed" size={10} color={KopaColors.textMuted} />
              )}
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Paramètres</Text>
        <View style={styles.settingsCard}>
          {SETTINGS_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.settingsRow, i < SETTINGS_ITEMS.length - 1 && styles.settingsRowBorder]}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={22} color={KopaColors.textSecondary} />
              <Text style={styles.settingsLabel}>{item.label}</Text>
              {item.chevron && (
                <Ionicons name="chevron-forward" size={18} color={KopaColors.textMuted} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color={KopaColors.live} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 6,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: KopaColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: KopaColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarLargeText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '800',
  },
  profileName: {
    color: KopaColors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  profileHandle: {
    color: KopaColors.textMuted,
    fontSize: 14,
  },
  profileBio: {
    color: KopaColors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  followRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 20,
  },
  followItem: {
    alignItems: 'center',
  },
  followCount: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  followLabel: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  followDivider: {
    width: 1,
    height: 24,
    backgroundColor: KopaColors.border,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: KopaColors.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  statValue: {
    color: KopaColors.accent,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: KopaColors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  badgesContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  badgeCard: {
    backgroundColor: KopaColors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    width: 90,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  badgeLocked: {
    opacity: 0.5,
  },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLabel: {
    color: KopaColors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  badgeLabelLocked: {
    color: KopaColors.textMuted,
  },
  settingsCard: {
    marginHorizontal: 16,
    backgroundColor: KopaColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: KopaColors.border,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  settingsRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
  },
  settingsLabel: {
    color: KopaColors.text,
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: KopaColors.live + '15',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: KopaColors.live + '30',
  },
  logoutText: {
    color: KopaColors.live,
    fontSize: 15,
    fontWeight: '600',
  },
});
