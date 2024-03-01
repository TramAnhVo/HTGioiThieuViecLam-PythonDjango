import React, { useReducer } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Home from "./components/Home";
import Login from "./components/Login";
import DangBaiTuyenDung from "./components/DangBaiTuyenDung";
import SeeCV from "./components/SeeCV";
import Register from "./components/Register";
import JobDetails from "./components/JobDetail";
import QLBD from "./components/QLBD";
import TTDN from "./components/TTDN";
import CompanyDetail from "./components/CompanyDetail";
import Account from "./components/Account";
import AllJob from "./components/AllJob";
import Company from "./components/Company";
import MyContext from "./configs/MyContext";
import MyUserReducer from "./reducers/MyUserReducer";
import Apply from "./components/Apply";
import FormCompany from "./components/FormCompany";
import { JobCompany } from "./components/Job_Company";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeJob() {
    return (
        <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Account') {
                    iconName = 'person';
                } else if (route.name === 'Jobs') {
                    iconName = 'clipboard';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'black',
            headerShown: false,
        })}>
            <Tab.Screen name="Home" component={Home} options={{ title: 'Trang chủ' }} />

            <Tab.Screen name="Jobs" component={AllJob} options={{ title: 'Công việc' }} />

            <Tab.Screen name="Account" component={Account} options={{ title: 'Tài khoản' }} />
        </Tab.Navigator>
    );
}
function HomeCompany() {
    return (
        <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'JobCompany') {
                    iconName = 'home';
                } else if (route.name === 'Account') {
                    iconName = 'person';
                } else if (route.name === 'Jobs') {
                    iconName = 'clipboard';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'black',
            headerShown: false,
        })}>

            <Tab.Screen name="JobCompany" component={JobCompany} options={{ title: 'Trang chủ' }} />

            <Tab.Screen name="Account" component={Account} options={{ title: 'Tài khoản' }} />
        </Tab.Navigator>
    );
}

export default MainComponent = function () {
    const [user, dispatch] = useReducer(MyUserReducer, null);
    return (
        <MyContext.Provider value={[user, dispatch]}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" options={{ headerShown: false }}>
                    <Stack.Screen name="HomeCompany" component={HomeCompany} options={{ headerShown: false }} />
                    <Stack.Screen name="HomeJob" component={HomeJob} options={{ headerShown: false }}/>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    {/* quan ly ho so ung tuyen */}
                    <Stack.Screen name="SeeCV" component={SeeCV} options={{ headerShown: true, title: 'Quản lý hồ sơ ứng tuyển' }} />
                    {/* dang ky tai khoan */}
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    {/* quan ly bai dang tuyen cua doanh nghiep */}
                    <Stack.Screen name="QLBD" component={QLBD} options={{ headerShown: true, title: 'Quản lý bài đăng tin tuyển dụng'}} />
                    {/* thong tin doanh nghiep */}
                    <Stack.Screen name="TTDN" component={TTDN} options={{headerShown: true, title: 'Thông tin chi tiết doanh nghiệp' }} />
                    {/* dang tin tuyen dung */}
                    <Stack.Screen name="DTTD" component={DangBaiTuyenDung} options={{ headerShown: false, title: 'Đăng tin tuyển dụng' }} />
                    {/* chi tiet cong viec */}
                    <Stack.Screen name="CTCV" component={JobDetails} options={{ headerShown: true, title: 'Thông tin chi tiết tuyển dụng' }} />
                    {/* chi tiet cong ty */}
                    <Stack.Screen name="CTDN" component={CompanyDetail} options={{ headerShown: true, title: 'Chi tiết doanh nghiệp' }} />
                    {/* trang cac cong ty */}
                    <Stack.Screen name="CT" component={Company} options={{ headerShown: false }} />
                    {/* gửi CV */}
                    <Stack.Screen name="Apply" component={Apply} options={{ headerShown: false}} />
                    {/* đăng ký công ty */}
                    <Stack.Screen name="FormCompany" component={FormCompany} options={{ headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </MyContext.Provider>

    );
}