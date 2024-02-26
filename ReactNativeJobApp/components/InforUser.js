import { Dimensions, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Logout from "./Logout";

const heightWindow = Dimensions.get("window").height;
export default InforUser = ({ user,navigation }) => {
    const updateMajor = () => {
        console.log('exp');
    }
    const updateJob = () => {
        console.log('job');
    }
    const updateAddress = () => {
        console.log('address');
    }

    //sjdshj
    return (
        // <ScrollView>
        //     <View style={styles.screen}>
        <>
                <View style={styles.formInfor}>
                    <View style={styles.experience}>
                        <View style={styles.title}>
                            <Text style={{ fontWeight: 'bold' }}>Chuyên ngành</Text>
                            <TouchableOpacity onPress={() => updateMajor()}>
                                <Text style={{ color: '#00b14f' }}> Sửa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.item}>{user.major?user.major:"Bạn chưa cập nhật"}</Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', height: 1, backgroundColor: '#333' }} />
                    <View style={styles.experience}>
                        <View style={styles.title}>
                            <Text style={{ fontWeight: 'bold' }}>Mức lương mong muốn</Text>
                            <TouchableOpacity onPress={() => updateJob()}>
                                <Text style={{ color: '#00b14f' }}> Sửa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.item}>{user.location?user.location:"Bạn chưa cập nhật"}</Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', height: 1, backgroundColor: '#333' }} />
                    <View style={styles.experience}>
                        <View style={styles.title}>
                            <Text style={{ fontWeight: 'bold' }}>Địa điểm làm việc mong muốn</Text>
                            <TouchableOpacity onPress={() => updateAddress()}>
                                <Text style={{ color: '#00b14f' }}> Sửa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.item}>ashffefsdgdfgdfgdfgdfgsdh</Text>
                            <Text style={styles.item}>ashadfsefsdfsdfádasdfsdh</Text>
                        </View>
                    </View>
                </View>
                <Logout navigation={navigation}/>
                </>
        // {/* //     </View> */}
        // {/* // </ScrollView> */}
    );
}
const styles = StyleSheet.create({
    screen: {
        alignItems: "center",
        overflow: "scroll"
    },
    header: {
        width: '100%',
        height: 0.16 * heightWindow,
        backgroundColor: '#00b14f'
    },
    formAvatar: {
        width: '90%',
        top: 0.08 * heightWindow,
        height: 0.16 * heightWindow,
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 2,
        color: '#333',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: 'lightgray',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 16,
        left: 96
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    formInfor: {
        width: '100%',
        alignItems: 'center',
    },
    experience: {
        width: '90%'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    item: {
        margin: 8,
        padding: 6,
        backgroundColor: '#dadce0',
        fontSize: 16,
        color: '#333'
    },
    uploadCV: {
        width: "90%",
        textAlign: "center",
        justifyContent: "center"
    },
    footer: {
        width: '100%',
        backgroundColor: '#666',
        height: 0.15 * heightWindow,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLogOut: {
        flexDirection: 'row',
        height: '40%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8
    }
});