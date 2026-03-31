import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  return (
    <View style={styles.matchCard}>
      <Text style={styles.matchLabel}>MATCH HYPE DU JOUR 🔥</Text>
      <View style={styles.matchTeams}>
        <TeamLogo abbrev="PSG" bgColor="#001E62" />
        <Text style={styles.vsText}>VS</Text>
        <TeamLogo abbrev="OM" bgColor="#009BD6" />
      </View>
      <Text style={styles.hypeText}>
        85% des utilisateurs pensent que{'\n'}le PSG gagnent
      </Text>
      <TouchableOpacity style={styles.statsButton} activeOpacity={0.85}>
        <Text style={styles.statsButtonText}>Voir les stats</Text>
      </TouchableOpacity>
    </View>
  );
}

const FEED_ITEMS = [
  {
    id: '1',
    user: 'Marc',
    handle: '@marc2535382_',
    text: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure',
    avatarColor: '#5D6BE0',
  },
  {
    id: '2',
    user: 'Eme',
    handle: '@eme_856',
    text: 'quis nostrud exercitation ullamco laboris nisi ut',
    avatarColor: '#E05D8A',
  },
  {
    id: '3',
    user: 'Thomas',
    handle: '@thomas_foot99',
    text: "PSG va écraser l'OM ce soir, aucun doute possible 🔥 Le Classique c'est sacré !",
    avatarColor: '#5DE0A8',
  },
  {
    id: '4',
    user: 'Léa',
    handle: '@lea_supporter',
    text: "Hâte de voir ce Classique ce soir ! L'OM peut créer la surprise ⚽",
    avatarColor: '#E0A05D',
  },
];

function FeedItem({
  user,
  handle,
  text,
  avatarColor,
}: {
  user: string;
  handle: string;
  text: string;
  avatarColor: string;
}) {
  return (
    <View style={styles.feedItem}>
      <View style={styles.feedTop}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{user[0]}</Text>
        </View>
        <View style={styles.feedBody}>
          <View style={styles.feedHeader}>
            <Text style={styles.feedUsername}>{user}</Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={20} color={KopaColors.textMuted} />
            </TouchableOpacity>
          </View>
          <Text style={styles.feedHandle}>{handle}</Text>
          <Text style={styles.feedText}>{text}</Text>
        </View>
      </View>
      <View style={styles.feedActions}>
        <TouchableOpacity style={styles.feedAction}>
          <Ionicons name="thumbs-up-outline" size={17} color={KopaColors.textMuted} />
          <Text style={styles.feedActionText}>J&apos;aime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedAction}>
          <Ionicons name="chatbubble-outline" size={17} color={KopaColors.textMuted} />
          <Text style={styles.feedActionText}>Commenter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedAction}>
          <Ionicons name="share-social-outline" size={17} color={KopaColors.textMuted} />
          <Text style={styles.feedActionText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AccueilScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Hype du jour</Text>
        <HypeMatchCard />
        <Text style={styles.sectionTitle}>Feed</Text>
        {FEED_ITEMS.map((item) => (
          <FeedItem key={item.id} {...item} />
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
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  matchCard: {
    marginHorizontal: 16,
    backgroundColor: KopaColors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  matchLabel: {
    color: KopaColors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamLogo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  vsText: {
    color: KopaColors.text,
    fontSize: 32,
    fontWeight: '900',
  },
  hypeText: {
    color: KopaColors.text,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  statsButton: {
    backgroundColor: KopaColors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  feedItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
  },
  feedTop: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  feedBody: {
    flex: 1,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedUsername: {
    color: KopaColors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  feedHandle: {
    color: KopaColors.textMuted,
    fontSize: 13,
    marginBottom: 6,
  },
  feedText: {
    color: KopaColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  feedActions: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 58,
    gap: 20,
  },
  feedAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  feedActionText: {
    color: KopaColors.textMuted,
    fontSize: 13,
  },
});
