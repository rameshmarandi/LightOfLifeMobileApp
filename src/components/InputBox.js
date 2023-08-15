import React, {components, createRef, useRef, useState} from 'react';
import {
  TextInput as RNInput,
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import * as PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import PhoneInput from 'react-native-phone-number-input';
import {Button} from 'react-native-elements';
import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';

import {
  SCREENWIDTH,
  SCREENHEIGHT,
  getFontSize,
  getResWidth,
  getResHeight,
  wp,
  hp,
} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from '../components/VectorIcon';
import {changeDateFormat} from '../components/commonHelper';
import {getYears, removeSpace} from '../components/commonFunction';

function arrayObjtoObj(data) {
  try {
    let obj = data;
    if (typeof obj === 'object' || Array.isArray(obj)) {
      if (Array.isArray(obj) && obj.length != 0) {
        obj = Object.assign(
          {},
          ...obj.map(item => {
            return item;
          }),
        );
      }
      return obj;
    }
  } catch {}
  return {};
}

function InputBox(props) {
  const {style, onPressIn, onPressOut} = props;
  const {onKeyPress, onChangeText, disableSpace, mandatory, onFocus, onBlur} =
    props;
  const datePciker =
    typeof props.datePciker === 'boolean' ? props.datePciker : false;
  const {showYearPicker, datePcikerMode, dateformate, isDob} = props;
  const {errorStyle, errorText} = props;
  const {
    dropdownMultiple,
    dropDownDirection,
    isDropdown,
    searchable,
    dropdownItems,
    onSelectItem,
    schema,
  } = props;
  const {
    countrycodeDropdown,
    mode,
    keyboardType,
    maxLength,
    outlineColor,
    activeOutlineColor,
    value,
    lable,
    label,
    labelStyle,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    showEye,
    editable,
    multiline,
    letfIcon,
    rightIcon,
    disabled,
  } = props;

  const {isValidNumber} = props;
  const [showText, setShowText] = useState(true);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const pref = React.useRef(null);

  const minDate = () => {
    try {
      if (isDob) {
        return new Date(moment().subtract(73, 'years'));
      }
    } catch (e) {
      console.log('error', e);
    }
    return null;
  };
  const maxDate = () => {
    try {
      if (isDob) {
        return new Date(moment().subtract(20, 'years'));
      }
    } catch (e) {
      console.log('error', e);
    }
    return new Date();
  };

  const setValues = () => {
    if (isDropdown && dropdownMultiple) {
      if (value && Array.isArray(value) && value.length > 0) {
        return value.map(ele => {
          if (typeof schema == 'object' && schema.value) {
            return ele[schema.value];
          } else {
            return ele[value];
          }
        });
      } else {
        return [];
      }
    }
    return value;
  };

  const getContentSize = () => {
    let styleObj = arrayObjtoObj(props.style);
    let width = '80%';
    let height = getResHeight(37);
    let maxHeight = getResHeight(10);

    if (styleObj.width) {
      width = styleObj.width;
    }
    if (styleObj.height) {
      height = styleObj.height;
    }
    if (styleObj.minHeight) {
      height = styleObj.minHeight;
    }
    if (styleObj.maxHeight) {
      maxHeight = styleObj.maxHeight;
    }
    if (multiline) {
      return {
        width,
        minHeight: getResHeight(150),
        maxHeight: getResHeight(250),
        // maxHeight,
      };
    }
    return {
      width,
      height,
    };
  };

  const getErrorStyle = () => {
    let styleObj = arrayObjtoObj(props.style);
    let width = '90%';
    let color = theme.color.error;
    let fontFamily = theme.font.regular;
    let fontSize = getFontSize(11.5);
    let fontWeight = '400';

    if (styleObj.width) {
      width = styleObj.width;
    }
    if (styleObj.color) {
      color = styleObj.color;
    }
    if (styleObj.fontFamily) {
      fontFamily = styleObj.fontFamily;
    }
    if (styleObj.fontSize) {
      fontSize = styleObj.fontSize;
    }
    if (styleObj.fontWeight) {
      fontWeight = styleObj.fontWeight;
    }
    return {
      width,
      color,
      fontFamily,
      fontSize,
      fontWeight,
    };
  };

  const getTextStyle = () => {
    try {
      let obj = arrayObjtoObj(props.style);
      let textStyle = {
        color: disabled ? theme.color.placeholder : theme.color.primary,
        fontFamily: theme.font.medium,
        fontSize: getFontSize(12),
      };
      if (obj.fontFamily) {
        textStyle.fontFamily = obj.fontFamily;
      }
      if (obj.fontSize) {
        textStyle.fontSize = obj.fontSize;
      }
      if (obj.fontWeight) {
        textStyle.fontWeight = obj.fontWeight;
      }
      if (obj.color) {
        textStyle.color = obj.color;
      }
      return textStyle;
    } catch (erro) {
      return {};
    }
  };

  const showTextEntry = () => {
    if (typeof secureTextEntry == 'boolean' && secureTextEntry) {
      return showText;
    }
    return false;
  };

  let [inFocused, setInFocused] = useState(false);
  let [dialCode, setDialCode] = useState('IN');

  const InputMode = () => {
    if (mode == 'lable') {
      return 'outlined';
    }
    return mode;
  };

  const InputLable = () => {
    if (mode == 'lable') {
      return lable;
    }
    return lable;
  };
  const dropdownData = () => {
    if (showYearPicker) {
      return getYears().map(e => ({label: `${e}`, value: e}));
    }
    if (Array.isArray(dropdownItems) && dropdownItems.length > 0) {
      return dropdownItems;
    }
    return [];
  };
  return (
    <>
      {datePciker && (
        <DatePicker
          modal
          theme="light"
          mode={datePcikerMode ? datePcikerMode : 'date'}
          maximumDate={maxDate()}
          minimumDate={minDate()}
          open={open}
          date={new Date()}
          // date={selectedDate()}
          onConfirm={date => {
            if (typeof onBlur === 'function') onBlur();
            setOpen(false);
            setDate(date);
            const strDate = changeDateFormat(date, dateformate);
            onChangeText(strDate);
          }}
          onCancel={() => {
            setOpen(false);
            if (typeof onBlur === 'function') onBlur();
          }}
        />
      )}
      {typeof label === 'string' && label != '' && (
        <Text
          style={[
            {
              width: '100%',
              paddingHorizontal: '1%',
              marginTop: getResHeight(12),
            },
            {
              color: '#666666',
              fontFamily: theme.font.Helvetica,
              fontSize: getFontSize(13),
              fontWeight: '700',
            },
            {width: getContentSize().width},
            style && style.alignSelf && {alignSelf: style.alignSelf},
            labelStyle,
            // inFocused && {
            //   color: theme.color.secondPrimary,
            // },
          ]}>
          {label}
          {mandatory && (
            <Text
              style={{
                color: theme.color.alert,
              }}>
              {' '}
              *
            </Text>
          )}
        </Text>
      )}
      {(isDropdown || showYearPicker) && (
        <>
          <Dropdown
            data={dropdownData()}
            search={searchable ? true : false}
            maxHeight={300}
            labelField={schema && schema.label ? schema.label : 'label'}
            valueField={schema && schema.value ? schema.value : 'value'}
            placeholder={placeholder}
            value={value}
            disable={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onSelectItem}
            dropdownPosition={dropDownDirection}
            placeholderStyle={[
              getFontSize(),
              getTextStyle(),
              {
                color: placeholderTextColor,
              },
              {
                paddingLeft: getResWidth(2.2),
              },
            ]}
            flatListProps={{
              scrollsToTop: true,
            }}
            style={[
              {
                alignSelf: 'center',
                borderColor: disabled ? '#EDEDED' : 'lightgray',
                marginTop: hp(0.6),
                borderRadius: getResWidth(1),
                paddingHorizontal: getResWidth(5),

              },
              {
                paddingLeft: getResWidth(8),
              },
              getContentSize(),

              style,
              {
                // borderColor: '#DDDDDD',
              },
            ]}
            containerStyle={[
              theme.styles.cardEffect,
              {
                borderRadius: getResWidth(25),
              },
            ]}
            itemTextStyle={[getTextStyle()]}
            selectedTextStyle={[getTextStyle()]}
            fontFamily={theme.font.regular}
          />
        </>
      )}
      {!isDropdown && !showYearPicker && (
        <TextInput
          mode={InputMode()}
          enablesReturnKeyAutomatically
          keyboardType={
            countrycodeDropdown
              ? 'number-pad'
              : keyboardType
              ? keyboardType
              : 'default'
          }
          placeholderTextColor={'red'}
          maxLength={countrycodeDropdown ? 10 : maxLength}
          outlineColor={outlineColor}
          activeOutlineColor={activeOutlineColor}
          // disabled={disabled}
          theme={{
            colors: {
              primary: theme.color.primary,
              accent: theme.color.accent,
              background: theme.color.accent,
              placeholder: placeholderTextColor,
              disabled: '#7F7F7F',
            },
            roundness: getResWidth(7),
          }}
          multiline={multiline}
          autoCapitalize={false}
          editable={
            typeof disabled === 'boolean'
              ? !disabled
              : datePciker
              ? false
              : editable
          }
          secureTextEntry={showTextEntry()}
          label={InputLable()}
          placeholder={placeholder}
          value={value}
          onKeyPress={onKeyPress}
          onChangeText={onChangeText}        
          onPressOut={() => {
            if (typeof onPressOut == 'function') {
              onPressOut();
            }
          }}
          cursorColor={theme.color.primary}
          // activeUnderlineColor={theme.color.primary}
          underlineColor={theme.color.placeholder}
          numberOfLines={10}
          left={
            letfIcon && (
              <TextInput.Icon
                style={{
                  top: '13%',
                }}
                onPress={() => {
                  setShowText(!showText);
                }}
                icon={({size, color}) => {
                  return letfIcon;
                }}
              />
            )
          }
          right={
            (secureTextEntry || rightIcon) && (
              <TextInput.Icon
                style={{
                  top: '13%',
                }}
                onPress={() => {
                  setShowText(!showText);
                }}
                icon={({size, color}) => {
                  if (secureTextEntry && showEye) {
                    return (
                      <VectorIcon
                        style={(alignSelf = 'center')}
                        type="FontAwesome5"
                        name={showText ? 'eye-slash' : 'eye'}
                        color={theme.color.primary}
                        size={getFontSize(16)}
                      />
                    );
                  }
                  if (rightIcon) {
                    return rightIcon;
                  }
                  return null;
                }}
              />
            )
          }
          render={styleprops => {
            const contentStyle = styleprops.style.filter(
              se => se && typeof se === 'object',
            );
            if (countrycodeDropdown) {
              return (
                <View
                  style={[
                    {
                      flexDirection: 'row',
                    },
                    {
                      height: getContentSize().height,
                    },
                  ]}>
                  {countrycodeDropdown && (
                    <PhoneInput
                      {...styleprops}
                      ref={pref}
                      withDarkTheme={false}
                      selectionColor={theme.color.secondPrimary}
                      defaultCode={'IN'}
                      layout="second"
                      disabled={disabled}
                      placeholder={'Enter your mobile number'}
                      onChangeCountry={({callingCode, cca2}) => {
                        setDialCode(callingCode);
                      }}
                      containerStyle={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: theme.color.transparent,
                        paddingLeft: getResWidth(4),
                      }}
                      codeTextStyle={[
                        {
                          backgroundColor: theme.color.transparent,
                        },
                        getTextStyle(),
                      ]}
                      textContainerStyle={{
                        backgroundColor: theme.color.transparent,
                        paddingHorizontal: 0,
                      }}
                      countryPickerButtonStyle={{
                        width: disabled ? wp(10.5) : wp(18),
                        padding: 0,
                      }}
                      disableArrowIcon={disabled}
                      textInputProps={{
                        selectionColor: theme.color.primary,
                        placeholder: 'Enter your mobile number',
                        placeholderTextColor: [
                          placeholderTextColor && {color: placeholderTextColor},
                          theme.styles.inputPlaceholder,
                        ],
                        onFocus: onFocus,
                        onBlur: onBlur,
                        maxLength: dialCode === 'IN' ? 10 : 0,
                        style: [getTextStyle(), getContentSize()],
                      }}
                    />
                  )}
                </View>
              );
            } else {
              return (
                <View
                  style={[
                    {
                      height: getContentSize().height,
                    },
                  ]}>
                  <RNInput
                    {...styleprops}
                    placeholderTextColor={'#7F7F7F'}
                    style={[
                      contentStyle,
                      getTextStyle(),
                      {
                        height: '100%',
                        paddingHorizontal: getResWidth(5),
                      },
                    ]}
                  />
                  {datePciker && (
                    <Button
                      disabled={disabled}
                      type="clear"
                      onPress={() => {
                        if (datePciker) {
                          setOpen(datePciker);
                          if (typeof onFocus === 'function') onFocus();
                        }
                      }}
                      containerStyle={[
                        {
                          width: getContentSize().width,
                          height: getContentSize().height,
                          backgroundColor: theme.color.transparent,
                          position: 'absolute',
                          zIndex: 10,
                          alignSelf: 'center',
                        },
                      ]}
                      buttonStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </View>
              );
            }
          }}
          selectionColor={theme.color.primary}
        
          style={[
            InputMode() == 'flat' && {
              backgroundColor: '#f4f5f6',
              borderBottomWidth: 0,
            },
            // style,
            // getContentSize(),
            getTextStyle(),
            multiline && {
              textAlignVertical: 'top',
              height: '100%',
              minHeight: getResHeight(70),
              maxHeight: getResHeight(250),
              lineHeight: 24,
              fontSize: getFontSize(15),
              fontFamily: theme.font.regular,
              paddingTop:"5%",
            },
            countrycodeDropdown && {
              zIndex: 100,
            },
            mode == 'lable' && {
              paddingTop: 0,
              marginTop: 0,
            },
            {
                fontSize: getFontSize(15),
              fontFamily: theme.font.bold,
              paddingHorizontal: '1.5%',

            },
          ]}
          {...this.props}
        />
      )}
      {errorText && (
        <Animated.Text
          style={[
            {marginTop: '0.8%', marginBottom: hp(0.5)},
            getErrorStyle(),
            errorStyle,
            {
              paddingHorizontal: '1%',
            },
          ]}>
          {errorText}
        </Animated.Text>
      )}
    </>
  );
}

InputBox.propTypes = {
  onKeyPress: PropTypes.func,
  disableSpace: PropTypes.bool,
  mode: PropTypes.oneOf[('outlined', 'flat', 'lable')],
  mandatory: PropTypes.bool,
  disabled: PropTypes.bool,
  inputType: PropTypes.string,
  datePciker: PropTypes.bool,
  dateformate: PropTypes.string,
  datePcikerType: PropTypes.string,
  isDob: PropTypes.bool,
  maximumDate: PropTypes.any,
  minimumDate: PropTypes.any,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  showEye: PropTypes.bool,
  label: PropTypes.string,
  listMode: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  outlineColor: PropTypes.string,
  activeOutlineColor: PropTypes.string,
  errorText: PropTypes.string,
  errorStyle: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
  }),
  style: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontWeight: PropTypes.shape(
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
    ),
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onSelectItem: PropTypes.func,
  isDropdown: PropTypes.bool,
  searchable: PropTypes.bool,
  schema: PropTypes.object,
  dropdownItems: PropTypes.array,
  dropDownMode: PropTypes.string, // DEFAULT, SIMPLE, BADGE
  dropdownMultiple: PropTypes.bool,
  showBadgeDot: PropTypes.bool,
  badgeColors: PropTypes.string,
  badgeTextStyle: PropTypes.any,
  showTickIcon: PropTypes.bool,
  dropdownOpen: PropTypes.bool,
  showYearPicker: PropTypes.bool,
};

InputBox.defaultProps = {
  disabled: false,
  showYearPicker: false,
  mode: 'lable',
  label: '',
  mandatory: false,
  keyboardType: 'default', //decimal-pad, phone-pad, name-phone-pad, number-pad, numeric, web-search, twitter, url, email-address, visible-password
  datePciker: false,
  datePcikerType: 'defult',
  dateformate: 'DD-MM-YYYY',
  isDob: false,
  maximumDate: null,
  minimumDate: null,
  onChangeText: text => {
    console.log(text);
  },
  onFocus: () => {},
  onBlur: () => {},
  secureTextEntry: false,
  multiline: false,
  placeholderTextColor: theme.color.placeholder, //'#CFCFD0',
  onSelectItem: () => {
    console.log('onSelectItem');
  },
  dropDownDirection: 'auto', //'auto' || 'bottom' || 'top'
  listMode: Platform.OS === 'android' ? 'SCROLLVIEW' : 'FLATLIST',
  isDropdown: false,
  searchable: false,
  dropdownItems: [],
  dropDownMode: 'SIMPLE',
  dropdownMultiple: false,
  showBadgeDot: false,
  badgeColors: theme.color.secondPrimary,
  badgeTextStyle: {color: theme.color.accent},
  showTickIcon: false,
  outlineColor: '#00000033',
  activeOutlineColor: theme.color.primary,
};

const OTPInputBox = props => {
  const {style, inputStyle} = props;
  const {label, labelStyle, mandatory} = props;
  const {boxSize: size, borderRadius, count} = props;
  const {
    value,
    placeholder,
    placeholderTextColor,
    onChangeText,
    onFocus,
    onBlur,
    selectionColor,
    keyboardType,
  } = props;
  const [elRefs, setElRefs] = useState([]);
  const [arrayOfValue, setArrayOfValue] = useState([]);
  const [isFocus, setIsFocus] = useState(null);

  const getContentSize = () => {
    let styleObj = arrayObjtoObj(props.style);
    let width = '100%';
    let height = getResHeight(37);
    let maxHeight = getResHeight(120);

    if (styleObj.width) {
      width = styleObj.width;
    }
    if (styleObj.height) {
      height = styleObj.height;
    }
    if (styleObj.minHeight) {
      height = styleObj.minHeight;
    }
    if (styleObj.maxHeight) {
      maxHeight = styleObj.maxHeight;
    }
    return {
      width,
      height,
    };
  };

  const getTextStyle = () => {
    try {
      let obj = arrayObjtoObj(props.style);
      let textStyle = {
        color: 'black', //theme.color.textColor,
        fontFamily: theme.font.regular,
        fontSize: size ? getFontSize(size / 3.5) : getFontSize(35),
        fontWeight: '400',
      };
      if (obj.fontFamily) {
        textStyle.fontFamily = obj.fontFamily;
      }
      if (obj.fontSize) {
        textStyle.fontSize = obj.fontSize;
      }
      if (obj.fontWeight) {
        textStyle.fontWeight = obj.fontWeight;
      }
      if (obj.color) {
        textStyle.color = obj.color;
      }
      return textStyle;
    } catch (erro) {
      return {};
    }
  };

  React.useEffect(() => {
    setElRefs(elRefs =>
      Array(count)
        .fill()
        .map((_, i) => elRefs[i] || createRef()),
    );
    setArrayOfValue(arrayOfValue =>
      Array(count)
        .fill()
        .map((_, i) => {
          if (value != '') {
            let defultArray = value.split('');
            if (defultArray[i].length != 0) {
              return arrayOfValue[i] || defultArray[i];
            }
          }
          return arrayOfValue[i] || createRef();
        }),
    );
  }, [count]);

  return (
    <>
      {typeof label === 'string' && label != '' && (
        <Text
          style={[
            {
              width: '100%',
              paddingHorizontal: '1%',
              marginTop: getResHeight(13),
            },
            {
              color: '#666666',
              fontFamily: theme.font.Helvetica,
              fontSize: getFontSize(13),
              fontWeight: '700',
            },
            {width: getContentSize().width},
            style && style.alignSelf && {alignSelf: style.alignSelf},
            labelStyle,
            // inFocused && {
            //   color: theme.color.secondPrimary,
            // },
          ]}>
          {label}
          {mandatory && (
            <Text
              style={{
                color: theme.color.alert,
              }}>
              {' '}
              *
            </Text>
          )}
        </Text>
      )}
      <View
        style={[
          {
            marginLeft: '2%',
            width: '50%',
            flexDirection: 'row',
          },
          style,
        ]}>
        {elRefs.map((ele, i) => (
          <RNInput
            ref={elRefs[i]}
            contextMenuHidden={true}
            selectionColor={selectionColor}
            value={
              arrayOfValue && arrayOfValue.length > 0 ? arrayOfValue[i] : ''
            }
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            numberOfLines={1}
            maxLength={1}
            textContentType="oneTimeCode"
            keyboardType={keyboardType}
            onChangeText={text => {
              try {
                arrayOfValue[i] = text;
                if (onChangeText) {
                  let value = arrayOfValue.join('');
                  onChangeText(value);
                }
                if (text.length > 0) {
                  if (i < elRefs.length - 1) {
                    elRefs[i + 1].current.focus();
                  } else {
                    elRefs[i].current.blur();
                  }
                }
              } catch (error) {
                console.tron.log('error for text', error);
              }
            }}
            onKeyPress={e => {
              let keyitem = e.nativeEvent.key;
              if (keyitem == 'Backspace') {
                if (i != 0) {
                  elRefs[i - 1].current.focus();
                }
              }
            }}
            onFocus={() => {
              if (onFocus) {
                onFocus();
              }

              setIsFocus(elRefs[i]);
              if (i != 0) {
                for (let j = 0; i > j; j++) {
                  if (arrayOfValue[j] == '') {
                    elRefs[i].current.blur();
                    elRefs[j].current.focus();
                  }
                }
              }
            }}
            onBlur={() => {
              if (onBlur) {
                onBlur();
              }
              setIsFocus(null);
            }}
            style={[
              OtpStyle.Input,
              getTextStyle(),
              borderRadius && {
                borderRadius: borderRadius,
              },
              isFocus && {
                borderColor: '#C4C4C4',
              },
              inputStyle,
              size && {
                width: size,
                height: size,
              },
            ]}
          />
        ))}
      </View>
    </>
  );
};

OTPInputBox.PropTypes = {
  style: PropTypes.any,
  inputStyle: PropTypes.shape({
    color: PropTypes.string,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  boxSize: PropTypes.number,
  borderRadius: PropTypes.number,
  count: PropTypes.number,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  selectionColor: PropTypes.string,
  keyboardType: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

OTPInputBox.defaultProps = {
  count: 4,
  value: '',
  placeholder: '',
  placeholderTextColor: 'gray',
  selectionColor: theme.color.primary,
  // selectionColor: theme.color.primary,
  keyboardType: 'number-pad',
  boxSize: getResWidth(20),
  onChangeText: text => {
    console.log(text);
  },
  onFocus: () => {},
  onBlur: () => {},
};

const OtpStyle = StyleSheet.create({
  Input: {
    width: SCREENWIDTH / 5,
    height: SCREENWIDTH / 7,
    backgroundColor: theme.color.accent,
    borderColor: '#C4C4C4',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontFamily: theme.font.regular,
    fontWeight: '500',
  },
});

export {OTPInputBox};
export default InputBox;
