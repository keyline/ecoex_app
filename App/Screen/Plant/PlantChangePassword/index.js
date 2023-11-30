import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import Loader from '../../../Container/Loader'
import AuthContext from '../../../Service/Context'
import InputField from '../../../Container/InputField'
import Button from '../../../Container/Button'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'

const PlantChangePassword = ({ navigation }) => {

    const context = useContext(AuthContext)
    const { siteData } = context.allData

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        oldPassword: '',
        oldPasswordErr: '',
        oldPassVisible: false,
        password: '',
        passwordErr: '',
        passwordVisible: false,
        cnfPassword: '',
        cnfPasswordErr: '',
        cnfPassVisible: false
    })

    const onHeaderPress = useCallback(async () => {
        navigation.navigate('PlantDashBoard')
    })

    const onChangeOldPassword = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            oldPassword: value,
            oldPasswordErr: ''
        }))
    }, [state.oldPassword])

    const onChngOldPassVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            oldPassVisible: !state.oldPassVisible
        }))
    }, [state.oldPassVisible])

    const onChangePassword = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            password: value,
            passwordErr: ''
        }))
    }, [state.password])

    const onChngPassVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            passwordVisible: !state.passwordVisible
        }))
    }, [state.passwordVisible])

    const onChangeCnfPass = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            cnfPassword: value,
            cnfPasswordErr: ''
        }))
    }, [state.cnfPassword])

    const onChngCnfPassVisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            cnfPassVisible: !state.cnfPassVisible
        }))
    }, [state.cnfPassVisible])

    const onSubmit = useCallback(async () => {
        if (state.oldPassword.trim() == '') {
            setState(prev => ({
                ...prev,
                oldPasswordErr: 'Enter Old Password'
            }));
            return;
        } else if (state.password.trim() == '') {
            setState(prev => ({
                ...prev,
                passwordErr: 'Enter Password'
            }));
            return;
        } else if (state.password.length < 8) {
            setState(prev => ({
                ...prev,
                passwordErr: 'Password length must be of min 8 Characters'
            }));
            return;
        } else if (state.cnfPassword.trim() == '') {
            setState(prev => ({
                ...prev,
                cnfPasswordErr: 'Enter Confirm Password'
            }));
            return;
        } else if (state.cnfPassword.length < 8) {
            setState(prev => ({
                ...prev,
                cnfPasswordErr: 'Confirm Password length must be of min 8 Characters'
            }));
            return;
        } else if (state.password != state.cnfPassword) {
            ToastMessage('New & Confirm Password Mismatch');
            return;
        } else if (state.oldPassword == state.password) {
            ToastMessage('Old & New Paswword should not be same');
            return;
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    btnLoading: true
                }))
                let datas = {
                    old_password: state.oldPassword,
                    new_password: state.password,
                    confirm_password: state.cnfPassword
                }
                let response = await Apis.change_password(datas);
                if (__DEV__) {
                    console.log('ChangePassword', JSON.stringify(response))
                }
                if (response.success) {
                    setState(prev => ({
                        ...prev,
                        oldPassword: '',
                        password: '',
                        cnfPassword: ''
                    }))
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
            <Header
                name={'Change Password'}
                leftIcon={ImagePath.home}
                leftOnPress={onHeaderPress}
                navigation={navigation}
            />
            {(state.loading) ? <Loader loading={state.loading} />
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.bodyContent}>
                        <View style={{ alignItems: 'center', marginBottom: '4%' }}>
                            <Image source={siteData.site_logo ? { uri: siteData?.site_logo } : ImagePath.logo} style={styles.logo} />
                            <Text style={CommonStyle.headingText}>Change Password</Text>
                        </View>
                        <InputField
                            name={'Old Password'}
                            value={state.oldPassword}
                            onChangeText={onChangeOldPassword}
                            secureTextEntry={!state.oldPassVisible}
                            rightIcon={state.oldPassVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChngOldPassVisible}
                            maxLength={15}
                            error={state.oldPasswordErr}
                        />
                        <InputField
                            name={'New Password'}
                            value={state.password}
                            onChangeText={onChangePassword}
                            secureTextEntry={!state.passwordVisible}
                            rightIcon={state.passwordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChngPassVisible}
                            maxLength={15}
                            error={state.passwordErr}
                        />
                        <InputField
                            name={'Confirm Password'}
                            value={state.cnfPassword}
                            placeholder={'Re-Enter New Password'}
                            onChangeText={onChangeCnfPass}
                            secureTextEntry={!state.cnfPassVisible}
                            rightIcon={state.cnfPassVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChngCnfPassVisible}
                            maxLength={15}
                            error={state.cnfPasswordErr}
                        />
                        <View style={{ marginTop: '10%' }}>
                            <Button
                                name={'UPDATE'}
                                onPress={onSubmit}
                                loading={state.btnLoading}
                                width={'80%'}
                            />
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default PlantChangePassword