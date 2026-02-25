import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const EditNote = (): React.ReactElement => {
  return (
    <React.Fragment>
      <LinearGradient
        colors={['#09090b', '#18181b', '#000000']}
        style={{ flex: 1 }}
      ></LinearGradient>
    </React.Fragment>
  );
};
export default EditNote;
