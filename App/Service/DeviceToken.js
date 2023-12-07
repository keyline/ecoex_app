import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid } from 'react-native'
import { setFcmToken } from './AsyncStorage';


export const getFcmPermission = async () => {
    return status = new Promise(async (resolve, reject) => {
        try {
            const authStatus = await messaging().hasPermission();
            const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (__DEV__) {
                console.log('fcmPermission', enabled)
            }
            if (!enabled) {
                if (Platform.OS == 'android') {
                    let permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                    if (permission == 'granted') {
                        resolve(true);
                    } else {
                        resolve(false)
                    }
                } else {
                    let permission = await messaging().requestPermission();
                    const enabledd = permission === messaging.AuthorizationStatus.AUTHORIZED ||
                        permission === messaging.AuthorizationStatus.PROVISIONAL;
                    resolve(enabledd)
                }
            } else {
                resolve(enabled)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const generateFcmToken = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            await setFcmToken(fcmToken);
            // console.log('fcmToken', fcmToken);
            return fcmToken;
        } else {
            return null;
        }
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return null;
    }
}