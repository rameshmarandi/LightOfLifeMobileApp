import React, {Component, useEffect} from 'react';
import {Animated, StatusBar, Image, Text, LogBox, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {Provider as MenuProvider} from 'react-native-paper';

import {store, persistor} from './src/utility/store';
import theme from './src/utility/theme';
import {isLoggdIn} from './src/components/commonFunction';
import RootNavigation from './src/navigation';
import {getFontSize, getResHeight} from './src/utility/responsive';
import {
  CheckDarkMode,
  getAsyncValue,
  setAsyncValue,
} from './src/components/commonHelper';
import {isDarkMode} from './src/features/auth';
import {scheduleNotification} from './src/components/pushNotificaiton';
import AnimatedLoader from 'react-native-animated-loader';
// import { firebase } from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs(true);
function AnimatedSlash() {
  return (
    <>
      <View
        style={{
          height: getResHeight(250),
          width: '100%',
          justifyContent:"center",
          alignItems:"center"
        }}>
        <AnimatedLoader
          visible={true}
          overlayColor={ isDarkMode ? theme.color.darkTheme : 'white'}
          source={theme.assets.WaveAnimation}
          animationStyle={{
            width: '100%',
            height: getResHeight(350),
            marginLeft:"-0.2%"
          }}
          speed={1}>
          <Image
          source={theme.assets.church_logo_origianl}
          resizeMode="center"
          style={{
            height: '50%',
            width: '50%',
            position: 'absolute',
          

          }}
        />
        </AnimatedLoader>
        
      </View>
    </>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoding: true,
      isLogedIn: null,
    };
  }

  async componentDidMount() {
    // Check Dark theme
    CheckDarkMode();
    scheduleNotification();
    setTimeout(async () => {
      let userSession = await isLoggdIn();
      this.setState({
        isLogedIn: userSession,
      });
    }, 1850);
  }
  render() {
    const {isLogedIn} = this.state;
    const {isDarkMode} = store.getState().auth;

    if (isLogedIn != null) {
      return (
        <Provider store={store}>

          <PersistGate persistor={persistor}>
            <MenuProvider>
              <NavigationContainer>
                <RootNavigation isLogedIn={this.state.isLogedIn} />
              </NavigationContainer>
            </MenuProvider>
          </PersistGate>
        </Provider>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? theme.color.darkTheme : 'white',
        }}>
        <AnimatedSlash />
      </View>
    );
  }
}
