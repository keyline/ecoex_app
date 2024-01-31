import { View, Text } from 'react-native'
import React from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'

const DatePickerModal = ({ value, onClose, onConfirm, mode, isVisible, minimumDate, maximumDate }) => {
    return (
        <DateTimePicker
            isVisible={isVisible}
            date={value ? value : new Date()}
            mode={mode ? mode : 'date'}
            minimumDate={minimumDate ? minimumDate : null}
            maximumDate={maximumDate ? maximumDate : null}
            onConfirm={date => onConfirm(date)}
            onCancel={onClose}
        />
    )
}

export default DatePickerModal