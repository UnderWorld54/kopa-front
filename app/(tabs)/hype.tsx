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

const FILTERS = [
  { id: 'hype', label: 'Hype 🔥' },
  { id: 'football', label: 'Football ⚽' },
  { id: 'basket', label: 'Basket 🏀' },
  { id: 'tennis', label: 'Tennis 🎾' },
  { id: 'rugby', label: 'Rugby 🏉' },
];

const MATCHES = [
  {
    id: '1',
    label: 'MATCH HYPE DU JOUR 🔥',
    competition: 'Ligue 1',
    competitionColor: '#1B3FA0',
    homeTeam: {
      name: 'Paris Saint-Germain',
      shortName: 'Paris',
      abbrev: 'PSG',
      rank: '1er du classement',
      bgColor: '#001E62',
    },
    awayTeam: {
      name: 'Olympique de Marseille',
      shortName: 'Marseille',
      abbrev: 'OM',
      rank: '3ème du classement',
      bgColor: '#009BD6',
    },
    time: '20:45',
    votes: { home: 65, draw: 15, away: 20 },
    totalVotes: 2450,
  },
  {
    id: '2',
    label: 'EL CLÁSICO',
    competition: 'LaLiga',
    competitionColor: '#EE3024',
    homeTeam: {
      name: 'Barcelone',
      shortName: 'Barça',
      abbrev: 'FCB',
      rank: '1er du classement',
      bgColor: '#A50044',
    },
    awayTeam: {
      name: 'Real Madrid',
      shortName: 'Madrid',
      abbrev: 'RM',
      rank: '2ème du classement',
      bgColor: '#1A1A1A',
    },
    time: '20:45',
    votes: { home: 42, draw: 18, away: 40 },
    totalVotes: 1820,
  },
  {
    id: '3',
    label: 'TOP AFFICHE',
    competition: 'Premier League',
    competitionColor: '#3D195B',
    homeTeam: {
      name: 'Manchester City',
      shortName: 'City',
      abbrev: 'MCI',
      rank: '2ème du classement',
      bgColor: '#6DCFF6',
    },
    awayTeam: {
      name: 'Arsenal',
      shortName: 'Arsenal',
      abbrev: 'ARS',
      rank: '1er du classement',
      bgColor: '#EF0107',
    },
    time: '18:30',
    votes: { home: 35, draw: 25, away: 40 },
    totalVotes: 1340,
  },
];

function AnimatedVoteBar({ percent, delay: delayMs }: { percent: number; delay: number }) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(delayMs, withSpring(percent, { damping: 20, stiffness: 80 }));
  }, [percent]);

  const animStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    height: '100%',
    backgroundColor: KopaColors.accent,
    borderRadius: 2,
  }));

  return (
    <View style={styles.voteBarBg}>
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
  return (
    <View style={styles.teamColumn}>
      <View style={[styles.teamCircle, { backgroundColor: bgColor }]}>
        <Text style={styles.teamAbbrev}>{abbrev}</Text>
      </View>
      <Text style={styles.teamName} numberOfLines={2}>{name}</Text>
      <Text style={styles.teamRank}>{rank}</Text>
    </View>
  );
}

function MatchCard({ match, index }: { match: (typeof MATCHES)[0]; index: number }) {
  const [voted, setVoted] = useState<'home' | 'draw' | 'away' | null>(null);

  return (
    <AnimatedCard index={index}>
      <View style={styles.matchCard}>
        <View style={styles.matchCardHeader}>
          <Text style={styles.matchLabel}>{match.label}</Text>
          <View style={[styles.competitionBadge, { backgroundColor: match.competitionColor }]}>
            <Text style={styles.competitionText}>{match.competition}</Text>
          </View>
        </View>

        <View style={styles.teamsRow}>
          <TeamColumn
            abbrev={match.homeTeam.abbrev}
            name={match.homeTeam.name}
            rank={match.homeTeam.rank}
            bgColor={match.homeTeam.bgColor}
          />
          <View style={styles.timeCenter}>
            <Text style={styles.timeText}>{match.time}</Text>
            <Text style={styles.totalVotes}>{match.totalVotes.toLocaleString('fr-FR')} votes</Text>
          </View>
          <TeamColumn
            abbrev={match.awayTeam.abbrev}
            name={match.awayTeam.name}
            rank={match.awayTeam.rank}
            bgColor={match.awayTeam.bgColor}
          />
        </View>

        <View style={styles.voteButtons}>
          {(
            [
              { key: 'home', label: match.homeTeam.shortName, pct: match.votes.home },
              { key: 'draw', label: 'Nul', pct: match.votes.draw },
              { key: 'away', label: match.awayTeam.shortName, pct: match.votes.away },
            ] as const
          ).map(({ key, label, pct }) => (
            <TouchableOpacity
              key={key}
              style={[styles.voteBtn, voted === key && styles.voteBtnActive]}
              onPress={() => setVoted(key)}
              activeOpacity={0.8}
            >
              {voted === key ? (
                <LinearGradient
                  colors={[KopaColors.accent, KopaColors.accentDark]}
                  style={styles.voteBtnGradient}
                >
                  <Text style={styles.voteBtnTextActive}>{label}</Text>
                  <Text style={styles.votePct}>{pct}%</Text>
                </LinearGradient>
              ) : (
                <View style={styles.voteBtnInner}>
                  <Text style={styles.voteBtnText}>{label}</Text>
                  <Text style={styles.votePctInactive}>{pct}%</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.voteBars}>
          <AnimatedVoteBar percent={match.votes.home} delay={index * 100 + 200} />
          <AnimatedVoteBar percent={match.votes.draw} delay={index * 100 + 300} />
          <AnimatedVoteBar percent={match.votes.away} delay={index * 100 + 400} />
        </View>

        <TouchableOpacity style={styles.commentRow}>
          <Ionicons name="chatbubble-outline" size={15} color={KopaColors.textMuted} />
          <Text style={styles.commentText}>Commenter</Text>
          <View style={{ flex: 1 }} />
          <Ionicons name="share-social-outline" size={15} color={KopaColors.textMuted} />
        </TouchableOpacity>
      </View>
    </AnimatedCard>
  );
}

export default function HypeScreen() {
  const [activeFilter, setActiveFilter] = useState('hype');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.filterChip, activeFilter === f.id && styles.filterChipActive]}
            onPress={() => setActiveFilter(f.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, activeFilter === f.id && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Matchs du jour</Text>
        {MATCHES.map((match, i) => (
          <MatchCard key={match.id} match={match} index={i} />
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
  filtersScroll: {
    flexGrow: 0,
  },
  filtersContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: KopaColors.surface,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  filterChipActive: {
    backgroundColor: KopaColors.accent + '18',
    borderColor: KopaColors.accent,
  },
  filterText: {
    color: KopaColors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  filterTextActive: {
    color: KopaColors.accent,
    fontWeight: '700',
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
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
  matchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  matchLabel: {
    color: KopaColors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    flex: 1,
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
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  teamColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  teamCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
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
    fontSize: 13,
    fontWeight: '800',
  },
  teamName: {
    color: KopaColors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  teamRank: {
    color: KopaColors.textMuted,
    fontSize: 10,
    textAlign: 'center',
  },
  timeCenter: {
    width: 70,
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  totalVotes: {
    color: KopaColors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  voteBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: KopaColors.surfaceLight,
  },
  voteBtnActive: {
    backgroundColor: 'transparent',
  },
  voteBtnGradient: {
    paddingVertical: 10,
    alignItems: 'center',
    gap: 2,
  },
  voteBtnInner: {
    paddingVertical: 10,
    alignItems: 'center',
    gap: 2,
  },
  voteBtnText: {
    color: KopaColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  voteBtnTextActive: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  votePct: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '600',
  },
  votePctInactive: {
    color: KopaColors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  voteBars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  voteBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: KopaColors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentText: {
    color: KopaColors.textMuted,
    fontSize: 13,
  },
});
