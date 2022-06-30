import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../contexts/AuthContext';
import { useContext, useEffect, useState } from "react";
import {getUser, registerUser} from "../Api/Auth";
let icon = require('../../assets/shopin-no-tagline.png')

export default function Registration({navigation}) {

    // to be set after getting
    const {auth, setAuth} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState (null);
    const [userMail, setUserMail] = useState(null);
    const [userPass, setUserPass] = useState(null);
    const [userCPass, setUserCPass] = useState(null);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const PassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;


    async function Register(user, pass, cPass) {

        //first check the email against regex
        if(!emailRegex.test(userMail)) {
            setErrMsg('Please Enter a valid Email');
            return;
        } 

        // check password agains regex
        if(!PassRegex.test(pass)) {
            setErrMsg('Requires at least 8 characters, both cases, 1 number and 1 special character');
            return;
        }

        // check password against confirm password
        if (pass != cPass) {
            setErrMsg('Confirm password is different');
            return;
        }
        // call api to register the account
        let response = await registerUser(user, pass);

        if (response.status === 200) {
            // Register success
            navigation.navigate('RegisterSuccess')
        } else if(response.status === 400) {
            setErrMsg(`User already exist`); 
        } else {
            // Registeration failed
            setErrMsg(`Registration failed with ${response.status} code`);
        }
    }

    useEffect(()=>{
        setErrMsg('')
    },[userMail, userPass, userCPass]);


    return(
        <View style={styles.container}>
            <Image style={styles.icon} source={icon}></Image>
            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder='Email' onChangeText={text => setUserMail(text)}></TextInput>

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={text => setUserPass(text)}></TextInput>

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={true} onChangeText={text => setUserCPass(text)}></TextInput>

                <View style={styles.btnContainer}>
                    <Text style={styles.btn} onPress={()=> Register(userMail,userPass,userCPass)}>Sign Up</Text>
                </View>

                <View style={styles.hr}>
                    <Text style={styles.hrText}>or</Text>
                </View>

                <Text>Already have an account?</Text>
                <View style={[{...styles.btnContainer}, {marginTop: 10}]}>
                    <Text style={styles.btn} onPress={()=> navigation.navigate('Login')}>Login</Text>
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
        position: 'absolute',
        bottom: 5,
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

    icon:{
        height: 80,
        width: 80,
        borderRadius: 100,
    },

  });