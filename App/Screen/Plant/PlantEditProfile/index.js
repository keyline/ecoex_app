import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import Loader from '../../../Container/Loader'
import InputField from '../../../Container/InputField'
import Apis from '../../../Service/Apis'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import LoaderTransparent from '../../../Container/LoaderTransparent'
import { useFocusEffect } from '@react-navigation/native'
import CustomDropDown from '../../../Container/CustomDropDown'
import Header from '../../../Container/Header'
import Button from '../../../Container/Button'

const PlantEditProfile = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        btnLoading: false,
        data: null,
        gstNo: '',
        gstNoErr: '',
        companyDetails: null,
        companyName: '',
        companyNameErr: '',
        plantAddress: '',
        plantAddressErr: '',
        holding_no: '',
        holding_noErr: '',
        street: '',
        streetErr: '',
        district: '',
        districtErr: '',
        state: '',
        stateErr: '',
        pincode: '',
        pincodeErr: '',
        location: '',
        locationErr: '',
        email: '',
        emailErr: '',
        phnNo: '',
        phnNoErr: '',
        memberType: '',
        memberTypeErr: '',
    })
    const [memberPicker, setmemberPicker] = useState(false);
    const [memberList, setmemberList] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetProfile();
            return () => unsubscribe
        }, [navigation])
    )

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

    const onHeaderPress = useCallback(async () => {
        if (__DEV__) {
            console.log('hiiiii')
        }
    })

    // const onGetMemberType = useCallback(async () => {
    //     try {
    //         showLoading();
    //         let res = await Apis.member_type();
    //         if (__DEV__) {
    //             console.log('MemberType', JSON.stringify(res))
    //         }
    //         if (res.success) {
    //             let cate = res?.data;
    //             if (cate.length > 0) {
    //                 let catedatas = cate.map(item => {
    //                     return { label: item?.name, value: item?.id }
    //                 })
    //                 setmemberList(catedatas);
    //             }
    //         } else {
    //             ToastMessage(res?.message);
    //         }
    //         onGetProfile();
    //         // hideLoading();
    //     } catch (error) {
    //         if (__DEV__) {
    //             console.log(error)
    //         }
    //         hideLoading();
    //         ToastError();
    //     }
    // })

    const onGetProfile = useCallback(async () => {
        try {
            showLoading();
            let res = await Apis.get_profile();
            if (__DEV__) {
                console.log('GetProfile', JSON.stringify(res));
            }
            if (res.success) {
                let data = res?.data
                setState(prev => ({
                    ...prev,
                    gstNo: data?.gst_no,
                    companyName: data?.company_name,
                    plantAddress: data?.full_address,
                    holding_no: data?.holding_no,
                    street: data?.street,
                    district: data?.district,
                    state: data?.state,
                    pincode: data?.pincode,
                    location: data?.location,
                    email: data?.email,
                    phnNo: data?.phone,
                    memberType: data?.member_type,
                    data: res.data,
                    loading: false
                }))
            } else {
                hideLoading();
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

    const onGetCompanyDetails = useCallback(async (gstno) => {
        try {
            setState(prev => ({
                ...prev,
                loadingNew: true
            }))
            let datas = {
                gst_no: gstno
            }
            let res = await Apis.company_details(datas);
            if (__DEV__) {
                console.log('CompanyDetails', JSON.stringify(res))
            }
            if (res.success) {
                let data = res?.data
                setState(prev => ({
                    ...prev,
                    companyName: data?.trade_name,
                    plantAddress: data?.address,
                    plantAddressErr: '',
                    holding_no: data?.holding_no,
                    holding_noErr: '',
                    street: data?.street,
                    streetErr: '',
                    district: data?.district,
                    districtErr: '',
                    state: data?.state,
                    stateErr: '',
                    pincode: data?.pincode,
                    pincodeErr: '',
                    location: data?.location,
                    locationErr: '',
                    companyDetails: res?.data,
                    loadingNew: false
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    loadingNew: false
                }))
                ToastMessage(res?.message);
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            setState(prev => ({
                ...prev,
                loadingNew: false
            }))
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

    const onChangeCname = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            companyName: value,
            companyNameErr: ''
        }))
    }, [state.companyName])

    const onChangeAddress = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            plantAddress: value,
            plantAddressErr: ''
        }))
    }, [state.plantAddress])

    const onChangeHoldingno = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            holding_no: value,
            holding_noErr: ''
        }))
    }, [state.holding_no])

    const onChangeStreet = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            street: value,
            streetErr: ''
        }))
    }, [state.street])

    const onChangeLocation = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            location: value,
            locationErr: ''
        }))
    }, [state.location])

    const onChangeDistrict = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            district: value,
            districtErr: ''
        }))
    }, [state.district])

    const onChangeState = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            state: value,
            stateErr: ''
        }))
    }, [state.state])

    const onChangePincode = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            pincode: value,
            pincodeErr: ''
        }))
    }, [state.pincode])

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

    const onSubmit = useCallback(async () => {
        if (state.gstNo.trim() == '') {
            setState(prev => ({
                ...prev,
                gstNoErr: 'Enter GST No.'
            }))
            return
        } else if (state.gstNo.length < 15) {
            setState(prev => ({
                ...prev,
                gstNoErr: 'Enter Valid GST No.'
            }))
            return
        } else if (state.companyName.trim() == '') {
            setState(prev => ({
                ...prev,
                companyNameErr: 'Enter Company Name'
            }))
            return;
        } else if (state.plantAddress.trim() == '') {
            setState(prev => ({
                ...prev,
                plantAddressErr: 'Enter Plant Address'
            }));
            return;
        } else if (state.holding_no.trim() == '') {
            setState(prev => ({
                ...prev,
                holding_noErr: 'Enter Holding No'
            }))
            return;
        } else if (state.street.trim() == '') {
            setState(prev => ({
                ...prev,
                streetErr: 'Enter Street'
            }));
            return;
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Edit Profile'}
                leftIcon={ImagePath.home}
                leftOnPress={onHeaderPress}
                navigation={navigation}
            />
            {/* <View style={CommonStyle.headerContainer}>
                <Image source={ImagePath.shape} style={CommonStyle.headerImage} />
            </View> */}
            {(state.loading) ? <Loader loading={state.loading} />
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.bodyContent}>
                        <View style={{ alignItems: 'center', marginBottom: '4%' }}>
                            <Image source={ImagePath.logo} style={styles.logo} />
                            <Text style={CommonStyle.headingText}>Update Profile</Text>
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
                            onChangeText={onChangeCname}
                            error={state.companyNameErr}
                        />
                        <InputField
                            name={'Address'}
                            value={state.plantAddress}
                            onChangeText={onChangeAddress}
                            error={state.plantAddressErr}
                            multiline={true}
                        />
                        <InputField
                            name={'Holding No.'}
                            value={state.holding_no}
                            onChangeText={onChangeHoldingno}
                            error={state.holding_noErr}
                            multiline={false}
                        />
                        <InputField
                            name={'Street'}
                            value={state.street}
                            onChangeText={onChangeStreet}
                            error={state.streetErr}
                            multiline={true}
                        />
                        <InputField
                            name={'Location'}
                            value={state.location}
                            onChangeText={onChangeLocation}
                            error={state.locationErr}
                            multiline={true}
                        />
                        <InputField
                            name={'District'}
                            value={state.district}
                            onChangeText={onChangeDistrict}
                            error={state.districtErr}
                        />
                        <InputField
                            name={'State'}
                            value={state.state}
                            onChangeText={onChangeState}
                            error={state.stateErr}
                        />
                        <InputField
                            name={'Pin Code'}
                            value={state.pincode}
                            onChangeText={onChangePincode}
                            error={state.pincodeErr}
                            maxLength={6}
                            keyboardType={'number-pad'}
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
                            maxLength={10}
                            error={state.phnNoErr}
                            keyboardType={'phone-pad'}
                        />
                        <InputField
                            name={'Member Type'}
                            value={state.memberType}
                            editable={false}
                        />
                        <View style={{ marginTop: '2%' }}>
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
            {(state.loadingNew) && (
                <LoaderTransparent loading={state.loadingNew} />
            )}
        </SafeAreaView>
    )
}

export default PlantEditProfile