import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        width: width
    },
    modalContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        bottom: 0,
        // left: 0,
        backgroundColor: Colors.white,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: Colors.theme_color,
        borderRadius: 10,
        paddingTop: '6%',
        paddingBottom: '6%',
        paddingHorizontal: '6%'
    },
    border: {
        borderWidth: 0.5,
        borderColor: Colors.grey,
        marginVertical: 10
    },
    sortMenu: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sortliIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }
})