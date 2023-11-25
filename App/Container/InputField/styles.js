import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";


export const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginTop: '4%'
    },
    inputContainer: {
        backgroundColor: Colors.grey_morelight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '2%',
        paddingHorizontal: '4%',
        borderRadius: 5,
        borderColor:'red'
    },
    input: {
        fontFamily: Font_Family.NunitoSans_Regular,
        width: '90%',
        marginBottom: -1,
        color: Colors.black,
        // borderWidth:0.8
        // backgroundColor:'red'
    },
    righticon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }
})