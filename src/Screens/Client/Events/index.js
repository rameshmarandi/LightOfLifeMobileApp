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

const TabsNames = [
  {key: '0', tabTitle: 'Upcoming Events'},
  {key: '1', tabTitle: 'Past Events'},
];

const Events = props => {
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
                  borderBottomColor:
                    activeIndex === index ? theme.color.error : '#C0C0C0',
                  marginBottom: '3.5%',
                  paddingBottom: 0,
                  transitionProperty: 'borderBottomColor',
                  transitionDuration: '0.9s',
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
        <View
          style={{
            paddingHorizontal: '5%',
            flex: 1,
          }}>
          <FlatList
            data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <>
                  <View
                    style={{
                      width: '98%',
                      padding: '5%',
                      borderWidth: 1,
                      backgroundColor: '#FFFFFF',
                      shadowColor: 'black',
                      shadowOffset: {width: 0, height: 1},
                      shadowRadius: 10,
                      shadowOpacity: 0.1,
                      elevation: 3,
                      borderRadius: 10,
                      borderColor: '#F3EEF2',
                      marginBottom: '5%',
                      margin: 5,
                      overflow: 'hidden',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent:"center",
                        alignItems:"center"
                      }}>
                      <Image
                        source={{
                          uri: 'https://img.freepik.com/premium-vector/upcoming-events-speech-bubble-banner-with-upcoming-events-text-glassmorphism-style-business-marketing-advertising-vector-isolated-background-eps-10_399089-2079.jpg',
                        }}
                        resizeMode={'contain'}
                        style={{
                          width: 80,
                          height: 80,
                          // backgroundColor: 'green',
                          borderRadius: 10,
                        }}
                      />
                      <View
                        style={{
                          marginLeft: '4%',
                        }}>
                        <Text>Birth day</Text>
                        <Text>Location : Pimple Guruv</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        marginTop: '5%',
                      }}>
                      <Button
                        title={'Join us'}
                        onPress={() => {}}
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
                            color: 'white',
                            fontSize: getFontSize(12),
                            fontFamily: theme.font.semiBold,
                            fontWeight: 600,
                          },
                        ]}
                        loadingProps={{size: 'small', color: 'white'}}
                        containerStyle={[
                          {
                            width: '100%',
                            height: getResHeight(35),
                          },
                        ]}
                        buttonStyle={[
                          {
                            width: '100%',
                            height: '100%',
                            borderRadius: getResWidth(8),
                            backgroundColor: theme.color.seletedBtn,
                          },
                        ]}
                        letfIcon
                      />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: -5,
                        top: -1,
                        paddingHorizontal: '5%',
                        backgroundColor: '#D74826',
                        alignItems: 'center',
                        borderBottomLeftRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: theme.font.bold,
                          color: theme.color.white,
                          fontSize: getFontSize(19),
                        }}>
                        6
                      </Text>
                      <Text
                        style={{
                          fontFamily: theme.font.bold,
                          color: theme.color.white,
                          fontSize: getFontSize(11),
                        }}>
                        Aug
                      </Text>
                    </View>
                  </View>
                </>
              );
            }}
          />

          <Text>All Events</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Events;
