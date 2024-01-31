import { Dimensions, StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
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
    textContainer: {
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: Colors.black,
        paddingHorizontal: width * 0.05,
        paddingVertical: 2,
        borderRadius: 5
    },
    text: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
        fontSize: 16
    }
})