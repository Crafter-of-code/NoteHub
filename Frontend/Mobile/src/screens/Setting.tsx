import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appContext } from '../store/AppContextProvider';
import SolidButton from '../components/SolidButton';
import SettingInfoContainer from '../components/SettingInfoContainer';
import DetailChangeBox from '../components/DetailChangeBox';

const Setting = (): React.ReactElement => {
  const { getUserDetail, userDetail, latestLogin } =
    React.useContext(appContext);
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.userImage}
              source={require('../asset/account.png')}
            />
            <Text style={styles.username}>{userDetail.userName}</Text>
            <Text style={styles.userEmail}>{userDetail.userEmail}</Text>
          </View>

          <SettingInfoContainer>
            <View style={styles.informationContainer}>
              <Text style={styles.infoLabel}>User Name</Text>
              <Text style={styles.infoValue}>{userDetail.userName}</Text>
            </View>
            <View style={styles.changeButtonContainer}>
              <SolidButton
                title="Change"
                buttonDisable={false}
                opFunc={() => {
                  setEditingMode(true);
                  setTypeOfEdit('userName');
                }}
              />
            </View>
          </SettingInfoContainer>

          <SettingInfoContainer>
            <View style={styles.informationContainer}>
              <Text style={styles.infoLabel}>User Email</Text>
              <Text style={styles.infoValue}>{userDetail.userEmail}</Text>
            </View>
            <View style={styles.changeButtonContainer}>
              <SolidButton
                title="Change"
                buttonDisable={false}
                opFunc={() => {
                  setEditingMode(true);
                  setTypeOfEdit('userEmail');
                }}
              />
            </View>
          </SettingInfoContainer>

          {/* Additional Content */}
          <SettingInfoContainer>
            <View style={styles.informationContainer}>
              <Text style={styles.infoLabel}>Last Login</Text>
              <Text style={styles.infoValue}>{latestLogin}</Text>
            </View>
          </SettingInfoContainer>
          <SettingInfoContainer>
            <View style={styles.informationContainer}>
              <Text style={styles.infoLabel}>Account Created</Text>
              <Text style={styles.infoValue}>
                {new Date(userDetail.createdAT).toLocaleString()}
              </Text>
            </View>
          </SettingInfoContainer>

          <SettingInfoContainer>
            <View style={styles.informationContainer}>
              <Text style={styles.infoLabel}>App Version</Text>
              <Text style={styles.infoValue}>v1.0.0</Text>
            </View>
          </SettingInfoContainer>
        </ScrollView>
        {editinMode && (
          <View style={styles.detailChangeBoxStying}>
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
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 55,
    marginBottom: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
    marginVertical: 10,
  },
  userEmail: {
    color: 'white',
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 2,
  },
  userStatus: {
    color: '#4CA1AF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  informationContainer: {
    flexGrow: 2,
  },
  changeButtonContainer: {
    flexGrow: 0,
  },
  infoLabel: {
    color: 'white',
    fontSize: 14,
    opacity: 0.7,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  detailChangeBoxStying: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 99,
  },
});

export default Setting;
