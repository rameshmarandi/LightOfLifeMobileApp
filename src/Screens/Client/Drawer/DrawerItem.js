import React, {Component} from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet} from 'react-native';
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
  textColorHandler,
} from '../../../components/commonHelper';
import MsgConfig from '../../../config/MsgConfig';

class DrawerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              // navigation.closeDrawer();
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

  render() {
    let {navigation} = this.props;

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
        route: 'HomePage',
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
        route: 'HomePage',
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
        route: 'HomePage',
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
        route: 'HomePage',
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
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: '2%',
          }}>
          <Button
            title={'Are you a member?'}
            onPress={() => {
              // navigation.navigate("Login")
              // navigation.closeDrawer();
            }}
            icon={
              <VectorIcon
                type={'FontAwesome'}
                name={'lock'}
                size={getFontSize(23)}
                color={'white'}
              />
            }
            titleStyle={[
              styles.btnTitleStyle,
              {
                color: 'white',
              },
            ]}
            containerStyle={[
              styles.btnContainerStyle,
              {
                elevation: 6,
                borderRadius: 100,
              },
            ]}
            buttonStyle={[
              {
                width: '100%',
                height: '100%',
                borderRadius: 100,
                backgroundColor: theme.color.primary,
              },
            ]}
            letfIcon
          />
          <Text
            style={{
              color: textColorHandler(),
              textAlign: 'right',
            }}>
            Version 1.0.0
          </Text>
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
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem);
