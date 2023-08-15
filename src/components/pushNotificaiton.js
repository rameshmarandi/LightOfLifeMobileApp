// import messaging from "@react-native-firebase/messaging";
// import { Alert, Linking } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';


export const scheduleNotification = async () => {
  // Schedule the notification for a specific date and time (in UTC)
  const targetTimestamp = new Date('2023-08-6T23:15:00Z').getTime();

  const notification = {
    notification: {
      title: 'Scheduled Notification',
      body: 'This is a scheduled notification',
    },
    android: {
      channelId: 'scheduled',
    },
    apns: {
      headers: {
        'apns-priority': '5',
      },
    },
    data: {
      // Additional data you want to include with the notification
      key: 'value',
    },
  };

  // Schedule the notification with FCM
  const response = await messaging().scheduleMessage({
    messageId: `${targetTimestamp}`,
    data: notification,
    schedule: {
      timestamp: targetTimestamp,
    },
  });

  console.log('Scheduled notification response:', response);
};


// export async function requestUserPermission() {
//   const session = await getFBSession();
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//   if (enabled) {
//     return getFCMToken();
//   } else {
//     AsyncStorage.removeItem("@FCMTOKEN");
//     if (session) {
//       const openSetting = () => {
//         Linking.openSettings().catch(() => {
//           Alert.alert("Unable to open settings");
//         });
//       };
//       Alert.alert(
//         "Light Of Life",
//         "Turn on Notification Services to allow Light Of Life.",
//         [
//           { text: "Go to Settings", onPress: openSetting },
//           {
//             text: "Don't allow Notification",
//             onPress: () => {},
//           },
//         ]
//       );
//     } else {
//       setFBSession(true);
//     }
//   }
//   return "";
// }

// async function getFCMToken() {
//   try {
//     const FCMToken = await messaging().getToken();

//     console.tron.log("get firebase tokmen", FCMToken);
//     // await setFCMToken(FCMToken);
//     return FCMToken;
//   } catch (erro) {
//     //.log("FCM Token error", erro?.message);
//     return null;
//   }
// }
// const setFCMToken = (value) => {
//   AsyncStorage.setItem("@FCMTOKEN", value);
// };

// export const getAsyncFCMToken = async () => {
//   try {
//     const value = await AsyncStorage.getItem("@FCMTOKEN");
//     return value;
//   } catch {
//     return "";
//   }
// };

// const setFBSession = (value) => {
//   AsyncStorage.setItem("fbsession", value ? "1" : "0");
// };

// const getFBSession = async () => {
//   const value = await AsyncStorage.getItem("fbsession");
//   if (typeof value == "string") {
//     return value == "1" ? true : false;
//   }
//   return null;
// };



// import { firebase } from '@react-native-firebase/app';

// class FCMService {

//   // we use this method to register notification service in our app.
//   // we call this method in componetDidMount() so, we app load we get permission to 
//   // display notification.
//   register = (onRegister,onNotification, onOpenNotification) =>{
//     this.checkPermission(onRegister)
//     // when register function call that time we create notification listener 
//     this.createNoitificationListeners(onRegister, onNotification, onOpenNotification)
//   }

//   checkPermission = (onRegister) => {
//     firebase.messaging().hasPermission()
//       .then(enabled => {
//         if (enabled) {
//           //user has permission
//           this.getToken(onRegister)
//         } else {
//           //user don't have permission
//           this.requestPermission(onRegister)
//         }
//       }).catch(error => {
//         console.log("Permission rejected", error)
//       })
//   }

//   getToken = (onRegister) => {
//     firebase.messaging().getToken()
//       .then(fcmToken => {
//         if (fcmToken) {
//           onRegister(fcmToken)
//         } else {
//           console.log("User does not have a device token")
//         }
//       }).catch(error => {
//         console.log("getToken rejected ", error)
//       })
//   }

//   requestPermission = (onRegister) => {
//     firebase.messaging().requestPermission()
//       .then(() => {
//         this.getToken(onRegister)
//       }).catch(error => {
//         console.log("Requested persmission rejected ", error)
//       })
//   }

//   deletedToken = () => {
//     firebase.messaging().deleteToken()
//       .catch(error => {
//         console.log("Delected token error ", error)
//       })
//   }

//   createNoitificationListeners = (onRegister, onNotification, onOpenNotification) => {
    
//     // This listener triggered when notification has been received in foreground
//     this.notificationListener = firebase.notifications().onNotification((notification) => {
//       onNotification(notification)
//     })

//     // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
//     this.notificationOpenedListener = firebase.notifications()
//       .onNotificationOpened((notificationOpen) => {
//         console.log(notificationOpen)
//         if (notificationOpen) {
//           const notification = notificationOpen.notification
//           onOpenNotification(notification)
//           this.removeDelieveredNotification(notification)
//         }
//       })

//     // This listener triggered when app is closed and we click,tapped and opened notification 
//     firebase.notifications().getInitialNotification()
//       .then(notificationOpen => {
//         if (notificationOpen) {
//           const notification = notificationOpen.notification
//           onOpenNotification(notification)
//           this.removeDelieveredNotification(notification)
//         }
//       })

//     // Triggered for data only payload  in foreground 
//     this.messageListener = firebase.messaging().onMessage((message) => {
//       onNotification(message)
//     })

//     // This listener triggered when new token 
//     this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
//       console.log("FCM new token: ", fcmToken)
//       onRegister(fcmToken)
//     })
//   }

//   buildChannel = (obj) => {
//     return new firebase.notifications.Android.Channel(
//       obj.channelId, obj.channelName,
//       firebase.notifications.Android.Importance.High)
//       .setDescription(obj.channelDes)
//   }

//   buildNotification = (obj) => {
//     console.log(obj)
//     firebase.notifications().android.createChannel(obj.channel)

//     const notification = new firebase.notifications.Notification()
//       .setSound(obj.sound)
//       .setNotificationId(obj.dataId)
//       .setTitle(obj.title)
//       .setBody(obj.content)
//       .setData(obj.data)
//       .android.setChannelId(obj.channel.channelId)
//       .android.setLargeIcon(obj.largeIcon)
//       .android.setSmallIcon(obj.smallIcon)
//       .android.setColor(obj.colorBgIcon)
//       .android.setPriority(firebase.notifications.Android.Priority.High)
//       .android.setVibrate(obj.vibrate)
//       .android.setAutoCancel(true)

//     return notification
//   }

//   scheduleNotification = (notification, datetime) => {
//     const date = new Date(datetime)
//     firebase.notifications()
//       .scheduleNotification(notification, { fireDate: date.getTime() })
//   }

//   displayNotification = (notification) => {
//     firebase.notifications().displayNotification(notification)
//       .catch(error => { console.log("Display Notification error", error) })
//   }

//   removeDelieveredNotification = (notification) => {
//     firebase.notifications()
//       .removeDeliveredNotification(notification.notificationId)
//   }
// }
// export const fcmService = new FCMService()