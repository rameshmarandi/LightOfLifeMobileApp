import React, {Component} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../../../utility/theme';
import {Image} from 'react-native';
import {
  hp,
  getFontSize,
  getResHeight,
  getResWidth,
  wp,
} from '../../../utility/responsive';
import {Formik} from 'formik';
import InputBox from '../../../components/InputBox';
import {BannerHeader, CommonButton} from '../../../components/commonComp';
// import NavigationBar from '../../../navigation/navHeader';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    // this.props.navigation.setOptions(
    //   NavigationBar({
    //     backProps: {
    //       onPress: () => {
    //         this.props.navigation.goBack();
    //       },
    //       title: 'Password Change',
    //     },
    //     notificationProps: {onPress: () => {
    //       this.props.navigation.navigate("Notification")
    //     }},
    //     navigation: this.props.navigation,
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
            title={'Change Password'}
            descp={'Set your password.'}
          />
        </View>
        <Formik
          validationSchema={theme.validationSchema.changePassword}
          initialValues={{
            password: '',
            confirmpassword: '',
          }}
          validate={values => {
            let error = {};
            if (values.email && values.otp.length != 4) {
              error.otp = 'Enter OTP.';
            }
            return error;
          }}
          onSubmit={() => {
            this.props.navigation.navigate('Login');
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
                    secureTextEntry
                    showEye
                    label={'Password'}
                    placeholder={'Set Password'}
                    value={values.password}
                    errorText={errors.password}
                    onChangeText={handleChange('password')}
                    onFocus={() => setFieldTouched('password')}
                    onBlur={() => handleBlur('password')}
                  />
                  <InputBox
                    secureTextEntry
                    showEye
                    label={'Confirm Password'}
                    placeholder={'Re-enter Password'}
                    value={values.confirmpassword}
                    errorText={errors.confirmpassword}
                    onChangeText={handleChange('confirmpassword')}
                    onFocus={() => setFieldTouched('confirmpassword')}
                    onBlur={() => handleBlur('confirmpassword')}
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
                  title="Confirm"
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
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
