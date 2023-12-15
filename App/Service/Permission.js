import { PERMISSIONS, check, request, RESULTS } from "react-native-permissions";
import { Platform, Alert, Linking } from 'react-native'

export const LocationPermission = async () => {
    try {
        let permission;
        if (Platform.OS == 'android') {
            permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        } else if (Platform.OS == 'ios') {
            permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        }
        let result = await check(permission)
        if (result == RESULTS.GRANTED) {
            return true
        } else if (result == RESULTS.DENIED) {
            let res = await RequestLocation();
            return res;
        } else if (result == RESULTS.UNAVAILABLE) {
            return false;
        } else {
            let res = await RequestLocation();
            return res;
        }
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return false
    }
}

export const Permissions = async (permission) => {
    try {
        let result = await check(permission)
        if (result == RESULTS.GRANTED) {
            return true
        } else if (result == RESULTS.DENIED) {
            let res = await request(permission);
            if (res == RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } else if (result == RESULTS.UNAVAILABLE) {
            return false;
        } else {
            let res = await request(permission);
            if (res == RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return false
    }
}

export const CameraPermission = async () => {
    let result;
    if (Platform.OS == 'android') {
        result = await Permissions(PERMISSIONS.ANDROID.CAMERA)
        return result
    } else if (Platform.OS == 'ios') {
        result = await Permissions(PERMISSIONS.IOS.CAMERA)
        return result
    } else {
        return false
    }
}

export const GalleryPermission = async () => {
    let result;
    if (Platform.OS == 'android') {
        result = await Permissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
        return result
    } else if (Platform.OS == 'ios') {
        result = await Permissions(PERMISSIONS.IOS.PHOTO_LIBRARY)
        return result
    } else {
        return false
    }
}

export const RequestLocation = async () => {
    try {
        let requests;
        if (Platform.OS == 'android') {
            requests = await request(
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'EcoEx App need to access your Location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                }
            );
        } else if (Platform.OS == 'ios') {
            requests = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }

        if (requests == RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return false;
    }
}

export const OpenAppSetting = async () => {
    Alert.alert(
        'Permission Required',
        'Please enable location services in your app settings.',
        [
            // {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            // },
            {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
            },
        ],
        { cancelable: false }
    );
}