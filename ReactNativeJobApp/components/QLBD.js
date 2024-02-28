import React, { useContext, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import API, { authApi, endpoints } from "../configs/API";
import { useState } from "react";
import MyContext from "../configs/MyContext";

export default QuanLyBaiDang = () => {
    const [jobs, setJobs] = useState(null)
    const [user, dispatch] = useContext(MyContext);
    const userId = user.id;

    useEffect(() => {
        const loadCompanyJob = async () => {
            try {
                let jobs = await API.get(endpoints['job-company'](userId))
                setJobs(jobs.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadCompanyJob();
    });

    return (
        <View>
            <Text style={{ textAlign: 'center', fontWeight: "700", fontSize: 22, margin: 6 }}>QUẢN LÝ BÀI ĐĂNG TUYỂN DỤNG CÔNG VIỆC</Text>
            {jobs === null ? <ActivityIndicator /> : <>
                {jobs.map(j => (
                    <ScrollView>
                        <View style={styles.HeaderCV}>
                            <TouchableOpacity style={styles.TextCv}>
                                <Text style={styles.TextContent} >Vị trí: {j.title}</Text>
                                <Text style={styles.TextContent} >Ngày đăng: {j.created_date}</Text>
                                <Text style={styles.TextContent} >Ngày hết hạn: {j.out_off_date}</Text>
                            </TouchableOpacity>

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
                ))}
            </>}
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