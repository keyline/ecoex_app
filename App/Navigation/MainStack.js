import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../Screen/Plant/PlantDashBoard';
import AddRequest from '../Screen/AddRequest_old';
import ProcessRequest from '../Screen/ProcessRequest_old';
import ProcessRequestDetails from '../Screen/ProcessRequestDetails';

const MainStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='DashBoard' component={DashBoard} />
            <Stack.Screen name='AddRequest' component={AddRequest} />
            <Stack.Screen name='ProcessRequest' component={ProcessRequest} />
            <Stack.Screen name='ProcessRequestDetails' component={ProcessRequestDetails} />
        </Stack.Navigator>
    )
}

export default MainStack