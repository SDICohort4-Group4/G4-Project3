import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';
import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import {getCart} from "../Api/getData";

export default function paymentGateway({navigation, userData, checkoutData, setDBCartArray, setCheckoutArray}){
    function failure(){
        return(
            <>
                {console.log('Payment failed. Redirecting back to Cart')}
                {navigation.navigate('cartItems')}
                {/* {console.log(checkoutData)} */}
                {/* {console.log(checkoutData)} */}
            </>
        )
    }
    // console.log(navigation)

    async function success(){
        let buyHistoryData = buyHistoryArray(checkoutData);
        let payload = [...buyHistoryData];
        try {
            await axios.put(`https://sdic4-g4-project2.herokuapp.com/cart/delete/${userData.userID}`);
        } catch (error) {
            console.log('paymentGateway.js function success, deleteCart : ', error);
        }

        try {
            await axios.post(`https://sdic4-g4-project2.herokuapp.com/buyhistory/save`, payload)
        } catch (error) {
            console.log('paymentGateway.js function success, Recording buyHistory: ', error)
        }
        return(
            <>
                {console.log('Payment Success! Redirecting back to Cart')}
                {/* {console.log(checkoutData)} */}
                {/* {console.log(buyHistoryArray(checkoutData) ,new Date)} */}
                {setDBCartArray([])}
                {setCheckoutArray([])}
                {console.log('Clearing Cart with API call')}
                {navigation.navigate('cartItems')}
            </>
        )
    }    
    
    function buyHistoryArray(itemData){
        let spreadData = [...itemData]
        let filteredHistoryArray = [];
        for(let i = 0; i < spreadData.length; i++){
            filteredHistoryArray.push({
                userID: spreadData[i].userID, 
                itemID: spreadData[i].itemID, 
                itemSKU: spreadData[i].item.SKU,
                itemName: spreadData[i].item.itemName, 
                buyQty: spreadData[i].itemQtyCart, 
                buyPrice: spreadData[i].item.itemPrice
            });
        }
        console.log(filteredHistoryArray, new Date)
        return filteredHistoryArray
    }
    return(
        <View>
            {Alert.alert(
                "Payment Gateway",
                null,
                [
                    {
                        text: "Failure",
                        onPress: () => failure()
                    },
                    {   
                        text: "Success",
                        onPress: () => success()
                    }
                ],
                // {cancelable: true}
            )}
        </View>
    )
}