import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { Font_Family } from '../../../Utils/Fonts'
import { Colors } from '../../../Utils/Colors'
import { styles } from './styles'
import { ImagePath } from '../../../Utils/ImagePath'

const ItemList = ({ data, status,alldata, onShowImage }) => {

    const [state, setState] = useState({
        show: false,
    })

    const onShowHide = useCallback(() => {
        setState(prev => ({
            ...prev,
            show: !state.show
        }))
    }, [state.show])

    const NameValue = ({ name, value, bold }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2%' }}>
            <Text style={[CommonStyle.boldblacktext, { width: '45%' }]}>{name} :  </Text>
            <Text style={[CommonStyle.normalText, { width: '50%' }, bold && { fontFamily: Font_Family.NunitoSans_Bold }]}>{value}</Text>
        </View>
    )

    return (
        <View>
            <TouchableOpacity onPress={onShowHide} activeOpacity={0.5} style={styles.itemHeader}>
                <Text style={[CommonStyle.boldblacktext, { color: Colors.white }]}>Total Item(s) : {data.length}</Text>
                <Image source={state.show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
            </TouchableOpacity>
            {(data && data.length > 0 && state.show) && (
                <View style={{ marginBottom: '2%' }}>
                    {data.map((item, key) =>(
                    <View key={key} style={[styles.listContainer, { marginTop: '0%', marginBottom: '2%' }]}>
                        <NameValue name={'Item Name'} value={item?.item_name} bold={true} />
                        <NameValue name={'HSN'} value={item?.item_hsn} />
                        {/* <NameValue name={'Qty (Weighted)'} value={item?.item_qty + ' ' + item?.item_unit} /> */}
                        {(item?.item_qty && item?.item_qty > 0) && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '2%' }}>
                                <Text style={[CommonStyle.boldblacktext, { width: '50%' }]}>Qty (Weighted) :  </Text>
                                <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[CommonStyle.normalText, { fontFamily: Font_Family.NunitoSans_Bold }]}>{item?.item_qty + ' ' + item?.item_unit}</Text>
                                    {(data?.is_plant_ecoex_confirm < 1) ? (
                                        <Text style={{ color: Colors.yellow, fontSize: 10 }}>  (Approve Pending)</Text>
                                    ) : (
                                        <Text style={{ color: Colors.theme_color, fontSize: 10 }}>  (Approved)</Text>
                                    )}
                                </View>
                            </View>
                        )}
                        {/* <NameValue name={'Unit Price'} value={'₹ ' + item?.item_quote_price + ' / ' + item?.item_unit} bold={true} /> */}
                        {(item.item_images && item.item_images.length > 0) && (
                            <View style={styles.flex}>
                                <Text style={CommonStyle.boldblacktext}>Product Image(s) :</Text>
                                <View style={[styles.veimgContainer, { width: '50%' }]}>
                                    {(item?.item_images.length > 1) ? (
                                        <TouchableOpacity onPress={() => onShowImage(item?.item_images)} activeOpacity={0.5} style={{ marginRight: '4%', borderRadius: 5, borderWidth: 1, overflow: 'hidden' }}>
                                            <Image source={{ uri: item.item_images[0].link }} style={[styles.listimg, { opacity: 0.5, zIndex: 9 }]} />
                                            <View style={styles.imgCountContent}>
                                                <Text style={[CommonStyle.boldblacktext, { color: Colors.black, fontSize: 28, zIndex: 99 }]}>{item?.item_images.length}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                        :
                                        (
                                            <TouchableOpacity onPress={() => onShowImage(item?.item_images)} activeOpacity={0.5} style={{ marginRight: '4%', borderRadius: 5, borderWidth: 1, overflow: 'hidden' }}>
                                                <Image source={{ uri: item.item_images[0].link }} style={styles.listimg} />
                                            </TouchableOpacity>
                                        )}
                                </View>
                            </View>
                            // <TouchableOpacity onPress={() => onShowImage(item?.item_images)} activeOpacity={0.5} style={styles.imgBtn}>
                            //     <Text style={styles.imgBtnText}>View Product Image</Text>
                            // </TouchableOpacity>
                        )}
                        {(item?.materials && item?.materials?.weighing_slip_img.length > 0) && (
                            <View style={[styles.flex, { marginTop: '2%' }]}>
                                <Text style={CommonStyle.boldblacktext}>Weight Slip Image(s) :</Text>
                                <View style={[styles.veimgContainer, { width: '50%' }]}>
                                    {(item?.materials?.weighing_slip_img.length > 1) ? (
                                        <TouchableOpacity onPress={() => onShowImage(item?.materials?.weighing_slip_img, '')} activeOpacity={0.5} style={{ marginRight: '4%', borderRadius: 5, borderWidth: 1, overflow: 'hidden' }}>
                                            <Image source={{ uri: item?.materials.weighing_slip_img[0] }} style={[styles.listimg, { opacity: 0.5, zIndex: 9 }]} />
                                            <View style={styles.imgCountContent}>
                                                <Text style={[CommonStyle.boldblacktext, { color: Colors.black, fontSize: 28, zIndex: 99 }]}>{item?.materials?.weighing_slip_img.length}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                        :
                                        (
                                            <TouchableOpacity onPress={() => onShowImage(item?.materials?.weighing_slip_img, '')} activeOpacity={0.5} style={{ marginRight: '4%', borderRadius: 5, borderWidth: 1, overflow: 'hidden' }}>
                                                <Image source={{ uri: item?.materials.weighing_slip_img[0] }} style={styles.listimg} />
                                            </TouchableOpacity>
                                        )}
                                </View>
                            </View>
                        )}
                    </View>
                ))}
                </View>
            )}
        </View>
    )
}

export default memo(ItemList)