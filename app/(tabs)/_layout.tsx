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
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabBarContext, useTabBarContext } from "@/contexts/TabBarContext";
import { useIsDark, useThemeColors } from "@/hooks/useTheme";

const TAB_CONFIG: Record<
  string,
  {
    icon: keyof typeof Ionicons.glyphMap;
    iconFocused: keyof typeof Ionicons.glyphMap;
  }
> = {
  live: { icon: "tv-outline", iconFocused: "tv" },
  hype: { icon: "flame-outline", iconFocused: "flame" },
  index: { icon: "home-outline", iconFocused: "home" },
  pronos: { icon: "stats-chart-outline", iconFocused: "stats-chart" },
  clubs: { icon: "people-outline", iconFocused: "people" },
};

function AnimatedTabIcon({
  focused,
  name,
  color,
  size,
}: {
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
}) {
  const scale = useSharedValue(focused ? 1.1 : 1);

  useEffect(() => {
    scale.value = withTiming(focused ? 1.1 : 1, {
      duration: 200,
      easing: Easing.out(Easing.quad),
    });
  }, [focused]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const colors = useThemeColors();
  const isDark = useIsDark();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { visible } = useTabBarContext();

  const tabCount = state.routes.length;
  const tabWidth = width / tabCount;
  const pillSize = 44;
  const pillOffset = (tabWidth - pillSize) / 2;

  const pillX = useSharedValue(state.index * tabWidth + pillOffset);

  useEffect(() => {
    pillX.value = withTiming(state.index * tabWidth + pillOffset, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [state.index, tabWidth]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillX.value }],
  }));

  const barHeight = Platform.OS === "ios" ? 48 + insets.bottom : 52;
  const paddingBottom = Platform.OS === "ios" ? insets.bottom : 8;

  const barTranslateY = useDerivedValue(() =>
    withTiming(visible.value === 1 ? 0 : barHeight, {
      duration: 300,
      easing: Easing.inOut(Easing.cubic),
    }),
  );

  const barAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: barTranslateY.value }],
  }));

  return (
    <Animated.View style={[styles.barWrapper, barAnimStyle]}>
      <BlurView
        intensity={isDark ? 60 : 80}
        tint={isDark ? "dark" : "light"}
        style={[styles.tabBar, { height: barHeight, paddingBottom }]}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark
                ? "rgba(9,9,11,0.65)"
                : "rgba(255,255,255,0.7)",
            },
          ]}
        />
        <View
          style={[
            styles.topBorder,
            {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.06)",
            },
          ]}
        />

        <Animated.View
          style={[styles.pillWrapper, { width: pillSize }, pillStyle]}
        >
          <View
            style={[
              styles.pill,
              {
                backgroundColor: `${colors.accent}15`,
                borderColor: `${colors.accent}30`,
              },
            ]}
          />
        </Animated.View>

        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const config = TAB_CONFIG[route.name];
          if (!config) return null;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                if (!focused) {
                  if (Platform.OS === "ios") {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  navigation.navigate(route.name);
                }
              }}
              style={styles.tab}
            >
              <AnimatedTabIcon
                focused={focused}
                name={focused ? config.iconFocused : config.icon}
                color={focused ? colors.accent : colors.textMuted}
                size={24}
              />
            </Pressable>
          );
        })}
      </BlurView>
    </Animated.View>
  );
}

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

const styles = StyleSheet.create({
  barWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    overflow: "hidden",
  },
  topBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
  pillWrapper: {
    position: "absolute",
    top: 6,
    left: 0,
    height: 36,
  },
  pill: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
});
