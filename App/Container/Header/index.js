import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../Service/Context'
import { Colors } from '../../Utils/Colors'

const Header = ({ name, leftIcon, leftOnPress }) => {

    const context = useContext(AuthContext);
    const { isLogin } = context.allData
    const navigation = useNavigation();

    const onRightPress = useCallback(async () => {
        if (isLogin) {
            navigation.openDrawer();
        }
    })

    return (
        <View style={styles.container}>
            {(leftIcon) && (
                <TouchableOpacity activeOpacity={0.5} onPress={() => leftOnPress()} disabled={!leftOnPress}>
                    <Image source={leftIcon} style={styles.leftImg} />
                </TouchableOpacity>
            )}
            <Text style={styles.headingText}>{name}</Text>
            {/* <View></View> */}
            <TouchableOpacity activeOpacity={0.5} disabled={!isLogin} onPress={onRightPress}>
                <Image source={ImagePath.menu} style={[styles.leftImg, !isLogin && { tintColor: Colors.theme_color }]} />
            </TouchableOpacity>
        </View>
    )
}

export default Header