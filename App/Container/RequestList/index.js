import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import { Colors } from '../../Utils/Colors'

const RequestList = ({ item, index, headingColor, backgroundColor, onEdit, onDelete }) => {

    const [show, setshow] = useState(true);

    // useEffect(() => {
    //     if (index == 0 || index == 1) {
    //         setshow(true)
    //     }
    // }, [])

    const onShow = useCallback(async () => {
        setshow(!show);
    }, [show])

    return (
        <View style={[styles.listContainer, { borderColor: headingColor ? headingColor : Colors.process, backgroundColor: backgroundColor ? backgroundColor : Colors.white }]}>
            <TouchableOpacity onPress={onShow} activeOpacity={0.5} style={[styles.headingContainer, { backgroundColor: headingColor ? headingColor : Colors.process }]}>
                <Text style={CommonStyle.boldblacktext}>REQ ID : {item?.enquiry_no}</Text>
                <Image source={show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
            </TouchableOpacity>
            {(show) && (
                <View style={styles.listContent}>
                    <View style={{ width: '60%' }}>
                        <View style={{ borderBottomWidth: 0.8, borderColor: Colors.grey, marginBottom: 5, paddingBottom: 5 }}>
                            <Text style={CommonStyle.normalText}>Added :</Text>
                            <Text style={CommonStyle.boldblacktext}> {item?.created_at}</Text>
                        </View>
                        <View>
                            <Text style={CommonStyle.normalText}>Modified :</Text>
                            <Text style={CommonStyle.boldblacktext}> {item.updated_at ? item?.updated_at : '---'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onDelete(item)} disabled={!onDelete} activeOpacity={0.5} style={styles.deleteContainer}>
                        <Image source={ImagePath.delete} style={styles.delete} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onEdit(item)} disabled={!onEdit} activeOpacity={0.5} style={styles.editContainer}>
                        <Image source={ImagePath.edit} style={styles.edit} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default RequestList