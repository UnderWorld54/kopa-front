import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { KopaColors } from '@/constants/theme';

function TabIcon({
  name,
  nameFocused,
  color,
  focused,
  size,
  showDot,
}: {
  name: keyof typeof Ionicons.glyphMap;
  nameFocused: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
  size: number;
  showDot?: boolean;
}) {
  return (
    <View style={tabStyles.iconContainer}>
      <Ionicons name={focused ? nameFocused : name} size={size} color={color} />
      {focused && <View style={tabStyles.activeIndicator} />}
      {showDot && <View style={tabStyles.notifDot} />}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: KopaColors.accent,
        tabBarInactiveTintColor: KopaColors.textMuted,
        tabBarStyle: {
          backgroundColor: KopaColors.tabBar,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 26 : 10,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="tv-outline" nameFocused="tv" color={color} focused={focused} size={size} showDot />
          ),
        }}
      />
      <Tabs.Screen
        name="hype"
        options={{
          title: 'Hype',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="flame-outline" nameFocused="flame" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="home-outline" nameFocused="home" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="pronos"
        options={{
          title: 'Pronos',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="stats-chart-outline" nameFocused="stats-chart" color={color} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="clubs"
        options={{
          title: 'Clubs',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon name="people-outline" nameFocused="people" color={color} focused={focused} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: KopaColors.accent,
    marginTop: 4,
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -6,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: KopaColors.live,
    borderWidth: 1.5,
    borderColor: KopaColors.tabBar,
  },
});
