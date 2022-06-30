import { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, TextInput, Button, Alert, Dimensions, Modal } from 'react-native';
import AuthContext from '../contexts/AuthContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function addToCart(itemName, orderQty, itemData){
        
    if(orderQty <= 0) {
        return
    };

    //Cannot use these hooks in this component. It will cause React to throw errors
    // let {auth, setAuth} = useContext(AuthContext);   
    // let {dbCartArray, setDBCartArray} = useContext(AuthContext);

    return(Alert.alert(
        "Added to cart.",
        `Amount : ${orderQty}x ${itemName}
        \nPrice: $${(orderQty * itemData.itemPrice).toFixed(2)}
        \nItemID: ${itemData.itemID}`,
        [{text: "Accept"}],
        {cancelable: true}
    ))
}