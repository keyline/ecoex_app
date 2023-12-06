import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 10,
    },
    headerContainer: {
        backgroundColor: Colors.white,
        width: '100%',
        marginBottom: '2%',
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backContainer: {
        // backgroundColor: Colors.theme_color,
        alignSelf: 'flex-start',
        // marginLeft: '4%',
        // width: 30,
        // height: 30,
        // borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: '2%'
    },
    backicon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})