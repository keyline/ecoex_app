import { StyleSheet, Platform } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    bodyContent: {
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 2,
        borderColor: Colors.grey,
        paddingHorizontal: '2%',
        paddingVertical: '2%',
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
                elevation: 2
            }
        })
    },
    midContent: {
        marginVertical: '2%',
        paddingHorizontal: '2%',
        borderWidth: 0.5,
        borderRadius: 2,
        borderColor: Colors.grey,
        paddingVertical: '2%',
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
                elevation: 2
            }
        })
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    boldtext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 10,
        color: Colors.black,
        textAlign: 'center'
    },
    upload: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    addbtn: {
        // position:'absolute'
        alignSelf: 'flex-end',
        paddingRight: '2%',
        marginVertical: '1%'
    },
    btmcontainer: {
        backgroundColor: Colors.violet,
        paddingVertical: '2.5%',
        // paddingHorizontal: '3%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: '2%',
        width: '28%',
        alignSelf: 'flex-end'
    },
    btmtext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.white,
        fontSize: 10
    }
})