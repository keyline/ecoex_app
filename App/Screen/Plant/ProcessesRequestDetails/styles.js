import { StyleSheet } from "react-native";
import { Font_Family } from "../../../Utils/Fonts";
import { Colors } from "../../../Utils/Colors";

export const styles = StyleSheet.create({
    bodyContainer: {
        marginHorizontal: '2%',
        marginVertical: '2%',
        marginBottom:'4%',
        flex: 1
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black
    },
    statusTextHighlight: {
        fontFamily: Font_Family.NunitoSans_Bold,
        backgroundColor: Colors.blue,
        color: Colors.white,
        borderRadius: 5,
        paddingHorizontal: '1.5%',
        paddingVertical: '0.5%',
        marginLeft: '1%'
    },
    itemHeader: {
        backgroundColor: Colors.theme_light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        borderRadius: 5
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: Colors.white
    },
    listContainer: {
        backgroundColor: Colors.light_grey,
        overflow: 'hidden',
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        marginTop: '2%',
        borderRadius: 5
    },
    imgBtn: {
        alignSelf: 'center',
        backgroundColor: Colors.theme_color,
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        borderRadius: 5,
        marginBottom: '1%',
        marginTop: '2%'
    },
    imgBtnText: {
        color: Colors.white,
        fontFamily: Font_Family.NunitoSans_Regular
    },
    vehiclelist: {
        backgroundColor: Colors.light_grey,
        paddingHorizontal: '4%',
        paddingVertical: '3%',
        marginBottom: '2%',
        borderRadius: 5
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    veListInput: {
        backgroundColor: Colors.white,
        color: Colors.black,
        width: '60%',
        height: 40,
        borderRadius: 5,
        paddingHorizontal: '4%'
        // marginBottom:-1
        // height:'6%'
    },
    uploadimg: {
        width: 35,
        height: 35
    },
    listimg: {
        width: 40,
        height: 40
    },
    veimgContainer: {
        width: '60%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    addmoreBtn: {
        backgroundColor: Colors.theme_light,
        alignSelf: 'flex-end',
        paddingHorizontal: '4%',
        paddingVertical: '1.5%',
        borderRadius: 20,
        marginTop: '1%'
    },
    closeContainer: {
        position: 'absolute',
        right: 8,
        top: 8,
        padding: 5,
        // backgroundColor:Colors.red
    },
    closeicon: {
        width: 20,
        height: 20,
        // tintColor:'red'
    },
    imgCloseContainer: {
        position: 'absolute',
        right: -8,
        top: -3,
        zIndex: 99

    },
    imgCountContent: {
        // position:'absolute',
        // top:'50%'
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        // backgroundColor:'red',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    info: {
        width: 12,
        height: 12,
        resizeMode: 'contain'
    },
    smallBtnContainer: {
        backgroundColor: Colors.theme_color,
        width: '40%',
        paddingVertical: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})