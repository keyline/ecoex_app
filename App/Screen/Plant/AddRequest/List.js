import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import ElementDropDown from '../../../Container/ElementDropDown'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { Colors } from '../../../Utils/Colors'

const List = ({ item, products, onChangeProduct, onDelete, arrLength, onViewImage }) => {
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
                        style={styles.productInput}
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
            {(item?.new_product && item?.product_image) && (
                <View style={{ width: '80%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '3%' }}>
                    <Text style={[styles.modalText, { marginTop: 10 }]}>Product Image :</Text>
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