import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Keyboard, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Header from '../../../Container/Header'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { useFocusEffect } from '@react-navigation/native'
import Apis from '../../../Service/Apis'
import { LaunchCamera, LaunchImageLibary, ToastError, ToastMessage, dateConvertNew, generateRandomId } from '../../../Service/CommonFunction'
import Loader from '../../../Container/Loader'
import { LocationPermission, OpenAppSetting } from '../../../Service/Permission'
import { getCurrentLocation } from '../../../Service/Location'
import { styles } from './styles'
import List from './List'
import ImageOptions from '../../../Container/ImageOptions'
import ImageView from '../../../Container/ImageView'
import ModalPop from './ModalPop'
import AuthContext from '../../../Service/Context'
import DateTimePickers from '../../../Container/DateTimePickers'
import { Colors } from '../../../Utils/Colors'
import DeviceInfo from 'react-native-device-info'
import LoaderTransparent from '../../../Container/LoaderTransparent'

const EditRequest = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { userProfile } = context.allData;

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: '',
        enqid: route?.params?.id,
        requestList: [],
        pr_name: '',
        hsn: '',
        checkValue: false,
        pickerModal: false,
        product_image: [],
        pickerModalType: '',
        latitude: '',
        longitude: '',
        modalVisible: false,
        gps_img: null,
        viewImgeUri: null,
        collectionDate: '',
        collectionDatePicker: false,
        successModalVisible: false
    })
    const [unitList, setUnitList] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [productList, setProductList] = useState([]);


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
            // if (__DEV__) {
            //     console.log('EditRequest', JSON.stringify(response))
            // } 
            if (response.success) {
                let data = response?.data
                let reqlist = data.requestList.map((item) => {
                    return { ...item, product_imageErr: '', productErr: '', qtyErr: '', unitErr: '', sl_no: generateRandomId() }
                })
                setRequestList(reqlist)
                console.log('reqlist', JSON.stringify(reqlist))
                await onGetUnits();
                setState(prev => ({
                    ...prev,
                    data: data,
                    collectionDate: data?.collection_date,
                    gps_img: data?.gps_image,
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
                await onGetProduct();
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            // hideLoading();
            ToastError();
        }
    })

    const onGetProduct = useCallback(async () => {
        try {
            // showLoading();
            let response = await Apis.get_product();
            if (__DEV__) {
                console.log('ProductList', JSON.stringify(response))
            }
            if (response.success) {
                let data = response?.data
                if (data.length > 0) {
                    let parray = data.map(item => {
                        return { ...item, label: item.name, value: item.id }
                    })
                    setProductList(parray)
                    // return parray;
                }
            }
            // hideLoading();
            await onGetLocation();
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    const onGetLocation = useCallback(async () => {
        let permission = await LocationPermission();
        if (permission) {
            let location = await getCurrentLocation();
            if (__DEV__) {
                console.log('location', location)
            }
            if (location.coords) {
                setState(prev => ({
                    ...prev,
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude
                }))
            }
        } else {
            OpenAppSetting();
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
        // navigation.navigate('ProcessRequest');
    })

    const onModalShow = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: true
        }))
    })

    const onModalHide = useCallback(async () => {
        setState(prev => ({
            ...prev,
            pr_name: '',
            hsn: '',
            product_image: [],
            checkValue: false,
            modalVisible: false
        }))
    })

    const onAddMore = useCallback(async () => {
        let myArr = requestList
        let obj = { sl_no: generateRandomId(), product_id: '', hsn: '', qty: '', unit: '', product_image: [], product_imageErr: '', productErr: '', qtyErr: '', unit_name: '', unitErr: '', new_product: false }
        myArr.push(obj);
        let tempData = [];
        myArr.map(item => {
            tempData.push(item)
        });
        setRequestList(tempData);
        // console.log('arr', JSON.stringify(myArr))
    })

    const onDeleteAlert = useCallback(async (items) => {
        Alert.alert(
            'Delete!',
            'Do you really want to delete this product?',
            [
                {
                    text: 'No',
                    onPress: () => null
                },
                {
                    text: 'Yes',
                    onPress: () => onDelete(items)
                }
            ],
            { cancelable: true }
        )
    })

    const onDelete = useCallback(async (items) => {
        let tempArr = requestList.filter(obj => obj != items);
        setRequestList(tempArr)
    })

    const onChangeProduct = useCallback(async (item, pr) => {
        if (item && pr) {
            let updateArray = requestList.map(obj => {
                if (obj.sl_no === item.sl_no) {
                    return { ...obj, product_id: pr.value, unit_name: pr?.unit_name, hsn: pr?.hsn, productErr: '' }
                }
                return obj;
            });
            setRequestList(updateArray);
        }
    })

    const onChangeProductName = useCallback(async (item, txt) => {
        if (item) {
            let updateArray = requestList.map(obj => {
                if (obj.sl_no === item.sl_no) {
                    return { ...obj, product_name: txt, productErr: '' }
                }
                return obj;
            });
            setRequestList(updateArray);
        }
    })

    const onChangeHsn = useCallback(async (item, txt) => {
        if (item) {
            let updateArray = requestList.map(obj => {
                if (obj.sl_no === item.sl_no) {
                    return { ...obj, hsn: txt }
                }
                return obj;
            });
            setRequestList(updateArray);
        }
    })

    const onChangeQty = useCallback(async (item, txt) => {
        if (item) {
            let updateArray = requestList.map(obj => {
                if (obj.sl_no === item.sl_no) {
                    return { ...obj, qty: txt, qtyErr: '' }
                }
                return obj;
            });
            setRequestList(updateArray);
        }
    })

    const onChangeUnit = useCallback(async (item, pr) => {
        if (item && pr) {
            let updateArray = requestList.map(obj => {
                if (obj.sl_no === item.sl_no) {
                    return { ...obj, unit: pr.value, unitErr: '' }
                }
                return obj;
            });
            setRequestList(updateArray);
        }
    })

    const onChangeProductNameNew = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            pr_name: val
        }))
    }, [state.pr_name])

    const onChangeHsnNew = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            hsn: val
        }))
    }, [state.hsn])

    const onChangeCheckBox = useCallback(async () => {
        setState(prev => ({
            ...prev,
            checkValue: !state.checkValue
        }))
    }, [state.checkValue])

    const onShowPicker = useCallback(async (type, item) => {
        Keyboard.dismiss();
        setState(prev => ({
            ...prev,
            pickerModalType: {
                type: type,
                item: item ? item : ''
            },
            pickerModal: true
        }))
    }, [state.pickerModal, state.pickerModalType])

    const onHidePicker = useCallback(async () => {
        setState(prev => ({
            ...prev,
            pickerModalType: '',
            pickerModal: false,
        }))
    }, [state.pickerModal, state.pickerModalType])

    const onAddProduct = useCallback(async () => {
        if (state.pr_name.trim() == '') {
            ToastMessage('Enter Product Name');
            return
        } else if (state.product_image.length <= 0) {
            ToastMessage('Add Product Image');
            return;
        } else if (state.checkValue == false) {
            ToastMessage('Select Checkbox');
            return
        } else {
            let data = {
                sl_no: generateRandomId(),
                product_name: state.pr_name,
                hsn: state.hsn,
                product_image: state.product_image,
                product_imagenErr: '',
                qty: '',
                unit: '',
                productErr: '',
                qtyErr: '',
                unitErr: '',
                new_product: true
            }
            // onAdd(data);
            let myArr = requestList
            myArr.push(data)
            setRequestList(myArr)
            onModalHide();
        }
    })

    const onSelectImageOption = useCallback(async (value) => {
        try {
            if (value == 1) {
                let selectlimit = 1;
                if (state.pickerModalType.type == 'oldproduct') {
                    selectlimit = (4 - state.pickerModalType.item.product_image.length)
                } else if (state.pickerModalType.type == 'newproduct') {
                    selectlimit = (4 - state.product_image.length)
                }
                let libaryImageRes = await LaunchImageLibary(true, selectlimit);
                // if (__DEV__) {
                //     console.log('LibaryImage', libaryImageRes)
                // }
                if (libaryImageRes.assets && libaryImageRes.assets.length > 0) {
                    if (state.pickerModalType.type == 'gps') {
                        setState(prev => ({
                            ...prev,
                            gps_img: libaryImageRes.assets[0]
                        }))
                        onHidePicker();
                    } else if (state.pickerModalType.type == 'oldproduct') {
                        if (state.pickerModalType.item) {
                            let updateArray = requestList.map(obj => {
                                if (obj.sl_no === state.pickerModalType.item.sl_no) {
                                    return { ...obj, product_image: [...obj.product_image, ...libaryImageRes.assets], product_imageErr: '' }
                                }
                                return obj;
                            });
                            setRequestList(updateArray);
                        }
                        onHidePicker();
                    } else if (state.pickerModalType.type == 'updateProduct' && state.pickerModalType.item) {
                        let findindex = requestList.findIndex(obj => obj.sl_no == state.pickerModalType.item.sl_no)
                        if (findindex != -1) {
                            requestList[findindex].product_image = libaryImageRes.assets[0]
                        }
                        onHidePicker();
                    } else if (state.pickerModalType.type == 'newproduct') {
                        setState(prev => ({
                            ...prev,
                            product_image: [...state.product_image, ...libaryImageRes.assets]
                        }))
                        onHidePicker();
                    } else {
                        onHidePicker();
                    }
                } else {
                    onHidePicker();
                }
            } else {
                let cameraImageRes = await LaunchCamera(true);
                // if (__DEV__) {
                //     console.log('CameraImage', cameraImageRes)
                // }
                if (cameraImageRes.assets && cameraImageRes.assets.length > 0) {
                    if (state.pickerModalType == 'gps') {
                        setState(prev => ({
                            ...prev,
                            gps_img: cameraImageRes.assets[0]
                        }))
                        onHidePicker();
                    } else if (state.pickerModalType.type == 'oldproduct') {
                        if (state.pickerModalType.item) {
                            let updateArray = requestList.map(obj => {
                                if (obj.sl_no === state.pickerModalType.item.sl_no) {
                                    return { ...obj, product_image: [...obj.product_image, ...cameraImageRes.assets], product_imageErr: '' }
                                }
                                return obj;
                            });
                            setRequestList(updateArray);
                        }
                        onHidePicker();
                    } else if (state.pickerModalType.type == 'updateProduct' && state.pickerModalType.item) {
                        let findindex = requestList.findIndex(obj => obj.sl_no == state.pickerModalType.item.sl_no)
                        if (findindex != -1) {
                            requestList[findindex].product_image = cameraImageRes.assets[0]
                        }
                        onHidePicker();
                    } else if (state.pickerModalType.type == 'newproduct') {
                        setState(prev => ({
                            ...prev,
                            product_image: [...state.product_image, ...cameraImageRes.assets]
                        }))
                        onHidePicker();
                    } else {
                        onHidePicker();
                    }
                } else {
                    onHidePicker();
                }
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            onHidePicker();
            ToastError();
        }
    })

    const onViewImage = useCallback(async (uri) => {
        if (uri) {
            setState(prev => ({
                ...prev,
                viewImgeUri: uri
            }))
        } else {
            setState(prev => ({
                ...prev,
                viewImgeUri: null
            }))
        }
    }, [state.viewImgeUri])

    const onOpenDatePicker = useCallback(async () => {
        setState(prev => ({
            ...prev,
            collectionDatePicker: true
        }))
    }, [state.collectionDatePicker])

    const onChangeCollectionDate = useCallback(async (value) => {
        if (value.type == 'set') {
            let time = value?.nativeEvent?.timestamp;
            setState(prev => ({
                ...prev,
                collectionDate: time,
                collectionDatePicker: false
            }))
        } else {
            setState(prev => ({
                ...prev,
                collectionDatePicker: false
            }))
        }
    }, [state.collectionDate])

    const onUpdate = useCallback(async () => {
        let findProductEmptyindex = requestList.findIndex(obj => (obj.new_product == false && obj.product_id == ''));
        let findProductNameEmptyIndex = requestList.findIndex(obj => (obj.new_product == true && obj.product_name.trim() == ''))
        // let findQtyEmptyindex = requestList.findIndex(obj => (obj.new_product == false && obj.qty.trim() == ''))
        // let findUnitEmptyindex = requestList.findIndex(obj => obj.unit == '')
        let findImgEmptyindex = requestList.findIndex(obj => (obj.product_image.length <= 0))
        if (findProductEmptyindex != -1) {
            let updateArray = requestList.map(item => {
                if (item.new_product == false && item.product_id == '') {
                    return { ...item, productErr: 'Select Product' }
                }
                return item
            })
            setRequestList(updateArray);
            return;
        } else if (findProductNameEmptyIndex != -1) {
            let updateArray = requestList.map(item => {
                if (item.new_product == true && item.product_name.trim() == '') {
                    return { ...item, productErr: 'Enter Product Name' }
                }
                return item
            })
            setRequestList(updateArray);
            return;
        } 
        // else if (findQtyEmptyindex != -1) {
        //     let updateArray = requestList.map(item => {
        //         if (item.qty.trim() == '') {
        //             return { ...item, qtyErr: 'Enter Qty' }
        //         }
        //         return item
        //     })
        //     setRequestList(updateArray);
        //     return;
        // }
        // else if (findUnitEmptyindex != -1) {
        //     let updateArray = requestList.map(item => {
        //         if (item.unit == '') {
        //             return { ...item, unitErr: 'Select Unit' }
        //         }
        //         return item
        //     })
        //     setRequestList(updateArray);
        //     return;
        // } 
        else if (findImgEmptyindex != -1) {
            let updateArray = requestList.map(item => {
                if (item.product_image.length <= 0) {
                    return { ...item, product_imageErr: 'Upload Image' }
                }
                return item
            })
            setRequestList(updateArray);
            return;
        } else if (state.collectionDate == '') {
            ToastMessage('Select Collection Request Date');
            return;
        } else if (!state.gps_img) {
            ToastMessage('Upload GPS Track Image');
            return;
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loadingNew: true
                }))
                // let updatearr = requestList.map(item => {
                //     if (!item.product_image?.uri) {
                //         return { ...item, product_image: '' }
                //     }
                //     return item
                // })
                let datas = {
                    enq_id: state.data?.enq_id,
                    requestList: requestList,
                    gps_image: state.gps_img?.uri ? state.gps_img : '',
                    collection_date: dateConvertNew(state.collectionDate),
                    latitude: state.latitude ? state.latitude : state.data?.latitude,
                    longitude: state.longitude ? state.longitude : state.data?.longitude,
                    device_model: DeviceInfo.getModel(),
                    device_brand: DeviceInfo.getBrand()
                }
                // console.log('postbody', JSON.stringify(datas))
                // return
                let res = await Apis.process_request_update(datas);
                if (__DEV__) {
                    console.log('UpdateRequest', JSON.stringify(res))
                }
                setState(prev => ({
                    ...prev,
                    loadingNew: false
                }))
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
    })

    const onDeleteImage = useCallback(async (type, item, img) => {
        if (type == 'oldproduct') {
            let updatearray = requestList.map(obj => {
                if (obj.sl_no == item.sl_no) {
                    let filterobj = obj.product_image.filter(ob => ob != img)
                    return { ...obj, product_image: filterobj }
                }
                return obj;
            });
            // console.log('deleteimg', JSON.stringify(updatearray))
            setRequestList(updatearray)
        } else if (type == 'newproduct') {
            let updatearray = state.product_image.filter(obj => obj != img)
            setState(prev => ({
                ...prev,
                product_image: updatearray
            }))
        }
    })

    const renderFooter = () => (
        <View style={{ marginBottom: 0 }}>
            <View style={[styles.flex, { marginBottom: '8%' }]}>
                <TouchableOpacity onPress={onModalShow} activeOpacity={0.5} style={styles.uploadBtn}>
                    <Text style={styles.uploadText}>Item not in list</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onAddMore} activeOpacity={0.5} style={styles.uploadBtn}>
                    <Text style={styles.uploadText}>Add more  </Text>
                    <Image source={ImagePath.add_blank} style={styles.uploadicon} />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.flexNew}>
                    <Text style={CommonStyle.boldblacktext}>Tentative collection request date:  </Text>
                    <TouchableOpacity onPress={onOpenDatePicker} activeOpacity={0.5} style={{ width: '30%' }}>
                        <TextInput value={dateConvertNew(state.collectionDate)} editable={false} placeholder='Select Date' style={[styles.productInput, { width: '100%' }]} />
                        {/* <Image source={ImagePath.date} style={{ width: 20, height: 20 }} /> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.uploadContainer}>
                    <Text style={CommonStyle.boldblacktext}>Upload GPS Track Image :</Text>
                    {(state.gps_img) ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => onViewImage(state.gps_img.uri ? state.gps_img.uri : state.gps_img)} activeOpacity={0.5} style={styles.gpsContainer}>
                                <Image source={state.gps_img.uri ? state.gps_img : { uri: state.gps_img }} style={styles.gpsImage} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onShowPicker('gps')} style={{ marginLeft: '6%' }}>
                                <Image source={ImagePath.edit} style={{ width: 20, height: 20, tintColor: Colors.theme_color }} />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => onShowPicker('gps')} activeOpacity={0.5} style={styles.uploadBtn}>
                            <Text style={styles.uploadText}>Upload  </Text>
                            <Image source={ImagePath.upload_image} style={styles.uploadicon} />
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity onPress={onUpdate} activeOpacity={0.5} style={styles.submitBtn}>
                    <Text style={styles.uploadText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity activeOpacity={0.5} style={styles.submitBtn}>
                <Text style={styles.uploadText}>SUBMIT</Text>
            </TouchableOpacity> */}
        </View>
    )
    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Edit Request'}
                leftIcon={ImagePath.back}
                leftOnPress={onHeaderPress}
            />
            {(state.loading) ? <Loader loading={state.loading} /> :
                <View style={{ flex: 1 }}>
                    <View style={styles.headerContent}>
                        <Text style={[CommonStyle.boldblacktext, { textAlign: 'center' }]}>REQ ID : {state.data?.enquiry_no}</Text>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerLeft}>
                                <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>Plant Name : <Text style={[CommonStyle.boldblacktext, { fontSize: 12 }]}>{userProfile?.company_name}</Text></Text>
                            </View>
                            <View style={styles.headerRight}>
                                <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>{userProfile?.full_address}</Text>
                                {/* <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>WEST BENGAL</Text> */}
                                <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>{userProfile?.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: '3%' }}>
                        <FlatList
                            data={requestList}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) =>
                                <List
                                    item={item}
                                    products={productList}
                                    onChangeProduct={onChangeProduct}
                                    onChangeQty={onChangeQty}
                                    onChangeUnit={onChangeUnit}
                                    units={unitList}
                                    onDelete={onDeleteAlert}
                                    arrLength={requestList.length}
                                    onViewImage={onViewImage}
                                    onChangeHsn={onChangeHsn}
                                    onChangeProductName={onChangeProductName}
                                    onChangeImage={onShowPicker}
                                    onDeleteImage={onDeleteImage}
                                />}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={renderFooter}
                            style={{ marginBottom: '1%' }}
                        />
                    </View>
                </View>
            }
            <ModalPop
                modalVisible={state.modalVisible}
                onModalHide={onModalHide}
                onChangeProduct={onChangeProductNameNew}
                onChangeHsn={onChangeHsnNew}
                onChangeCheckBox={onChangeCheckBox}
                allData={state}
                onSubmit={onAddProduct}
                onAddImage={onShowPicker}
                onViewImage={onViewImage}
                onDeleteImage={onDeleteImage}
            />
            <ImageOptions
                modalVisible={state.pickerModal}
                onHideModal={onHidePicker}
                onSortItemSelect={onSelectImageOption}
            />
            {(state.collectionDatePicker) && (
                <DateTimePickers
                    value={state.collectionDate ? new Date(state.collectionDate) : new Date()}
                    mode={'date'}
                    onConfirm={onChangeCollectionDate}
                    minimumDate={new Date()}
                />
            )}
            {(state.viewImgeUri) && (
                <ImageView
                    imageUri={state.viewImgeUri}
                    onClose={onViewImage}
                />
            )}
            {(state.loadingNew) && (
                <LoaderTransparent loading={state.loadingNew} />
            )}
        </SafeAreaView>
    )
}

export default EditRequest