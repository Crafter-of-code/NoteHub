import React from 'react';
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
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}

      {message ? (
        <Text style={styles.message} numberOfLines={3}>
          {message}
        </Text>
      ) : null}

      {children ? (
        <View style={styles.actionsContainer}>{children}</View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 12,

    borderWidth: 1,
    borderColor: '#2c2c2e',

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },

  message: {
    textAlign: 'center',
    fontSize: 14,
    color: '#b0b0b0',
    lineHeight: 20,
  },

  actionsContainer: {
    marginTop: 14,
    gap: 10,
  },
});

export default NoteContainer;
