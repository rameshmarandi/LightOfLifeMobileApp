import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  Share,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
// import * as ImagePicker from 'react-native-image-crop-picker';
import * as rnfs from 'react-native-fs';
import {atob} from 'abab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../utility/theme';
import {StyleSheet, Modal} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {
  getFontSize,
  getResHeight,
  getResWidth,
  hp,
  wp,
} from '../utility/responsive';
import {asyncKeys, BASEURL} from '../config/constants';
import {store} from '../utility/store';
import {Text, IconButton, Colors, TextInput} from 'react-native-paper';

import {VectorIcon} from './VectorIcon';

export const CommonButton = props => {
  const {
    onPress,
    title,
    isLoading,
    buttonStyle,
    backgroundColor,
    titleStyle,
    disabled,
    containerStyle,
  } = props;
  return (
    <Button
      {...props}
      title={title}
      onPress={onPress}
      disabled={disabled}
      disabledStyle={{
        backgroundColor: theme.color.disabledBtn,
      }}
      disabledTitleStyle={{
        color: theme.color.accent,
        fontSize: getFontSize(16),
        fontFamily: theme.font.semiBold,
        fontWeight: 600,
      }}
      titleStyle={[
        {
          color: theme.color.accent,
          fontSize: getFontSize(14),
          fontFamily: theme.font.semiBold,
          fontWeight: 600,
        },
        titleStyle,
      ]}
      loading={isLoading}
      loadingProps={{size: 'small', color: 'white'}}
      containerStyle={[
        containerStyle,
        {
          width: '100%',
          height: getResHeight(45),
        },
      ]}
      buttonStyle={[
        {
          width: '100%',
          height: '100%',
          borderRadius: getResWidth(8),
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.color.seletedBtn,
        },
        buttonStyle,
      ]}
      letfIcon
    />
  );
};
export const CommonAlertModal = props => {
  const {
    onClick,
    navigateToBooking,
    message,
    nobtn,
    firstName,
    lastName,
    SaveBtnPressed,
    typeOfModal,
    isVisible,
    sessionModal,
    data,
    loading,
    center,
    alertTitle,
    addBookMark,
    removeBookMark,
  } = props;

  // const [modalVisisle , setModalVisislbe] = React.useState(false)
  console.log(alertTitle);
  const conditionCheck = () => {
    if (
      sessionModal == true ||
      addBookMark == true ||
      removeBookMark == true ||
      nobtn
    ) {
      return true;
    }
  };
  if (sessionModal == true) {
    setTimeout(async () => {
      store.dispatch({type: 'RESSET_STORE'});
      await setUserSession(false);
      props.navigation.navigate('Login');
      await GoogleSignin.signOut();
    }, 800);
  }

  return (
    <Modal
      visible={isVisible}
      // visible = {true}
      // isVisible={isVisible}
      onRequestClose={props.onRequestClose}
      // onSwipeComplete={props.onRequestClose}
      animationType={'fade'}
      // swipeDirection="up"
      // animationIn={'SlideInUP'}
      // coverScreen={true}
      // backdropTransitionInTiming={1000}
      // backdropTransitionOutTiming={2000}
      transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'white',
            //backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
          }}>
          <View
            style={{
              justifyContent: conditionCheck() ? 'center' : 'flex-start',
              alignItems: conditionCheck() ? 'center' : 'flex-start',
            }}>
            {conditionCheck() ? (
              <>
                <VectorIcon
                  type={'Ionicons'}
                  name={
                    sessionModal == true
                      ? 'close-circle-sharp'
                      : addBookMark == true
                      ? 'checkmark-circle-sharp'
                      : 'checkmark-circle-sharp'
                  }
                  size={getFontSize(50)}
                  color={
                    addBookMark == true || removeBookMark == true || nobtn
                      ? theme.color.primary
                      : theme.color.orange
                  }
                />
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: getFontSize(17),
                    fontFamily: theme.font.semiBold,
                    color: theme.color.primary,
                  }}>
                  Alert
                </Text>
              </>
            )}

            <Text
              style={{
                fontSize: getFontSize(12),
                fontFamily: conditionCheck()
                  ? theme.font.semiBold
                  : theme.font.regular,
                marginTop: '3%',
                color: 'black',
                textAlign: conditionCheck() ? 'center' : 'left',
              }}>
              {message
                ? message
                : sessionModal
                ? `Your Session has beesn expired!`
                : addBookMark == true
                ? 'Property has been shortlisted'
                : removeBookMark == true
                ? 'Property has been removed from shortlisted'
                : alertTitle}
            </Text>
            {conditionCheck() ? null : (
              <>
                <View
                  style={{
                    width: '100%',
                    marginTop: '10%',
                  }}>
                  <CommonButton title={'OK'} onPress={onClick} />
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const EmptyDataComponet = props => {
  const {title, desc} = props;
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '2%',
          paddingVertical: '2%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            top: '15%',
            fontFamily: theme.font.medium,
            color: theme.color.primary,
            fontSize: getFontSize(14),
          }}>
          {title}
        </Text>

        {desc !== undefined && (
          <>
            <Text
              style={{
                top: '15%',
                fontFamily: theme.font.medium,
                color: theme.color.black,
                fontSize: getFontSize(12),
              }}>
              {desc}
            </Text>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  card: {
    width: '99%',
    marginBottom: '4%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowRadius: 1,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 2,
    margin:5,
    borderRadius: 10,
  },
  TemStyle: {
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 20,
    height: '100%',
    width: '100%',
  },
  logoStyle: {
    height: '50%',
    width: '40%',
  },
});
