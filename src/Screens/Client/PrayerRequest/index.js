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

const PrayerRequest = React.memo(props => {
  const {loading, isVisible, onClick, onPress} = props;
  return (
    <>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundColorHandler(),
            //   minHeight: getResHeight(450),
            //   maxHeight: getResHeight(650),
            //   width: '90%',
            //   alignSelf: 'center',

            //   borderRadius: 30,
            //   paddingHorizontal: '2%',
            //   paddingTop: '2%',
            //   paddingBottom: '30%',
            //   overFlow: 'hidden',
          }}>
          <View>
            <CustomHeader
              backPress={onClick}
              screenTitle={'Prayer request'}
              // centerLogo={true}
            />
          </View>
          <Formik
            //   validationSchema={theme.validationSchema.login}
            initialValues={{
    prayerCategory : ""
            }}
            onSubmit={async () => {}}>
            {({
              values,
              isValid,
              dirty,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
            }) => (
              <>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  style={{
                    flex: 1,
                  }}>
                  <View
                    style={{
                      width: '88%',
                      alignSelf: 'center',
                      paddingTop: getResHeight(10),
                      paddingBottom: '20%',
                    }}>
                    <InputBox
                      label={'Name (Optional):'}
                      placeholder={'Enter your name'}
                      value={values.name}
                      errorText={errors.name}
                      autoCapitalize="none"
                      onChangeText={text => {
                        setFieldValue(
                          'name',
                          text.replace(
                            /[`~!#$%^&*()_|+\-=?;: '",<>\{\}\[\]\\\/]/gi,
                            '',
                          ),
                        );
                      }}
                      onFocus={() => setFieldTouched('name')}
                      onBlur={() => handleBlur('name')}
                      outlineColor = {"red"}
    activeOutlineColor = {"green"}
                    />
                    <InputBox
                      label={'Email (Optional):'}
                      placeholder={'Enter Email'}
                      keyboardType={'email-address'}
                      value={values.email}
                      errorText={errors.email}
                      onChangeText={text => setFieldValue('email', text)}
                      onFocus={() => setFieldTouched('email')}
                      onBlur={() => handleBlur('email')}
                    />
                    <Text
                      style={{
                        marginTop: '5%',
                        color: '#666666',
                        paddingBottom: '2%',
                        fontFamily: theme.font.Helvetica,
                        fontSize: getFontSize(13),
                        fontWeight: '700',
                      }}>
                      Prayer Category
                    </Text>

                    <DropdownComp
                      dropdownData={[
                        {
                          label: 'Health',
                          value: 'Health',
                        },
                        {
                          label: 'Family',
                          value: 'Family',
                        },
                        {
                          label: 'Relationships',
                          value: 'Relationships',
                        },
                        {
                          label: 'Finances',
                          value: 'Finances',
                        },
                        {
                          label: 'Spiritual Growth',
                          value: 'Spiritual Growth',
                        },
                        {
                          label: 'Others',
                          value: 'Others',
                        },
                      ]}
                      vlaue={values.prayerCategory}
                      onChange = {(item)=>{
// setFieldValue('prayerCategory', item.value)
                      }}
                    />

                    {/* <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={[
                        {
                          label: 'Health',
                          value: 'Health',
                        },
                        {
                          label: 'Family',
                          value: 'Family',
                        },
                        {
                          label: 'Relationships',
                          value: 'Relationships',
                        },
                        {
                          label: 'Finances',
                          value: 'Finances',
                        },
                        {
                          label: 'Spiritual Growth',
                          value: 'Spiritual Growth',
                        },
                        {
                          label: 'Others',
                          value: 'Others',
                        },
                      ]}
                      maxHeight={getResHeight(150)}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      value={'Male'}
                      onChange={item => {
                        // this.setState({gender: item.value});
                      }}
                      renderItem={item => {
                        return (
                          <>
                            <View style={styles.item}>
                              <Text style={styles.textItem}>{item.label}</Text>
                            </View>
                          </>
                        );
                      }}
                    /> */}
                    {/* [
          {
            label: 'Health',
            value: 'Health',
          },
          {
            label: 'Family',
            value: 'Family',
          },
          {
            label: 'Relationships',
            value: 'Relationships',
          },
          {
            label: 'Finances',
            value: 'Finances',
          },
          {
            label: 'Spiritual Growth',
            value: 'Spiritual Growth',
          },
          {
            label: 'Others',
            value: 'Others',
          },
        ] */}
                    <InputBox
                      multiline
                      label={'Prayer Request'}
                      placeholder={'Type your prayer request...'}
                      value={values.password}
                      errorText={errors.password}
                      onPress={showPassword => {
                        this.setState({
                          showPassword: !this.state.showPassword,
                        });
                      }}
                      showEye={true}
                      onChangeText={text => {
                        setFieldValue('password', text);
                      }}
                      onFocus={() => setFieldTouched('password')}
                      onBlur={() => handleBlur('password')}
                    />
                    <Note desc={MsgConfig.prayerRequestNote} />
                  </View>
                  {/* </KeyboardAvoidingView> */}
                </ScrollView>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                    }}>
                    <CommonButtonComp
                      title={'Submit prayer'}
                      onPress={onPress}
                      iconLeft
                      loading={loading}
                      icon={
                        <VectorIcon
                          type={'FontAwesome5'}
                          name={'pray'}
                          size={getFontSize(23)}
                          color={'white'}
                        />
                      }
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Common Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  clickClose: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    position: 'absolute',
  },
  // Prayer modal button style
  btnTitleStyle: {
    textAlign: 'left',
    fontSize: getFontSize(12),
    fontFamily: theme.font.semiBold,
    marginLeft: '5%',
    marginTop: '2%',
  },
  btnContainerStyle: {
    marginBottom: '1.5%',
    width: '100%',
    height: getResHeight(45),
  },
  //Dropdown imle
  lableStyle: {
    fontSize: getFontSize(12),
    fontWeight: '600',
    fontFamily: theme.font.HelveticaBold,
    color: '#666666',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: '5%',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 16,
  },
});
export default PrayerRequest;
