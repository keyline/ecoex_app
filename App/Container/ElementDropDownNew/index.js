import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';

const ElementDropDownNew = ({ name, setValue, data, mode, value, search, labelField, valueField, placeholder, error, width }) => {

    const [isFocus, setIsFocus] = useState(false);

    return (
        <Dropdown
            data={data}
            style={[styles.dropdown, { width: width ? width : '60%' }, error && { borderColor: 'red', borderWidth: 2 }, isFocus && { borderColor: 'blue', borderWidth: 1 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            maxHeight={200}
            labelField={labelField ? labelField : "label"}
            valueField={valueField ? valueField : "value"}
            placeholder={placeholder ? placeholder : `Select ${name}`}
            searchPlaceholder={`Search ${name}`}
            value={value}
            search={search ? search : false}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item);
                setIsFocus(false);
            }}
            containerStyle={{
                borderWidth: 1,
            }}
            mode={mode ? mode : 'auto'}
        />
    )
}

export default ElementDropDownNew