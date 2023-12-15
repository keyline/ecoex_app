import { View, Text, SafeAreaView, FlatList, TextInput, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import List from './List'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import Modal from 'react-native-modal'
import SortModal from '../../../Container/SortModal'
import RequestList from '../../../Container/RequestList'
import { useFocusEffect } from '@react-navigation/native'
import { GetUniqueArray, ToastError, ToastMessage } from '../../../Service/CommonFunction'
import Apis from '../../../Service/Apis'
import Loader from '../../../Container/Loader'
import EmptyContent from '../../../Container/EmptyContent'
import LoaderTransparent from '../../../Container/LoaderTransparent'

const ProcessRequest = ({ navigation }) => {

  const [state, setState] = useState({
    loading: false,
    loadingNew: false,
    data: [],
    filterData: [],
    searchtext: '',
    searchErr: '',
    modalVisible: false,
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
      // onResetSearch();
      let datas = {
        order_field: field,
        order_type: type,
        page_no: pages
      }
      let response = await Apis.process_request_list(datas);
      // if (__DEV__) {
      //   console.log('ProcessesRequest', JSON.stringify(response))
      // }
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
    onResetSearch();
  })

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setpage((prevPage) => prevPage + 1);
    }
  });

  const onDeleteAlert = useCallback(async (item) => {
    Alert.alert(
      'Delete!',
      'Do you really want to delete this request?',
      [
        {
          text: 'No',
          onPress: () => null
        },
        {
          text: 'Yes',
          onPress: () => onDelete(item)
        }
      ],
      { cancelable: true }
    )
  })

  const onDelete = useCallback(async (item) => {
    try {
      setState(prev => ({
        ...prev,
        loadingNew: true
      }))
      let datas = {
        enq_id: item?.enq_id
      }
      let res = await Apis.plant_delete_request(datas);
      if (__DEV__) {
        console.log('DeleteRequest', JSON.stringify(res))
      }
      if (res.success) {
        let array = state.data
        let updateList = array.filter(obj => obj.enq_id != item.enq_id)
        setState(prev => ({
          ...prev,
          data: updateList,
          loadingNew: false
        }))
      } else {
        setState(prev => ({
          ...prev,
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

  const onEdit = useCallback(async (item) => {
    // console.log('editItem', item)
    // navigation.navigate('ProcessesRequestDetails', { item: item })
    navigation.navigate('EditRequest', { id: item?.enq_id })
  })

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
    onResetSearch();
  })

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header
        name={'Processes Request'}
        leftIcon={ImagePath.home}
        leftOnPress={onHeaderPress}
      />
      {(state.loading) ? <Loader loading={state.loading} /> :
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
              // data={state.searchtext ? state.data.filter(obj => { return obj.enquiry_no.toUpperCase().includes(state.searchtext.toUpperCase()) }) : state.data}
              data={state.searchtext ? state.filterData : state.data}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) =>
                <RequestList
                  item={item}
                  index={index}
                  headingColor={Colors.process}
                  backgroundColor={Colors.process_morelight}
                  onEdit={onEdit}
                  onDelete={onDeleteAlert}
                  onViewDetails={onViewDetails}
                />}
              style={{ marginBottom: 10 }}
              showsVerticalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              refreshControl={<RefreshControl refreshing={false} onRefresh={onReload} />}
              ListEmptyComponent={<EmptyContent word={'No Request Found'} />}
            // StickyHeaderComponent={renderHeader}
            />
          </View>
        </View>
      }
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

export default ProcessRequest