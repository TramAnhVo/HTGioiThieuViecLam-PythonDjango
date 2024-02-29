import * as MailComposer from 'expo-mail-composer';
import { useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';


export const Mail = ({ toggleMail, isModalMail }) => {
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
                recipients: ['ny264480@gmail.com'],
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
                <View style={styles.submit}>
                    <Button title="Gửi" onPress={sendEmail} />
                    <Button title="Đóng" onPress={toggleMail} />
                </View>
            </View>
        </Modal>
    )

}
const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    input: {
        borderRadius: 100,
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
        padding: 10,
    },
    title: {
        borderRadius: 20,
        color: 'black',
        width: '80%',
        height: 32,
        borderWidth: 1,
        marginBottom:8
    },
    submit:{
        flexDirection:'row'
    }
});
