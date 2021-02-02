import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/home/home.screen';
import ProfileScreen from '../screens/profile/Profile.screen';
import UploadVideoScreen from '../screens/upload-video/upload-video.screen';
import { MenuOptionsParamList } from '../types';
import { Colors } from '../shared/theme';

const Drawer = createDrawerNavigator<MenuOptionsParamList>();

export default function MenuSlideNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: Colors.LIGHT_PRIMARY,
      }}
      drawerContentOptions={{
        activeTintColor: Colors.WHITE, 
        activeBackgroundColor: Colors.DARK_PRIMARY, 
        inactiveTintColor: Colors.BLACK, 
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="UploadVideo" component={UploadVideoScreen} />
    </Drawer.Navigator>
  );
}
