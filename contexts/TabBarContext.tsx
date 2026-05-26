import { createContext, useContext } from "react";
import type { SharedValue } from "react-native-reanimated";

type TabBarContextType = {
  visible: SharedValue<number>;
};

export const TabBarContext = createContext<TabBarContextType | null>(null);

export function useTabBarContext() {
  const ctx = useContext(TabBarContext);
  if (!ctx) throw new Error("useTabBarContext must be used within provider");
  return ctx;
}
