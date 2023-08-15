import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native';
import {Image} from 'react-native';
import {Formik} from 'formik';

import theme from '../../../utility/theme';
import {
  hp,
  getFontSize,
  wp,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import InputBox, {OTPInputBox} from '../../../components/InputBox';
import {
  BannerHeader,
  CommonAlertModal,
  CommonButton,
  Texta,
} from '../../../components/commonComp';
// import NavigationBar from '../../../navigation/navHeader';
import {HyperTxt} from '../../../components/commonHelper';
import assets from '../../../utility/theme/assets';
import {RegisterNewUserAPI} from '../../../apis/authRepo';

class Registration extends Component {
  constructor(props) {
    super(props);
    // props.navigation.setOptions(
    //   NavigationBar({
    //     navigation: props.navigation,
    //     headerTransparent: true,
    //     // logoProps: {},
    //   }),
    // );
    this.state = {
      otpVisible: false,
      alertModal: false,
      alerText: '',
    };
  }
  componentDidMount() {
    }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
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
          <CommonAlertModal
            isVisible={this.state.alertModal}
            alertTitle={this.state.alerText}
            removeBtn
            onRequestClose={() => {
              this.setState({alertModal: false});
            }}
            onClick={() => {
              this.setState({alertModal: false});
            }}
            {...this.props}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS == 'ios' ? hp(0) : hp(-50)}>
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
                  Platform.OS === 'android' && {
                    paddingTop: hp(8.5),
                  },
                ]}>
                {/* <Image
                  source={assets.FliickLogo}
                  resizeMode="contain"
                  style={{
                    width: getResWidth(88),
                    height: getResHeight(30),
                    marginLeft: getResWidth(-5),
                  }}
                /> */}
                <BannerHeader
                  title={'Register'}
                  descp={'Create your account'}
                />
              </View>
              <Formik
                validationSchema={theme.validationSchema.registerUser}
                initialValues={{
                  firstName: 'Ramesh',
                  lastName: 'Marandi',
                  email: 'ramesh@gmail.com',
                  password: '123',
                }}
                onSubmit={() => {
                  console.tron.log('values.', values);
                  // this.props.navigation.navigate('RegisterCompny');
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
                  <ScrollView
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        paddingTop: '5%',
                      }}>
                      <InputBox
                        label={'First Name'}
                        placeholder={'Enter first name'}
                        placeholderTextColor={'#000000'}
                        value={values.firstName}
                        errorText={errors.firstName}
                        onChangeText={handleChange('firstName')}
                        onFocus={() => setFieldTouched('firstName')}
                        onBlur={() => handleBlur('firstName')}
                        style={{backgroundColor: '#FFFFFF'}}
                      />
                      <InputBox
                        label={'Last Name'}
                        placeholder={'Enter last name'}
                        placeholderTextColor={'#C0C0C0'}
                        value={values.lastName}
                        errorText={errors.lastName}
                        onChangeText={handleChange('lastName')}
                        onFocus={() => setFieldTouched('lastName')}
                        onBlur={() => handleBlur('lastName')}
                        style={{backgroundColor: '#FFFFFF'}}
                      />                    
                      <InputBox
                        label={'Email Address'}
                        placeholder={'Enter your email address'}
                        keyboardType={'email-address'}
                        placeholderTextColor={'#C0C0C0'}
                        value={values.email}
                        errorText={errors.email}
                        autoCapitalize="none"
                        onChangeText={handleChange('email')}
                        onFocus={() => setFieldTouched('email')}
                        onBlur={() => handleBlur('email')}
                        style={{backgroundColor: '#FFFFFF'}}
                        rightIcon={
                          <TouchableOpacity
                            disabled={
                              values.firstName == '' ||
                              values.lastName == '' ||
                              values.email == ''
                            }
                            onPress={async () => {
                              this.setState({alertModal: true});
                              this.setState({
                                otpVisible: !this.state.otpVisible,
                              });
                            }}>
                            <Text
                              style={{
                                fontFamily: theme.font.bold,
                                fontSize: getFontSize(11.2),
                                color: theme.color.primary,
                                padding: '5%',
                                textAlign: 'center',
                              }}>
                              Send OTP
                            </Text>
                          </TouchableOpacity>
                        }
                      />

                      {/* {this.state.otpVisible && (
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
                      )} */}

                      <InputBox
                        outline
                        label={'Enter password'}
                        placeholder={'Enter your password'}
                        placeholderTextColor={'#C0C0C0'}
                        value={values.password}
                        errorText={errors.password}
                        onChangeText={handleChange('password')}
                        onFocus={() => setFieldTouched('password')}
                        onBlur={() => handleBlur('password')}
                        style={{backgroundColor: '#FFFFFF'}}
                      />
                      <CommonButton
                        title="Next"
                        // disabled={!(dirty && isValid)}
                        onPress={async () => {
                          this.setState({isLoading: true}, async () => {
                            const res = await this.props.RegisterNewUserAPI(
                              values,
                            );
                            if (res.payload == 200) {
                              alert('Registration Successfully');
                              this.props.navigation.navigate('Login');
                            } else {                              
                              this.setState({alerText: res.payload.message});
                              this.setState({alertModal: true});
                            }
                            this.setState({isLoading: false});
                          });
                        }}
                        isLoading={this.state.isLoading}
                        containerStyle={{
                          marginTop: getResHeight(20),
                        }}
                      />
                      <HyperTxt
                        text={'Already have an Account? Log in'}
                        hyperText={'Log in'}
                        hypertxtUnderline
                        onPress={() => {
                          this.props.navigation.navigate('Login');
                        }}
                        style={{
                          width: '90%',
                          textAlign: 'center',
                          alignSelf: 'center',
                          marginTop: getResHeight(20),
                        }}
                      />
                    </View>
                  </ScrollView>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (props, state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    RegisterNewUserAPI: payload => dispatch(RegisterNewUserAPI(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
