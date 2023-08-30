import React, {Component, useState, useRef} from 'react';
import {
  Text,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Animated,
  useWindowDimensions,
  FlatList,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';

import {Formik} from 'formik';
import theme from '../../../utility/theme';
import {
  backgroundColorHandler,
  extractVideoId,
  getAsyncValue,
  setAsyncValue,
  textColorHandler,
} from '../../../components/commonHelper';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {ALL_LINKS} from '../../../config/constants';
import * as PN from '../../../components/pushNotificaiton';
import {sendOTPViaEmail} from '../../../apis/authRepo';
import CustomHeader from '../../../components/CustomHeader';
import SectionHeader from '../../../components/SectionHeader';
import MsgConfig from '../../../config/MsgConfig';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Animatable from 'react-native-animatable';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Dropdown} from 'react-native-element-dropdown';

import {
  SCREENWIDTH,
  SCREENHEIGHT,
  getFontSize,
  hp,
  wp,
  getResHeight,
} from '../../../utility/responsive';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Button} from 'react-native-elements';
import GoogleMapComp from '../../../components/GoogleMapComp';
import QuickRouteComp from '../../../components/QuickRouteComp';
import {CommonButtonComp, CommonModal} from '../../../components/commonComp';
import {VectorIcon} from '../../../components/VectorIcon';
import InputBox from '../../../components/InputBox';
import PrayerRequest from '../PrayerRequest';

const {width} = Dimensions.get('window');
const itemWidth = width - 40; // Adjust this according to your layout

const images = [
  'https://i.pinimg.com/originals/34/18/a4/3418a4a2c4d02d5890a8b3bde35d8e3c.jpg',
  'https://dailyverses.net/images/en/kjv/xl/matthew-1-21-2.jpg',
  'https://nenow.in/wp-content/uploads/2022/08/Independence-Day-2022.png',

  'https://im.indiatimes.in/content/2023/Aug/Independence-Day-speech4_64ca45b727e08.jpg',
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
//  * 0.9
//  * 0.8; // Adjust as needed

const languageArray = [
  {key: 'hindi', tabTitle: 'Hindi', bg: 'blue'},
  {key: 'english', tabTitle: 'English', bg: 'green'},
  {key: 'marathi', tabTitle: 'Marathi', bg: 'red'},
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      isVisible: false,
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
          <PrayerRequest
            isVisible={this.state.isVisible}
            onClick={() => {
              this.setState({isVisible: false});
            }}
            onPress={() => {
              this.setState({isVisible: false});
            }}
          />
        </View>
        <View style={{}}>
          <FlatList
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({item, index}) => {
              switch (index) {
                case 0:
                  return (
                    <>
                      <Animatable.View
                        animation="fadeInUp"
                        duration={500}
                        delay={200}
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
                      </Animatable.View>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <Animatable.View
                        animation="fadeInUp"
                        duration={500}
                        delay={200}
                        style={{
                          paddingHorizontal: '7%',
                        }}>
                        <SectionHeader
                          sectionTitle={`${MsgConfig.firstHeaderText}`}
                        />
                      </Animatable.View>
                      <DailyVerbs />
                    </>
                  );

                case 2:
                  return (
                    <>
                      <Animatable.View
                        animation="fadeInUp"
                        duration={500}
                        delay={200}
                        style={{
                          paddingHorizontal: '5%',
                          marginTop: '5%',
                          marginBottom: '4%',
                          borderRadius: 10,
                        }}>
                        <View
                          style={{
                            marginTop: '2%',
                            marginBottom: '2%',
                          }}>
                          <SectionHeader
                            sectionTitle={`${MsgConfig.quickNav}`}
                          />
                        </View>
                        <QuickRouteComp
                          modalVisible={() => {
                            this.setState({isVisible: true});
                          }}
                          {...this.props}
                        />
                      </Animatable.View>
                    </>
                  );
                case 3:
                  return (
                    <>
                      <Animatable.View
                        animation="fadeInUp"
                        duration={500}
                        delay={200}
                        style={{
                          paddingHorizontal: '5%',
                          marginTop: '5%',
                          marginBottom: '4%',
                          borderRadius: 10,
                        }}>
                        <SectionHeader
                          sectionTitle={`${MsgConfig.socialMedia}`}
                        />
                        <YoutubeComp />
                      </Animatable.View>
                    </>
                  );
                case 4:
                  return (
                    <>
                      <Animatable.View
                        animation="fadeInUp"
                        duration={500}
                        delay={200}
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
                            marginBottom: '70%',
                            width: '100%',
                            height: getResHeight(250),
                            borderRadius: 10,
                            overflow: 'hidden',
                            marginTop: '6%',
                          }}>
                          <GoogleMapComp />
                        </View>
                      </Animatable.View>
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

const YoutubeComp = () => {
  return (
    <>
      <YoutubePlayer
        width={'100%'}
        height={getResHeight(200)}
        videoId={extractVideoId(ALL_LINKS.youtubeLink)}
        webViewProps={{
          scrollEnabled: false,
          renderToHardwareTextureAndroid: true,
          androidLayerType:
            Platform.OS === 'android' && Platform.Version <= 22
              ? 'hardware'
              : 'none',
        }}
        webViewStyle={{
          width: '100%',
          height: '100%',
          borderRadius: 100,
          marginTop: '5%',
          opacity: 0.99,
        }}
      />
    </>
  );
};
const TabBar = ({tabs, activeIndex, onPress}) => {
  return (
    <View style={{flexDirection: 'row', paddingLeft: '5%', marginTop: '2.5%'}}>
      {tabs.map((tab, index) => (      
        <Button
          title={tab.tabTitle}
          onPress={() => {        
            onPress(index);
          }}
          titleStyle={{
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
    <Animatable.View
      style={{flex: 1}}
      animation="fadeInUp"
      duration={500}
      delay={200}>
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
                CARD_WIDTH,
              height: getResHeight(180),
              overflow: 'hidden',
              marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,            
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                source={theme.assets.dailyVerbsBanner}
                resizeMode="contain"
                style={{
                  flex: 1,
                  width: '100%',
                }}
              />
            </View>
            
          </Animated.View>
        )}
        onMomentumScrollEnd={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / CARD_WIDTH);
          console.log('New Index', newIndex);
          setActiveTab(newIndex);
        }}
      />
    </Animatable.View>
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
  },

  //Dropdown imle
  lableStyle: {
    fontSize: getFontSize(12),
    fontWeight: '600',
    fontFamily: theme.font.HelveticaBold,
    color: '#666666',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: '5%',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 16,
  },
});

const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {
  GetProductAPI: payload => dispatch(GetProductAPI(payload)),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
