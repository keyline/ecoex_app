import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import Header from '../../../Container/Header'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Colors } from '../../../Utils/Colors'

const PlantDashBoard = ({ navigation }) => {

    const [state, setState] = useState({
        loading: false,
        data: '',
        progressValue: 90,
        progressColor: Colors.theme_light
    })

    const onHeaderPress = useCallback(async () => {
        console.log('hiiiii')
    })

    const NameValue = ({ name, value }) => (
        <Text style={styles.nametxt}>{name} - <Text style={styles.valuetxt}>{value}</Text></Text>
    )

    const Bottom = ({ name, onPress, color }) => (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.btmcontainer, { backgroundColor: color ? color : Colors.theme_color }]}>
            <Text style={styles.btmtext}>{name}</Text>
        </TouchableOpacity>
    )

    const onRequest = useCallback(async (val) => {
        if (val == 1) {
            setState(prev => ({
                ...prev,
                progressColor: Colors.blue,
                progressValue: 60
            }))
        } else if (val == 2) {
            setState(prev => ({
                ...prev,
                progressColor: Colors.yellow,
                progressValue: 70
            }))
        } else if (val == 3) {
            setState(prev => ({
                ...prev,
                progressColor: Colors.red,
                progressValue: 80
            }))
        } else if (val == 4) {
            setState(prev => ({
                ...prev,
                progressColor: Colors.theme_light,
                progressValue: 90
            }))
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                name={'Dashboard'}
                leftIcon={ImagePath.home}
                leftOnPress={onHeaderPress}
                navigation={navigation}
            />
            <ScrollView>
                <View style={styles.bodyContent}>
                    <View style={styles.profileContainer}>
                        <Image source={ImagePath.dp} style={styles.dp} />
                        <View style={styles.profileInfo}>
                            <NameValue name={'Plant Id'} value={'123456'} />
                            <NameValue name={'Manager Name'} value={'Neha Priya Singh'} />
                            <NameValue name={'Email ID'} value={'neha@ecoext.market'} />
                            <NameValue name={'Plant Address'} value={'ABCD, CP delhi - 110001'} />
                            <NameValue name={'Plant Location'} value={'Delhi'} />
                        </View>
                    </View>
                    <View style={styles.btnContent}>
                        <Text style={styles.headingText}>Request Status Wise Count</Text>
                        <View style={styles.statusContent}>
                            <View>
                                <Bottom onPress={() => onRequest(1)} name={'Add Request'} color={Colors.blue} />
                                <Bottom onPress={() => onRequest(2)} name={'In Process Request'} color={Colors.yellow} />
                                <Bottom onPress={() => onRequest(3)} name={'Rejected Request'} color={Colors.red} />
                                <Bottom onPress={() => onRequest(4)} name={'Close Request'} color={Colors.theme_light} />
                            </View>
                            <CircularProgress
                                // maxValue={200}
                                value={state.progressValue}
                                activeStrokeWidth={10}
                                inActiveStrokeColor={Colors.grey}
                                inActiveStrokeOpacity={0.2}
                                activeStrokeColor={state.progressColor}
                                progressValueColor={state.progressColor}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PlantDashBoard