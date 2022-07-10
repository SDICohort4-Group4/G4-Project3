import { StyleSheet, Text, View, Image, Alert, Modal} from 'react-native';
import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from "axios";
import noImage from "../../assets/photo-soon.jpg";
import DisplaySalePrice from "./displaySalePrice";
import { Card } from "react-native-paper";

let height = 100;

export default function DisplayItem(props){

    const {auth, userData, dbCartArray, setDBCartArray} = useContext(AuthContext);
    const [addCartModalVisible, setAddCartModalVisible] = useState(false)

    function addToCart(orderQty, itemData){
        
        if(orderQty <= 0) {
            return
        };

        let cartArray = [...dbCartArray];
        let exists = false;

        //Update Qty in cartArray & cart DB if itemID already exists in cartArray
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
                try {
                    axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
                } catch (error) {
                    console.log(`displayItem.js addToCart, updateCartQty:`, error)
                }
                break;
            }
        }
        
        //Push new item to cartArray & cart DB if itemID doesn't already exist cartArray
        if(exists == false){
            cartArray.push({
                item:{ 
                    itemName: itemData.itemName, 
                    itemPrice: itemData.itemPrice, 
                    Qty: itemData.Qty, 
                    itemPic1: itemData.itemPic1,
                    onSale: itemData.onSale,
                    itemDiscount: itemData.itemDiscount,
                    itemSalePrice: itemData.itemSalePrice,
                }, 
                itemQtyCart: orderQty, 
                itemID: itemData.itemID,
                userID: userData.userID,
            })
            // updateCartItem(userData.userID, itemData.itemID, orderQty)
            let payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: orderQty}
            try {
                axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
            } catch (error) {
                console.log(`displayItem.js addToCart, pushNewToCart;`, error)
            }
        }

        setDBCartArray(cartArray)
        // console.log(dbCartArray)
        // console.log(cartArray)
    
        // return(
        //     Alert.alert(
        //         "Added to cart",
        //         `Amount : ${orderQty}x ${itemData.itemName}`,// Price: $${(orderQty * itemData.itemPrice).toFixed(2)}
        //         [{text: "Accept"}],
        //         {cancelable: true}
        //     )
        // )
        setAddCartModalVisible(true);
        setTimeout(() => {setAddCartModalVisible(false)},500)
    }

    function quickAdd() {
        Alert.alert(`${props.itemData.itemName}`,
        `Item: ${props.itemData.itemDescription}
        \nPrice: $${props.itemData.onSale === "PERCENTAGE"?
            parseFloat(props.itemData.itemPrice * (1 - (props.itemData.itemDiscount/100))).toFixed(2)
        :   
            props.itemData.onSale === "DOLLAR" ? 
                parseFloat(props.itemData.itemSalePrice).toFixed(2)
            :
                parseFloat(props.itemData.itemPrice).toFixed(2)
        }
        \nBrand: ${props.itemData.brand}
        \nCategory: ${props.itemData.itemCategory1}, ${props.itemData.itemCategory2}`,
        [
            props.itemData.Qty > 0 ? 
                (auth?
                    {text: "Add to Cart", 
                        onPress: () => addToCart(1, props.itemData),
                    }
                :   
                    {text: "Please login",
                        onPress: () => (props.navigation.navigate('Account',{screen: 'Login'}))})
            :
                null
        ],
        {cancelable: true})
    }

    function AddToCartModal(){
        return(
            <Modal                
                visible = {addCartModalVisible}
                transparent = {true}
                onRequestClose = {() => setAddCartModalVisible(false)}>
                <View style = {styles.modalView}>
                    <View style = {styles.iconContainer}>
                        <>
                            <Text style={{fontSize: 16, color:'white', fontWeight: 'bold'}}>Added to cart</Text>
                        </>
                    </View>
                </View>
            </Modal>
        )
    }

    return(
        <Card onPress = {()=>props.navigation.navigate('itemDetails', {itemData: props.itemData})}
            style = {styles.cardContainer}>
            <AddToCartModal/>
            <View>
                <View style = {styles.itemContainer}>
                <Image style={styles.image1} source={props.itemData.itemPic1?{uri: props.itemData.itemPic1}: noImage} />
                
                    <View style={styles.itemInfoContainer}>
                        <Text numberOfLines={2} style={styles.itemText1}>{props.itemData.itemName}</Text>
                    
                        {props.itemData.onSale==="NONE"? 
                            <Text style = {styles.itemText2}>Price: ${parseFloat(props.itemData.itemPrice).toFixed(2)}{"\n"}</Text>: 
                            <DisplaySalePrice 
                                itemPrice={props.itemData.itemPrice} 
                                salePrice={props.itemData.itemSalePrice} 
                                onSale={props.itemData.onSale} 
                                itemDiscount={props.itemData.itemDiscount} 
                            />
                        }
   
                        <View style={styles.btmRow}>
                            {props.itemData.Qty > 0?
                                <><Text style = {styles.itemTextBlue}>In Stock</Text>
                                <Text style = {styles.buyButton} onPress = {quickAdd}>Quick Add</Text></>:
                                <Text style={styles.itemTextRed}>Out of stock</Text>
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Card> 
    )
}

const styles = StyleSheet.create({
    image1:{
        height: height,
        width: height * 4/3,
        borderRadius: 5,
        backgroundColor:"white",
    },
    itemContainer:{
        flexDirection:"row",
        alignSelf: 'center',
        padding: 8,
    },
    itemInfoContainer:{
        marginLeft: 10,
        justifyContent:"space-between",
        flex: 1,
    },
    itemText1:{
        fontSize:13,
        fontWeight:"bold",
    },
    itemText2:{
        fontSize:14,
    },
    itemTextBlue:{
        fontSize:14,
        fontWeight:"bold",
        color:"white",
        backgroundColor: "blue",
        paddingHorizontal: 5,
        borderRadius: 3,

    },
    itemTextRed:{
        fontSize:14,
        fontWeight:"bold",
        color:"white",
        backgroundColor: "#fc6265",
        paddingHorizontal: 5,
        borderRadius: 3,
    
    },
    cardContainer: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#f1e9cb',
        width: '90%',
        alignSelf: 'center',
        elevation: 3,
        
    },
    buyButton: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#fcf5cf',
        padding: 5,
        borderRadius: 5,
        elevation: 1,
    },

    btmRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    modalView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer:{
        backgroundColor: '#00000060',
        width: "50%",
        height: "10%",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
  
})