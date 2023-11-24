import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';
import { CommonStyle } from '../../Utils/CommonStyle';

const datas = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const ElementDropDown = ({ name, setValue, data, mode, value, search, labelField, valueField, placeholder, error, width }) => {

    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            {(name) && (
                <Text style={CommonStyle.boldblacktext}>{name} :</Text>
            )}
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
            {/* <Text>Select Product</Text> */}
        </View>
    )
}

export default ElementDropDown