import { View, Text, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import AuthContext from '../../Service/Context';
import { useNavigation } from '@react-navigation/native';
import { ImagePath } from '../../Utils/ImagePath';
import { LaunchCamera, LaunchImageLibary, ToastError, ToastMessage } from '../../Service/CommonFunction';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Colors } from '../../Utils/Colors';
import Apis from '../../Service/Apis';
import ImageOptions from '../../Container/ImageOptions';
import ImageView from '../../Container/ImageView';
import LoaderTransparent from '../../Container/LoaderTransparent';
import { styles } from './styles';

const PlantCustomDrawer = (props) => {

    const context = useContext(AuthContext);
    const { siteData, userProfile, appVersion } = context.allData
    const navigation = useNavigation();
    const [state, setState] = useState({
        loadingNew: false,
        pickerModal: false,
        viewImgeUri: ''
    })

    const menuList = [
        { id: 1, name: 'Home', screen: 'PlantDashBoard', icon: ImagePath.home, logiReq: false },
        { id: 2, name: 'Add Request', screen: 'AddRequest', icon: ImagePath.request, logiReq: true },
        { id: 3, name: 'Process Request', screen: 'ProcessRequest', icon: ImagePath.pending, logiReq: false },
        { id: 4, name: 'Complete Request', screen: 'CompleteRequest', icon: ImagePath.complete, logiReq: false },
        { id: 5, name: 'Reject Request', screen: 'RejectRequest', icon: ImagePath.reject, logiReq: false },
        { id: 6, name: 'Notification', screen: 'PlantNotification', icon: ImagePath.bell, logiReq: false },
        { id: 7, name: 'Edit Profile', screen: 'PlantEditProfile', icon: ImagePath.edit_profile, logiReq: false },
        { id: 8, name: 'Change Password', screen: 'PlantChangePassword', icon: ImagePath.lock, logiReq: false },
        { id: 9, name: 'Privacy Policy', screen: 'StaticPage', slung: 'privacy-policy', icon: ImagePath.privacy_policy, logiReq: false },
        { id: 10, name: 'Terms and Conditions', screen: 'StaticPage', slung: 'terms-conditions', icon: ImagePath.terms_condition, logiReq: false },
        { id: 11, name: 'Sign Out', screen: 'LogOut', icon: ImagePath.logout, logiReq: false },
        { id: 12, name: 'Delete Account', screen: 'Delete_account', icon: ImagePath.delete_acnt, logiReq: false },
    ]

    const Icon = ({ props, source }) => (
        <Image source={source} style={{ width: props?.size, height: props?.size, tintColor: props?.color, resizeMode: 'contain' }} />
    )

    const onMenuPress = useCallback(async (item) => {
        if (item) {
            if (item.screen && item.screen == 'LogOut') {
                SignOutAlert();
            } else if (item?.screen == 'Delete_account') {
                DeleteAcntAlert();
            } else if (item.screen && item.screen == 'StaticPage') {
                navigation.navigate(item.screen, { page: item?.slung })
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

    const DeleteAcntAlert = useCallback(async () => {
        Alert.alert(
            'Delete Account',
            'Do you really want to Delete your account?',
            [
                {
                    text: 'Yes',
                    onPress: () => onDeleteAccount()
                },
                {
                    text: 'No',
                    onPress: () => null
                }
            ],
            { cancelable: true }
        )
    })

    const onDeleteAccount = useCallback(async () => {
        try {
            let res = await Apis.delete_acnt();
            if (__DEV__) {
                console.log('DeleteAccount', JSON.stringify(res))
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

    const showLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loadingNew: true
        }))
    })

    const hideLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loadingNew: false
        }))
    })

    const onShowPicker = useCallback(async () => {
        setState(prev => ({
            ...prev,
            pickerModal: true
        }))
    })

    const onHidePicker = useCallback(async () => {
        setState(prev => ({
            ...prev,
            pickerModal: false
        }))
    })

    const onSelectImageOption = useCallback(async (value) => {
        try {
            if (value == 1) {
                let libaryImageRes = await LaunchImageLibary(true, 1);
                // if (__DEV__) {
                //     console.log('LibaryImage', libaryImageRes)
                // }
                onHidePicker();
                if (libaryImageRes.assets && libaryImageRes.assets.length > 0) {
                    onUpdateImage(libaryImageRes.assets[0]);
                }
            } else {
                let cameraImageRes = await LaunchCamera(true);
                // if (__DEV__) {
                //     console.log('CameraImage', cameraImageRes)
                // }
                onHidePicker();
                if (cameraImageRes.assets && cameraImageRes.assets.length > 0) {
                    onUpdateImage(cameraImageRes.assets[0]);
                }
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    const onUpdateImage = useCallback(async (image) => {
        try {
            showLoading();
            let datas = {
                profile_image: [image]
            }
            let res = await Apis.update_profile_image(datas);
            if (__DEV__) {
                console.log('UploadImage', JSON.stringify(res))
            }
            if (res.success) {
                await context.onGetUserProfile();
            }
            hideLoading();
            ToastMessage(res?.message);
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    const onViewImage = useCallback(async () => {
        setState(prev => ({
            ...prev,
            viewImgeUri: userProfile?.profile_image
        }))
    })

    const onHideImageView = useCallback(async () => {
        setState(prev => ({
            ...prev,
            viewImgeUri: null
        }))
    })

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                {/* <DrawerItemList {...props} /> */}
                <View style={styles.imgContainer}>
                    <TouchableOpacity onPress={onViewImage} disabled={userProfile?.profile_image ? false : true} activeOpacity={0.5} style={styles.imgContent}>
                        <Image source={userProfile?.profile_image ? { uri: userProfile?.profile_image } : ImagePath.dp} style={styles.profileImg} />
                    </TouchableOpacity>
                    <Text style={styles.nameText}>{userProfile?.company_name}</Text>
                    <TouchableOpacity onPress={onShowPicker} activeOpacity={0.5} style={styles.editContainer}>
                        <Image source={ImagePath.edit_image} style={styles.editIcoon} />
                    </TouchableOpacity>
                </View>
                {((userProfile?.is_contract_expire == 0) ? menuList.filter(obj => obj.logiReq == false) : menuList).map((item, key) => (
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
            {(appVersion) && (
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Version {appVersion}</Text>
                </View>
            )}
            <ImageOptions
                modalVisible={state.pickerModal}
                onHideModal={onHidePicker}
                onSortItemSelect={onSelectImageOption}
            />
            {(state.viewImgeUri) && (
                <ImageView
                    imageUri={state.viewImgeUri}
                    onClose={onHideImageView}
                />
            )}
            {(state.loadingNew) && (
                <LoaderTransparent loading={state.loadingNew} />
            )}
        </View>
    )
}

export default PlantCustomDrawer