import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import Header from '../../Container/Header'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { styles } from './styles'
import List from './List'

const list = [1, 2, 3, 4, 5, 6]

const ProcessRequest = ({ navigation }) => {

    const onHeaderPress = useCallback(async () => {
        navigation.navigate('DashBoard')
    })

    const onView = useCallback(async (item) => {
        navigation.navigate('ProcessRequestDetails')
    })

    const onDelete = useCallback(async (item) => {

    })

    const onEdit = useCallback(async (item) => {

    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'In Process Request'}
                leftIcon={ImagePath.home}
                leftOnPress={onHeaderPress}
            />
            <View style={styles.bodyContent}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => item}
                        renderItem={({ item }) =>
                            <List
                                item={item}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ProcessRequest