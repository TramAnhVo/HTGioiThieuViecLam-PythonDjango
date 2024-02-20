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
import AllJobs from "./components/Job";
import Company from "./components/Company";
import MyContext from "./configs/MyContext";
import MyUserReducer from "./reducers/MyUserReducer";
import Logout from "./components/Logout";


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
            <Tab.Screen name="Jobs" component={AllJobs} options={{ title: 'Công việc' }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'Tài khoản' }} />
        </Tab.Navigator>
    );
}

export default MainComponent = function () {
    // const [user, dispatch] = useReducer(MyUserReducer, null);

    return (
        // <MyContext.Provider value={[user, dispatch]}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeJob" options={{ headerShown: false }}>
                    {/* {user === null ? <> */}
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    {/* </> : <> */}
                        {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
                        <Stack.Screen name="HomeJob" component={HomeJob} options={{ headerShown: false }} />
                        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
                    {/* </>} */}

                    <Stack.Screen name="SeeCV" component={SeeCV} options={{ headerShown: true, title: 'hồ sơ ứng tuyển' }} />
                    {/* quan ly bai dang tuyen cua doanh nghiep */}
                    <Stack.Screen name="QLBD" component={QLBD} options={{ headerShown: true, title: 'bài đăng tuyển' }} />
                    {/* thong tin doanh nghiep */}
                    <Stack.Screen name="TTDN" component={TTDN} options={{ headerShown: true, title: 'thông tin chi tiết' }} />
                    {/* dang tin tuyen dung */}
                    <Stack.Screen name="DTTD" component={DangBaiTuyenDung} options={{ headerShown: false }} />
                    {/* chi tiet cong viec */}
                    <Stack.Screen name="CTCV" component={JobDetails} options={{ headerShown: false }} />
                    {/* chi tiet cong ty */}
                    <Stack.Screen name="CTDN" component={CompanyDetail} options={{ headerShown: true, title: 'thông tin chi tiết' }} />
                    {/* trang cac cong ty */}
                    <Stack.Screen name="CT" component={Company} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        // </MyContext.Provider>
    );
}