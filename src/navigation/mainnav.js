// const {createNativeStackNavigator} = require('@react-navigation/native-stack');

// import tabbar from './tabbar';
// // import {} from '../Screens';

// const MainStack = createNativeStackNavigator();

// export default function MainNavigation(props) {
//   return (
//     <>
//       <MainStack.Screen
//         name="TabNav"
//         component={tabbar}
//         options={{headerShown: false}}
//       />
//     </>
//   );
// }


const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {
  Login,
  Registration,
  ChangePassword,
  ForgotPassword,
  HomePage,
} = require('../Screens');

const AuthStack = createNativeStackNavigator();

export default function MainNavigation(props) {
  return (
    <>
      <AuthStack.Screen
        name="HomePage"
        initialRouteName={'HomePage'}
        component={HomePage}
        options={{
        headerShown: false,
          animationEnabled: true,
        }}
      />
    
    </>
  );
}
