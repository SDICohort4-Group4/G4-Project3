import { StyleSheet, Text, View, Image, Alert} from 'react-native';
import noImage from "../../assets/photo-soon.jpg";
import DisplaySalePrice from "./displaySalePrice";
import { Card, Button } from "react-native-paper";

import AuthContext from '../contexts/AuthContext';
import {useContext } from 'react';

import axios from "axios";

export default function DisplayItem(props){

    let {auth, userData, dbCartArray, setDBCartArray} = useContext(AuthContext);

    function addToCart(itemName, orderQty, itemData){
        
        if(orderQty <= 0) {
            return
        };

        let cartArray = [...dbCartArray];
        let exists = false;

        for(let i = 0; i < cartArray.length; i++){
            if(cartArray[i].itemID == itemData.itemID){
                exists = true;
                let payload = null;

                if(cartArray[i].itemQtyCart + orderQty > itemData.Qty){
                    cartArray[i].itemQtyCart = itemData.Qty
                } else {
                    cartArray[i].itemQtyCart = cartArray[i].itemQtyCart + orderQty;
                }
                payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: cartArray[i].itemQtyCart}
                axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
                break;
            }
        }
        
        if(exists == false){
            cartArray.push({
                item:{ 
                    itemName: itemData.itemName, 
                    itemPrice: itemData.itemPrice, 
                    Qty: itemData.Qty, itemPic1: 
                    itemData.itemPic1
                }, 
                itemQtyCart: orderQty, 
                itemID: itemData.itemID,
                userID: userData.userID,
            })
            // updateCartItem(userData.userID, itemData.itemID, orderQty)
            let payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: orderQty}
            axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
        }

        setDBCartArray(cartArray)
        // console.log(dbCartArray)
        // console.log(cartArray)
    
        return(Alert.alert(
            "Added to cart.",
            `Amount : ${orderQty}x ${itemName}
            \nPrice: $${(orderQty * itemData.itemPrice).toFixed(2)}`,
            [{text: "Accept"}],
            {cancelable: true}
        ))
    }

    // function updateCartItem(userID, itemID, itemQtyCart){
    //     const dataType = `/cart/save`
    //     const payload = {
    //         userID: userID, 
    //         itemID: itemID, 
    //         itemQtyCart: itemQtyCart
    //     }
    //     console.log(dataType)
    //     console.log(payload)
    //     updateCartData(dataType, payload)
    // }

    return(
        <Card onPress = {()=>props.navigation.navigate('itemDetails', {itemData: props.itemData})}
            style = {styles.cardContainer}>
            <View>
                <View style = {styles.itemContainer}>
                    {props.itemData.itemPic1? 
                        <Image style={styles.image1} source = {{uri:(props.itemData.itemPic1)}}></Image>
                    :
                        <Image style={styles.image1} source = {noImage}></Image>
                    }
                
                    <View style = {styles.itemInfoContainer}>
                        <Text style = {styles.itemText1}>{props.itemData.itemName}</Text>
                    
                        {props.itemData.onSale==="NONE"? 
                            <Text style = {styles.itemText2}>Price: ${parseFloat(props.itemData.itemPrice).toFixed(2)}{"\n"}</Text>
                        : 
                            <DisplaySalePrice 
                                itemPrice={props.itemData.itemPrice}
                                salePrice={props.itemData.itemSalePrice} 
                                onSale={props.itemData.onSale}
                                itemDiscount={props.itemData.itemDiscount}
                            />
                        }

                        {/* {props.itemData.Qty>0? 
                            <Text 
                                style = {styles.itemTextBlue}
                                onPress = {() =>   Alert.alert(
                                    `${props.itemData.itemName}`,
                                    `Item: ${props.itemData.itemDescription}
                                    \nPrice: $${parseFloat(props.itemData.itemPrice).toFixed(2)}
                                    \nBrand: ${props.itemData.brand}
                                    \nCategory: ${props.itemData.itemCategory1}, ${props.itemData.itemCategory2}`,
                                    [
                                        props.itemData.Qty > 0 ? {
                                            text: "Add to Cart", 
                                            onPress: () => addToCart(props.itemData.itemName, 1, props.itemData),
                                        }:      
                                        {text: "Cancel"}, props.itemData.Qty > 0 ?{text: "Cancel",} : null
                                    ],
                                    {cancelable: true}
                                )}
                                // onLongPress = {() => Alert.alert(`LONNGGGGGGGGGGGGGGGGGGGGGGG Press`)}
                            >
                                In Stock <Text style = {styles.buyButton}>Buy Now!</Text></Text>
                            :
                                <Text style={styles.itemTextRed}>Oops, Sorry No Stock!</Text>
                        } */}
                        {props.itemData.Qty > 0? 
                            <Text 
                                style = {styles.itemTextBlue}
                                onPress = {() =>   Alert.alert(
                                    `${props.itemData.itemName}`,
                                    `Item: ${props.itemData.itemDescription}
                                    \nPrice: $${parseFloat(props.itemData.itemPrice).toFixed(2)}
                                    \nBrand: ${props.itemData.brand}
                                    \nCategory: ${props.itemData.itemCategory1}, ${props.itemData.itemCategory2}`,
                                    [
                                        props.itemData.Qty > 0 ? 
                                            (auth === true?
                                                {text: "Add to Cart", 
                                                    onPress: () => addToCart(props.itemData.itemName, 1, props.itemData),
                                                }
                                            :   
                                                {text: "Please login"})
                                        :
                                            null
                                    ],
                                    {cancelable: true}
                                )}
                                // onLongPress = {() => Alert.alert(`LONNGGGGGGGGGGGGGGGGGGGGGGG Press`)}
                            >
                                In Stock <Text style = {styles.buyButton}>Buy Now!</Text></Text>
                            :
                                <Text style={styles.itemTextRed}>Oops, Sorry No Stock!</Text>
                        }
                    </View>
                </View>
            </View>
        </Card> 
    )
}

const styles = StyleSheet.create({
    image1:{
        width:"50%",
        height:150,
        borderRadius: 10,
        backgroundColor:"white",
    },
    itemContainer:{
        flex:1,
        flexDirection:"row",
        marginHorizontal: 5,
        padding: 0, 
        alignSelf: 'center',
        padding: 8,
        borderRadius: 5,
        
    },
    itemInfoContainer:{
        margin:5,
        justifyContent:"center",
        width:"50%",
        paddingRight:5,
        paddingLeft: 5,
    },
    itemText1:{
        fontSize:13,
        fontWeight:"bold",
    },
    itemText2:{
        fontSize:14,
    },
    itemTextBlue:{
        fontSize:13,
        fontWeight:"bold",
        color:"blue",
    },
    itemTextRed:{
        fontSize:13,
        fontWeight:"bold",
        color:"#EEBABB",
    },
    cardContainer: {
        elevation: 0,
        padding: 0,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#f1e9cb',
        width: '95%',
        alignSelf: 'center',
        elevation: 5,
    },
    buyButton: {
        color: "#FDD100",
        fontSize: 16
    }
  
})