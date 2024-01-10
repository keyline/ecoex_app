import { StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
import { Font_Family } from "../../../Utils/Fonts";


export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginTop: '6%',
        marginBottom: '4%'
    },
    searchContainer: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        height: 40,
        paddingHorizontal: '3%',
        backgroundColor: Colors.light_grey
    },
    searchInput: {
        // backgroundColor: 'red',
        width: '80%',
        color: Colors.black,
        textAlignVertical: 'center'
    },
    searchIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    sortContainer: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 5,
        borderColor: Colors.theme_color,
        backgroundColor: Colors.theme_morelight
    },
    sortIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: Colors.theme_color
    },
    resubmitContainer: {
        backgroundColor: Colors.theme_color,
        marginRight: '2%',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    resubmitText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
        fontSize: 14
    },
    selectText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black
    }
})