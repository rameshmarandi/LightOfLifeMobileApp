import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import * as rnfs from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {atob} from 'abab';
import moment from 'moment';
import PropTypes from 'prop-types';

import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {getFontSize, hp} from '../utility/responsive';
import theme from '../utility/theme';
import { store } from '../utility/store';



export const StatusCodeManager = (code)=>{
switch(code) {
  case 401: return {
    code:401,
    message:"Invalid credentials"
  }
  case 404: return {
    code:404,
    message:"User not registered"
  }
  case 409: return {
    code:409,
    message:"User has already exist"
  }
} 

}
const HyperTxt = props => {
  const {onPress, style, hyperText, hyperStyle, hypertxtUnderline} = props;
  const arr = props.text
    .replaceAll(`${hyperText}`, `**${hyperText}**`)
    .split(' ');
  const reducer = (acc, cur, index) => {
    let previousVal = acc[acc.length - 1];
    if (
      previousVal &&
      previousVal.startsWith('**') &&
      !previousVal.endsWith('**')
    ) {
      acc[acc.length - 1] = previousVal + ' ' + cur;
    } else {
      acc.push(cur);
    }
    return acc;
  };

  const text = arr.reduce(reducer, []);
  return (
    <Text
      {...props}
      style={[
        {
          color: theme.color.black,
          fontFamily: theme.font.medium,
          fontSize: getFontSize(14),
        },
        style,
      ]}>
      {text.map(text => {
        if (text.startsWith('**')) {
          return (
            <Text
              disabled={!onPress}
              onPress={() => {
                if (onPress && typeof onPress === 'function') {
                  onPress();
                }
              }}
              style={[
                {
                  color: theme.color.primary,
                  fontFamily: theme.font.semiBold,
                  fontSize: getFontSize(13),
                },
                hypertxtUnderline && {
                  textDecorationLine: 'underline',
                },
                hyperStyle,
              ]}>
              {hyperText}{' '}
            </Text>
          );
        }
        return `${text} `;
      })}
    </Text>
  );
};



HyperTxt.propTypes = {
  text: PropTypes.string,
  hyperText: PropTypes.string,
  hyperStyle: PropTypes.any,
  style: PropTypes.any,
  onPress: PropTypes.func,
};

HyperTxt.defaultProps = {
  onPress: () => {
    console.log('Hyper Text');
  },
};
export {HyperTxt};

export function HyperText({txt, txtStyle, hypertext, hypertextStyle, onPress}) {
  if (typeof hypertext === 'string') {
    return (
      <>
        <Text
          style={[
            {
              fontFamily: theme.font.regular,
              fontSize: getFontSize(11),
              color: '#000000',
            },
            txtStyle,
          ]}>
          {txt.replaceAll(hypertext, '')}
        </Text>
        <TouchableOpacity
          disabled={!onPress}
          onPress={() => {
            if (typeof onPress === 'function') {
              onPress();
            }
          }}
          style={{}}>
          <Text
            style={[
              {
                fontFamily: theme.font.bold,
                fontSize: getFontSize(11),
                color: '#E77817',
              },
              hypertextStyle,
            ]}>
            {hypertext}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <Text
      style={[
        {
          fontFamily: theme.font.regular,
          fontSize: getFontSize(11),
          color: '#000000',
        },
        txtStyle,
      ]}>
      {txt}
    </Text>
  );
}

export async function sendEmail(to, subject, body, options = {}) {
  const {cc, bcc} = options;

  let url = `mailto:${to}?subject:${subject}&body:${body}$cc:${cc}&${bcc}`;

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }
  return Linking.openURL(url);
}

export const dateCompareFromTo = (from, to, date) => {
  try {
    const mDate = moment(date, 'MMM D yyyy H:mmA');
    const mFrom = moment(from);
    const mTo = moment(to);
    if (mDate && mFrom && mTo) {
      return mDate.isAfter(mFrom) && mDate.isBefore(mTo);
    }
  } catch (err) {
    console.log('Date compateFromTo error', err);
  }
  return false;
};

export function getCurrentDate(format) {
  return moment().year().toString();
}

export const changeDateFormat = (date, format, dateFormat) => {
  if (dateFormat) {
    return moment(date, dateFormat).format(format ? format : 'DD MMM, YY');
  }
  return moment(date).format(format ? format : 'DD MMM, YY');
};

export function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const base64toBlob = (data, mimeType) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr(`data:${mimeType};base64,`.length);
  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  return new Blob([out], {type: mimeType});
};

export function getBaseStrToFile(baseStr, fileName) {
  try {
    let extension = fileName.split('.').pop();
    let blob = base64toBlob(baseStr, `application/${extension}`);
    let url = URL.createObjectURL(blob);
    const size = bytesToSize(blob.size);
    return {
      fileSize: size,
      fileName: fileName,
    };
  } catch (error) {
    console.log('File error', error);
    return null;
  }
}

export const fileSelector = async (filetype, isbase64) => {
  try {
    let res;
    switch (filetype) {
      case 'DOCUMENT':
        res = await DocumentPicker.pick({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
          ],
        });
        break;
      case 'IMAGE':
        res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        break;
      case 'ALL':
        res = await DocumentPicker.pick({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
            DocumentPicker.types.images,
          ],
        });
        break;
    }
    if (isbase64) {
      res.base64 = await rnfs.readFile(res.uri, 'base64');
    }
    return res;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
    } else {
      throw err;
    }
  }
};

export const extractVideoId = youtubeUrl => {
  const match = youtubeUrl.match(/v=([^&]+)/);
  if (match) {
    return match[1];
  }
  return null; // Return null if no match found
};

export const backgroundColorHandler = ()=>{
  if(store.getState().auth.isDarkMode){
    return theme.color.darkTheme
  }else{
    return theme.color.white
  }
}

export const CheckDarkMode = async () => {
    const res = await getAsyncValue('darkMode');
    const isDarkMode = typeof res === 'string' ? res === 'true' : false; // Since res is null, it will be converted to false

    await setAsyncValue('darkMode', isDarkMode); // Sets 'darkMode' in AsyncStorage
    store.dispatch(isDarkMode(isDarkMode)); // Dispatches the isDarkMode action with the correct value (false) to Redux store
  };
          
export const textColorHandler = ()=>{
  if(store.getState().auth.isDarkMode){
    return 'white'
  }else{
    return theme.color.primary
    //  'black'
  }
}
// export const iconColorHandler = ()=>{
//   if(store.getState().auth.isDarkMode){
//     return 'white'
//   }else{
//     return theme.color.primary
//     //  'black'
//   }
// }
  

export const setAsyncValue = async (key, value) => {
  let setVal = value;
  try {
    if (typeof setVal === 'boolean') {
      setVal = setVal.toString();
    }
    await AsyncStorage.setItem(key, setVal);
  } catch { 
  }}
export const getAsyncValue = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}
