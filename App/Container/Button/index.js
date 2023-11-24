import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const Button = ({ name, onPress, width, loading }) => {
    return (
        <TouchableOpacity disabled={(loading || !onPress)} onPress={() => onPress()} activeOpacity={0.5} style={[styles.container, { width: width ? width : '70%' }]}>
            {(loading) ?
                <ActivityIndicator color={Colors.white} animating={loading} size={'small'} />
                :
                <Text style={styles.text}>{name}</Text>
            }
        </TouchableOpacity>
    )
}

export default Button