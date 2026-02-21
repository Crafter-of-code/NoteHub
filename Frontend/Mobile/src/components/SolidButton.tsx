import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoadingUi from './Loading';
type props = {
  title?: string;
  opFunc?: () => void;
  buttonDisable: boolean;
};
const SolidButton = (props: props): React.ReactElement => {
  return (
    <>
      <TouchableOpacity
        style={[style.button]}
        activeOpacity={0.6}
        onPress={props.opFunc}
        disabled={props.buttonDisable}
      >
        <LinearGradient
          colors={['#66aa6e', '#539f5a']}
          style={style.gradient_container}
        >
          {props.buttonDisable ? (
            <LoadingUi />
          ) : (
            <Text style={[style.button_text]}>{props.title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};
// SolidButton component styles
const style = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 5,
    shadowColor: 'rgba(102, 170, 110, 0.35)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 7,
  },
  gradient_container: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SolidButton;
