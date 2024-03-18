import { StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
import { Font_Family } from "../../../Utils/Fonts";


export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginVertical: '6%',
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
    //List
    listContainer: {
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: '#FBFAF4',
        borderWidth: 2,
        borderColor: Colors.process,
        borderRadius: 5
    },
    headingContainer: {
        backgroundColor: Colors.process,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: Colors.white
    },
    listContent: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    deleteContainer: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    delete: {
        width: 30,
        height: 30,
        tintColor: 'red'
    },
    editContainer: {
        position: 'absolute',
        bottom: 65,
        right: 18
    },
    edit: {
        width: 20,
        height: 20,
        tintColor: 'green'
    },
    statusContainer: {
        alignItems: 'flex-end',

    },
    statusText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        backgroundColor: Colors.blue,
        color: Colors.white,
        paddingHorizontal: 8,
        paddingVertical: '0.4%',
        borderRadius: 5,
        fontSize:12
    }
})