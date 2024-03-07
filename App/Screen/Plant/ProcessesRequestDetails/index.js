import { View, Text, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { useFocusEffect } from '@react-navigation/native'
import { LaunchCamera, LaunchImageLibary, ToastError, ToastMessage, getSubStatus } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import Loader from '../../../Container/Loader'
import { styles } from './styles'
import HeaderContent from './HeaderContent'
import { Colors } from '../../../Utils/Colors'
import List from './List'
import ImageViewSlider from '../../../Container/ImageViewSlider'
import MaterialWeightList from './MaterialWeightList'
import ImageOptions from '../../../Container/ImageOptions'
import LoaderTransparent from '../../../Container/LoaderTransparent'
import VehicleDetails from './VehicleDetails'

const ProcessesRequestDetails = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: null,
        status: null,
        itemList: [],
        vehiclesList: [],
        show: false,
        sliderImage: null,
        materialShow: true,
        materialList: [],
        materialIsEditable: false,
        selectedItem: null,
        imagetype: '',
        imageOptionModal: false,
        materialWeightOrginialList: []
    })
    const [materialWeightList, setmaterialWeightList] = useState([]);

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
                sub_enquiry_no: route.params?.id
            }
            let response = await Apis.processes_request_detais(datas);
            if (__DEV__) {
                console.log('ProcessesRequestDetails', JSON.stringify(response))
            }
            if (response.success) {
                let data = response?.data;
                let item = data?.items;
                let vehicles = data?.vehicles;
                if (data?.material_weighing_edit_vendor == '0' && data?.material_weighing_edit_plant == '1') {
                    let temparr = item.map(obj => {
                        return {
                            ...obj,
                            actual_weight: obj?.materials?.actual_weight,
                            actual_weightErr: '',
                            weighing_slip_img: obj?.materials?.weighing_slip_img,
                            weighing_slip_imgErr: ''
                        }
                    })
                    // console.log('temparr',JSON.stringify(temparr));
                    setmaterialWeightList(temparr);
                    setState(prev => ({
                        ...prev,
                        materialShow: data?.is_plant_ecoex_confirm == '0' ? true : false,
                        materialWeightOrginialList: temparr
                    }))
                }
                setState(prev => ({
                    ...prev,
                    data: data,
                    status: data?.enquiry_sub_status_id,
                    itemList: item,
                    vehiclesList: vehicles,
                    loading: false
                }))
            } else {
                ToastMessage(response?.message);
                hideLoading();
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    const showLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true,
        }))
    }, [state.loading])

    const hideLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: false,
        }))
    }, [state.loading])

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
    })

    const onItemListShowHide = useCallback(async () => {
        setState(prev => ({
            ...prev,
            show: !state.show
        }))
    }, [state.show])

    const onMaterialShowHide = useCallback(async () => {
        setState(prev => ({
            ...prev,
            materialShow: !state.materialShow
        }))
    }, [state.materialShow])

    const onShowImage = useCallback(async (image, key = 'link') => {
        console.log('key', key)
        if (image && image.length > 0) {
            let updatearr = image.map(obj => {
                return { uri: key ? obj[key] : obj }
            })
            setState(prev => ({
                ...prev,
                sliderImage: updatearr
            }))
        }
    })

    const onShowGpsImage = useCallback(async (image) => {
        if (image) {
            let array = [];
            let obj = { uri: image }
            array.push(obj);
            setState(prev => ({
                ...prev,
                sliderImage: array
            }))
        }
    })

    const onCloseSlider = useCallback(async () => {
        setState(prev => ({
            ...prev,
            sliderImage: null
        }))
    })

    const onChangematerialWeight = useCallback((text, item) => {
        if (item) {
            let temparr = materialWeightList.map(obj => {
                if (obj.item_id == item.item_id) {
                    return { ...obj, actual_weight: text, actual_weightErr: '' };
                }
                return obj;
            })
            setmaterialWeightList(temparr);
        }
    }, [materialWeightList])

    const onShowImgoptnModal = useCallback((item, type) => {
        setState(prev => ({
            ...prev,
            selectedItem: item,
            imagetype: type,
            imageOptionModal: true
        }))
    }, [state.imageOptionModal])

    const onHideImgoptnModal = useCallback(() => {
        setState(prev => ({
            ...prev,
            selectedVehicle: null,
            imagetype: null,
            imageOptionModal: false
        }))
    }, [state.imageOptionModal])

    const onSelectImageOption = useCallback(async (value) => {
        try {
            if (value == 1) {
                var selectlimit = 1
                if (state.imagetype && state.imagetype == 'weight_slip') {
                    selectlimit = 6 - state.selectedItem?.weighing_slip_img.length
                }
                let libaryImageRes = await LaunchImageLibary(true, selectlimit);
                if (__DEV__) {
                    console.log('LibaryImage', libaryImageRes)
                }
                if (libaryImageRes.assets && libaryImageRes.assets.length > 0) {
                    if (state.imagetype && state.imagetype == 'weight_slip') {
                        let temparr = materialWeightList.map(obj => {
                            if (obj.item_id == state.selectedItem.item_id) {
                                return { ...obj, weighing_slip_img: [...obj.weighing_slip_img, ...libaryImageRes.assets], weighing_slip_imgErr: '' };
                            }
                            return obj;
                        })
                        setmaterialWeightList(temparr);
                    }
                }
                onHideImgoptnModal();
            } else if (value == 2) {
                let cameraImageRes = await LaunchCamera(true);
                if (__DEV__) {
                    console.log('CameraImage', cameraImageRes)
                }
                if (cameraImageRes.assets && cameraImageRes.assets.length > 0) {
                    if (state.imagetype && state.imagetype == 'weight_slip') {
                        let temparr = materialWeightList.map(obj => {
                            if (obj.item_id == state.selectedItem.item_id) {
                                return { ...obj, weighing_slip_img: [...obj.weighing_slip_img, ...cameraImageRes.assets], weighing_slip_imgErr: '' };
                            }
                            return obj;
                        })
                        setmaterialWeightList(temparr);
                    }
                }
                onHideImgoptnModal();
            } else {
                onHideImgoptnModal();
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            onHideImgoptnModal();
            ToastError();
        }
    })

    const onDeleteWeightSlipImg = useCallback(async (item, img) => {
        if (item && img) {
            let temparr = materialWeightList.map(obj => {
                if (obj.item_id == item.item_id) {
                    let filterobj = obj.weighing_slip_img.filter(ob => ob != img);
                    return { ...obj, weighing_slip_img: filterobj };
                }
                return obj;
            })
            setmaterialWeightList(temparr);
        }
    }, [materialWeightList])

    const onMaterialApprove = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loadingNew: true
            }))
            let datas = {
                sub_enq_no: state.data?.sub_enquiry_no
            }
            let res = await Apis.material_weighted_approved(datas);
            if (__DEV__) {
                console.log('WeightApprove', JSON.stringify(res));
            }
            if (res.success) {
                state.data['is_plant_ecoex_confirm'] = '1'
                state.data['material_weighing_edit_plant'] = '0'
                state.data['enquiry_sub_status_id'] = '6.6'
                state.data['enquiry_sub_status'] = getSubStatus('6.6')
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
    });

    const onMaterialModify = useCallback(() => {
        setState(prev => ({
            ...prev,
            materialIsEditable: true
        }))
    }, [state.materialIsEditable]);

    const onMaterialModifyCancle = useCallback(() => {
        setState(prev => ({
            ...prev,
            materialIsEditable: false
        }))
        setmaterialWeightList(state.materialWeightOrginialList);
    }, [materialWeightList, state.materialIsEditable])

    const onMaterialUpdate = useCallback(async () => {
        let findWeightEmptyIndex = materialWeightList.findIndex(obj => (obj.actual_weight.trim() == ''));
        let findWeightValidindex = materialWeightList.findIndex(obj => (isNaN(Number(obj?.actual_weight)) || Number(obj?.actual_weight) <= 0));
        if (findWeightEmptyIndex != -1) {
            let temparr = materialWeightList.map(obj => {
                if (obj.actual_weight.trim() == '') {
                    return { ...obj, actual_weightErr: 'Enter Material Weight' };
                }
                return obj;
            })
            setmaterialWeightList(temparr);
            ToastMessage('Enter Material Weight');
            return;
        } else if (findWeightValidindex != -1) {
            let temparr = materialWeightList.map(obj => {
                if (isNaN(Number(obj?.actual_weight)) || Number(obj?.actual_weight) <= 0) {
                    return { ...obj, actual_weightErr: 'Enter Valid Weight' };
                }
                return obj;
            })
            setmaterialWeightList(temparr);
            ToastMessage('Enter Valid Weight');
            return;
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loadingNew: true
                }));
                let temparr = materialWeightList.map(obj => {
                    return {
                        item_id: obj?.item_id,
                        actual_weight: obj?.actual_weight,
                        weighing_slip_img: obj?.weighing_slip_img
                    }
                })
                let datas = {
                    sub_enq_no: state.data?.sub_enquiry_no,
                    materials: temparr
                }
                // console.log('materialWeightUpdate', JSON.stringify(datas));
                let res = await Apis.material_weighted_update(datas);
                if (__DEV__) {
                    console.log('MaterialWeightUpdate', JSON.stringify(res));
                }
                if (res.success) {
                    state.data['material_weighing_edit_plant'] = '0'
                    setState(prev => ({
                        ...prev,
                        materialIsEditable: false
                    }))
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
        }
    });

    const SmallButton = ({ name, onPress }) => (
        <TouchableOpacity style={styles.smallBtnContainer} onPress={onPress} activeOpacity={0.5} disabled={!onPress}>
            <Text style={[CommonStyle.boldtext, { color: Colors.white }]}>{name}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Request Details'}
                leftIcon={ImagePath.back}
                leftOnPress={onHeaderPress}
            />
            {(state.loading) ? <Loader loading={state.loading} /> :
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} onRefresh={onGetData} />}>
                    {(state.data) && (
                        <View style={styles.bodyContainer}>
                            <View style={styles.statusContainer}>
                                <Text style={styles.statusText}>STATUS :</Text>
                                <Text style={[styles.statusTextHighlight, { backgroundColor: 'green' }]}>{state.data?.enquiry_sub_status}</Text>
                            </View>
                            <HeaderContent data={state.data} />
                            <TouchableOpacity onPress={onItemListShowHide} activeOpacity={0.5} style={styles.itemHeader}>
                                <Text style={[CommonStyle.boldblacktext, { color: Colors.white }]}>Total Item(s) : {state.itemList.length}</Text>
                                <Image source={state.show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
                            </TouchableOpacity>
                            {(state.show && state.itemList.length > 0) && (
                                <View style={{ flex: 1, paddingHorizontal: '1%' }}>
                                    {(state.itemList).map((item, key) => (
                                        <List
                                            key={key}
                                            item={item}
                                            data={state.data}
                                            status={state.status}
                                            onShowImage={onShowImage}
                                        />
                                    ))}
                                </View>
                            )}
                            {(state.data?.vehicles && state.data?.vehicles.length > 0) && (
                                <VehicleDetails vehicleData={state.data?.vehicles} onShowImage={onShowImage} />
                            )}
                            {(materialWeightList.length > 0 && state.data?.material_weighing_edit_plant == '1') && (
                                <>
                                    <TouchableOpacity onPress={onMaterialShowHide} activeOpacity={0.5} style={styles.itemHeader}>
                                        <Text style={[CommonStyle.boldblacktext, { color: Colors.white }]}>Material Weighted</Text>
                                        <Image source={state.materialShow ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
                                    </TouchableOpacity>
                                    {(state.materialShow) && (
                                        <View style={{ paddingVertical: '2%', paddingHorizontal: '2%' }}>

                                            {(materialWeightList).map((item, key) => (
                                                <View key={key} style={{ marginTop: '0%', paddingHorizontal: '0%' }}>
                                                    <MaterialWeightList
                                                        item={item}
                                                        onChangematerialWeight={onChangematerialWeight}
                                                        onShowModal={onShowImgoptnModal}
                                                        onDeleteImage={onDeleteWeightSlipImg}
                                                        onShowImage={onShowGpsImage}
                                                        editable={state.materialIsEditable}
                                                    />
                                                </View>
                                            ))}
                                            {(state.data?.is_plant_ecoex_confirm == '0' && state.data?.material_weighing_edit_plant == '1') && (
                                                <>
                                                    {(state.materialIsEditable) ?
                                                        <View style={styles.flex}>
                                                            <SmallButton onPress={onMaterialModifyCancle} name={'Cancel'} />
                                                            <SmallButton onPress={onMaterialUpdate} name={'Update'} />
                                                        </View>
                                                        :
                                                        <View style={styles.flex}>
                                                            <SmallButton onPress={onMaterialApprove} name={'Approve'} />
                                                            <SmallButton onPress={onMaterialModify} name={'Modify'} />
                                                        </View>
                                                    }
                                                </>
                                            )}
                                        </View>
                                    )}
                                </>
                            )}
                        </View>
                    )}
                </ScrollView>
            }
            {(state.sliderImage) && (
                <ImageViewSlider
                    images={state.sliderImage}
                    onClose={onCloseSlider}
                />
            )}
            <ImageOptions
                modalVisible={state.imageOptionModal}
                onHideModal={onHideImgoptnModal}
                onSortItemSelect={onSelectImageOption}
            />
            {(state.loadingNew) && (
                <LoaderTransparent loading={state.loadingNew} />
            )}
        </SafeAreaView>
    )
}

export default ProcessesRequestDetails