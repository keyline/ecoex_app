import { View, Text, SafeAreaView, TextInput, Image, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import LoaderTransparent from '../../../Container/LoaderTransparent'
import { useFocusEffect } from '@react-navigation/native'
import { GetUniqueArray, ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import List from './List'
import EmptyContent from '../../../Container/EmptyContent'
import { useSharedValue } from 'react-native-reanimated'

const list = [
    1, 2, 3, 4, 3, 5, 6, 7, 8, 9, 10
]
const PlantNotification = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        data: [],
        searchtext: '',
        searchErr: '',
        filterData: []
    })
    const [hasMore, sethasMore] = useState(false);
    const [page, setpage] = useState(1);


    //   useFocusEffect(
    //     useCallback(() => {
    //       const unsubscribe = onGetData();
    //       return () => unsubscribe
    //     }, [navigation])
    //   )

    useEffect(() => {
        onGetData();
    }, [page])

    const onGetData = useCallback(async (pages = page) => {
        try {
            showLoading();
            let datas = {
                page_no: pages
            }
            let response = await Apis.get_notification(datas);
            if (__DEV__) {
                console.log('Notification', JSON.stringify(response))
            }
            if (response.success) {
                let resdata = response?.data
                if (resdata.length > 0) {
                    let array = pages == 1 ? resdata : [...state.data, ...resdata]
                    let uniqueArray = await GetUniqueArray(array, 'id');
                    setState(prev => ({
                        ...prev,
                        data: uniqueArray,
                        loading: false,
                    }))
                    sethasMore(true);
                } else {
                    hideLoading();
                    sethasMore(false);
                }
                // setState(prev => ({
                //     ...prev,
                //     data: response?.data,
                //     loading: false
                // }))
            } else {
                hideLoading();
                ToastMessage(response?.message);
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            hideLoading();
            ToastError();
        }
    })

    const showLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }))
    }, [state.loading])

    const hideLoading = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: false,
        }))
    }, [state.loading])

    const onHeaderPress = useCallback(async () => {
        navigation.navigate('PlantDashBoard');
    })

    const onSearch = useCallback(async (text) => {
        setState(prev => ({
            ...prev,
            searchtext: text,
            searchErr: ''
        }))
        if (text.trim() == '') {
            onResetSearch();
        } else {
            handleSearch(text);
        }
    }, [state.searchtext])

    const handleSearch = (query) => {
        const filtered = state.data.filter((item) => {
            for (const key in item) {
                if (
                    typeof item[key] == 'string' &&
                    item[key].toLowerCase().includes(query.toLowerCase())
                ) {
                    return true;
                }
            }
            return false;
        });
        setState(prev => ({
            ...prev,
            filterData: filtered
        }))
    }

    const onResetSearch = useCallback(async () => {
        setState(prev => ({
            ...prev,
            searchtext: '',
            filterData: []
        }))
    }, [state.searchtext, state.filterData])

    const handleLoadMore = useCallback(() => {
        if (hasMore) {
            setpage((prevPage) => prevPage + 1);
        }
    });

    const onReload = useCallback(async () => {
        onGetData(1)
        setpage(1)
    })

    const viewableItems = useSharedValue([]);
    const onViewableItemsChanged = useCallback(({ viewableItems: vItems }) => {
        viewableItems.value = vItems
    });

    const viewabilityConfig = {
        // waitForInteraction: true,
        itemVisiblePercentThreshold: 40
    }
    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Notifications'}
                leftIcon={ImagePath.home}
                leftOnPress={onHeaderPress}
            />
            {(state.data) && (
                <View style={{ flex: 1 }}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder='Search..'
                            value={state.searchtext}
                            onChangeText={text => onSearch(text)}
                            style={styles.searchInput}
                            placeholderTextColor={Colors.grey}
                            textAlignVertical='center'
                        />
                        <Image source={ImagePath.search} style={styles.searchIcon} />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: '2%' }}>
                        <FlatList
                            data={state.filterData.length > 0 ? state.filterData : state.data}
                            // data={list}
                            keyExtractor={(item, index) => index}
                            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                            renderItem={({ item }) =>
                                <List item={item} viewableItems={viewableItems} />
                            }
                            showsVerticalScrollIndicator={false}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.2}
                            refreshControl={<RefreshControl refreshing={false} onRefresh={onReload} />}
                            ListEmptyComponent={<EmptyContent word={'No Notification Found'} />}
                        // style={{ paddingBottom: '10%' }}
                        />
                    </View>
                </View>
            )}
            {(state.loading) && (
                <LoaderTransparent loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default PlantNotification