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
            animationInTiming={800}
            animationOutTiming={800}
            coverScreen={false}
            style={styles.modalStyle}
            onBackdropPress={() => onHideModal()}
            onBackButtonPress={() => onHideModal()}
        >
            <View style={styles.modalContainer}>
                <LottieView
                    source={ImagePath.success_animation}
                    style={{ height: screenHeight * 0.20, width: screenWidth * 0.4 }}
                    autoPlay
                    loop={false}
                    speed={0.5}
                    onAnimationFailure={(error) => console.log(error)}
                    onAnimationFinish={() => onFinish()}
                />
                <Text style={styles.text}>{wording ? wording : 'Request Submitted Successfully'}</Text>
            </View>
        </Modal>
    )
}

export default SuccessModal