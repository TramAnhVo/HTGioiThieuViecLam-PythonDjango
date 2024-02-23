import React, { useEffect, useState } from "react";
import { ActivityIndicator,  Image,  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import API, { endpoints } from "../configs/API";

export default DoanhNghiep = ({ navigation }) => {
    const [companies, setCompanies] = useState(null)

    useEffect(() => {
        const loadCompany = async () => {
            try {
                let res = await API.get(endpoints['companies']);
                setCompanies(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }

        loadCompany();
    }, [])

    const goToDetail = (companyId) => {
        navigation.navigate("CTDN", {"companyId": companyId})
    }

    return (
        <View>
            {companies === null ? <ActivityIndicator /> : <>
                <View style={{ marginBottom: 10, marginRight: '3%', marginLeft: '3%', }}>
                    <Text style={styles.TextHead}>TOP CÔNG TY NỔI BẬT</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%', width: '100%', flexWrap: 'wrap' }}>
                        {companies.map(m => (
                            <View style={styles.CompanyItem} >
                                <TouchableOpacity onPress={() => goToDetail(m.id)} >
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
    );
}

const styles = StyleSheet.create({
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
})
