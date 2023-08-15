import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native';
import theme from '../../../utility/theme';
import {Image} from 'react-native';
import {
  hp,
  getFontSize,
  getResHeight,
  getResWidth,
  wp,
} from '../../../utility/responsive';
import {VectorIcon} from '../../../components/VectorIcon';
import {Formik} from 'formik';
import InputBox, {OTPInputBox} from '../../../components/InputBox';
import {BannerHeader, CommonButton} from '../../../components/commonComp';
// import NavigationBar from '../../../navigation/navHeader';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    // props.navigation.setOptions(
    //   NavigationBar({
  //     navigation: props.navigation,
    //     headerTransparent: true,
    //     // backProps: {},
    //   }),
    // );
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS == 'ios' ? hp(0) : hp(-50)}>
          <Image
            source={assets.Rectanglee}
            style={{
              width: '100%',
              height: hp(35),
              position: 'absolute',
            }}
          />
          <SafeAreaView
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={[
                  {
                    width: '100%',
                    height: Platform.OS == 'android' ? hp(35) : hp(23.5),
                    paddingHorizontal: '5%',
                    paddingBottom: getResHeight(20),
                    justifyContent: 'space-between',
                  },
                  Platform.OS == 'android' && {
                    paddingTop: hp(8.5),
                  },
                ]}>
                <Image
                  source={assets.FliickLogo}
                  resizeMode="contain"
                  style={{
                    width: getResWidth(88),
                    height: getResHeight(30),
                    marginLeft: getResWidth(-5),
                  }}
                />
                <BannerHeader
                  title={'Forgot password'}
                  descp={'Rest your password.'}
                />
              </View>
              <Formik
                validationSchema={theme.validationSchema.forgotPassword}
                initialValues={{
                  email: '',
                  otp: '',
                }}
                validate={values => {
                  let error = {};
                  if (values.email && values.otp.length != 4) {
                    error.otp = 'Enter OTP.';
                  }
                  return error;
                }}
                onSubmit={() => {
                  this.props.navigation.navigate('ChangePassword');
                }}>
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
                      bounces={false}
                      style={{
                        flex: 1,
                      }}>
                      {console.log('error', errors)}
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingTop: '5%',
                        }}>
                        <InputBox
                          label={'Email'}
                          placeholder={'Enter your email address'}
                          value={values.email}
                          errorText={errors.email}
                          onChangeText={handleChange('email')}
                          onFocus={() => setFieldTouched('email')}
                          onBlur={() => handleBlur('email')}
                        />

                        <OTPInputBox
                          label="Verify OTP"
                          count={4}
                          boxSize={wp(12)}
                          onChangeText={handleChange('otp')}
                          value={this.state.otp}
                          style={{
                            width: '100%',
                            marginTop: getResHeight(10),
                          }}
                          inputStyle={{
                            marginRight: '8%',
                            borderWidth: 2,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </ScrollView>
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: getResHeight(5),
                      }}>
                      <CommonButton
                        title="Verify"
                        disabled={!(dirty && isValid)}
                        onPress={handleSubmit}
                        isLoading={this.state.isLoading}
                        containerStyle={{
                          marginTop: getResHeight(20),
                        }}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
