import React, {Component} from 'react';
import {Text, View, Switch, Image, FlatList, SafeAreaView} from 'react-native';
import theme from '../../../utility/theme';
import {
  backgroundColorHandler,
  getAsyncValue,
  setAsyncValue,
  textColorHandler,
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
import {Button} from 'react-native-elements';
import {VectorIcon} from '../../../components/VectorIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                        <View style={{}}>
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
                            <VectorIcon
                              type={'FontAwesome'}
                              name={'user-circle-o'}
                              size={getFontSize(110)}
                              color={theme.color.primary}
                            />
                            
                              <TouchableOpacity style={{
                            position:"absolute",
                            zIndex:99999
                            // 
                            // bottom : 
                          }}>

                              <VectorIcon
                              type={'Ionicons'}
                              name={'camera'}
                              size={getFontSize(30)}
                              color = {"red"}
                              // color={theme.color.primary}
                            />
                          </TouchableOpacity>
                          </View>
                        
                        </View>
                      </>
                    );
                }
              }}
            />
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
                size={getFontSize(18)}
                color={theme.color.primary}
                style={{
                  marginLeft: '10%',
                }}
              />
            }
            iconContainerStyle={{}}
            containerStyle={[
              {
                width: getResWidth(41),
                height: getResHeight(48),
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

const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CProfile);
