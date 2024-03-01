import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from "../configs/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import MyContext from '../configs/MyContext';
import { IMAGE_DEFAULT } from '../utils/image_default';
import API, { endpoints } from '../configs/API';
import OverlayLoading from './Loading';

export default Avatar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [loading,setLoading]=useState(false);
    const [user,dispatch] = useContext(MyContext);
    useEffect(() => {
        if(user.role)
            setImgUrl(user.avatar || IMAGE_DEFAULT)
        else
            setImgUrl(user.image || IMAGE_DEFAULT)
    }, []);
    
    const handleCameraLaunch = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (granted) {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [1, 1],
                quality: 0.5,
                allowsMultipleSelection: false,
                cameraType: ImagePicker.CameraType.front
            })
            try {
                if (!result.canceled) {
                    setLoading(true);
                    const url = await uploadFirebase(result.assets[0].uri, 'takePhoto');
                    await updateAvatar(url);
                    setImgUrl(url);
                    setLoading(false);
                    setModalVisible(false);
                    ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
                }
            } catch (error) {
                setLoading(false);
                console.log("error", error);
            }
            setModalVisible(false);
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }
    const uploadFirebase = async (uri, name) => {
        return new Promise((resolve, reject) => {
            fetch(uri)
                .then((response) => response.blob())
                .then((blob) => {
                    const storageRef = ref(storage, `images/${Date.now()}_${name}`);
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
    const uploadImage = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*",
                multipleL: false
            });
            setLoading(true);
            if (!result.canceled) {
                const { uri, name } = result.assets[0];
                const url = await uploadFirebase(uri, name);
                await updateAvatar(url);
                setImgUrl(url);
                setLoading(false);
                setModalVisible(false);
                ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error uploading image:', error);
        }
    };
    const deleteAvatar=async()=>{
        try {
            setLoading(true);
            setImgUrl(IMAGE_DEFAULT);
            await updateAvatar(IMAGE_DEFAULT);
            setLoading(false);
            setModalVisible(false);
        } catch (error) {
            setLoading(false);
        }
    }
    const updateAvatar = async (url) => {
        try {
            // let user = await authApi(data.access_token).get(endpoints['current-user']);
            const res = await API.patch(endpoints[`update-user`](user.id), { "avatar": url })
            console.log(res.data)
            dispatch({
                type: "login",
                payload: res.data
            });
        } catch (error) {
            console.log("Show error: ", error);
        }
    }
    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                {imgUrl === null ?
                    <Image source={require('./image/job.png')} style={styles.avatar} />
                    : <Image source={{ uri: imgUrl }} style={styles.avatar} />}
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: '70%', backgroundColor: 'white', padding: 12, borderRadius: 10, alignItems: 'center' }}>
                        <Text style={{ marginBottom: 6, fontSize: 20, fontWeight: 'bold' }}>Chọn ảnh đại diện</Text>
                        <TouchableOpacity style={[styles.option, styles.border]} onPress={() => uploadImage()}>
                            <Text style={styles.text}>Chọn ảnh từ thiết bị</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={handleCameraLaunch}>
                            <Text style={styles.text}>Chụp ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option, styles.border]} onPress={() => deleteAvatar}>
                            <Text style={styles.text}>Xóa ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => setModalVisible(false)}>
                            <Text style={styles.text}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {loading&&<OverlayLoading/>}
            </Modal>
        </>
    );
};
const styles = StyleSheet.create({
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: 'red',
    },
    option: {
        width: "70%",
        padding: 10,
        alignItems: "center"
    },
    border: {
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: 'gray',
    },
    text: {
        fontSize: 16,
        color: 'blue',
    }
})
