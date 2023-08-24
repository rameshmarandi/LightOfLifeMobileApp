import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import * as rnfs from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {atob} from 'abab';
import moment from 'moment';

import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {getFontSize, hp} from '../utility/responsive';
import theme from '../utility/theme';
import { store } from '../utility/store';

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
