import { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedCardProps extends ViewProps {
  index?: number;
  delay?: number;
  children: React.ReactNode;
}

export function AnimatedCard({ index = 0, delay, children, style, ...props }: AnimatedCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const computedDelay = delay ?? index * 80;

  useEffect(() => {
    opacity.value = withDelay(computedDelay, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(
      computedDelay,
      withSpring(0, { damping: 20, stiffness: 200 })
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
