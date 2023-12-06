import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

const EmptyContent = ({ word }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.emptyText}>{word}</Text>
        </View>
    )
}

export default EmptyContent