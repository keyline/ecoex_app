import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import VendorCustomDrawer from './VendorCustomDrawer';
import { Colors } from '../../Utils/Colors';
import VendorMainStack from './VendorMainStack';

const VendorDrawerStack = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 2,
          borderColor: Colors.theme_color,
          backgroundColor: Colors.white
        }
      }}
      drawerContent={(props) => <VendorCustomDrawer {...props} />}
    >
      <Drawer.Screen name='VendorMainStack' component={VendorMainStack} />

    </Drawer.Navigator>
  )
}

export default VendorDrawerStack