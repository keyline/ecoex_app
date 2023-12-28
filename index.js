/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'whatwg-fetch';

AppRegistry.registerComponent(appName, () => App);

messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Handle background notifications here
    if (__DEV__) {
        console.log('Message handled in the background:', remoteMessage);
    }
});