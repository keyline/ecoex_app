import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import Modal from 'react-native-modal'
import { Colors } from '../../Utils/Colors'

const ImageOptions = ({ modalVisible, onHideModal, onSortItemSelect }) => {
    return (
        <Modal
            isVisible={modalVisible}
            animationInTiming={800}
            animationOutTiming={800}
            coverScreen={false}
            style={styles.modalStyle}
            onBackdropPress={() => onHideModal()}
            onBackButtonPress={() => onHideModal()}
        >
            <View style={styles.modalContainer}>
                <Text style={[CommonStyle.headingText, { textAlign: 'center', marginBottom: 15, color: Colors.black }]}>Select</Text>
                <TouchableOpacity onPress={() => onSortItemSelect(1)} activeOpacity={0.5} style={styles.sortMenu}>
                    <Image source={ImagePath.upload_image} style={styles.sortliIcon} />
                    <Text style={CommonStyle.boldblacktext}>  Load from Libary</Text>
                </TouchableOpacity>
                <View style={styles.border} />
                <TouchableOpacity onPress={() => onSortItemSelect(2)} activeOpacity={0.5} style={styles.sortMenu}>
                    <Image source={ImagePath.camera} style={styles.sortliIcon} />
                    <Text style={CommonStyle.boldblacktext}>  Open Camera</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ImageOptions