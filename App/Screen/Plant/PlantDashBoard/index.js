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
        progressValue: 0,
        progressColor: '#264CD4'
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
                    progressValue: response?.data?.step1_percent,
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
                    {(state.data) && (
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
                                    <View style={{ width: '50%' }}>
                                        <Bottom onPress={() => onRequest(state.data?.step1_percent, '#264CD4')} name={state.data?.step1_label} color={'#264CD4'} />
                                        <Bottom onPress={() => onRequest(state.data?.step2_percent, '#E79D0CE8')} name={state.data?.step2_label} color={'#E79D0CE8'} />
                                        <Bottom onPress={() => onRequest(state.data?.step3_percent, '#E70C0CC9')} name={state.data?.step3_label} color={'#E70C0CC9'} />
                                        <Bottom onPress={() => onRequest(state.data?.step4_percent, '#2DA952')} name={state.data?.step4_label} color={'#2DA952'} />
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
                    )}
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default PlantDashBoard