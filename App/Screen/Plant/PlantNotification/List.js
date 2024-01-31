import { View, Text } from 'react-native'
import React from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { getRandomColor } from '../../../Service/CommonFunction'
import { styles } from './styles'
import { Colors } from '../../../Utils/Colors'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

const List = ({ item, viewableItems }) => {
    const randomColor = getRandomColor();

    const rStyle = useAnimatedStyle(() => {
        if (viewableItems) {
            const isVisible = Boolean(
                viewableItems.value
                    .filter((item) => item?.isViewable)
                    .find((obj) => obj.item?.id == item?.id)
            );
            return {
                opacity: withTiming(isVisible ? 1 : 0.4),
                transform: [
                    {
                        scale: withTiming(isVisible ? 1 : 0.6),
                    }
                ]
            }
        } else {
            return {}
        }
    });

    return (
        <Animated.View style={[styles.listContainer, { borderColor: Colors.theme_color }, viewableItems && rStyle]}>
            <View style={[styles.listLeftcontent, { backgroundColor: Colors.theme_color }]} />
            <View style={styles.listRightcontent}>
                <Text style={CommonStyle.boldblacktext}>{item?.title}</Text>
                <Text style={CommonStyle.normalText}>{item?.description}</Text>
                <Text style={styles.datetext}>{item?.send_timestamp}</Text>
            </View>
        </Animated.View>
    )
}

export default List