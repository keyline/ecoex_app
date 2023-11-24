import { View, Text, SafeAreaView, Image, ScrollView, } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import Header from '../../Container/Header'

const ProcessRequestDetails = ({ navigation }) => {

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'In Process Request Details'}
                leftIcon={ImagePath.back}
                leftOnPress={onHeaderPress}
            />

        </SafeAreaView>
    )
}

export default ProcessRequestDetails