import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import RequestList from '../../../Container/RequestList'
import SortModal from '../../../Container/SortModal'
import { useFocusEffect } from '@react-navigation/native'
import { GetUniqueArray, ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import EmptyContent from '../../../Container/EmptyContent'
import LoaderTransparent from '../../../Container/LoaderTransparent'
import CheckBox from '@react-native-community/checkbox'
import { useSharedValue } from 'react-native-reanimated'

const list = [
    { enquiry_no: 'RD001', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'RD002', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'AB123', created_at: '14/11/2023 - 05.25 PM', updated_at: '', status: 'Processing' },
    { enquiry_no: 'RD004', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'AB456', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { enquiry_no: 'RD006', created_at: '14/11/2023 - 05.25 PM', updated_at: '14/11/2023 - 10.25 PM', status: 'Processing' },

]

const RejectRequest = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: [],
        filterData: [],
        searchtext: '',
        searchErr: '',
        modalVisible: false,
        isAllChecked: false,
        showSubmitbtn: false
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
            let response = await Apis.reject_request_list(datas);
            if (__DEV__) {
                console.log('RejectRequest', JSON.stringify(response))
            }
            if (response.success) {
                let resdata = response?.data
                if (resdata.length > 0) {
                    let array = pages == 1 ? resdata : [...state.data, ...resdata]
                    let uniqueArray = await GetUniqueArray(array, 'enq_id');
                    let updateArray = uniqueArray.map(obj => {
                        return { ...obj, isChecked: false }
                    })
                    onCheckSelect(updateArray);
                    setState(prev => ({
                        ...prev,
                        data: updateArray,
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
                    typeof item[key] == 'string' &&
                    item[key].toLowerCase().includes(query.toLowerCase())
                ) {
                    return true;
                }
            }
            return false;
        });
        // setState(prev => ({
        //     ...prev,
        //     filterData: filtered
        // }))
        return filtered;
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
        navigation.navigate('RequestDetails', { id: item?.enq_id })
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

    const onSelect = useCallback(async (item, value) => {
        if (item) {
            let updateArray = state.data.map(obj => {
                if (obj.enq_id === item.enq_id) {
                    return { ...obj, isChecked: !obj.isChecked }
                }
                return obj;
            });
            setState(prev => ({
                ...prev,
                data: updateArray
            }))
            onCheckSelect(updateArray);
        }
    })

    const onSelectAll = useCallback(async (val) => {
        let updateArray = state.data.map(obj => {
            return { ...obj, isChecked: val }
        });
        setState(prev => ({
            ...prev,
            data: updateArray,
            isAllChecked: val
        }))
        onCheckSelect(updateArray)
    })

    const onCheckSelect = useCallback(async (array = state.data) => {
        let indexfalse = array.findIndex(obj => obj.isChecked == false)
        let indextrue = array.findIndex(obj => obj.isChecked == true)
        if (indexfalse == -1) {
            setState(prev => ({
                ...prev,
                isAllChecked: true
            }))
        } else {
            setState(prev => ({
                ...prev,
                isAllChecked: false
            }))
        }
        if (indextrue != -1) {
            setState(prev => ({
                ...prev,
                showSubmitbtn: true
            }))
        } else {
            setState(prev => ({
                ...prev,
                showSubmitbtn: false
            }))
        }
    })

    const onResubmit = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loadingNew: true
            }))
            let updateArray = state.data.filter(obje => obje.isChecked == true).map(obj => {
                return obj.enq_id
            })
            let datas = {
                enq_ids: updateArray
            }
            let res = await Apis.reject_resubmit(datas);
            if (__DEV__) {
                console.log('RejectResubmit', JSON.stringify(res))
            }
            if (res.success) {
                let updateList = state.data.filter(obj => obj?.isChecked == false)
                setState(prev => ({
                    ...prev,
                    data: updateList,
                    isAllChecked: false,
                    showSubmitbtn: false,
                    loadingNew: false
                }))
            }
            ToastMessage(res?.message);
        } catch (error) {
            if (__DEV__) {
                console.log(error)
            }
            setState(prev => ({
                ...prev,
                loadingNew: false
            }))
            ToastError();
        }
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
                name={'Reject Request'}
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
                {((state.data).length > 0) && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '2%', marginHorizontal: '2%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                            {(state.searchtext.trim() == '') && (
                                <>
                                    <CheckBox
                                        value={state.isAllChecked}
                                        onValueChange={val => onSelectAll(val)}
                                        tintColors={{ true: Colors.theme_color, false: Colors.black }}
                                        tintColor={Colors.black}
                                        onCheckColor={Colors.theme_color}
                                    />
                                    {(state.isAllChecked) ?
                                        <Text style={styles.selectText}>Deselect All</Text>
                                        :
                                        <Text style={styles.selectText}>Select All</Text>
                                    }
                                </>
                            )}
                        </View>
                        {(state.showSubmitbtn) && (
                            <TouchableOpacity onPress={onResubmit} activeOpacity={0.5} style={styles.resubmitContainer}>
                                <Text style={styles.resubmitText}>ReSubmit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                <View style={{ flex: 1 }}>
                    <FlatList
                        // data={state.searchtext ? list.filter(obj => { return obj.enquiry_no.toUpperCase().includes(state.searchtext.toUpperCase()) }) : list}
                        // data={state.searchtext ? state.filterData : state.data}
                        data={state.searchtext ? handleSearch(state.searchtext) : state.data}
                        keyExtractor={(item, index) => item?.enq_id.toString()}
                        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                        renderItem={({ item, index }) =>
                            <RequestList
                                item={item}
                                index={index}
                                headingColor={Colors.reject}
                                backgroundColor={Colors.reject_morelight}
                                onViewDetails={onViewDetails}
                                onSelect={onSelect}
                                viewableItems={viewableItems}
                            />}
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

export default RejectRequest