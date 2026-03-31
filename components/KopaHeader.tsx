import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { KopaColors } from '@/constants/theme';

export function KopaHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.logoCircle}>
          <Ionicons name="football" size={16} color="white" />
        </View>
        <Text style={styles.title}>Kopa</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push('/notifications')}
        >
          <Ionicons name="notifications-outline" size={22} color={KopaColors.textSecondary} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.avatarBtn}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.avatarText}>A</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: KopaColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: KopaColors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    padding: 6,
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: KopaColors.live,
    borderWidth: 1.5,
    borderColor: KopaColors.background,
  },
  avatarBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: KopaColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: KopaColors.accentLight,
  },
  avatarText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '800',
  },
});
