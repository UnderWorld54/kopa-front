import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KopaColors } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}>
              <Ionicons name="football" size={22} color="white" />
            </View>
            <Text style={styles.logoText}>Kopa</Text>
          </View>
          <Text style={styles.subtitle}>Rejoins la communauté aujourd&apos;hui</Text>
        </View>

        <View style={styles.buttonsSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Créer un compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Se connecter</Text>
          </TouchableOpacity>

          <Text style={styles.legalText}>
            En cliquant sur &quot;Se connecter&quot; / &quot;Créer un compte&quot;,{'\n'}
            tu acceptes nos{' '}
            <Text style={styles.legalLink}>Conditions d&apos;utilisation</Text>
            . Pour en savoir plus sur la façon dont nous traitons tes données, consulte notre{' '}
            <Text style={styles.legalLink}>Politique de{'\n'}confidentialité</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KopaColors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: KopaColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: KopaColors.text,
    fontSize: 36,
    fontWeight: '700',
  },
  subtitle: {
    color: KopaColors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsSection: {
    gap: 14,
  },
  primaryButton: {
    backgroundColor: KopaColors.accent,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: KopaColors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: KopaColors.background,
    fontSize: 17,
    fontWeight: '600',
  },
  legalText: {
    color: KopaColors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
  legalLink: {
    color: KopaColors.textSecondary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
