import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const LoadingUi = (): React.ReactElement => {
  const rotation = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  return <Animated.View style={[style.main_container, animationStyle]} />;
};

const style = StyleSheet.create({
  main_container: {
    width: 25,
    height: 25,
    borderRadius: 35 / 2,
    borderWidth: 5,
    marginVertical: 5,
    borderColor: 'rgba(102, 170, 110, 0.3)',
    borderTopColor: 'white',
    borderRightColor: 'white',
  },
});

export default LoadingUi;
