import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        marginTop: '50%',
        // alignItems: 'center',
        paddingHorizontal: '6%',
        marginBottom: '2%'
    },
    logo: {
        width: width * 0.4,
        height: height * 0.05,
        resizeMode: 'contain',
        marginBottom: '2%'
    },
})