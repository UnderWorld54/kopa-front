import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KopaHeader } from '@/components/KopaHeader';
import { KopaColors } from '@/constants/theme';

const LIVE_MATCHES = [
  {
    id: '1',
    competition: 'Champions League',
    competitionColor: '#1A237E',
    homeTeam: { name: 'Bayern Munich', abbrev: 'BAY', bgColor: '#DC052D', score: 2 },
    awayTeam: { name: 'Inter Milan', abbrev: 'INT', bgColor: '#1A1A6E', score: 1 },
    minute: "67'",
    viewers: '12 450',
  },
  {
    id: '2',
    competition: 'Europa League',
    competitionColor: '#F97316',
    homeTeam: { name: 'Atletico Madrid', abbrev: 'ATM', bgColor: '#CB3524', score: 0 },
    awayTeam: { name: 'AS Roma', abbrev: 'ROM', bgColor: '#8B0000', score: 0 },
    minute: "23'",
    viewers: '7 230',
  },
];

function LiveBadge() {
  return (
    <View style={styles.liveBadge}>
      <View style={styles.liveDot} />
      <Text style={styles.liveText}>EN DIRECT</Text>
    </View>
  );
}

function LiveMatchCard({ match }: { match: (typeof LIVE_MATCHES)[0] }) {
  return (
    <View style={styles.matchCard}>
      <View style={styles.cardHeader}>
        <View style={[styles.competitionBadge, { backgroundColor: match.competitionColor }]}>
          <Text style={styles.competitionText}>{match.competition}</Text>
        </View>
        <View style={styles.minuteBadge}>
          <Text style={styles.minuteText}>{match.minute}</Text>
        </View>
      </View>

      <View style={styles.teamsRow}>
        <View style={styles.teamSide}>
          <View style={[styles.teamCircle, { backgroundColor: match.homeTeam.bgColor }]}>
            <Text style={styles.teamAbbrev}>{match.homeTeam.abbrev}</Text>
          </View>
          <Text style={styles.teamName}>{match.homeTeam.name}</Text>
        </View>

        <View style={styles.scoreCenter}>
          <Text style={styles.scoreText}>
            {match.homeTeam.score} - {match.awayTeam.score}
          </Text>
        </View>

        <View style={styles.teamSide}>
          <View style={[styles.teamCircle, { backgroundColor: match.awayTeam.bgColor }]}>
            <Text style={styles.teamAbbrev}>{match.awayTeam.abbrev}</Text>
          </View>
          <Text style={styles.teamName}>{match.awayTeam.name}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Ionicons name="eye-outline" size={14} color={KopaColors.textMuted} />
        <Text style={styles.viewersText}>{match.viewers} spectateurs</Text>
        <TouchableOpacity style={styles.watchBtn} activeOpacity={0.85}>
          <Text style={styles.watchBtnText}>Suivre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function LiveScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <Text style={styles.sectionTitle}>En direct</Text>
          <LiveBadge />
        </View>
        {LIVE_MATCHES.map((match) => (
          <LiveMatchCard key={match.id} match={match} />
        ))}

        <Text style={styles.sectionTitle}>À venir aujourd&apos;hui</Text>
        <View style={styles.upcomingCard}>
          <Ionicons name="time-outline" size={40} color={KopaColors.textMuted} />
          <Text style={styles.upcomingTitle}>Prochains matchs</Text>
          <Text style={styles.upcomingSubtitle}>
            PSG vs OM — 20:45{'\n'}
            Barça vs Real Madrid — 20:45
          </Text>
        </View>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    gap: 10,
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  matchCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: KopaColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  competitionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  competitionText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  minuteBadge: {
    backgroundColor: '#FF4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  minuteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  teamSide: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  teamCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamAbbrev: {
    color: 'white',
    fontSize: 12,
    fontWeight: '800',
  },
  teamName: {
    color: KopaColors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreCenter: {
    width: 80,
    alignItems: 'center',
  },
  scoreText: {
    color: KopaColors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewersText: {
    color: KopaColors.textMuted,
    fontSize: 12,
    flex: 1,
  },
  watchBtn: {
    backgroundColor: KopaColors.accent,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
  },
  watchBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  upcomingCard: {
    marginHorizontal: 16,
    backgroundColor: KopaColors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  upcomingTitle: {
    color: KopaColors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  upcomingSubtitle: {
    color: KopaColors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});
