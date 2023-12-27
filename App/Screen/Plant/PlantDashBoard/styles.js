import { StyleSheet, Platform } from 'react-native'
import { Colors } from '../../../Utils/Colors'
import { Font_Family } from '../../../Utils/Fonts'


export const styles = StyleSheet.create({
    bodyContent: {
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    profileContainer: {
        backgroundColor: Colors.grey_morelight,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.theme_color,
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
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
        })
    },
    dp: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: 'cover'
    },
    nametxt: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.theme_color,
        fontSize: 12,
        // backgroundColor:'red',
        width: '100%'
    },
    valuetxt: {
        fontFamily: Font_Family.NunitoSans_SemiBold,
        color: Colors.black,
        // backgroundColor:'blue'
    },
    profileInfo: {
        paddingLeft: '3%',
    },
    headingText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        textAlign: 'center'
    },
    btnContent: {
        backgroundColor: Colors.white,
        marginVertical: '4%',
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        borderWidth: 2,
        borderColor: Colors.light_grey,
        borderRadius: 5,
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
        })
    },
    statusContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: '6%'
    },
    btmcontainer: {
        backgroundColor: Colors.theme_color,
        paddingVertical: '4%',
        paddingHorizontal: '2%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: '8%'
        // width:'100%'
    },
    btmtext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.white,
        width: '100%',
        textAlign: 'center',
        fontSize: 12
    },
    btnContainer: {
        marginTop: '4%',
        marginHorizontal: '4%'
    },
    fullbtn: {
        paddingVertical: '2.5%',
        borderRadius: 5,
        marginBottom: '4%'
    }
})