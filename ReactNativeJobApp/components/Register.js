import { Dimensions, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import Entypo from "react-native-vector-icons/Entypo"
import { useState } from "react"

const heightWindow = Dimensions.get("window").height;

export default Register = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const showPass = () => setShowPassword(!showPassword);
    const showPassConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const resgister = () => {

    }
    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                {/* header */}
                <View style={styles.header}>
                        <Text style={{ fontSize: 28, fontWeight: '700', color: '#008000' }}>ĐĂNG KÝ TÀI KHOẢN</Text>
                    </View>

                {/* Tên, Email, Mật khẩu, Nhập lại mật khẩu */}
                <View style={styles.form}>
                    

                    <View style={styles.input}>
                        <MaterialCommunityIcons style={{ paddingLeft: 24 }} name='account' color="black" size={30} />
                        <TextInput placeholder="Họ và tên" style={styles.textInput}
                            autoCapitalize="none" />
                    </View>
                    <View style={{ ...styles.input, marginTop: 0.015 * heightWindow }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='email' color="black" size={30} />
                        <TextInput placeholder="Email" style={styles.textInput}
                            autoCapitalize="none" />
                    </View>
                    <View style={{ ...styles.input, marginTop: 0.015 * heightWindow }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='locked' color="black" size={30} />
                        <TextInput placeholder="Nhập mật khẩu" style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={showPassword ? false : true} />
                        <Entypo onPress={() => showPass()}
                            style={{ position: 'absolute', right: 8 }} name={showPassword ? 'eye' : 'eye-with-line'} color="black" size={30} />
                    </View>
                    <View style={{ ...styles.input, marginTop: 0.015 * heightWindow }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='locked' color="black" size={30} />
                        <TextInput placeholder="Nhập lại mật khẩu" style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={showPasswordConfirm ? false : true} />
                        <Entypo onPress={() => showPassConfirm()}
                            style={{ position: 'absolute', right: 8 }} name={showPasswordConfirm ? 'eye' : 'eye-with-line'} color="black" size={30} />
                    </View>
                </View>
                {/* Dang nhap && Dang ky */}
                <View style={styles.button}>
                    <TouchableOpacity onPress={resgister}
                        style={{ borderRadius: 100, flexDirection: 'row', width: '80%', height: '30%', borderColor: 'white', borderWidth: 1, backgroundColor: '#00b14f', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16 }}>
                            Bạn chưa có tài khoản?{'\u00A0'}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontSize: 16, color: '#00b14f' }}>
                                Đăng nhập ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 0.02 * heightWindow, width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#333' }} />
                    </View>
                    <Text style={{ fontSize: 16 }}>
                        Trải nghiệm ngay
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '7%',
        alignItems: 'center',
        marginTop: 0.18 * heightWindow
    },
    form: {
        width: '100%',
        alignItems: 'center',
        marginTop: 0.03 * heightWindow,
    },
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius: 100,
        padding: 12,
        width: '80%',
        height: '30px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        color: 'black',
        width: '75%',
        height: '100%'
    },
    button: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});