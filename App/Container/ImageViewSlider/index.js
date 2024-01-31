import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ImageView from "react-native-image-viewing";
import { styles } from './styles';

const ImageViewSlider = ({ images, onClose }) => {

    const [currentIndex, setcurrentIndex] = useState(0);

    const renderFooter = () => (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{currentIndex + 1 + ' / ' + images.length}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <ImageView
                images={images}
                imageIndex={0}
                visible={true}
                onRequestClose={() => onClose()}
                FooterComponent={renderFooter}
                onImageIndexChange={val => setcurrentIndex(val)}
            />
        </View>
    )
}

export default ImageViewSlider