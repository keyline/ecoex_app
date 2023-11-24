import { StyleSheet, Dimensions } from "react-native";
import { CommonStyle } from '../../../Utils/CommonStyle'

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
    forgottext: {
        ...CommonStyle.boldtext,
        textAlign: 'right',
        marginTop: '2%',
        marginBottom:'4%'
        // paddingRight:'2%'
    },
    btmText:{
        ...CommonStyle.normalText,
        marginVertical:'4%',
        textAlign:'center'
    }
})