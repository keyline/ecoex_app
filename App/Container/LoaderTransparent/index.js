import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import { styles } from './styles'

const LoaderTransparent = ({ loading }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ActivityIndicator animating={loading} color={Colors.theme_color} size={'large'} />
            </View>
        </View>
    )
}

export default LoaderTransparent