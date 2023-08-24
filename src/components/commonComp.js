import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  Share,
  View,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as rnfs from 'react-native-fs';
import {atob} from 'abab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../utility/theme';
import {Button, Image} from 'react-native-elements';
import {
  getFontSize,
  getResHeight,
  SCREENWIDTH,
  SCREENHEIGHT,
  getResWidth,
  hp,
  wp,
} from '../utility/responsive';
import {VectorIcon} from './VectorIcon';

export const CommonModal = props => {
  const {onClick, isVisible, renderUi, loading} = props;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <Modal visible={isVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={onClick}
              style={styles.clickClose}></TouchableOpacity>

            {renderUi()}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
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
export const CommonButtonComp = props => {
  const {
    onPress,
    title,
    icon,
    rightIcon,
    leftIcon,
    isLoading,
    buttonStyle,
    backgroundColor,
    titleStyle,
    disabled,
    containerStyle,
  } = props;
  return (
  
      <Button
        title={title}
        onPress={onPress}
        icon={
          icon
        }
        titleStyle={[
          styles.btnTitleStyle,
          {
            color: 'white',
          },
        ]}      
        containerStyle={[
          styles.btnContainerStyle,
          {
            elevation: 6,
            borderRadius: 100,
          },
        ]}
        buttonStyle={[
          {
            width: '100%',
            height: '100%',
            borderRadius: 100,
            backgroundColor: theme.color.primary,
          },
        ]}
        {...props}
      />

  );
};
const styles = StyleSheet.create({
  // Common Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  clickClose: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    position: 'absolute',
  },
  // Prayer modal button style
  btnTitleStyle: {
    textAlign: 'left',
    fontSize: getFontSize(12),
    fontFamily: theme.font.semiBold,
    marginLeft: '5%',
    marginTop: '2%',
  },
  btnContainerStyle: {
    marginBottom: '1.5%',
    width: '100%',
    height: getResHeight(45),
  },
});
