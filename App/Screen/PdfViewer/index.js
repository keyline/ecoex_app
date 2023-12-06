import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import Pdf from 'react-native-pdf';
import { styles } from './styles';
import { Colors } from '../../Utils/Colors';
import { ImagePath } from '../../Utils/ImagePath';
import { CommonStyle } from '../../Utils/CommonStyle';

const PdfViewer = ({ navigation, route }) => {
    // console.log('source', route.params?.source)
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const onBackPress = useCallback(async () => {
        navigation.goBack();
    })

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onBackPress} activeOpacity={0.5} style={styles.backContainer}>
                    <Image source={ImagePath.back} style={styles.backicon} />
                </TouchableOpacity>
                <Text style={[CommonStyle.boldblacktext, { fontSize: 16, color: Colors.grey }]}>Page : {currentPage}/{totalPage}</Text>
            </View>
            <Pdf
                trustAllCerts={false}
                source={{ uri: route.params?.source }}
                // source={{ uri: 'https://commodity.ecoex.market/public/uploads/user/1701330633sample.pdf' }}
                onLoadComplete={(numberOfPages, filePath) => {
                    setTotalPage(numberOfPages);
                    // console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    setCurrentPage(page)
                    // console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    // console.log(`Link pressed: ${uri}`);
                }}
                scale={0.9}
                spacing={15}
                // enablePaging
                // renderActivityIndicator={<ActivityIndicator color={Colors.theme_color} size={'large'} />}
                style={styles.pdf} />
        </View>
    )
}

export default PdfViewer