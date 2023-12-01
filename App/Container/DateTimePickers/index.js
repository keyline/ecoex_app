import { View, Text } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickers = ({ value, mode, onConfirm, minimumDate, maximumDate, disabled }) => {
    return (
        <View>
            <DateTimePicker
                value={value ? value : new Date()}
                onChange={(date) => onConfirm(date)}
                // disabled={true}
                minimumDate={minimumDate ? minimumDate : null}
                maximumDate={maximumDate ? maximumDate : null}
                mode={mode}
            />
        </View>
    )
}

export default DateTimePickers