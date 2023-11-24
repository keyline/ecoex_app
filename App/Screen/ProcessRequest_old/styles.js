import { StyleSheet } from 'react-native'
import { Font_Family } from '../../Utils/Fonts'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    bodyContent: {
        flex:1,
        marginVertical: '4%',
        paddingHorizontal: '2%'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        // flex: 1
        // justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
    },
    boldtext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        fontSize: 12,
        color: Colors.black,
        textAlign: 'center'
    },
    table: {
        flexDirection: 'column',
    },
    cell: {
        flex: 1,
        // borderWidth: 1,
        padding: 4,
        textAlign: 'center',
        width: '10%'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listContainer: {
        borderWidth: 0.5,
        marginBottom: '3%',
        borderColor: Colors.grey,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        borderRadius: 5,
        elevation: 1,
        backgroundColor: Colors.grey_morelight
    },
    border: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: Colors.grey,
        marginVertical: '2%'
    },
    flexContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})