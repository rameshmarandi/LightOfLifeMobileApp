import React, {createRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../theme';
import {getFontSize, getResWidth, SCREENWIDTH} from '../utility/responsive';

const OTPInputBox = (props) => {
  const {style, inputStyle} = props;
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

  React.useEffect(() => {
    setElRefs((elRefs) =>
      Array(count)
        .fill()
        .map((_, i) => elRefs[i] || createRef()),
    );
    setArrayOfValue((arrayOfValue) =>
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
    <View
      style={[
        {
          width: '90%',
          flexDirection: 'row',
          //justifyContent: 'space-evenly',
          //marginVertical: '5%',
          alignSelf: 'center',
        },
        style,
      ]}>
      {elRefs.map((ele, i) => (
        <TextInput
          ref={elRefs[i]}
          contextMenuHidden={true}
          selectionColor={selectionColor}
          value={arrayOfValue && arrayOfValue.length > 0 ? arrayOfValue[i] : ''}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          numberOfLines={1}
          maxLength={1}
          textContentType="oneTimeCode"
          keyboardType={keyboardType}
          onChangeText={(text) => {
            try {
              arrayOfValue[i] = text;
              if (onChangeText) {
                let value = arrayOfValue.map((ele) => {
                  if (typeof ele === 'object') {
                    return '';
                  }
                  return ele;
                });
                value = value.join('');
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
          onKeyPress={(e) => {
            let keyitem = e.nativeEvent.key;
            if (keyitem == 'Backspace' && arrayOfValue[i] == '' && i != 0) {
              if (i - 1 >= 0 && arrayOfValue[i - 1] != '') {
                arrayOfValue[i - 1] = '';
              }
              elRefs[i - 1].current.focus();
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
            borderRadius && {
              borderRadius: borderRadius,
            },
            isFocus && {
              borderColor: theme.color.primary,
            },
            size && {
              fontSize: size ? getFontSize(size / 2.2) : getFontSize(35),
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
  keyboardType: 'number-pad',
  boxSize: getResWidth(40),
};

const OtpStyle = StyleSheet.create({
  Input: {
    width: SCREENWIDTH / 7,
    height: SCREENWIDTH / 7,
    backgroundColor: theme.color.accent,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontFamily: theme.font.Medium,
    fontWeight: '500',
  },
});

export default OTPInputBox;
