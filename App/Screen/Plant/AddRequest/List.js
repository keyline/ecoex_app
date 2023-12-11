import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import ElementDropDown from '../../../Container/ElementDropDown'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { Colors } from '../../../Utils/Colors'

const List = ({ item, products, units, onChangeProduct, onChangeQty, onChangeUnit, onDelete, arrLength, onViewImage }) => {
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
                <Text style={[styles.modalText, { marginTop: 10 }]}>Qty/Wt. :</Text>
                <View style={{ width: '60%' }}>
                    <TextInput
                        style={[styles.productInput, item?.qtyErr && { borderColor: 'red', borderWidth: 1.5 }]}
                        value={item?.qty}
                        placeholder='Qty/Wt.'
                        editable={true}
                        textAlignVertical='center'
                        keyboardType='number-pad'
                        onChangeText={txt => onChangeQty(item, txt)}
                        placeholderTextColor={Colors.grey}
                    />
                    {(item.qtyErr) && (
                        <Text style={CommonStyle.errortxt}> {item?.qtyErr}</Text>
                    )}
                </View>
            </View>
            <View style={{ width: '80%', alignSelf: 'center', marginTop: '3%' }}>
                <ElementDropDown
                    name={'Unit'}
                    data={units}
                    value={item?.unit}
                    setValue={(pr) => onChangeUnit(item, pr)}
                    error={item?.unitErr}
                />
            </View>
            {(item?.new_product && item?.product_image) && (
                <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '3%' }}>
                    <Text style={[styles.modalText, { marginTop: 10 }]}>Image :</Text>
                    <TouchableOpacity onPress={() => onViewImage(item?.product_image?.uri)} activeOpacity={0.5} style={styles.gpsContainer}>
                        <Image source={item?.product_image} style={styles.gpsImage} />
                    </TouchableOpacity>
                </View>
            )}
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