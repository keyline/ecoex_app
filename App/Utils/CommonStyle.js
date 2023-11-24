import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Font_Family } from "./Fonts";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const CommonStyle = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    boldtext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.theme_color
    },
    boldblacktext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black
    },
    normalText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.black
    },
    headingText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.theme_color,
        fontSize: 18
    },
    errortxt: {
        color: 'red',
        fontFamily: Font_Family.NunitoSans_Italic,
        paddingLeft: 4
    },
})

export const tagsStyles = {
    b: { color: Colors.black },
    h1: { color: Colors.black },
    h2: { color: Colors.black },
    h3: { color: Colors.black },
    h5: { color: Colors.black },
    h4: { color: Colors.black },
    h6: { color: Colors.black },
    p: { color: Colors.grey },
    li: { color: Colors.grey },
    span: { color: Colors.grey }
}