import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import RequestList from '../../../Container/RequestList'
import SortModal from '../../../Container/SortModal'

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
        data: null,
        searchtext: '',
        searchErr: '',
        modalVisible: false
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
    }, [state.searchtext])

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

    const onSortItemSelect = useCallback(async (item) => {
        console.log('item', item)
        onHideModal();
    })

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
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={state.searchtext ? list.filter(obj => { return obj.enquiry_no.toUpperCase().includes(state.searchtext.toUpperCase()) }) : list}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => <RequestList item={item} index={index} headingColor={Colors.reject} backgroundColor={Colors.reject_morelight} />}
                        style={{ marginBottom: 10 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            <SortModal
                modalVisible={state.modalVisible}
                onHideModal={onHideModal}
                onSortItemSelect={onSortItemSelect}
            />
        </SafeAreaView>
    )
}

export default RejectRequest