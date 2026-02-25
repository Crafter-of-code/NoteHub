import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appContext } from '../store/AppContextProvider';
import SolidButton from '../components/SolidButton';
import NoteContainer from '../components/NoteContainer';
import SettingInfoContainer from '../components/SettingInfoContainer';
import DetailChangeBox from '../components/DetailChangeBox';

const Setting = (): React.ReactElement => {
  const { getUserDetail, userDetail } = React.useContext(appContext);
  const [editinMode, setEditingMode] = React.useState(false);
  const [typeOfEdit, setTypeOfEdit] = React.useState('');
  useEffect(() => {
    getUserDetail();
  }, []);
  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: 20,
          marginHorizontal: 20,
        }}
      >
        {/* image container */}
        <View style={style.imageContainer}>
          <Image
            height={512}
            width={512}
            style={style.userImage}
            source={require('../asset/account.png')}
          />
        </View>
        {/* userDetail */}
        <SettingInfoContainer>
          <View style={[style.informationContainer]}>
            <Text style={{ color: 'white' }}>User Name</Text>
            <Text style={{ color: 'white' }}>{userDetail.userName}</Text>
          </View>
          <View style={[style.changeButtonContainer]}>
            <SolidButton
              title="change"
              buttonDisable={false}
              opFunc={async () => {
                setEditingMode(true);
                setTypeOfEdit('userName');
              }}
            />
          </View>
        </SettingInfoContainer>
        <SettingInfoContainer>
          <View style={[style.informationContainer]}>
            <Text style={{ color: 'white' }}>User Email</Text>
            <Text style={{ color: 'white' }}>{userDetail.userEmail}</Text>
          </View>
          <View style={[style.changeButtonContainer]}>
            <SolidButton
              title="change"
              buttonDisable={false}
              opFunc={() => {
                setEditingMode(true);
                setTypeOfEdit('userEmail');
              }}
            />
          </View>
        </SettingInfoContainer>
        {/**
         * <SettingInfoContainer>
          <View style={[style.informationContainer]}>
            <Text style={{ color: 'white' }}>User Password</Text>
            <Text style={{ color: 'white' }}>****</Text>
          </View>
          <View style={[style.changeButtonContainer]}>
            <SolidButton
              title="change"
              buttonDisable={false}
              opFunc={() => {
                // setEditingMode(true);
                // setTypeOfEdit('userPassword');
              }}
            />
          </View>
        </SettingInfoContainer>
         */}

        <View style={style.userDetailMainContainer}></View>
      </SafeAreaView>
      <View
        style={[
          style.detailChangeBoxStying,
          editinMode ? [style.show] : [style.hide],
        ]}
      >
        <DetailChangeBox
          typeOfEdit={typeOfEdit}
          setEditMode={setEditingMode}
          placeHolder={
            typeOfEdit === 'userName'
              ? userDetail.userName.toString()
              : typeOfEdit === 'userEmail'
              ? userDetail.userEmail
              : userDetail.userName
          }
        />
      </View>
    </LinearGradient>
  );
};
const style = StyleSheet.create({
  detailChangeBoxStying: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    zIndex: 99,
    height: '100%',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  imageContainer: {
    padding: 5,
    borderRadius: 50,
    alignItems: 'center',
  },
  userImage: {
    height: 100,
    width: 100,
  },
  userDetailMainContainer: {
    flexDirection: 'row',
  },
  changeButtonContainer: {
    flexGrow: 0,
  },
  informationContainer: {
    flexGrow: 2,
  },
});
export default Setting;
