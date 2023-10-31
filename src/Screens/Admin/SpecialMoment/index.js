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
import FileUploader from '../../../components/FileUploader';
class SpecialMoment extends Component {
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
              screenTitle={'Add / Edit Sepcial Moments'}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <FlatList
              data={[0, 1, 2, 3, 4]}
              renderItem={({item, index}) => {
                switch (index) {
                  case 0:
                    return (
                      <>
                        <Formik
                          validationSchema={theme.validationSchema.login}
                          initialValues={{}}
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
                                  marginTop: '5%',
                                  paddingHorizontal: '5%',
                                }}>
                                <Text style={styles.lableStyle}>
                                  Select your banner{' '}
                                  <Text
                                    style={{
                                      color: 'red',
                                    }}>
                                    *
                                  </Text>
                                </Text>
                                <FileUploader
                                  fileType={'img'} // Image / PDF / Video
                                  selectedFile={() => {}}
                                />

                                <InputBox
                                  mandatory
                                  datePciker
                                  editable={false}
                                  outlineColor={inAcitveTextInput()}
                                  label={'Date to publish'}
                                  placeholder={'Select date'}
                                  value={values.DOB == null ? '' : values.DOB}
                                  errorText={touched.DOB && errors.DOB}
                                  onChangeText={text => {
                                    setFieldValue('DOB', text);
                                  }}
                                  onFocus={() => setFieldTouched('DOB')}
                                  onBlur={() => handleBlur('DOB')}
                                  style={{backgroundColor: '#FFFFFF'}}
                                  placeholderTextColor={placeHolderInDarkMode()}
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
                              </View>
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
                paddingVertical: '10%',
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
  lableStyle: {
    fontSize: getFontSize(13),
    fontFamily: theme.font.medium,
    color: textColorHandler(),
    marginBottom: '2.5%',
    // marginTop: '5%',
  },
});
const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialMoment);
