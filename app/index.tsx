import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
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

const { width, height } = Dimensions.get('window');

function FloatingIcon({
  icon,
  size,
  color,
  startX,
  startY,
  delay: delayMs,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
  startX: number;
  startY: number;
  delay: number;
}) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delayMs, withTiming(0.15, { duration: 1000 }));
    translateY.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(-20, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          withTiming(20, { duration: 2500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
    rotate.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(10, { duration: 3000 }),
          withTiming(-10, { duration: 3000 })
        ),
        -1,
        true
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    left: startX,
    top: startY,
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={style}>
      <Ionicons name={icon} size={size} color={color} />
    </Animated.View>
  );
}

export default function WelcomeScreen() {
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(40);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Logo entrance
    logoScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    logoOpacity.value = withTiming(1, { duration: 800 });

    // Subtitle
    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    subtitleTranslateY.value = withDelay(400, withSpring(0, { damping: 20 }));

    // Buttons
    buttonsOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    buttonsTranslateY.value = withDelay(700, withSpring(0, { damping: 20 }));

    // Pulse on logo circle
    pulseScale.value = withDelay(
      1200,
      withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500 }),
          withTiming(1, { duration: 1500 })
        ),
        -1
      )
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <LinearGradient colors={['#0F1724', '#142035', '#1A2D4A']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        {/* Floating background icons */}
        <FloatingIcon icon="football" size={32} color={KopaColors.accent} startX={width * 0.1} startY={height * 0.12} delay={0} />
        <FloatingIcon icon="basketball" size={28} color={KopaColors.purple} startX={width * 0.75} startY={height * 0.08} delay={300} />
        <FloatingIcon icon="tennisball" size={24} color={KopaColors.warning} startX={width * 0.6} startY={height * 0.22} delay={600} />
        <FloatingIcon icon="trophy" size={30} color={KopaColors.gold} startX={width * 0.15} startY={height * 0.3} delay={200} />
        <FloatingIcon icon="flame" size={26} color={KopaColors.live} startX={width * 0.8} startY={height * 0.35} delay={500} />
        <FloatingIcon icon="shirt" size={24} color={KopaColors.textMuted} startX={width * 0.4} startY={height * 0.1} delay={800} />

        <View style={styles.content}>
          <View style={styles.logoSection}>
            <Animated.View style={logoStyle}>
              <View style={styles.logoRow}>
                <Animated.View style={[styles.logoCircle, pulseStyle]}>
                  <Ionicons name="football" size={28} color="white" />
                </Animated.View>
                <Text style={styles.logoText}>Kopa</Text>
              </View>
            </Animated.View>

            <Animated.View style={subtitleStyle}>
              <Text style={styles.tagline}>Le sport, ensemble.</Text>
              <Text style={styles.subtitle}>Pronostique, débats et vis{'\n'}tes matchs avec ta communauté</Text>
            </Animated.View>

            {/* Feature pills */}
            <Animated.View style={[styles.featurePills, subtitleStyle]}>
              <View style={styles.pill}>
                <Ionicons name="flash" size={14} color={KopaColors.accent} />
                <Text style={styles.pillText}>Live</Text>
              </View>
              <View style={styles.pill}>
                <Ionicons name="trending-up" size={14} color={KopaColors.orange} />
                <Text style={styles.pillText}>Pronos</Text>
              </View>
              <View style={styles.pill}>
                <Ionicons name="people" size={14} color={KopaColors.purple} />
                <Text style={styles.pillText}>Clubs</Text>
              </View>
            </Animated.View>
          </View>

          <Animated.View style={[styles.buttonsSection, buttonsStyle]}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.replace('/(tabs)')}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[KopaColors.accent, KopaColors.accentDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryGradient}
              >
                <Text style={styles.primaryButtonText}>Créer un compte</Text>
                <Ionicons name="arrow-forward" size={18} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.replace('/(tabs)')}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Se connecter</Text>
            </TouchableOpacity>

            <Text style={styles.legalText}>
              En continuant, tu acceptes nos{' '}
              <Text style={styles.legalLink}>CGU</Text>
              {' '}et notre{' '}
              <Text style={styles.legalLink}>Politique de confidentialité</Text>.
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    gap: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: KopaColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: KopaColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    color: KopaColors.text,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
  },
  tagline: {
    color: KopaColors.text,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: KopaColors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  featurePills: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: KopaColors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: KopaColors.border,
  },
  pillText: {
    color: KopaColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  buttonsSection: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: KopaColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryGradient: {
    flexDirection: 'row',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: KopaColors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  secondaryButtonText: {
    color: KopaColors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  legalText: {
    color: KopaColors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
  },
  legalLink: {
    color: KopaColors.textSecondary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
