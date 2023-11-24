import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'

const List = ({ item, onDelete, onView, onEdit }) => {

    const NameValue = ({ name, value }) => (
        <View style={styles.nameContainer}>
            <Text style={CommonStyle.boldtext}>{name} : </Text>
            <Text style={CommonStyle.boldblacktext}>{value}</Text>
        </View>
    )

    const ActionBtn = ({ onPress, Icon }) => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onPress} disabled={!onPress} activeOpacity={0.5}>
            <Image source={Icon} style={styles.btnIcon} />
        </TouchableOpacity>
    )

    return (
        <View style={styles.listContainer}>
            <NameValue name={'Add Date'} value={'16/07/23'} />
            <NameValue name={'Add Time'} value={'4:30 pm'} />
            <NameValue name={'Request ID'} value={'RD00011'} />
            <NameValue name={'Status'} value={'In Process'} />
            <NameValue name={'Modified Date'} value={'16/07/23'} />
            <NameValue name={'Modified Time'} value={'4:30 pm'} />
            <View style={styles.border} />
            <View style={styles.flexContent}>
                <Text style={CommonStyle.boldtext}>Action :</Text>
                <View style={styles.flex}>
                    <ActionBtn onPress={() => onView(item)} Icon={ImagePath.eye_on} />
                    <ActionBtn onPress={() => onEdit(item)} Icon={ImagePath.edit} />
                    <ActionBtn onPress={() => onDelete(item)} Icon={ImagePath.delete} />
                </View>
            </View>
        </View>
    )
}

export default List