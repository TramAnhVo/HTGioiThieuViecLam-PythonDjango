import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default SeeCV = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text style={styles.TextHead}>Quản lý hồ sơ ứng tuyển</Text>

            <View style={styles.HeaderCV}>
                <View style={styles.TextCv}>
                    <Text style={styles.TextContent} >Nguyễn Văn An</Text>
                    <Text style={styles.TextContent} >Vị trí ứng tuyển: lập trình viên Java</Text>
                    <Text style={styles.TextContent} >File cv:nguyenvana.pdf</Text>
                </View>

                <View style={styles.ButtonCV}>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <AntDesign name="checkcircle" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="closecircle" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.HeaderCV}>
                <View style={styles.TextCv}>
                    <Text style={styles.TextContent} >Nguyễn Văn An</Text>
                    <Text style={styles.TextContent} >Vị trí ứng tuyển: lập trình viên Java</Text>
                    <Text style={styles.TextContent} >File cv:nguyenvana.pdf</Text>
                </View>

                <View style={styles.ButtonCV}>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <AntDesign name="checkcircle" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="closecircle" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.HeaderCV}>
                <View style={styles.TextCv}>
                    <Text style={styles.TextContent} >Nguyễn Văn An</Text>
                    <Text style={styles.TextContent} >Vị trí ứng tuyển: lập trình viên Java</Text>
                    <Text style={styles.TextContent} >File cv:nguyenvana.pdf</Text>
                </View>

                <View style={styles.ButtonCV}>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <AntDesign name="checkcircle" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="closecircle" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.HeaderCV}>
                <View style={styles.TextCv}>
                    <Text style={styles.TextContent} >Nguyễn Văn An</Text>
                    <Text style={styles.TextContent} >Vị trí ứng tuyển: lập trình viên Java</Text>
                    <Text style={styles.TextContent} >File cv:nguyenvana.pdf</Text>
                </View>

                <View style={styles.ButtonCV}>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <AntDesign name="checkcircle" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="closecircle" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.HeaderCV}>
                <View style={styles.TextCv}>
                    <Text style={styles.TextContent} >Nguyễn Văn An</Text>
                    <Text style={styles.TextContent} >Vị trí ứng tuyển: lập trình viên Java</Text>
                    <Text style={styles.TextContent} >File cv:nguyenvana.pdf</Text>
                </View>

                <View style={styles.ButtonCV}>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <AntDesign name="checkcircle" size={30} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="closecircle" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    HeaderCV: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 13,
        borderRadius: 15,
        borderColor: 'green',
        borderWidth: 1,
        margin: 10,
    },

    TextHead: {
        fontWeight: "700",
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
    },

    TextCv: {
        width: '80%',
    },

    TextContent: {
        fontWeight: "700",
        fontSize: 16,
    },

    ButtonCV: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '20%',
    }
})