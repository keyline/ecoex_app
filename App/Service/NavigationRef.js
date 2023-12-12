import { createNavigationContainerRef } from '@react-navigation/native';
import { getAccessToken, getUserData } from './AsyncStorage';

export const navigationRef = createNavigationContainerRef();

export async function navigate(data) {
    // if (data && data.screen) {
    //     navigationRef.navigate(data.screen);
    // } else {
    //     console.log('navi')
    // }
    let token = await getAccessToken();
    let userdata = await getUserData();
    if (token && token != null) {
        if (userdata && userdata?.type == 'PLANT') {
            navigationRef.navigate('PlantNotification')
        } else {
            console.log('wrong user')
        }
    } else {
        console.log('navi', JSON.stringify(data))
    }
}
