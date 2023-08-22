import React, {components, createRef, useRef, useState} from 'react';
import {
  TextInput as RNInput,
  Platform,
  StyleSheet,
  Text,
  TouchableSensitivity,
  View,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
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
import {
  backgroundColorHandler,
  changeDateFormat,
  textColorHandler,
} from '../components/commonHelper';
import {getYears, removeSpace} from '../components/commonFunction';

const CustomHeader = props => {
  const {Hamburger, backPress , screenTitle,centerLogo} = props;
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: backgroundColorHandler(),
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: '4%',
            backgroundColor: backgroundColorHandler(),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth:Hamburger ? 0.5 : 0,
            borderBottomColor:  textColorHandler()
          }}>
          {Hamburger && (
            <Button
              type={'clear'}
              onPress={Hamburger}
              iconPosition="right"            
              icon={
                <VectorIcon
                  type={'Ionicons'}
                  name={'menu'}
                  size={getFontSize(29)}
                  color={ textColorHandler()}
                  style={{
                    marginTop:"-5.5%",
                    marginLeft:"-2%"
                  }}
                />
              }
              iconContainerStyle={{
              }}
              containerStyle={[
                {
                  width: 47,
                  height:  45,
                  justifyContent:"center",
                  backgroundColor: backgroundColorHandler(),
                  borderRadius: 100,
                },
              ]}
              buttonStyle={[
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 100,
                },
              ]}
            />
          )}
          {backPress && (
            <View style={{
              flexDirection:"row",
              alignItems:"center"
            }}>
            <Button
              type={'clear'}
              onPress={backPress}
              iconPosition="right"            
              icon={
                <VectorIcon
                  type={'Ionicons'}
                  name={'chevron-back'}
                  size={getFontSize(29)}
                  color={ textColorHandler()}
                  style={{
                    marginTop:"-5.5%",
                    marginLeft:"-2%"
                  }}
                />
              }
              iconContainerStyle={{
              }}
              containerStyle={[
                {
                  width: 47,
                  height:  45,
                  justifyContent:"center",
                  backgroundColor: backgroundColorHandler(),
                  borderRadius: 100,
                },
              ]}
              buttonStyle={[
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 100,
                },
              ]}
            />

            <Text style={{
              fontSize: getFontSize(13),
              fontFamily: theme.font.medium,
              color:textColorHandler(),
              marginTop:"5%"
            }}>{screenTitle}</Text>
            </View>
          )}

          {centerLogo && typeof centerLogo == 'boolean' && (
            <View
              style={{
                width: getResWidth(78),
                height: getResHeight(60),
                borderRadius: 100,
                marginLeft:"-15%"
              }}>
              <Image
                source={theme.assets.church_logo_origianl}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 100,
                }}
              />
            </View>
          )}
          <View></View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default React.memo(CustomHeader);
