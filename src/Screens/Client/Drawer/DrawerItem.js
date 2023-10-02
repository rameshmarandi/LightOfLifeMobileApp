import React, {Component} from 'react';
import {
  Text,
  View,
  Switch,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import theme from '../../../utility/theme';
import {
  hp,
  getFontSize,
  SCREENHEIGHT,
  SCREENWIDTH,
  wp,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import {VectorIcon} from '../../../components/VectorIcon';
import {
  backgroundColorHandler,
  getAsyncValue,
  setAsyncValue,
  textColorHandler,
} from '../../../components/commonHelper';
import MsgConfig from '../../../config/MsgConfig';
import {store} from '../../../utility/store';
import {isDarkMode} from '../../../features/auth';
import {CommonButtonComp} from '../../../components/commonComp';

class DrawerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }
  _renderItem = ({item, index}) => {
    let {navigation} = this.props;
    return (
      <>
        <View
          style={{
            marginTop: index == 0 ? '5%' : 0,
          }}>
          <Button
            title={item.lable}
            onPress={() => {
              navigation.navigate(item.route);
              navigation.closeDrawer();
            }}
            disabledStyle={{
              backgroundColor: theme.color.disabledBtn,
            }}
            icon={item.icon}
            titleStyle={[
              styles.btnTitleStyle,
              {
                color: textColorHandler(),
              },
            ]}
            containerStyle={[
              styles.btnContainerStyle,
              {
                overflow: 'hidden',
              },
            ]}
            buttonStyle={[
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                paddingLeft: '8%',
                backgroundColor: backgroundColorHandler(),
              },
            ]}
            letfIcon
          />
        </View>
      </>
    );
  };
  handleDarkMode = async () => {
    const res = await getAsyncValue('darkMode');
    if (typeof res == 'string' && res == 'false') {
      await setAsyncValue('darkMode', true);
      store.dispatch(isDarkMode(true));
    } else {
      await setAsyncValue('darkMode', false);
      store.dispatch(isDarkMode(false));
    }
    this.props.navigation.closeDrawer();
  };
  render() {
    let navRoute = [
      {
        id: 1,
        lable: MsgConfig.home,
        route: 'HomePage',
        icon: (
          <VectorIcon
            type={'Entypo'}
            name={'home'}
            size={getFontSize(23)}
            color={textColorHandler()}
          />
        ),
      },

      {
        id: 2,
        lable: MsgConfig.freeResource,
        route: 'FreeResource',
        icon: (
          <VectorIcon
            type={'FontAwesome5'}
            name={'compress-arrows-alt'}
            size={getFontSize(21)}
            color={textColorHandler()}
          />
        ),
      },

      {
        id: 3,
        lable: MsgConfig.prayerRequest,
        route: 'HomePage',
        icon: (
          <VectorIcon
            type={'FontAwesome5'}
            name={'pray'}
            size={getFontSize(25)}
            color={textColorHandler()}
          />
        ),
      },
      {
        id: 4,
        lable: MsgConfig.event,
        route: 'Events',
        icon: (
          <VectorIcon
            type={'MaterialIcons'}
            name={'event-note'}
            size={getFontSize(25)}
            color={textColorHandler()}
          />
        ),
      },

      {
        id: 5,
        lable: MsgConfig.contactWithUs,
        route: 'ContactWithUs',
        icon: (
          <VectorIcon
            type={'MaterialIcons'}
            name={'contact-mail'}
            size={getFontSize(25)}
            color={textColorHandler()}
          />
        ),
      },
      {
        id: 6,
        lable: MsgConfig.feedBack,
        route: 'Feedback',
        icon: (
          <VectorIcon
            type={'MaterialIcons'}
            name={'feedback'}
            size={getFontSize(25)}
            color={textColorHandler()}
          />
        ),
      },
      {
        id: 7,
        lable: MsgConfig.setting,
        route: 'HomePage',
        icon: (
          <VectorIcon
            type={'Ionicons'}
            name={'settings'}
            size={getFontSize(25)}
            color={textColorHandler()}
          />
        ),
      },
    ];
    const {isDarkMode, navigation} = this.props;
    return (
      <SafeAreaView
        style={[
          styles.drawerContainer,
          {
            backgroundColor: backgroundColorHandler(),
            overflow: 'hidden',
            shadowColor: '#FFFFFF',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 18,
          },
        ]}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: backgroundColorHandler(),
              borderBottomColor: textColorHandler(),
            },
          ]}>
          <Image
            source={theme.assets.church_logo_origianl}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        <View style={{}}>
          <FlatList
            data={navRoute}
            renderItem={this._renderItem}
            keyExtractor={item => item.id?.toString()}
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

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: '2%',
          }}>
          <CommonButtonComp
            title={'Are you a member?'}
            onPress={() => {
              navigation.navigate("Login")
              // navigation.closeDrawer();
            }}
            iconLeft
            // loading = {true}
            icon={
              <VectorIcon
                type={'FontAwesome'}
                name={'lock'}
                size={getFontSize(23)}
                color={'white'}
              />
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 0,
    borderBottomRightRadius: 30,
  },
  imageContainer: {
    height: hp('20%'),
    paddingTop: '5%',
    width: '100%',
    borderTopRightRadius: 10,
    marginTop: '8%',
    paddingBottom: '3%',
    borderBottomWidth: 1,
  },
  btnTitleStyle: {
    textAlign: 'left',
    fontSize: getFontSize(12),
    fontFamily: theme.font.semiBold,
    marginLeft: '5%',
    marginTop: '2%',
  },
  btnContainerStyle: {
    marginBottom: '1.5%',
    width: '100%',
    height: getResHeight(45),
  },
});

const mapStateToProps = state => ({
  isDarkMode: state.auth.isDarkMode,
});

const mapDispatchToProps = {
  GetProductAPI: payload => dispatch(GetProductAPI(payload)),
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem);
