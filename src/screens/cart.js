import { StyleSheet, Text, View, TextInput } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import { useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {CartDetails} from '../components/CartDetails.js'
import {LoginStack} from "../screens/account.js"

const CartDetailStack = createNativeStackNavigator();

function CartStack() {
    return (
        <NavigationContainer independent = {true}>
            <CartDetailStack.Navigator screenOptions={{
                                        animation: "slide_from_right",
                                        headerStyle:{height:60, backgroundColor: "#D1920D"},
                                        headerTitleStyle: {color: 'white'},
                                        }}>
                <CartDetailStack.Screen 
                name = "Cart" 
                component = {CartDetails} 
                    options = {{
                    title: "Cart"}} ></CartDetailStack.Screen>
            </CartDetailStack.Navigator>
        </NavigationContainer>
    )
}

export default function CartScreen(){
    const {auth} = useContext(AuthContext);

    return(
        <>
            {auth? 
                <CartStack/>
            : 
                <LoginStack/>
            }

            {/* <CartStack/> */}
        </>

    )
}