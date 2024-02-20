import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const OverlayLoading = () => {
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, // Lớp z-index cao để phủ lên các thành phần khác
    },
    container: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 20,
    },
});

export default OverlayLoading;
