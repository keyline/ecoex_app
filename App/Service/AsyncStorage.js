import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserData = async (data) => {
    try {
        await AsyncStorage.setItem('userdata', JSON.stringify(data));
        return true;
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return false;
    }
}

export const getUserData = async () => {
    try {
        const userdata = await AsyncStorage.getItem('userdata');
        if (userdata) {
            return JSON.parse(userdata);
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

export const setAccessToken = async (data) => {
    try {
        await AsyncStorage.setItem('accessToken', data);
        return true;
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return false;
    }
}

export const getAccessToken = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            return accessToken;
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

export const clearUserData = async () => {
    try {
        let key = ['accessToken', 'userdata', 'fcmToken']
        await AsyncStorage.multiRemove(key);
        return true;
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return false;
    }
}

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return false;
    }
}