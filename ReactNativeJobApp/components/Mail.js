import * as MailComposer from 'expo-mail-composer';
import { useState } from 'react';
import { Button, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const heightWindow = Dimensions.get("window").height;
export const Mail = ({ toggleMail, isModalMail, email }) => {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const sendEmail = async () => {
        try {
            const isAvailable = await MailComposer.isAvailableAsync();
            if (!isAvailable) {
                alert('Gửi email không khả dụng trên thiết bị của bạn');
                return;
            }

            await MailComposer.composeAsync({
                recipients: [email],
                subject: title,
                body: message,
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };
    return (
        <Modal visible={isModalMail} animationType="slide">
            <View style={styles.modalContent}>
                <TextInput onChangeText={(text) => setTitle(text)}
                    value={title}
                    placeholder="Tiêu đề" style={styles.title}
                    autoCapitalize="characters" />
                <TextInput
                    placeholder="Nhập nội dung tin nhắn"
                    onChangeText={text => setMessage(text)}
                    value={message}
                    multiline
                    style={styles.input}
                />
                <TouchableOpacity onPress={sendEmail}
                    style={{ marginTop: 0.08 * heightWindow, borderRadius: 100, flexDirection: 'row', width: '80%', height: '5%', borderColor: 'white', borderWidth: 1, backgroundColor: '#00b14f', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Gửi Email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMail}
                    style={{ marginTop: 0.04 * heightWindow, borderRadius: 100, flexDirection: 'row', width: '80%', height: '5%', borderColor: 'white', borderWidth: 1, backgroundColor: '#00b14f', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Đóng</Text>
                </TouchableOpacity>

            </View>
        </Modal >
    )

}
const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        alignItems: 'center',
        marginTop: 22,
    },
    input: {
        marginTop: 40,
        height: 160,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
        padding: 10,
    },
    title: {
        marginTop: 20,
        paddingLeft: 12,
        borderRadius: 20,
        color: 'black',
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginBottom: 8
    },
    submit: {
        flexDirection: 'row'
    }
});
