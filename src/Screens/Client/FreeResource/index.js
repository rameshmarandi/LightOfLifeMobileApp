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
  textColorHandler,
} from '../../../components/commonHelper';
import {connect} from 'react-redux';
import {store} from '../../../utility/store';
import * as Animatable from 'react-native-animatable';
import CustomHeader from '../../../components/CustomHeader';
import {ALL_LINKS} from '../../../config/constants';
import {
  SCREENWIDTH,
  SCREENHEIGHT,
  getFontSize,
  getResHeight,
} from '../../../utility/responsive';

const imageSize = () => {
  return {
    height: 60,
    width: 60,
  };
};

const FreeResourceData = [
  {
    id: 6,
    imageLink: (
      <Image
        source={theme.assets.ebook}
        style={{
          height: 100,
          width: 100,
        }}
      />
    ),

    title: 'E-Books (Free)',
    URL: ALL_LINKS.E_BOOKS,
  },

  {
    id: 1,
    imageLink: <Image source={theme.assets.theology} style={imageSize()} />,
    title: 'Theology & More',
    type: 'theology',
  },

  {
    id: 2,
    imageLink: <Image source={theme.assets.gotquestion} style={imageSize()} />,

    title: 'GotQuestion (English)',
    URL: ALL_LINKS.GOTQUESTION_ENGLISH,
  },
  {
    id: 3,
    imageLink: <Image source={theme.assets.gotquestion} style={imageSize()} />,
    title: 'GotQuestion (Hindi)',
    URL: ALL_LINKS.GOTQUESTION_HINDI,
  },
    {
    id: 0,
    imageLink: <Image source={theme.assets.missionary} style={imageSize()} />,
    title: 'Misonary Biography',
    URL: ALL_LINKS.MISSIONARY_BIOGRAPHY,
  },
  {
    id: 4,
    imageLink: <Image source={theme.assets.unity} style={imageSize()} />,
    title: 'Christian Rights',
    //   URL: CHRISTIAN_RIGHTS,
  },

  
];
class FreeResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      activeSlide: 0,
    };
  }

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
            backPress={() => {
              this.props.navigation.goBack();
            }}
            screenTitle={'Free resources'}
            // centerLogo={true}
          />
        </View>

        <View
          style={{
            paddingHorizontal: '5%',
          }}>
          <View
            style={{
              width: SCREENWIDTH,
              height: SCREENHEIGHT - 60,
              alignSelf: 'center',
              padding: '4%',
              flexDirection: 'row',
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{}}
              contentContainerStyle={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}
              data={FreeResourceData}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <ResourceCard
                    data={item}
                    isDarkMode={this.props.isDarkMode}
                  />
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const ResourceCard = props => {
  const {title, URL, imageLink, type, isDarkMode} = props.data;
  //   const {navigation} = props
  //   const WebViewFunction = url => {
  //     navigation.navigate('WebRender', {URL: url, title: title})
  //   }
  //   //Dark Theme Select
  //   const darkStore = useSelector(state => state)
  //   const {darkTheme} = darkStore
  //   const dark = darkTheme?.darktheme
  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log('URL', URL);
            //   if (type) {
            //     navigation.navigate('MoreFreeResource', {type: `${type}`})
            //   } else {
            //     WebViewFunction(URL)
            //   }
          }}
          style={{
            width: 160,
            height: 150,
            borderWidth: 1,
            borderColor: theme.color.primary,            
            backgroundColor: backgroundColorHandler(),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10%',
            padding: '10%',
            shadowColor: isDarkMode ? theme.color.white : 'black',
            shadowOffset: {width: 0, height: 1},
            shadowRadius: 5,
            shadowOpacity: 0.3,
            elevation: 8,
            borderRadius: 20,
          }}>
          <View>{imageLink}</View>
          <Text
            style={{
              fontSize: getFontSize(11),
              color: textColorHandler(),
              fontFamily: theme.font.medium,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  imageSize: {
    height: '',
    width: '',
  },
});

const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {
  GetProductAPI: payload => dispatch(GetProductAPI(payload)),
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeResource);
