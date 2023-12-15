import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
import { Font_Family } from "../../../Utils/Fonts";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        // paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusText: {
        backgroundColor: Colors.light_blue,
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.white,
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 2
        // ...Common
    },
    midContent: {
        flex: 1,
        backgroundColor: '#EFEDED',
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        marginVertical: '2%'
    },
    flexNew: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    info: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    listContainer: {
        marginBottom: '2%',
        // backgroundColor:'red'
    },
    listContent: {
        borderRadius: 5,
        backgroundColor: Colors.light_grey,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        // borderWidth:1,
        height: screenHeight * 0.06
    },
    slContent: {
        backgroundColor: Colors.theme_color,
        width: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: '2%',
        height: screenHeight * 0.06,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    productContent: {
        // paddingVertical: '2%',
        width: '64%',
        height: screenHeight * 0.06,
        paddingLeft: 10,
        // alignItems: 'center',
        justifyContent: 'center'
    },
    weightContent: {
        backgroundColor: Colors.purple,
        width: '24%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: '2%',
        height: screenHeight * 0.06,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5

    },
    listText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
        fontSize: 12
    },
    hsntext: {
        fontFamily: Font_Family.NunitoSans_Regular,
        fontSize: 12,
        color: Colors.black,
        marginLeft: '15%'
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
    },
    imgContent: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        width: '40%',
        paddingVertical: '1%',
        borderRadius: 5,
        paddingHorizontal: '2%',
        paddingBottom: '4%'
    },
    slipImage: {
        width: '90%',
        height: 80,
        marginTop: 10
    },
    btmContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.6,
        backgroundColor: Colors.light_grey,
        // paddingHorizontal: '4%',
        // paddingVertical: '2%',
        borderRadius: 5,
        width: '48%',
        overflow: 'hidden'
    },
    btmIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    btnRightIcon: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        borderRadius: 5
    },
    aprvBtn: {
        width: '45%',
        backgroundColor: Colors.light_grey,
        alignItems: 'center',
        paddingVertical: '4%',
        marginVertical: '6%',
        borderRadius: 5
    }
})