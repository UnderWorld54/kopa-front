import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabBarContext, useTabBarContext } from "@/contexts/TabBarContext";
import { useIsDark, useThemeColors } from "@/hooks/useTheme";

const SPRING_CONFIG = { damping: 18, stiffness: 200, mass: 0.8 };

const TAB_CONFIG: Record<
  string,
  {
    icon: keyof typeof Ionicons.glyphMap;
    iconFocused: keyof typeof Ionicons.glyphMap;
    label: string;
  }
> = {
  live: { icon: "tv-outline", iconFocused: "tv", label: "Live" },
  hype: { icon: "flame-outline", iconFocused: "flame", label: "Hype" },
  index: { icon: "home-outline", iconFocused: "home", label: "Accueil" },
  pronos: {
    icon: "stats-chart-outline",
    iconFocused: "stats-chart",
    label: "Pronos",
  },
  clubs: { icon: "people-outline", iconFocused: "people", label: "Clubs" },
};

/* ── Animated tab item ─────────────────────────────────────── */

function AnimatedTab({
  focused,
  iconName,
  label,
  accentColor,
  mutedColor,
  size,
  onPress,
}: {
  focused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  accentColor: string;
  mutedColor: string;
  size: number;
  onPress: () => void;
}) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, SPRING_CONFIG);
  }, [focused]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + progress.value * 0.12 },
      { translateY: progress.value * -2 },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 4 }],
    marginTop: 2,
    height: progress.value * 14,
  }));

  const color = focused ? accentColor : mutedColor;

  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Animated.View style={iconStyle}>
        <Ionicons name={iconName} size={size} color={color} />
      </Animated.View>
      <Animated.Text
        style={[styles.tabLabel, { color: accentColor }, labelStyle]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

/* ── Custom tab bar ────────────────────────────────────────── */

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const colors = useThemeColors();
  const isDark = useIsDark();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { visible } = useTabBarContext();

  const tabCount = state.routes.length;
  const horizontalMargin = 16;
  const barInnerWidth = width - horizontalMargin * 2;
  const tabWidth = barInnerWidth / tabCount;
  const pillWidth = 48;
  const pillOffset = (tabWidth - pillWidth) / 2;

  const pillX = useSharedValue(state.index * tabWidth + pillOffset);

  useEffect(() => {
    pillX.value = withSpring(
      state.index * tabWidth + pillOffset,
      SPRING_CONFIG,
    );
  }, [state.index, tabWidth]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillX.value }],
  }));

  const barContentHeight = 58;
  const bottomPadding = Platform.OS === "ios" ? Math.max(insets.bottom - 8, 4) : 10;
  const barTotalHeight = barContentHeight + bottomPadding;

  const barTranslateY = useDerivedValue(() =>
    withTiming(visible.value === 1 ? 0 : barTotalHeight + 30, {
      duration: 320,
      easing: Easing.inOut(Easing.cubic),
    }),
  );

  const barAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: barTranslateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.barWrapper,
        { bottom: Platform.OS === "ios" ? insets.bottom : 12 },
        barAnimStyle,
      ]}
    >
      {/* Shadow layer (sits behind the blur) */}
      <View
        style={[
          styles.shadowLayer,
          {
            shadowColor: isDark ? "#000" : "#71717A",
            backgroundColor: isDark
              ? "rgba(9,9,11,0.4)"
              : "rgba(255,255,255,0.4)",
          },
        ]}
      />

      <BlurView
        intensity={isDark ? 70 : 90}
        tint={isDark ? "dark" : "light"}
        style={[
          styles.tabBar,
          { height: barContentHeight, paddingBottom: 0 },
        ]}
      >
        {/* Tinted overlay */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark
                ? "rgba(18,18,22,0.72)"
                : "rgba(255,255,255,0.78)",
            },
          ]}
        />

        {/* Top highlight line */}
        <View
          style={[
            styles.topHighlight,
            {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.9)",
            },
          ]}
        />

        {/* Animated pill indicator */}
        <Animated.View
          style={[styles.pillWrapper, { width: pillWidth }, pillStyle]}
        >
          {/* Glow layer */}
          <View
            style={[
              styles.pillGlow,
              { backgroundColor: `${colors.accent}12` },
            ]}
          />
          {/* Pill */}
          <View
            style={[
              styles.pill,
              {
                backgroundColor: `${colors.accent}18`,
                borderColor: `${colors.accent}35`,
              },
            ]}
          />
        </Animated.View>

        {/* Tabs */}
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const config = TAB_CONFIG[route.name];
          if (!config) return null;

          return (
            <AnimatedTab
              key={route.key}
              focused={focused}
              iconName={focused ? config.iconFocused : config.icon}
              label={config.label}
              accentColor={colors.accent}
              mutedColor={colors.textMuted}
              size={22}
              onPress={() => {
                if (!focused) {
                  if (Platform.OS === "ios") {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </BlurView>
    </Animated.View>
  );
}

/* ── Layout ────────────────────────────────────────────────── */

export default function TabLayout() {
  const visible = useSharedValue(1);

  return (
    <TabBarContext.Provider value={{ visible }}>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="live" />
        <Tabs.Screen name="hype" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="pronos" />
        <Tabs.Screen name="clubs" />
      </Tabs>
    </TabBarContext.Provider>
  );
}

/* ── Styles ────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  barWrapper: {
    position: "absolute",
    left: 16,
    right: 16,
  },
  shadowLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 16,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    overflow: "hidden",
  },
  topHighlight: {
    position: "absolute",
    top: 0,
    left: 12,
    right: 12,
    height: StyleSheet.hairlineWidth,
  },
  pillWrapper: {
    position: "absolute",
    top: 6,
    left: 0,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  pillGlow: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  pill: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
