import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { KopaColors } from '@/constants/theme';

export function KopaHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.logoCircle}>
          <Ionicons name="football" size={18} color="white" />
        </View>
        <Text style={styles.title}>Kopa</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color={KopaColors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={24} color={KopaColors.text} />
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
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: KopaColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: KopaColors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  right: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    padding: 4,
  },
});
