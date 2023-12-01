import { Dimensions, StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
import { Colors } from "../../Utils/Colors";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width * 0.4,
        height: height * 0.2,
        overflow: 'hidden'
    },
    headerImage: {
        width: width * 0.4,
        height: height * 0.2,
        resizeMode: 'contain'
    },
    bodyContent: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
        marginBottom: '6%'
    },
    logo: {
        width: width * 0.4,
        height: height * 0.05,
        resizeMode: 'contain',
        // alignSelf:'center'
    },
    boldText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        fontSize: 10,
        // marginTop: -2
    },
    image: {
        width: width * 0.5,
        height: height * 0.15,
        resizeMode: 'contain',
        marginVertical: '6%'
    },
    infoText: {
        fontFamily: Font_Family.NunitoSans_SemiBold,
        color: Colors.black,
        fontSize: 12,
        textAlign: 'center',
        width: width * 0.9
    }
})