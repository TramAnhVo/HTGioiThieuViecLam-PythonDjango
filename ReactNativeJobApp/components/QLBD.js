import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default QuanLyBaiDang = () => {
    return (
        <View>
            <Text style={{ textAlign: 'center', fontWeight: "700", fontSize: 22, margin: 6 }}>QUẢN LÝ BÀI ĐĂNG TUYỂN DỤNG CÔNG VIỆC</Text>

            <ScrollView>
                <View style={styles.HeaderCV}>
                    <View style={styles.TextCv}>
                        <Text style={styles.TextContent} >Vị trí tuyển dụng: lập trình viên Java</Text>
                        <Text style={styles.TextContent} >Ngày đăng: 20/01/2024</Text>
                        <Text style={styles.TextContent} >Ngày hết hạn: 30/01/2024</Text>
                        <Text style={styles.TextContent} >Số lượng cv nộp về: 10</Text>
                    </View>

                    <View style={styles.ButtonCV}>
                        <TouchableOpacity style={{ padding: 5 }}>
                            <FontAwesome5 name="pen" size={30} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="lock" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.HeaderCV}>
                    <View style={styles.TextCv}>
                        <Text style={styles.TextContent} >Vị trí tuyển dụng: lập trình viên Java</Text>
                        <Text style={styles.TextContent} >Ngày đăng: 20/01/2024</Text>
                        <Text style={styles.TextContent} >Ngày hết hạn: 30/01/2024</Text>
                        <Text style={styles.TextContent} >Số lượng cv nộp về: 10</Text>
                    </View>

                    <View style={styles.ButtonCV}>
                    <TouchableOpacity style={{ padding: 5 }}>
                            <FontAwesome5 name="pen" size={30} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="lock" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.HeaderCV}>
                    <View style={styles.TextCv}>
                        <Text style={styles.TextContent} >Vị trí tuyển dụng: lập trình viên Java</Text>
                        <Text style={styles.TextContent} >Ngày đăng: 20/01/2024</Text>
                        <Text style={styles.TextContent} >Ngày hết hạn: 30/01/2024</Text>
                        <Text style={styles.TextContent} >Số lượng cv nộp về: 10</Text>
                    </View>

                    <View style={styles.ButtonCV}>
                    <TouchableOpacity style={{ padding: 5 }}>
                            <FontAwesome5 name="pen" size={30} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="lock" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    HeaderCV: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 13,
        borderRadius: 15,
        borderColor: 'green',
        borderWidth: 1,
        margin: 10,
    },

    TextHead: {
        fontWeight: "700",
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
    },

    TextCv: {
        width: '80%',
    },

    TextContent: {
        fontWeight: "700",
        fontSize: 16,
    },

    ButtonCV: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '30%',
    }
});