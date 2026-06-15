import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { useTabBarContext } from "@/contexts/TabBarContext";

export function useScrollTabBar() {
  const { visible } = useTabBarContext();
  const prevY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      if (y <= 0) {
        visible.value = 1;
      } else if (y > prevY.value + 8) {
        visible.value = 0;
      } else if (y < prevY.value - 8) {
        visible.value = 1;
      }
      prevY.value = y;
    },
  });

  return scrollHandler;
}
