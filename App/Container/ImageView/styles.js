import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 99,
        alignItems: 'center',
        justifyContent: 'center',
        width: width
    },
    image: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    closeContainer: {
        position: 'absolute',
        top: 30,
        right: 30,
        backgroundColor: Colors.white,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIcon: {
        width: 15,
        height: 15,
        tintColor: Colors.black
    }
})