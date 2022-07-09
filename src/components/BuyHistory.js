import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { useContext, useEffect, useState, useCallback } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

import DisplayBuyHistory from "../components/displayBuyHistory"

export default function BuyHistory({navigation}){

    const {historyArray} = useContext(AuthContext);
    const [transactionData, setTransactionData] = useState([]);

    // function printValue(){
    //     console.log('historyArray: ', historyArray)
    // }

    // on blur pop till first page
    useFocusEffect(
        useCallback( ()=>{
            return ()=>{
                if (navigation.getState().index == 1) navigation.popToTop();
            };
        },[navigation])
    )

    useEffect(() => {
        if(historyArray != undefined){
            let historyArrayInSeconds = [...historyArray.slice(0,50)]
            // if(historyArrayInSeconds.length > 0){
            //     historyArrayInSeconds.forEach((index) => index['createdAtInSeconds'] = new Date(index.createdAt).getTime())
            //     historyArrayInSeconds.sort((a,b) => {return b.createdAtInSeconds - a.createdAtInSeconds})
            // }
            setTransactionData([...historyArrayInSeconds])
        }
    },[historyArray])

    return(
        <ScrollView contentContainerStyle = {{flexGrow: 1}} style = {{backgroundColor: '#fffaed'}}>
            <View style = {{flex: 1}}>
                {transactionData.length > 0 ? 
                    <View style = {styles.card}>
                        {transactionData.map((data, index)=>(
                            <DisplayBuyHistory itemData = {data} navigation = {navigation} key = {index}/>
                        ))}
                    </View>
                :
                    <View style = {styles.emptyCon}>
                        <Text>There have been no past transactions</Text>
                        <Text style = {styles.ShoppingButton } onPress = {() => navigation.navigate('Home', {screen: 'browse'})}>Let's go Shopin</Text>
                    </View>
                }
            </View>
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