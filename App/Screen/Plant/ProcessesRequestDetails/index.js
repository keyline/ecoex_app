import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import ImageView from '../../../Container/ImageView'
import { GetUnitfromList, ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../../Container/Loader'
import Button from '../../../Container/Button'
import Popover from 'react-native-popover-view';
import { Font_Family } from '../../../Utils/Fonts'
import { Colors } from '../../../Utils/Colors'
import LoaderTransparent from '../../../Container/LoaderTransparent'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const list = [
    { sl_no: '01', hsn: '124578', product: 'Product 1', weight: '1245 MT' },
    { sl_no: '02', hsn: '124578', product: 'Product 2', weight: '1245 MT' },
    { sl_no: '03', hsn: '124578', product: 'Product 3', weight: '1245 MT' },
    { sl_no: '04', hsn: '124578', product: 'Product 4', weight: '1245 MT' },

]

const ProcessesRequestDetails = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        btnLoading: false,
        // item: route?.params?.item,
        id: route?.params?.id,
        imageViewUri: null,
        data: '',
        productList: [],
    })
    const [unitList, setUnitList] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        try {
            showLoading();
            let datas = {
                enq_id: route?.params?.id
            }
            let response = await Apis.process_request_edit(datas);
            if (__DEV__) {
                console.log('EditRequest', JSON.stringify(response))
            }
            if (response.success) {
                await onGetUnits();
                setState(prev => ({
                    ...prev,
                    data: response?.data,
                    productList: response?.data?.requestList,
                    loading: false
                }))
            } else {
                hideLoading();
                ToastMessage(response?.message);
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    const onGetUnits = useCallback(async () => {
        try {
            let res = await Apis.get_units();
            if (__DEV__) {
                console.log('UnitList', JSON.stringify(res))
            }
            if (res.success) {
                let data = res?.data
                if (data.length > 0) {
                    let parray = data.map(item => {
                        return { ...item, label: item.name, value: item.id }
                    })
                    setUnitList(parray)
                    // return parray;
                }
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            // hideLoading();
            ToastError();
        }
    })

    const showLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true,
        }))
    }, [state.loading]);

    const hideLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: false,
        }))
    }, [state.loading]);

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
    })

    const onImageView = useCallback(async (img) => {
        if (img) {
            setState(prev => ({
                ...prev,
                imageViewUri: img
            }))
        } else {
            setState(prev => ({
                ...prev,
                imageViewUri: null
            }))
        }
    }, [state.imageViewUri])

    const onEdit = useCallback(async () => {
        navigation.navigate('EditRequest', { id: state.data?.enq_id })
    })

    const onDeleteAlert = useCallback(async () => {
        Alert.alert(
            'Delete!',
            'Do you really want to delete this request?',
            [
                {
                    text: 'No',
                    onPress: () => null
                },
                {
                    text: 'Yes',
                    onPress: () => onDelete()
                }
            ],
            { cancelable: true }
        )
    })

    const onDelete = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loadingNew: true
            }))
            let datas = {
                enq_id: state.data?.enq_id
            }
            let res = await Apis.plant_delete_request(datas);
            if (__DEV__) {
                console.log('DeleteRequest', JSON.stringify(res))
            }
            if (res.success) {
                navigation.goBack();
            }
            setState(prev => ({
                ...prev,
                loadingNew: false
            }));
            ToastMessage(res?.message);
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

    const Buttons = ({ name }) => (
        <View style={styles.btmContainer}>
            <View style={{ width: '18%', alignItems: 'center', paddingVertical: '6%' }}>
                <Image source={ImagePath.cloud_upload} style={styles.btmIcon} />
            </View>
            <Text style={[CommonStyle.normalText, { width: '57%', fontSize: 13, textAlign: 'center' }]}>  {name}  </Text>
            <TouchableOpacity style={[styles.btnRightIcon, { width: '25%', paddingVertical: '6%' }]}>
                <Image source={ImagePath.eye_on} style={styles.btmIcon} />
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'In Processes Request Details'}
                leftIcon={ImagePath.back}
                leftOnPress={onHeaderPress}
            />
            {(state.loading) ? <Loader /> :
                <ScrollView showsVerticalScrollIndicator={false}>
                    {(state.data) && (
                        <View style={styles.bodyContent}>
                            <View style={[styles.flex, { paddingHorizontal: '4%' }]}>
                                <Text style={CommonStyle.normalText}>STATUS ({state.data?.current_step_no}/{state.data?.total_step}) : </Text>
                                <Text style={styles.statusText}>{(state.data?.current_step_name).toUpperCase()}</Text>
                            </View>

                            <View style={styles.midContent}>
                                <View style={styles.flexNew}>
                                    <View style={styles.flex}>
                                        <Image source={ImagePath.req_id} style={styles.icon} />
                                        <Text style={CommonStyle.boldblacktext}>  {state.data?.enquiry_no}</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Image source={ImagePath.location} style={styles.icon} />
                                        <Text style={CommonStyle.boldblacktext}>  {state.data?.plant_location} </Text>
                                        <Popover
                                            from={(
                                                < TouchableOpacity activeOpacity={0.5}>
                                                    <Image source={ImagePath.info} style={styles.info} />
                                                </TouchableOpacity>
                                            )}
                                        >
                                            <View style={{ width: screenWidth * 0.4, padding: 10 }}>
                                                <Text style={CommonStyle.normalText}>{state.data?.plant_fulladress}</Text>
                                            </View>
                                        </Popover>
                                    </View>
                                </View>

                                <View style={[styles.flexNew, { marginTop: '4%' }]}>
                                    <View style={styles.flex}>
                                        <Image source={ImagePath.date} style={styles.icon} />
                                        <Text style={CommonStyle.boldblacktext}>  {state.data?.booking_date}</Text>
                                    </View>
                                    <View style={styles.flex}>
                                        <Image source={ImagePath.factory} style={styles.icon} />
                                        <Text style={CommonStyle.boldblacktext}>  {state.data?.plant_id} </Text>
                                    </View>
                                </View>

                                <View style={[styles.flexNew, { marginTop: '4%' }]}>
                                    <View style={styles.flex}>
                                        <Image source={ImagePath.car} style={styles.icon} />
                                        <Text style={CommonStyle.boldblacktext}>  {state.data?.collection_date}</Text>
                                    </View>
                                </View>
                                {(state.productList.length > 0) && (
                                    <>
                                        <Text style={[CommonStyle.boldblacktext, { marginTop: '4%', fontSize: 16 }]}>Product List</Text>
                                        <View style={{ marginTop: '2%' }}>
                                            {state.productList.map((item, index) => (
                                                <View key={index} style={styles.listContainer}>
                                                    <View style={styles.listContent}>
                                                        <View style={styles.slContent}>
                                                            <Text style={styles.listText}>{index + 1}</Text>
                                                        </View>
                                                        <View style={styles.productContent}>
                                                            <Text style={CommonStyle.boldblacktext}>{item?.product_name}</Text>
                                                        </View>
                                                        <View style={styles.weightContent}>
                                                            <Text style={styles.listText}>{item?.qty} {GetUnitfromList(unitList, item?.unit)}</Text>
                                                        </View>
                                                    </View>
                                                    {(item?.hsn) && (
                                                        <Text style={styles.hsntext}>HSN : {item?.hsn}</Text>
                                                    )}
                                                    {(item?.remarks) && (
                                                        <Text style={[styles.hsntext, { marginTop: 2, textAlign: 'center', marginLeft: 0 }]}><Text style={{ fontFamily: Font_Family.NunitoSans_Bold }}>Remarks :</Text> {item?.remarks}</Text>
                                                    )}
                                                </View>
                                            ))}
                                        </View>
                                    </>
                                )}
                                {(state.data?.weighing_slip || state.data?.vehicle_image) && (
                                    <>
                                        <Text style={[CommonStyle.boldblacktext, { textAlign: 'center', marginVertical: '2%' }]}>Uploaded by Vendor</Text>
                                        <View style={styles.imgContainer}>
                                            {(state.data?.weighing_slip) && (
                                                <TouchableOpacity onPress={() => onImageView(state.data?.weighing_slip)} activeOpacity={0.5} style={styles.imgContent}>
                                                    <Text style={[CommonStyle.boldblacktext, { fontSize: 12 }]}>Weighing slip</Text>
                                                    <Image source={{ uri: state.data?.weighing_slip }} style={styles.slipImage} />
                                                </TouchableOpacity>
                                            )}
                                            {(state.data?.vehicle_image) && (
                                                <TouchableOpacity onPress={() => onImageView(state.data?.vehicle_image)} activeOpacity={0.5} style={styles.imgContent}>
                                                    <Text style={[CommonStyle.boldblacktext, { fontSize: 12 }]}>Vehicle</Text>
                                                    <Image source={{ uri: state.data?.vehicle_image }} style={styles.slipImage} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </>
                                )}
                                {/* <View style={{ flexDirection: 'row', marginTop: '8%', width: '100%', alignSelf: 'center', justifyContent: 'space-between' }}>
                                    <Buttons name={'Weighing slip'} />
                                    <Buttons name={'Vehicle'} />
                                </View> */}
                            </View>
                            {(state.data?.current_step_no == '0') && (
                                <View style={[styles.flexNew, { width: '65%', alignSelf: 'center' }]}>
                                    {/* // <View style={[styles.flexNew, { alignSelf: 'center' }]}> */}
                                    <TouchableOpacity onPress={onDeleteAlert} style={styles.aprvBtn}>
                                        <Text style={CommonStyle.boldblacktext}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={onEdit} style={styles.aprvBtn}>
                                        <Text style={CommonStyle.boldblacktext}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {/* {(state.data?.current_step_no == '0') && (
                                <Button
                                    name={'Edit'}
                                    width={'60%'}
                                    loading={state.btnLoading}
                                    onPress={onEdit}
                                />
                            )} */}
                        </View>
                    )}
                </ScrollView>
            }
            {(state.imageViewUri) && (
                <ImageView
                    imageUri={state.imageViewUri}
                    onClose={onImageView}
                // imageUri={}
                />
            )}
            {(state.loadingNew) && (
                <LoaderTransparent loading={state.loadingNew} />
            )}
        </SafeAreaView >
    )
}

export default ProcessesRequestDetails