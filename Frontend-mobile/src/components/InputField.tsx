import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';

type Props = {
  placeHolder?: string;
  value?: string;
  setValue?: (text: string) => void;
};

const InputField = (props: Props): React.ReactElement => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused && styles.inputFocused, // focus glow
      ]}
    >
      <TextInput
        style={styles.input}
        placeholder={props.placeHolder}
        placeholderTextColor="#aaa"
        onChangeText={props.setValue}
        value={props.value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#66aa6e',
    borderRadius: 8,
    backgroundColor: '#0a0a0a',
    shadowColor: 'rgba(102, 170, 110, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 7,
  },

  inputFocused: {
    shadowColor: '#66aa6e',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },

  input: {
    width: '100%',
    borderRadius: 6,
    padding: 10,
    color: 'white',
    backgroundColor: 'transparent',
  },
});

export default InputField;
