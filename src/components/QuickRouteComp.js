import React, {useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import {Button} from 'react-native-elements';
import {getFontSize} from '../utility/responsive';
import {VectorIcon} from './VectorIcon';
import theme from '../utility/theme';
import MsgConfig from '../config/MsgConfig';
import {store} from '../utility/store';
import { textColorHandler } from './commonHelper';

const QuickRouteComp = (props) => {

  const {modalVisible} = props
  let darkModeStatus = store.getState().auth.isDarkMode;
  let navRoute = [
    {
      id: 2,
      lable: MsgConfig.freeResource,
      route: 'FreeResource',
      icon: (
        <VectorIcon
          type={'FontAwesome5'}
          name={'compress-arrows-alt'}
          size={getFontSize(18)}
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
          size={getFontSize(21)}
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
          size={getFontSize(21)}
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
          size={getFontSize(21)}
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
          size={getFontSize(21)}
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
          size={getFontSize(21)}
          color={textColorHandler()}
        />
      ),
    },
  ];
  const NavRouteItem = (props) => {

    let {icon, lable, navigation,navRoute ,modalVisible, index} = props
    let darkModeStatus = store.getState().auth.isDarkMode;
    return (
      <View
        style={{
          margin: 10,
          alignSelf:"center"
        }}>
        <Button
          type={'clear'}
          onPress={() => {
            if(index ==1){
              modalVisible()
            }
          navigation.navigate(navRoute.route)
          }}
          iconPosition="right"
          icon={
            <View style={{alignItems: 'center'}}>
              {icon}
              <Text
                style={{
                  marginTop: 4,
                  textAlign: 'center',
                  fontSize: getFontSize(10),
                  color : textColorHandler(),
                  fontFamily: theme.font.medium
                }}>
                {lable}
              </Text>
            </View>
          }
          iconContainerStyle={{
            alignItems: 'center',
          }}
          containerStyle={[
            {
              width: 90,
              height: 90,
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: darkModeStatus ?theme.color.iconCircleBg : theme.color.iceWhite,
            
              borderRadius: 100,
            },
          ]}
          buttonStyle={[
            {
              width: '100%',
              height: '100%',
              borderRadius: 100,
            },
          ]}
        />
      </View>
    );
  };

  const renderNavRouteItem = ({item , index}) => (
    <NavRouteItem icon={item.icon} modalVisible = {modalVisible} lable={item.lable} navRoute = {item} {...props} index={index}/>
  );

  return (
    <>
      <FlatList
        data={navRoute}
        renderItem={renderNavRouteItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        containerStyle={{
          width:"100%",
          alignSelf:"center"
        }}
      />
    </>
  );
};

export default QuickRouteComp;
