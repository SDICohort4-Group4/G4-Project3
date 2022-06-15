import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {getAuth} from "../Api/Auth";
import { useContext, useEffect, useState } from "react";
import AuthContext from '../contexts/AuthContext';
import jwt_decode from "jwt-decode";

export default function AccountDetails({navigation}) {
    let [user, setUser] = useState(null);
    let {setAuth} = useContext(AuthContext);

    async function getInfo() {
        let curKey = await SecureStore.getItemAsync('key');
        let decoded = jwt_decode(curKey);
        let user = {email: decoded?.email, role: decoded?.role}
        setUser(user);
    }

    async function logout(){
        setAuth(false);
        SecureStore.deleteItemAsync('key');
    }



    useEffect(()=>{
        getInfo()
    },[])


    return(
        <View style={styles.container}>
            <View style={styles.userDetails}>
                <View style={styles.icon}>
   
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{`User: ${user?.email}`}</Text>
                    <Text style={styles.infoText}>{`Role: ${user?.role}`}</Text>
                </View>
            </View>
            <View style={styles.others}>
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
        justifyContent: 'center',
        width: '100%',
        height: '100%', 
        backgroundColor: '#fffaed',
    },

    userDetails: {
        flex:1,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
    },

    icon: {
        flex: 1,
        borderRightWidth: 1,
        padding: 5,
    },

    info: {
        flex: 4,
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },

    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    others: {
        flex:9,
        width: '100%',
    },

    logout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    logoutBtn: {
        width: '60%',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#d61100',
        padding: 5,
        borderRadius: 10,
        color: 'white',
        elevation: 20,
    },
  });