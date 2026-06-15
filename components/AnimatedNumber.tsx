import { useEffect } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTextComponent = Animated.createAnimatedComponent(
  require('react-native').TextInput
);

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  style?: StyleProp<TextStyle>;
  delay?: number;
  duration?: number;
}

export function AnimatedNumber({
  value,
  suffix = '',
  style,
  delay: delayMs = 0,
  duration = 1200,
}: AnimatedNumberProps) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withDelay(delayMs, withTiming(value, { duration }));
  }, [value]);

  const animatedProps = useAnimatedProps(() => ({
    text: `${Math.round(animatedValue.value)}${suffix}`,
    defaultValue: `0${suffix}`,
  }));

  return (
    <AnimatedTextComponent
      underlineColorAndroid="transparent"
      editable={false}
      style={[style, { padding: 0 }]}
      animatedProps={animatedProps}
    />
  );
}
