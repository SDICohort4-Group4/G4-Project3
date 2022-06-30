import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions, Alert, Button } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import DisplayCartItem from '../components/displayCartItem.js'
import AuthContext from '../contexts/AuthContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function CartDetails({navigation}){

    let {auth, setAuth} = useContext(AuthContext);
    let {DBcartArray, setDBCartArray} = useContext(AuthContext)

    let [totalPrice, setTotalPrice] = useState()

    let [filterData, setFilterData] = useState(DBcartArray.filter(item => (item.itemName != undefined && item.itemPrice > 0 && item.stock > 0 && item.qty > 0 && item.stock >= item.qty)))

    return(
        <ScrollView>
            <View>
                <Text>CartDetails component Start</Text>
                    {/* {console.log(tempCartArray)} */}
                    {filterData.map((data, index)=>(
                        <DisplayCartItem itemData = {data} navigation = {navigation} key = {index}/>
                    ))}

                <Text>CartDetails component End</Text>
                {/* {auth === true ? 
                    (DBcartArray.length > 0? 
                    <Text style = {styles.checkoutButton}>Checkout</Text> 
                : 
                    <Text style = {styles.ShoppingButton}>Let's go Shopin</Text>)
                :
                    <Text>Please Login</Text>
                } */}

                
            </View>
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
        marginBottom: windowHeight * 0.01,
    }

})