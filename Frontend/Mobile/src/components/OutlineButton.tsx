import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
interface props {
  title?: string;
  opFunc?: () => void | any;
}
const OutlineButton = (props: props): React.ReactElement => {
  return (
    <>
      <TouchableOpacity
        style={[style.button]}
        activeOpacity={0.6}
        onPress={props.opFunc}
      >
        <Text style={[style.button_text]}>{props.title}</Text>
      </TouchableOpacity>
    </>
  );
};
const style = StyleSheet.create({
  button: {
    width: '100%',
    margin: 5,
    borderWidth: 2,
    borderColor: '#66aa6e',
    borderRadius: 8,
    shadowColor: 'rgba(102, 170, 110, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 7,
    backgroundColor: '#0a0a0a',
  },
  button_text: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
});
export default OutlineButton;
