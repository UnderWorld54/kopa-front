import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  },
  {
    id: '2',
    label: 'Championnat',
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
      name: 'Madrid',
      shortName: 'Madrid',
      abbrev: 'RM',
      rank: '2ème du classement',
      bgColor: '#1A1A1A',
    },
    time: '20:45',
    votes: { home: 42, draw: 18, away: 40 },
  },
  {
    id: '3',
    label: 'Championnat',
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
  },
];

function CompetitionBadge({ name, color }: { name: string; color: string }) {
  return (
    <View style={[styles.competitionBadge, { backgroundColor: color }]}>
      <Text style={styles.competitionText}>{name}</Text>
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
      <Text style={styles.teamName} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.teamRank}>{rank}</Text>
    </View>
  );
}

function VoteBar({ percent }: { percent: number }) {
  return (
    <View style={styles.voteBarBg}>
      <View style={[styles.voteBarFill, { width: `${percent}%` }]} />
    </View>
  );
}

function MatchCard({ match }: { match: (typeof MATCHES)[0] }) {
  const [voted, setVoted] = useState<'home' | 'draw' | 'away' | null>(null);

  return (
    <View style={styles.matchCard}>
      <View style={styles.matchCardHeader}>
        <Text style={styles.matchLabel}>{match.label}</Text>
        <CompetitionBadge name={match.competition} color={match.competitionColor} />
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
            { key: 'home', label: match.homeTeam.shortName },
            { key: 'draw', label: 'Nul' },
            { key: 'away', label: match.awayTeam.shortName },
          ] as const
        ).map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.voteBtn, voted === key && styles.voteBtnActive]}
            onPress={() => setVoted(key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.voteBtnText, voted === key && styles.voteBtnTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.voteBars}>
        <VoteBar percent={match.votes.home} />
        <VoteBar percent={match.votes.draw} />
        <VoteBar percent={match.votes.away} />
      </View>

      <TouchableOpacity style={styles.commentRow}>
        <Ionicons name="chatbubble-outline" size={16} color={KopaColors.textMuted} />
        <Text style={styles.commentText}>Commenter</Text>
      </TouchableOpacity>
    </View>
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
        {MATCHES.map((match) => (
          <MatchCard key={match.id} match={match} />
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
    paddingVertical: 12,
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
    backgroundColor: KopaColors.surfaceLight,
    borderColor: KopaColors.accent,
  },
  filterText: {
    color: KopaColors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  filterTextActive: {
    color: KopaColors.text,
    fontWeight: '600',
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  matchCard: {
    marginHorizontal: 16,
    marginBottom: 16,
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
    marginBottom: 16,
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
    marginBottom: 16,
  },
  teamColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  teamCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamAbbrev: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
  },
  teamName: {
    color: KopaColors.text,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  teamRank: {
    color: KopaColors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  timeCenter: {
    width: 60,
    alignItems: 'center',
  },
  timeText: {
    color: KopaColors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  voteBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: KopaColors.accent,
    alignItems: 'center',
  },
  voteBtnActive: {
    backgroundColor: KopaColors.accentDark,
    borderWidth: 2,
    borderColor: 'white',
  },
  voteBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  voteBtnTextActive: {
    fontWeight: '700',
  },
  voteBars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  voteBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: KopaColors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  voteBarFill: {
    height: '100%',
    backgroundColor: KopaColors.accent,
    borderRadius: 2,
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
