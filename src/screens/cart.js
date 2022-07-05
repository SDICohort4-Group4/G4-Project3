import { StyleSheet, Text, View, TextInput } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import { useContext} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {CartDetails} from '../components/CartDetails.js'
import {CheckoutDetails} from '../components/CheckoutDetails.js'

const CartDetailStack = createNativeStackNavigator();

function CartStack() {
    return (
            <CartDetailStack.Navigator 
                screenOptions = {{
                    animation: "slide_from_right",
                    headerStyle: {height:60, backgroundColor: "#D1920D"},
                    headerTitleStyle: {color: 'white'},
                }}>
                <CartDetailStack.Screen 
                    name = "cartItems" 
                    component = {CartDetails} 
                    options = {{title: "Cart"}}
                >
                </CartDetailStack.Screen>
                <CartDetailStack.Screen
                    name = "checkoutItems"
                    component = {CheckoutDetails}
                    options = {{title: "Checkout"}}
                >
                </CartDetailStack.Screen>
            </CartDetailStack.Navigator>
    )
}

export default function CartScreen(){
    // const {auth} = useContext(AuthContext);
    return(
        <> 
            <CartStack/>
            {/* <CartStack/> */}
        </>

    )
}