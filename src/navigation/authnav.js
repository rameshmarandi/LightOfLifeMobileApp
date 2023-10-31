const {createNativeStackNavigator} = require('@react-navigation/native-stack');

import AllScreens from '../Screens';
const AuthStack = createNativeStackNavigator();

export default function AuthNavigation(props) {
  return (
    <>
      <AuthStack.Screen
        name="Login"
        initialRouteName={'Login'}
        component={AllScreens.Login}
        options={{
          animationEnabled: true,
        }}
      />
      <AuthStack.Screen
        name="Registration"
        component={AllScreens.Registration}
        options={{
          animationEnabled: true,
        }}
      />
      <AuthStack.Screen
        name="ChangePassword"
        component={AllScreens.ChangePassword}
        options={{
          animationEnabled: true,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={AllScreens.ForgotPassword}
        options={{
          animationEnabled: true,
        }}
      />
    </>
  );
}
