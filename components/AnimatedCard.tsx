import { useEffect } from "react";
import { type ViewProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface AnimatedCardProps extends ViewProps {
  index?: number;
  delay?: number;
  children: React.ReactNode;
}

export function AnimatedCard({
  index = 0,
  delay,
  children,
  style,
  ...props
}: AnimatedCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  const computedDelay = delay ?? index * 50;

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    opacity.value = withDelay(
      computedDelay,
      withTiming(1, { duration: 300, easing }),
    );
    translateY.value = withDelay(
      computedDelay,
      withTiming(0, { duration: 300, easing }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}
