import React from 'react';
import { StyleSheet, View } from 'react-native';
const SettingInfoContainer = ({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement => {
  return <View style={style.main_container}>{children}</View>;
};
const style = StyleSheet.create({
  main_container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#262527',
    borderRadius: 8,
    // marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
  },
});
export default SettingInfoContainer;
