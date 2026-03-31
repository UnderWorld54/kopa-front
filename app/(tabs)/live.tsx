import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedCard } from '@/components/AnimatedCard';
import { KopaHeader } from '@/components/KopaHeader';
import { PulsingDot } from '@/components/PulsingDot';
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
    hot: true,
  },
  {
    id: '2',
    competition: 'Europa League',
    competitionColor: '#F97316',
    homeTeam: { name: 'Atletico Madrid', abbrev: 'ATM', bgColor: '#CB3524', score: 0 },
    awayTeam: { name: 'AS Roma', abbrev: 'ROM', bgColor: '#8B0000', score: 0 },
    minute: "23'",
    viewers: '7 230',
    hot: false,
  },
  {
    id: '3',
    competition: 'Ligue 1',
    competitionColor: '#1B3FA0',
    homeTeam: { name: 'Lyon', abbrev: 'OL', bgColor: '#001F5B', score: 1 },
    awayTeam: { name: 'Monaco', abbrev: 'ASM', bgColor: '#E50000', score: 1 },
    minute: "45'",
    viewers: '5 120',
    hot: false,
  },
];

const UPCOMING = [
  { id: '1', home: 'PSG', away: 'OM', time: '20:45', competition: 'Ligue 1', hype: 95 },
  { id: '2', home: 'Barça', away: 'Real Madrid', time: '20:45', competition: 'LaLiga', hype: 88 },
  { id: '3', home: 'Liverpool', away: 'Man City', time: '17:30', competition: 'Premier League', hype: 82 },
];

function LiveBadge() {
  return (
    <View style={styles.liveBadge}>
      <PulsingDot color="white" size={6} />
      <Text style={styles.liveText}>EN DIRECT</Text>
    </View>
  );
}

function LiveMatchCard({ match, index }: { match: (typeof LIVE_MATCHES)[0]; index: number }) {
  return (
    <AnimatedCard index={index}>
      <TouchableOpacity
        style={styles.matchCard}
        activeOpacity={0.85}
        onPress={() => router.push(`/match/${match.id}`)}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.competitionBadge, { backgroundColor: match.competitionColor }]}>
            <Text style={styles.competitionText}>{match.competition}</Text>
          </View>
          <View style={styles.minuteRow}>
            <PulsingDot color={KopaColors.live} size={6} />
            <Text style={styles.minuteText}>{match.minute}</Text>
          </View>
        </View>

        <View style={styles.teamsRow}>
          <View style={styles.teamSide}>
            <View style={[styles.teamCircle, { backgroundColor: match.homeTeam.bgColor }]}>
              <Text style={styles.teamAbbrev}>{match.homeTeam.abbrev}</Text>
            </View>
            <Text style={styles.teamName} numberOfLines={1}>{match.homeTeam.name}</Text>
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
            <Text style={styles.teamName} numberOfLines={1}>{match.awayTeam.name}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.viewersRow}>
            <Ionicons name="eye-outline" size={14} color={KopaColors.textMuted} />
            <Text style={styles.viewersText}>{match.viewers}</Text>
          </View>
          {match.hot && (
            <View style={styles.hotBadge}>
              <Ionicons name="flame" size={12} color={KopaColors.orange} />
              <Text style={styles.hotText}>Hot</Text>
            </View>
          )}
          <TouchableOpacity style={styles.watchBtn} activeOpacity={0.85}>
            <Text style={styles.watchBtnText}>Suivre</Text>
            <Ionicons name="chevron-forward" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </AnimatedCard>
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
          <View style={styles.matchCountBadge}>
            <Text style={styles.matchCountText}>{LIVE_MATCHES.length}</Text>
          </View>
        </View>

        {LIVE_MATCHES.map((match, i) => (
          <LiveMatchCard key={match.id} match={match} index={i} />
        ))}

        <AnimatedCard index={LIVE_MATCHES.length}>
          <Text style={styles.sectionTitlePadded}>À venir aujourd'hui</Text>
        </AnimatedCard>

        {UPCOMING.map((match, i) => (
          <AnimatedCard key={match.id} index={LIVE_MATCHES.length + 1 + i}>
            <TouchableOpacity style={styles.upcomingItem} activeOpacity={0.8}>
              <View style={styles.upcomingLeft}>
                <Text style={styles.upcomingTeams}>{match.home} vs {match.away}</Text>
                <Text style={styles.upcomingMeta}>{match.competition} · {match.time}</Text>
              </View>
              <View style={styles.upcomingRight}>
                <View style={styles.hypeMeter}>
                  <View style={[styles.hypeMeterFill, { width: `${match.hype}%` }]} />
                </View>
                <Text style={styles.hypePercent}>{match.hype}% hype</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={KopaColors.textMuted} />
            </TouchableOpacity>
          </AnimatedCard>
        ))}
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
    marginTop: 4,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionTitlePadded: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  matchCountBadge: {
    backgroundColor: KopaColors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  matchCountText: {
    color: KopaColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KopaColors.live,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  matchCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: KopaColors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  minuteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: KopaColors.live + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  minuteText: {
    color: KopaColors.live,
    fontSize: 12,
    fontWeight: '700',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamSide: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  teamCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  teamAbbrev: {
    color: 'white',
    fontSize: 12,
    fontWeight: '800',
  },
  teamName: {
    color: KopaColors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreCenter: {
    width: 80,
    alignItems: 'center',
  },
  scoreText: {
    color: KopaColors.text,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  viewersText: {
    color: KopaColors.textMuted,
    fontSize: 12,
  },
  hotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: KopaColors.orange + '18',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  hotText: {
    color: KopaColors.orange,
    fontSize: 11,
    fontWeight: '700',
  },
  watchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KopaColors.accent,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 2,
  },
  watchBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
    gap: 12,
  },
  upcomingLeft: {
    flex: 1,
  },
  upcomingTeams: {
    color: KopaColors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  upcomingMeta: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  upcomingRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  hypeMeter: {
    width: 60,
    height: 3,
    backgroundColor: KopaColors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  hypeMeterFill: {
    height: '100%',
    backgroundColor: KopaColors.accent,
    borderRadius: 2,
  },
  hypePercent: {
    color: KopaColors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
});
