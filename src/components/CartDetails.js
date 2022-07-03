import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { useState, useContext, useCallback, useEffect } from 'react';
import DisplayCartItem from '../components/displayCartItem.js'
import AuthContext from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export function CartDetails({navigation}){

    let {auth, setAuth} = useContext(AuthContext);
    let {dbCartArray, setDBCartArray} = useContext(AuthContext)

    const [totalPrice, setTotalPrice] = useState(0)

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
    // }, [dbCartArray, filterData])

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

    useFocusEffect(()=>{
        // redirect to login if no auth
        if (!auth) navigation.navigate('Account',{screen: 'Login'});
    })

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
                            <Text style = {styles.checkoutButton} onPress = {() => {printValue()}}>Checkout</Text> 
                        </View>
                    </View>
                :   
                    <View style={styles.emptyCon}>
                        <Text>The Cart is currently empty ...</Text>
                        <Text style = {styles.ShoppingButton } onPress = {()=> navigation.navigate('Home',{screen: 'browse'})}>Let's go Shopin</Text>
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
        width: '90%',
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
        paddingHorizontal: 20,
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