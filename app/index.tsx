import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColors, useIsDark } from "@/hooks/useTheme";

export default function WelcomeScreen() {
  const colors = useThemeColors();
  const isDark = useIsDark();

  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(16);
  const subtitleOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(20);

  useEffect(() => {
    const ease = Easing.out(Easing.quad);
    logoOpacity.value = withTiming(1, { duration: 600, easing: ease });
    logoTranslateY.value = withTiming(0, { duration: 600, easing: ease });
    subtitleOpacity.value = withDelay(
      250,
      withTiming(1, { duration: 500, easing: ease }),
    );
    buttonsOpacity.value = withDelay(
      450,
      withTiming(1, { duration: 500, easing: ease }),
    );
    buttonsTranslateY.value = withDelay(
      450,
      withTiming(0, { duration: 500, easing: ease }),
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  const glassIntensity = isDark ? 40 : 60;
  const glassTint = isDark ? "dark" : "light";

  return (
    <LinearGradient
      colors={
        isDark
          ? [colors.background, "#0E0E12", colors.surface]
          : [colors.background, colors.surface, colors.surfaceRaised]
      }
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoSection}>
            <Animated.View style={[styles.logoGroup, logoStyle]}>
              <View
                style={[styles.logoCircle, { backgroundColor: colors.accent }]}
              >
                <Ionicons name="football" size={24} color="#FFF" />
              </View>
              <Text style={[styles.logoText, { color: colors.text }]}>
                Kopa
              </Text>
            </Animated.View>

            <Animated.View style={subtitleStyle}>
              <Text style={[styles.tagline, { color: colors.text }]}>
                Le sport, ensemble.
              </Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                Pronostique, débats et vis{"\n"}tes matchs avec ta communauté
              </Text>
            </Animated.View>
          </View>

          {/* Buttons */}
          <Animated.View style={[styles.buttonsSection, buttonsStyle]}>
            {/* Primary — glass accent */}
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              activeOpacity={0.8}
              style={styles.glassButtonWrapper}
            >
              <BlurView
                intensity={glassIntensity}
                tint={glassTint}
                style={styles.glassButtonBlur}
              >
                <View
                  style={[
                    styles.glassButtonInner,
                    {
                      backgroundColor: `${colors.accent}18`,
                      borderColor: `${colors.accent}40`,
                    },
                  ]}
                >
                  <Text
                    style={[styles.primaryBtnText, { color: colors.accent }]}
                  >
                    Créer un compte
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={colors.accent}
                  />
                </View>
              </BlurView>
            </TouchableOpacity>

            {/* Secondary — glass neutral */}
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              activeOpacity={0.8}
              style={styles.glassButtonWrapper}
            >
              <BlurView
                intensity={glassIntensity}
                tint={glassTint}
                style={styles.glassButtonBlur}
              >
                <View
                  style={[
                    styles.glassButtonInner,
                    {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.03)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.secondaryBtnText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Se connecter
                  </Text>
                </View>
              </BlurView>
            </TouchableOpacity>

            <Text style={[styles.legalText, { color: colors.textMuted }]}>
              En continuant, tu acceptes nos{" "}
              <Text style={[styles.legalLink, { color: colors.textSecondary }]}>
                CGU
              </Text>{" "}
              et notre{" "}
              <Text style={[styles.legalLink, { color: colors.textSecondary }]}>
                Politique de confidentialité
              </Text>
              .
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
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  logoGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsSection: {
    gap: 10,
  },
  glassButtonWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
  glassButtonBlur: {
    borderRadius: 20,
    overflow: "hidden",
  },
  glassButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  legalText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 4,
  },
  legalLink: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
