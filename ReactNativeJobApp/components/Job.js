import React, { useContext } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyContext from "../configs/MyContext";

export default Job = ({c,navigation}) => {
    const [user] = useContext(MyContext);
    
    const goToDetail = () => {
        if(user.role)
            navigation.navigate("CTCV", {"jobId": c.id});
        else navigation.navigate("SeeCV",{"jobId": c.id,"title":c.title})
    }
    return (
        <TouchableOpacity
            onPress={() => goToDetail()}>
            <View style={styles.ItemJob} key={c.id}>
                <View style={{ width: '20%' }} >
                    <Image source={{uri: c.company.image}} style={styles.avatar} />
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
    );
}
const styles= StyleSheet.create({
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
})
