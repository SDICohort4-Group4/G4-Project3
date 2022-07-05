import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { useState, useContext, useCallback, useEffect } from 'react';
import DisplayCartItem from '../components/displayCartItem.js'
import AuthContext from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export function CartDetails({navigation}){

    const {auth} = useContext(AuthContext);
    const {dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext)

    const [totalPrice, setTotalPrice] = useState(0)
    const [filteredData, setFilteredData] = useState();

    const [grayOut, setGrayOut] = useState(false)

    // function checkoutList(){
    //     let checkoutArray = [...dbCartArray].filter(item => item.itemID != undefined)
    //     // console.log(checkoutArray)
    //     setDBCartArray(checkoutArray)        
    // }

    // let [filterData, setFilterData] = useState(dbCartArray.filter(item => (
    //     item.itemName != undefined && 
    //     item.itemPrice > 0 && 
    //     item.Qty > 0 && 
    //     item.orderQty > 0 && 
    //     (item.Qty >= item.orderQty)
    // )))
    
    // useEffect(() => {
    // }, [dbCartArray, checkoutArray])

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

    // setTotalPrice(TotalPayablePrice(filterData))
    function printValue(){
        console.log(dbCartArray, new Date)
    }

    // useEffect(() => {
    //     setDBCartArray(dbCartArray)
    // },[dbCartArray, checkoutArray])

    useFocusEffect(()=>{
        // redirect to login if no auth
        if (!auth) navigation.navigate('Account',{screen: 'Login'});
    })

    async function getFilteredData(){
        let accessToken = await SecureStore.getItemAsync('access')
        let decode = jwt_decode(accessToken)
        
        try {
            let cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
            let filteredData = [...(cartArray.data.data)].filter(index => index.item.Qty > 0 && (index.item.Qty >= index.itemQtyCart))
            setCheckoutArray(filteredData)
        } catch (error) {
            
        }
        // let cartArray = await axios.get(`https://sdic4-g4-project2.herokuapp.com/cart/${decode.id}}`)
        // let filteredData = [...(cartArray.data.data)].filter(index => index.item.Qty > 0 && (index.item.Qty >= index.itemQtyCart))
        // setCheckoutArray(filteredData)
        // console.log(checkoutArray, new Date)
    }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: '#fffaed'}}>
            {/* <Text>CartDetails component Start</Text> */}
            <View style={{flex: 1}}>
                {dbCartArray.length > 0 ? 
                    <View style={styles.card}>
                        {dbCartArray.map((data, index)=>(
                            <DisplayCartItem itemData = {data} navigation = {navigation} key = {index}/>
                        ))}
                        <View style={styles.paymentContainer}>
                            <Text style = {styles.totalPayable}>Total Price: ${TotalPayablePrice(dbCartArray).toFixed(2)}</Text>
                            {/* <Text style = {styles.checkoutButton} onPress = {() => {printValue(); navigation.navigate('Cart', {screen: 'checkoutItems'})}}>Checkout</Text>  */}
                                <Text style = {styles.checkoutButton} onPress = {() => {navigation.navigate('Cart', {screen: 'checkoutItems'}); getFilteredData()}}>Checkout</Text> 
                        </View>
                    </View>
                :   
                    <View style={styles.emptyCon}>
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