import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from '../../Utils/Colors'
import SelectDropdown from 'react-native-select-dropdown'
import { Font_Family } from '../../Utils/Fonts'

const DropDownSmall = ({ value, width, items, onChangeValue, placeholder, searchable, listMode, error }) => {
    return (
        <View style={{ width: width ? width : '80%' }}>
            <SelectDropdown
                data={items}
                onSelect={(selectedItem, index) => {
                    onChangeValue(selectedItem)
                }}
                defaultValue={value}
                defaultButtonText={placeholder ? placeholder : ''}
                buttonStyle={{
                    // backgroundColor:'blue',
                    width: '100%',
                    height: 30,
                    borderWidth: 1,
                    borderRadius: 5,

                }}
                buttonTextStyle={{
                    fontFamily: Font_Family.NunitoSans_Regular,
                    fontSize: 10,
                    color: Colors.black
                }}
                rowTextStyle={{
                    fontFamily: Font_Family.NunitoSans_Regular,
                    color: Colors.black,
                    fontSize: 10
                }}
            />
            {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={val => onChangeValue(val)}
                labelStyle={styles.labelStyle}
                placeholder={placeholder ? placeholder : `Select `}
                placeholderStyle={styles.placeholderStyle}
                searchable={searchable ? searchable : false}
                listMode={listMode ? listMode : 'SCROLLVIEW'}
                searchPlaceholder={`Search`}
                style={[styles.dropdown, { borderColor: Colors.black }]}
                autoScroll={true}
                dropDownDirection={'AUTO'}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                scrollViewProps={{
                    nestedScrollEnabled: true
                }}
                flatListProps={{
                    nestedScrollEnabled: true,
                    initialNumToRender: 5
                }}
            /> */}
            {error && (
                <Text style={styles.error}>{error}</Text>
            )}
        </View>
    )
}

export default DropDownSmall