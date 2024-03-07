import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { Colors } from '../../../Utils/Colors'
import { Font_Family } from '../../../Utils/Fonts'
import { ImagePath } from '../../../Utils/ImagePath'

const MaterialWeightList = ({ item, onChangematerialWeight, onShowImage, onDeleteImage, onShowModal, editable }) => {

    const NameValue = ({ name, value, bold }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2%' }}>
            <Text style={[CommonStyle.boldblacktext, { width: '40%' }]}>{name} :  </Text>
            <Text style={[CommonStyle.normalText, { width: '60%' }, bold && { fontFamily: Font_Family.NunitoSans_Bold }]}>{value}</Text>
        </View>
    )

    return (
        <View style={styles.vehiclelist}>
            <NameValue name={'Item Name'} value={item?.item_name} bold={true} />
            {/* <NameValue name={'Unit Price'} value={'₹ ' + item?.item_quote_price + ' / ' + item?.item_unit} bold={false} /> */}
            <View style={{ paddingBottom: '4%', paddingTop: '2%' }}>
                <View style={[styles.flex,]}>
                    <Text style={CommonStyle.boldblacktext}>Item Weight :</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                        {(editable) ?
                        <TextInput
                            placeholder='Enter Item Weight'
                            style={[styles.veListInput, { borderWidth: 1, width: '70%' }, item.actual_weightErr && { borderColor: 'red', borderWidth: 1.5 }]}
                            value={item?.actual_weight}
                            textAlignVertical='center'
                            placeholderTextColor={Colors.grey}
                            keyboardType='number-pad'
                            maxLength={10}
                            onChangeText={(e) => onChangematerialWeight(e, item)}
                        />
                        :
                        <Text style={CommonStyle.boldblacktext}>{item?.actual_weight}</Text>
}
                        <Text style={CommonStyle.boldblacktext}>  {item?.item_unit}</Text>
                    </View>
                </View>
                {(item.actual_weightErr) && (
                    <Text style={[CommonStyle.errortxt, { width: '60%', alignSelf: 'flex-end' }]}>{item?.actual_weightErr}</Text>
                )}
            </View>
            <View style={styles.flex}>
                <Text style={[CommonStyle.boldblacktext, { width: '40%', fontSize: 14 }]}>Weighing Slip :</Text>
                <View style={styles.veimgContainer}>
                    {(item.weighing_slip_img && item?.weighing_slip_img.length > 0) && (
                        <>
                            {(item?.weighing_slip_img).map((obj, key) => (
                                <View key={key} style={{ marginRight: '8%', marginBottom: '4%' }}>
                                    <TouchableOpacity onPress={() => onShowImage(obj?.uri ? obj?.uri : obj)} activeOpacity={0.5} style={{ borderWidth: 1, overflow: 'hidden', borderRadius: 5 }}>
                                        <Image source={{ uri: obj?.uri ? obj?.uri : obj }} style={styles.listimg} />
                                    </TouchableOpacity>
                                    {(obj?.uri) && (
                                        <TouchableOpacity onPress={() => onDeleteImage(item, obj)} style={styles.imgCloseContainer}>
                                            <Image source={ImagePath.close_round} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </>
                    )}
                    {(editable && item?.weighing_slip_img.length < 6) && (
                        <TouchableOpacity onPress={() => onShowModal(item, 'weight_slip')} activeOpacity={0.5}>
                            <Image source={ImagePath.image_upload} style={styles.uploadimg} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {(item?.weighing_slip_imgErr) && (
                <Text style={[CommonStyle.errortxt, { width: '60%', alignSelf: 'flex-end' }]}>{item?.weighing_slip_imgErr}</Text>
            )}
        </View>
    )
}

export default MaterialWeightList