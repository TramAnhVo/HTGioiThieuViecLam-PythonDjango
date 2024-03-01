import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import API, { endpoints } from '../configs/API';
import { Entypo } from '@expo/vector-icons';

const SearchInput = ({ setNext, setPrevious, setJobs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locations, setLocations] = useState([])
    const [isFocus, setIsFocus] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    useEffect(() => {
        const loadData = async () => {
            let res = await API.get(endpoints[`locations`]);
            setLocations(res.data);
        }
        loadData();
    }, [])

    const handleSearch = async () => {
        const { data } = await API.get(endpoints[`search`](selectedLocation));
        setJobs(data);
        setNext(null);
        setPrevious(null)
    }

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={locations.map(location => ({ label: location.name, value: location.id }))}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Chọn địa điểm' : '...'}
                searchPlaceholder="Tìm kiếm..."
                value={selectedLocation}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setSelectedLocation(item.value)
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <Entypo name="location-pin" size={30} color="#2E8B57" style={{ paddingLeft: 24, paddingRight: 24 }} />
                )}
            />
            <Button title="Tìm kiếm" onPress={handleSearch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        marginRight: 8,
    },
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        width: '70%',
        height: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#F0F0F0',
        borderWidth: 1,
        marginRight: '5%',
        marginTop: '3%'
    },
});

export default SearchInput;
