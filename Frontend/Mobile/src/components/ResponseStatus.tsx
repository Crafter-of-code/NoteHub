import React, { ReactElement, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { appContext } from '../store/AppContextProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const ResponseStatus = (): ReactElement | null => {
  const { responseErrorStatus, reponseMessage } = React.useContext(appContext);

  // shared value for vertical position
  const translateY = useSharedValue(-100); // start off-screen

  // animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    if (reponseMessage) {
      // slide down
      translateY.value = withTiming(60, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });

      // slide back up after 3 seconds
      const timer = setTimeout(() => {
        translateY.value = withTiming(-100, {
          duration: 400,
          easing: Easing.in(Easing.cubic),
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reponseMessage]);

  if (!reponseMessage) return null;

  return (
    <Animated.View
      style={[
        style.mainContainer,
        responseErrorStatus ? style.bgRed : style.bgGreen,
        animatedStyle,
      ]}
    >
      <Text style={style.textStylingResponseStatus}>{reponseMessage}</Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    zIndex: 999,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textStylingResponseStatus: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  bgRed: {
    backgroundColor: '#FF5C5C',
  },
  bgGreen: {
    backgroundColor: '#4CA1AF',
  },
});

export default ResponseStatus;
