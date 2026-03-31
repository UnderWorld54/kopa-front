import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedCard } from '@/components/AnimatedCard';
import { KopaHeader } from '@/components/KopaHeader';
import { KopaColors } from '@/constants/theme';

const MY_CLUBS = [
  {
    id: '1',
    name: 'PSG Nation',
    members: 4820,
    category: 'Football',
    color: '#001E62',
    abbrev: 'PSG',
    joined: true,
    newPosts: 12,
    description: 'La communauté #1 des supporters du PSG',
  },
  {
    id: '2',
    name: 'Classico Fans',
    members: 2340,
    category: 'Football',
    color: '#A50044',
    abbrev: 'CL',
    joined: true,
    newPosts: 5,
    description: 'Barça vs Real, le débat éternel',
  },
];

const TRENDING_CLUBS = [
  {
    id: '6',
    name: 'Le Classique',
    members: 15200,
    category: 'Football',
    color: '#FF4757',
    abbrev: '⚡',
    joined: false,
    trending: true,
    description: 'PSG vs OM — Le match de la saison',
  },
];

const SUGGESTED_CLUBS = [
  {
    id: '3',
    name: 'NBA France',
    members: 8900,
    category: 'Basket',
    color: '#C9082A',
    abbrev: 'NBA',
    joined: false,
    description: 'Toute la NBA en français',
  },
  {
    id: '4',
    name: 'Ligue 1 Officiel',
    members: 22100,
    category: 'Football',
    color: '#1B3FA0',
    abbrev: 'L1',
    joined: false,
    description: 'Le club officiel de la Ligue 1',
  },
  {
    id: '5',
    name: 'Tennis Masters',
    members: 3400,
    category: 'Tennis',
    color: '#16A34A',
    abbrev: 'TM',
    joined: false,
    description: 'ATP, WTA et Grand Chelems',
  },
];

type ClubType = {
  id: string;
  name: string;
  members: number;
  category: string;
  color: string;
  abbrev: string;
  joined: boolean;
  newPosts?: number;
  trending?: boolean;
  description?: string;
};

function TrendingClubCard({ club, index }: { club: ClubType; index: number }) {
  return (
    <AnimatedCard index={index}>
      <TouchableOpacity activeOpacity={0.85}>
        <LinearGradient
          colors={[club.color + 'CC', club.color + '88']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.trendingCard}
        >
          <View style={styles.trendingBadge}>
            <Ionicons name="trending-up" size={12} color="white" />
            <Text style={styles.trendingBadgeText}>Trending</Text>
          </View>
          <Text style={styles.trendingEmoji}>{club.abbrev}</Text>
          <Text style={styles.trendingName}>{club.name}</Text>
          <Text style={styles.trendingDesc}>{club.description}</Text>
          <View style={styles.trendingFooter}>
            <Text style={styles.trendingMembers}>
              {club.members.toLocaleString('fr-FR')} membres
            </Text>
            <TouchableOpacity style={styles.trendingJoinBtn} activeOpacity={0.85}>
              <Text style={styles.trendingJoinText}>Rejoindre</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedCard>
  );
}

function ClubCard({
  club,
  showJoined,
  index,
}: {
  club: ClubType;
  showJoined?: boolean;
  index: number;
}) {
  return (
    <AnimatedCard index={index}>
      <TouchableOpacity style={styles.clubCard} activeOpacity={0.85}>
        <View style={[styles.clubAvatar, { backgroundColor: club.color }]}>
          <Text style={styles.clubAvatarText}>{club.abbrev}</Text>
        </View>
        <View style={styles.clubInfo}>
          <View style={styles.clubNameRow}>
            <Text style={styles.clubName}>{club.name}</Text>
            {club.newPosts ? (
              <View style={styles.newPostsBadge}>
                <Text style={styles.newPostsText}>{club.newPosts}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.clubMeta}>
            {club.category} · {club.members.toLocaleString('fr-FR')} membres
          </Text>
        </View>
        {showJoined ? (
          <View style={styles.joinedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={KopaColors.accent} />
          </View>
        ) : (
          <TouchableOpacity style={styles.joinBtn} activeOpacity={0.85}>
            <Text style={styles.joinBtnText}>Rejoindre</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </AnimatedCard>
  );
}

export default function ClubsScreen() {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={KopaColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un club..."
            placeholderTextColor={KopaColors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={KopaColors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Trending */}
        <Text style={styles.sectionTitle}>Tendance</Text>
        {TRENDING_CLUBS.map((club, i) => (
          <TrendingClubCard key={club.id} club={club} index={i} />
        ))}

        {/* My clubs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mes clubs</Text>
          <Text style={styles.sectionCount}>{MY_CLUBS.length}</Text>
        </View>
        {MY_CLUBS.map((club, i) => (
          <ClubCard key={club.id} club={club} showJoined index={i + 1} />
        ))}

        {/* Suggested */}
        <Text style={styles.sectionTitle}>Suggérés pour toi</Text>
        {SUGGESTED_CLUBS.map((club, i) => (
          <ClubCard key={club.id} club={club} index={i + 3} />
        ))}

        {/* Create */}
        <AnimatedCard index={6}>
          <TouchableOpacity style={styles.createBtn} activeOpacity={0.85}>
            <View style={styles.createIcon}>
              <Ionicons name="add" size={22} color={KopaColors.accent} />
            </View>
            <View>
              <Text style={styles.createTitle}>Créer un club</Text>
              <Text style={styles.createSubtitle}>Rassemble ta communauté</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={KopaColors.textMuted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </AnimatedCard>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KopaColors.surface,
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  searchInput: {
    flex: 1,
    color: KopaColors.text,
    fontSize: 15,
  },
  sectionTitle: {
    color: KopaColors.text,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionCount: {
    color: KopaColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  trendingCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    gap: 6,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  trendingBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  trendingEmoji: {
    fontSize: 32,
  },
  trendingName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  trendingDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  trendingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  trendingMembers: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
  trendingJoinBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trendingJoinText: {
    color: '#1A1A1A',
    fontSize: 13,
    fontWeight: '700',
  },
  clubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: KopaColors.border,
    gap: 12,
  },
  clubAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  clubAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
  },
  clubInfo: {
    flex: 1,
    gap: 2,
  },
  clubNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clubName: {
    color: KopaColors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  newPostsBadge: {
    backgroundColor: KopaColors.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  newPostsText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  clubMeta: {
    color: KopaColors.textMuted,
    fontSize: 12,
  },
  joinedBadge: {
    padding: 4,
  },
  joinBtn: {
    backgroundColor: KopaColors.accent,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
  },
  joinBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 6,
    padding: 14,
    backgroundColor: KopaColors.surface,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: KopaColors.border,
    borderStyle: 'dashed',
  },
  createIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: KopaColors.accent + '18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTitle: {
    color: KopaColors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  createSubtitle: {
    color: KopaColors.textMuted,
    fontSize: 12,
    marginTop: 1,
  },
});
