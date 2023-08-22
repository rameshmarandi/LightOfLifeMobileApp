const {createNativeStackNavigator , CardStyleInterpolators } = require('@react-navigation/native-stack');
const {
  HomePage,
  FreeResource
} = require('../Screens');

const AuthStack = createNativeStackNavigator();
// const forFade = ({ current }) => ({
//   cardStyle: {
//     opacity: current.progress,
//   },
// });
// const config = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// };

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};
export default function MainNavigation(props) {
  return (
    <>
      <AuthStack.Screen
        name="HomePage"
        initialRouteName={'HomePage'}
        component={HomePage}
        // options={{  }}
        options={{
    //        transitionSpec: {
    //   open: config,
    //   close: config,
    // },
     headerStyleInterpolator: forFade,
          // cardStyleInterpolator: forFade,
         headerShown: false,
          animationEnabled: true,
        }}
      />
      <AuthStack.Screen
        name="FreeResource"
        component={FreeResource}
        options={{
    //        transitionSpec: {
    //   open: config,
    //   close: config,
    // },
     headerStyleInterpolator: forFade,
              // cardStyleInterpolator: forFade,
        headerShown: false,
          animationEnabled: true,
        }}
      />
    
    </>
  );
}
