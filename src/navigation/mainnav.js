const {
  createNativeStackNavigator,
  CardStyleInterpolators,
} = require('@react-navigation/native-stack');
import AllScreens from "../Screens"
import AuthNavigation from './authnav';
const MainStack = createNativeStackNavigator();

const forFade = ({current, next}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: {opacity},
    rightButtonStyle: {opacity},
    titleStyle: {opacity},
    backgroundStyle: {opacity},
  };
};

const optinsForScreens = () => {
  return {
    headerStyleInterpolator: forFade,
    headerShown: false,
    animationEnabled: true,
  };
};
export default function MainNavigation(props) {
  return (
    <>
      <MainStack.Screen
        name={`HomePage`}
        initialRouteName={AllScreens.HomePage}
        component={AllScreens.HomePage}
        options={optinsForScreens()}
      />

      {/* Admin sections  Start*/}
      <MainStack.Screen
        name={`SpecialMoment`}
        component={AllScreens.SpecialMoment}
        options={optinsForScreens()}
      />

      {/* Admin sections  End*/}

      <MainStack.Screen
        name={`CProfile`}
        component={AllScreens.CProfile}
        options={optinsForScreens()}
      />
      <MainStack.Screen
        name={`FreeResource`}
        component={AllScreens.FreeResource}
        options={optinsForScreens()}
      />
      
      <MainStack.Screen
        name={`Events`}
        component={AllScreens.Events}
        options={optinsForScreens()}
      />
      <MainStack.Screen
        name={`ContactWithUs`}
        component={AllScreens.ContactWithUs}
        options={optinsForScreens()}
      />
      <MainStack.Screen
        name={`Feedback`}
        component={AllScreens.Feedback}
        options={optinsForScreens()}
      />
      {/* //Auth Stacs */}
      <MainStack.Screen
        name={`Login`}
        component={AllScreens.Login}
        options={optinsForScreens()}
      />
      <MainStack.Screen
        name={`Registration`}
        component={AllScreens.Registration}
        options={optinsForScreens()}
      />
    </>
  );
}
