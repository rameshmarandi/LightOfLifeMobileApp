import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, View, Modal,TouchableOpacity} from 'react-native';

import {
  getFontSize,
  getResHeight,
  getResWidth,
  hp,
  wp,
} from '../../utility/responsive';
import theme from '../../utility/theme';
import {VectorIcon} from '../../components/VectorIcon';
import {
  HomePage,
  MyProfile,
  AddProduct,
  MyCards,
  MyInsights,
} from '../../Screens';
import {Button} from 'react-native-elements';
import {store} from '../../utility/store';
import {tabActive} from '../../features/auth';

const Tab = createBottomTabNavigator();
const arrOfTab = [
  {
    title: 'Dashboard',
    routeNames: 'HomePage',
    component: HomePage,
  },
  {
    title: 'Order',
    routeNames: 'MyCards',
    component: MyCards,
  },
  {
    routeNames: 'AddProduct',
    component: AddProduct,
  },

  {
    title: 'Payment',
    routeNames: 'MyInsights',
    component: MyInsights,
  },
  {
    title: 'Profile',
    routeNames: 'Profile',
    component: MyProfile,
  },
];

const setIcon = (routeName, isActiveTab) => {
  const color = isActiveTab ? theme.color.accent : theme.color.dimGray;
  switch (routeName) {
    case 'HomePage':
      return (
        <VectorIcon
          type={'MaterialIcons'}
          name={'dashboard'}
          size={getFontSize(25)}
          color={color}
        />
      );
    case 'MyCards':
      return (
        <VectorIcon
          type={'Ionicons'}
          name={'ios-clipboard'}
          size={getFontSize(25)}
          color={color}
        />
      );
    case 'AddProduct':
      return (
        <VectorIcon
          type={'Ionicons'}
          name={'ios-clipboard'}
          size={getFontSize(25)}
          color={color}
        />
      );
    case 'MyInsights':
      return (
        <VectorIcon
          type={'Ionicons'}
          name={'ios-wallet'}
          size={getFontSize(25)}
          color={color}
        />
      );
    case 'Profile':
      return (
        <VectorIcon
          type={'FontAwesome'}
          name={'user'}
          size={getFontSize(25)}
          color={color}
        />
      );
    default:
      break;
  }
  return;
};

function TabBarRender({navigation, item, index, activeTab}) {
  const isCurentTab = activeTab == index;
  const [productModal, setProductModal] = React.useState(false);
  const onRequestClose = () => {
    setProductModal(!productModal)
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigation.navigate(item.routeNames);
      }}
      style={[
        {
          width: wp(95) / arrOfTab.length,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopLeftRadius: getResWidth(100),
          borderTopRightRadius: getResWidth(100),
        },
        {
          paddingTop: index !== 2 ? getResHeight(10) : 0,
          paddingBottom: navigation.insets.bottom
            ? navigation.insets.bottom - 2
            : getResHeight(8),
        },
        isCurentTab && {
          backgroundColor: index !== 2 ? theme.color.primary : 'white',
        },
      ]}>
      {index == 2 ? (
        <>
          <Button
            onPress={() => {
              setProductModal(true)
            }}
            icon={
              <VectorIcon
                type={'AntDesign'}
                name={'pluscircle'}
                size={getFontSize(35)}
                color={theme.color.primary}
              />
            }
            iconContainerStyle={{backgroundColor: theme.color.transparent}}
            containerStyle={{backgroundColor: theme.color.transparent}}
            buttonStyle={{backgroundColor: theme.color.transparent}}
          />
          <AddProduct
          isModalVisible={productModal}
          onRequestClose={onRequestClose}
          onCloseModal = {()=>onRequestClose()}
          />
        </>
      ) : (
        <>
          {setIcon(item.routeNames, isCurentTab)}
          <Text
            style={[
              {
                fontFamily: theme.font.ArialLgt,
                color: theme.color.outlineColor,
                fontSize: getFontSize(10),
                fontWeight: '400',
                // textTransform: 'uppercase',
              },
              isCurentTab && {
                color: theme.color.accent,
                fontWeight: '700',
              },
            ]}>
            {item.title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

export default TabBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName={'HomePage'}
      tabBarOptions={{
        animationEnabled: true,
        swipeEnabled: true, // Enable swipe gesture to switch tabs
        swipeVelocityThreshold: 10, // Adjust the threshold for swipe velocity
      }}
      tabBar={navigation => {
        const {state} = navigation;
        const currentTab = state.index;

        return (
          <View
            style={[
              {
                width: '100%',
                backgroundColor: theme.color.accent,
                borderTopLeftRadius: getResWidth(10),
                borderTopRightRadius: getResWidth(10),
                marginTop: -getResHeight(10),
              },
              {
                backgroundColor: theme.color.accent,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: -0.5,
                },
                shadowOpacity: 0.1,
                shadowRadius: 10.0,
                elevation: 24,
              },
            ]}>
            <View
              style={{
                width: wp(95),
                height: navigation.insets.bottom
                  ? getResHeight(45) + navigation.insets.bottom
                  : getResHeight(60),
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              {arrOfTab.map((item, index) => {
                return (
                  <TabBarRender
                    navigation={navigation}
                    index={index}
                    item={item}
                    activeTab={currentTab}
                  />
                );
              })}
            </View>
          </View>
        );
      }}>
      {arrOfTab.map(e => (
        <Tab.Screen name={e.routeNames} component={e.component} />
      ))}
    </Tab.Navigator>
  );
};

