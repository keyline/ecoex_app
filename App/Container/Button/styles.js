import { StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme_color,
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: '4%',
        paddingVertical: '4%',
        borderRadius: 10
    },
    text: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.white,
        fontSize:16
    },
    bodyContent:{
        flex:1
    }
})