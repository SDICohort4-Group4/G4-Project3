import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions, Alert, Button } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import DisplayCartItem from '../components/displayCartItem.js'
import AuthContext from '../contexts/AuthContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function CartDetails({navigation}){

    let {auth, setAuth} = useContext(AuthContext);
    let {dbCartArray, setDBCartArray} = useContext(AuthContext)

    let [totalPrice, setTotalPrice] = useState()

    let [filterData, setFilterData] = useState(dbCartArray.filter(item => (
        item.itemName != undefined && 
        item.itemPrice > 0 && 
        item.Qty > 0 && 
        item.orderQty > 0 && 
        (item.Qty >= item.orderQty)
        )))
    
    // console.log(dbCartArray);
    // console.log(filterData);

    // useEffect(() => {
    // }, [dbCartArray, filterData])

    function TotalPayablePrice(itemData){
        let totalSummaryPrice = 0
        let itemSummaryPrice = null

        itemData.forEach((item) => {
            itemSummaryPrice = item.orderQty * item.itemPrice;
            totalSummaryPrice = totalSummaryPrice + itemSummaryPrice;
            // console.log(itemSummaryPrice)
            // console.log(totalSummaryPrice)
        })

        return totalSummaryPrice;
    }
  
    return(
        <ScrollView>
                {/* <Text>CartDetails component Start</Text> */}
                {auth === true?
                    <View>
                        {filterData.length > 0 ? 
                            <View>
                                {filterData.map((data, index)=>(
                                    <DisplayCartItem itemData = {data} navigation = {navigation} key = {index}/>
                                ))}
                                <Text>Total Price Payable: ${TotalPayablePrice(filterData).toFixed(2)}</Text>
                                <Text style = {styles.checkoutButton}>Checkout</Text>
                            </View>
                        :
                            <Text style = {styles.ShoppingButton}>Let's go Shopin</Text>}
                    </View>
                :
                    <Text style = {styles.loginButton}>Please Login</Text>}

                    {/* <View>
                        {filterData.length > 0 ? 
                            <View>
                                {filterData.map((data, index)=>(
                                    <DisplayCartItem itemData = {data} navigation = {navigation} key = {index}/>
                                ))}
                                <Text style = {styles.totalPayable}>Total Price Payable: ${TotalPayablePrice(filterData).toFixed(2)}</Text>
                                <Text style = {styles.checkoutButton}>Checkout</Text>
                            </View>
                        :
                            <Text style = {styles.ShoppingButton}>Let's go Shopin</Text>}
                    </View> */}
                {/* <Text>CartDetails component End</Text>  */}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    checkoutButton:{
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
        borderWidth: 0.02,
        borderRadius: 20,
        padding: 5,
        backgroundColor: "#FFD700",
        width: "80%",
        height: 40,
        marginTop: windowHeight * 0.01,
        marginBottom: windowHeight * 0.01,

    },
    ShoppingButton:{
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
        borderWidth: 0.02,
        borderRadius: 20,
        padding: 5,
        backgroundColor: "#FFD700",
        width: "80%",
        height: 40,
        marginTop: windowHeight * 0.40,
        marginBottom: windowHeight * 0.40,
    },
    loginButton:{
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
        borderWidth: 0.02,
        borderRadius: 20,
        padding: 5,
        backgroundColor: "#FFD700",
        width: "80%",
        height: 40,
        marginTop: windowHeight * 0.40,
        marginBottom: windowHeight * 0.40,
    },
    totalPayable: {
        fontSize: 20,
        
    }
})