import { StyleSheet, Text, View, ScrollView, Image, Alert, Pressable} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from "axios";
import { Card } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';

import DisplayBuyHistory from "../components/displayBuyHistory"

export default function BuyHistory(navigation, transactData){

    const {userData} = useContext(AuthContext);
    const [transactionData, setTransactionData] = useState([0,0,0,0]);
    const [truefalse, setTrueFalse] = useState(false)

    // useFocusEffect(() => {
    //     setTransactionData([0,0,0,0,0,0,0])
    // })
    function printValue(){
        console.log('transactData: ',transactData, new Date)
        // console.log('navigation',navigation.route.params.transactData[0].data)
        if(navigation.route.params.transactData[0] != undefined){
            console.log('navigation',navigation.route.params.transactData[0].data.data)
        }

    }
    function Refresh(){
        setTransactionData([0,0,0,0,0,0,0,0,0,0])
    }

    function Refresh2(){
        setTransactionData([0])
    }

    function switchStates(){
        setTrueFalse(!truefalse)
        console.log(!truefalse)
    }


    return(
        <ScrollView>
            {transactionData.length > 0 ? 
                <View style = {styles.card}>
                    {/* {transactionData.map((data, index)=>(
                        <DisplayBuyHistory itemData = {data} key = {index}/>
                    ))}
                    <Pressable onPress = {() => {Refresh2()}}>
                        <Text style = {styles.ShoppingButton } >Refresh</Text>
                    </Pressable> */}
                    <Pressable onPress = {() => {switchStates(); printValue()}}>
                        <Text style = {styles.ShoppingButton }>Refresh</Text>

                    </Pressable>
                    {truefalse == true? <Text>True</Text>:<Text>False</Text>}
                </View>
            :
                <View>
                    <View style = {styles.emptyCon}>
                        <Text>There have been no past transactions</Text>
                        <Pressable onPress = {() => {Refresh()}}>
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