import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../contexts/AuthContext';
import { useContext, useEffect, useState } from "react";
import {getAuth} from "../Api/Auth";

export default function Login({navigation}) {

    // to be set after getting
    const {auth, setAuth} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState (null);
    const [userMail, setUserMail] = useState(null);
    const [userPass, setUserPass] = useState(null);

    async function handleLogin(user, pass) {
        let response = await getAuth(user, pass);
        // if login success
        if (response.status === 200) {
            // storing key into
            let keyValue = response.data.data;
            await SecureStore.setItemAsync('key', keyValue);
            setAuth(true);
        };
        // for errors retured 
        if (response.status === 400) setErrMsg('Account does not exist');
        if (response.status === 401) setErrMsg('Incorrect password');
    }

    useEffect(()=>{
        setErrMsg('')
    },[userMail, userPass]);


    return(
        <View style={styles.container}>
            <Text>Login To Shopin</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder='Email' onChangeText={text => setUserMail(text)}></TextInput>

                <Text style={styles.label}>Password</Text>
                <TextInput style={[{...styles.input}, {marginBottom: 10}]} placeholder='Password' secureTextEntry={true} onChangeText={text => setUserPass(text)}></TextInput>
                <Text style={styles.smolBtn} onPress={()=> console.log("Forgot")}>Forgot Password?</Text>

                <View style={styles.btnContainer}>
                    <Text style={styles.btn} onPress={()=> handleLogin(userMail,userPass)}>Login</Text>
                </View>

                <View style={styles.hr}>
                    <Text style={styles.hrText}>or</Text>
                </View>

                <Text>Don't have an account?</Text>
                <View style={[{...styles.btnContainer}, {marginTop: 10}]}>
                    <Text style={styles.btn} onPress={()=> navigation.navigate('Registration')}>Signup</Text>
                </View>
            </View>
            <Text style={errMsg?styles.err:styles.emptyErr}>{errMsg}</Text>
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

    form: {
        backgroundColor: '#fcfcfa',
        width: '80%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 0,
    },

    label: {
        alignSelf: "flex-start"
    },

    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 10,
        marginBottom: 20,
    },

    btnContainer: {
        backgroundColor: 'gold',
        width: '100%',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btn: {
        width: '100%', 
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
        color: 'blue',
        textDecorationLine: 'underline',
    },

    smolBtn: {
        alignSelf:'flex-end',
        textDecorationLine: 'underline',
        marginBottom: 15,
    },

    err: {
        width: '80%',
        textAlign: 'center',
        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 5,
    },

    emptyErr: {
        display: 'none'
    },

    hr: {
        borderBottomWidth: 1,
        width: '100%',
        height: 1,
        overflow: 'visible',
        marginVertical: 20,
        justifyContent:'center',
        alignItems: 'center',
    },

    hrText: {
        height:20,
        backgroundColor: '#fcfcfa',
        paddingHorizontal: 10,
    },

  });