import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native';
import theme from '../../../utility/theme';
import assets from '../../../utility/theme/assets';
import {
  hp,
  getFontSize,
  SCREENHEIGHT,
  SCREENWIDTH,
  wp,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import InputBox from '../../../components/InputBox';

import {Formik} from 'formik';
import {KeyboardAvoidingView} from 'react-native';
import {
  BannerHeader,
  CommonAlertModal,
  CommonButton,
} from '../../../components/commonComp';
import LoginWithGoggle from '../../../components/LoginWithGoggle';
// import NavigationBar from '../../../navigation/navHeader';
import {HyperTxt} from '../../../components/commonHelper';
import {LoginAPI} from '../../../apis/authRepo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      alertModal: false,
      alerText: '',
    };
  }
  componentDidMount() {
    // this.props.navigation.setOptions(
    //   NavigationBar({
    //     headerTransparent: true,
    //     logoProps: {},
    //   }),
    // );
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
                  flexDirection: 'column-reverse',
                },
              ]}>
              <BannerHeader
                title={'Login'}
                descp={'Enter username and password to Login\nto your account'}
              />
            </View>
            <Formik
              validationSchema={theme.validationSchema.login}
              initialValues={{
                email: '',
                password: '',
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
                <ScrollView
                  bounces={false}
                  style={{
                    flex: 1,
                  }}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        paddingTop: getResHeight(10),
                      }}>
                      <InputBox
                        label={'Email'}
                        placeholder={'Enter Email'}
                        keyboardType={"email-address"}
                        value={values.email}
                        errorText={errors.email}
                        onChangeText={text => setFieldValue('email', text)}
                        onFocus={() => setFieldTouched('email')}
                        onBlur={() => handleBlur('email')}
                      />
                      <InputBox
                        secureTextEntry={true}
                        label={'Password'}
                        placeholder={'Enter Password'}
                        value={values.password} 
                        errorText={errors.password}
                        onPress={showPassword => {
                          this.setState({
                            showPassword: !this.state.showPassword,
                          });
                        }}
                        showEye={true}
                        onChangeText={text => {
                          setFieldValue('password', text)}}
                        onFocus={() => setFieldTouched('password')}
                        onBlur={() => handleBlur('password')}
                      />
                      <TouchableOpacity
                        style={{
                          alignSelf: 'flex-end',
                          marginRight: getResWidth(2),
                          marginTop: getResHeight(5),
                        }}>
                        <Text
                          style={{
                            color: '#2F3B75',
                            fontFamily: theme.font.medium,
                            fontSize: getFontSize(14),
                          }}
                          onPress={() => {
                            this.props.navigation.navigate('ForgotPassword');
                          }}>
                          Forgot Password
                        </Text>
                      </TouchableOpacity>

                      <CommonButton
                        title="Login"
                        // disabled={!(dirty && isValid)}
                        onPress={async () => {
                          this.setState({isLoading: true}, async () => {
                            const res = await this.props.LoginAPI(values);
                            if (res.payload == 200) {
                              alert('Nice to see you back');
                              this.props.navigation.navigate('TabNav');
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
                    </View>
                    <LoginWithGoggle
                      title={'Login With Google'}
                      onPress={async () => {
                        // try {
                        //   await GoogleSignin.signOut();
                        //   await GoogleSignin.hasPlayServices();
                        //   const userInfo = await GoogleSignin.signIn();
                        //   // console.tron.log("userInfo", userInfo)
                        //   const payload = {
                        //     email: `${userInfo.user.email}`,
                        //     firstname: `${userInfo.user.givenName}`,
                        //     lastname: `${userInfo.user.familyName}`,
                        //   };
                        //   this.setState({isLoading: true});
                        //   const res = await this.props.loginWithGoogleThunk(
                        //     payload,
                        //   );
                        //   if (res.payload == true) {
                        //     await setUserSession(true);
                        //     const getEnquiry = await getEnquirySession();
                        //     if (getEnquiry == true) {
                        //       this.props.navigation.navigate('HomePage');
                        //     } else {
                        //       this.props.navigation.navigate('Enquiry');
                        //     }
                        //   } else {
                        //     if (res.payload == NotRegistered) {
                        //       this.setState({alerText: res.payload});
                        //       this.setState({alertModal: true});
                        //     } else {
                        //       this.setState({alerText: res.payload});
                        //       this.setState({alertModal: true});
                        //     }
                        //   }
                        //   this.setState({isLoading: false});
                        // } catch (err) {
                        //   // console.tron.log('Login With google Error', err);
                        // }
                      }}
                    />
                    <HyperTxt
                      text={"Don't have account? Register"}
                      hyperText={'Register'}
                      onPress={() => {
                        this.props.navigation.navigate('Registration');
                      }}
                      style={{
                        width: '90%',
                        textAlign: 'center',
                        alignSelf: 'center',
                        marginTop: getResHeight(20),
                      }}
                    />
                  </KeyboardAvoidingView>
                </ScrollView>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    LoginAPI: payload => dispatch(LoginAPI(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
