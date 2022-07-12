import { View, ScrollView, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios'
import DisplayCartItem from '../components/displayCartItem.js'
import { useFocusEffect, useCallback , useIsFocused} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

import AddCalcItemFinalPrice from '../helper/addCalcItemFinalPrice'
import TotalPayablePrice from '../helper/totalPayablePrice';
import { returnToPreviousScreen, returnToCartItems } from '../helper/returnTo.js'


export function CartDetails({navigation}){

    const {auth} = useContext(AuthContext);
    const {dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartData, setCartData] = useState([]);

    const isFocused = useIsFocused();

    const [showDisclaimer, setShowDisclaimer] = useState(false)

    useEffect(() => {
        if(dbCartArray != undefined){
            setShowDisclaimer(false)
            let withItemFinalPrice = AddCalcItemFinalPrice([...dbCartArray])
            setCartData([...withItemFinalPrice]);
            setTotalPrice(TotalPayablePrice([...withItemFinalPrice]))

            for(let i = 0; i < withItemFinalPrice.length; i++){
                if(withItemFinalPrice[i].itemQtyCart > withItemFinalPrice[i].item.Qty){
                    setShowDisclaimer(true)
                    break;
                }
            }
        }
    },[dbCartArray])

    let filteredData;
    let cartArray;

    // useFocusEffect(()=>{
    //     // redirect to login if no auth
    //     if (!auth) navigation.navigate('Account',{screen: 'Login'});
    // })

    //This basic useEffect with isFocused allows me to refresh the cartData states on page focus
    useEffect(() => {
        if(isFocused){
            if (!auth) navigation.navigate('Account',{screen: 'Login'});
            if(auth == true){
                // console.log('useEFfect[isFocused]')
                getUpdatedCartData()
            }
        }
    }, [isFocused])

    async function getUpdatedCartData(){
        try {
            let accessToken = await SecureStore.getItemAsync('access')
            let decode = jwt_decode(accessToken)
            cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
            // console.log([...cartArray.data.data], 'getUpdatedCartData', new Date)
            setDBCartArray([...cartArray.data.data])
        } catch (error) {
            if(error.response != undefined){
                if(error.response.status === 404){
                    console.log('CartDetails.js useEffect[isFocused]  Cart is empty', )
                }
                if(error.response.status !== 404) {
                    console.log('CartDetails.js useEffect[isFocused] if error not 404: ', error)
                    Alert.alert("Connection Timeout","Could not update the Cart")
                    setTimeout(() => {returnToPreviousScreen({navigation})},500)
                }
            } else {
                console.log('CartDetails.js useEffect[isFocused] : ', error)
                Alert.alert("Connection Timeout","Could not update the Cart")
                setTimeout(() => {returnToPreviousScreen({navigation})},500)
            }
        }
    }
    
    async function getCheckoutData(){
        try {
            let accessToken = await SecureStore.getItemAsync('access')
            let decode = jwt_decode(accessToken)
            let cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
            filteredData = [...(cartArray.data.data)].filter(index => index.item.Qty > 0)
            //Ensures that Checkout Qty's maximum is set to Available Qty
            for(let i = 0; i < filteredData.length; i++){
                if(filteredData[i].itemQtyCart > filteredData[i].item.Qty){
                    filteredData[i].itemQtyCart = filteredData[i].item.Qty
                }
            }
            // console.log(filteredData)
            setCheckoutArray([...filteredData])
        } catch (error) {
            Alert.alert("Connection Timeout","Could not get updated Checkout")
            setTimeout(() => {returnToCartItems()},1000)
            console.log(`CartDetail.js function getCheckoutData, getCheckoutArrayData:`, error)
        }
        // return filteredData
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
                        {showDisclaimer === true? <Text style = {styles.disclaimerText}>* Orders may only be partially filled</Text>: null}
                        <View style = {styles.paymentContainer}>
                            <Text style = {styles.totalPayable}>Total Price: ${totalPrice.toFixed(2)}</Text>
                            <Text style = {styles.checkoutButton} onPress = {() => {getCheckoutData(); navigation.navigate('Cart', {screen: 'checkoutItems'})}}>Checkout</Text> 
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
        marginTop: 5,
        marginBottom: 10,
    },

    emptyCon:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disclaimerText: {
        textAlign: 'right',
        marginHorizontal: 10,
        textAlignVertical: 'center',
        fontSize: 11,
        marginTop: 5,
    }
})