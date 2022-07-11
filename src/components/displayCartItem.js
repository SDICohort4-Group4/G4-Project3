import { StyleSheet, Text, View, Image, Alert, Dimensions} from 'react-native';
import { useState, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';
import axios from 'axios'
import noImage from '../../assets/photo-soon.jpg';
import { Card, Button } from 'react-native-paper';
import DisplaySalePrice from './displaySalePrice';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function DisplayCartItem(props){

    let {userData, dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext)
    
    async function removeItem(){
        // setCheckoutArray(cartArray);
        try {
            await axios.put(`https://sdic4-g4-project2.herokuapp.com/cart/delete/${userData.userID}/${props.itemData.itemID}`)
            let cartArray = [...dbCartArray]
            for(let i = 0; i < cartArray.length; i++){
                // console.log(cartArray[i])
                if(cartArray[i].itemID == props.itemData.itemID){
                    cartArray[i] = {}
                    cartArray.splice(i,1)
                    // console.log(cartArray)
                }
            }
            setDBCartArray(cartArray);
        } catch (error) {
            console.log('displayCartItem.js function removeItem, removeItemFromCart: ', error)
            Alert.alert("Connection Timeout","Could not remove item")
        }
        // setItemData({})
        // console.log(itemData)
    }

    return(
        <Card style = {styles.cardContainer}>
            <View >
                <View style = {styles.itemContainer}>

                    <Image style={styles.image1} source={props.itemData.item.itemPic1?{uri:(props.itemData.item.itemPic1)}: noImage}></Image>

                    <View style = {styles.itemInfoContainer}>
                        <Text numberOfLines={1} style={{fontWeight: "bold"}}>{props.itemData.item.itemName}</Text>

                        {props.itemData.item.Qty > 0? 
                            <Text>In stock</Text>:<Text>Out of stock</Text>
                        }
                        
                        {props.itemData.item.onSale === "NONE"?
                            <View style = {styles.priceContainer}>
                                <Text >Price:</Text>
                                <Text style = {{...styles.priceAmount}}>${parseFloat(props.itemData.itemFinalPrice).toFixed(2)}</Text>
                            </View>
                        :   
                            <View style = {styles.priceContainer}>
                                <Text>Price:</Text>
                                <Text style = {{...styles.strikeThrough, ...styles.priceAmount}}>${parseFloat(props.itemData.item.itemPrice).toFixed(2)}</Text>
                                <Text>${parseFloat(props.itemData.itemFinalPrice).toFixed(2)}</Text>
                            </View>

                        }
                        
                    </View>

                    <View style={{justifyContent: "flex-end"}}>
                        <Text>{`Qty: ${props.itemData.itemQtyCart}`}{(props.itemData.itemQtyCart > props.itemData.item.Qty)?<Text>*</Text>:null}</Text>
                    </View>
                </View>
                
                <View style={styles.subTotal}>
                    <Text style={styles.removeBtn} onPress = {()=> removeItem()}>Remove</Text> 
                    {/* <Text>{`Sub Total: $${parseFloat((props.itemData.item.itemPrice) * props.itemData.itemQtyCart).toFixed(2)}`}</Text> */}
                    <Text>{`Sub Total: $${props.itemData.item.Qty > 0? parseFloat((props.itemData.itemFinalPrice) * props.itemData.itemQtyCart).toFixed(2): 0}`}</Text>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    image1:{
        width: 65,
        height: 65,
        borderRadius: 5,
        backgroundColor:"white",
    },
    itemContainer:{
        padding: 10,
        flexDirection:"row",
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#D0B44F',
        width: '100%',
    },
    itemInfoContainer:{
        marginLeft: 10,
        textAlign: "center",
        width:"60%",
        paddingRight:5,
        paddingLeft: 5,
        flex: 1,
    },
    cardContainer: {
        margin: 5,
        backgroundColor: '#f1e9cb',
        width: '95%',
        alignSelf: 'center',
    },
    removeButton: {
        opacity: 0.2
    },
    subTotal:{
        flexDirection: 'row',
        justifyContent:'space-between',
        margin: 5,
        marginHorizontal:10,
    },

    removeBtn:{
        backgroundColor:'white',
        paddingHorizontal: 10,
        borderRadius: 3,
        elevation: 2,
    },
    strikeThrough: {
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
    },
    priceContainer: {
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    priceAmount: {
        marginHorizontal: 4
    }
})