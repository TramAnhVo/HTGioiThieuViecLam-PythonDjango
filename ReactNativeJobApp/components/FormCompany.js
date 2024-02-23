import React, { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import API, { endpoints } from "../configs/API";
import { storage } from "../configs/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';
import OverlayLoading from "./Loading";

const heightWindow = Dimensions.get("window").height;

export default FormCompany = ({ route, navigation }) => {
    const { dataUser } = route.params;
    const [nameFile, setNameFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        name: '',
        address: '',
        email: '',
        link: '',
        user: '',
        image: '',
    });
    const handleChangeInfo = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };
    const handlePickImage = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*",
                multipleL: false
            });
            if (!result.canceled) {
                const { uri, name } = result.assets[0];
                setNameFile(name);
                setUrl(uri);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    const uploadFirebase = async (uri, name) => {
        return new Promise((resolve, reject) => {
            fetch(uri)
                .then((response) => response.blob())
                .then((blob) => {
                    const storageRef = ref(storage, `company/${Date.now()}_${name}`);
                    const uploadTask = uploadBytesResumable(storageRef, blob);
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                            console.log(`Upload is ${progress}% done`);
                        },
                        (error) => {
                            console.error("Error uploading file:", error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    resolve(downloadURL);
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        }
                    );
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const handleSubmit = async () => {
        try {
            console.log(dataUser);
            setLoading(true);
            const { data } = await API.post(endpoints[`register`], dataUser, {
                headers: {
                    'Content-Type': 'application/json', 'charset': 'utf-8'
                }
            });
            formData.user = data.id;
            formData.image = await uploadFirebase(url, nameFile);
            await API.post(endpoints[`companies`], formData);
            setLoading(false);
            navigation.navigate('Login');
            ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <SafeAreaView>
            {isLoading && <OverlayLoading />}
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 24 }}>ĐĂNG KÝ DOANH NGHIỆP</Text>
                </View>
                <ScrollView>
                    <View style={styles.items}>
                        <FontAwesome5 name="building" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                        <TextInput value={formData.name}
                            onChangeText={(text) => handleChangeInfo('name', text)}
                            placeholder="Tên doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                    </View>

                    <View style={styles.items}>
                        <Ionicons name="location-sharp" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                        <TextInput value={formData.address}
                            onChangeText={(text) => handleChangeInfo('address', text)}
                            placeholder="Địa chỉ doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                    </View>

                    <View style={styles.items}>
                        <MaterialIcons name="email" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                        <TextInput value={formData.email}
                            onChangeText={(text) => handleChangeInfo('email', text)}
                            placeholder="Email doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                    </View>

                    <View style={styles.items}>
                        <Feather name="link" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                        <TextInput value={formData.link}
                            onChangeText={(text) => handleChangeInfo('link', text)}
                            placeholder="Link doanh nghiệp" style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none" />
                    </View>

                    <TouchableOpacity onPress={handlePickImage}
                        style={styles.items}>
                        <FontAwesome name="image" size={30} color="#2E8B57" style={{ paddingLeft: 24 }} />
                        <Text style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }}>
                            {nameFile ? nameFile : 'Logo doanh nghiệp'}</Text>
                    </TouchableOpacity>

                    <View style={styles.items}>
                        <TextInput value={formData.description}
                            onChangeText={(text) => handleChangeInfo('description', text)}
                            placeholder="Giới thiệu doanh nghiệp"
                            style={{ color: 'black', width: '75%', height: '100%', fontSize: 16 }} autoCapitalize="none"
                            multiline={true} numberOfLines={5} />
                    </View>

                    <TouchableOpacity onPress={handleSubmit}
                        style={styles.btnDang}>
                        <Text style={styles.textBtn}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '5%',
        alignItems: 'center',
        marginTop: 0.1 * heightWindow,
        marginBottom: 0.05 * heightWindow
    },
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