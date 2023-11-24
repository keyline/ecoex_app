import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.grey_morelight
    },
    input: {
        // borderWidth: 1,
        padding: 2,
        height: 30,
        fontSize: 10,
        fontFamily: Font_Family.NunitoSans_Regular,
        textAlignVertical: 'center'
    }
})