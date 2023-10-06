import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
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
  DropdownComp,
  HyperTxt,
} from '../../../components/commonComp';
import LoginWithGoggle from '../../../components/LoginWithGoggle';
// import NavigationBar from '../../../navigation/navHeader';
import {LoginAPI} from '../../../apis/authRepo';
import AnimatedLoader from 'react-native-animated-loader';
import {backgroundColorHandler} from '../../../components/commonHelper';
import {StyleSheet} from 'react-native';
import {VectorIcon} from '../../../components/VectorIcon';
import CustomHeader from '../../../components/CustomHeader';
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      alertModal: false,
      alerText: '',

      selectedIndex: 0,
    };
      this.textInputRef = React.createRef();
  }
  componentDidMount() {
    // this.textInputRef.current.focus();
  }
  render() {
    const {selectedIndex} = this.state;
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
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></View>

          {selectedIndex !== 0 && (
            <>
              <View
                style={{
                  marginTop: '5%',
                }}>
                <CustomHeader
                  backPress={() => {
                    this.setState({selectedIndex: selectedIndex - 1});
                  }}
                  backgroundColor={'none'}
                />
              </View>
            </>
          )}
          <Formik
            validationSchema={theme.validationSchema.login}
            initialValues={{
              firstName:"",
              lastName:"",

              email: '',
              mobile:"",
              password: '',
              DOB: '',
              gender:"",
              dailyVerbs:""
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
                  style={{
                    flex: 1,
                    paddingBottom:"70%"
                  }}>
              
                  <View
                    style={{
                    
                    }}>
                    <View
                      style={{
                        width: '95%',
                        alignSelf: 'center',
                        paddingTop:selectedIndex !==0?getResHeight(5) :  getResHeight(40),
                      }}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: theme.font.semiBold,
                            fontSize: getFontSize(17),
                          }}>
                          Registration
                        </Text>
                        <Text
                          style={{
                            color: theme.color.dimWhite,
                            fontFamily: theme.font.regular,
                            fontSize: getFontSize(11),
                          }}>
                          Start Your Spiritual Adventure
                        </Text>
                      </View>
                      {selectedIndex == 0 && (
                        <>
                          <InputBox
                            label={'First name'}
                            mandatory
                            returnKeyType={'next'}
                            cursorColor={styles.whiteColor}
                            placeholder={'Enter first name'}
                            value={values.firstName}
                            errorText={errors.firstName}
                            // onSubmitEditing={() => {
                            //   console.log("this.lastNameInput",this.lastNameInput.current)
                            //   // this.lastNameInput.focus()
                            // }}
                            onChangeText={text =>
                              setFieldValue('firstName', text)
                            }
                            onFocus={() => setFieldTouched('firstName')}
                            onBlur={() => handleBlur('firstName')}
                            outlineColor={theme.color.dimWhite}
                            placeholderTextColor={theme.color.dimWhite}
                            labelStyle={{
                              color: styles.whiteColor,
                            }}
                            activeOutlineColor={styles.whiteColor}
                          />
                          <InputBox
                            label={'Last name'}
                            mandatory
                            returnKeyType={'next'}
                            // onSubmitEditing={() => this.emailInput.focus()}
                            // ref={input => (this.lastNameInput = input)}
                              ref={this.textInputRef}
                            cursorColor={styles.whiteColor}
                            placeholder={'Enter last name or sure name'}
                            value={values.lastName}
                            errorText={errors.lastName}
                            onChangeText={text =>
                              setFieldValue('lastName', text)
                            }
                            onFocus={() => setFieldTouched('lastName')}
                            onBlur={() => handleBlur('lastName')}
                            outlineColor={theme.color.dimWhite}
                            placeholderTextColor={theme.color.dimWhite}
                            labelStyle={{
                              color: styles.whiteColor,
                            }}
                            activeOutlineColor={styles.whiteColor}
                          />
                          <InputBox
                            mandatory
                            label={'Email'}
                            cursorColor={styles.whiteColor}
                            ref={input => (this.emailInput = input)}
                            returnKeyType={'done'}
                            placeholder={'Enter email'}
                            keyboardType={'email-address'}
                            value={values.email}
                            autoCapitalize={'none'}
                            errorText={errors.email}
                            onChangeText={text => setFieldValue('email', text)}
                            onFocus={() => setFieldTouched('email')}
                            onBlur={() => handleBlur('email')}
                            outlineColor={theme.color.dimWhite}
                            placeholderTextColor={theme.color.dimWhite}
                            labelStyle={{
                              color: 'white',
                            }}
                            activeOutlineColor={'white'}
                          />
                          <InputBox
                            mandatory
                            label={'Mobile number'}
                            cursorColor={styles.whiteColor}
                            placeholder={'Enter mobile number'}
                            keyboardType={'numeric'}
                            value={values.mobile}
                            autoCapitalize={'none'}
                            maxLength={10}
                            errorText={errors.mobile}
                            onChangeText={text => setFieldValue('mobile', text)}
                            onFocus={() => setFieldTouched('mobile')}
                            onBlur={() => handleBlur('mobile')}
                            outlineColor={theme.color.dimWhite}
                            placeholderTextColor={theme.color.dimWhite}
                            labelStyle={{
                              color: 'white',
                            }}
                            activeOutlineColor={'white'}
                          />
                          <InputBox
                            mandatory
                            secureTextEntry={false}
                            label={'Password'}
                              onPress={showPassword => {
                        this.setState({
                          showPassword: !this.state.showPassword,
                        });
                      }}
                      showEye={true}
                            cursorColor={styles.whiteColor}
                            placeholder={'Enter password'}
                            value={values.password}
                            autoCapitalize={'none'}
                            errorText={errors.password}
                            onChangeText={text =>
                              setFieldValue('password', text)
                            }
                            onFocus={() => setFieldTouched('password')}
                            onBlur={() => handleBlur('password')}
                            outlineColor={theme.color.dimWhite}
                            placeholderTextColor={theme.color.dimWhite}
                            labelStyle={{
                              color: 'white',
                            }}
                            activeOutlineColor={'white'}
                          />
                        </>
                      )}
                      {selectedIndex == 1 && (
                        <>
                          <DropdownComp
                            mandatory
                            dropdownData={[
                              {
                                label: 'Male',
                                value: 'Male',
                              },
                              {
                                label: 'Female',
                                value: 'Female',
                              },
                            ]}
                            lableName={'Gender'}
                            dropDownPlaceholder={'Select your gender'}
                            vlaue={''}
                            style={{
                              borderColor: theme.color.dimWhite,
                            }}
                            lableColor={'white'}
                            backgroundColor={'none'}
                            itemContainerStyle={{
                              backgroundColor: 'none',
                            }}
                            containerStyle={{
                              backgroundColor: 'white',
                            }}
                            selectedTextStyle={{
                              color: 'white',
                            }}
                            itemStyles={{
                              color: 'black',
                            }}
                            onChange={item => {
                              // setPrayerCate(item.vlaue);
                            }}
                          />
                          <InputBox
                            mandatory
                            datePciker
                            editable={false}
                            outlineColor={theme.color.dimWhite}
                            label={'Date of birth'}
                            placeholder={'Select DOB'}
                            value={values.DOB == null ? '' : values.DOB}
                            errorText={touched.DOB && errors.DOB}
                            onChangeText={text => {
                              setFieldValue('DOB', text);
                            }}
                            onFocus={() => setFieldTouched('DOB')}
                            onBlur={() => handleBlur('DOB')}
                            style={{backgroundColor: '#FFFFFF'}}
                            placeholderTextColor={theme.color.dimWhite}
                            labelStyle={{
                              fontSize: getFontSize(12),
                              fontWeight: '600',
                              fontFamily: theme.font.HelveticaBold,
                              color: 'white',
                            }}
                            rightIcon={
                              <VectorIcon
                                type={'Feather'}
                                name={'calendar'}
                                size={getFontSize(20)}
                                style={{
                                  alignItem: 'center',
                                  color: 'white',
                                }}
                              />
                            }
                          />
                          <DropdownComp
                            mandatory
                            dropdownData={[
                              {
                                label: 'Hindi',
                                value: 'Hindi',
                              },
                              {
                                label: 'English',
                                value: 'English',
                              },
                              {
                                label: 'Marathi',
                                value: 'Marathi',
                              },
                            ]}
                            lableName={
                              'Which language would you like to receive daily verbs in?'
                            }
                            dropDownPlaceholder={'Select one language'}
                            vlaue={''}
                            lableColor={'white'}
                            backgroundColor={'none'}
                            itemContainerStyle={{
                              backgroundColor: 'none',
                            }}
                            containerStyle={{
                              backgroundColor: 'white',
                            }}
                            style={{
                              borderColor: '#f2f2f2',
                            }}
                            selectedTextStyle={{
                              color: 'white',
                            }}
                            itemStyles={{
                              color: 'black',
                            }}
                            onChange={item => {
                              // setPrayerCate(item.vlaue);
                            }}
                            dropdownPosition={'top'}
                          />
                        </>
                      )}
                    </View>
                  </View>
            
                </ScrollView>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: '5%',
                  }}>
                  <HyperTxt
                    text={'Already have an account?'}
                    hyperText={'Login'}
                    onPress={() => {
                      this.props.navigation.navigate('Login');
                    }}
                    style={
                      {
                        // width: '90%',
                        // textAlign: 'center',
                        // alignSelf: 'center',
                        // marginTop: getResHeight(20),
                      }
                    }
                  />
                  <CommonButton
                    title={selectedIndex == 0 ? 'Next' : 'Register'}
                    // disabled={!(dirty && isValid)}
                    onPress={async () => {
                      if(selectedIndex ==1){

                      }else{

                        this.setState({selectedIndex: selectedIndex + 1});
                      }
                    }}
                    isLoading={this.state.isLoading}
                    containerStyle={{
                      marginTop: getResHeight(25),
                    }}
                  />
                </View>
              </>
            )}
          </Formik>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  whiteColor: 'white',
});
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
