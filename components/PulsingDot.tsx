import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface PulsingDotProps {
  color?: string;
  size?: number;
}

export function PulsingDot({ color = "#EF4444", size = 8 }: PulsingDotProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    const easing = Easing.inOut(Easing.ease);
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000, easing }),
        withTiming(1, { duration: 1000, easing }),
      ),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: opacity.value,
  }));

  return <Animated.View style={animatedStyle} />;
}
