import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        backgroundColor: Colors.white,
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})