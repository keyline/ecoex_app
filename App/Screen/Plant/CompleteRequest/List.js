import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import AuthContext from '../../../Service/Context'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { styles } from './styles'
import CheckBox from '@react-native-community/checkbox'
import { ImagePath } from '../../../Utils/ImagePath'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { Colors } from '../../../Utils/Colors'

const List = ({ item, index, headingColor, backgroundColor, onEdit, onDelete, onViewDetails, onSelect, viewableItems }) => {

    const context = useContext(AuthContext)
    const { siteData, userProfile } = context.allData
    const [show, setshow] = useState(true);

    const onShow = useCallback(async () => {
        setshow(!show);
    }, [show])

    const rStyle = useAnimatedStyle(() => {
        if (viewableItems) {
            const isVisible = Boolean(
                viewableItems.value
                    .filter((item) => item?.isViewable)
                    .find((obj) => obj.item?.sub_enq_id == item?.sub_enq_id)
            );
            return {
                opacity: withTiming(isVisible ? 1 : 0.4),
                transform: [
                    {
                        scale: withTiming(isVisible ? 1 : 0.6),
                    }
                ]
            }
        } else {
            return {}
        }
    });

    return (
        <Animated.View style={[styles.listContainer, { borderColor: headingColor ? headingColor : Colors.process, backgroundColor: backgroundColor ? backgroundColor : Colors.white }, viewableItems && rStyle]}>
            <TouchableOpacity onPress={onShow} activeOpacity={0.5} style={[styles.headingContainer, { backgroundColor: headingColor ? headingColor : Colors.process }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {(item?.status == "9") && (
                        <CheckBox
                            value={item?.isChecked}
                            onValueChange={val => onSelect(item, val)}
                            tintColors={{ true: Colors.white, false: Colors.black }}
                            tintColor={Colors.black}
                            onCheckColor={Colors.white}
                        />
                    )}
                    <Text style={CommonStyle.boldblacktext}>{item?.sub_enquiry_no}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[CommonStyle.boldblacktext, { fontSize: 14, marginRight: 10 }]}>Products: {item?.product_count}</Text>
                    <Image source={show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
                </View>
            </TouchableOpacity>
            {(show) && (
                <TouchableOpacity onPress={() => onViewDetails(item)} activeOpacity={0.5} style={styles.listContent}>
                    <View style={{ width: '90%' }}>
                        <View style={{ borderBottomWidth: 0.8, borderColor: Colors.grey, marginBottom: 5, paddingBottom: 5 }}>
                            <Text style={CommonStyle.normalText}>Created :</Text>
                            <Text style={CommonStyle.boldblacktext}> {item?.created_at}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 0.8, borderColor: Colors.grey, marginBottom: 5, paddingBottom: 5 }}>
                            <Text style={CommonStyle.normalText}>Assigned :</Text>
                            <Text style={CommonStyle.boldblacktext}> {item?.assigned_date}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 0.8, borderColor: Colors.grey, marginBottom: 5, paddingBottom: 5 }}>
                            <Text style={CommonStyle.normalText}>Completed :</Text>
                            <Text style={CommonStyle.boldblacktext}> {item.order_complete_date ? item?.order_complete_date : '---'}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 0.8, borderColor: Colors.grey, marginBottom: 5, paddingBottom: 5 }}>
                            <Text style={CommonStyle.normalText}>Vendor :</Text>
                            <Text style={[CommonStyle.boldblacktext, { fontSize: 10 }]}> {item?.vendor_name}</Text>
                        </View>
                        {/* <View>
                        <Text style={CommonStyle.normalText}>Tentative Collection :</Text>
                        <Text style={CommonStyle.boldblacktext}> {item?.collection_date}</Text>
                    </View> */}
                    </View>
                    <View style={[styles.statusContainer,{marginTop:10}]}>
                        <Text style={styles.statusText}>{item?.enquiry_main_status}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </Animated.View>
    )
}

export default List