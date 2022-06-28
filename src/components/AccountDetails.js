import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from "react";
import AuthContext from '../contexts/AuthContext';
import jwt_decode from "jwt-decode";
import { Feather } from "@expo/vector-icons";

export default function AccountDetails({navigation}) {
    let [user, setUser] = useState(null);
    let {setAuth} = useContext(AuthContext);

    async function getInfo() {
        let decoded = jwt_decode(await SecureStore.getItemAsync('access'));
        let user = {email: decoded?.email, role: decoded?.role}
        setUser(user);
    }

    async function logout(){
        setAuth(false);
        SecureStore.deleteItemAsync('access');
        SecureStore.deleteItemAsync('refresh');
    }

    useEffect(()=>{
        getInfo()
    },[])


    return(
        <View style={styles.container}>
            <View style={styles.headerTextBox}>
                <Text style={styles.headerText}>Welcome Back</Text>
            </View>
            <View style={styles.userDetails}>
                <Text style={styles.infoHeader}>Details</Text>
                <View style={styles.info}>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Email:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>TestEmail@gmail.com</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Nickname:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>Test User 1</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Address:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>27 Eddasdad sdas dasd dfsd dfsdff dfs</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Postal:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>TestEmail@gmail.com</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Country:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>Singapore</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Contact:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>+65 12345678</Text>
                    </View>
                </View>
            </View>

            <View style={styles.menuItemCon}>
                <Text style={styles.menuItemText}>Update Details</Text>
                <Feather name="chevron-right" size={24} color="black" />
            </View>

            <View style={styles.logout}>
                <Text onPress={()=>logout()} style={styles.logoutBtn}>Logout</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%', 
        backgroundColor: '#fffaed',
    },

    headerTextBox: {
        width: "90%",
        paddingVertical: 25,
    },

    headerText: {
        fontSize: 25,
        fontWeight: "bold",
    },

    userDetails: {
        width: '90%',
        padding: 10,
        elevation: 10,
        backgroundColor: '#f1e9cb',
        marginBottom: 25,
    },

    info: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        padding: 15,
        justifyContent: "center",
    },

    infoRow:{
        flexDirection:"row",
        marginBottom: 5,
    },

    infoText: {
        fontSize: 15,
    },

    infoHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    menuItemCon:{
        backgroundColor: '#f1e9cb',
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 10,
        height: 50,
        elevation: 10,
    },

    menuItemText:{
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
        height: "100%",
        textAlignVertical: "center",
    },

    buttonsCon: {
        width: '90%',
        flexDirection: 'row',
    },

    button:{
        padding: 20,
        backgroundColor: '#f1e9cb',
        borderRadius: 5,
        marginRight: 20,
        elevation: 10,
    },

    logout: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bottom: 10,
    },

    logoutBtn: {
        width: '40%',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 10,
        elevation: 20,
    },
  });