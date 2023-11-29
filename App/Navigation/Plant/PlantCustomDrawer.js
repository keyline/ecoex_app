import { View, Text, Image, Alert } from 'react-native'
import React, { useCallback, useContext } from 'react'
import AuthContext from '../../Service/Context';
import { useNavigation } from '@react-navigation/native';
import { ImagePath } from '../../Utils/ImagePath';
import { ToastError, ToastMessage } from '../../Service/CommonFunction';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Colors } from '../../Utils/Colors';
import { styles } from '../styles';
import Apis from '../../Service/Apis';

const PlantCustomDrawer = (props) => {

    const context = useContext(AuthContext)
    const navigation = useNavigation();

    const menuList = [
        { id: 1, name: 'Home', screen: 'PlantDashBoard', icon: ImagePath.home, logiReq: true },
        { id: 2, name: 'Add Request', screen: 'AddRequest', icon: ImagePath.home, logiReq: true },
        { id: 3, name: 'Process Request', screen: 'ProcessRequest', icon: ImagePath.home, logiReq: true },
        { id: 4, name: 'Complete Request', screen: 'CompleteRequest', icon: ImagePath.home, logiReq: true },
        { id: 5, name: 'Reject Request', screen: 'RejectRequest', icon: ImagePath.home, logiReq: true },
        { id: 6, name: 'Edit Profile', screen: 'PlantEditProfile', icon: ImagePath.home, logiReq: true },
        { id: 7, name: 'Sign Out', screen: 'LogOut', icon: ImagePath.logout, logiReq: true },
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
            'Do you really want to Sign Out?',
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
            let res = await Apis.sign_out();
            if (__DEV__) {
                console.log('SignOut', JSON.stringify(res))
            }
            if (res.success) {
                await context.onClearStoreData();
            }
            ToastMessage(res?.message);
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
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