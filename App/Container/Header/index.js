import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { useNavigation } from '@react-navigation/native'

const Header = ({ name, leftIcon, leftOnPress }) => {

    const navigation = useNavigation();

    const onRightPress = useCallback(async () => {
        navigation.openDrawer();
    })

    return (
        <View style={styles.container}>
            {(leftIcon) && (
                <TouchableOpacity activeOpacity={0.5} onPress={() => leftOnPress()} disabled={!leftOnPress}>
                    <Image source={leftIcon} style={styles.leftImg} />
                </TouchableOpacity>
            )}
            <Text style={styles.headingText}>{name}</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={onRightPress}>
                <Image source={ImagePath.menu} style={styles.leftImg} />
            </TouchableOpacity>
        </View>
    )
}

export default Header