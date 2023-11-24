import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useCallback } from 'react'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import InputField from '../../Container/InputField'
import CustomDropDown from '../../Container/CustomDropDown'
import DropDownSmall from '../../Container/DropDownSmall'
import InputSmall from '../../Container/InputSmall'
import { Colors } from '../../Utils/Colors'

const list = [1, 2, 3, 4]
const product = [1]
const AddRequest = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        plantid: '123456',
        plantLocation: 'Kolkata',
        email: 'test@gmail.com',
        address: 'kolkata, West Bengal, Pin-700001',
        product: '',
        productErr: ''
    })

    const [productList, setProductList] = useState([
        'Product 1',
        'Product 2',
        'Product 3',
        'Product 4',
    ])

    const [open, setopen] = useState(false)

    const onChangeProduct = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            product: value,
            productErr: ''
        }))
    }, [state.product])

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
    })

    const ListView = ({ item }) => (
        <View style={[styles.flex, { marginBottom: '4%' }]}>
            <Text style={[CommonStyle.normalText, { width: '5%', textAlign: 'center' }]}>{item}.</Text>
            <DropDownSmall
                placeholder={'Product'}
                items={productList}
                setItems={setProductList}
                open={open}
                setOpen={setopen}
                value={state.product}
                onChangeValue={onChangeProduct}
                error={state.plantAddressErr}
                width={'25%'}
            />
            <InputSmall
                placeholder={'Enter HSN Code'}
                width={'25%'}
                onChangeText={e => console.log(e)}
            />
            <TouchableOpacity style={{ width: '25%', alignItems: 'center' }}>
                <Image source={ImagePath.upload} style={styles.upload} />
            </TouchableOpacity>
        </View>
    )

    const ProductList=({item})=>(
        <View style={[styles.flex, { marginBottom: '4%' }]}>
        <Text style={[CommonStyle.normalText, { width: '5%', textAlign: 'center' }]}>{item}.</Text>
        <InputSmall
            placeholder={'Enter Product Name'}
            width={'25%'}
            onChangeText={e => console.log(e)}
        />
        <InputSmall
            placeholder={'Enter HSN Code'}
            width={'25%'}
            onChangeText={e => console.log(e)}
        />
        <TouchableOpacity style={{ width: '25%', alignItems: 'center' }}>
            <Image source={ImagePath.upload} style={styles.upload} />
        </TouchableOpacity>
    </View>
    )

    const Bottom = ({ name, onPress, color }) => (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.btmcontainer}>
            <Text style={styles.btmtext}>{name}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Add Request'}
                leftIcon={ImagePath.back}
                leftOnPress={onHeaderPress}
            />
            <ScrollView>
                <View style={styles.bodyContent}>
                    <View style={styles.topContainer}>
                        <View style={{ width: '45%' }}>
                            <InputField
                                name={'Plant ID'}
                                value={state.plantid}
                                editable={false}
                            />
                            <InputField
                                name={'Plant Location'}
                                value={state.plantLocation}
                                editable={false}
                            />
                            <InputField
                                name={'Email'}
                                value={state.email}
                                editable={false}
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <InputField
                                name={'Plant Address'}
                                value={state.address}
                                editable={false}
                                multiline={true}
                            />
                        </View>
                    </View>
                    <View style={styles.midContent}>
                        <Text style={CommonStyle.boldtext}>Material List</Text>
                        <View style={[styles.flex, { marginVertical: '2%' }]}>
                            <Text style={[styles.boldtext, { width: '5%' }]}>Sl</Text>
                            <Text numberOfLines={2} style={[styles.boldtext, { width: '30%' }]}>Product Name</Text>
                            <Text style={[styles.boldtext, { width: '30%' }]}>HSN Number</Text>
                            <Text style={[styles.boldtext, { width: '30%' }]}>Uploald GPS track Image</Text>
                        </View>
                        <View>
                            {(list).map((item, key) => (
                                <ListView item={item} key={key} />
                            ))}
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.addbtn}>
                            <Image source={ImagePath.add} style={styles.upload} />
                        </TouchableOpacity>
                    </View>
                    <Bottom onPress={()=>console.log('hi')} name={'ADD PRODUCT'} />

                    <View style={styles.midContent}>
                        <Text style={CommonStyle.boldtext}>Add New Product</Text>
                        <View style={[styles.flex, { marginVertical: '2%' }]}>
                            <Text style={[styles.boldtext, { width: '5%' }]}>Sl</Text>
                            <Text numberOfLines={2} style={[styles.boldtext, { width: '30%' }]}>Product Name</Text>
                            <Text style={[styles.boldtext, { width: '30%' }]}>HSN Number</Text>
                            <Text style={[styles.boldtext, { width: '30%' }]}>Uploald GPS track Image</Text>
                        </View>
                        <View>
                            {(product).map((item, key) => (
                                <ProductList item={item} key={key} />
                            ))}
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.addbtn}>
                            <Image source={ImagePath.add} style={styles.upload} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddRequest