import React, {Component, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Image,
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

import MapView, {Marker} from 'react-native-maps';
import {
  SCREENWIDTH,
  getFontSize,
  getResHeight,
} from '../../../utility/responsive';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Button} from 'react-native-elements';
import {VectorIcon} from '../../../components/VectorIcon';

const {width} = Dimensions.get('window');
const itemWidth = width - 40; // Adjust this according to your layout

const images = [
  'https://static.officeholidays.com/images/1280x853c/india-flag-01.jpg',
  'https://www.thestatesman.com/wp-content/uploads/2020/08/i-2.jpg',
  'https://nenow.in/wp-content/uploads/2022/08/Independence-Day-2022.png',

  'https://im.indiatimes.in/content/2023/Aug/Independence-Day-speech4_64ca45b727e08.jpg',
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      activeSlide: 0,
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
  _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            borderRadius: 10,
            overflow: 'hidden',
          },
        ]}>
        <Image source={{uri: item}} style={styles.image} />
      </View>
    );
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
        </View>
        <View style={{}}>
          <FlatList
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({item, index}) => {
              switch (index) {
                case 0:
                  return (
                    <>
                      <View
                        style={{
                          paddingHorizontal: '7%',
                          marginTop: '5%',
                        }}>
                        <View
                          style={{
                            marginBottom: '2%',
                          }}>
                          <SectionHeader
                            sectionTitle={`${MsgConfig.specialDay}`}
                          />
                        </View>
                        <View style={styles.container}>
                          <Carousel
                            ref={c => (this.carousel = c)}
                            data={images}
                            renderItem={this._renderItem}
                            sliderWidth={width}
                            itemWidth={itemWidth}
                            loop={true}
                            autoplay={true}
                            autoplayInterval={4000} // 30 seconds
                            onSnapToItem={index =>
                              this.setState({activeSlide: index})
                            }
                          />
                          <Pagination
                            dotsLength={images.length}
                            activeDotIndex={this.state.activeSlide}
                            containerStyle={styles.paginationContainer}
                            dotStyle={styles.paginationDot}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                          />
                        </View>
                      </View>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <View
                        style={{
                          paddingHorizontal: '7%',
                        }}>
                        <SectionHeader
                          sectionTitle={`${MsgConfig.firstHeaderText}`}
                        />
                      </View>
                      <DailyVerbs />
                    </>
                  );
                case 2:
                  return (
                    <>
                      <View
                        style={{
                          paddingHorizontal: '5%',
                          marginTop: '5%',
                          marginBottom: '4%',
                          borderRadius: 10,
                        }}>
                        <SectionHeader
                          sectionTitle={`${MsgConfig.chruchLocation}`}
                        />
                        <View
                          style={{
                            width: '100%',
                            height: getResHeight(450),
                            borderRadius: 10,
                            overflow: 'hidden',
                            marginTop: '4%',
                          }}>
                          <MapScreen />
                        </View>
                      </View>
                  
                    </>
                  );
              }
            }}
          />
        </View>
      
      </SafeAreaView>
    );
  }
}

const MapScreen = () => {
  return (
    // <View style={{ flex: 1 }}>
    <MapView
      style={{width: '100%', height: 300}}
      initialRegion={{
        latitude: 18.5890345,
        longitude: 73.7925924,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        coordinate={{latitude: 18.5890345, longitude: 73.7925924}}
        title="Light of Life Church"
        description="Join us for worship, fellowship, and spiritual growth at Light of Life Church. All are welcome!"
        icon={
        ()=>{
          return (  <VectorIcon
            type={'FontAwesome6'}
            name={'location-dot'}
            size={getFontSize(29)}
            color={'red'}
            style={{}}
          />)
        }
        }>
          <VectorIcon
            type={'FontAwesome6'}
            name={'location-dot'}
            size={getFontSize(29)}
            color={'red'}
            style={{}}
          />
        <Text>Custom Marker Text</Text>
      </Marker>
    </MapView>
    // </View>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
//  * 0.9
//  * 0.8; // Adjust as needed

const languageArray = [
  {key: 'hindi', tabTitle: 'Hindi', bg: 'blue'},
  {key: 'english', tabTitle: 'English', bg: 'green'},
  {key: 'marathi', tabTitle: 'Marathi', bg: 'red'},
];

const TabBar = ({tabs, activeIndex, onPress}) => {
  return (
    <View style={{flexDirection: 'row', paddingLeft: '5%', marginTop: '2.5%'}}>
      {tabs.map((tab, index) => (
        // <View
        //   style={{
        //     // width:'100%',
        //     marginBottom:"4%",
        //     // backgroundColor:'red'
        //   }}>
        <Button
          title={tab.tabTitle}
          onPress={() => {
            // LayoutAnimation.easeIneaseOut()
            onPress(index);
          }}
          titleStyle={{
            // activeIndex === index ? "red" :
            color: activeIndex === index ? 'red' : textColorHandler(),
            fontFamily: theme.font.semiBold,
            fontSize: getFontSize(11),
            margin: 0,
            padding: 0,
          }}
          iconContainerStyle={{}}
          containerStyle={[
            {
              width: '30%',
              height: 45,
              justifyContent: 'center',
              backgroundColor: backgroundColorHandler(),
              borderBottomWidth: activeIndex === index ? 2 : 0,
              borderBottomColor: theme.color.error,
              marginBottom: '3.5%',
              paddingBottom: 0,
            },
          ]}
          buttonStyle={[
            {
              width: '100%',
              height: '100%',
              backgroundColor: backgroundColorHandler(),
              paddingBottom: 0,
            },
          ]}
        />
      ))}
    </View>
  );
};

const DailyVerbs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const handleTabPress = index => {
    flatListRef.current.scrollToIndex({index, animated: true});
    setActiveTab(index);
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const inputRange = languageArray.map((_, index) => index * CARD_WIDTH);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [SCREEN_WIDTH * 0.03, 0, -SCREEN_WIDTH * 0.03],
  });

  return (
    <View style={{flex: 1}}>
      <TabBar
        tabs={languageArray}
        activeIndex={activeTab}
        onPress={handleTabPress}
      />
      <FlatList
        ref={flatListRef}
        data={languageArray}
        keyExtractor={item => item.key}
        horizontal
        bounce={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        // onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust scroll responsiveness
        renderItem={({item, index}) => (
          <Animated.View
            style={{
              width:
                // SCREENWIDTH - 15,
                // marginHorizontal:10,
                CARD_WIDTH,
              height: getResHeight(180),
              overflow: 'hidden',
              marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
              // transform: [{translateX}],
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: item.bg,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                source={theme.assets.dailyVerbsBanner}
                resizeMode="contain"
                style={{
                  flex: 1,
                  width: '100%',
                  // height:"100%"
                }}
              />
            </View>
            {/* <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: item.bg,
                borderRadius: 10,
              
              }}>
                <Image
                source={theme.assets.dailyVerbsBanner}
                resizeMode='contain'
                style={{
                  height:"100%",
                  width:"90%",
                }}
                />
            </View> */}
          </Animated.View>
        )}
        onMomentumScrollEnd={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / CARD_WIDTH);
          console.log('New Index', newIndex);
          setActiveTab(newIndex);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: itemWidth,
    height: 200, // Adjust this according to your layout
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: textColorHandler(),
    // marginHorizontal: 3,
    // backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
});

const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {
  GetProductAPI: payload => dispatch(GetProductAPI(payload)),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
