import { Dimensions, SafeAreaView, StyleSheet, TextInput, ToastAndroid, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import Entypo from "react-native-vector-icons/Entypo"
import { useState } from "react"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import API, { endpoints } from "../configs/API"
import { MyCheckBox } from "./CheckBox"


const heightWindow = Dimensions.get("window").height;

export default Register = ({ navigation }) => {
    const [err, setErr] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const showPass = () => setShowPassword(!showPassword);
    const showPassConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [stateConfirm, setStateConfirm] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isCompany, setCompany] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });
    const isEmpty = (formData) => {
        setIsValidEmail(false);
        setIsValidPassword(false);
        setIsValidUsername(false);
        setStateConfirm(false);
        let status = false;
        if (formData.email === '') {
            setIsValidEmail(true);
            status = true;
        }
        if (formData.username === '') {
            setIsValidUsername(true);
            status = true;
        }
        if (formData.password === '') {
            setIsValidPassword(true);
            status = true;
        }
        return status;
    }
    const register = async () => {
        if (isEmpty(formData)) return;
        if (formData.password != passwordConfirm) {
            return setStateConfirm(true);
        }
        try {
            if (formData.username) {
                if (isChecked) {
                    const updatedFormData = { ...formData };
                    updatedFormData.role = 'NTD';
                    navigation.navigate("FormCompany", { data: updatedFormData });
                    return;
                }
                await API.post(endpoints[`register`], formData, {
                    headers: {
                        'Content-Type': 'application/json', 'charset': 'utf-8'
                    }
                });
                navigation.navigate('Login');
                ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
            }
        } catch (error) {
            // setErr(true);
            console.log("err", error);
        }
    }
    const handleChangeInfo = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };
    return (
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={{ fontSize: 24 }}>Đăng Ký</Text>
                </View>
                {/* Tên, Email, Mật khẩu, Nhập lại mật khẩu */}
                <View style={styles.form}>
                    {isValidUsername ?
                        <View style={styles.messageErr}>
                            <MaterialIcons name="error-outline" size={12} color="red" />
                            <Text style={styles.err}>Cho chúng tôi biết tên của Bạn</Text>
                        </View> : err ?
                            <View style={styles.messageErr}>
                                <MaterialIcons name="error-outline" size={12} color="red" />
                                <Text style={styles.err}>Tên người dùng không hợp lệ</Text>
                            </View>
                            : <></>
                    }
                    <View style={{ ...styles.input, borderWidth: isValidUsername ? 1 : 0 }}>
                        <MaterialCommunityIcons style={{ paddingLeft: 24 }} name='account' color="black" size={30} />
                        <TextInput placeholder="Ten nguoi dung" style={styles.textInput}
                            onChangeText={(text) => handleChangeInfo('username', text)}
                            value={formData.username}
                            autoCapitalize="none" />
                    </View>
                    {isValidEmail &&
                        <View style={styles.messageErr}>
                            <MaterialIcons name="error-outline" size={12} color="red" />
                            <Text style={styles.err}>Cho chúng tôi biết eamil của bạn</Text>
                        </View>
                    }
                    <View style={{ ...styles.input, borderWidth: isValidEmail ? 1 : 0,marginTop: 0.01 * heightWindow }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='email' color="black" size={30} />
                        <TextInput
                            placeholder="Email" style={styles.textInput}
                            onChangeText={(text) => handleChangeInfo('email', text)}
                            value={formData.email}
                            keyboardType="email-address"
                            autoCapitalize="none" />
                    </View>
                    {isValidPassword &&
                        <View style={styles.messageErr}>
                            <MaterialIcons name="error-outline" size={12} color="red" />
                            <Text style={styles.err}>Nhập mật khẩu của bạn</Text>
                        </View>
                    }
                    <View style={{ ...styles.input, borderWidth: isValidPassword ? 1 : 0,marginTop: 0.01 * heightWindow }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='locked' color="black" size={30} />
                        <TextInput placeholder="Nhập mật khẩu" style={styles.textInput}
                            onChangeText={(text) => handleChangeInfo('password', text)}
                            value={formData.password}
                            autoCapitalize="none"
                            secureTextEntry={showPassword ? false : true} />
                        <Entypo onPress={() => showPass()}
                            style={{ position: 'absolute', right: 8 }} name={showPassword ? 'eye-with-line' : 'eye'} color="black" size={30} />
                    </View>
                    {stateConfirm &&
                        <View style={styles.messageErr}>
                            <MaterialIcons name="error-outline" size={12} color="red" />
                            <Text style={styles.err}>Mẩu khẩu của bạn không trùng khớp</Text>
                        </View>
                    }
                    <View style={{ ...styles.input, borderWidth: stateConfirm ? 1 : 0,marginTop: 0.01 * heightWindow }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='locked' color="black" size={30} />
                        <TextInput placeholder="Nhập lại mật khẩu" style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => setPasswordConfirm(text)}
                            secureTextEntry={showPasswordConfirm ? false : true} />
                        <Entypo onPress={() => showPassConfirm()}
                            style={{ position: 'absolute', right: 8 }} name={showPasswordConfirm ? 'eye-with-line' : 'eye'} color="black" size={30} />
                    </View>
                    
                    <View style={styles.checkBox}>
                        <MyCheckBox isChecked={isChecked} setChecked={setChecked} />
                    </View>
                </View>
                {/* Dang nhap && Dang ky */}
                <View style={styles.button}>
                    <TouchableOpacity onPress={register}
                        style={{ borderRadius: 100, flexDirection: 'row', width: '80%', height: '30%', borderColor: 'white', borderWidth: 1, backgroundColor: '#00b14f', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14 }}>
                            Bạn chưa có tài khoản?{'\u00A0'}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontSize: 14, color: '#00b14f' }}>
                                Đăng nhập ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 0.02 * heightWindow, width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#333' }} />
                    </View>
                    <Text style={{ fontSize: 14 }}>
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
        height: '5%',
        alignItems: 'center',
        marginTop: 0.2 * heightWindow
    },
    form: {
        width: '100%',
        alignItems: 'center',
        marginTop: 0.05 * heightWindow,
    },
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius: 100,
        padding: 12,
        width: '80%',
        height: '30px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'red'
    },
    textInput: {
        color: 'black',
        width: '75%',
        height: '100%',

    },
    button: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageErr: {
        padding: 8,
        alignItems: "center",
        flexDirection: 'row',
        width: '75%',
        justifyContent: "flex-start"
    },
    err: {
        color: '#FF0000',
        fontSize: 12
    },
    checkBox: {
        marginTop: 12,
        marginLeft: 8,
        width: "80%",
    }
});