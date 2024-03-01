import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Job from "./Job";
import API, { endpoints } from "../configs/API";
import AntDesign from "react-native-vector-icons/AntDesign"

export default AllJob = ({ navigation }) => {
    const [jobs, setJobs] = useState(null)
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)
    const loadJob = async () => {
        try {
            let { data } = await API.get(endpoints['jobs'], {
                params: {
                    page: page,
                }
            },);
            console.log(data);
            setJobs(data.results);
            setNext(data.next);
            setPrevious(data.previous);
        } catch (ex) {
            console.error(ex);
        }
    }
    useEffect(() => {
        loadJob();
    }, [])
    const handlePrevious = () => {
        if (previous) {
            setPage(page--)
            loadJob()
        } else {
            console.log("...");
        }
    }
    const handleNext = () => {
        if (next) {
            setPage(page++)
            loadJob()
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 0.84, backgroundColor: '#F8F8F8' }}>
                <Text style={{ textAlign: 'center', fontWeight: "700", fontSize: 20, margin: 6 }}>TẤT CẢ BÀI TUYỂN DỤNG CỦA CÁC DOANH NGHIỆP</Text>
                {jobs === null ? <ActivityIndicator /> : <>
                    <View style={styles.Jobs}>
                        {jobs.map(c => (
                            <Job key={c.id} navigation={navigation} c={c} />
                        ))}
                    </View>
                </>}
                <View style={styles.navigate}>
                    <TouchableOpacity onPress={handlePrevious}>
                        <AntDesign style={{ marginLeft: 12, opacity: previous ? 1 : 0.2 }} name="left" color="#00b14f" size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                         <AntDesign style={{ marginRight: 12, opacity: next ? 1 : 0.2 }} name="right" color="#00b14f" size={32} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Jobs: {
        marginRight: '4%',
        marginLeft: '4%',
    },

    navigate: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    }
})