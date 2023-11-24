import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const Loader = ({ loading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator animating={loading} color={Colors.theme_color} size={'large'} />
      </View>
    </View>
  )
}

export default Loader