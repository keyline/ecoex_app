import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import AuthContext from '../../../Service/Context'
import Button from '../../../Container/Button'
import InputField from '../../../Container/InputField'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'

const ResetPassword = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { siteData } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: route?.params?.data,
        password: '',
        passwordErr: '',
        passwordVisible: false,
        cnfPassword: '',
        cnfPasswordErr: '',
        cnfPasswordVisible: false
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

    const onChangePassword = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            password: value,
            passwordErr: ''
        }))
    }, [state.password])

    const onChangeCnfPassword = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            cnfPassword: value,
            cnfPasswordErr: ''
        }))
    }, [state.cnfPassword])

    const onChangePassVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            passwordVisible: !state.passwordVisible
        }))
    }, [state.passwordVisible])

    const onChangeCnfPassVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            cnfPasswordVisible: !state.cnfPasswordVisible
        }))
    }, [state.cnfPasswordVisible])

    const onSubmit = useCallback(async () => {
        const { password, cnfPassword, data } = state;
        if (password.trim() == '') {
            setState(prev => ({
                ...prev,
                passwordErr: 'Enter Password'
            }));
            return;
        } else if (password.length < 8) {
            setState(prev => ({
                ...prev,
                passwordErr: 'Password length must be of min 8 Characters'
            }));
            return;
        } else if (cnfPassword.trim() == '') {
            setState(prev => ({
                ...prev,
                cnfPasswordErr: 'Enter Confirm Password'
            }));
            return;
        } else if (cnfPassword.length < 8) {
            setState(prev => ({
                ...prev,
                cnfPasswordErr: 'Confirm Password length must be of min 8 Characters'
            }));
            return;
        } else if (password != cnfPassword) {
            ToastMessage('New & Confirm Password Mismatch');
            return;
        } else {
            try {
                showLoading();
                let datas = {
                    id: data?.id,
                    password: password,
                    confirm_password: cnfPassword
                }
                let response = await Apis.reset_password(datas);
                if (__DEV__) {
                    console.log('ResetPassword', JSON.stringify(response))
                }
                if (response.success) {
                    navigation.replace('Login')
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
                        <Image source={(siteData && siteData.site_logo) ? { uri: siteData?.site_logo } : ImagePath.logo} style={styles.logo} />
                        <Text style={CommonStyle.boldtext}>Reset Password</Text>
                    </View>
                    <InputField
                        name={'New Password'}
                        value={state.password}
                        onChangeText={onChangePassword}
                        secureTextEntry={!state.passwordVisible}
                        rightIcon={state.passwordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                        rightonPress={onChangePassVisible}
                        maxLength={15}
                        error={state.passwordErr}
                    />
                    <InputField
                        name={'Confirm Password'}
                        value={state.cnfPassword}
                        onChangeText={onChangeCnfPassword}
                        secureTextEntry={!state.cnfPasswordVisible}
                        rightIcon={state.cnfPasswordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                        rightonPress={onChangeCnfPassVisible}
                        maxLength={15}
                        error={state.cnfPasswordErr}
                    />
                    <View style={{ marginTop: '8%' }}>
                        <Button
                            name={'Submit'}
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

export default ResetPassword