import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import InputField from '../../../Container/InputField'
import CustomDropDown from '../../../Container/CustomDropDown'
import Button from '../../../Container/Button'
import { Colors } from '../../../Utils/Colors'
import CheckBox from '@react-native-community/checkbox'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../../Container/Loader'
import Modal from 'react-native-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const SignUp = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        gstNo: '',
        gstNoErr: '',
        companyName: '',
        companyNameErr: '',
        plantAddress: '',
        plantAddressErr: '',
        email: '',
        emailErr: '',
        phnNo: '',
        phnNoErr: '',
        memberType: '',
        memberTypeErr: '',
        password: '',
        passwordErr: '',
        passwordVisible: false,
        cnfPassword: '',
        cnfPasswordErr: '',
        cnfPassVisible: false,
        checkBoxValue: false,
        modalVisible: false,
        mobileOTP: '',
        emailOTP: ''
    })

    const [memberPicker, setmemberPicker] = useState(false)
    const [memberList, setmemberList] = useState([])
    const [timer, setTimer] = useState(60)

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetCategory();
            return () => unsubscribe
        }, [navigation])
    )

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

    const onGetCategory = useCallback(async () => {
        try {
            showLoading();
            let res = await Apis.member_type();
            if (__DEV__) {
                console.log('MemberType', JSON.stringify(res))
            }
            if (res.success) {
                let cate = res?.data;
                if (cate.length > 0) {
                    let catedatas = cate.map(item => {
                        return { label: item?.name, value: item?.id }
                    })
                    setmemberList(catedatas);
                }
            } else {
                ToastMessage(res?.message);
            }
            // onGetProductCategory();
            hideLoading();
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    // const onGetProductCategory = useCallback(async () => {
    //     try {
    //         // showLoading();
    //         let res = await Apis.product_category();
    //         if (__DEV__) {
    //             console.log('ProductCategory', JSON.stringify(res))
    //         }
    //         if (res.success) {
    //             let pro = res?.data;
    //             if (pro.length > 0) {
    //                 let prodatas = pro.map(item => {
    //                     return { label: item?.name, value: item?.id }
    //                 })
    //                 setproductList(prodatas);
    //             }
    //         } else {
    //             ToastMessage(res?.message);
    //         }
    //         hideLoading();
    //     } catch (error) {
    //         if (__DEV__) {
    //             console.log(error)
    //         }
    //         hideLoading();
    //         ToastError();
    //     }
    // })

    const onGetCompanyDetails = useCallback(async (gstno) => {
        try {
            let datas = {
                gst_no: gstno
            }
            let res = await Apis.company_details(datas);
            if (__DEV__) {
                console.log('CompanyDetails', JSON.stringify(res))
            }
            if (res.success) {
                let address = res?.data?.address
                setState(prev => ({
                    ...prev,
                    plantAddress: address,
                    plantAddressErr: ''
                }))
            } else {
                ToastMessage(res?.message);
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    const onChangeGstNo = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            gstNo: value,
            gstNoErr: ''
        }))
        if (value.length > 14) {
            onGetCompanyDetails(value);
        }
    }, [state.gstNo])

    const onChangeAddress = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            plantAddress: value,
            plantAddressErr: ''
        }))
    }, [state.plantAddress])

    const onChangeEmail = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            email: value,
            emailErr: ''
        }))
    }, [state.email])

    const onChangePhnNo = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            phnNo: value,
            phnNoErr: ''
        }))
    }, [state.phnNo])

    const onChangeMember = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            memberType: value?.value,
            memberTypeErr: ''
        }))
    }, [state.memberType])

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

    const onChangeCheckbox = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            checkBoxValue: !state.checkBoxValue
        }))
    }, [state.checkBoxValue])

    const showModal = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: true
        }))
    }, [state.modalVisible])

    const hideModal = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: false
        }))
    }, [state.modalVisible])

    const onChangeEmailOtp = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            emailOTP: value
        }))
    }, [state.emailOTP])

    const onChangeMobileOtp = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            mobileOTP: value
        }))
    }, [state.mobileOTP])

    const onTermsCondition = useCallback(async () => {

    })

    const onLogin = useCallback(async () => {
        navigation.navigate('Login');
    })

    const onResendOtp = useCallback(async () => {

    })

    const onSkipVerify = useCallback(async () => {
        navigation.replace('Login');
    })

    const onSubmit = useCallback(async () => {
        showModal();
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <View style={CommonStyle.headerContainer}>
                <Image source={ImagePath.shape} style={CommonStyle.headerImage} />
            </View>
            {(state.loading) ? <Loader loading={state.loading} />
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.bodyContent}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={ImagePath.logo} style={styles.logo} />
                            <Text style={CommonStyle.headingText}>Welcome Vendor Onboard !</Text>
                        </View>
                        <InputField
                            name={'GST No.'}
                            value={state.gstNo}
                            onChangeText={onChangeGstNo}
                            error={state.gstNoErr}
                            maxLength={15}
                        />
                        <InputField
                            name={'Company Name'}
                            value={state.companyName}
                            editable={false}
                            error={state.companyNameErr}
                        />
                        {/* //plant Address */}
                        <InputField
                            name={'Address'}
                            value={state.plantAddress}
                            onChangeText={onChangeAddress}
                            error={state.plantAddressErr}
                            multiline={true}
                        />
                        <InputField
                            name={'Email'}
                            value={state.email}
                            onChangeText={onChangeEmail}
                            error={state.emailErr}
                            keyboardType={'email-address'}
                        />
                        <InputField
                            name={'Mobile'}
                            value={state.phnNo}
                            onChangeText={onChangePhnNo}
                            error={state.phnNoErr}
                            keyboardType={'phone-pad'}
                        />
                        <CustomDropDown
                            name={'Member Type'}
                            items={memberList}
                            setItems={setmemberList}
                            open={memberPicker}
                            setOpen={setmemberPicker}
                            value={state.memberType}
                            onChangeValue={onChangeMember}
                            error={state.memberTypeErr}
                        />
                        <InputField
                            name={'Password'}
                            value={state.password}
                            onChangeText={onChangePassword}
                            secureTextEntry={!state.passwordVisible}
                            rightIcon={state.passwordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChngPassVisible}
                            error={state.passwordErr}
                        />
                        <InputField
                            name={'Confirm Password'}
                            value={state.cnfPassword}
                            placeholder={'Re-Enter Password'}
                            onChangeText={onChangeCnfPass}
                            secureTextEntry={!state.cnfPassVisible}
                            rightIcon={state.cnfPassVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChngCnfPassVisible}
                            error={state.cnfPasswordErr}
                        />
                        <View style={styles.checkContainer}>
                            <CheckBox
                                value={state.checkBoxValue}
                                disabled={false}
                                onValueChange={onChangeCheckbox}
                                tintColors={{ true: Colors.theme_color, false: Colors.black }}
                                tintColor={Colors.black}
                                onCheckColor={Colors.theme_color}
                            />
                            <Text style={styles.aceptText}>By registration, you agree to ECOEx’s <Text onPress={onTermsCondition} style={styles.termstext}>Terms and Conditions</Text></Text>
                        </View>
                        <Button
                            name={'Sign Up'}
                            onPress={onSubmit}
                            loading={state.btnLoading}
                            width={'80%'}
                        />
                        <Text style={styles.btmText}>Already a member ? <Text onPress={onLogin} style={CommonStyle.boldtext}>Sign In</Text></Text>
                    </View>
                </ScrollView>
            }
            <Modal
                isVisible={state.modalVisible}
                animationInTiming={800}
                animationOutTiming={800}
                coverScreen={false}
                style={styles.modalStyle}
                onBackdropPress={() => hideModal()}
                onBackButtonPress={() => hideModal()}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <View style={styles.modalContent}>
                            <Text style={[CommonStyle.headingText, { textAlign: 'center', fontSize: 18, marginBottom: '8%' }]}>Verify Email and Mobile</Text>
                            <View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[CommonStyle.boldtext, { marginBottom: '6%' }]}>Enter Email OTP :</Text>
                                    <OTPInputView
                                        pinCount={6}
                                        code={state.emailOTP}
                                        autoFocusOnLoad={false}
                                        onCodeChanged={code => onChangeEmailOtp(code)}
                                        style={styles.otp}
                                        codeInputFieldStyle={styles.underlineStyleBase}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        placeholderTextColor={Colors.black}
                                    // onCodeFilled={(code) => onSubmitOtp(code)}
                                    />
                                </View>
                                <View style={{ flex: 1, marginTop: '6%' }}>
                                    <Text style={[CommonStyle.boldtext, { marginBottom: '6%' }]}>Enter Mobile OTP :</Text>
                                    <OTPInputView
                                        pinCount={6}
                                        code={state.mobileOTP}
                                        autoFocusOnLoad={false}
                                        onCodeChanged={code => onChangeMobileOtp(code)}
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
                                <View style={{ marginTop: '2%' }}>
                                    <Button
                                        name={'Validate'}
                                        onPress={onSubmit}
                                        loading={state.btnLoading}
                                        width={'80%'}
                                    />
                                </View>
                                <Text onPress={onSkipVerify} style={styles.skiptext}>Skip for now</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default SignUp