import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import ElementDropDown from '../../../Container/ElementDropDown'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { Colors } from '../../../Utils/Colors'

const List = ({ item, products, units, onChangeProduct, onDeleteImage, onAddImage, onChangeQty, onChangeUnit, onDelete, arrLength, onViewImage }) => {
    return (
        <View style={styles.itemContainer}>
            {(arrLength > 1) && (
                <TouchableOpacity onPress={() => onDelete(item)} activeOpacity={0.5} style={styles.deleteContainer}>
                    <Image source={ImagePath.close} style={styles.closeIcon} />
                </TouchableOpacity>
            )}
            {(item?.new_product) ?
                <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.modalText, { marginTop: 10 }]}>Product Name :</Text>
                    <TextInput
                        style={[styles.productInput, { width: '60%' }]}
                        value={item?.product_name}
                        placeholder='Enter Product Name'
                        editable={false}
                        textAlignVertical='center'
                        // onChangeText={txt => onChangeProduct(txt)}
                        placeholderTextColor={Colors.grey}
                    />
                </View>
                :
                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <ElementDropDown
                        name={'Product'}
                        data={products}
                        value={item.product_id}
                        setValue={(pr) => onChangeProduct(item, pr)}
                        error={item?.productErr}
                    />
                </View>
            }
            {(item.hsn) && (
                <Text style={styles.hsntext}>HSN Code : {item?.hsn}</Text>
            )}
            <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '3%' }}>
                <Text style={[styles.modalText, { marginTop: 10 }]}>Appx Qty :</Text>
                <View style={{ width: '60%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={[styles.productInput, { width: !item.new_product ? '80%' : '100%' }, item?.qtyErr && { borderColor: 'red', borderWidth: 1.5 }]}
                            value={item?.qty}
                            placeholder='Enter Approx Qty'
                            editable={true}
                            textAlignVertical='center'
                            keyboardType='number-pad'
                            onChangeText={txt => onChangeQty(item, txt)}
                            placeholderTextColor={Colors.grey}
                        />
                        {(!item.new_product && item?.unit) && (
                            <Text style={CommonStyle.boldblacktext}> {item?.unit}</Text>
                        )}
                    </View>
                    {(item.qtyErr) && (
                        <Text style={CommonStyle.errortxt}> {item?.qtyErr}</Text>
                    )}
                </View>
            </View>
            {(item?.new_product) && (
                <View style={{ width: '80%', alignSelf: 'center', marginTop: '3%' }}>
                    <ElementDropDown
                        name={'Unit'}
                        data={units}
                        value={item?.unit}
                        setValue={(pr) => onChangeUnit(item, pr)}
                        error={item?.unitErr}
                    />
                </View>
            )}
            <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5%' }}>
                <Text style={[styles.modalText, { marginTop: 10 }]}>Add Image :</Text>
                <View style={styles.productimgContainer}>
                    {(item.product_image && item.product_image.length > 0) && (
                        <>
                            {item.product_image.map((items, key) => (
                                <View key={key} style={{ marginRight: 15 }}>
                                    <TouchableOpacity onPress={() => onViewImage(items?.uri)} activeOpacity={0.5} style={styles.addmoreContainer}>
                                        <Image source={items} style={[styles.addmoreImg, { opacity: 0.8 }]} />
                                    </TouchableOpacity>
                                    {/* {(item.product_image.length > 1) && ( */}
                                        <TouchableOpacity onPress={() => onDeleteImage('product', item, items)} style={styles.imgCloseContainer}>
                                            <Image source={ImagePath.close_round} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    {/* )} */}
                                </View>
                            ))}
                        </>
                    )}
                    {(item.product_image && item.product_image.length < 4) && (
                        <TouchableOpacity onPress={() => onAddImage('oldproduct', item)} activeOpacity={0.5} style={[styles.addmoreContainer, { borderWidth: 0, borderRadius: 0 }]}>
                            <Image source={ImagePath.camera} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {(item?.product_imageErr) && (
                <Text style={[CommonStyle.errortxt, { width: '60%', alignSelf: 'flex-end' }]}>{item.product_imageErr}</Text>
            )}
            {/* {(item?.new_product && item?.product_image) && (
                <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '3%' }}>
                    <Text style={[styles.modalText, { marginTop: 10 }]}>Image :</Text>
                    <TouchableOpacity onPress={() => onViewImage(item?.product_image?.uri)} activeOpacity={0.5} style={styles.gpsContainer}>
                        <Image source={item?.product_image} style={styles.gpsImage} />
                    </TouchableOpacity>
                </View>
            )} */}
            {/* <View style={styles.uploadContainer}>
                <Text style={CommonStyle.boldblacktext}>Upload GPS Track Image :</Text>
                <TouchableOpacity activeOpacity={0.5} style={styles.uploadBtn}>
                    <Text style={styles.uploadText}>Upload  </Text>
                    <Image source={ImagePath.upload_image} style={styles.uploadicon} />
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

export default List