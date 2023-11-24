import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';


export const ToastMessage = (message) => {
    Toast.show(message, Toast.LONG);
}

export const ToastError = () => {
    Toast.show('Something Went Wrong', Toast.LONG);
}

export const LaunchImageLibary = async () => {
    let options = {
        mediaType: 'photo',
        maxHeight: 250,
        maxWidth: 250,
        quality: 1,
        includeBase64: false,
    }
    let response = await launchImageLibrary(options)
    return response;
}

export const LaunchCamera = async () => {
    let options = {
        mediaType: 'photo',
        maxHeight: 250,
        maxWidth: 250,
        quality: 1,
        includeBase64: false,
    }
    let response = await launchCamera(options)
    return response;
}

export const GetFileExtention = (url) => {
    let extention = url.substring(url.lastIndexOf('.') + 1, url.length);
    return extention
}