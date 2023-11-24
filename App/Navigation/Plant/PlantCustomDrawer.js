import { View, Text, Image, Alert } from 'react-native'
import React, { useCallback, useContext } from 'react'
import AuthContext from '../../Service/Context';
import { useNavigation } from '@react-navigation/native';
import { ImagePath } from '../../Utils/ImagePath';
import { ToastError, ToastMessage } from '../../Service/CommonFunction';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Colors } from '../../Utils/Colors';
import { styles } from '../styles';

const PlantCustomDrawer = (props) => {

    const context = useContext(AuthContext)
    const navigation = useNavigation();

    const menuList = [
        { id: 1, name: 'Home', screen: 'PlantDashBoard', icon: ImagePath.home, logiReq: false },
        { id: 2, name: 'Add Request', screen: 'AddRequest', icon: ImagePath.home, logiReq: true },
        { id: 3, name: 'Process Request', screen: 'ProcessRequest', icon: ImagePath.home, logiReq: false },
        { id: 4, name: 'Complete Request', screen: 'CompleteRequest', icon: ImagePath.home, logiReq: false },
        { id: 5, name: 'Reject Request', screen: 'RejectRequest', icon: ImagePath.home, logiReq: false },
        // { id: 4, name: 'Log Out', screen: 'LogOut', icon: ImagePath.logout, logiReq: true },
    ]

    const Icon = ({ props, source }) => (
        <Image source={source} style={{ width: props?.size, height: props?.size, tintColor: props?.color, resizeMode: 'contain' }} />
    )

    const onMenuPress = useCallback(async (item) => {
        if (item) {
            if (item.screen && item.screen == 'LogOut') {
                SignOutAlert();
            } else if (item?.screen) {
                navigation.navigate(item.screen)
            }
        } else {

        }
    })

    const SignOutAlert = useCallback(async () => {
        Alert.alert(
            'Sign Out',
            'Are you Really Want to Sign Out?',
            [
                {
                    text: 'Yes',
                    onPress: () => onSignOut()
                },
                {
                    text: 'No',
                    onPress: () => null
                }
            ],
            { cancelable: true }
        )
    })

    const onSignOut = useCallback(async () => {
        try {
            await context.onClearStoreData();
            ToastMessage('SignOut Successfully')
        } catch (error) {
            ToastError();
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                {/* <DrawerItemList {...props} /> */}
                {menuList.map((item, key) => (
                    <DrawerItem
                        key={key}
                        label={item.name}
                        onPress={() => onMenuPress(item)}
                        labelStyle={styles.menuText}
                        icon={(props) => (<Icon source={item.icon} props={props} />)}
                        activeTintColor={Colors.theme_light}
                        inactiveTintColor={Colors.grey}
                        focused={props.state.routeNames[props.state.index] === item.screen}
                        pressColor={Colors.theme_light}
                        style={{ marginVertical: 0 }}
                    />
                ))}
            </DrawerContentScrollView>
        </View>
    )
}

export default PlantCustomDrawer