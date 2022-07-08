import { StyleSheet, Text, View, ScrollView, Image, Alert, Pressable} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from "axios";
import { Card } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';

import DisplayBuyHistory from "../components/displayBuyHistory"

export default function BuyHistory(navigation){

    const {userData, historyArray, setHistoryArray} = useContext(AuthContext);
    const [transactionData, setTransactionData] = useState([]);
    const [truefalse, setTrueFalse] = useState(false)
    const [historyData, setHistoryData] = useState([]);

    // function printValue(){
    //     console.log('historyArray: ', historyArray)
    // }

    async function getBuyHistory(){
        console.log('Refresh')
        try {
            let transactionArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/buyhistory/${userData.userID}`)
            setHistoryData([...transactionArray.data.data])
            // console.log([...transactionArray.data.data])
        } catch (error) {
            console.log('BuyHistory.js function getBuyHistory :', error)
        }
    }

    useEffect(() => {
        if(historyArray != undefined){
            setTransactionData([...historyArray])
        }
    },[historyArray])

    function Refresh(){
        setTransactionData([]);
        setTimeout(() => {console.log(transactionData,new Date)}, 1000)
        // // console.log(transactionData)
        //     if(historyArray != undefined){
        //         setTimeout(() => {setTransactionData([...historyArray])}, 30000)
        //     }
        //     // setTimeout(() => {console.log(transactionData)}, 500)
    }

    return(
        <ScrollView>
            {transactionData.length > 0 ? 
                <View style = {styles.card}>
                    {transactionData.map((data, index)=>(
                        <DisplayBuyHistory itemData = {data} navigation = {navigation} key = {index}/>
                    ))}
                    <Pressable onPress = {() => {getBuyHistory();Refresh()}}>
                        <Text style = {styles.ShoppingButton } >Refresh</Text>
                    </Pressable>
                </View>
            :
                <View>
                    <View style = {styles.emptyCon}>
                        <Text>There have been no past transactions</Text>
                        <Pressable onPress = {() => {}}>
                            <Text style = {styles.ShoppingButton } >Refresh</Text>
                        </Pressable>
                    </View>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ccNumber: {
        alignSelf: 'center',
    },
    ccNoContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        outlineWidth: 1
    },
    ccInput: {
        paddingHorizontal: 5
    },
    card:{
        marginVertical: 5,
        alignSelf: 'center',
        width: '95%',
        backgroundColor: 'white',
        elevation: 5,

    },
    payButton:{
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
        borderWidth: 0.02,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: "#FFD700",
        height: 40,
        marginHorizontal: 10,
    },
    totalPayable: {
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    paymentContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    emptyCon:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ShoppingButton:{
        fontSize: 18,
        textAlign: "center",
        alignSelf: "center",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#FFD700",
        margin: 10,
    },

})