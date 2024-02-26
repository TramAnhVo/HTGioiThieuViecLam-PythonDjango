import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MyContext from "../configs/MyContext";
import API, { authApi, endpoints } from "../configs/API";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default ThongTinDoanhNghiep = () => {
    const [user, dispatch] = useContext(MyContext);
    const [company, setCompany] = useState(null)
    // const userId = user.id;

    // useEffect(() => {
    //     const loadCompany = async () => {
    //         try {
    //             // let res = await API.get(endpoints['company-user'](userId));
    //         } catch (ex) {
    //             console.error(ex);
    //         }
    //     }

    //     loadCompany();
    // }, [userId]);

    return (
        <ScrollView style={{ flex: 1 }}>

            <View style={{ flex: 0.5 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: 'green', margin: 10 }}>PHẦN THÔNG TIN DOANH NGHIỆP</Text>

                <View style={{ borderRadius: 10, borderWidth: 1, padding: 15, marginLeft: 15, marginRight: 15, borderColor: 'green' }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="building" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Tên doanh nghiệp: </Text>
                        </View>

                        <TextInput placeholder="Tên doanh nghiệp"
                            editable={false}
                            value={user.name}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="email" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Email doanh nghiệp:</Text>
                        </View>

                        <TextInput placeholder="email doanh nghiệp"
                            editable={false}
                            value={user.email}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="location" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Địa chỉ doanh nghiệp:</Text>
                        </View>

                        <TextInput placeholder="địa chỉ doanh nghiệp"
                            editable={true}
                            value={user.address}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="link" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Link doanh nghiệp:</Text>
                        </View>

                        <TextInput placeholder="link doanh nghiệp"
                            editable={false}
                            value={user.link}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="building" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Giới thiệu về doanh nghiệp:</Text>
                        </View>

                        <TextInput placeholder="Giới thiệu về doanh nghiệp"
                            editable={false}
                            value={user.description}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <TouchableOpacity>
                            <Text style={styles.button}>Cập nhật thông tin</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


            {/* <View style={{ flex: 0.5 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: 'green', margin: 10 }}>PHẦN THÔNG TIN TÀI KHOẢN</Text>

                <View style={{ borderRadius: 10, borderWidth: 1, padding: 15, marginLeft: 15, marginRight: 15, borderColor: 'green' }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="user" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Tên tài khoản:</Text>
                        </View>

                        <TextInput placeholder="Tên doanh nghiệp"
                            editable={false}
                            value={user.last_name + ' ' + user.first_name}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="email" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Email:</Text>
                        </View>

                        <TextInput placeholder="Tên doanh nghiệp"
                            editable={false}
                            value={user.email}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome name="phone" size={24} color="black" style={{ paddingBottom: 10, paddingTop: 10, marginLeft: 10 }} />
                            <Text style={styles.TextTitle}>Số điện thoại:</Text>
                        </View>

                        <TextInput placeholder="Tên doanh nghiệp"
                            editable={false}
                            value={user.phone}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, color: 'black' }} />
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <TouchableOpacity>
                            <Text style={styles.button}>Cập nhật thông tin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    TextContent: {
        fontSize: 16,
        padding: 10
    },

    TextTitle: {
        fontSize: 18,
        fontWeight: '700',
        padding: 10
    },

    button: {
        padding: 10,
        backgroundColor: 'green',
        textAlign: 'center',
        width: '100%',
        color: 'white',
        fontSize: 15,
        borderRadius: 20,
        marginTop: 10
    }
})
