import { Dimensions, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'
import { useContext, useState } from "react"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MyContext from "../configs/MyContext"
import API, { authApi, endpoints } from "../configs/API"

export default Login = ({ navigation }) => {
    const heightWindow = Dimensions.get("window").height;
    const [showPassword, setShowPassword] = useState(false);
    const showPass = () => setShowPassword(!showPassword);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);

    // const login = async () => {
    //     setLoading(true);

    //     try {
    //         let res = await API.post(endpoints['login'], {
    //             "username": username, 
    //             "password": password,
    //             "client_id": "8jPfzJd1E1BU5g4yTvn7n1PSeAwLnBNncbjg8MjM",
    //             "client_secret": "vetZ2WCUkwGHCuIM3ZumGhyenuSbWsyerBqoI9i4rC3zZxGqfcuz7dG65DIdAQz2e7sGbJbKRgODWiea1zGUh68WfyzGMMCgcqR2k7Xof6k827vVdIGFF1vbjnNA7AHm",
    //             "grant_type": "password"
    //         });

    //         console.log(res.data)
    //         await AsyncStorage.setItem("access-token", res.data.access_token)
    //         let user = await authApi(res.data.access_token).get(endpoints['current-user']);

    //         dispatch({
    //             "type": "login",
    //             "payload": user.data
    //         });

    //         navigation.navigate('HomeJob');
    //     } catch (ex) {
    //         console.error(ex);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        /*<ImageBackground style={{width: '100%', height: '100%'}} source={require['../']}>*/
        <SafeAreaView>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                {/* header */}
                <View style={{ width: '100%', height: '8%', alignItems: 'center', marginTop: 0.18 * heightWindow }}>
                    <Text style={{ fontSize: 28, fontWeight: '700', color: '#008000'  }}>Đăng nhập</Text>
                </View>

                {/* Email && Password */}
                <View style={{ width: '100%', alignItems: 'center', marginTop: 0.01 * heightWindow, marginBottom: 0.015 * heightWindow }}>
                    <View style={{ backgroundColor: "#F0F0F0", borderRadius: 100, padding: 12, width: '80%', height: '30px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='email' color="black" size={30} />
                        <TextInput placeholder="Nhập tên đăng nhập" style={{ color: 'black', width: '75%', height: '100%' }}
                            autoCapitalize="none" value={username} 
                            onChangeText={t => setUsername(t)}/>
                    </View>
                    <View style={{ backgroundColor: "#F0F0F0", marginTop: 0.015 * heightWindow, borderRadius: 100, padding: 12, width: '80%', height: '30px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Fontisto style={{ paddingLeft: 24 }} name='locked' color="black" size={30} />
                        <TextInput placeholder="Nhập mật khẩu" style={{ color: 'black', width: '75%', height: '100%' }}
                            autoCapitalize="none"
                            secureTextEntry={showPassword ? false : true}  
                            value={password}
                            onChangeText={t => setPassword(t)}/>
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
                    <TouchableOpacity onPress={login}
                        style={{ marginBottom: 0.04 * heightWindow, borderRadius: 100, flexDirection: 'row', width: '80%', height: '30%', borderColor: 'white', borderWidth: 1, backgroundColor: '#00b14f', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
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
    },

});