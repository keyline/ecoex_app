import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import Modal from 'react-native-modal'
import { styles } from './styles'
import ElementDropDown from '../../../Container/ElementDropDown'
import InputField from '../../../Container/InputField'
import { Colors } from '../../../Utils/Colors'
import { ToastMessage } from '../../../Service/CommonFunction'
import CheckBox from '@react-native-community/checkbox'
import { CommonStyle } from '../../../Utils/CommonStyle'


const ModalPop = ({ modalVisible, allData, onModalHide, category, onAdd, onChangeProduct, onChangeHsn, onChangeCheckBox, onSubmit, onAddImage, onViewImage }) => {

    const [datas, setDatas] = useState({
        cat_id: '',
        catErr: '',
        pr_name: '',
        hsn: '',
        checkValue: true,
        pickerModal: true
    })

    const onChangeCategory = useCallback(async (item) => {
        setDatas(prev => ({
            ...prev,
            cat_id: item?.value,
            catErr: ''
        }))
    })



    // const onSubmit = useCallback(async () => {
    //     if (datas.cat_id == '') {
    //         setDatas(prev => ({
    //             ...prev,
    //             catErr: 'error'
    //         }))
    //         ToastMessage('Select Category');
    //         return;
    //     } else if (datas.pr_name.trim() == '') {
    //         ToastMessage('Enter Product Name');
    //         return
    //     } else {
    //         let data = {
    //             category_id: datas.cat_id,
    //             product_name: datas.pr_name,
    //             hsn: datas.hsn,
    //             gps_image: '',
    //             new_product: true
    //         }
    //         onAdd(data);
    //     }
    // })

    return (
        <Modal
            isVisible={modalVisible}
            animationInTiming={800}
            animationOutTiming={800}
            coverScreen={false}
            style={styles.modalStyle}
            onBackdropPress={() => onModalHide()}
            onBackButtonPress={() => onModalHide()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeading}>
                    <Text style={styles.modalHeadingText}>Add New Product</Text>
                </View>
                <View style={styles.modalContent}>
                    {/* <Text style={styles.modalText}>Select Category :</Text>
                    <ElementDropDown
                        // name={'Category'}
                        data={category}
                        placeholder={'Select Category'}
                        width={'100%'}
                        value={datas.cat_id}
                        setValue={(item) => onChangeCategory(item)}
                        error={datas.catErr}
                    /> */}
                    <Text style={[styles.modalText, { marginTop: 5 }]}>Product Name :</Text>
                    <TextInput
                        style={styles.input}
                        value={allData.pr_name}
                        placeholder='Enter Product Name'
                        onChangeText={txt => onChangeProduct(txt)}
                        placeholderTextColor={Colors.grey}
                    />
                    <Text style={[styles.modalText, { marginTop: 10 }]}>HSN Code (Optional) :</Text>
                    <TextInput
                        style={styles.input}
                        value={allData?.hsn}
                        placeholder='Enter HSN Code'
                        onChangeText={txt => onChangeHsn(txt)}
                        placeholderTextColor={Colors.grey}
                    />
                    {(allData.product_image) ?
                        <TouchableOpacity onPress={() => onViewImage(allData.product_image?.uri)} style={[styles.gpsContainer, { alignSelf: 'center', marginTop: '4%' }]}>
                            <Image source={allData.product_image} style={styles.gpsImage} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => onAddImage('product')} activeOpacity={0.5} style={[styles.submitBtn, { marginTop: 20 }]}>
                            <Text style={styles.uploadText}>Add Image</Text>
                        </TouchableOpacity>
                    }
                    <View style={styles.checkContainer}>
                        <CheckBox
                            value={allData.checkValue}
                            disabled={false}
                            onChange={onChangeCheckBox}
                            tintColors={{ true: Colors.theme_color, false: Colors.black }}
                            tintColor={Colors.black}
                            onCheckColor={Colors.theme_color}
                        />
                        <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>I request to add this product in your list</Text>
                    </View>
                    <TouchableOpacity onPress={() => onSubmit()} activeOpacity={0.5} style={[styles.submitBtn, { marginTop: 10 }]}>
                        <Text style={styles.uploadText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalPop