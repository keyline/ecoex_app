import { StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";


export const styles = StyleSheet.create({
    dropdown: {
        // height: 38,
        borderColor: 'gray',
        borderWidth: 0.8,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '60%',
        // alignSelf: 'center'
        backgroundColor: 'white',
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: Font_Family.NunitoSans_Bold
    },
    inputSearchStyle: {
        // height: 40,
        fontSize: 14,
        // borderWidth:0.8
    },
    errortext: {
        color: 'red',
        fontFamily: Font_Family.NunitoSans_Italic,
        fontSize: 12,
        marginLeft: '42%'
    }
})