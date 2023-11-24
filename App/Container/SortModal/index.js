import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import { Colors } from '../../Utils/Colors'

const SortModal = ({ modalVisible, onHideModal, onSortItemSelect }) => {
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
                <Text style={[CommonStyle.headingText, { textAlign: 'center', marginBottom: 15, color: Colors.black }]}>Sort by</Text>
                <TouchableOpacity onPress={() => onSortItemSelect(1)} activeOpacity={0.5} style={styles.sortMenu}>
                    <Image source={ImagePath.edit} style={styles.sortliIcon} />
                    <Text style={CommonStyle.boldblacktext}>  Request ID (A-Z)</Text>
                </TouchableOpacity>
                <View style={styles.border} />
                <TouchableOpacity onPress={() => onSortItemSelect(2)} activeOpacity={0.5} style={styles.sortMenu}>
                    <Image source={ImagePath.edit} style={styles.sortliIcon} />
                    <Text style={CommonStyle.boldblacktext}>  Request ID (Z-A)</Text>
                </TouchableOpacity>
                <View style={styles.border} />
                <TouchableOpacity onPress={() => onSortItemSelect(3)} activeOpacity={0.5} style={styles.sortMenu}>
                    <Image source={ImagePath.date} style={styles.sortliIcon} />
                    <Text style={CommonStyle.boldblacktext}>  Date (A-Z)</Text>
                </TouchableOpacity>
                <View style={styles.border} />
                <TouchableOpacity onPress={() => onSortItemSelect(4)} activeOpacity={0.5} style={styles.sortMenu}>
                    <Image source={ImagePath.date} style={styles.sortliIcon} />
                    <Text style={CommonStyle.boldblacktext}>  Date (Z-A)</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default SortModal