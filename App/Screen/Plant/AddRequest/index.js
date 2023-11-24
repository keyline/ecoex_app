import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import ElementDropDown from '../../../Container/ElementDropDown'
import List from './List'
import ModalPop from './ModalPop'
import { LaunchCamera, LaunchImageLibary, ToastMessage } from '../../../Service/CommonFunction'
import ImageOptions from '../../../Container/ImageOptions'
import ImageView from '../../../Container/ImageView'

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
        laoding: false,
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
        gps_img: null,
        viewImgeUri: null
    })

    const [reqList, setReqList] = useState([
        { sl_no: 1, gps_image: '', product_id: '', hsn: '12345', productErr: '', new_product: false }
    ])

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
    })

    const onChangeProduct = useCallback(async (item, pr) => {
        console.log('item', item)
        console.log('pr', pr)
        // setState(prev => ({
        //     ...prev,
        //     product: item.value,
        //     productErr: ''
        // }))

    })

    const onAddMore = useCallback(async () => {
        let myArr = reqList
        let slno = reqList.length + 1
        let obj = { sl_no: slno, gps_image: '', product_id: '', hsn: '12345', productErr: '', new_product: false }
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
                let libaryImageRes = await LaunchImageLibary();
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
                let cameraImageRes = await LaunchCamera();
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
                // category_id: state.cat_id,
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
                            products={products}
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
                    <TouchableOpacity activeOpacity={0.5}>
                        <Image source={ImagePath.date} style={{ width: 20, height: 20 }} />
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
                <TouchableOpacity activeOpacity={0.5} style={styles.submitBtn}>
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
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

export default AddRequest