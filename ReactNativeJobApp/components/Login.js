import { ActivityIndicator, Alert, Dimensions, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'
import { useContext, useState } from "react"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import API, { authApi, endpoints } from "../configs/API"
import { CLIENT_ID, CLIENT_SECRET } from "../utils/key"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MyContext from "../configs/MyContext"

export default Login = ({ navigation }) => {
    const heightWindow = Dimensions.get("window").height;
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const showPass = () => setShowPassword(!showPassword);
    const [user, dispatch] = useContext(MyContext);
    const login = async () => {
        setLoading(true);
        try {
            const { data } = await API.post(endpoints['login'], {
                "username": username,
                "password": password,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "grant_type": "password"
            });
            await AsyncStorage.setItem("access-token", data.access_token);
            let user = await authApi(data.access_token).get(endpoints['current-user']);
            if (user.data.state === false && user.data.role === 'NTD') {
                Alert.alert(
                    'Chú ý',
                    'Tài khoản của bạn chưa được kích hoạt',
                    [{ text: 'OK', onPress: () => console.log('OK pressed') }],
                    { cancelable: false }
                );
                return;
            }
            dispatch({
                type: "login",
                payload: user.data
            });
            setPassword(null)
            if (user.data.role==="NTD"){
                navigation.navigate("HomeCompany");
            }else navigation.navigate("HomeJob");
        } catch (error) {
            Alert.alert(
                'Lỗi',
                'Thông tin tài khoản không đúng',
                [{ text: 'OK', onPress: () => console.log('OK pressed') }],
                { cancelable: false }
            );
        }
        finally {
            setLoading(false);
        }
    }
    return (
        /*<ImageBackground style={{width: '100%', height: '100%'}} source={require['../']}>*/
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                {/* header */}
                <View style={{ width: '100%', height: '8%', alignItems: 'center', marginTop: 0.18 * heightWindow }}>
                    <Text style={{ fontSize: 28, fontWeight: '700', color: '#008000' }}>Đăng nhập</Text>
                </View>

                {/* Email && Password */}
                <View style={{ width: '100%', alignItems: 'center', marginTop: 0.01 * heightWindow, marginBottom: 0.015 * heightWindow }}>
                    <View style={{ backgroundColor: "#F0F0F0", borderRadius: 100, padding: 12, width: '80%', height: '30px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='email' color="black" size={30} />
                        <TextInput onChangeText={(text) => setUsername(text)}
                            placeholder="Ten nguoi dung" style={{ color: 'black', width: '75%', height: '100%' }}
                            autoCapitalize="none" />
                    </View>
                    <View style={{ backgroundColor: "#F0F0F0", marginTop: 0.015 * heightWindow, borderRadius: 100, padding: 12, width: '80%', height: '30px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='locked' color="black" size={30} />
                        <TextInput onChangeText={(text) => setPassword(text)}
                            placeholder="Nhập mật khẩu" style={{ color: 'black', width: '75%', height: '100%' }}
                            autoCapitalize="none"
                            secureTextEntry={showPassword ? false : true} />
                        <Entypo onPress={() => showPass()}
                            style={{ position: 'absolute', right: 8 }} name={showPassword ? 'eye' : 'eye-with-line'} color="black" size={30} />
                    </View>

                </View>

                {/* Quen mat khau */}
                <View style={{ width: '90%', alignItems: 'flex-end', }}>
                    <Text style={{ fontSize: 14, fontWeight: 600, color: '#00b14f' }} >Quên mật khẩu?</Text>
                </View>

                {/* Dang nhap */}
                <View style={{ height: '20%', width: '100%', marginTop: 0.00008 * heightWindow, alignItems: 'center', justifyContent: 'center' }}>
                    {loading === true ? <ActivityIndicator /> : <>
                        <TouchableOpacity onPress={login}
                            style={{ marginBottom: 0.04 * heightWindow, borderRadius: 100, flexDirection: 'row', width: '80%', height: '30%', borderColor: 'white', borderWidth: 1, backgroundColor: '#00b14f', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>
                    </>}
                    <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#333' }} />
                        <Text style={{ marginHorizontal: 10, color: '#333', fontSize: 16, }}>Hoặc đăng nhập bằng</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#333' }} />
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 20 }}>
                        <View style={styles.circle}>
                            <MaterialIcons
                                name="facebook"
                                color="blue"
                                size={45}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View style={styles.circle}>
                            <Fontisto
                                name="google"
                                color="blue"
                                size={35}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 0.02 * heightWindow, marginBottom: 0.02 * heightWindow, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16 }}>
                            Bạn chưa có tài khoản?{'\u00A0'}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ fontSize: 16, color: '#00b14f' }}>
                                Đăng ký ngay
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
        /*   </ImageBackground>*/

    )
}
const styles = StyleSheet.create({
    circle: {
        width: 50, // Đường kính của vùng tròn
        height: 50, // Đường kính của vùng tròn
        borderRadius: 25, // Bán kính của vùng tròn (1/2 của width và height)
        backgroundColor: '#fff', // Màu nền của vùng tròn
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey'
    }

});