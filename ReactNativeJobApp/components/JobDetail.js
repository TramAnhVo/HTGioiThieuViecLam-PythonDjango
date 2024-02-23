import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import API, { endpoints } from "../configs/API";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from 'react-native';


export default JobDetails = ({ route, navigation }) => {
    const windowWidth = useWindowDimensions().width;
    const { height } = Dimensions.get('window');
    const [jobs, setJobs] = useState(null)
    const [companies, setCompanies] = useState(null)
    const { jobId } = route.params;

    useEffect(() => {
        const loadJobDetail = async () => {
            try {
                let res = await API.get(endpoints['job-details'](jobId));
                setJobs(res.data)

                if (res.data.length > 0) {
                    let firstItem = res.data[0];
                    let com = await API.get(endpoints['company-details'](firstItem.id))
                    setCompanies(com.data)
                } else {
                    console.log("Mảng trống");
                }
                // console.log(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadJobDetail();
    }, [jobId]);

    const applyCV = () => {
        // console.log(jobId);
        navigation.navigate("Apply", { "jobId": jobId })
    }


    return (
        <View style={{ flex: 1 }}>
            {jobs === null ? <ActivityIndicator /> : <>

                {/* nen mau xanh dùng de thet ke */}
                <View style={{ flex: 0.3, position: 'relative' }}>
                    <Image source={require('../components/image/hinh.jpg')} />
                </View>
                <View style={styles.UserBar}>
                    <View style={{ width: '30' }}>
                        {/* hinh khuc nay giup tui nha */}
                        <Image  source={{uri: companies.image}} style={styles.avatar} />
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18 }} >{jobs.title}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 17 }} >{companies.name}</Text>
                    </View>
                </View>

                <ScrollView style={{ backgroundColor: 'white', flex: 0.4 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", marginLeft: 15, marginTop: '12%' }} >THÔNG TIN CHUNG</Text>
                    <View style={{ marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <AntDesign name="hourglass" size={30} color="green" />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 16 }}>Kinh nghiệm</Text>
                                <Text style={{ fontWeight: '600', fontSize: 16 }}>{jobs.experience}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Entypo name="location" size={30} color="green" />
                            <View style={{ fontSize: 16, marginLeft: 15 }}>
                                <Text style={{ fontSize: 16 }}>Địa điểm làm việc</Text>
                                <Text style={{ fontWeight: '600', fontSize: 16 }}>{jobs.location.name}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Entypo name="briefcase" size={30} color="#2E8B57" />
                            <View style={{ fontSize: 16, marginLeft: 15 }}>
                                <Text style={{ fontSize: 16 }}>Chuyên ngành</Text>
                                <Text style={{ fontWeight: '600', fontSize: 16 }}>{jobs.major.name}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <AntDesign name="contacts" size={30} color="#2E8B57" />
                            <View style={{ fontSize: 16, marginLeft: 15 }}>
                                <Text style={{ fontSize: 16 }}>Cấp bậc</Text>
                                <Text style={{ fontWeight: '600', fontSize: 16 }}>{jobs.position.name}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <MaterialIcons name="attach-money" size={30} color="#2E8B57" />
                            <View style={{ fontSize: 16, marginLeft: 15 }}>
                                <Text style={{ fontSize: 16 }}>Lương</Text>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>{jobs.salary}</Text>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <MaterialCommunityIcons name="clipboard-file" size={30} color="#2E8B57" />
                                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 15 }}>Miêu tả công việc</Text>
                            </View>
                            <ScrollView style={{ height: height * 0.55 }}>
                                <RenderHTML contentWidth={windowWidth} source={{ html: jobs.description }} style={{ fontSize: 16 }} />
                            </ScrollView>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <MaterialCommunityIcons name="clipboard-file" size={30} color="#2E8B57" />
                                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 15 }}>Yêu cầu công việc</Text>
                            </View>
                            <ScrollView style={{ height: height * 0.4 }}>
                                <RenderHTML contentWidth={windowWidth} source={{ html: jobs.requirement }} style={{ fontSize: 16 }} />
                            </ScrollView>
                        </View>

                    </View>
                </ScrollView>

                <View style={{ flex: 0.12, backgroundColor: '#EEEEEE' }}>
                    <TouchableOpacity onPress={applyCV}
                        style={{ width: '80%', marginTop: 15, marginLeft: '10%' }}>
                        <Text style={{ textAlign: 'center', backgroundColor: 'green', borderRadius: 10, padding: 8, color: 'white' }}>Ứng tuyển ngay</Text>
                    </TouchableOpacity>
                </View>
            </>}
        </View>
    );
}


const styles = StyleSheet.create({
    UserBar: {
        top: 50,
        left: 18,
        right: 40,
        width: '90%',
        height: '20%',
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

    avatar: {
        width: 100,
        height: 100,
    },
});