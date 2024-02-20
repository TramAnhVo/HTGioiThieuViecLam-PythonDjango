import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default DangKyDoanhNghiep = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', fontWeight: "700", fontSize: 22, margin: 6 }}>ĐĂNG KÝ DOANH NGHIỆP</Text>

            <ScrollView>
                <View style={styles.items}>
                    <FontAwesome5 name="building" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Tên doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <Ionicons name="location-sharp" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Địa chỉ doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <MaterialIcons name="email" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Email doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <Feather name="link" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Link doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <FontAwesome name="image" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                    <TextInput placeholder="Logo doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                </View>

                <View style={styles.items}>
                    <TextInput placeholder="Giới thiệu doanh nghiệp"
                        style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none"
                        multiline={true} numberOfLines={5} />
                </View>

                <TouchableOpacity style={styles.btnDang}>
                    <Text style={styles.textBtn}>ĐĂNG KÝ</Text>
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