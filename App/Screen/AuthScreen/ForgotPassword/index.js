import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import AuthContext from '../../../Service/Context'
import InputField from '../../../Container/InputField'
import Button from '../../../Container/Button'
import { isValidEmail } from '../../../Service/Valid'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'

const ForgotPassword = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { siteData } = context.allData

    const [state, setState] = useState({
        loading: false,
        email: '',
        emailErr: ''
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

    const onChangeEmail = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            email: value,
            emailErr: ''
        }))
    }, [state.email])

    const onSubmit = useCallback(async () => {
        // navigation.navigate('OtpValidate')
        // return
        if (state.email.trim() == '') {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter Email'
            }));
            return;
        } else if (!isValidEmail(state.email)) {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter a Valid Email'
            }));
            return;
        } else {
            try {
                showLoading();
                let datas = {
                    email: state.email
                }
                let response = await Apis.forgot_password(datas);
                if (__DEV__) {
                    console.log('ForgotPassword', JSON.stringify(response))
                }
                if (response.success) {
                    navigation.navigate('OtpValidate', { data: response?.data })
                }
                hideLoading();
                ToastMessage(response?.message)
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
                        <Image source={(siteData && siteData.site_logo) ? { uri: siteData?.site_logo } : ImagePath.logo} style={styles.logo} />
                        <Text style={CommonStyle.boldtext}>Forgot Password</Text>
                    </View>
                    <InputField
                        name={'Email'}
                        value={state.email}
                        onChangeText={onChangeEmail}
                        keyboardType={'email-address'}
                        error={state.emailErr}
                    />
                    <View style={{ marginTop: '8%' }}>
                        <Button
                            name={'Send OTP'}
                            onPress={onSubmit}
                            loading={state.loading}
                            width={'80%'}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPassword