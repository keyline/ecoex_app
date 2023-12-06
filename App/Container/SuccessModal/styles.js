import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Dimensions } from "react-native";
import { Font_Family } from "../../Utils/Fonts";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export const styles = StyleSheet.create({
    modalStyle: {
        margin: 0
    },
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderColor: Colors.theme_color,
        paddingHorizontal: '2%',
        paddingVertical: '4%',
        borderRadius: 15,
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: screenHeight * 0.45,
    },
    text: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        fontSize: 17,
        color: Colors.theme_color,
        marginTop: '10%'
    }
})