import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import Header from '../../../Container/Header'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import SortModal from '../../../Container/SortModal'
import RequestList from '../../../Container/RequestList'

const list = [
    { id: 'RD001', addtime: '14/11/2023 - 05.25 PM', modifytime: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { id: 'RD002', addtime: '14/11/2023 - 05.25 PM', modifytime: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { id: 'AB123', addtime: '14/11/2023 - 05.25 PM', modifytime: '', status: 'Processing' },
    { id: 'RD004', addtime: '14/11/2023 - 05.25 PM', modifytime: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { id: 'AB456', addtime: '14/11/2023 - 05.25 PM', modifytime: '14/11/2023 - 10.25 PM', status: 'Processing' },
    { id: 'RD006', addtime: '14/11/2023 - 05.25 PM', modifytime: '14/11/2023 - 10.25 PM', status: 'Processing' },

]

const CompleteRequest = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        data: null,
        searchtext: '',
        searchErr: '',
        modalVisible: false
    })

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
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
                name={'Complete Request'}
                leftIcon={ImagePath.back}
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
                        data={state.searchtext ? list.filter(obj => { return obj.id.toUpperCase().includes(state.searchtext.toUpperCase()) }) : list}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => <RequestList item={item} index={index} headingColor={Colors.theme_color} backgroundColor={Colors.theme_morelight} />}
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

export default CompleteRequest