import { StyleSheet, Text, View, Image, Alert, Modal} from 'react-native';
import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from "axios";
import noImage from "../../assets/photo-soon.jpg";
import { Card } from "react-native-paper";
import DisplaySalePrice from "./displaySalePrice";
import addToCart from './addToCart';

let height = 100;

export default function DisplayItem(props){

    const {auth, userData, dbCartArray, setDBCartArray} = useContext(AuthContext);
    const [addCartModalVisible, setAddCartModalVisible] = useState(false)

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
                        onPress: () => addToCart(1, props.itemData, dbCartArray, setDBCartArray, setAddCartModalVisible, userData),
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
                            <Text style={{fontSize: 20, color:'white', fontWeight: 'bold'}}>Added to cart</Text>
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