import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import API, { endpoints } from "../configs/API";
import MyContext from "../configs/MyContext";

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

export default DangTinTuyenDung = ({navigation}) => {
    // dia diem
    const [isFocus, setIsFocus] = useState(false);

    // nganh nghe
    const [isFocus1, setIsFocus1] = useState(false);

    // cap bac
    const [isFocus2, setIsFocus2] = useState(false);

    // luong 
    const [isFocus3, setIsFocus3] = useState(false);

    // kinh nghiem
    const [isFocus4, setIsFocus4] = useState(false);

    const [majors, setMajor] = useState([]);
    const [positions, setPosition] = useState([]);
    const [locations, setLocation] = useState([]);
    const [user] = useContext(MyContext);
    useEffect(() => {
        const loadData = async () => {
            let res = await API.get(endpoints[`locations`]);
            setLocation(res.data);
            res = await API.get(endpoints[`majors`]);
            setMajor(res.data)
            res = await API.get(endpoints[`positions`]);
            setPosition(res.data)
        }
        loadData();
    },[]);
    const [formData, setFormData] = useState({
        description: '',
        title: '',
        requirement: '',
        experience: '',
        salary: '',
        out_off_date: '',
        location: '',
        major:'',
        position:'',
        company:user.id,
    });
    const handleChangeInfo = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };
    const handleSubmit=async()=>{
        const res=await API.post(endpoints[`jobs`],(formData));
        navigation.navigate("HomeCompany",{screen:'JobCompany'});
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', fontWeight: "700", fontSize: 22, margin: 6 }}>ĐĂNG TIN TUYỂN DỤNG</Text>

            <ScrollView>
                <View style={styles.items}>
                    <FontAwesome5 name="pen-alt" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput value={formData.title} 
                    onChangeText={(text) => handleChangeInfo('title', text)} 
                    placeholder="Tiêu đề tuyển dụng" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <MaterialCommunityIcons name="clipboard-file" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput value={formData.description} 
                    onChangeText={(text) => handleChangeInfo('description', text)} 
                    placeholder="Miêu tả việc làm" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <MaterialCommunityIcons name="clipboard-file" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput value={formData.requirement}
                    onChangeText={(text) => handleChangeInfo('requirement', text)} 
                    placeholder="Yêu cầu việc làm" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
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
                    value={formData.experience}
                    onFocus={() => setIsFocus3(true)}
                    onBlur={() => setIsFocus3(false)}
                    onChange={item => {
                        handleChangeInfo('experience', item.label)
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
                    value={formData.salary}
                    onFocus={() => setIsFocus4(true)}
                    onBlur={() => setIsFocus4(false)}
                    onChange={item => {
                        handleChangeInfo('salary', item.label)
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
                    data={locations.map(location => ({ label: location.name, value: location.id }))}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Chọn địa điểm' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={formData.location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        handleChangeInfo('location', item.value)
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
                    data={majors.map(major => ({ label: major.name, value: major.id }))}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus1 ? 'Chọn ngành nghề' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={formData.major}
                    onFocus={() => setIsFocus1(true)}
                    onBlur={() => setIsFocus1(false)}
                    onChange={item => {
                        handleChangeInfo('major', item.value)
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
                    data={positions.map(position => ({ label: position.name, value: position.id }))}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus2 ? 'Chọn cấp bậc' : '...'}
                    searchPlaceholder="Tìm kiếm..."
                    value={formData.position}
                    onFocus={() => setIsFocus2(true)}
                    onBlur={() => setIsFocus2(false)}
                    onChange={item => {
                        handleChangeInfo('position', item.value)
                        setIsFocus2(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign name="contacts" size={30} color="#2E8B57" style={{ paddingLeft: 24, paddingRight: 24 }} />
                    )}
                />

                <View style={styles.items}>
                    <FontAwesome5 name="calendar-times" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput value={formData.out_off_date} 
                    onChangeText={(text) => handleChangeInfo('out_off_date', text)} 
                    placeholder="Ngày hết hạn" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <TouchableOpacity onPress={handleSubmit} 
                    style={styles.btnDang}>
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