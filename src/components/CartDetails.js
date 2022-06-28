import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions, Alert, Button } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import DisplayCartItem from '../components/displayCartItem.js'
import { concat } from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function CartDetails({navigation}){

    let [tempCartArray, setCartArray] = useState(
        [
            {itemName: 'Square', itemPrice: 1.70, qty: 10, stock: 100}, 
            {itemName: 'Circle', itemPrice: 100, stock: 50}, 
            {itemName: 'Triangle', itemPrice: 7, qty: 10}, 
            {itemName: 'Non-euclidean space', qty: 3, stock: 20},
            {itemName: 'Pentagon', itemPrice: 2.50, qty: 20, stock: 100},
            {itemName: 'Oreo McFlurry', itemPrice: 4, qty: 20, stock: 300},
            {itemName: 'Happy Meal', itemPrice: 3.5, qty: 50, stock: 2500},
            {itemName: '20pc McNuggets', itemPrice: 13.70, qty: 2, stock: 50},
            {itemName: 'Dbl Filet-O-Fish Extra Value Meal', itemPrice: 9, qty: 5, stock: 5},
        ])

    let [dbCartArray, setDBCartArray] = useState([{itemName:"Airship"}]) //Need to use the API to pull from CartContents DB, filtering based on userID

    let [combinedCartArray, setCombinedCartArray] = useState([]) //Need to use the API to pull from CartContents DB, filtering based on userID

    let [totalPrice, setTotalPrice] = useState()

    let [filterData, setFilterData] = useState(tempCartArray.filter(item => (item.itemName != undefined && item.itemPrice > 0 && item.stock > 0 && item.qty > 0 && item.stock >= item.qty)))

    return(
        <ScrollView>
            <View>
                <Text>CartDetails component Start</Text>
                    {/* {console.log(tempCartArray)} */}
                    {filterData.map((data, index)=>(
                        <DisplayCartItem itemData = {data} navigation = {navigation} key = {index}/>
                    ))}

                <Text>CartDetails component End</Text>
                {tempCartArray.length > 0? <Text style = {styles.checkoutButton}>Checkout</Text> : <Text style = {styles.ShoppingButton}>Let's go Shopin</Text>}
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    checkoutButton:{
        fontSize: 20,
        textAlign: "center"
    },
    ShoppingButton:{
        fontSize: 20,
        textAlign: "center"
    }
})