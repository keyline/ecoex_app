import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { Colors } from '../Utils/Colors';
import MainStack from './MainStack';
import AddRequest from '../Screen/AddRequest_old';

const DrawerStack = () => {

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
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name='MainStack' component={MainStack} />
            {/* <Drawer.Screen name='AddRequest' component={AddRequest} /> */}

        </Drawer.Navigator>
    )
}

export default DrawerStack