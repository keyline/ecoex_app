import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: '4%',
        // zIndex:1
    },
    text: {
        color: Colors.black,
        fontWeight: 'bold',
        marginBottom: '2%'
    },
    dropdown: {
        // flex: 1,
        // borderWidth: 1,
        // borderBottomWidth: 1.5,
        borderColor: Colors.theme_color,
        // marginVertical: -2,
        paddingHorizontal: '6%',
        // width: '102%',
        // alignSelf: 'center',
        backgroundColor: Colors.grey_morelight,
        // height:30,
        // textAlignVertical:'center'
    },
    labelStyle: {
        fontFamily: Font_Family.NunitoSans_Regular,
        fontSize: 10,
        color: Colors.black
    },
    placeholderStyle: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: 'grey',
        fontSize: 10
    },
    dropDownContainerStyle: {
        // flex: 1,
        position: 'relative',
        top: 0,
        // bottom:0,
        borderWidth: 1,
        borderTopWidth: 0,
        // zIndex: 9999,
        backgroundColor: Colors.grey_morelight,
        borderColor: Colors.theme_color,
    },
    error: {
        color: 'red',
        paddingLeft: '3%',
        marginTop: '1%'
    }
})