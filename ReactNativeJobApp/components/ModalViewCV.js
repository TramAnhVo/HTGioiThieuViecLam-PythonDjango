import { useState } from "react";
import { Button, Modal, View } from "react-native";
import WebView from "react-native-webview";

export const ModalViewCV = ({isModalVisible, link_cv, toggleModal }) => {
    return (
        <Modal visible={isModalVisible}>
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: link_cv }}
                    style={{ flex: 1 }}
                    scalesPageToFit={true}
                    originWhitelist={['*']}
                />
                <Button title="Close" onPress={toggleModal} />
            </View>
        </Modal>
    )
}