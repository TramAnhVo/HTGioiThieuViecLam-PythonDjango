import React, { useEffect, useState } from "react";
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Avatar from "./Avatar";


const windownHeight = Dimensions.get('window').height;

export default Account = ({ navigation }) => {
    

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='default' />
            {/* nen mau xanh dùng de thet ke */}
            <View style={{ flex: 0.2, backgroundColor: '#006400', position: 'relative' }}></View>

            {/* phan quan ly viec lam  */}
            <View style={{ flex: 0.8, backgroundColor: 'white', marginTop: 0.15 * windownHeight, }}>
                <Text style={styles.TextBar}>Quản lý công việc</Text>
                <View style={styles.items}>
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('SeeCV')}>
                            <FontAwesome5 name="user-alt" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                            <Text style={styles.TextItem}>Quản lý hồ sơ ứng tuyển</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('QLBD')}>
                            <FontAwesome name="briefcase" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                            <Text style={styles.TextItem}>Quản lý bài đăng tin tuyển dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.items}>
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('TTDN')}>
                            <FontAwesome name="building" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                            <Text style={styles.TextItem}>Hồ sơ thông tin doanh nghiệp</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('DTTD')}>
                            <MaterialCommunityIcons name="clipboard-file" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                            <Text style={styles.TextItem}>Đăng bài tin tuyển dụng </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={styles.items}>
                    <View style={styles.item}>
                        <MaterialCommunityIcons name="eye" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                        <Text style={styles.TextItem}>Nhà tuyển dụng đã xem hồ sơ</Text>
                    </View>
                    <View style={styles.item}>
                        <FontAwesome name="building" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                        <Text style={styles.TextItem}>Công ty đang theo dõi</Text>
                    </View>
                </View> */}
            </View>

            {/* phan de anh dai dien nguoi dung va ten nguoi dung */}
            <View style={styles.UserBar}>
                <Avatar/>
                <View >
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>Nguyễn Văn A</Text>
                    <Text styles={{ textAlign: 'center' }}>Nhà tuyển dụng</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    UserBar: {
        top: 50,
        left: 18,
        right: 40,
        width: '90%',
        height: '20%',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 99,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    item: {
        width: '45%',
        height: '100%',
        backgroundColor: '#F0F0F0',
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderRadius: 10
    },

    items: {
        height: '24%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 10,
    },

    TextBar: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 18
    },

    TextItem: {
        fontSize: 16,
        textAlign: 'center',
        padding: 5
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: 'red',
    },

    MenuBar: {
        flex: 0.08,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 4,
        padding: 5
    }
});