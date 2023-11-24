import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import ImageView from '../../../Container/ImageView'

const list = [
    { sl_no: '01', hsn: '124578', product: 'Product 1', weight: '1245 MT' },
    { sl_no: '02', hsn: '124578', product: 'Product 2', weight: '1245 MT' },
    { sl_no: '03', hsn: '124578', product: 'Product 3', weight: '1245 MT' },
    { sl_no: '04', hsn: '124578', product: 'Product 4', weight: '1245 MT' },

]

const ProcessesRequestDetails = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        data: route?.params?.data,
        imageViewUri: null
    })

    const onHeaderPress = useCallback(async () => {
        navigation.goBack();
    })

    const onImageView = useCallback(async (img) => {
        if (img) {
            setState(prev => ({
                ...prev,
                imageViewUri: img
            }))
        } else {
            setState(prev => ({
                ...prev,
                imageViewUri: null
            }))
        }
    }, [state.imageViewUri])

    const Button = ({ name }) => (
        <View style={styles.btmContainer}>
            <View style={{ width: '18%', alignItems: 'center', paddingVertical: '6%' }}>
                <Image source={ImagePath.cloud_upload} style={styles.btmIcon} />
            </View>
            <Text style={[CommonStyle.normalText, { width: '57%', fontSize: 13, textAlign: 'center' }]}>  {name}  </Text>
            <TouchableOpacity style={[styles.btnRightIcon, { width: '25%', paddingVertical: '6%' }]}>
                <Image source={ImagePath.eye_on} style={styles.btmIcon} />
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'In Processes Request Details'}
                leftIcon={ImagePath.back}
                leftOnPress={onHeaderPress}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bodyContent}>
                    <View style={[styles.flex, { paddingHorizontal: '4%' }]}>
                        <Text style={CommonStyle.normalText}>STATUS (1/9) : </Text>
                        <Text style={styles.statusText}>SENT</Text>
                    </View>

                    <View style={styles.midContent}>
                        <View style={styles.flexNew}>
                            <View style={styles.flex}>
                                <Image source={ImagePath.req_id} style={styles.icon} />
                                <Text style={CommonStyle.boldblacktext}>  {state.data?.id}</Text>
                            </View>
                            <View style={styles.flex}>
                                <Image source={ImagePath.location} style={styles.icon} />
                                <Text style={CommonStyle.boldblacktext}>  Delhi </Text>
                                <TouchableOpacity activeOpacity={0.5}>
                                    <Image source={ImagePath.info} style={styles.info} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.flexNew, { marginTop: '4%' }]}>
                            <View style={styles.flex}>
                                <Image source={ImagePath.date} style={styles.icon} />
                                <Text style={CommonStyle.boldblacktext}>  23/11/2023 - 0258 PM</Text>
                            </View>
                            <View style={styles.flex}>
                                <Image source={ImagePath.factory} style={styles.icon} />
                                <Text style={CommonStyle.boldblacktext}>  12345 </Text>
                            </View>
                        </View>

                        <View style={[styles.flexNew, { marginTop: '4%' }]}>
                            <View style={styles.flex}>
                                <Image source={ImagePath.car} style={styles.icon} />
                                <Text style={CommonStyle.boldblacktext}>  23/11/2023 - 0258 PM</Text>
                            </View>
                        </View>
                        <Text style={[CommonStyle.boldblacktext, { marginTop: '4%', fontSize: 16 }]}>Material List</Text>
                        <View style={{ marginTop: '2%' }}>
                            {list.map((item, key) => (
                                <View key={key} style={styles.listContainer}>
                                    <View style={styles.listContent}>
                                        <View style={styles.slContent}>
                                            <Text style={styles.listText}>{item.sl_no}</Text>
                                        </View>
                                        <View style={styles.productContent}>
                                            <Text style={CommonStyle.boldblacktext}>{item.product}</Text>
                                        </View>
                                        <View style={styles.weightContent}>
                                            <Text style={styles.listText}>{item.weight}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.hsntext}>HSN : {item?.hsn}</Text>
                                </View>
                            ))}
                        </View>
                        <Text style={[CommonStyle.boldblacktext, { textAlign: 'center', marginVertical: '2%' }]}>Uploaded by Vendor</Text>
                        <View style={styles.imgContainer}>
                            <TouchableOpacity onPress={() => onImageView(ImagePath.slip)} activeOpacity={0.5} style={styles.imgContent}>
                                <Text style={[CommonStyle.boldblacktext, { fontSize: 12 }]}>Weighing slip</Text>
                                <Image source={ImagePath.slip} style={styles.slipImage} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onImageView(ImagePath.truck)} activeOpacity={0.5} style={styles.imgContent}>
                                <Text style={[CommonStyle.boldblacktext, { fontSize: 12 }]}>Vehicle</Text>
                                <Image source={ImagePath.truck} style={styles.slipImage} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '8%', width: '100%', alignSelf: 'center', justifyContent: 'space-between' }}>
                            <Button name={'Weighing slip'} />
                            <Button name={'Vehicle'} />
                        </View>
                    </View>
                    <View style={[styles.flexNew,{width:'65%',alignSelf:'center'}]}>
                        <TouchableOpacity style={styles.aprvBtn}>
                            <Text style={CommonStyle.boldblacktext}>Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.aprvBtn}>
                            <Text style={CommonStyle.boldblacktext}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {(state.imageViewUri) && (
                <ImageView
                    imagePath={state.imageViewUri}
                    onClose={onImageView}
                // imageUri={}
                />
            )}
        </SafeAreaView>
    )
}

export default ProcessesRequestDetails