import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedCard } from '@/components/AnimatedCard';
import { KopaHeader } from '@/components/KopaHeader';
import { KopaColors } from '@/constants/theme';

const TABS = ['Mes pronos', 'Classement'];

const MY_PRONOS = [
  {
    id: '1',
    match: 'PSG vs OM',
    competition: 'Ligue 1',
    date: "Aujourd'hui 20:45",
    prediction: 'PSG gagne',
    odds: '1.45',
    status: 'pending' as const,
    points: 50,
  },
  {
    id: '2',
    match: 'Bayern vs Dortmund',
    competition: 'Bundesliga',
    date: 'Hier 18:30',
    prediction: 'Bayern gagne',
    odds: '1.60',
    status: 'won' as const,
    points: 80,
  },
  {
    id: '3',
    match: 'Liverpool vs Chelsea',
    competition: 'Premier League',
    date: '29 Mars 16:00',
    prediction: 'Nul',
    odds: '3.20',
    status: 'lost' as const,
    points: 0,
  },
  {
    id: '4',
    match: 'Barça vs Séville',
    competition: 'LaLiga',
    date: '28 Mars 21:00',
    prediction: 'Barça gagne',
    odds: '1.35',
    status: 'won' as const,
    points: 45,
  },
];

const LEADERBOARD = [
  { rank: 1, user: 'Alex_Pro', points: 1240, avatar: '#F97316', winRate: '82%', streak: 7 },
  { rank: 2, user: 'Footmaster', points: 1180, avatar: '#8B5CF6', winRate: '76%', streak: 4 },
  { rank: 3, user: 'PronoBoss', points: 1050, avatar: '#10B981', winRate: '71%', streak: 3 },
  { rank: 4, user: 'Toi', points: 820, avatar: KopaColors.accent, isMe: true, winRate: '68%', streak: 2 },
  { rank: 5, user: 'SportFan', points: 780, avatar: '#E05D8A', winRate: '65%', streak: 1 },
  { rank: 6, user: 'KingProno', points: 720, avatar: '#5D6BE0', winRate: '63%', streak: 0 },
];

type PronoStatus = 'pending' | 'won' | 'lost';

const STATUS_CONFIG: Record<PronoStatus, { color: string; label: string; icon: keyof typeof Ionicons.glyphMap }> = {
  pending: { color: '#F59E0B', label: 'En attente', icon: 'time-outline' },
  won: { color: KopaColors.accent, label: 'Gagné', icon: 'checkmark-circle' },
  lost: { color: '#EF4444', label: 'Perdu', icon: 'close-circle' },
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
    <Animated.View style={[styles.statCard, animStyle]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

function PronoCard({ prono, index }: { prono: (typeof MY_PRONOS)[0]; index: number }) {
  const config = STATUS_CONFIG[prono.status];

  return (
    <AnimatedCard index={index}>
      <View style={styles.pronoCard}>
        <View style={styles.pronoHeader}>
          <View style={styles.pronoInfo}>
            <Text style={styles.pronoMatch}>{prono.match}</Text>
            <Text style={styles.pronoMeta}>
              {prono.competition} · {prono.date}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: config.color + '18' }]}>
            <Ionicons name={config.icon} size={12} color={config.color} />
            <Text style={[styles.statusText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
        </View>
        <View style={styles.pronoFooter}>
          <View style={styles.predictionRow}>
            <View style={styles.predictionChip}>
              <Text style={styles.predictionText}>{prono.prediction}</Text>
            </View>
            <Text style={styles.oddsText}>×{prono.odds}</Text>
          </View>
          <Text style={[styles.pointsText, { color: config.color }]}>
            {prono.status === 'lost' ? '0 pt' : `+${prono.points} pts`}
          </Text>
        </View>
      </View>
    </AnimatedCard>
  );
}

export default function PronosScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats overview */}
        <View style={styles.statsRow}>
          <AnimatedStat value="820" label="Points" color={KopaColors.accent} index={0} />
          <AnimatedStat value="68%" label="Réussite" color={KopaColors.teal} index={1} />
          <AnimatedStat value="24" label="Pronos" color={KopaColors.purple} index={2} />
        </View>

        {/* Tab switcher */}
        <View style={styles.tabRow}>
          {TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === i && styles.tabBtnActive]}
              onPress={() => setActiveTab(i)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 0 ? (
          <>
            {MY_PRONOS.map((prono, i) => (
              <PronoCard key={prono.id} prono={prono} index={i} />
            ))}
          </>
        ) : (
          <View style={styles.leaderboardCard}>
            {LEADERBOARD.map((entry, i) => (
              <AnimatedCard key={entry.rank} index={i}>
                <View
                  style={[styles.leaderRow, entry.isMe && styles.leaderRowMe]}
                >
                  <Text style={styles.rankText}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                  </Text>
                  <View style={[styles.leaderAvatar, { backgroundColor: entry.avatar }]}>
                    <Text style={styles.leaderAvatarText}>{entry.user[0]}</Text>
                  </View>
                  <View style={styles.leaderInfo}>
                    <Text style={[styles.leaderName, entry.isMe && styles.leaderNameMe]}>
                      {entry.user}
                    </Text>
                    <Text style={styles.leaderMeta}>
                      {entry.winRate} réussite
                      {entry.streak > 0 ? ` · 🔥${entry.streak}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.leaderPoints}>{entry.points} pts</Text>
                </View>
              </AnimatedCard>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.newPronoBtn} activeOpacity={0.85}>
          <LinearGradient
            colors={[KopaColors.accent, KopaColors.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.newPronoBtnGradient}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text style={styles.newPronoBtnText}>Faire un prono</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KopaColors.background,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: KopaColors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: KopaColors.textMuted,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 14,
    backgroundColor: KopaColors.surface,
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: KopaColors.accent,
  },
  tabText: {
    color: KopaColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: 'white',
    fontWeight: '700',
  },
  pronoCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: KopaColors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  pronoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  pronoInfo: {
    flex: 1,
  },
  pronoMatch: {
    color: KopaColors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  pronoMeta: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  pronoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  predictionChip: {
    backgroundColor: KopaColors.accent + '18',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  predictionText: {
    color: KopaColors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  oddsText: {
    color: KopaColors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  pointsText: {
    fontSize: 15,
    fontWeight: '800',
  },
  leaderboardCard: {
    marginHorizontal: 16,
    backgroundColor: KopaColors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
  },
  leaderRowMe: {
    backgroundColor: KopaColors.accent + '12',
  },
  rankText: {
    color: KopaColors.textMuted,
    fontSize: 14,
    width: 28,
    textAlign: 'center',
  },
  leaderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    color: KopaColors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  leaderNameMe: {
    color: KopaColors.accent,
    fontWeight: '700',
  },
  leaderMeta: {
    color: KopaColors.textMuted,
    fontSize: 11,
    marginTop: 1,
  },
  leaderPoints: {
    color: KopaColors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  newPronoBtn: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: KopaColors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  newPronoBtnGradient: {
    flexDirection: 'row',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  newPronoBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
