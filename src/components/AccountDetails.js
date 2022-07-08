import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {useContext, useState, useEffect} from "react";
import AuthContext from '../contexts/AuthContext';
import { Feather } from "@expo/vector-icons";
import axios from 'axios';

export default function AccountDetails({navigation}) {
    let {setAuth, userData, setUserData, setDBCartArray, setCheckoutArray, historyArray, setHistoryArray} = useContext(AuthContext);
    const [historyData, setHistoryData] = useState([]);
    const [transactionData, setTransactionData] = useState([])

    async function logout(){
        setAuth(false);
        setDBCartArray([]);
        setCheckoutArray([]);
        setUserData({});
        setHistoryArray([]);
        navigation.navigate('homeMain')
        navigation.navigate('Account', {screen: 'Login'})
        SecureStore.deleteItemAsync('access');
        SecureStore.deleteItemAsync('refresh');
    }

    async function getBuyHistory(){
        try {
            let transactionArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/buyhistory/${userData.userID}`)
            setHistoryData([...transactionArray.data.data])
        } catch (error) {
            if(error.response.status == 404){
                console.log('AccountDetails.js function getBuyHistory : There have been no past transactions')
            } else {
                console.log('AccountDetail.js function getBuyHistory :', error)
            }
        }
    }

    useEffect(() => {
        setHistoryArray([...historyData])
    },[historyData])

    function DisplayDetails() {
        return(
            <>
            <View style={styles.userDetails}>
                <Text style={styles.infoHeader}>Details</Text>
                <View style={styles.info}>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Name:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>{userData?.userName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Email:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>{userData?.userEmail}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Nickname:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>{userData?.userNickname}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Address:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>{`${userData?.userAddress1} ${userData?.userAddress2? ", " + userData?.userAddress2 : ""}`}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Postal:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>{userData?.userPostalCode}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Country:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>{userData?.userCountry}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[{...styles.infoText},{flex: 2}]}>Contact:</Text>
                        <Text style={[{...styles.infoText},{flex: 5}]}>{`+${userData?.userCountryCode} ${userData?.userPhoneNum}`}</Text>
                    </View>
                </View>
            </View>
            </>
        )
    }
    

    return(
        <View style={styles.container}>
            <View style={styles.headerTextBox}>
                <Text style={styles.headerText}>Welcome Back</Text>
            </View>
            
            <DisplayDetails/>

            <View style={styles.menuItemCon}>
                <Text onPress={()=> navigation.navigate('UpdateDetails')} style={styles.menuItemText}>Update Details</Text>
                <Feather name="chevron-right" size={24} color="black" />
            </View>
            <View style={styles.menuItemCon}>
                <Text onPress={()=> {getBuyHistory(); navigation.navigate('BuyHistory')}} style={styles.menuItemText}>View Transaction History</Text>
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
        backgroundColor: '#ffffff',
        marginBottom: 25,
    },

    info: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.05)',
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
        backgroundColor: '#ffffff',
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
        borderRadius: 5,
        elevation: 20,
    },
  });