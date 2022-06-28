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
                <View style={styles.info}>
                    <Text style={styles.infoText} numberOfLines={1}>{`User: ${user?.email} 11111111`}</Text>
                    <Text style={styles.infoText}>{`Access: ${user?.role}`}</Text>
                </View>
            </View>

            <View></View>

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
        paddingVertical: 20,
    },

    headerText: {
        fontSize: 25,
        fontWeight: "bold",
    },

    userDetails: {
        width: '90%',
        height: '30%',
        flexDirection: 'row',

        paddingVertical: 10,
        elevation: 10,
        backgroundColor: '#f1e9cb',
    },

    info: {
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
        flexGrow: 1,
        flexShrink: 1
    },

    infoText: {
        fontSize: 16,
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
        backgroundColor: '#d61100',
        padding: 5,
        borderRadius: 10,
        elevation: 20,
    },
  });