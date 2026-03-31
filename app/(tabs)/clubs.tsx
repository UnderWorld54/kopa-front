import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  },
  {
    id: '4',
    name: 'Ligue 1 Officiel',
    members: 22100,
    category: 'Football',
    color: '#1B3FA0',
    abbrev: 'L1',
    joined: false,
  },
  {
    id: '5',
    name: 'Tennis Masters',
    members: 3400,
    category: 'Tennis',
    color: '#16A34A',
    abbrev: 'TM',
    joined: false,
  },
];

function ClubCard({
  club,
  showJoined = false,
}: {
  club: {
    id: string;
    name: string;
    members: number;
    category: string;
    color: string;
    abbrev: string;
    joined: boolean;
    newPosts?: number;
  };
  showJoined?: boolean;
}) {
  return (
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
          <Ionicons name="checkmark" size={14} color={KopaColors.accent} />
          <Text style={styles.joinedText}>Rejoint</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.joinBtn} activeOpacity={0.85}>
          <Text style={styles.joinBtnText}>Rejoindre</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default function ClubsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KopaHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={KopaColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un club..."
            placeholderTextColor={KopaColors.textMuted}
          />
        </View>

        <Text style={styles.sectionTitle}>Mes clubs</Text>
        {MY_CLUBS.map((club) => (
          <ClubCard key={club.id} club={club} showJoined />
        ))}

        <Text style={styles.sectionTitle}>Suggérés pour toi</Text>
        {SUGGESTED_CLUBS.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}

        <TouchableOpacity style={styles.createBtn} activeOpacity={0.85}>
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.createBtnText}>Créer un club</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KopaColors.surface,
    marginHorizontal: 16,
    marginTop: 8,
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
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
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
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
  },
  clubInfo: {
    flex: 1,
    gap: 3,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  joinedText: {
    color: KopaColors.accent,
    fontSize: 13,
    fontWeight: '600',
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
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: KopaColors.surfaceLight,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  createBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
