import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../../Screen/Plant/PlantDashBoard';
import PlantDashBoard from '../../Screen/Plant/PlantDashBoard';
import AddRequest from '../../Screen/Plant/AddRequest';
import ProcessRequest from '../../Screen/Plant/ProcessRequest';
import CompleteRequest from '../../Screen/Plant/CompleteRequest';
import RejectRequest from '../../Screen/Plant/RejectRequest';
import PlantEditProfile from '../../Screen/Plant/PlantEditProfile';
import PlantChangePassword from '../../Screen/Plant/PlantChangePassword';
import PdfViewer from '../../Screen/PdfViewer';
import EditRequest from '../../Screen/Plant/EditRequest';
import PlantNotification from '../../Screen/Plant/PlantNotification';
import WebView from '../../Screen/WebView';
import StaticPage from '../../Screen/StaticPage';
import PendingRequest from '../../Screen/Plant/PendingRequest';
import RequestDetails from '../../Screen/Plant/RequestDetails';
import ProcessesRequestDetails from '../../Screen/Plant/ProcessesRequestDetails';

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
            <Stack.Screen name='RequestDetails' component={RequestDetails} />
            <Stack.Screen name='PlantEditProfile' component={PlantEditProfile} />
            <Stack.Screen name='PlantChangePassword' component={PlantChangePassword} />
            <Stack.Screen name='PdfViewer' component={PdfViewer} />
            <Stack.Screen name='EditRequest' component={EditRequest} />
            <Stack.Screen name='PlantNotification' component={PlantNotification} />
            <Stack.Screen name='WebView' component={WebView} />
            <Stack.Screen name='StaticPage' component={StaticPage} />
            <Stack.Screen name='PendingRequest' component={PendingRequest} />
            <Stack.Screen name='ProcessesRequestDetails' component={ProcessesRequestDetails} />
        </Stack.Navigator>
    )
}

export default PlantMainStack