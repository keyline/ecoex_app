import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../../Screen/Plant/PlantDashBoard';
import PlantDashBoard from '../../Screen/Plant/PlantDashBoard';
import AddRequest from '../../Screen/Plant/AddRequest';
import ProcessRequest from '../../Screen/Plant/ProcessRequest';
import CompleteRequest from '../../Screen/Plant/CompleteRequest';
import RejectRequest from '../../Screen/Plant/RejectRequest';
import ProcessesRequestDetails from '../../Screen/Plant/ProcessesRequestDetails';
import PlantEditProfile from '../../Screen/Plant/PlantEditProfile';
import PlantChangePassword from '../../Screen/Plant/PlantChangePassword';

const PlantMainStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='PlantDashBoard' component={PlantDashBoard} />
            <Stack.Screen name='AddRequest' component={AddRequest} />
            <Stack.Screen name='ProcessRequest' component={ProcessRequest} />
            <Stack.Screen name='CompleteRequest' component={CompleteRequest} />
            <Stack.Screen name='RejectRequest' component={RejectRequest} />
            <Stack.Screen name='ProcessesRequestDetails' component={ProcessesRequestDetails} />
            <Stack.Screen name='PlantEditProfile' component={PlantEditProfile} />
            <Stack.Screen name='PlantChangePassword' component={PlantChangePassword} />

        </Stack.Navigator>
    )
}

export default PlantMainStack