import { StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    menuText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        // fontSize:16
        fontWeight: 'bold',
        color: Colors.black
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '4%',
        marginTop: '15%',
        marginBottom: '8%',
        paddingBottom: '4%',
        borderBottomWidth: 1
    },
    imgContent: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    nameText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        marginTop: '8%'
    },
    editContainer: {
        position: 'absolute',
        top: 62,
        right: 90,
    },
    editIcoon: {
        width: 25,
        height: 25,
        // tintColor:Colors.theme_color
    },
    versionContainer: {
        alignSelf: 'center',
        paddingVertical: '2%'
    },
    versionText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        fontSize: 12,
        color: Colors.theme_color
    }
})