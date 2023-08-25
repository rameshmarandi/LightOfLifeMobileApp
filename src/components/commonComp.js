import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  Share,
  View,
  SafeAreaView,
  Text,
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

import {Dropdown} from 'react-native-element-dropdown';
import { store } from '../utility/store';
  const isDarkMode = store.getState().auth.isDarkMode

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
export const Note = props => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'rgba(47, 59, 117, 0.6)',
        padding: '5%',
        borderRadius: 10,
        marginTop: '4%',
      }}>
      <Text
        style={[
          styles.noticeStyle,
          {
            color: 'black',
            fontWeight: '800',
          },
        ]}>
        Note:
      </Text>
      <Text
        style={[
          {
            lineHeight: 18,
            color: 'white',
          },
        ]}>
        {props.desc}
      </Text>
    </View>
  );
};
export const DropdownComp = (props) => {
  const {dropdownData ,placeholder, value ,onChange}  = props
  

  const darkmodeColorHandler = ()=>{
    if(isDarkMode){
      return theme.color.white
    }else{
      return theme.color.black
    }
  }
  return (
    <>
      <Dropdown
        data={dropdownData}
        maxHeight={getResHeight(250)}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.dropdown}
        placeholderStyle={[styles.placeholderStyle , {
          color:darkmodeColorHandler()
        }]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle = {styles.containerStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle = {{
          color :darkmodeColorHandler()
        }}
        renderItem={item => {
          return (
            <>
              <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
              </View>
            </>
          );
        }}
      />
    </>
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
      icon={icon}
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
   //Dropdown imle
  lableStyle: {
    fontSize: getFontSize(12),
    fontWeight: '600',
    fontFamily: theme.font.HelveticaBold,
    color: '#666666',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: isDarkMode ? '#666666':'lightgray',
    width: '100%',
    height: 50,
    backgroundColor:isDarkMode ? "black": '#F8F8F8',
    borderRadius: 10,
  
    paddingHorizontal: '5%',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color:isDarkMode ? "white":"black"
  },
  placeholderStyle: {
    fontSize: 16,
    color:isDarkMode  ? '#ffffff':"black"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:isDarkMode ? "white":"black"
  },
  containerStyle : {
    borderRadius:10,
    backgroundColor:isDarkMode ? "black" : "white"
    // borderToLeftRadius:10, 
    // borderToRightRadius:10, 
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 16,
    backgroundColor:"black"
  },
});
