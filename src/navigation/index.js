import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import AuthNavigation from './authnav';
import MainNavigation from './mainnav';
import { DrawerItem } from '../Screens';

const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function FliikNavigation(props) {
  const {isLogedIn} = props;
  return (
    <Drawer.Navigator
    initialRouteName={!isLogedIn ? "MainNavigation" : "AuthNavigation"}
    drawerContent={(props) => <DrawerItem {...props} />}
  
     screenOptions={{
    drawerStyle: {
      backgroundColor: '#c6cbef',
      width: "70%",
    borderBottomRightRadius:40
    },
  }}
    
  
    >
      {MainNavigation()}
      {AuthNavigation()} 
    </Drawer.Navigator>
  );
}
