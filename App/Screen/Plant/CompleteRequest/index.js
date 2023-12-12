import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import Header from '../../../Container/Header'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import SortModal from '../../../Container/SortModal'
import RequestList from '../../../Container/RequestList'
import Apis from '../../../Service/Apis'
import { GetUniqueArray, ToastError, ToastMessage } from '../../../Service/CommonFunction'
import { useFocusEffect } from '@react-navigation/native'
import LoaderTransparent from '../../../Container/LoaderTransparent'
import EmptyContent from '../../../Container/EmptyContent'

const list = [
    { enquiry_no: 'RD001', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'RD002', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'AB123', created_at: '14/11/2023 - 05.25 PM', updated_at: '', status: 'Processing' },
    { enquiry_no: 'RD004', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'AB456', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'RD006', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },

]

const CompleteRequest = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: [],
        filterData: [],
        searchtext: '',
        searchErr: '',
        modalVisible: false
    })
    const [orderField, setorderField] = useState('request_id');
    const [orderType, setorderType] = useState('DESC');
    const [hasMore, sethasMore] = useState(false);
    const [page, setpage] = useState(1);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    useEffect(() => {
        onGetData();
    }, [page, orderField, orderType])

    const onGetData = useCallback(async (field = orderField, type = orderType, pages = page) => {
        try {
            // showLoading();
            setState(prev => ({
                ...prev,
                loadingNew: true
            }))
            onResetSearch();
            let datas = {
                order_field: field,
                order_type: type,
                page_no: pages
            }
            let response = await Apis.complete_request_list(datas);
            if (__DEV__) {
                console.log('CompleteRequest', JSON.stringify(response))
            }
            if (response.success) {
                let resdata = response?.data
                if (resdata.length > 0) {
                    let array = pages == 1 ? resdata : [...state.data, ...resdata]
                    let uniqueArray = await GetUniqueArray(array, 'enq_id');
                    setState(prev => ({
                        ...prev,
                        data: uniqueArray,
                        loading: false,
                        loadingNew: false
                    }))
                    sethasMore(true);
                } else {
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        loadingNew: false
                    }))
                    sethasMore(false);
                }
            } else {
                setState(prev => ({
                    ...prev,
                    data: [],
                    loading: false,
                    loadingNew: false
                }))
                ToastMessage(response?.message);
            }
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            setState(prev => ({
                ...prev,
                // data: [],
                loading: false,
                loadingNew: false
            }))
            ToastError();
        }
    })

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
            if (state.data.length > 0) {
                handleSearch(text);
            }
        }
    }, [state.searchtext])

    const handleSearch = (query) => {
        const filtered = state.data.filter((item) => {
            // Iterate through each key in the object
            for (const key in item) {
                // Check if the key is a string and if the value includes the search query
                if (
                    typeof item[key] === 'string' &&
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

    const onShowModal = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: true
        }))
    })

    const onHideModal = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: false
        }))
    })

    const onSortItemSelect = useCallback(async (val) => {
        // console.log('item', item)
        if (val == 1) {
            setpage(1);
            setorderField('request_id');
            setorderType('ASC');
        } else if (val == 2) {
            setpage(1);
            setorderField('request_id');
            setorderType('DESC');
        } else if (val == 3) {
            setpage(1);
            setorderField('added_date');
            setorderType('ASC');
        } else if (val == 4) {
            setpage(1)
            setorderField('added_date');
            setorderType('DESC');
        }
        onHideModal();
    })

    const handleLoadMore = useCallback(() => {
        if (hasMore) {
            setpage((prevPage) => prevPage + 1);
        }
    });

    const onViewDetails = useCallback(async (item) => {
        // console.log('editItem', item)
        navigation.navigate('ProcessesRequestDetails', { id: item?.enq_id })
    })

    const onReload = useCallback(async () => {
        if (page == 1 && orderField == 'request_id' && orderType == 'DESC') {
            onGetData('request_id', 'DESC', 1)
        } else {
            setpage(1);
            setorderField('request_id');
            setorderType('DESC');
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Complete Request'}
                leftIcon={ImagePath.home}
                leftOnPress={onHeaderPress}
            />
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
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
                    <TouchableOpacity onPress={onShowModal} activeOpacity={0.5} style={styles.sortContainer}>
                        <Image source={ImagePath.sort} style={styles.sortIcon} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        // data={state.searchtext ? list.filter(obj => { return obj.enquiry_no.toUpperCase().includes(state.searchtext.toUpperCase()) }) : list}
                        data={state.filterData.length > 0 ? state.filterData : state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => <RequestList item={item} index={index} headingColor={Colors.theme_color} backgroundColor={Colors.theme_morelight} />}
                        style={{ marginBottom: 10 }}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={onReload} />}
                        ListEmptyComponent={<EmptyContent word={'No Request Found'} />}
                    />
                </View>
            </View>
            {(state.loadingNew) && (
                <LoaderTransparent loading={state.loadingNew} />
            )}
            <SortModal
                modalVisible={state.modalVisible}
                onHideModal={onHideModal}
                onSortItemSelect={onSortItemSelect}
            />
        </SafeAreaView>
    )
}

export default CompleteRequest