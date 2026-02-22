import React, { ReactElement } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { appContext } from '../store/AppContextProvider';

const ResponseStatus = (): ReactElement => {
  const { responseErrorStatus, reponseMessage } = React.useContext(appContext);
  return (
    <View
      style={[
        style.mainContainer,
        responseErrorStatus ? style.bgRed : style.bgGreen,
      ]}
    >
      {reponseMessage ? (
        <Text style={[style.textStylingResponseStatus]}>{reponseMessage}</Text>
      ) : (
        <View></View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 60,
    width: '100%',
    borderRadius: 8,
    zIndex: 999,
  },
  textStylingResponseStatus: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: '500',
    margin: 10,
    textAlign: 'center',
  },
  bgRed: {
    backgroundColor: 'red',
  },
  bgGreen: {
    backgroundColor: 'green',
  },
});
export default ResponseStatus;
