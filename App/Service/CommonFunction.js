import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid, Platform } from 'react-native';
import moment from 'moment';
import { CameraPermission, GalleryPermission } from './Permission';

export const ToastMessage = (message) => {
    Toast.show(message, Toast.LONG);
}

export const ToastError = () => {
    Toast.show('Something Went Wrong', Toast.LONG);
}

export const generateRandomId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const dateConvertNew = (value) => {
    if (value) {
        return moment(new Date(value)).format("DD-MM-YYYY")
    } else {
        return null
    }
}

export const dateConvertMnth = (value) => {
    if (value) {
        return moment(new Date(value)).format("MM-DD-YYYY")
    } else {
        return null
    }
}

export const dateConvertYear = (value) => {
    if (value) {
        return moment(new Date(value)).format("YYYY-MM-DD")
    } else {
        return null
    }
}

export const LaunchImageLibary = async (base64, selectionLimit) => {
    try {
        let result = await GalleryPermission();
        // if (result == false) {
        //     ToastMessage('Gallery Permission Required')
        // }
        let limit = 1
        if (selectionLimit) {
            if (Platform.OS == 'android' && Platform.Version >= 33) {
                limit = selectionLimit
            } else if (Platform.OS == 'ios' && Platform.Version >= 14) {
                limit = selectionLimit
            } else {
                limit = 1
            }
        }
        let options = {
            mediaType: 'photo',
            maxHeight: 800,
            maxWidth: 800,
            quality: 1,
            includeBase64: base64 ? base64 : false,
            selectionLimit: limit ? limit : 1
        }
        let response = await launchImageLibrary(options)
        return response;
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return error;
    }
}

export const LaunchCamera = async (base64) => {
    try {
        let result = await CameraPermission();
        if (result == false) {
            ToastMessage('Camera Permission Required');
        }
        let options = {
            mediaType: 'photo',
            maxHeight: 800,
            maxWidth: 800,
            quality: 1,
            includeBase64: base64 ? base64 : false,
        }
        let response = await launchCamera(options)
        // console.log('camera',JSON.stringify(response))
        return response;
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return error;
    }
}

export const GetFileExtention = (url) => {
    let extention = url.substring(url.lastIndexOf('.') + 1, url.length);
    return extention
}

export const DocumentPickers = async (multiple) => {
    try {
        let res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
            allowMultiSelection: multiple ? multiple : false
        })
        // console.log('PickerResponse', JSON.stringify(res))
        if (res.length > 0) {
            let array = await Promise.all(res.map(async item => {
                let base64res = await RNFetchBlob.fs.readFile(item.uri, 'base64')
                return { ...item, base64: base64res }
            })
            );
            // console.log('updateArray', JSON.stringify(array))
            return array
        } else {
            return [];
        }
    } catch (error) {
        // throw error
        return error
    }
}

export const GetUniqueArray = (arrays, uniquekey) => {
    try {
        if (arrays.length > 0) {
            const uniqueData = arrays.filter((item, index, array) => {
                const key = item[uniquekey];
                return index === array.findIndex((obj) => obj[uniquekey] === key);
            })
            return uniqueData;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

export const GetUnitfromList = (list, value) => {
    if (list && list.length > 0 && value) {
        let filterarr = list.filter(obj => obj.value == value);
        if (filterarr.length > 0) {
            return filterarr[0].label
        } else {
            return '';
        }
    } else {
        return '';
    }
}

export const getRandomColor = () => {
    const letters = '7B509D';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
};

export async function checkStoragePermission() {
    const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission is granted, perform actions requiring the permission
        console.log('Permission granted');
    } else if (result === PermissionsAndroid.RESULTS.DENIED) {
        // Permission is denied, request it
        const permissionRequestResult = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if (permissionRequestResult === PermissionsAndroid.RESULTS.GRANTED) {
            // Permission granted after request, perform actions
            console.log('Permission granted after request');
        } else {
            // Handle denied permission
            console.log('Permission denied after request');
        }
    } else {
        // Handle other cases (unavailable, blocked, etc.)
        console.log('Permission unavailable or blocked');
    }
}

