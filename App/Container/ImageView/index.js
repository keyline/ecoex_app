import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'

const ImageView = ({ imageUri, imagePath, onClose }) => {
    return (
        <View style={styles.container}>
            {(imageUri) && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />
            )}
            {(imagePath) && (
                <Image
                    source={imagePath}
                    style={styles.image}
                />
            )}
            <TouchableOpacity onPress={() => onClose()} disabled={!onClose} activeOpacity={0.5} style={styles.closeContainer}>
                <Image source={ImagePath.close} style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default ImageView