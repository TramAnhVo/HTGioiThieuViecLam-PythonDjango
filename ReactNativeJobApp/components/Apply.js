import { useContext, useState } from "react"
import MyContext from "../configs/MyContext"
import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import UploadCV from "./UploadCV";
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import API, { endpoints } from "../configs/API";
import { storage } from "../configs/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import OverlayLoading from "./Loading";

const heightWindow = Dimensions.get("window").height;
export default Apply = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [urlCV, setUrlCV] = useState(null);
    const [user] = useContext(MyContext);
    const { jobId } = route.params;
    const uploadFirebase = async () => {
        return new Promise((resolve, reject) => {
            fetch(urlCV)
                .then((response) => response.blob())
                .then((blob) => {
                    const storageRef = ref(storage, `pdfs/${Date.now()}`);
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
    const handleGoBack = () => {
        navigation.goBack();
    };
    const alertErr = (mess) => {
        Alert.alert(
            'Error',
            mess,
            [{ text: 'OK', onPress: () => console.log('OK pressed') }],
            { cancelable: false }
        );
    }
    const handleApply = async () => {
        if (!urlCV) {
            alertErr('Bạn cần thêm Cv')
            return;
        }
        try {
            setLoading(true)
            const url = await uploadFirebase();
            console.log(url);
            const res = await API.post(endpoints[`cv`], {
                content: content,
                user: user.id,
                job: jobId,
                link_cv: url,
            })
            setLoading(false)
            navigation.navigate('Home');
            ToastAndroid.show('CV đã được gửi thành công', ToastAndroid.SHORT);
        } catch (error) {
            setLoading(false)
            alertErr('Lỗi hệ thống');
        }

    }
    return (
        <>
            <SafeAreaView style={styles.screen}>
                {loading && <OverlayLoading />}
                <View style={styles.form}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleGoBack}
                            style={[styles.circle, styles.left]}>
                            <MaterialIcons name="arrow-back" size={32} color="#212F3F" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.circle, styles.right]}>
                            <Entypo name="dots-three-horizontal" size={32} color="#212F3F" />
                        </TouchableOpacity>
                        <Text style={styles.titile}>Ứng tuyển</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.content}>CV ứng tuyển</Text>
                        <UploadCV setUrlCV={setUrlCV} />
                        <Text style={styles.content}>Thư giới thiệu</Text>
                        <TextInput
                            placeholder="Enter description..."
                            onChangeText={(text) => { setContent(text) }}
                            value={content}
                            multiline // Cho phép nhập nhiều dòng
                            numberOfLines={4} // Số dòng hiển thị mặc định
                            style={styles.input}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleApply}
                        >
                            <Text style={styles.text}> Upload CV </Text>
                            <AntDesign color="#00b14f" name="upload" size={16} />
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    form: {
        width: '90%',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    left: {
        top: heightWindow * 0.01,
        left: 0,
    },
    right: {
        top: heightWindow * 0.01,
        right: 0,
    },
    titile: {
        paddingTop: 8,
        fontSize: 24,
        fontWeight: "bold"
    },
    circle: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: "#fff",
        position: "absolute",
    },
    body: {
        marginTop: heightWindow * 0.04,
    },
    content: {
        fontSize: 16,
        margin: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
        minHeight: 100, // Chiều cao tối thiểu của text box
    },
    button: {
        marginTop: 4,
        width: "100%",
        backgroundColor: "#00b14f",
        padding: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    text: {
        fontSize: 18,
        color: "#fff"
    }
})