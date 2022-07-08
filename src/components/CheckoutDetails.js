import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import {getCart} from "../Api/getData";

import DisplayCheckoutItems from './displayCheckoutItem';
import PaymentGateway from  './paymentGateway'

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export function CheckoutDetails({navigation}){
    const {userData, dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext);
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkoutData, setCheckoutData] = useState([]);
    // const [buyHistoryData, setBuyHistoryData] = useState([])
    
    useEffect(() => {
        if(checkoutArray != undefined){
            let filteredData = [...checkoutArray].filter(index => index.item.Qty > 0 && index.item.Qty >= index.itemQtyCart)
            setCheckoutData(filteredData);
            // console.log(filteredData);
            setTotalPrice(TotalPayablePrice([...filteredData]));
            // buyHistoryArray(filteredData)
        }
    }, [checkoutArray])

    // function checkoutFilter(){
    //     let filteredData = [...checkoutArray].filter(item => item.item.Qty > 0)
    //     return filteredData
    // }
    // function buyHistoryArray(itemData){
    //     let spreadData = [...itemData]
    //     let filteredHistoryArray = [];
    //     for(let i = 0; i < spreadData.length; i++){
    //         filteredHistoryArray.push({
    //             userID: spreadData[i].userID, 
    //             itemID: spreadData[i].itemID, 
    //             itemSKU: spreadData[i].item.SKU,
    //             itemName: spreadData[i].item.itemName, 
    //             buyQty: spreadData[i].itemQtyCart, 
    //             buyPrice: spreadData[i].item.itemPrice
    //         });
    //     }
    //     // console.log(filteredHistoryArray, new Date)
    //     setBuyHistoryData(filteredHistoryArray);
    //     return filteredHistoryArray
    // }

    function TotalPayablePrice(itemData){
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

    return(
        <View style = {{flex: 1}}>
            {checkoutArray?.length > 0 ? 
                <View>            
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
                        <Text style = {styles.totalPayable}>Total Price: ${totalPrice.toFixed(2)}</Text>
                    </View>
                        <Text 
                            style = {styles.payButton} 
                            onPress = {() => {
                                PaymentGateway({
                                    navigation, 
                                    userData: userData, 
                                    checkoutData: checkoutData, 
                                    setDBCartArray: setDBCartArray, 
                                    setCheckoutArray: setCheckoutArray,
                                })
                            }}>Pay
                        </Text>
                    </View>
                    <ScrollView contentContainerStyle = {{flexGrow: 1}} style = {styles.checkoutContainer}>
                        <View >
                            <View style = {{flex: 1}}>
                                <View style = {styles.card}>
                                    {checkoutData?.map((data, index)=>(
                                        <DisplayCheckoutItems itemData = {data} navigation = {navigation} key = {index}/>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            :   
                <View style = {styles.emptyCon}>
                    <Text>No items available for checkout</Text>
                    <Text style = {styles.ShoppingButton} onPress = {() => {navigation.navigate('cartItems')}}>Go back to Cart</Text>
                </View>
            }
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
    checkoutContainer: {
        height: windowHeight * 0.60
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