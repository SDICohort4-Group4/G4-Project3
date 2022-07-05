import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import {getCart} from "../Api/getData";

import DisplayCheckoutItems from './displayCheckoutItem';

import axios from 'axios'

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export function CheckoutDetails(navigation){
    const {dbCartArray, setDBCartArray, checkoutArray} = useContext(AuthContext);

    let filteredData;
    
    function checkoutFilter(){
        try {
            filteredData = [...checkoutArray].filter(item => item.item.Qty > 0)
        } catch (error) {
            filteredData = [...dbCartArray].filter(item => item.item.Qty > 0)
            console.log('Cannot setCheckoutArray in time')
        }

        return(
            <>
                {filteredData.map((data, index)=>(
                    <DisplayCheckoutItems itemData = {data} navigation = {navigation} key = {index}/>
                ))}
            </>
        )
    }

    let TotalPayablePrice = (itemData) =>{
        let totalSummaryPrice = 0
        let itemSummaryPrice = null

        let spreadData = [...itemData]
        spreadData.forEach((data) => {
            if(!isNaN(data.itemQtyCart) || !isNaN(data.item) && data.item != undefined){
                if(data.item.Qty <= 0){
                    itemSummaryPrice = itemSummaryPrice;
                    totalSummaryPrice = totalSummaryPrice;
                } else {
                    itemSummaryPrice = data.itemQtyCart * data.item.itemPrice;
                    totalSummaryPrice = totalSummaryPrice + itemSummaryPrice;
                }
            }
            // console.log(itemSummaryPrice)
            // console.log(totalSummaryPrice)
        })
        
        return totalSummaryPrice;
    }

    useEffect(() => {
    },[dbCartArray, checkoutArray])

    return(
        <View >
            <View style = {styles.ccContainer}>
                <Text style = {styles.ccNumber}>Credit Card Details: </Text>
                <View style = {styles.ccNoContainer}>
                    <TextInput maxLength = {4} placeholder = "1234" keyboardType = "numeric" style = {styles.ccInput} editable = {false} value = "1234"/>
                    <TextInput maxLength = {4} placeholder = "1234" keyboardType = "numeric" style = {styles.ccInput} editable = {false} value = "5678"/>
                    <TextInput maxLength = {4} placeholder = "1234" keyboardType = "numeric" style = {styles.ccInput} editable = {false} value = "9999"/>
                    <TextInput maxLength = {4} placeholder = "1234" keyboardType = "numeric" style = {styles.ccInput} editable = {false} value = "0000"/>
                </View>
                <Text style = {styles.ccNumber}>CVV:</Text>
                <View style = {styles.ccNoContainer}>
                    <TextInput maxLength = {3} placeholder = "123" keyboardType = "numeric" style = {styles.ccInput} editable = {false} value = "123"/>
                </View>
                <View style = {styles.paymentContainer}>
                    <Text style = {styles.totalPayable}>Total Price: ${TotalPayablePrice(checkoutArray == undefined? dbCartArray : checkoutArray).toFixed(2)}</Text>
                </View>
                <Text style = {styles.payButton}>Pay</Text>
            </View>
            <ScrollView contentContainerStyle = {{flexGrow: 1}} style = {styles.checkoutContainer}>
                <View >
                    <View style = {{flex: 1}}>
                        <View style = {styles.card}>

                            {checkoutFilter()}
                        </View>
                        {/* <Text onPress={() => {getCartData(); getCheckoutData()}}>Print</Text> */}
                        {/* {getFilteredData} */}
                        {/* <Text onPress={() => {getFilteredData(); console.log(checkoutData, new Date)}}>Print</Text> */}

                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    ccContainer:{
        // flex: 1,
        // borderWidth: 5,
        height: windowHeight * 0.25
    },
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
        marginTop: 5,
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
    checkoutContainer: {
        outlineWidth: 1,
        outlineColor: "red",
        height: windowHeight * 0.60
    }
})