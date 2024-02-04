import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from "../configs/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

export default Avatar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
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
                    await uploadFirebase(result.assets[0].uri,'takePhoto')
                }
            } catch (error) {
                console.log("error",error);
            }
            setModalVisible(false)
        } else {
            Alert.alert("you need to give up permission to work")
        }
    }
    const uploadFirebase = async (uri, name) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${Date.now()}_${name}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle progress updates
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error("Error uploading file:", error);
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('Download URL:', downloadURL);
                    setImgUrl(downloadURL);
                    setModalVisible(false);
                });
            }
        );
    }
    const uploadImage = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*",
                multipleL: false
            });
            if (!result.canceled) {
                const { uri, name } = result.assets[0];
                Promise.all([uploadFirebase(uri, name), promise2])
                    .then(() => {
                        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
                    })
                    .catch((error) => {
                        console.log("err", error);
                    });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
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
                        <TouchableOpacity style={[styles.option, styles.border]} onPress={() => console.log('Chụp ảnh')}>
                            <Text style={styles.text}>Xóa ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => setModalVisible(false)}>
                            <Text style={styles.text}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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