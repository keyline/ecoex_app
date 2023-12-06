import Geolocation from 'react-native-geolocation-service';


export const getCurrentLocation = async () => {
    try {
        return new Promise(async (resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    resolve(position)
                },
                error => {
                    reject(error)
                },
                { enableHighAccuracy: true, timeout: 50000, maximumAge: 3600000 }
            )
        })
    } catch (error) {
        console.log('error', error);
        return error;
    }
}