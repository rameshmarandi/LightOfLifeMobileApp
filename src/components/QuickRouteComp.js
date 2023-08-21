import React, {useCallback} from 'react';
import {
  View,
  Linking,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import MapView, {Marker, Callout} from 'react-native-maps';
import {getFontSize} from '../utility/responsive';
import {VectorIcon} from './VectorIcon';
import theme from '../utility/theme';
import {MapCoordinate} from '../config/constants';
import MsgConfig from '../config/MsgConfig';
import {backgroundColorHandler, textColorHandler} from './commonHelper';
import {store} from '../utility/store';

const QuickRouteComp = () => {
  let darkModeStatus = store.getState().auth.isDarkMode;
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
          color={theme.color.primary}
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
          color={theme.color.primary}
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
          color={theme.color.primary}
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
          color={theme.color.primary}
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
          color={theme.color.primary}
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
          color={theme.color.primary}
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
          color={theme.color.primary}
        />
      ),
    },
  ];
  const NavRouteItem = ({icon, lable}) => {
    let darkModeStatus = store.getState().auth.isDarkMode;
    return (
      <View
        style={
          {
            //   flexDirection: 'row',
            //   justifyContent: 'space-between',
            //   alignItems: 'center',
            //   paddingVertical: 10,
            //   paddingHorizontal: 20,
            //   borderBottomWidth: 1,
            //   borderColor: 'gray', // Adjust the color as needed
          }
        }>
        <Button
          type={'clear'}
          onPress={() => {}}
          iconPosition="right"
          icon={
            <View style={{alignItems: 'center'}}>
              {icon}
              <Text style={{marginTop: 4, fontSize: 12, color: 'black'}}>
                {lable}
              </Text>
            </View>
          }
          iconContainerStyle={{
            alignItems: 'center',
          }}
          containerStyle={[
            {
              width: 100,
              height: 100,
              justifyContent: 'center',
              backgroundColor: darkModeStatus ? 'white' : theme.color.iceWhite,
              //   backgroundColorHandler(),
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

  const renderNavRouteItem = ({item}) => (
    <NavRouteItem icon={item.icon} lable={item.lable} />
  );

  return (
    <>
      <FlatList
        data={navRoute}
        renderItem={renderNavRouteItem}
        keyExtractor={item => item.id.toString()}
        containerStyle={
            {

            }}
        // contentContainerStyle={{
        //     width:"100%",

        //     flexDirection:"row"
        // }}
      />

      {/* <View>
        <Text>Icons</Text>
        <Text>Route name</Text>
          <Button
  type={'clear'}
  onPress={() => {}}
  iconPosition="right"
  icon={
    <View style={{ alignItems: 'center' }}>
      <VectorIcon
        type={'Ionicons'}
        name={'menu'}
        size={getFontSize(29)}
        color={textColorHandler()}
        style={{
          marginTop: 0,
        }}
      />
      <Text style={{ marginTop: 4, fontSize: 12, color: textColorHandler() }}>
        Icon Text
      </Text>
    </View>
  }
  iconContainerStyle={{
    alignItems: 'center',
  }}
  containerStyle={[
    {
      width: 100,
      height: 100,
      justifyContent: 'center',
      backgroundColor: backgroundColorHandler(),
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

    </View> */}
    </>
  );
};
// Wrap the component with React.memo and useCallback to prevent re-renders
// const QuickRouteWrapper = React.memo(RouteNaveCirleComp);

// const QuickRouteComp = () => {
//   // Wrapping the component with useCallback to prevent unnecessary re-creation
//   const memoizedCallback = useCallback(() => <QuickRouteWrapper />, [store.getState().auth.isDarkMode]);

//   return memoizedCallback();
// };

export default QuickRouteComp;
