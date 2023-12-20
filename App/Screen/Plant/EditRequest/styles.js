import { StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
import { Font_Family } from "../../../Utils/Fonts";


export const styles = StyleSheet.create({
    headerContent: {
        backgroundColor: Colors.light_grey,
        paddingTop: '2%'
    },
    headerContainer: {
        // backgroundColor: Colors.light_grey,
        paddingVertical: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '2%'
    },
    headerLeft: {
        width: '42%',
        // borderRightWidth: 2
    },
    headerRight: {
        width: '55%',
        paddingLeft: 10,
        borderLeftWidth: 2,
        overflow: 'hidden'
    },
    itemContainer: {
        backgroundColor: Colors.light_grey,
        marginBottom: '3%',
        paddingVertical: '4%',
        // width:'80%'
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.theme_light,
        // alignSelf: 'flex-end',
        paddingHorizontal: '3%',
        paddingVertical: '2%',
        borderRadius: 5
    },
    uploadText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.white
    },
    uploadicon: {
        width: 18,
        height: 18,
        tintColor: Colors.white
    },
    hsntext: {
        fontFamily: Font_Family.NunitoSans_SemiBold,
        fontSize: 11,
        color: Colors.black,
        alignSelf: 'flex-end',
        paddingHorizontal: '11%'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: '0%',
        paddingHorizontal: '6%'
    },
    deleteContainer: {
        alignSelf: 'flex-end',
        paddingBottom: '3%',
        paddingRight: '5%'
    },
    closeIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        tintColor: Colors.black
    },
    submitBtn: {
        alignItems: 'center',
        backgroundColor: Colors.theme_light,
        // alignSelf: 'flex-end',
        paddingHorizontal: '10%',
        paddingVertical: '3%',
        borderRadius: 5,
        marginTop: '2%',
        alignSelf: 'center'
    },
    modalStyle: {
        marginHorizontal: '10%'
    },
    modalContainer: {
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.theme_color,
        borderRadius: 10
    },
    modalHeading: {
        backgroundColor: Colors.theme_color,
        paddingVertical: '4%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    modalHeadingText: {
        color: Colors.white,
        fontFamily: Font_Family.NunitoSans_Bold,
        textAlign: 'center',
        fontSize: 16
    },
    modalContent: {
        paddingVertical: '6%',
        // alignItems: 'center'
        paddingHorizontal: '8%'
    },
    modalText: {
        fontFamily: Font_Family.NunitoSans_SemiBold,
        color: Colors.black,
        marginBottom: 5
    },
    input: {
        borderWidth: 0.8,
        borderRadius: 5,
        height: 38,
        borderColor: Colors.grey,
        paddingHorizontal: 10,
        color: Colors.black
        // backgroundColor: Colors.light_grey
    },
    productInput: {
        borderWidth: 0.8,
        borderRadius: 5,
        height: 38,
        // fontFamily:Font_Family.NunitoSans_Bold,
        // fontSize:16,
        color: Colors.grey,
        borderColor: Colors.grey,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        // width: '60%'
    },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginTop: '4%'
        // alignSelf:'center'
    },
    bottomContainer: {
        backgroundColor: Colors.light_grey,
        paddingVertical: '4%'
    },
    flexNew: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    uploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '4%',
        marginBottom: '2%',
        width: '80%',
        alignSelf: 'center'
    },
    gpsContainer: {
        backgroundColor: Colors.light_grey,
        width: 70,
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        // borderRadius: 5
    },
    gpsImage: {
        width: 68,
        height: 39,
        resizeMode: 'cover'
    },
    addmoreContainer: {
        backgroundColor: Colors.light_grey,
        // width: 40,
        // height: 40,
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
        // marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.light_grey
    },
    addmoreImg: {
        width: 45,
        height: 50,
        resizeMode: 'cover'
    },
    productimgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '60%',
        // overflow: 'hidden',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    productimg: {

    },
    imgCloseContainer: {
        position: 'absolute',
        right: -8,
        top: -3,
        zIndex: 99

    }
})