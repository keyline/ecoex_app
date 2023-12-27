import { View, Text } from 'react-native'
import React from 'react'

const WebView = ({ route }) => {
    console.log('URL : ', route.params.url)
    return (
        <View>
            <Text>WebView</Text>
        </View>
    )
}

export default WebView