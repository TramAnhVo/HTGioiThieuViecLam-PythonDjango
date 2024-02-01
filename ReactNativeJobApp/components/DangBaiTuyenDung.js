import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Hồ Chí Ninh', value: '1' },
    { label: 'Hà Nội', value: '2' },
    { label: 'Hải Phòng', value: '3' },
    { label: 'Đà Nẵng', value: '4' },
    { label: 'Bình Dương', value: '5' },
    { label: 'Đồng Nai', value: '6' },
];

const position = [
    { label: 'Nhân viên chính thức', value: '1' },
    { label: 'Thực tập sinh', value: '2' },
    { label: 'Nhân viên bán thời gian', value: '3' },
    { label: 'Quản lý', value: '4' },
    { label: 'Giám đốc', value: '5' },
];

const major = [
    { label: 'Kinh doanh/bán hàng', value: '1' },
    { label: 'Công nghệ thông tin', value: '2' },
    { label: 'Giao thông vận tải', value: '3' },
    { label: 'Kế toán kiểm toán', value: '4' },
    { label: 'Marketing truyền thông quảng cáo', value: '5' },
];

const salary = [
    { label: '2tr - 3tr', value: '1' },
    { label: '5Tr - 6Tr', value: '2' },
    { label: '7Tr - 8Tr', value: '3' },
    { label: '8Tr - 9Tr', value: '4' },
    { label: '10Tr - 11Tr', value: '5' },
    { label: '12Tr - 14Tr', value: '6' },
    { label: '15Tr - 16Tr', value: '7' },
    { label: '17Tr - 20Tr', value: '8' },
    { label: 'Lương thỏa thuận', value: '9' },
];

const experience = [
    { label: 'Không cần kinh nghiệm', value: '1' },
    { label: 'Dưới 6 tháng kinh nghiệm', value: '2' },
    { label: 'Trên 6 tháng kinh nghiệm', value: '3' },
    { label: '1 năm kinh nghiệm', value: '4' },
    { label: '2-3 năm kinh nghiệm', value: '5' },
    { label: 'Dưới 5 năm kinh nghiệm', value: '6' },
    { label: 'Trên 5 năm kinh nghiệm', value: '7' },
   
];

export default DangTinTuyenDung = () => {
    // dia diem
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    // nganh nghe
    const [value1, setValue1] = useState(null);
    const [isFocus1, setIsFocus1] = useState(false);

    // cap bac
    const [value2, setValue2] = useState(null);
    const [isFocus2, setIsFocus2] = useState(false);

    // luong 
    const [value3, setValue3] = useState(null);
    const [isFocus3, setIsFocus3] = useState(false);

    // kinh nghiem
    const [value4, setValue4] = useState(null);
    const [isFocus4, setIsFocus4] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', fontWeight: "700", fontSize: 22, margin: 6 }}>ĐĂNG TIN TUYỂN DỤNG</Text>

            <ScrollView>
                <View style={styles.items}>
                    <FontAwesome5 name="pen-alt" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Vị trí tuyển dụng" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <MaterialCommunityIcons name="clipboard-file" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Miêu tả việc làm" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <MaterialCommunityIcons name="clipboard-file" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Yêu cầu việc làm" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>
                
                {/* kinh nghiem */}
                <Dropdown
                    style={[styles.dropdown, isFocus3 && { borderColor: 'black' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={experience}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus3 ? 'Chọn kinh nghiệm' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={value3}
                    onFocus={() => setIsFocus3(true)}
                    onBlur={() => setIsFocus3(false)}
                    onChange={item => {
                        setValue3(item.value3);
                        setIsFocus3(false);
                    }}
                    renderLeftIcon={() => (
                        <MaterialCommunityIcons name="clipboard-file" size={30} color="#2E8B57" style={{ paddingLeft: 24, paddingRight: 24 }} />
                    )}
                />
                
                {/* luong  */}
                <Dropdown
                    style={[styles.dropdown, isFocus4 && { borderColor: 'black' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={salary}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus4 ? 'Chọn lương' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={value4}
                    onFocus={() => setIsFocus4(true)}
                    onBlur={() => setIsFocus4(false)}
                    onChange={item => {
                        setValue4(item.value4);
                        setIsFocus4(false);
                    }}
                    renderLeftIcon={() => (
                        <MaterialIcons name="attach-money" size={30} color="#2E8B57" style={{ paddingLeft: 24, paddingRight: 24 }} />
                    )}
                />

                {/* dia diem lam viec */}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Chọn địa điểm' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <Entypo name="location-pin" size={30} color="#2E8B57" style={{ paddingLeft: 24, paddingRight: 24 }} />
                    )}
                />

                {/* chon nghanh nghe */}
                <Dropdown
                    style={[styles.dropdown, isFocus1 && { borderColor: 'black' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={major}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus1 ? 'Chọn ngành nghề' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={value1}
                    onFocus={() => setIsFocus1(true)}
                    onBlur={() => setIsFocus1(false)}
                    onChange={item => {
                        setValue1(item.value1);
                        setIsFocus1(false);
                    }}
                    renderLeftIcon={() => (
                        <Entypo name="briefcase" size={30} color="#2E8B57" style={{ paddingLeft: 24, paddingRight: 24 }} />
                    )}
                />

                {/* chon cap bac */}
                <Dropdown
                    style={[styles.dropdown, isFocus2 && { borderColor: 'black' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={position}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus2 ? 'Chọn cấp bậc' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={value2}
                    onFocus={() => setIsFocus2(true)}
                    onBlur={() => setIsFocus2(false)}
                    onChange={item => {
                        setValue2(item.value2);
                        setIsFocus2(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign name="contacts" size={30} color="#2E8B57" style={{ paddingLeft: 24, paddingRight: 24 }} />
                    )}
                />

                <View style={styles.items}>
                    <FontAwesome5 name="calendar-times" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Ngày hết hạn" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <TouchableOpacity style={styles.btnDang}>
                    <Text style={styles.textBtn}>ĐĂNG BÀI</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    items: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        width: '90%',
        height: '30px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#F0F0F0',
        borderWidth: 1,
        marginLeft: '5%',
        marginTop: '3%'
    },

    btnDang: {
        width: '90%',
        height: '30px',
        backgroundColor: '#2E8B57',
        padding: 12,
        borderRadius: 100,
        marginLeft: '5%',
        marginTop: '3%'
    },

    textBtn: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },

    // combox
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        width: '90%',
        height: '30px',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#F0F0F0',
        borderWidth: 1,
        marginLeft: '5%',
        marginTop: '3%'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});