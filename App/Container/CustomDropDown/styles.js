import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


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
        borderWidth: 0,
        // borderBottomWidth: 1.5,
        borderColor: Colors.theme_color,
        marginVertical: -2,
        paddingHorizontal: '4%',
        width: '102%',
        alignSelf: 'center',
        backgroundColor: Colors.grey_morelight
    },
    placeholderStyle: {
        color: 'grey'
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