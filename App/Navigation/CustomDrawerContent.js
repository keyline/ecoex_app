import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { ImagePath } from '../Utils/ImagePath';
import { styles } from './styles';
import { Colors } from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native'
import { ToastError, ToastMessage } from '../Service/CommonFunction';
import AuthContext from '../Service/Context';

const CustomDrawerContent = (props) => {

    const context = useContext(AuthContext)
    const navigation = useNavigation();

    const menuList = [
        { id: 1, name: 'Home', screen: 'DashBoard', icon: ImagePath.home, logiReq: false },
        { id: 2, name: 'Add Request', screen: 'AddRequest', icon: ImagePath.home, logiReq: true },
        { id: 3, name: 'Process Request', screen: 'ProcessRequest', icon: ImagePath.home, logiReq: false },
        { id: 4, name: 'Log Out', screen: 'LogOut', icon: ImagePath.logout, logiReq: true },
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

export default CustomDrawerContent