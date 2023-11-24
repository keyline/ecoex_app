import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';


export const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropdown: {
        // height: 38,
        borderColor: 'gray',
        borderWidth: 0.8,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '60%',
        // alignSelf: 'center'
        backgroundColor: 'white',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily:Font_Family.NunitoSans_Bold
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        // height: 40,
        fontSize: 14,
        // borderWidth:0.8
    },
})