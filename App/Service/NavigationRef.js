import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(data) {
    // if (data && data.screen) {
    //     navigationRef.navigate(data.screen);
    // } else {
    //     console.log('navi')
    // }
    console.log('navi', JSON.stringify(data))
}
