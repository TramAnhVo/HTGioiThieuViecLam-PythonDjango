
import React, { useContext } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";

import Avatar from "./Avatar";
import MyContext from "../configs/MyContext";
import { MenuCompany } from "./MenuCompany";
import InforUser from "./InforUser";


const windownHeight = Dimensions.get('window').height;

export default Account = ({ navigation }) => {
    const [user] = useContext(MyContext);
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='default' />
            {/* nen mau xanh dùng de thet ke */}
            <View style={{ flex: 0.2, backgroundColor: '#006400', position: 'relative' }}></View>
            {/* phan quan ly viec lam  */}
            <View style={{ flex: 0.8, backgroundColor: 'white', marginTop: 0.15 * windownHeight, }}>
                {user.role?<InforUser user={user} navigation={navigation}/>:<MenuCompany navigation={navigation}/>}
            </View>

            {/* phan de anh dai dien nguoi dung va ten nguoi dung */}
            <View style={styles.UserBar}>
                <Avatar/>
                <View >
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{user.role?user.username:user.name}</Text>
                    <Text styles={{ textAlign: 'center' }}>{user.role?'Ứng viên':'Nhà tuyển dụng'}</Text>
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