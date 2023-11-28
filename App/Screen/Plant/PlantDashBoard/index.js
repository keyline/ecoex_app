import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Colors } from '../../../Utils/Colors'
import { useFocusEffect } from '@react-navigation/native'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import Loader from '../../../Container/Loader'

const PlantDashBoard = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        data: '',
        progressValue: 100,
        progressColor: Colors.blue
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const showLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }))
    })

    const hideLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: false
        }))
    })

    const onGetData = useCallback(async () => {
        try {
            showLoading();
            let response = await Apis.plant_dashboard();
            if (__DEV__) {
                console.log('PlantDashboard', JSON.stringify(response))
            }
            if (response.success) {
                setState(prev => ({
                    ...prev,
                    data: response?.data,
                    loading: false
                }))
            } else {
                hideLoading();
                ToastMessage(response?.message)
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    const onHeaderPress = useCallback(async () => {
        if (__DEV__) {
            console.log('hiiiii')
        }
    })

    const NameValue = ({ name, value }) => (
        <Text style={[styles.nametxt, { marginBottom: '1%' }]}>{name} - <Text style={styles.valuetxt}>{value}</Text></Text>
    )

    const Bottom = ({ name, onPress, color }) => (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.btmcontainer, { backgroundColor: color ? color : Colors.theme_color }]}>
            <Text style={styles.btmtext}>{name}</Text>
        </TouchableOpacity>
    )

    const onRequest = useCallback(async (val, color) => {
        setState(prev => ({
            ...prev,
            progressColor: color,
            progressValue: val
        }))
    }, [state.progressValue, state.progressColor])

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Dashboard'}
                leftIcon={ImagePath.home}
                leftOnPress={onHeaderPress}
                navigation={navigation}
            />
            {(state.loading) ? <Loader loading={state.loading} /> :
                <ScrollView>
                    <View style={styles.bodyContent}>
                        <View style={[styles.profileContainer, { width: '100%' }]}>
                            <Image source={ImagePath.dp} style={styles.dp} />
                            <View style={[styles.profileInfo, { width: '80%' }]}>
                                <NameValue name={'Plant Id'} value={state.data?.plant_id} />
                                <NameValue name={'Company Name'} value={state.data?.company_name} />
                                <NameValue name={'GST No'} value={state.data?.gst_no} />
                                <NameValue name={'Email ID'} value={state.data?.email} />
                                <NameValue name={'Plant Address'} value={state.data?.full_address} />
                                <NameValue name={'Plant Location'} value={state.data?.location} />
                            </View>
                        </View>
                        <View style={styles.btnContent}>
                            <Text style={styles.headingText}>Request Status Wise Count</Text>
                            <View style={styles.statusContent}>
                                <View style={{ width: '55%' }}>
                                    <Bottom onPress={() => onRequest(100, Colors.blue)} name={state.data?.step0_label} color={Colors.blue} />
                                    <Bottom onPress={() => onRequest(state.data?.step1_percent, 'orange')} name={state.data?.step1_label} color={'orange'} />
                                    <Bottom onPress={() => onRequest(state.data?.step2_percent, 'violet')} name={state.data?.step2_label} color={'violet'} />
                                    <Bottom onPress={() => onRequest(state.data?.step3_percent, '#bd5185')} name={state.data?.step3_label} color={'#bd5185'} />
                                    <Bottom onPress={() => onRequest(state.data?.step4_percent, '#69d6d4')} name={state.data?.step4_label} color={'#69d6d4'} />
                                    <Bottom onPress={() => onRequest(state.data?.step5_percent, '#90bd51')} name={state.data?.step5_label} color={'#90bd51'} />
                                    <Bottom onPress={() => onRequest(state.data?.step6_percent, '#52a2ba')} name={state.data?.step6_label} color={'#52a2ba'} />
                                    <Bottom onPress={() => onRequest(state.data?.step7_percent, '#51bd7e')} name={state.data?.step7_label} color={'#51bd7e'} />
                                    <Bottom onPress={() => onRequest(state.data?.step8_percent, Colors.theme_light)} name={state.data?.step8_label} color={Colors.theme_light} />
                                    <Bottom onPress={() => onRequest(state.data?.step9_percent, Colors.red)} name={state.data?.step9_label} color={Colors.red} />
                                    {/* 
                                    <Bottom onPress={() => onRequest(50, Colors.yellow)} name={'In Process Request'} color={Colors.yellow} />
                                    <Bottom onPress={() => onRequest(60, Colors.red)} name={'Rejected Request'} color={Colors.red} />
                                    <Bottom onPress={() => onRequest(80, Colors.theme_light)} name={'Close Request'} color={Colors.theme_light} /> */}
                                </View>
                                <View style={{ width: '40%', alignItems: 'center' }}>
                                    <CircularProgress
                                        // maxValue={200}
                                        value={state.progressValue}
                                        activeStrokeWidth={10}
                                        inActiveStrokeColor={Colors.grey}
                                        inActiveStrokeOpacity={0.2}
                                        activeStrokeColor={state.progressColor}
                                        progressValueColor={state.progressColor}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default PlantDashBoard