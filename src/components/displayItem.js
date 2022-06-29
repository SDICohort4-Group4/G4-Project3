import { StyleSheet, Text, View, Image, Alert} from 'react-native';
import noImage from "../../assets/photo-soon.jpg";
import DisplaySalePrice from "./displaySalePrice";
import { Card, Button } from "react-native-paper";

export default function DisplayItem(props){

    return(
        <Card onPress = {()=>props.navigation.navigate('itemDetails', {itemInfo: props.itemData})}
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
                            <Text style = {styles.itemText2}>Price: ${props.itemData.itemPrice}{"\n"}</Text>
                        : 
                            <DisplaySalePrice 
                                itemPrice={props.itemData.itemPrice}
                                salePrice={props.itemData.itemSalePrice} 
                                onSale={props.itemData.onSale}
                                itemDiscount={props.itemData.itemDiscount}
                            />
                        }
                    
                        {props.itemData.Qty>0? 
                            <Text 
                                style = {styles.itemTextBlue}
                                onPress = {() =>   Alert.alert(
                                    `${props.itemData.itemName}`,
                                    `Item: ${props.itemData.itemDescription}
                                    \nBrand: ${props.itemData.brand}
                                    \nCategory: ${props.itemData.itemCategory1}, ${props.itemData.itemCategory2}
                                    \nIn-stock: ${props.itemData.Qty}
                                    \nSKU: ${props.itemData.SKU}`,
                                    [
                                        props.itemData.Qty > 0 ? {
                                            text: "Add to Cart", 
                                            onPress: () => Alert.alert(
                                                "Added to cart",
                                                null,
                                                [{text: "Okay"}],
                                                {cancelable:true}),
                                        }:      
                                        {text: "Cancel"}, props.itemData.Qty > 0 ?{text: "Cancel",} : null
                                    ],
                                    {cancelable: true}
                                )}
                                onLongPress = {() => Alert.alert(`LONNGGGGGGGGGGGGGGGGGGGGGGG Press`)}>
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