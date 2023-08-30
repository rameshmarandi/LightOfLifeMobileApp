const {
  createNativeStackNavigator,
  CardStyleInterpolators,
} = require('@react-navigation/native-stack');
const {HomePage, FreeResource ,Events} = require('../Screens');

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
        name="HomePage"
        initialRouteName={'HomePage'}
        component={HomePage}
        options={optinsForScreens()}
      />
      <MainStack.Screen
        name="FreeResource"
        component={FreeResource}
        options={optinsForScreens()}
      />
      <MainStack.Screen
        name="Events"
        component={Events}
        options={optinsForScreens()}
      />
    </>
  );
}
