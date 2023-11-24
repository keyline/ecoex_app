import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'

const InputSmall = ({ value, width, placeholder, onChangeText }) => {
    return (
        <View style={[styles.container, { width: width ? width : '80%' }]}>
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={(val) => onChangeText(val)}
                style={styles.input}
                textAlignVertical='center'
                textAlign='center'
            />
        </View>
    )
}

export default InputSmall