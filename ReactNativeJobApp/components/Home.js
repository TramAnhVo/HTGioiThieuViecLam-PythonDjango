import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar, ScrollView, Image, ActivityIndicator } from 'react-native';
import API, { endpoints } from "../configs/API";
import DoanhNghiep from "./Company";

const windownHeight = Dimensions.get('window').height;

export default Home = ({ route, navigation }) => {
    const [jobs, setJobs] = useState(null)
    const [companies, setCompanies] = useState(null)
    // const jobId = route.params;
    // const {jobId} = route.params;

    useEffect(() => {
        const loadJob = async () => {
            // if (jobId !== undefined && jobId != null)
            // url = `${url}?job_id=${jobId}`

            try {
                let res = await API.get(endpoints['jobs']);
                setJobs(res.data.results)
            } catch (ex) {
                console.error(ex);
            }
        }

        const loadCompany = async () => {
            try {
                let res = await API.get(endpoints['companies']);
                setCompanies(res.data)
                // console.log(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadJob();
        loadCompany();      
    }, []);

    const goToDetail = (jobId) => {
        navigation.navigate("CTCV", {"jobId": jobId})
    }

    const goToCompanyDetail = (companyId) => {
        navigation.navigate("CTDN", {"companyId": companyId})
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />

            <ScrollView style={{ flex: 0.84, backgroundColor: '#F8F8F8' }}>
                {/* bai dang tuyen dung */}
                {jobs === null ? <ActivityIndicator /> : <>
                    <View style={styles.Jobs}>
                        <Text style={styles.TextHead}>CÔNG VIỆC MỚI NHẤT</Text>
                        {jobs.map(c => (
                            <TouchableOpacity onPress={() => goToDetail(c.id)}>
                                <View style={styles.ItemJob}>
                                    <View style={{ width: '20%' }} >
                                        <Image source={require('../components/image/job.png')} style={styles.avatar} />
                                    </View>
                                    <View style={{ width: '73%' }}>
                                        <Text style={{fontSize: 16, fontWeight: '700'}}>{c.title}</Text>
                                        <Text style={{fontSize: 13, fontWeight: '400', textAlign: 'left'}}>{c.company.name}</Text>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 4 }}>
                                            <Text style={styles.TextTag}>{c.salary}</Text>
                                            <Text style={styles.TextTag}>{c.location.name}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>}

                {/* cac cong ty noi bat */}
                {/* <DoanhNghiep /> */}
                <View>
            {companies === null ? <ActivityIndicator /> : <>
                <View style={{ marginBottom: 10, marginRight: '3%', marginLeft: '3%', }}>
                    <Text style={styles.TextHead}>TOP CÔNG TY NỔI BẬT</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%', width: '100%', flexWrap: 'wrap' }}>
                        {companies.map(m => (
                            <View style={styles.CompanyItem} >
                                <TouchableOpacity onPress={() => goToCompanyDetail(m.id)} >
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                                        <Image source={require('../components/image/job.png')} style={styles.logo} />
                                    </View>
                                    <View >
                                        <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: "700", }}>{m.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                </View>
            </>}
        </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    MenuBar: {
        flex: 0.08,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 4,
        padding: 5
    },

    Jobs: {
        marginRight: '4%',
        marginLeft: '4%',
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

    // anh dai dien
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 10
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

    // tieu de tren trang chu
    TextHead: {
        fontWeight: "700",
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
    },

    // tieu de tren trang chu
    TextHead: {
        fontWeight: "700",
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
    },

    // cac cong ty
    CompanyItem: {
        padding: 10,
        borderRadius: 10,
        width: '46%',
        margin: '2%',
        borderWidth: 1,
        borderColor: '#008000'
    },

    logo: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
});

