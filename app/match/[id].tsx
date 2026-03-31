import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KopaColors } from '@/constants/theme';

const { width } = Dimensions.get('window');

const MATCH_DATA = {
  competition: 'Ligue 1 — Journée 28',
  homeTeam: {
    name: 'Paris Saint-Germain',
    abbrev: 'PSG',
    bgColor: '#001E62',
    score: 2,
    scorers: ['Mbappé 23\'', 'Dembélé 67\''],
  },
  awayTeam: {
    name: 'Olympique de Marseille',
    abbrev: 'OM',
    bgColor: '#009BD6',
    score: 1,
    scorers: ['Greenwood 45+2\''],
  },
  minute: "78'",
  stadium: 'Parc des Princes',
  viewers: '24 300',
  possession: { home: 62, away: 38 },
  shots: { home: 14, away: 8 },
  shotsOnTarget: { home: 6, away: 3 },
  corners: { home: 7, away: 3 },
  fouls: { home: 9, away: 12 },
};

const EVENTS = [
  { minute: "23'", type: 'goal', team: 'home', text: 'But ! Mbappé', icon: 'football' as const },
  { minute: "34'", type: 'card', team: 'away', text: 'Carton jaune — Balerdi', icon: 'card' as const },
  { minute: "45+2'", type: 'goal', team: 'away', text: 'But ! Greenwood', icon: 'football' as const },
  { minute: "56'", type: 'sub', team: 'home', text: 'Remplacement — Zaïre-Emery', icon: 'swap-horizontal' as const },
  { minute: "67'", type: 'goal', team: 'home', text: 'But ! Dembélé', icon: 'football' as const },
];

const COMMENTS = [
  { id: '1', user: 'Thomas', avatar: '#5DE0A8', text: 'Quel match de Mbappé ! Intenable ce soir', time: '2 min', likes: 24 },
  { id: '2', user: 'Léa', avatar: '#E0A05D', text: 'L\'OM peut encore revenir, il reste du temps', time: '5 min', likes: 8 },
  { id: '3', user: 'Marc', avatar: '#5D6BE0', text: 'Le Parc est en feu 🔥🔥', time: '8 min', likes: 42 },
];

function StatBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = home + away;
  const homePercent = (home / total) * 100;

  return (
    <View style={styles.statBarRow}>
      <Text style={styles.statBarValue}>{home}</Text>
      <View style={styles.statBarCenter}>
        <Text style={styles.statBarLabel}>{label}</Text>
        <View style={styles.statBarTrack}>
          <View style={[styles.statBarFillHome, { width: `${homePercent}%` }]} />
        </View>
      </View>
      <Text style={styles.statBarValue}>{away}</Text>
    </View>
  );
}

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams();
  const scoreScale = useSharedValue(0.5);
  const scoreOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    scoreScale.value = withSpring(1, { damping: 10, stiffness: 80 });
    scoreOpacity.value = withTiming(1, { duration: 600 });
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1
    );
  }, []);

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scoreScale.value }],
    opacity: scoreOpacity.value,
  }));

  const livePulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={KopaColors.text} />
        </TouchableOpacity>
        <View style={styles.liveBadge}>
          <Animated.View style={[styles.liveDot, livePulseStyle]} />
          <Text style={styles.liveText}>EN DIRECT</Text>
        </View>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="share-social-outline" size={22} color={KopaColors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[KopaColors.surface, KopaColors.background]}
          style={styles.scoreSection}
        >
          <Text style={styles.competitionLabel}>{MATCH_DATA.competition}</Text>

          <View style={styles.scoreRow}>
            <View style={styles.teamSide}>
              <View style={[styles.teamCircle, { backgroundColor: MATCH_DATA.homeTeam.bgColor }]}>
                <Text style={styles.teamAbbrev}>{MATCH_DATA.homeTeam.abbrev}</Text>
              </View>
              <Text style={styles.teamName}>{MATCH_DATA.homeTeam.name}</Text>
            </View>

            <Animated.View style={[styles.scoreCenterCol, scoreStyle]}>
              <Text style={styles.mainScore}>
                {MATCH_DATA.homeTeam.score} - {MATCH_DATA.awayTeam.score}
              </Text>
              <View style={styles.minuteChip}>
                <Text style={styles.minuteText}>{MATCH_DATA.minute}</Text>
              </View>
            </Animated.View>

            <View style={styles.teamSide}>
              <View style={[styles.teamCircle, { backgroundColor: MATCH_DATA.awayTeam.bgColor }]}>
                <Text style={styles.teamAbbrev}>{MATCH_DATA.awayTeam.abbrev}</Text>
              </View>
              <Text style={styles.teamName}>{MATCH_DATA.awayTeam.name}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={KopaColors.textMuted} />
            <Text style={styles.metaText}>{MATCH_DATA.stadium}</Text>
            <Ionicons name="eye-outline" size={14} color={KopaColors.textMuted} />
            <Text style={styles.metaText}>{MATCH_DATA.viewers}</Text>
          </View>
        </LinearGradient>

        {/* Events timeline */}
        <Text style={styles.sectionTitle}>Événements</Text>
        <View style={styles.timeline}>
          {EVENTS.map((event, i) => {
            const isHome = event.team === 'home';
            return (
              <View key={i} style={styles.timelineItem}>
                <Text style={[styles.eventMinute, !isHome && styles.eventMinuteAway]}>
                  {event.minute}
                </Text>
                <View style={styles.timelineLine}>
                  <View style={[
                    styles.timelineDot,
                    event.type === 'goal' && styles.timelineDotGoal,
                    event.type === 'card' && styles.timelineDotCard,
                  ]} />
                </View>
                <View style={styles.eventContent}>
                  <Ionicons
                    name={event.icon}
                    size={16}
                    color={event.type === 'goal' ? KopaColors.accent : event.type === 'card' ? KopaColors.warning : KopaColors.textMuted}
                  />
                  <Text style={styles.eventText}>{event.text}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statsCard}>
          <View style={styles.statsTeamNames}>
            <Text style={styles.statsTeamName}>{MATCH_DATA.homeTeam.abbrev}</Text>
            <Text style={styles.statsTeamName}>{MATCH_DATA.awayTeam.abbrev}</Text>
          </View>
          <StatBar label="Possession" home={MATCH_DATA.possession.home} away={MATCH_DATA.possession.away} />
          <StatBar label="Tirs" home={MATCH_DATA.shots.home} away={MATCH_DATA.shots.away} />
          <StatBar label="Tirs cadrés" home={MATCH_DATA.shotsOnTarget.home} away={MATCH_DATA.shotsOnTarget.away} />
          <StatBar label="Corners" home={MATCH_DATA.corners.home} away={MATCH_DATA.corners.away} />
          <StatBar label="Fautes" home={MATCH_DATA.fouls.home} away={MATCH_DATA.fouls.away} />
        </View>

        {/* Comments */}
        <Text style={styles.sectionTitle}>Réactions</Text>
        {COMMENTS.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <View style={[styles.commentAvatar, { backgroundColor: comment.avatar }]}>
              <Text style={styles.commentAvatarText}>{comment.user[0]}</Text>
            </View>
            <View style={styles.commentBody}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentUser}>{comment.user}</Text>
                <Text style={styles.commentTime}>{comment.time}</Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
              <TouchableOpacity style={styles.commentLike}>
                <Ionicons name="heart-outline" size={14} color={KopaColors.textMuted} />
                <Text style={styles.commentLikeCount}>{comment.likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.commentInputBtn} activeOpacity={0.85}>
          <Ionicons name="chatbubble-outline" size={18} color={KopaColors.accent} />
          <Text style={styles.commentInputText}>Ajouter une réaction...</Text>
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KopaColors.live,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  liveText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scoreSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  competitionLabel: {
    color: KopaColors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  teamSide: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  teamAbbrev: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  teamName: {
    color: KopaColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreCenterCol: {
    width: 100,
    alignItems: 'center',
    gap: 8,
  },
  mainScore: {
    color: KopaColors.text,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 2,
  },
  minuteChip: {
    backgroundColor: KopaColors.live,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  minuteText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  metaText: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginRight: 10,
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  timeline: {
    paddingHorizontal: 16,
    gap: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 44,
  },
  eventMinute: {
    width: 40,
    color: KopaColors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
  },
  eventMinuteAway: {},
  timelineLine: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: KopaColors.surfaceLight,
    borderWidth: 2,
    borderColor: KopaColors.border,
  },
  timelineDotGoal: {
    backgroundColor: KopaColors.accent,
    borderColor: KopaColors.accent,
  },
  timelineDotCard: {
    backgroundColor: KopaColors.warning,
    borderColor: KopaColors.warning,
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    backgroundColor: KopaColors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  eventText: {
    color: KopaColors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  statsCard: {
    marginHorizontal: 16,
    backgroundColor: KopaColors.surface,
    borderRadius: 14,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  statsTeamNames: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsTeamName: {
    color: KopaColors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  statBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statBarValue: {
    color: KopaColors.text,
    fontSize: 13,
    fontWeight: '700',
    width: 30,
    textAlign: 'center',
  },
  statBarCenter: {
    flex: 1,
    gap: 4,
  },
  statBarLabel: {
    color: KopaColors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  statBarTrack: {
    height: 4,
    backgroundColor: KopaColors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  statBarFillHome: {
    height: '100%',
    backgroundColor: KopaColors.accent,
    borderRadius: 2,
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  commentBody: {
    flex: 1,
    gap: 3,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentUser: {
    color: KopaColors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  commentTime: {
    color: KopaColors.textMuted,
    fontSize: 11,
  },
  commentText: {
    color: KopaColors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  commentLikeCount: {
    color: KopaColors.textMuted,
    fontSize: 12,
  },
  commentInputBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: KopaColors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  commentInputText: {
    color: KopaColors.textMuted,
    fontSize: 14,
  },
});
