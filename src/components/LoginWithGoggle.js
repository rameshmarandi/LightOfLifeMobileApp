import React, {Component, useState} from 'react'
import {
  Text,
  SafeAreaView,

  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {Image} from 'react-native';
import {connect} from 'react-redux'
// import {GoogleSignin} from '@react-native-google-signin/google-signin'
// import {webClientId} from '../config/constants'

import {
    getFontSize,
    getResHeight,
    getResWidth,
    SCREENHEIGHT,
    SCREENWIDTH
  } from '../utility/responsive'
import theme from '../utility/theme'
import { assets } from '../../react-native.config'

class LoginWithGoogle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPassword: false,
      loader: false,
      isModalVisible: false,
      alertMsg: '',
    }
  }
  signIn = async () => {}
//   componentDidMount () {
//     GoogleSignin.configure({
//       webClientId: webClientId,
//     })
//   }
  render () {
    const {title, onPress} = this.props
    return (
      <SafeAreaView
        style={{
                }}> 
         <View
        style={{
          width: '100%',
          marginTop: '7%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#0000001F',
            width: '75%',
            height: getResHeight(0.8),
            position: 'absolute',
          }}
        />
        <Text
          style={{        
            backgroundColor: 'white',
            fontSize: getFontSize(13),
            fontFamily: theme.font.semiBold,
          }}>
          {' '}
          Or
        </Text>
      </View>      
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: '8%',
          }}>
          <TouchableWithoutFeedback onPress={onPress}>
            <View
              style={{
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#2F3B75',
                borderRadius: 5,
              }}>
              <View
                style={{
                  height: getResHeight(40),
                  width: getResWidth(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 5,
                }}>
                <Image
              source={theme.assets.googleicon}
              resizeMode={'contain'}
              style={{
                height: getResHeight(30),
                width: getResWidth(20)
              }}
            />
              </View>
              <View
                style={{
                  height: getResHeight(40),
                  backgroundColor: '#2F3B75',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: '5%',
                  borderRightRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: getFontSize(11.5),                  
                    color: '#FFFFFF',
                    fontFamily: theme.font.semiBold,
                    fontWeight:"700",
                    // textTransform: 'uppercase'
                  }}>
                  {title}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithGoogle)