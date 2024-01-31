import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'

const InputField = ({ leftIcon, name, maxLength, rightIcon, rightonPress, width, value, keyboardType, secureTextEntry, multiline, onChangeText, editable = true, placeholder, error,isRequired }) => {
    return (
        <View style={[styles.container, { width: width ? width : '100%' }]}>
            {(name) && (
                <Text style={CommonStyle.boldtext}>{name}{isRequired && <Text style={{color:'red'}}> *</Text>}</Text>
            )}
            <View style={[styles.inputContainer, { borderWidth: error ? 1.5 : 0 }]}>
                <TextInput
                    value={value ? value : ''}
                    placeholder={placeholder ? placeholder : `Enter ${name}`}
                    onChangeText={text => onChangeText(text)}
                    secureTextEntry={secureTextEntry ? secureTextEntry : false}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    style={styles.input}
                    placeholderTextColor={'grey'}
                    // editable={editable ? editable : true}
                    editable={editable}
                    multiline={multiline ? multiline : false}
                    maxLength={maxLength ? maxLength : undefined}
                />
                {(rightIcon) && (
                    <TouchableOpacity disabled={!rightonPress} onPress={() => rightonPress()} activeOpacity={0.5}>
                        <Image source={rightIcon} style={styles.righticon} />
                    </TouchableOpacity>
                )}
            </View>
            {(error) && (
                <Text style={CommonStyle.errortxt}>{error}</Text>
            )}
        </View>
    )
}

export default InputField