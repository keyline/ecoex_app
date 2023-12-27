import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import Modal from 'react-native-modal'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import CheckBox from '@react-native-community/checkbox'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'


const ModalPop = ({ modalVisible, allData, onModalHide, onDeleteImage, onChangeProduct, onChangeHsn, onChangeCheckBox, onSubmit, onAddImage, onViewImage }) => {

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
                        keyboardType='number-pad'
                    />
                    {(allData.product_image && allData.product_image.length > 0) ?
                        <View>
                            <View style={[styles.productimgContainer, { width: '100%', marginTop: 10 }]}>
                                {allData.product_image.map((item, key) => (
                                    <View key={key} style={{ marginRight: 15 }}>
                                        <TouchableOpacity onPress={() => onViewImage(item?.uri)} style={styles.addmoreContainer}>
                                            <Image source={item} style={[styles.addmoreImg, { opacity: 0.8 }]} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => onDeleteImage('newproduct', allData.product_image, item)} style={styles.imgCloseContainer}>
                                            <Image source={ImagePath.close_round} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                {(allData.product_image && allData.product_image.length < 4) && (
                                    <TouchableOpacity onPress={() => onAddImage('newproduct')} activeOpacity={0.5} style={[styles.addmoreContainer, { borderWidth: 0, borderRadius: 0, backgroundColor: Colors.white }]}>
                                        <Image source={ImagePath.camera} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Text style={[styles.hintText, { textAlign: 'center' }]}>(Max upto 4)</Text>
                        </View>
                        :
                        <TouchableOpacity onPress={() => onAddImage('newproduct')} activeOpacity={0.5} style={[styles.submitBtn, { marginTop: 20 }]}>
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