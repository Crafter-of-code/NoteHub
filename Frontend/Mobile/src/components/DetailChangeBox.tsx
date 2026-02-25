import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from './InputField';
import SolidButton from './SolidButton';
import OutlineButton from './OutlineButton';
import { appContext } from '../store/AppContextProvider';
type props = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  typeOfEdit?: string;
  placeHolder: string;
};
const DetailChangeBox = (props: props): React.ReactElement => {
  const { editUserDetail } = React.useContext(appContext);
  const [changeDetail, setChangeDetail] = React.useState<string>();
  function detailChange() {
    const typeOfEdit = props.typeOfEdit as string;
    if (!typeOfEdit) {
      props.setEditMode(false);
      setChangeDetail('');
      return;
    }

    const data = {
      [typeOfEdit]: changeDetail,
    } as { userName: string } | { userEmail: string };
    editUserDetail(data);
    props.setEditMode(false);
    setChangeDetail('hello');
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, height: '100%' }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(9, 9, 11, 0.9)',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {/*cut button */}
          <View style={style.mainIconContainer}>
            <View style={{ width: '10%' }}>
              <OutlineButton opFunc={() => props.setEditMode(false)}>
                <View style={style.iconImagecontainer}>
                  <Image
                    source={require('../asset/closeWhite.png')}
                    style={style.crossButtonStyle}
                  />
                </View>
              </OutlineButton>
            </View>
          </View>
          <InputField
            placeHolder={props.placeHolder}
            value={changeDetail}
            setValue={text => setChangeDetail(text)}
          />
          <SolidButton
            buttonDisable={false}
            title="Make the change"
            opFunc={() => detailChange()}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
const style = StyleSheet.create({
  mainIconContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  crossButtonStyle: {
    height: 10,
    width: 10,
    marginVertical: 10,
    marginHorizontal: 0,
  },
  iconImagecontainer: {
    width: '100%',
    alignItems: 'center',
  },
});
export default DetailChangeBox;
