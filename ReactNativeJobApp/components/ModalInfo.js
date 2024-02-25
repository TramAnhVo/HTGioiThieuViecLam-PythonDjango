import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';

// Assume you have a list of majors
const majors = ['Major 1', 'Major 2', 'Major 3', 'Major 4'];

const ModalInfo = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState(null);

    const updateMajor = () => {
        setIsModalVisible(true);
    };

    const handleMajorSelection = (major) => {
        setSelectedMajor(major);
        setIsModalVisible(false);
        // Thực hiện các công việc cập nhật major ở đây
    };

    return (
        <View>
            <View style={styles.title}>
                <Text style={{ fontWeight: 'bold' }}>Chuyên ngành</Text>
                <TouchableOpacity onPress={updateMajor}>
                    <Text style={{ color: '#00b14f' }}> Sửa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.item}>{selectedMajor ? selectedMajor : "Bạn chưa cập nhật"}</Text>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <FlatList
                            data={majors}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleMajorSelection(item)}>
                                    <Text style={{ paddingVertical: 10 }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
