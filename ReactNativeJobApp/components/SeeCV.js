import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import API, { endpoints } from "../configs/API";
import { Entypo } from '@expo/vector-icons';
import WebView from "react-native-webview";
import { ModalViewCV } from "./ModalViewCV";
import { Mail } from "./Mail";
// import PDFView from 'react-native-view-pdf';

export default SeeCV = ({ navigation, route }) => {
    const [Cv, SetCv] = useState(null)
    const { jobId, title } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalMail, setModalMail] = useState(false);

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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleMail = () => {
        setModalMail(!isModalMail);
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            {Cv === null ? <ActivityIndicator /> : <>
                {Cv.map(c => (
                    <View style={styles.HeaderCV}>
                        <View style={styles.TextCv}>
                            <Text style={styles.TextContent} >{c.user.last_name + ' ' + c.user.first_name}</Text>
                            <Text style={styles.TextContent} >Vị trí ứng tuyển: {title}</Text>
                            <Text style={styles.TextContent} >File cv: {c.link_cv}</Text>
                            <Text style={styles.TextContent} >Ngày ứng tuyển: {c.created_date}</Text>
                        </View>

                        <View style={styles.ButtonCV}>
                            <TouchableOpacity onPress={toggleModal}>
                                <Entypo name="eye" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleMail}
                                style={{ padding: 5 }}>
                                <AntDesign name="checkcircle" size={30} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name="closecircle" size={30} color="red" />
                            </TouchableOpacity>

                        </View>
                        <ModalViewCV toggleModal={toggleModal} isModalVisible={isModalVisible} link_cv={c.link_cv} />
                        <Mail navigation={navigation} toggleMail={toggleMail} isModalMail={isModalMail} email={c.user.email}/>
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
        alignItems: 'center',
        width: '20%',
        justifyContent: 'center',
        textAlign: 'center'
    }
})