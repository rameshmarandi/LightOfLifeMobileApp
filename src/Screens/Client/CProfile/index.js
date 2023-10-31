import React, {Component} from 'react';
import {
  Text,
  View,
  Switch,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import theme from '../../../utility/theme';
import {
  backgroundColorHandler,
  bgInDarkMode,
  cursorColorInDarkMode,
  getAsyncValue,
  inAcitveTextInput,
  placeHolderInDarkMode,
  setAsyncValue,
  textColorHandler,
  textInDarkMode,
} from '../../../components/commonHelper';

import {connect} from 'react-redux';
import {store} from '../../../utility/store';
import {isDarkMode} from '../../../features/auth';
import {backgroundColor} from '../../../config/constants';
import CustomHeader from '../../../components/CustomHeader';
import {
  SCREENWIDTH,
  SCREENHEIGHT,
  getFontSize,
  hp,
  wp,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import {Formik} from 'formik';
import {Button} from 'react-native-elements';
import {VectorIcon} from '../../../components/VectorIcon';
import InputBox from '../../../components/InputBox';
import {CommonButton, DropdownComp} from '../../../components/commonComp';
class CProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }
  async componentDidMount() {}
  handleDarkMode = async () => {
    const res = await getAsyncValue('darkMode');
    if (typeof res == 'string' && res == 'false') {
      await setAsyncValue('darkMode', true);
      store.dispatch(isDarkMode(true));
    } else {
      await setAsyncValue('darkMode', false);
      store.dispatch(isDarkMode(false));
    }
  };
  render() {
    const {isDarkMode, navigation} = this.props;
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
                this.props.navigation.goBack();
              }}
              screenTitle={'My Profile'}
            />
          </View>

          <View>
            <FlatList
              data={[0, 1, 2, 3, 4]}
              renderItem={({item, index}) => {
                switch (index) {
                  case 0:
                    return (
                      <>
                        <CoverPictureComp />
                        <TouchableWithoutFeedback style={{}}>
                          <View
                            style={{
                              height: 140,
                              width: 140,
                              backgroundColor: theme.color.iceWhite,
                              borderRadius: 100,
                              marginTop: '-20%',
                              marginLeft: '4%',
                              borderColor: theme.color.error,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                position: 'absolute',
                              }}>
                              <VectorIcon
                                type={'FontAwesome'}
                                name={'user-circle-o'}
                                size={getFontSize(110)}
                                color={theme.color.primary}
                              />
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </>
                    );
                  case 1:
                    return (
                      <>
                        <Formik
                          validationSchema={theme.validationSchema.login}
                          initialValues={{
                            firstName: '',
                            lastName: '',

                            email: '',
                            mobile: '',
                            password: '',
                            DOB: '',
                            gender: '',
                            dailyVerbs: '',
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
                                  paddingBottom: '70%',
                                }}>
                                <View style={{}}>
                                  <View
                                    style={{
                                      width: '95%',
                                      alignSelf: 'center',
                                    }}>
                                    <InputBox
                                      label={'First name'}
                                      mandatory
                                      returnKeyType={'next'}
                                      cursorColor={cursorColorInDarkMode()}
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
                                      onFocus={() =>
                                        setFieldTouched('firstName')
                                      }
                                      onBlur={() => handleBlur('firstName')}
                                      outlineColor={inAcitveTextInput()}
                                      placeholderTextColor={placeHolderInDarkMode()}
                                      labelStyle={{
                                        color: bgInDarkMode(),
                                      }}
                                      // activeOutlineColor={bgInDarkMode()}
                                    />
                                    <InputBox
                                      label={'Last name'}
                                      mandatory
                                      returnKeyType={'next'}
                                      // onSubmitEditing={() => this.emailInput.focus()}
                                      // ref={input => (this.lastNameInput = input)}
                                      ref={this.textInputRef}
                                      cursorColor={cursorColorInDarkMode()}
                                      placeholder={
                                        'Enter last name or sure name'
                                      }
                                      value={values.lastName}
                                      errorText={errors.lastName}
                                      onChangeText={text =>
                                        setFieldValue('lastName', text)
                                      }
                                      onFocus={() =>
                                        setFieldTouched('lastName')
                                      }
                                      onBlur={() => handleBlur('lastName')}
                                       outlineColor={inAcitveTextInput()}
                                      placeholderTextColor={placeHolderInDarkMode()}
                                      labelStyle={{
                                        color: bgInDarkMode(),
                                      }}
                                      activeOutlineColor={bgInDarkMode()}
                                    />
                                    <InputBox
                                      mandatory
                                      label={'Email'}
                                      cursorColor={cursorColorInDarkMode()}
                                      ref={input => (this.emailInput = input)}
                                      returnKeyType={'done'}
                                      placeholder={'Enter email'}
                                      keyboardType={'email-address'}
                                      value={values.email}
                                      autoCapitalize={'none'}
                                      errorText={errors.email}
                                      onChangeText={text =>
                                        setFieldValue('email', text)
                                      }
                                      onFocus={() => setFieldTouched('email')}
                                      onBlur={() => handleBlur('email')}
                                     outlineColor={inAcitveTextInput()}
                                      placeholderTextColor={placeHolderInDarkMode()}
                                      labelStyle={{
                                        color: bgInDarkMode(),
                                      }}
                                    activeOutlineColor={bgInDarkMode()}
                                    />
                                    <InputBox
                                      mandatory
                                      label={'Mobile number'}
                                      cursorColor={cursorColorInDarkMode()}
                                      placeholder={'Enter mobile number'}
                                      keyboardType={'numeric'}
                                      value={values.mobile}
                                      autoCapitalize={'none'}
                                      maxLength={10}
                                      errorText={errors.mobile}
                                      onChangeText={text =>
                                        setFieldValue('mobile', text)
                                      }
                                      onFocus={() => setFieldTouched('mobile')}
                                      onBlur={() => handleBlur('mobile')}
                                      outlineColor={inAcitveTextInput()}
                                      
                                      labelStyle={{
                                        color: bgInDarkMode(),
                                      }}
                                      placeholderTextColor={placeHolderInDarkMode()}
                                    activeOutlineColor={bgInDarkMode()}
                                    />

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
                                        borderColor: inAcitveTextInput(),
                                      }}
                                      lableColor={bgInDarkMode()}
                                      backgroundColor={'none'}
                                      itemContainerStyle={{
                                        backgroundColor: 'none',
                                      }}
                                      containerStyle={{
                                        backgroundColor:'white',
                                      }}
                                      selectedTextStyle={{
                                        color: bgInDarkMode(),
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
                                      outlineColor={inAcitveTextInput()}
                                      label={'Date of birth'}
                                      placeholder={'Select DOB'}
                                      value={
                                        values.DOB == null ? '' : values.DOB
                                      }
                                      errorText={touched.DOB && errors.DOB}
                                      onChangeText={text => {
                                        setFieldValue('DOB', text);
                                      }}
                                      onFocus={() => setFieldTouched('DOB')}
                                      onBlur={() => handleBlur('DOB')}
                                      style={{backgroundColor: '#FFFFFF'}}
                                      placeholderTextColor={
                                      placeHolderInDarkMode()
                                      }
                                      labelStyle={{
                                        fontSize: getFontSize(12),
                                        fontWeight: '600',
                                        fontFamily: theme.font.HelveticaBold,
                                        color: bgInDarkMode(),
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
                                      dropDownPlaceholder={
                                        'Select one language'
                                      }
                                      vlaue={''}
                                      lableColor={bgInDarkMode()}
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
                                        color: textInDarkMode(),
                                      }}
                                      itemStyles={{
                                        color: textInDarkMode(),
                                      }}
                                      onChange={item => {
                                        // setPrayerCate(item.vlaue);
                                      }}
                                      dropdownPosition={'top'}
                                    />
                                  </View>
                                </View>
                              </ScrollView>
                            </>
                          )}
                        </Formik>
                      </>
                    );
                }
              }}
            />
            <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                paddingVertical: '15%',
                backgroundColor: backgroundColorHandler(),
              }}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  position: 'absolute',
                  marginTop: '-6%',
                }}>
                <CommonButton
                  title={'Update'}
                  // disabled={!(dirty && isValid)}
                  onPress={async () => {}}
                  isLoading={this.state.isLoading}
                  containerStyle={{
                    marginTop: getResHeight(25),
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const CoverPictureComp = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
        }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1535440216424-0e374e613ee5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGJpYmxlJTIwbW90aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
          }}
          style={{
            width: '100%',
            height: hp('24%'),
          }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '2.5%',
          }}>
          <Button
            type={'clear'}
            onPress={() => {}}
            iconPosition="right"
            icon={
              <VectorIcon
                type={'FontAwesome5'}
                name={'edit'}
                size={getFontSize(15)}
                color={theme.color.primary}
                style={{
                  marginLeft: '10%',
                }}
              />
            }
            iconContainerStyle={{}}
            containerStyle={[
              {
                width: getResWidth(35),
                height: getResHeight(40),
                justifyContent: 'center',
                // alignSelf:"center",
                // alignItems:"center",
                backgroundColor: 'white',
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
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  whiteColor: 'white',
});
const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CProfile);
