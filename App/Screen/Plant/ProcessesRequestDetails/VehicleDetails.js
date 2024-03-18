import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { Colors } from '../../../Utils/Colors'
import { ImagePath } from '../../../Utils/ImagePath'

const VehicleDetails = ({ vehicleData, alldata, onShowImage }) => {

    const [state, setState] = useState({
        data: vehicleData ? vehicleData : [],
        show: false,

    })

    const onShowHide = useCallback(() => {
        setState(prev => ({
            ...prev,
            show: !state.show
        }))
    }, [state.show])

    const onViewImage = useCallback((item) => {
        let imgarr = item?.vehicle_img
        if (imgarr && imgarr.length > 0) {
            let temparr = imgarr.map(obj => {
                return { link: obj };
            })
            onShowImage(temparr);
        }
    })

    return (
        <View style={{}}>
            <TouchableOpacity onPress={onShowHide} activeOpacity={0.5} style={styles.itemHeader}>
                <Text style={[CommonStyle.boldblacktext, { color: Colors.white }]}>Total Vehicle(s) : {state.data.length}</Text>
                <Image source={state.show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
            </TouchableOpacity>
            {(state.data && state.data.length > 0 && state.show) && (
                <View style={{ marginBottom: '2%' }}>
                    {(state.data).map((item, key) => (
                        <View key={key} style={styles.vehiclelist}>
                            <Text style={[CommonStyle.boldblacktext, { textAlign: 'center' }]}>Vehicle : {key + 1}</Text>
                            <View style={[styles.flex, { paddingBottom: '4%', paddingTop: '5%' }]}>
                                <Text style={CommonStyle.boldblacktext}>Vehicle No. :</Text>
                                <Text style={[CommonStyle.normalText, { width: '50%' }]}>{item?.vehicle_no}</Text>
                            </View>
                            {(item?.vehicle_img && item?.vehicle_img.length > 0) && (
                                <View style={styles.flex}>
                                    <Text style={CommonStyle.boldblacktext}>Vehicle Image(s) :</Text>
                                    <View style={[styles.veimgContainer, { width: '50%' }]}>
                                        {(item?.vehicle_img.length > 1) ? (
                                            <TouchableOpacity onPress={() => onViewImage(item)} activeOpacity={0.5} style={{ marginRight: '4%', borderRadius: 5, borderWidth: 1, overflow: 'hidden' }}>
                                                <Image source={{ uri: item?.vehicle_img[0] }} style={[styles.listimg, { opacity: 0.5 }]} />
                                                <View style={styles.imgCountContent}>
                                                    <Text style={[CommonStyle.boldblacktext, { color: Colors.black, fontSize: 28 }]}>{item?.vehicle_img.length}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                            :
                                            (
                                                <TouchableOpacity onPress={() => onViewImage(item)} activeOpacity={0.5} style={{ marginRight: '4%', borderRadius: 5, borderWidth: 1, overflow: 'hidden' }}>
                                                    <Image source={{ uri: item?.vehicle_img[0] }} style={styles.listimg} />
                                                </TouchableOpacity>
                                            )}
                                        {/* <>
                                            {(item?.vehicle_img).map((obj, key) => (
                                                 <TouchableOpacity onPress={() => onViewImage(item)} key={key} activeOpacity={0.5} style={{ marginRight: '4%', borderRadius: 5, borderWidth: 1, overflow: 'hidden' }}>
                                                     <Image source={{ uri: obj }} style={styles.listimg} />
                                                 </TouchableOpacity>
                                            ))}
                                         </> */}
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

export default memo(VehicleDetails)