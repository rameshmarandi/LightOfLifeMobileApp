import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {store} from '../../../utility/store';
import {tabActive} from '../../../features/auth';
import {
  SCREENHEIGHT,
  SCREENWIDTH,
  getResHeight,
  getResWidth,
  getFontSize,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import InputBox from '../../../components/InputBox';
import ToggleSwitch from 'toggle-switch-react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import {CommonButton} from '../../../components/commonComp';
// import NavigationBar from '../../../navigation/navHeader';
import {Image} from 'react-native-elements/dist/image/Image';
import {VectorIcon} from '../../../components/VectorIcon';
import {StyleSheet} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import { AddProductAPI, GetProductAPI } from '../../../apis/productRepo';
import { connect } from 'react-redux';
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      inStock: true,
      imageArray: [],
      isLoading :false
    };
    // this.props.navigation.setOptions(
    //   NavigationBar({
    //       title: 'My Insights',
    //       navigation: props.navigation,
    //     notificationProps: {onPress: () => {
    //       this.props.navigation.navigate("Notification")
    //     }},
    //   }),)
  }

  openGallery = async () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      selectionLimit: 10,
    };

    let imageUriDetails = await launchImageLibrary(options, response => {
      if (response.didCancel) {
        //.log("User cancelled image picker");
      } else if (response.error) {
        //.log("ImagePicker Error", response.error);
      } else if (response.customButtom) {
        //.log("User tapped custom Button", response.customButtom);
      } else {
        let Imagedata = [...this.state.imageArray];
        response.assets.map((item, index) => {
          let imgObj = {
            uri: item.uri,
            type: item.type,
            name: item.fileName,
          };
          Imagedata.push(imgObj);
        });
        this.setState({imageArray: Imagedata});
      }
    });
  };
  removeImg = index => {
    const newArray = [...this.state.imageArray]; // Create a copy of the array
    newArray.splice(index, 1); // Remove the element at the specified index
    this.setState({imageArray: newArray}); // Update the state with the modified array

    LayoutAnimation.linear();
  };
  componentDidMount() {}
  render() {
    const authState = store.getState();

    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.props.onRequestClose}
        // deviceWidth={SCREENWIDTH}
        // deviceHeight={SCREENHEIGHT}
        animationInTiming={1000}
        animationOutTiming={500}
        style={{flex: 1, margin: 0}}
        coverScreen={true}
        backdropOpacity={0.8}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 10,
          }}>
          <Formik
            initialValues={{
            productName :"",
            productDescription:"",
            productPrice:"",
            productImages: '',
            inStock: this.state.inStock
            }}
            onSubmit={() => {}}>
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
                  style={{}}>
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      paddingTop: getResHeight(10),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '5%',
                      }}>
                      <Text
                        style={{
                          fontFamily: theme.font.medium,
                          color: theme.color.placeholder,
                          
                        }}>
                        Add Product
                      </Text>
                      {this.state.imageArray.length !== 0 && (
                        <>
                          <View
                            style={{
                              height: 37,
                              width: 37,
                              backgroundColor: '#1B1D43',
                              borderRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconButton
                              style={{}}
                              icon="plus"
                              iconColor={theme.color.accent}
                              size={getFontSize(25)}
                              onPress={() => this.openGallery()}
                            />
                          </View>
                        </>
                      )}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        borderStyle:"dashed",
                        borderColor: theme.color.primary,
                        borderRadius: 10,
                        minHeight: getResHeight(210),
                        alignItems:
                          this.state.imageArray.length !== 0
                            ? 'flex-start'
                            : 'center',
                        justifyContent:
                          this.state.imageArray.length !== 0
                            ? 'flex-start'
                            : 'center',
                      }}>
                      {this.state.imageArray.length == 0 && (
                        <>
                          <TouchableOpacity
                            onPress={() => this.openGallery()}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <VectorIcon
                              type={'MaterialIcons'}
                              name={'cloud-upload'}
                              size={getFontSize(45)}
                              color={theme.color.primary}
                            />
                            <Text
                              style={{
                                fontSize: getFontSize(12),
                                fontFamily: theme.font.bold,
                                color: theme.color.primary,
                              }}>
                              Click here to upload
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                      {this.state.imageArray.length !== 0 && (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              alignItems:
                                this.state.imageArray.length !== 0
                                  ? 'flex-start'
                                  : 'center',
                              justifyContent:
                                this.state.imageArray.length !== 0
                                  ? 'flex-start'
                                  : 'center',
                            }}>
                            {this.state.imageArray.length !== 0 &&
                              this.state.imageArray.map((item, index) => {
                                return (
                                  <>
                                    <View
                                      style={{
                                        margin: '2%',
                                      }}>
                                      <Image
                                        source={{
                                          uri: `${item.uri}`,
                                        }}
                                        style={{
                                          height: getResHeight(80),
                                          width: getResWidth(80),
                                          borderRadius: 5,
                                        }}
                                      />

                                      <TouchableOpacity
                                        onPress={() => {
                                          LayoutAnimation.linear();
                                          this.removeImg(index);
                                        }}
                                        style={{
                                          position: 'absolute',
                                          right: 0,
                                          top: 0,
                                        }}>
                                        <VectorIcon
                                          type={'Ionicons'}
                                          name={'md-close-circle'}
                                          size={getFontSize(25)}
                                          color={theme.color.primary}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </>
                                );
                              })}
                          </View>
                        </>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <InputBox
                        lable={'Product Name'}
                        placeholder={'Enter product name'}
                        value={values.productName}
                        errorText={errors.productName}
                        onChangeText={text =>
                          setFieldValue(
                            'productName',
                            text.replace(
                              /[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,
                              '',
                            ),
                          )
                        }
                        onFocus={() => setFieldTouched('productName')}
                        onBlur={() => handleBlur('productName')}
                      />
                    </View>
                      <View style={styles.inputContainer}>
                    <ToggleSwitch
                      isOn={this.state.inStock}
                      onColor={theme.color.primary}
                      offColor="red"
                      label="In stock"
                      labelStyle={{
                        fontSize: getFontSize(18),
                        color: theme.color.lableColor,
                        fontFamily: theme.font.semiBold,
                      }}
                      size="medium"
                      onToggle={isOn =>
                        this.setState({inStock: !this.state.inStock})
                      }
                    />
                    </View>
                    <View style={styles.inputContainer}>
                      <InputBox
                        lable={'Product Price'}
                        placeholder={'₹ Enter product price'}
                        value={values.productPrice}
                        errorText={errors.productPrice}
                        keyboardType={'numeric'}
                        onChangeText={text =>
                          setFieldValue(
                            'productPrice',
                            text.replace(
                              /[`~!#$%^&*()_|+\-=?;: A-Za-z'",<>\{\}\[\]\\\/]/gi,
                              '',
                            ),
                          )
                        }
                        onFocus={() => setFieldTouched('productPrice')}
                        onBlur={() => handleBlur('productPrice')}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <InputBox
                        multiline
                        lable={'Product Description'}
                        placeholder={'Enter product description'}
                        value={values.productDescription}
                        errorText={errors.productDescription}
                        onChangeText={text =>
                          setFieldValue('productDescription', text)
                        }
                        onFocus={() => setFieldTouched('productDescription}')}
                        onBlur={() => handleBlur('productDescription}')}
                      />
                    </View>
                  </View>
                </ScrollView>
                <View style={{}}>
                  <CommonButton
                    title="Add"
                    onPress={async() => {
                      this.setState({isLoading : true}, async()=>{
                        values.productImages = this.state.imageArray
                        const res = await this.props.AddProductAPI(values)
                        
                          await this.props.GetProductAPI()
                        if(res.payload ==200){
                          alert("Product added successfully");
                          this.props.onCloseModal()
                        }
                        this.setState({isLoading: false})
                      })
                    }}
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
      </Modal>
    );
  }
}
const mapStateToProps = (props, state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    AddProductAPI: payload => dispatch(AddProductAPI(payload)),
    GetProductAPI: payload => dispatch(GetProductAPI(payload)),
  };
};
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: '2.5%',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);


