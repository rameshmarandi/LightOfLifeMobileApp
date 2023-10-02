import React, {Component, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Image,
  Modal,
  Linking,
  ScrollView,
  Animated,
  useWindowDimensions,
  FlatList,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';

import {Formik} from 'formik';
import theme from '../../../utility/theme';
import {
  backgroundColorHandler,
  extractVideoId,
  getAsyncValue,
  setAsyncValue,
  textColorHandler,
} from '../../../components/commonHelper';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {ALL_LINKS} from '../../../config/constants';
import * as PN from '../../../components/pushNotificaiton';
import {sendOTPViaEmail} from '../../../apis/authRepo';
import CustomHeader from '../../../components/CustomHeader';
import SectionHeader from '../../../components/SectionHeader';
import MsgConfig from '../../../config/MsgConfig';
import * as Animatable from 'react-native-animatable';

import {
  SCREENWIDTH,
  SCREENHEIGHT,
  getFontSize,
  hp,
  getResWidth,
  wp,
  getResHeight,
} from '../../../utility/responsive';

import {Button} from 'react-native-elements';
import {
  CommonButton,
  CommonButtonComp,
  CommonModal,
  DropdownComp,
  Note,
} from '../../../components/commonComp';
import {VectorIcon} from '../../../components/VectorIcon';
import InputBox from '../../../components/InputBox';
import {store} from '../../../utility/store';

const ContactWithUs = props => {
  let darkModeStatus = store.getState().auth.isDarkMode;
  useEffect(() => {}, []);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: backgroundColorHandler(),
        }}>
        <View>
          <CustomHeader
            backPress={() => {
              props.navigation.goBack();
            }}
            screenTitle={'Contact us'}
          />

          <View
            style={{
              paddingHorizontal: '5%',
            }}>
            <HeaderAndDescComp
              title={'Contact Us'}
              desc={`We are here to assist you and welcome your inquiries, prayer requests, and messages. Please feel free to reach out to us through the following means:`}
            />
            <HeaderAndDescComp
              title={'General Inquiries:'}
              desc={`For general questions or comments about our church, events, or community, please email us at `}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const HeaderAndDescComp = props => {
  const {title, desc} = props;
  return (
    <>
      <View
        style={{
          marginTop: '5%',
        }}>
        <Text
          style={{
              color: textColorHandler(),
            fontSize: getFontSize(14),
            fontFamily: theme.font.medium,
            fontWeight:"800"
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: textColorHandler(),
            fontSize: getFontSize(10),
            fontFamily: theme.font.regular,
            lineHeight: 21,
          }}>
          {desc}
        </Text>
      </View>
    </>
  );
};
export default ContactWithUs;
