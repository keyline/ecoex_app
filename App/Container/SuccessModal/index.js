import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { styles } from './styles'
import LottieView from 'lottie-react-native'
import { ImagePath } from '../../Utils/ImagePath'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SuccessModal = ({ isVisible, onHideModal, onFinish, wording }) => {
    return (
        <Modal
            isVisible={isVisible}
            animationInTiming={500}
            animationOutTiming={500}
            coverScreen={false}
            style={styles.modalStyle}
            onBackdropPress={() => onHideModal()}
            onBackButtonPress={() => onHideModal()}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.text}>{wording ? wording : 'Request Submitted Successfully'}</Text>
                <LottieView
                    source={ImagePath.success_animation}
                    style={{ height: screenHeight * 0.60, width: screenWidth * 0.6 }}
                    autoPlay
                    loop={false}
                    speed={0.5}
                    onAnimationFailure={(error) => console.log(error)}
                    onAnimationFinish={() => onFinish()}
                />
            </View>
        </Modal>
    )
}

export default SuccessModal