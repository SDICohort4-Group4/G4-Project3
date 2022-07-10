import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios'
import DisplayCartItem from '../components/displayCartItem.js'
import { useFocusEffect, useCallback , useIsFocused} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

import AddCalcItemFinalPrice from '../components/addCalcItemFinalPrice'
import TotalPayablePrice from './totalPayablePrice';

export function CartDetails({navigation}){

    const {auth} = useContext(AuthContext);
    const {dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartData, setCartData] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if(dbCartArray != undefined){
            let withItemFinalPrice = AddCalcItemFinalPrice([...dbCartArray])
            setCartData([...withItemFinalPrice]);
            setTotalPrice(TotalPayablePrice([...withItemFinalPrice]))
        }
    },[dbCartArray])

    let checkoutData;
    let cartArray;

    // function printValue(){
    //     console.log(dbCartArray, new Date)
    // }

    // useFocusEffect(()=>{
    //     // redirect to login if no auth
    //     if (!auth) navigation.navigate('Account',{screen: 'Login'});
    // })

    //This basic useEffect allows me to refresh the cartData states on page focus
    useEffect(() => {
        if(isFocused){
            if (!auth) navigation.navigate('Account',{screen: 'Login'});
            if(auth == true){
                // console.log('useEFfect[isFocused]')
                getUpdatedData()
            }
        }
    }, [isFocused])

    async function getUpdatedData(){
        try {
            let accessToken = await SecureStore.getItemAsync('access')
            let decode = jwt_decode(accessToken)
            cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
            // console.log([...cartArray.data.data], 'getUpdatedData', new Date)
            setDBCartArray([...cartArray.data.data])
        } catch (error) {
            if(error.response != undefined){
                if(error.response.status === 404){
                    console.log('CartDetails.js useEffect[isFocused]  Cart is empty', )
                }
                if(error.response.status !== 404) {
                    console.log('CartDetails.js useEffect[isFocused] if error not 404: ', error)
                }
            } else {
                console.log('CartDetails.js useEffect[isFocused] : ', error)
            }
        }
    }
    
    async function getFilteredData(){
        try {
            let accessToken = await SecureStore.getItemAsync('access')
            let decode = jwt_decode(accessToken)
            let cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
            checkoutData = [...(cartArray.data.data)].filter(index => index.item.Qty > 0)
            for(let i = 0; i < checkoutData.length; i++){
                if(checkoutData[i].itemQtyCart > checkoutData[i].item.Qty){
                    checkoutData[i].itemQtyCart = checkoutData[i].item.Qty
                }
            }
            // console.log(checkoutData)
            setCheckoutArray([...checkoutData])
        } catch (error) {
            console.log(`CartDetail.js function getFilteredData, getCheckoutArrayData:`, error)
        }
        // return checkoutData
    }

    return(
        <ScrollView contentContainerStyle = {{flexGrow: 1}} style = {{backgroundColor: '#fffaed'}}>
            <View style = {{flex: 1}}>
            {auth === true? 
                cartData.length > 0 ? 
                    <View style = {styles.card}>
                        {cartData.map((data, index)=>(
                            <DisplayCartItem itemData = {data} navigation = {navigation} key = {index}/>
                        ))}
                        <View style = {styles.paymentContainer}>
                            <Text style = {styles.totalPayable}>Total Price: ${totalPrice.toFixed(2)}</Text>
                            <Text style = {styles.checkoutButton} onPress = {() => {getFilteredData(); navigation.navigate('Cart', {screen: 'checkoutItems'})}}>Checkout</Text> 
                        </View>
                    </View>
                :   
                    <View style = {styles.emptyCon}>
                        <Text>The Cart is currently empty ...</Text>
                        <Text style = {styles.ShoppingButton } onPress = {() => navigation.navigate('Home', {screen: 'browse'})}>Let's go Shopin</Text>
                    </View>
                
            :
                null
            }
            
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card:{
        marginTop: 20,
        alignSelf: 'center',
        width: '95%',
        backgroundColor: 'white',
        elevation: 20,
    },
    checkoutButton:{
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
        flex: 1,

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

    totalPayable: {
        fontSize: 16,
        flex: 2,
        textAlign: 'right',
        marginRight: 10,
    },

    paymentContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },

    emptyCon:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})