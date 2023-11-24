import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
import { Font_Family } from "../../../Utils/Fonts";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        marginTop: '50%',
        // alignItems: 'center',
        paddingHorizontal: '6%',
        marginBottom: '2%'
    },
    logo: {
        width: width * 0.4,
        height: height * 0.05,
        resizeMode: 'contain',
        marginBottom: '2%'
    },
    otp: {
        width: '100%',
        alignSelf: 'center',
        height: '40%',
    },
    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 1.5,
        // borderBottomWidth: 1.5,
        borderColor: Colors.theme_color,
        color: Colors.theme_color,
        fontFamily:Font_Family.NunitoSans_Bold,
        borderRadius: 5
    },
    underlineStyleHighLighted: {
        borderColor: Colors.theme_color,
    },
    resendContainer: {
        marginTop: '4%',
        marginBottom: '2%',
        alignSelf: 'flex-end'
    },
    resendText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.theme_color
    },
    resendTimer: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black
    }
})