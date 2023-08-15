import React from 'react';
import {Alert, Linking, Platform, Share} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../utility/theme';
import {asyncKeys, BASEURL} from '../config/constants';
import { store } from '../utility/store';


export const isLoggdIn = async () => {
  try {
    const asyncVal = await AsyncStorage.getItem(asyncKeys.loginSession);
    return asyncVal === '1' ? true : false;
  } catch (err) {
    console.log('Chack is logdin', err);
  }
  return false;
};

export const setIsLoggdIn = async val => {
  try {
    if (val) {
      AsyncStorage.setItem(asyncKeys.loginSession, '1');
      return true;
    }
  } catch (err) {
    console.log('Chack is logdin', err);
  }
  AsyncStorage.setItem(asyncKeys.loginSession, '0');
  return false;
};
