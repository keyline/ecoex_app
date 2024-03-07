import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { getSubStatus } from '../../../Service/CommonFunction'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Popover from 'react-native-popover-view';
import { ImagePath } from '../../../Utils/ImagePath'

const screenWidth = Dimensions.get('window').width;

const HeaderContent = ({ data }) => {

    const NameValue = ({ name, value, fontSize }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2%' }}>
            <Text style={[CommonStyle.boldblacktext, { width: '45%', fontSize: fontSize ? fontSize : 14 }]}>{name} :  </Text>
            <Text style={[CommonStyle.normalText, { width: '50%', fontSize: fontSize ? fontSize : 14 }]}>{value}</Text>
        </View>
    )

    return (
        <View style={[styles.listContainer, { borderWidth: 1 }]}>
            <NameValue name={'Enquiry No.'} value={data?.enquiry_no} />
            <NameValue name={'Sub Enquiry No.'} value={data?.sub_enquiry_no} />
            <NameValue name={'Vendor'} value={data?.vendor_name} />
            {(data?.assigned_date) && <NameValue name={getSubStatus('3.3')} value={data?.assigned_date} fontSize={12} />}
            {(data?.pickup_scheduled_date) &&
                //  <NameValue name={getSubStatus('4.4')} value={data?.pickup_scheduled_date} fontSize={12} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2%' }}>
                    <Text style={[CommonStyle.boldblacktext, { width: '45%', fontSize: 12 }]}>{getSubStatus('4.4')} :  </Text>
                    <Popover
                        from={(
                            <TouchableOpacity activeOpacity={0.5} style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                                <Text style={[CommonStyle.normalText, { fontSize: 12 }]}>{data?.pickup_scheduled_date}  </Text>
                                <Image source={ImagePath.info} style={styles.info} />
                            </TouchableOpacity>
                        )}
                    >
                        <View style={{ width: screenWidth * 0.5,justifyContent:'center',alignItems:'center',paddingVertical:15 }}>
                            <Text style={CommonStyle.boldblacktext}>Pickup Scheduled Logs :</Text>
                            {(data?.pickup_date_logs && data?.pickup_date_logs.length > 0) && (
                                <>
                                    {data?.pickup_date_logs.map((item, key) => (
                                        <Text key={key} style={[CommonStyle.normalText,{marginTop:4}]}>{item?.pickup_date}</Text>
                                    ))}
                                </>
                            )}
                        </View>
                    </Popover>
                </View>
            }
            {(data?.vehicle_placed_date) && <NameValue name={getSubStatus('5.5')} value={data?.vehicle_placed_date} fontSize={12} />}
            {(data?.material_weighted_date) && <NameValue name={getSubStatus('6.6')} value={data?.material_weighted_date} fontSize={12} />}
            {(data?.invoice_to_vendor_date) && <NameValue name={getSubStatus('8.8')} value={data?.invoice_to_vendor_date} fontSize={12} />}
            {(data?.vendor_payment_received_date) && <NameValue name={getSubStatus('9.9')} value={data?.vendor_payment_received_date} fontSize={12} />}
            {(data?.vehicle_dispatched_date) && <NameValue name={getSubStatus('10.10')} value={data?.vehicle_dispatched_date} fontSize={12} />}
        </View>
    )
}

export default memo(HeaderContent)