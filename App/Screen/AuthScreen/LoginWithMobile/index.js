import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import InputField from '../../../Container/InputField'
import Button from '../../../Container/Button'
import { isValidMobile } from '../../../Service/Valid'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'

const LoginWithMobile = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        mobile: '',
        mobileErr: ''
    })

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

    const onChangeMobile = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            mobile: value,
            mobileErr: ''
        }))
    }, [state.mobile])

    const onSignInEmail = useCallback(async () => {
        navigation.navigate('Login')
    })

    const onSignUp = useCallback(async () => {
        navigation.navigate('SignUp')
    })

    const onSubmit = useCallback(async () => {
        if (state.mobile.trim() == '') {
            setState(prev => ({
                ...prev,
                mobileErr: 'Enter Mobile Number'
            }))
            return;
        } else if (!isValidMobile(state.mobile)) {
            setState(prev => ({
                ...prev,
                mobileErr: 'Enter a Valid Mobile Number'
            }))
        } else {
            try {
                showLoading();
                let datas = {
                    type: 'PLANT',
                    phone: state.mobile
                }
                let response = await Apis.signin_mobile(datas);
                if (__DEV__) {
                    console.log('SignInOtpSend', JSON.stringify(response))
                }
                if (response.success) {
                    navigation.navigate('OtpValidate', { data: response?.data, page: 'login' })
                }
                hideLoading();
                ToastMessage(response?.message);
            } catch (error) {
                if (__DEV__) {
                    console.log(error)
                }
                hideLoading();
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
                    <View style={{ alignItems: 'center', marginBottom: '6%' }}>
                        <Image source={ImagePath.logo} style={styles.logo} />
                        <Text style={CommonStyle.headingText}>Sign In With Mobile</Text>
                    </View>
                    <InputField
                        name={'Mobile'}
                        value={state.mobile}
                        onChangeText={onChangeMobile}
                        maxLength={10}
                        error={state.mobileErr}
                    />
                    <View style={{ marginTop: '8%' }}>
                        <Button
                            name={'Sign In'}
                            onPress={onSubmit}
                            loading={state.loading}
                            width={'80%'}
                        />
                    </View>
                    <Text style={[CommonStyle.boldblacktext, { textAlign: 'center' }]}>OR</Text>
                    <Button
                        name={'Sign In With Email'}
                        onPress={onSignInEmail}
                        loading={false}
                        width={'80%'}
                    />
                    {/* <Text style={styles.btmText}>Not yet registered ? <Text onPress={onSignUp} style={CommonStyle.boldtext}>Create an account</Text></Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginWithMobile