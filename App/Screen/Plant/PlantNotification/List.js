import { View, Text } from 'react-native'
import React from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { getRandomColor } from '../../../Service/CommonFunction'
import { styles } from './styles'

const List = ({ item }) => {
    const randomColor = getRandomColor();

    return (
        <View style={[styles.listContainer, { borderColor: randomColor }]}>
            <View style={[styles.listLeftcontent, { backgroundColor: randomColor }]} />
            <View style={styles.listRightcontent}>
                <Text style={CommonStyle.boldblacktext}>{item?.title}</Text>
                <Text style={CommonStyle.normalText}>{item?.description}</Text>
                <Text style={styles.datetext}>{item?.send_timestamp}</Text>
            </View>
        </View>
    )
}

export default List