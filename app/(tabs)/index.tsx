import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

import { AnimatedCard } from '@/components/AnimatedCard';
import { KopaHeader } from '@/components/KopaHeader';
import { KopaColors } from '@/constants/theme';

function TeamLogo({ abbrev, bgColor }: { abbrev: string; bgColor: string }) {
  return (
    <View style={[styles.teamLogo, { backgroundColor: bgColor }]}>
      <Text style={styles.teamLogoText}>{abbrev}</Text>
    </View>
  );
}

function HypeMatchCard() {
  const fireScale = useSharedValue(1);

  useEffect(() => {
    fireScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1
    );
  }, []);

  const fireStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }],
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push('/match/1')}
    >
      <LinearGradient
        colors={[KopaColors.surface, '#1E2D4A']}
        style={styles.matchCard}
      >
        <View style={styles.matchLabelRow}>
          <Text style={styles.matchLabel}>MATCH HYPE DU JOUR</Text>
          <Animated.Text style={[styles.fireEmoji, fireStyle]}>🔥</Animated.Text>
        </View>
        <View style={styles.matchTeams}>
          <View style={styles.teamCol}>
            <TeamLogo abbrev="PSG" bgColor="#001E62" />
            <Text style={styles.teamNameSmall}>Paris</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
            <Text style={styles.timeText}>20:45</Text>
          </View>
          <View style={styles.teamCol}>
            <TeamLogo abbrev="OM" bgColor="#009BD6" />
            <Text style={styles.teamNameSmall}>Marseille</Text>
          </View>
        </View>
        <View style={styles.hypeBar}>
          <View style={[styles.hypeBarFill, { width: '85%' }]} />
        </View>
        <Text style={styles.hypeText}>
          85% pensent que le PSG va gagner
        </Text>
        <TouchableOpacity
          style={styles.statsButton}
          activeOpacity={0.85}
          onPress={() => router.push('/match/1')}
        >
          <LinearGradient
            colors={[KopaColors.accent, KopaColors.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statsGradient}
          >
            <Text style={styles.statsButtonText}>Voir le match</Text>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const STORIES = [
  { id: '1', user: 'PSG', color: '#001E62', live: true },
  { id: '2', user: 'OM', color: '#009BD6', live: true },
  { id: '3', user: 'Barça', color: '#A50044', live: false },
  { id: '4', user: 'Real', color: '#1A1A1A', live: false },
  { id: '5', user: 'Bayern', color: '#DC052D', live: false },
];

const FEED_ITEMS = [
  {
    id: '1',
    user: 'Thomas',
    handle: '@thomas_foot99',
    text: "PSG va écraser l'OM ce soir, aucun doute possible 🔥 Le Classique c'est sacré !",
    avatarColor: '#5DE0A8',
    likes: 42,
    comments: 12,
    time: '2h',
  },
  {
    id: '2',
    user: 'Léa',
    handle: '@lea_supporter',
    text: "Hâte de voir ce Classique ce soir ! L'OM peut créer la surprise ⚽",
    avatarColor: '#E0A05D',
    likes: 18,
    comments: 5,
    time: '3h',
  },
  {
    id: '3',
    user: 'Marc',
    handle: '@marc2535382_',
    text: 'Le Barça-Real de demain sera encore plus fou. Vini Jr va régaler',
    avatarColor: '#5D6BE0',
    likes: 31,
    comments: 8,
    time: '4h',
  },
  {
    id: '4',
    user: 'Eme',
    handle: '@eme_856',
    text: 'Mon prono du jour : PSG 3-1 OM. Mbappé doublé et Dembélé en feu 🔥',
    avatarColor: '#E05D8A',
    likes: 56,
    comments: 21,
    time: '5h',
  },
];

function FeedItem({
  user,
  handle,
  text,
  avatarColor,
  likes,
  comments,
  time,
  index,
}: {
  user: string;
  handle: string;
  text: string;
  avatarColor: string;
  likes: number;
  comments: number;
  time: string;
  index: number;
}) {
  return (
    <AnimatedCard index={index + 2}>
      <View style={styles.feedItem}>
        <View style={styles.feedTop}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{user[0]}</Text>
          </View>
          <View style={styles.feedBody}>
            <View style={styles.feedHeader}>
              <View>
                <Text style={styles.feedUsername}>{user}</Text>
                <Text style={styles.feedHandle}>{handle} · {time}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={18} color={KopaColors.textMuted} />
              </TouchableOpacity>
            </View>
            <Text style={styles.feedText}>{text}</Text>
          </View>
        </View>
        <View style={styles.feedActions}>
          <TouchableOpacity style={styles.feedAction}>
            <Ionicons name="heart-outline" size={18} color={KopaColors.textMuted} />
            <Text style={styles.feedActionText}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedAction}>
            <Ionicons name="chatbubble-outline" size={16} color={KopaColors.textMuted} />
            <Text style={styles.feedActionText}>{comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedAction}>
            <Ionicons name="share-social-outline" size={16} color={KopaColors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedAction}>
            <Ionicons name="bookmark-outline" size={16} color={KopaColors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedCard>
  );
}

export default function AccueilScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesRow}
        >
          {STORIES.map((story) => (
            <TouchableOpacity key={story.id} style={styles.storyItem} activeOpacity={0.8}>
              <View style={[styles.storyRing, story.live && styles.storyRingLive]}>
                <View style={[styles.storyAvatar, { backgroundColor: story.color }]}>
                  <Text style={styles.storyAvatarText}>{story.user[0]}</Text>
                </View>
              </View>
              <Text style={styles.storyName} numberOfLines={1}>{story.user}</Text>
              {story.live && <View style={styles.storyLiveDot} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <AnimatedCard index={0}>
          <Text style={styles.sectionTitle}>Hype du jour</Text>
          <View style={styles.cardPadding}>
            <HypeMatchCard />
          </View>
        </AnimatedCard>

        <AnimatedCard index={1}>
          <Text style={styles.sectionTitle}>Feed</Text>
        </AnimatedCard>

        {FEED_ITEMS.map((item, i) => (
          <FeedItem key={item.id} {...item} index={i} />
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
  storiesRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 62,
  },
  storyRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 2,
    borderWidth: 2,
    borderColor: KopaColors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyRingLive: {
    borderColor: KopaColors.accent,
  },
  storyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  storyName: {
    color: KopaColors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  storyLiveDot: {
    position: 'absolute',
    bottom: 16,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: KopaColors.accent,
    borderWidth: 2,
    borderColor: KopaColors.background,
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  cardPadding: {
    paddingHorizontal: 16,
  },
  matchCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  matchLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  matchLabel: {
    color: KopaColors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  fireEmoji: {
    fontSize: 14,
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamCol: {
    alignItems: 'center',
    gap: 6,
  },
  teamLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  teamLogoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  teamNameSmall: {
    color: KopaColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  vsContainer: {
    alignItems: 'center',
    gap: 4,
  },
  vsText: {
    color: KopaColors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  timeText: {
    color: KopaColors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  hypeBar: {
    height: 4,
    backgroundColor: KopaColors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  hypeBarFill: {
    height: '100%',
    backgroundColor: KopaColors.accent,
    borderRadius: 2,
  },
  hypeText: {
    color: KopaColors.textSecondary,
    fontSize: 13,
    marginBottom: 14,
  },
  statsButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  statsGradient: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  statsButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  feedItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
  },
  feedTop: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  feedBody: {
    flex: 1,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  feedUsername: {
    color: KopaColors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  feedHandle: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginBottom: 6,
  },
  feedText: {
    color: KopaColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  feedActions: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 52,
    gap: 24,
  },
  feedAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feedActionText: {
    color: KopaColors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
});
