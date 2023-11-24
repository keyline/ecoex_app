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

const OtpValidate = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { siteData } = context.allData

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
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
    }, []);

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
            let datas = {
                id: state.data?.id
            }
            let res = await Apis.resend_otp(datas)
            if (__DEV__) {
                console.log('ResendOtp', JSON.stringify(res))
            }
            if (res.success) {
                setState(prev => ({
                    ...prev,
                    data: res?.data
                }))
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
        // navigation.replace('ResetPassword');
        // return
        const { otp, data } = state;
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
                let datas = {
                    id: data?.id,
                    otp: otp
                }
                let response = await Apis.validate_otp(datas);
                if (__DEV__) {
                    console.log('ValidateOtp', JSON.stringify(response))
                }
                if (response.success) {
                    navigation.replace('ResetPassword', { data: response?.data });
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