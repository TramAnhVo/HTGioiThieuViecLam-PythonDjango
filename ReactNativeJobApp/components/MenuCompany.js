import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from "react";
import MyContext from "../configs/MyContext";


export const MenuCompany=({ navigation })=>{
    const [user,dispatch]=useContext(MyContext);
    const logout = () => {
        dispatch({
            "type": "logout"
        })
        navigation.navigate("Login")
    }
    return (
        <>
         <Text style={styles.TextBar}>Quản lý công việc</Text>
                <View style={styles.items}>
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('QLBD')}>
                            <FontAwesome name="briefcase" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                            <Text style={styles.TextItem}>Quản lý bài đăng tin tuyển dụng</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('DTTD')}>
                            <MaterialCommunityIcons name="clipboard-file" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                            <Text style={styles.TextItem}>Đăng bài tin tuyển dụng </Text>
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
                        <TouchableOpacity onPress={logout}>
                            <Entypo name="log-out" size={30} color="green" style={{ textAlign: 'center', marginTop: 10 }} />
                            <Text style={styles.TextItem}>Đăng xuất tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </>
    )
}
const styles = StyleSheet.create({

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

}); 