import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';


export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme_color,
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingTop:'6%'
    },
    leftImg: {
        width: 25,
        height: 25,
        tintColor: Colors.white
    },
    headingText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.white,
        fontSize: 18
    }
})