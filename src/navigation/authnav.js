const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {
  Login,
  Registration,
  ChangePassword,
  ForgotPassword,
} = require('../Screens');

const AuthStack = createNativeStackNavigator();

export default function AuthNavigation(props) {
  return (
    <>
      <AuthStack.Screen
        name="Login"
        initialRouteName={'Login'}
        component={Login}
        options={{
          animationEnabled: true,
        }}
      />
      <AuthStack.Screen
        name="Registration"
        component={Registration}
        options={{
          animationEnabled: true,
        }}
      />
            <AuthStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          animationEnabled: true,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          animationEnabled: true,
        }}
      />
    </>
  );
}
