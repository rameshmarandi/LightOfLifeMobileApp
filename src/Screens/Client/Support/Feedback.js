import React, {Component, useState, useRef} from 'react';
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
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Animatable from 'react-native-animatable';
import {TabView, SceneMap} from 'react-native-tab-view';

import {
  SCREENWIDTH,
  SCREENHEIGHT,
  getFontSize,
  hp,
  getResWidth,
  wp,
  getResHeight,
} from '../../../utility/responsive';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Button} from 'react-native-elements';
import GoogleMapComp from '../../../components/GoogleMapComp';
import QuickRouteComp from '../../../components/QuickRouteComp';
import {
  CommonButton,
  CommonButtonComp,
  CommonModal,
  DropdownComp,
  Note,
} from '../../../components/commonComp';
import {VectorIcon} from '../../../components/VectorIcon';
import InputBox from '../../../components/InputBox';

const Feedback = props => {
  const [activeIndex, setActiveIndex] = useState(0);

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
            screenTitle={'Feed back'}
          />
        </View>
        
      </SafeAreaView>
    </>
  );
};

export default Feedback ;
