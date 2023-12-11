import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../../Utils/Colors";
import { getRandomColor } from "../../../Service/CommonFunction";
import { Font_Family } from "../../../Utils/Fonts";

const randomColor = getRandomColor();

export const styles = StyleSheet.create({
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
        backgroundColor: Colors.light_grey,
        marginVertical: '4%',
        alignSelf: 'center'
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
    listContainer: {
        backgroundColor: Colors.grey_morelight,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowRadius: 1,
                shadowOpacity: 0.5,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
            },
            android: {
                elevation: 4
            }
        }),
    },
    listLeftcontent: {
        width: '3%',
        height: '100%',
        // backgroundColor: randomColor
    },
    listRightcontent: {
        width: '92%',
        marginLeft: '3%',
        paddingVertical: '2%',
    },
    datetext: {
        fontFamily: Font_Family.NunitoSans_Italic,
        fontSize: 10,
        textAlign: 'right',
        color: Colors.grey
    }
})