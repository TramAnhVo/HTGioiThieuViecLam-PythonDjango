import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import API, { endpoints } from "../configs/API";
import RenderHTML from "react-native-render-html";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default CompanyDetail = ({ route }) => {
    const [companies, setCompanies] = useState(null)
    const [jobs, setJobs] = useState(null)
    const { companyId } = route.params;
    const Tab = createMaterialTopTabNavigator();

    useEffect(() => {
        const loadCompanyDetail = async () => {
            try {
                let res = await API.get(endpoints['company-details'](companyId));
                setCompanies(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        const LoadJob = async () => {
            try {
                let res = await API.get(endpoints['job-company'](companyId));
                setJobs(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadCompanyDetail();
        LoadJob();
    }, [companyId]);

    const ThemBinhLuan = async () => {
        try {
            let token = await AsyncStorage.getItem('access-token');
            let res = await authApi(token).post(endpoints['add-comment'](lessonId), {
                'content': content
            })
            setComments(current => [res.data, ...current]);
        } catch (ex) {
            console.error(ex);
        }
    }

    function Infomation() {
        return (
            <ScrollView >
                <View style={{ marginTop: 10, marginLeft: 15 }}>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Giới thiệu công ty</Text>
                    <RenderHTML source={{ html: companies.description }} style={{ fontSize: 16 }} />
                </View>

                <View style={{ marginTop: 10, marginLeft: 15 }}>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Địa chỉ công ty</Text>
                    <Text>{companies.address}</Text>
                </View>

                <View style={{ marginTop: 10, marginLeft: 15, marginBottom: 20 }}>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Email</Text>
                    <Text>{companies.email}</Text>
                </View>
            </ScrollView>
        );
    };

    function TinTuyenDung() {
        return (
            <ScrollView style={{ margin: 10 }}>
                {jobs === null ? <ActivityIndicator /> : <>
                    {jobs.map(c => (
                        <TouchableOpacity>
                            <View style={styles.ItemJob}>
                                <View style={{ width: '20%' }} >
                                    <Image source={require('../components/image/job.png')} style={styles.avatar} />
                                </View>
                                <View style={{ width: '73%' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{c.title}</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '400', textAlign: 'left' }}>{c.company.name}</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 4 }}>
                                        <Text style={styles.TextTag}>{c.salary}</Text>
                                        <Text style={styles.TextTag}>{c.location.name}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </>}
            </ScrollView>
        );
    };

    function Binhluan() {
        return (
            <ScrollView>
                {user === null ? "" : <>
                    <View style={[MyStyles.row, { alignItems: "center", justifyContent: "center" }]}>
                        <TextInput value={content} onChangeText={t => setContent(t)} style={Styles.comment} placeholder="Nội dung bình luận" />
                        <TouchableOpacity onPress={addComment}>
                            <Text style={Styles.button}>Bình luận</Text>
                        </TouchableOpacity>
                    </View>
                </>}

                {comments === null ? <ActivityIndicator /> : <>
                    {comments.map(c => <View style={MyStyles.row} key={c.id}>
                        <Image source={{ uri: c.user.image }} style={[MyStyles.m_10, Styles.thumb]} />
                        <View>
                            <Text style={MyStyles.m_10}>{c.content}</Text>
                            <Text style={MyStyles.m_10}>{moment(c.created_date).fromNow()}</Text>
                        </View>
                    </View>)}
                </>}
            </ScrollView>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {companies === null ? <ActivityIndicator /> : <>
                <View style={{ flex: 0.14, backgroundColor: 'lightblue', position: 'relative' }}></View>
                <View style={styles.UserBar}></View>

                <View style={{ flex: 0.86 }}>
                    <Text style={{ textAlign: 'center', fontWeight: "700", fontSize: 22, marginTop: '16%' }}>{companies.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesome name="building" size={24} color="green" style={{ paddingRight: 10 }} />
                        <Text style={{ textAlign: 'center', fontSize: 16 }} >{companies.link}</Text>
                    </View>

                    <TouchableOpacity style={{ backgroundColor: 'green', marginTop: 20, borderRadius: 8, width: '90%', marginLeft: '5%', marginBottom: 10 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, padding: 8 }}>+ Theo dõi công ty</Text>
                    </TouchableOpacity>

                    <Tab.Navigator>
                        <Tab.Screen name="Info" component={Infomation} options={{ title: 'Thông tin doanh nghiệp' }} />
                        <Tab.Screen name="Tin" component={TinTuyenDung} options={{ title: 'Tin tuyển dụng' }} />
                        <Tab.Screen name="Comment" component={TinTuyenDung} options={{ title: 'Bình luận' }} />
                    </Tab.Navigator>
                </View>
            </>}
        </View>
    );
}

const styles = StyleSheet.create({
    UserBar: {
        top: 32,
        left: 130,
        right: 100,
        width: '35%',
        height: '17%',
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        zIndex: 99,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    // bai dang cong viec
    ItemJob: {
        borderRadius: 10,
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: '#008000',
        backgroundColor: 'white',
        padding: 4
    },

    TextTag: {
        width: '45%',
        fontSize: 13,
        textAlign: 'center',
        padding: 4,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 2,
    },

    // anh dai dien
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 10
    },
})