import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import PlantCustomDrawer from './PlantCustomDrawer'
import { createDrawerNavigator } from '@react-navigation/drawer'
import PlantMainStack from './PlantMainStack'

const PlantDrawerStack = () => {

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
            drawerContent={(props) => <PlantCustomDrawer {...props} />}
        >
            <Drawer.Screen name='PlantMainStack' component={PlantMainStack} />
            {/* <Drawer.Screen name='AddRequest' component={AddRequest} /> */}

        </Drawer.Navigator>
    )
}

export default PlantDrawerStack