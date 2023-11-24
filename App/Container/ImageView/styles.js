import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";


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
        justifyContent: 'center'
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
        backgroundColor: Colors.black,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIcon: {
        width: 15,
        height: 15,
        tintColor: Colors.white
    }
})