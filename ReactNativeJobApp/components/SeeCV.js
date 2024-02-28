import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import API, { endpoints } from "../configs/API";

export default SeeCV = ({ route }) => {
    const [Cv, SetCv] = useState(null)
    const { jobId,title } = route.params;

    useEffect(() => {
        const loadCvDetail = async () => {
            try {
                let res = await API.get(endpoints['job-cv'](jobId));
                SetCv(res.data)
                console.log(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadCvDetail();
    }, [jobId]);

    return (
        <ScrollView style={{ flex: 1 }}>
            {Cv === null ? <ActivityIndicator /> : <>
                {Cv.map(c => (
                    <View style={styles.HeaderCV}>
                        <View style={styles.TextCv}>
                            <Text style={styles.TextContent} >{c.user}</Text>
                            <Text style={styles.TextContent} >Vị trí ứng tuyển: {title}</Text>
                            <Text style={styles.TextContent} >File cv: {c.link_cv}</Text>
                            <Text style={styles.TextContent} >Ngày ứng tuyển: {c.created_date}</Text>
                        </View>

                        <View style={styles.ButtonCV}>
                            <TouchableOpacity style={{ padding: 5 }}>
                                <AntDesign name="checkcircle" size={30} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name="closecircle" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </>}
        </ScrollView>
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

    TextCv: {
        width: '80%',
    },

    TextContent: {
        fontWeight: "700",
        fontSize: 16,
        color: 'black'
    },

    ButtonCV: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '20%',
    }
})