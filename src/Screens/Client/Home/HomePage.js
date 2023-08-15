import React, {Component, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Animated,
  useWindowDimensions,
  FlatList,
  Switch,
} from 'react-native';
import theme from '../../../utility/theme';
import {
  backgroundColorHandler,
  getAsyncValue,
  setAsyncValue,
  textColorHandler,
} from '../../../components/commonHelper';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {store} from '../../../utility/store';
import {isDarkMode} from '../../../features/auth';
import {backgroundColor} from '../../../config/constants';
import * as PN from '../../../components/pushNotificaiton';
import {sendOTPViaEmail} from '../../../apis/authRepo';
import CustomHeader from '../../../components/CustomHeader';
import SectionHeader from '../../../components/SectionHeader';
import MsgConfig from '../../../config/MsgConfig';
import {TabView, SceneMap} from 'react-native-tab-view';
import {SCREENWIDTH, getResHeight} from '../../../utility/responsive';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }
  async componentDidMount() {
    const FCMToken = await messaging().getToken();
    console.tron.log('Firebase token', FCMToken);
    // Show the message inside the app
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
    // await PN.getAsyncFCMToken()
    // const PNToken = await PN.getAsyncFCMToken();
  }
  handleDarkMode = async () => {
    const res = await getAsyncValue('darkMode');
    if (typeof res == 'string' && res == 'false') {
      await setAsyncValue('darkMode', true);
      store.dispatch(isDarkMode(true));
    } else {
      await setAsyncValue('darkMode', false);
      store.dispatch(isDarkMode(false));
    }
  };
  render() {
    const {isDarkMode, navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: backgroundColorHandler(),
        }}>
        <View>
          <CustomHeader
            Hamburger={() => {
              navigation.openDrawer();
            }}
            centerLogo={true}
          />
        </View>

        <View
          style={
            {
              // paddingHorizontal: '5%',
            }
          }>
          <FlatList
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({item, index}) => {
              switch (index) {
                case 0:
                  return (
                    <>
                      <SectionHeader
                        sectionTitle={`${MsgConfig.firstHeaderText}`}
                      />
                      <DailyVerbs />
                    </>
                  )
              }
            }}
          />
        </View>
        <View
          style={{
            marginTop: '15%',
            paddingHorizontal: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: '5%',
            }}>
            <Text
              style={{
                fontFamily: theme.font.semiBold,
                color: textColorHandler(),
                marginRight: '4%',
              }}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{false: '#F9EDEA', true: theme.color.primary}}
              thumbColor={theme.color.primary}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.handleDarkMode}
              value={isDarkMode}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.7; // Adjust as needed

const languageArray = [
  { key: 'hindi', tabTitle: 'Hindi', bg: 'blue' },
  { key: 'english', tabTitle: 'English', bg: 'green' },
  { key: 'marathi', tabTitle: 'Marathi', bg: 'red' },
];

const TabBar = ({ tabs, activeIndex, onPress }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onPress(index)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomWidth:  activeIndex === index ? 2 : 0,
            borderBottomColor: 'red',
          }}
        >
          <Text>{tab.tabTitle}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


// const DailyVerbs = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef(null);

//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleTabPress = (index) => {
//     setActiveIndex(index);
//     flatListRef.current.scrollToIndex({ index, animated: true });
//   };

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     { useNativeDriver: false }
//   );

//   const currentIndex = Math.floor(scrollX.interpolate({
//     inputRange: [-CARD_WIDTH / 2, (languageArray.length - 1) * CARD_WIDTH + CARD_WIDTH / 2],
//     outputRange: [-1, languageArray.length],
//   }));

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         ref={flatListRef}
//         data={languageArray}
//         keyExtractor={(item) => item.key}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           flexGrow: 1,
//           alignItems: 'center',
//         }}
//         onScroll={handleScroll}
//         scrollEventThrottle={16} // Adjust scroll responsiveness
//         renderItem={({ item, index }) => (
//           <View
//             style={{
//               width: CARD_WIDTH,
//               marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
//             }}
//           >
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: item.bg,
//                 borderRadius: 10,
//                 padding: 20,
//                 elevation: 5,
//               }}
//             >
//               <Text>{item.tabTitle} Content</Text>
//             </View>
//           </View>
//         )}
//         onMomentumScrollEnd={(event) => {
//           const offsetX = event.nativeEvent.contentOffset.x;
//           const newIndex = Math.round(offsetX / CARD_WIDTH);
//           setActiveIndex(newIndex);
//         }}
//       />
//       <TabBar tabs={languageArray} activeIndex={currentIndex} onPress={handleTabPress} />
//     </View>
//   );
// };

const DailyVerbs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const handleTabPress = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
    setActiveTab(index);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const inputRange = languageArray.map((_, index) => index * CARD_WIDTH);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [SCREEN_WIDTH * 0.05, 0, -SCREEN_WIDTH * 0.05],
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={languageArray}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust scroll responsiveness
        renderItem={({ item, index }) => (
          <Animated.View
            style={{
              width: CARD_WIDTH,
              marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
              transform: [{ translateX }],
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: item.bg,
                borderRadius: 10,
                padding: 20,
                elevation: 5,
              }}
            >
              <Text>{item.tabTitle} Content</Text>
            </View>
          </Animated.View>
        )}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / CARD_WIDTH);
          console.log("New Index", newIndex)
          setActiveTab(newIndex);
        }}
      />
      <TabBar tabs={languageArray} activeIndex={activeTab} onPress={handleTabPress} />
    </View>
  );
};

// const DailyVerbs = () => {
//   let languageArray = [
//     {
//       key: '1',
//       tabTitle: 'English',
//       bg: 'red',
//     },
//     {
//       key: '2',
//       tabTitle: 'Marathi',
//       bg: 'green',
//     },
//     {
//       key: '3',
//       tabTitle: 'Hindi',
//       bg: 'yellow',
//     },
//     {
//       key: '2',
//       tabTitle: 'Marathi',
//       bg: 'green',
//     },
//     {
//       key: '3',
//       tabTitle: 'Hindi',
//       bg: 'yellow',
//     },
//     {
//       key: '2',
//       tabTitle: 'Marathi',
//       bg: 'green',
//     },
//     {
//       key: '3',
//       tabTitle: 'Hindi',
//       bg: 'yellow',
//     },
//   ];

//   const scrollX = React.useRef(new Animated.Value(0)).current;

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const CARD_WIDTH = SCREEN_WIDTH * 0.9; // Adjust as needed

//   return (
//     <>
//       <View
//         style={{
//           marginTop: '5%',
//         }}>

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const CARD_WIDTH = SCREEN_WIDTH * 0.7; // Adjust as needed

// const languageArray = [
//   { key: 'hindi', tabTitle: 'Hindi', bg: 'blue' },
//   { key: 'english', tabTitle: 'English', bg: 'green' },
//   { key: 'marathi', tabTitle: 'Marathi', bg: 'red' },
// ];

// const TabBar = ({ tabs, activeIndex, onPress }) => {
//   return (
//     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//       {tabs.map((tab, index) => (
//         <TouchableOpacity
//           key={tab.key}
//           onPress={() => onPress(index)}
//           style={{
//             paddingVertical: 10,
//             paddingHorizontal: 20,
//             borderBottomWidth: activeIndex === index ? 2 : 0,
//             borderBottomColor: 'red',
//           }}
//         >
//           <Text>{tab.tabTitle}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const HorizontalCardList = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef(null);

//   const handleTabPress = (index) => {
//     flatListRef.current.scrollToIndex({ index, animated: true });
//     setActiveTab(index);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TabBar tabs={languageArray} activeIndex={activeTab} onPress={handleTabPress} />
//       <FlatList
//         ref={flatListRef}
//         data={languageArray}
//         keyExtractor={(item) => item.key}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           flexGrow: 1,
//           alignItems: 'center',
//           padding: 0,
//         }}
//         onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
//           useNativeDriver: false,
//         })}
//         renderItem={({ item, index }) => (
//           <Animated.View
//             style={{
//               width: CARD_WIDTH,
//               marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
//               transform: [
//                 {
//                   scale: scrollX.interpolate({
//                     inputRange: [
//                       (index - 1) * SCREEN_WIDTH,
//                       index * SCREEN_WIDTH,
//                       (index + 1) * SCREEN_WIDTH,
//                     ],
//                     outputRange: [0.8, 1, 0.8],
//                   }),
//                 },
//               ],
//             }}
//           >
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: item.bg,
//                 borderRadius: 10,
//                 padding: 20,
//                 elevation: 5,
//               }}
//             >
//               <Text>{item.tabTitle} Content</Text>
//             </View>
//           </Animated.View>
//         )}
//       />
//     </View>
//   );
// };


//             {/* <FlatList
//       data={languageArray}
//       keyExtractor={(item) => item.key}
//       horizontal
//       pagingEnabled
//       contentContainerStyle={{
//         flexGrow: 1,
//         alignItems: 'center',
//         padding: 0,
//       }}
//       renderItem={({ item, index }) => (
//         <View
//           style={{
//             width: CARD_WIDTH,
//             marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
//             height:getResHeight(210)
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: item.bg,
//               borderRadius: 10,
//               padding: 20,
//               elevation: 5, // Add shadow for depth
//             }}
//           >
//             <Text>{item.tabTitle}</Text>
//           </View>
//         </View>
//       )}
//     /> */}
      
//       </View>
//     </>
//   );
// };

const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {
  GetProductAPI: payload => dispatch(GetProductAPI(payload)),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
