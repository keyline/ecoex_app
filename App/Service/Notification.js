import { Platform } from "react-native"
import notifee, { AndroidImportance } from '@notifee/react-native';

export const Notification = async (title, body, data) => {
    try {
        // Request permissions (required for iOS)
        if (Platform.OS == 'ios') {
            await notifee.requestPermission();
        }

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            // sound: 'notification',
            importance: AndroidImportance.HIGH,
        });
        // console.log('channel', channelId)
        // Display a notification
        await notifee.displayNotification({
            id: 'ecoex',
            title: title,
            body: body,
            data: data ? data : {},
            android: {
                channelId,
                smallIcon: 'ic_notif',
                sound: 'notification',
                importance: AndroidImportance.HIGH,
                color: '#2DA952' // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                //   pressAction: {
                //     id: 'default',
                //   },
            },
        });
    } catch (error) {
        console.log('NotifeeError', error)
    }

}