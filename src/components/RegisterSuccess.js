import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useContext, useEffect, useState } from "react";
import {getUser, registerUser} from "../Api/Auth";

export default function RegisterSuccess({navigation}) {

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login')
        },2000)
    },[]);


    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>Registration Successful!</Text>
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

    form: {
        backgroundColor: '#fcfcfa',
        width: '80%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },

    text: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold'
    }

  });