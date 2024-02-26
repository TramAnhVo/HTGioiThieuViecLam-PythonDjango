import { useContext, useEffect, useState } from "react"
import MyContext from "../configs/MyContext";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Job from "./Job";
import API, { authApi, endpoints } from "../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const JobCompany = ({ navigation }) => {
    const [user, dispatch] = useContext(MyContext);
    const [jobs, setJobs] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = await AsyncStorage.getItem('access-token');
                const { data } = await authApi(token).get(endpoints[`get-company-by-user`], ({ user: user.id }));
                dispatch({
                    type: "login",
                    payload: data[0]
                });
                const companyId = data[0].id;
                let jobResponse = await authApi(token).get(endpoints['job-company'](companyId));
                let jobData = jobResponse.data;
                if (jobData.length > 0) {
                    setJobs(jobData);
                }
                console.log(jobData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <View style={{ flex: 1 }}>
                <StatusBar style="light" />
                <ScrollView>
                    <View style={styles.screen}>
                        <Text style={styles.TextHead}>CÔNG VIỆC MỚI NHẤT</Text>
                        <View style={styles.form}>
                            <Text style={styles.title}>Công việc đang mở</Text>
                            {/* bai dang tuyen dung */}
                            <View style={styles.Jobs}>
                                {jobs === null ? <Text>Bạn chưa mở công việc</Text>
                                : jobs.map(c => (
                                    <Job c={c} navigation={navigation}/>
                                ))}
                            </View>
                        </View>
                    </View>

                </ScrollView>

            </View>
        </>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 0.84,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center'
    },

    Jobs: {
        marginRight: '4%',
        marginLeft: '4%',
    },

    // tieu de tren trang chu
    TextHead: {
        fontWeight: "700",
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
    },
    title:{
        fontSize:20,
        color:'blue'
    },
    form:{
        width:'90%'
    }
})