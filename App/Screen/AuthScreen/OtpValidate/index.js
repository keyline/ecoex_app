import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useCallback, useContext, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import AuthContext from '../../../Service/Context'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Colors } from '../../../Utils/Colors'
import Button from '../../../Container/Button'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import LoaderTransparent from '../../../Container/LoaderTransparent'
import { setAccessToken, setUserData } from '../../../Service/AsyncStorage'
import DeviceInfo from 'react-native-device-info'
import { generateFcmToken, getFcmPermission } from '../../../Service/DeviceToken'

const OtpValidate = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { siteData } = context.allData

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        page: route?.params?.page,
        data: route?.params?.data,
        otp: '',
        otpErr: ''
    })
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                })
            }
        }, 1000) //each count lasts for a second
        return () => clearInterval(interval)
    }, [timer]);

    const showLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }))
    }, [state.loading])

    const hideLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: false
        }))
    }, [state.loading])

    const onChangeOtp = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            otp: value
        }))
    }, [state.otp])

    const onResendOtp = useCallback(async () => {
        try {
            showLoading();
            if (state.page == 'login') {
                let datas = {
                    type: 'PLANT',
                    phone: state.data?.phone
                }
                var res = await Apis.signin_mobile(datas);
                if (__DEV__) {
                    console.log('loginOtpResend', JSON.stringify(res))
                }
            } else {
                let datas = {
                    id: state.data?.id
                }
                var res = await Apis.resend_otp(datas)
                if (__DEV__) {
                    console.log('ResendOtp', JSON.stringify(res))
                }
            }
            if (res.success) {
                setState(prev => ({
                    ...prev,
                    data: res?.data
                }))
                setTimer(60);
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

    const onSubmit = useCallback(async () => {
        const { otp, data, page } = state;
        if (otp.trim() == '') {
            ToastMessage('Enter OTP');
            return;
        } else if (otp.length < 6) {
            ToastMessage('Enter Valid OTP');
            return;
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    btnLoading: true
                }))
                if (page == 'login') {
                    let premission = await getFcmPermission();
                    let token = await generateFcmToken();
                    let deviceId = DeviceInfo.getDeviceId();
                    let datas = {
                        phone: state.data?.phone,
                        otp: state.otp,
                        device_token: deviceId,
                        fcm_token: token ? token : '',
                    }
                    var response = await Apis.signin_mobile_otpvalidate(datas)
                    if (__DEV__) {
                        console.log('loginOtpSubmit')
                    }
                    if (response.success) {
                        let userdata = response?.data;
                        if (userdata?.type == 'PLANT') {
                            let token = response?.data?.app_access_token
                            await setUserData(userdata);
                            await setAccessToken(token);
                            // await context.onGetStoreData();
                            await context.setState(prevState => ({
                                ...prevState,
                                userdata: userdata,
                                accesstoken: token,
                                isLogin: true
                            }))
                        } else {
                            ToastMessage(`${userdata?.type} Pannel Comming Soon`);
                            hideLoading();
                        }
                    } else {
                        hideLoading();
                        ToastMessage(response?.message);
                    }
                } else {
                    let datas = {
                        id: data?.id,
                        otp: otp
                    }
                    var response = await Apis.validate_otp(datas);
                    if (__DEV__) {
                        console.log('ValidateOtp', JSON.stringify(response))
                    }
                    if (response.success) {
                        navigation.replace('ResetPassword', { data: response?.data });
                    }
                }
                setState(prev => ({
                    ...prev,
                    btnLoading: false
                }))
                ToastMessage(response?.message);
            } catch (error) {
                if (__DEV__) {
                    console.log(error)
                }
                setState(prev => ({
                    ...prev,
                    btnLoading: false
                }))
                ToastError();
            }
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <View style={CommonStyle.headerContainer}>
                <Image source={ImagePath.shape} style={CommonStyle.headerImage} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bodyContent}>
                    <View style={{ alignItems: 'center', marginBottom: '8%' }}>
                        <Image source={(siteData && siteData.site_logo) ? { uri: siteData?.site_logo } : ImagePath.logo} style={styles.logo} />
                        <Text style={CommonStyle.boldtext}>OTP Validate</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[CommonStyle.boldtext, { marginBottom: '8%' }]}>Enter OTP :</Text>
                        <OTPInputView
                            pinCount={6}
                            code={state.otp}
                            autoFocusOnLoad={false}
                            onCodeChanged={code => onChangeOtp(code)}
                            style={styles.otp}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            placeholderTextColor={Colors.black}
                        // onCodeFilled={(code) => onSubmitOtp(code)}
                        />
                    </View>
                    <View style={styles.resendContainer}>
                        {(timer > 0) ?
                            <Text style={styles.resendTimer}>Resend OTP in <Text style={{ color: Colors.theme_color }}>{timer} Sec</Text></Text>
                            :
                            <Text onPress={onResendOtp} style={styles.resendText}>Resend OTP</Text>
                        }
                    </View>
                    <View style={{ marginTop: '6%' }}>
                        <Button
                            name={'Verify'}
                            onPress={onSubmit}
                            loading={state.btnLoading}
                            width={'80%'}
                        />
                    </View>
                </View>
            </ScrollView>
            {(state.loading) && (
                <LoaderTransparent loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default OtpValidate