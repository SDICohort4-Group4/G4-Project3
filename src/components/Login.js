import { StyleSheet, Text, View, TextInput, Image, Modal, Animated, Easing } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../contexts/AuthContext';
import { useContext, useEffect, useState } from "react";
import {getAuth, getUserInfo} from "../Api/Auth";
let icon = require('../../assets/shopin-no-tagline.png');
import { MaterialCommunityIcons } from "@expo/vector-icons";

import jwt_decode from 'jwt-decode'

import {getCart} from "../Api/getData";

import axios from 'axios'

export default function Login({navigation}) {

    // to be set after getting

    const {setAuth, setUserData} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState (null);
    const [userMail, setUserMail] = useState(null);
    const [userPass, setUserPass] = useState(null);
    const [loading, setLoading] = useState(false);

    const {userData, dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext)
    
    useEffect(() => {
    }, [dbCartArray, checkoutArray])

    async function handleLogin(user, pass) {
        setLoading(true);
        let response = await getAuth(user, pass);
        // if login success
        if (response.status === 200) {
            // storing key into secure store
            await SecureStore.setItemAsync('access', response.accessToken);
            await SecureStore.setItemAsync('refresh', response.refreshToken);
            // get user data to global userData
            let userRes = await getUserInfo();
            if (userRes.status === 200) {
                setUserData(userRes.data);
            } else {
                setErrMsg(err);
            }
            setAuth(true);
            cartData();
            // setCheckoutArray();
            // console.log(cartData);
            return;
        }
        // for errors retured 
        if (response.status === 400 || response.status === 404) setErrMsg('Account does not exist');
        if (response.status === 401) setErrMsg('Incorrect password');
        setLoading(false);
    }

    async function cartData(){
        let accessToken = await SecureStore.getItemAsync('access')
        let decode = jwt_decode(accessToken)
        const dataType = `/cart/${decode.id}`;
        getCart({dataType, getCartData});

        try {
            let cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
            let filteredData = [...(cartArray.data.data)].filter(index => index.item.Qty > 0)
            //Ensures that Checkout Qty's maximum is set to Available Qty //Doesn't seem to work
            // for(let i = 0; i < filteredData.length; i++){
            //     if(filteredData[i].itemQtyCart > filteredData[i].item.Qty){
            //         filteredData[i].itemQtyCart = filteredData[i].item.Qty
            //     }
            // }
            setCheckoutArray(filteredData)
        } catch (error) {
            if(error.response.status == 404){
                console.log('Login.js function cartData: Cart is empty')
            }
            if(error.response.status != 404){
                console.log('Login.js function cartData:', error)
            }
        }
    }

    function getCartData(data){
        let cartArray = [...data]
        setDBCartArray(cartArray);
    }

    function LoadModal() {
        let spinValue = new Animated.Value(0);
        // setting up the animation
        Animated.loop(
            Animated.timing(
                spinValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start();

        // interpolate for rotation values
        const spin = spinValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        });

        return(
            <Modal 
            animationType='fade'
            transparent={true}
            visible={loading}>
                <View style={styles.modalView}>
                    <View style={styles.iconContainer}>
                        <Animated.View style={{transform: [{rotate: spin}]}}>
                            <MaterialCommunityIcons name="loading" size={50} color="white" />
                        </Animated.View>    
                        <Text style={{fontSize: 16, color:'white', fontWeight: 'bold'}}>Loading</Text>
                    </View>
                </View>
            </Modal>
        )
    }


    // to refresh err message on input of user and pass
    useEffect(()=>{
        setErrMsg('')
    },[userMail, userPass]);

    return(
        <View style={styles.container}>
            <LoadModal />
            <Image style={styles.icon} source={icon}></Image>
            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder='Email' onChangeText={text => setUserMail(text)}></TextInput>

                <Text style={styles.label}>Password</Text>
                <TextInput style={[{...styles.input}, {marginBottom: 20}]} placeholder='Password' secureTextEntry={true} onChangeText={text => setUserPass(text)}></TextInput>
                {/* <Text style={styles.smolBtn} onPress={()=> console.log("Forgot")}>Forgot Password?</Text> */}

                <View style={styles.btnContainer}>
                    <Text style={styles.btn} onPress={()=> {handleLogin(userMail,userPass);}}>Login</Text>
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
        width: '70%',
        height: 40,
        borderRadius: 5,
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

    modalView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconContainer:{
        backgroundColor: '#00000060',
        width: 120,
        height: 120,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });