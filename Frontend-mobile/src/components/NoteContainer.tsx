import React, { ReactElement } from 'react';
import { StyleSheet, View, Text } from 'react-native';
type props = {
  title?: string;
  message?: string;
  children?: React.ReactNode;
};
const NoteContainer = ({
  title,
  message,
  children,
}: props): React.ReactElement => {
  return (
    <>
      <View style={styles.main_container}>
        <Text style={styles.title_color}>{title}</Text>
        <Text style={styles.message_color}>{message}</Text>
        {children ? <View style={styles.logo_container}>{children}</View> : ''}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  main_container: {
    padding: 24,
    backgroundColor: '#262527',
    borderRadius: 8,
    marginVertical: 10,
  },
  title_color: {
    fontWeight: 500,
    textAlign: 'center',
    color: '#F4F4F5',
    fontSize: 16,
  },
  message_color: {
    fontWeight: 400,
    fontSize: 13,
    textAlign: 'center',
    color: '#AAA8B0',
    marginVertical: 10,
  },
  logo_container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default NoteContainer;
