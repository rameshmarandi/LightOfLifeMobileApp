import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  StatusBar,
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
import {store} from '../utility/store';
import {backgroundColorHandler, bgInDarkMode, inAcitveTextInput, textColorHandler, textInDarkMode} from './commonHelper';
const isDarkMode = store.getState().auth.isDarkMode;

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
          color:textInDarkMode(),
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
          borderRadius: 60,
          backgroundColor: bgInDarkMode()
        },
        buttonStyle,
      ]}
      letfIcon
    />
  );
};
export const StatusBarComp = () => {
  return (
    <StatusBar
      animated={true}
      backgroundColor={backgroundColorHandler()}
      barStyle={'light-content'}
    />
  );
};
export const HyperTxt = props => {
  const {text, hyperText, onPress} = props;
  return (
    <>
      <View
        style={{
          paddingHorizontal: '5%',
          marginTop: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: getFontSize(12),
            fontFamily: theme.font.regular,
          }}>
          {text}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: 'white',
              fontSize: getFontSize(13),
              fontFamily: theme.font.bold,
              marginLeft: '5%',
              textDecorationLine: 'underline',
            }}>
            {hyperText}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export const Note = props => {
  const isDarkMode = store.getState().auth.isDarkMode;
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#1d3766',
        // backgroundColor: 'rgba(47, 59, 117, 0.6)',
        padding: '5%',
        borderRadius: 10,
        marginTop: '4%',
      }}>
      <Text
        style={[
          styles.noticeStyle,
          {
            color: 'white',
            // color:isDarkMode ? theme.color.white: 'black',
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
export const DropdownComp = props => {
  const {
    dropdownData,
    dropDownPlaceholder,
    placeholder,
    mandatory,
    lableName,
    value,
    itemContainerStyle,
    containerStyle,
    selectedTextStyle,
    itemStyles,
    style,
    onChange,
    inverted,
    lableColor,
    backgroundColor,
    dropdownPosition,
  } = props;
  const isDarkMode = store.getState().auth.isDarkMode;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: lableColor ? lableColor : '#666666',
            marginTop: '2.5%',
            paddingVertical: '2%',
            fontFamily: theme.font.semiBold,
            fontSize: getFontSize(12),
          }}>
          {lableName} 
        </Text>
        {mandatory && (
          <Text
            style={{
              color: 'red',
              marginTop: '3%',
            }}>
            *
          </Text>
        )}
      </View>
      <Dropdown
        data={dropdownData}
        maxHeight={getResHeight(250)}
        labelField="label"
        valueField="value"
        placeholder={dropDownPlaceholder ? dropDownPlaceholder : 'Select Item'}
        value={value}
        onChange={onChange}
        style={[
          styles.dropdown,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : isDarkMode
              ? theme.color.darkTheme
              : theme.color.white,
            borderColor:style ? style.borderColor :inAcitveTextInput()
            //  isDarkMode
            //   ? theme.color.darkModeTextInputOutline
            //   : theme.color.normalModeTextInputOutline,
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          {
            color: isDarkMode
              ? theme.color.white
              : theme.color.normalModeTextInputOutline,
          },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {
            color: selectedTextStyle
              ? selectedTextStyle.color
              : isDarkMode
              ? theme.color.white
              : theme.color.primary,
          },
        ]}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={{
          borderRadius: 10,
          backgroundColor: containerStyle
            ? containerStyle.backgroundColor
            : isDarkMode
            ? theme.color.darkTheme
            : 'white',
          marginTop: '-2%',
          overflow: 'hidden',
        }}
        iconStyle={styles.iconStyle}
        itemContainerStyle={{
          backgroundColor: itemContainerStyle
            ? itemContainerStyle.backgroundColor
            : isDarkMode
            ? theme.color.darkTheme
            : theme.color.white,
          borderColor: isDarkMode ? '#666666' : '#666666',
        }}
        renderItem={item => {
          return (
            <>
              <View
                style={[
                  styles.item,
                  {
                    overflow: 'hidden',
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                  },
                ]}>
                <Text
                  style={[
                    styles.textItem,
                    {
                      color: theme.color.primary,
                        overflow: 'hidden',
                    },
                  ]}>
                  {item.label}
                </Text>
              </View>
            </>
          );
        }}
       dropdownPosition = {dropdownPosition}
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
          color: textInDarkMode(),
        },
      ]}
      disabledStyle={{
        backgroundColor: theme.color.disabledBtn,
      }}
      disabledTitleStyle={[
        styles.btnTitleStyle,
        {
          color: '#cccccc',
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
          backgroundColor: bgInDarkMode(),
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
    fontFamily: theme.font.regular,
    color: '#666666',
  },
  dropdown: {
    borderWidth: 1,
    width: '100%',
    height: 50,
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
    fontSize: getFontSize(12),
    fontFamily: theme.font.regular

  },
  placeholderStyle: {
    fontSize: getFontSize(12),
    color: isDarkMode ? '#ffffff' : theme.color.darkTheme,
    fontFamily: theme.font.regular
  },
  selectedTextStyle: {
    fontSize: getFontSize(12),
    color: isDarkMode ? 'green' : theme.color.darkTheme,
    fontFamily: theme.font.regular
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: getFontSize(14),
    backgroundColor: theme.color.darkTheme,
  },
});
