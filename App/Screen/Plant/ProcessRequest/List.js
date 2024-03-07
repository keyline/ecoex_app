import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import AuthContext from '../../../Service/Context'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { styles } from './styles'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Popover from 'react-native-popover-view'
import { ImagePath } from '../../../Utils/ImagePath'
import { Colors } from '../../../Utils/Colors'
import { getSubStatus } from '../../../Service/CommonFunction'

const screenWidth = Dimensions.get('window').width;

const List = ({ item, index, headingColor, backgroundColor, onViewDetails, viewableItems }) => {

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
                    .find((obj) => obj.item?.enq_id == item?.enq_id)
            );
            return {
                opacity: withTiming(isVisible ? 1 : 0.4),
                transform: [
                    {
                        scale: withTiming(isVisible ? 1 : 0.8),
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
                <Text style={[CommonStyle.boldblacktext,{color:Colors.white}]}>{item?.sub_enquiry_no}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[CommonStyle.boldblacktext, { fontSize: 14, marginRight: 10,color:Colors.white }]}>Products: {item?.product_count}</Text>
                    <Image source={show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
                </View>
            </TouchableOpacity>
            {(show) && (
                <TouchableOpacity onPress={() => onViewDetails(item)} disabled={!onViewDetails} activeOpacity={0.5} style={styles.listContent}>
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={CommonStyle.normalText}>Status :</Text>
                            <Text style={CommonStyle.boldblacktext}>{item?.enquiry_sub_status}</Text>
                        </View>
                        {(item?.assigned_date) && (
                            <View style={styles.listtileContent}>
                                <Text style={CommonStyle.normalText}>Assigned :</Text>
                                <Text style={styles.labelText}> {item.assigned_date ? item?.assigned_date : '---'}</Text>
                            </View>
                        )}
                        {(item?.pickup_scheduled_date) && (
                            <View style={styles.listtileContent}>
                                <Text style={CommonStyle.normalText}>{getSubStatus('4.4')} :</Text>
                                <Text style={styles.labelText}> {item.pickup_scheduled_date ? item?.pickup_scheduled_date : '---'}</Text>
                            </View>
                        )}
                        {(item?.vehicle_placed_date) && (
                            <View style={styles.listtileContent}>
                                <Text style={CommonStyle.normalText}>{getSubStatus('5.5')} :</Text>
                                <Text style={styles.labelText}> {item.vehicle_placed_date ? item?.vehicle_placed_date : '---'}</Text>
                            </View>
                        )}
                        {(item?.material_weighted_date) && (
                            <View style={styles.listtileContent}>
                                <Text style={CommonStyle.normalText}>{getSubStatus('6.6')} :</Text>
                                <Text style={styles.labelText}> {item.material_weighted_date ? item?.material_weighted_date : '---'}</Text>
                            </View>
                        )}
                        {(item?.invoice_to_vendor_date) && (
                            <View style={styles.listtileContent}>
                                <Text style={CommonStyle.normalText}>{getSubStatus('8.8')} :</Text>
                                <Text style={styles.labelText}> {item.invoice_to_vendor_date ? item?.invoice_to_vendor_date : '---'}</Text>
                            </View>
                        )}
                        {(item?.vendor_payment_received_date) && (
                            <View style={styles.listtileContent}>
                                <Text style={CommonStyle.normalText}>{getSubStatus('9.9')} :</Text>
                                <Text style={styles.labelText}> {item.vendor_payment_received_date ? item?.vendor_payment_received_date : '---'}</Text>
                            </View>
                        )}
                        {(item?.vehicle_dispatched_date) && (
                            <View style={styles.listtileContent}>
                                <Text style={CommonStyle.normalText}>{getSubStatus('10.10')} :</Text>
                                <Text style={styles.labelText}> {item.vehicle_dispatched_date ? item?.vehicle_dispatched_date : '---'}</Text>
                            </View>
                        )}
                    </View>
                    {(item?.status != "0" && item?.submitted_count > 0) && (
                        <Popover
                            from={(
                                < TouchableOpacity activeOpacity={0.5} style={styles.infoContainer}>
                                    <Text style={CommonStyle.normalText}>Submited : <Text style={CommonStyle.boldblacktext}>{item?.submitted_count} time(s)</Text>  </Text>
                                    <Image source={ImagePath.info} style={styles.info} />
                                </TouchableOpacity>
                            )}
                        >
                            <View style={{ width: screenWidth * 0.5, padding: 12 }}>
                                <Text style={CommonStyle.boldblacktext}>Request Submited on :</Text>
                                <View >
                                    {(item?.submitted_dates && item?.submitted_dates.length > 0) && (
                                        <>
                                            {item?.submitted_dates.map((item, key) => (
                                                <Text key={key} style={CommonStyle.normalText}>{item}</Text>
                                            ))}
                                        </>
                                    )}
                                </View>
                            </View>
                        </Popover>
                    )}
                </TouchableOpacity>
            )}
        </Animated.View>
    )
}

export default List