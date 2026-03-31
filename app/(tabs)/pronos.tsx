import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KopaHeader } from '@/components/KopaHeader';
import { KopaColors } from '@/constants/theme';

const MY_PRONOS = [
  {
    id: '1',
    match: 'PSG vs OM',
    competition: 'Ligue 1',
    date: 'Aujourd\'hui 20:45',
    prediction: 'PSG gagne',
    odds: '1.45',
    status: 'pending',
    points: 50,
  },
  {
    id: '2',
    match: 'Bayern vs Dortmund',
    competition: 'Bundesliga',
    date: 'Hier 18:30',
    prediction: 'Bayern gagne',
    odds: '1.60',
    status: 'won',
    points: 80,
  },
  {
    id: '3',
    match: 'Liverpool vs Chelsea',
    competition: 'Premier League',
    date: '29 Mars 16:00',
    prediction: 'Nul',
    odds: '3.20',
    status: 'lost',
    points: 0,
  },
];

const LEADERBOARD = [
  { rank: 1, user: 'Alex_Pro', points: 1240, avatar: '#F97316' },
  { rank: 2, user: 'Footmaster', points: 1180, avatar: '#8B5CF6' },
  { rank: 3, user: 'PronoBoss', points: 1050, avatar: '#10B981' },
  { rank: 4, user: 'Toi', points: 820, avatar: KopaColors.accent, isMe: true },
];

type PronoStatus = 'pending' | 'won' | 'lost';

const STATUS_COLORS: Record<PronoStatus, string> = {
  pending: '#F59E0B',
  won: KopaColors.accent,
  lost: '#EF4444',
};

const STATUS_LABELS: Record<PronoStatus, string> = {
  pending: 'En attente',
  won: 'Gagné',
  lost: 'Perdu',
};

function PronoCard({ prono }: { prono: (typeof MY_PRONOS)[0] }) {
  const statusColors = STATUS_COLORS;
  const statusLabels = STATUS_LABELS;
  const status = prono.status as PronoStatus;

  return (
    <View style={styles.pronoCard}>
      <View style={styles.pronoHeader}>
        <View>
          <Text style={styles.pronoMatch}>{prono.match}</Text>
          <Text style={styles.pronoMeta}>
            {prono.competition} · {prono.date}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[status] + '22' }]}>
          <Text style={[styles.statusText, { color: statusColors[status] }]}>
            {statusLabels[status]}
          </Text>
        </View>
      </View>
      <View style={styles.pronoFooter}>
        <View style={styles.predictionRow}>
          <Ionicons name="checkmark-circle-outline" size={16} color={KopaColors.accent} />
          <Text style={styles.predictionText}>{prono.prediction}</Text>
          <Text style={styles.oddsText}>Cote {prono.odds}</Text>
        </View>
        <Text style={[styles.pointsText, { color: statusColors[status] }]}>
          {prono.status === 'pending' ? `+${prono.points} pts` : prono.status === 'won' ? `+${prono.points} pts` : '0 pt'}
        </Text>
      </View>
    </View>
  );
}

export default function PronosScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>820</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>68%</Text>
            <Text style={styles.statLabel}>Réussite</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Pronos</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Mes pronos</Text>
        {MY_PRONOS.map((prono) => (
          <PronoCard key={prono.id} prono={prono} />
        ))}

        <Text style={styles.sectionTitle}>Classement</Text>
        <View style={styles.leaderboardCard}>
          {LEADERBOARD.map((entry) => (
            <View
              key={entry.rank}
              style={[styles.leaderRow, entry.isMe && styles.leaderRowMe]}
            >
              <Text style={[styles.rankText, entry.rank <= 3 && styles.rankTextTop]}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
              </Text>
              <View style={[styles.leaderAvatar, { backgroundColor: entry.avatar }]}>
                <Text style={styles.leaderAvatarText}>{entry.user[0]}</Text>
              </View>
              <Text style={[styles.leaderName, entry.isMe && styles.leaderNameMe]}>
                {entry.user}
              </Text>
              <Text style={styles.leaderPoints}>{entry.points} pts</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.newPronoBtn} activeOpacity={0.85}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.newPronoBtnText}>Faire un prono</Text>
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
    gap: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: KopaColors.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  statValue: {
    color: KopaColors.accent,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pronoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  predictionText: {
    color: KopaColors.textSecondary,
    fontSize: 13,
  },
  oddsText: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginLeft: 4,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '700',
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
    backgroundColor: KopaColors.accent + '15',
  },
  rankText: {
    color: KopaColors.textMuted,
    fontSize: 13,
    width: 28,
    textAlign: 'center',
  },
  rankTextTop: {
    fontSize: 16,
  },
  leaderAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  leaderName: {
    color: KopaColors.text,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  leaderNameMe: {
    color: KopaColors.accent,
    fontWeight: '700',
  },
  leaderPoints: {
    color: KopaColors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  newPronoBtn: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: KopaColors.accent,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  newPronoBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
