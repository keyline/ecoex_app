import { View, Text } from 'react-native'
import React from 'react'
import ImageView from "react-native-image-viewing";
import { styles } from './styles';

const ImageSlider = ({ navigation, route }) => {
    const images = [
        {
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
    ];

    return (
        <View>
            <ImageView
                images={route?.params?.images}
                imageIndex={0}
                visible={true}
                onRequestClose={() => navigation.goBack()}
            />
        </View>
    )
}

export default ImageSlider