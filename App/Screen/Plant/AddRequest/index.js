import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, Keyboard, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import ElementDropDown from '../../../Container/ElementDropDown'
import List from './List'
import ModalPop from './ModalPop'
import { LaunchCamera, LaunchImageLibary, ToastMessage, dateConvertNew, generateRandomId } from '../../../Service/CommonFunction'
import ImageOptions from '../../../Container/ImageOptions'
import ImageView from '../../../Container/ImageView'
import { useFocusEffect } from '@react-navigation/native'
import Apis from '../../../Service/Apis'
import { Colors } from '../../../Utils/Colors'
import DateTimePickers from '../../../Container/DateTimePickers'

const products = [
    { label: 'Product 1', value: '1' },
    { label: 'Product 2', value: '2' },
    { label: 'Product 3', value: '3' },
    { label: 'Product 4', value: '4' },
]

const category = [
    { label: 'Category 1', value: '1' },
    { label: 'Category 2', value: '2' },
    { label: 'Category 3', value: '3' },
    { label: 'Category 4', value: '4' },
]

const AddRequest = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        data: null,
        product: '',
        productErr: '',
        modalVisible: false,
        pr_name: '',
        hsn: '',
        checkValue: false,
        pickerModal: false,
        product_image: null,
        pickerModalType: '',
        collectionDate: '',
        collectionDatePicker: false,
        gps_img: null,
        viewImgeUri: null
    })
    const [productList, setProductList] = useState([]);
    const [reqList, setReqList] = useState([
        { sl_no: generateRandomId(), product_id: '', hsn: '', productErr: '', new_product: false }
    ])

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetProduct();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetProduct = useCallback(async () => {
        try {
            showLoading();
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
                    return parray;
                }
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
            loading: true
        }))
    }, [state.loading])

    const hideLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: false
        }))
    }, [state.loading])

    const onChangeProduct = useCallback(async (item, pr) => {
        // console.log('item', item)
        // console.log('pr', pr)
        if (item && pr) {
            let updateArray = reqList.map(obj => {
                if (obj.sl_no === item.sl_no) {
                    return { ...obj, product_id: pr.value, hsn: pr.hsn_code, productErr: '' }
                }
                return obj;
            });
            setReqList(updateArray);
        }
    })

    const onAddMore = useCallback(async () => {
        let myArr = reqList
        let obj = { sl_no: generateRandomId(), product_id: '', hsn: '', productErr: '', new_product: false }
        myArr.push(obj);
        let tempData = [];
        myArr.map(item => {
            tempData.push(item)
        });
        setReqList(tempData);
        // console.log('arr', JSON.stringify(myArr))
    })

    const onDelete = useCallback(async (items) => {
        let tempArr = reqList.filter(obj => obj != items);
        setReqList(tempArr)
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
            product_image: null,
            checkValue: false,
            modalVisible: false
        }))
    })

    const onChangeProductName = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            pr_name: val
        }))
    }, [state.pr_name])

    const onChangeHsn = useCallback(async (val) => {
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

    const onShowPicker = useCallback(async (type) => {
        Keyboard.dismiss();
        setState(prev => ({
            ...prev,
            pickerModalType: type,
            pickerModal: true
        }))
    }, [state.pickerModal, state.pickerModalType])

    const onHidePicker = useCallback(async () => {
        setState(prev => ({
            ...prev,
            pickerModalType: '',
            pickerModal: false
        }))
    }, [state.pickerModal, state.pickerModalType])

    const onSelectImageOption = useCallback(async (value) => {
        try {
            if (value == 1) {
                let libaryImageRes = await LaunchImageLibary(true);
                if (__DEV__) {
                    console.log('LibaryImage', libaryImageRes)
                }
                if (libaryImageRes.assets && libaryImageRes.assets.length > 0) {
                    if (state.pickerModalType == 'gps') {
                        setState(prev => ({
                            ...prev,
                            gps_img: libaryImageRes.assets[0]
                        }))
                        onHidePicker();
                    } else {
                        setState(prev => ({
                            ...prev,
                            product_image: libaryImageRes.assets[0]
                        }))
                        onHidePicker();
                    }
                } else {
                    onHidePicker();
                }
            } else {
                let cameraImageRes = await LaunchCamera(true);
                if (__DEV__) {
                    console.log('CameraImage', cameraImageRes)
                }
                if (cameraImageRes.assets && cameraImageRes.assets.length > 0) {
                    if (state.pickerModalType == 'gps') {
                        setState(prev => ({
                            ...prev,
                            gps_img: cameraImageRes.assets[0]
                        }))
                        onHidePicker();
                    } else {
                        setState(prev => ({
                            ...prev,
                            product_image: cameraImageRes.assets[0]
                        }))
                        onHidePicker();
                    }
                } else {
                    onHidePicker();
                }
            }
        } catch (error) {

        }
    })

    const onAddProduct = useCallback(async () => {
        if (state.pr_name.trim() == '') {
            ToastMessage('Enter Product Name');
            return
        } else if (!state.product_image) {
            ToastMessage('Choose Product Image');
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
                new_product: true
            }
            // onAdd(data);
            let myArr = reqList
            myArr.push(data)
            setReqList(myArr)
            onModalHide();
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

    const onSubmit = useCallback(async () => {
        let findEmptyindex = reqList.findIndex(obj => (obj.new_product == false && obj.product_id == ''));
        if (findEmptyindex != -1) {
            let updateArray = reqList.map(item => {
                if (item.new_product == false && item.product_id == '') {
                    return { ...item, productErr: 'Select Product' }
                }
                return item
            })
            setReqList(updateArray);
            return;
        } else if (state.collectionDate == '') {
            ToastMessage('Select Collection Request Date');
            return;
        } else if (!state.gps_img) {
            ToastMessage('Upload GPS Track Image');
            return;
        } else {
            let datas = {
                requestList: reqList,
                gps_image: state.gps_img,
                collection_date: dateConvertNew(state.collectionDate)
            }
            console.log('PostBody', JSON.stringify(datas))
        }
    })

    const renderFooter = () => (
        <View style={{ marginBottom: '2%' }}>
            <View style={[styles.flex, { marginBottom: '4%' }]}>
                <TouchableOpacity onPress={onModalShow} activeOpacity={0.5} style={styles.uploadBtn}>
                    <Text style={styles.uploadText}>Item not in list</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onAddMore} activeOpacity={0.5} style={styles.uploadBtn}>
                    <Text style={styles.uploadText}>Add more  </Text>
                    <Image source={ImagePath.add_blank} style={styles.uploadicon} />
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
                name={'Add Request'}
                leftIcon={ImagePath.back}
                leftOnPress={onHeaderPress}
            />
            {/* <ScrollView> */}
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <Text style={CommonStyle.normalText}>Plant ID : <Text style={CommonStyle.boldblacktext}>1234567890</Text></Text>
                </View>
                <View style={styles.headerRight}>
                    <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>36 A CHANDI GHOSH ROAD KOLKATA 700002</Text>
                    <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>WEST BENGAL</Text>
                    <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>info@keylines.net</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginTop: '3%' }}>
                <FlatList
                    data={reqList}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                        <List
                            item={item}
                            products={productList}
                            onChangeProduct={onChangeProduct}
                            onDelete={onDelete}
                            arrLength={reqList.length}
                            onViewImage={onViewImage}
                        />}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={renderFooter}
                    style={{ marginBottom: '1%' }}
                />
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
                        <TouchableOpacity onPress={() => onViewImage(state.gps_img?.uri)} activeOpacity={0.5} style={styles.gpsContainer}>
                            <Image source={state.gps_img} style={styles.gpsImage} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => onShowPicker('gps')} activeOpacity={0.5} style={styles.uploadBtn}>
                            <Text style={styles.uploadText}>Upload  </Text>
                            <Image source={ImagePath.upload_image} style={styles.uploadicon} />
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity onPress={onSubmit} activeOpacity={0.5} style={styles.submitBtn}>
                    <Text style={styles.uploadText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            <ModalPop
                modalVisible={state.modalVisible}
                onModalHide={onModalHide}
                onChangeProduct={onChangeProductName}
                onChangeHsn={onChangeHsn}
                onChangeCheckBox={onChangeCheckBox}
                allData={state}
                category={category}
                onSubmit={onAddProduct}
                onAddImage={onShowPicker}
                onViewImage={onViewImage}
            />
            <ImageOptions
                modalVisible={state.pickerModal}
                onHideModal={onHidePicker}
                onSortItemSelect={onSelectImageOption}
            />
            {(state.viewImgeUri) && (
                <ImageView
                    imageUri={state.viewImgeUri}
                    onClose={onViewImage}
                />
            )}
            {(state.collectionDatePicker) && (
                <DateTimePickers
                    value={state.collectionDate ? new Date(state.collectionDate) : new Date()}
                    mode={'date'}
                    onConfirm={onChangeCollectionDate}
                    minimumDate={new Date()}
                />
            )}
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

export default AddRequest