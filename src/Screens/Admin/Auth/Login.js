import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
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
  HyperTxt,
} from '../../../components/commonComp';
import LoginWithGoggle from '../../../components/LoginWithGoggle';
// import NavigationBar from '../../../navigation/navHeader';
import {LoginAPI} from '../../../apis/authRepo';
import AnimatedLoader from 'react-native-animated-loader';
import {backgroundColorHandler} from '../../../components/commonHelper';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      alertModal: false,
      alerText: '',
    };
  }
  componentDidMount() {}
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.color.white,
        }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColorHandler()}
          barStyle={'light-content'}
        />

        <ImageBackground
          source={{
            uri: 'https://image.lexica.art/full_jpg/c54ff322-4f23-4cf4-82d8-2fa693cfd7fb',
          }}
          resizeMode="cover"
          style={{
            width: SCREENWIDTH,
            height: SCREENHEIGHT,
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: SCREENWIDTH,
              height: SCREENHEIGHT,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}></View>
          
            <Image
              source={theme.assets.church_logo}
              resizeMode="cover"
              style={{
                height: getResHeight(160),
                width: '90%',
                marginTop:"30%"   ,
                alignSelf:"center"           
              }}
            />
        

          <View
            style={{
              zIndex: 99999,
            }}>
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
                <>
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      paddingTop: getResHeight(10),
                    }}>
                    <InputBox
                      label={'Email'}
                      placeholder={'Enter Email'}
                      keyboardType={'email-address'}
                      value={values.email}
                      errorText={errors.email}
                      onChangeText={text => setFieldValue('email', text)}
                      onFocus={() => setFieldTouched('email')}
                      onBlur={() => handleBlur('email')}
                      outlineColor={'white'}
                      labelStyle={{
                        color: 'white',
                      }}
                      activeOutlineColor={
                      'white'
                      }
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
                        setFieldValue('password', text);
                      }}
                      onFocus={() => setFieldTouched('password')}
                      onBlur={() => handleBlur('password')}
                      labelStyle={{
                        color: 'white',
                      }}
                      outlineColor={'white'}
                      activeOutlineColor={
                      'white'
                      }
                    />
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-end',
                        marginRight: getResWidth(2),
                        marginTop: getResHeight(5),
                      }}>
                      <Text
                        style={{
                          color: 'white',
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
                      onPress={async () => {}}
                      isLoading={this.state.isLoading}
                      containerStyle={{
                        marginTop: getResHeight(20),
                      }}
                    />
                  </View>
                  {/* <LoginWithGoggle
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
                /> */}
                  <HyperTxt
                    text={"Don't have account?"}
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
                </>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
