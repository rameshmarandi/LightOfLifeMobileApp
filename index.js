/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";
// Notification for background mode
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.tron.log('Message handled in the background!', remoteMessage);
});
// Notification for Skill mode / Quit mode
messaging().getInitialNotification(async remoteMessage => {
  console.tron.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);
