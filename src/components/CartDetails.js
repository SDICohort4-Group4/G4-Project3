import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios'
import DisplayCartItem from '../components/displayCartItem.js'
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

export function CartDetails({navigation}){

    const {auth} = useContext(AuthContext);
    const {dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if(dbCartArray != undefined){
            setCartData([...dbCartArray]);
            setTotalPrice(TotalPayablePrice([...dbCartArray]))
        }
    },[dbCartArray])

    let checkoutData;

    // useEffect(() => {
    //     if(checkoutData != undefined){
    //         setCheckoutArray([...checkoutData])
    //     }
    // },[checkoutData])

    // function printValue(){
    //     console.log(dbCartArray, new Date)
    // }

    useFocusEffect(()=>{
        // redirect to login if no auth
        if (!auth) navigation.navigate('Account',{screen: 'Login'});
    })

    async function getFilteredData(){
        try {
            let accessToken = await SecureStore.getItemAsync('access')
            let decode = jwt_decode(accessToken)
            let cartArray
            cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
            checkoutData = [...(cartArray.data.data)].filter(index => index.item.Qty > 0 && (index.item.Qty >= index.itemQtyCart))
            setCheckoutArray([...checkoutData])
        } catch (error) {
            console.log(`CartDetail.js function getFilteredData, getCheckoutArrayData:`, error)
        }
        // return checkoutData
    }

    function TotalPayablePrice(itemData){
        let totalSummaryPrice = 0
        let itemSummaryPrice = null

        let spreadData = [...itemData]
        spreadData.forEach((data) => {
            if(!isNaN(data.itemQtyCart) || !isNaN(data.item) && data.item != undefined){
                if(data.item.Qty <= 0){

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
        <ScrollView contentContainerStyle = {{flexGrow: 1}} style = {{backgroundColor: '#fffaed'}}>
            <View style = {{flex: 1}}>
                {cartData.length > 0 ? 
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