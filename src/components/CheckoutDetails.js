import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';

import DisplayCheckoutItems from './displayCheckoutItem';
import PaymentScreen from './PaymentScreenStripe';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import AddCalcItemFinalPrice from '../helper/addCalcItemFinalPrice';
import TotalPayablePrice from '../helper/totalPayablePrice';
import countdownTimerLong from '../helper/countdownTimerLong';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export function CheckoutDetails({navigation}){
    const {userData, dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext);
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkoutData, setCheckoutData] = useState([]);

    const [longTimer, setLongTimer] = useState(60)
    const [shortTimer, setShortTimer] = useState(15)

    let isFocused = useIsFocused()
    
    useEffect(() => {
        if(checkoutArray != undefined){
            let filteredData = [...checkoutArray].filter(index => index.item.Qty > 0)
            //Ensures that Checkout Qty's maximum is set to Available Qty
            for(let i = 0; i < filteredData.length; i++){
                if(filteredData[i].itemQtyCart > filteredData[i].item.Qty){
                    filteredData[i].itemQtyCart = filteredData[i].item.Qty
                }
            }
            let withItemFinalPrice = AddCalcItemFinalPrice([...filteredData])
            setCheckoutData(withItemFinalPrice);
            // console.log(filteredData);
            setTotalPrice(TotalPayablePrice([...withItemFinalPrice]));
        }
    }, [checkoutArray])

    // on blur pop till first page
    useFocusEffect(
        useCallback( ()=>{
            return ()=>{
                if (navigation.getState().index == 1) navigation.popToTop();
            };
        },[navigation])
    )

    useEffect(() => {
        countdownTimerLong(longTimer, navigation, setLongTimer);
        // shortCountdownTImer(longTimer, navigation, setLongTimer);
    },[isFocused])

    return(
        <View style = {{flex: 1}}>
            {checkoutArray?.length > 0 ? 
                <View>            
                    <View style = {styles.ccContainer}>
                        <PaymentScreen navigation={navigation} 
                                        userData={userData} 
                                        totalPrice={totalPrice}
                                        checkoutData={checkoutData} 
                                        setDBCartArray={setDBCartArray} 
                                        setCheckoutArray={setCheckoutArray}/>
                        <View style = {styles.paymentContainer}>
                            <Text style = {styles.totalPayableLabel}>Total Payable:</Text>
                            <Text style = {styles.totalPayablePrice}>${totalPrice.toFixed(2)}</Text>
                        </View>
                        <Text style = {styles.countdownTimer}>Timeout in {longTimer} seconds</Text>

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
                    {/* {returnPage()} */}
                    <Text>No items available for checkout</Text>
                    <Text style = {styles.ShoppingButton} onPress = {() => {navigation.navigate('cartItems')}}>Go back to Cart</Text>
                    <Text style = {styles.countdownTimer}>Return to Cart in {longTimer} seconds</Text>
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
    totalPayableLabel: {
        fontSize: 20,
        flex: 1,
        textAlign: 'right',
    },
    totalPayablePrice: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
    },
    paymentContainer:{
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 2,
        // borderWidth: 1
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
    countdownTimer:{
        color: "grey",
        textAlign: "center",
    }

})