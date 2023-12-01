import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
import { styles } from './styles';
import { Colors } from '../../Utils/Colors';

const PdfViewer = ({ navigation, route }) => {
    // console.log('source', route.params?.source)
    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                // source={{ uri: route.params?.source }}
                source={{uri:'https://commodity.ecoex.market/public/uploads/user/1701330633sample.pdf'}}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                // renderActivityIndicator={<ActivityIndicator color={Colors.theme_color} size={'large'} />}
                style={styles.pdf} />
        </View>
    )
}

export default PdfViewer