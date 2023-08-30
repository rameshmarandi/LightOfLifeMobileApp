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
  wp,
  getResHeight,
} from '../../../utility/responsive';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Button} from 'react-native-elements';
import GoogleMapComp from '../../../components/GoogleMapComp';
import QuickRouteComp from '../../../components/QuickRouteComp';
import {
  CommonButtonComp,
  CommonModal,
  DropdownComp,
  Note,
} from '../../../components/commonComp';
import {VectorIcon} from '../../../components/VectorIcon';
import InputBox from '../../../components/InputBox';

const TabsNames = [
  {key: '0', tabTitle: 'Upcoming Events'},
  {key: '1', tabTitle: 'Past Events'},
];

const Events = React.memo(props => {
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
            screenTitle={'All Events'}
            // centerLogo={true}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            marginTop: '2.5%',
          }}>
          {TabsNames.map((tab, index) => (
            <Button
              title={tab.tabTitle}
              onPress={() => {
                setActiveIndex(index);
                // onPress(index);
              }}
              titleStyle={{
                color: activeIndex === index ? 'red' : textColorHandler(),
                fontFamily: theme.font.semiBold,
                fontSize: getFontSize(11),
                margin: 0,
                padding: 0,
              }}
              iconContainerStyle={{}}
              containerStyle={[
                {
                  width: '50%',
                  height: 45,
                  justifyContent: 'center',
                  backgroundColor: backgroundColorHandler(),
                  borderBottomWidth: activeIndex === index ? 2 : 2,
                  borderBottomColor: activeIndex === index ?theme.color.error :'#C0C0C0',
                  marginBottom: '3.5%',
                  paddingBottom: 0,
                },
              ]}
              buttonStyle={[
                {
                  width: '100%',
                  height: '100%',
                  backgroundColor: backgroundColorHandler(),
                  paddingBottom: 0,
                },
              ]}
            />
          ))}
        </View>
        <View>
          <Text>All Events</Text>
        </View>
      </SafeAreaView>
    </>
  );
});

export default Events;
