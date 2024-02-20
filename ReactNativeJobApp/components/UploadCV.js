import React from "react"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../configs/storage";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import AntDesign from "react-native-vector-icons/AntDesign"

const heightWindow = Dimensions.get("window").height;
export default UploadCV = ({setUrlCV}) => {
    const [file, setFile] = React.useState(null)
    const pickDocument = async () => {
        // const result = await DocumentPicker.getDocumentAsync({
        //     type: "application/pdf",
        //     multipleL: false
        // });
        const result = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            multipleL: false
        });
        if (!result.canceled) {
            setFile(result.assets[0]);
            setUrlCV(result.assets[0].uri);
        }
    }
    return (
        <>
            <TouchableOpacity style={styles.form} onPress={pickDocument}>
                <View style={styles.pickFile}></View>
                <AntDesign color="#cccccc" name="addfile" size={64} />
                <Text style={styles.title}>{file ? file.name : "Chọn CV từ thư viện của bạn"}</Text>
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    form: {
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        height: heightWindow * 0.2,
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "dashed",
        backgroundColor: "#FCFEFD",
        borderColor: "#00b14f",
    },
    pickFile: {

    },
    icon: {

    },
    title: {
        color: "#CCCCCC",
        marginTop: 20,
        fontSize: 20
    },
    
})
