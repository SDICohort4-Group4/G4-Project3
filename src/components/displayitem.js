import { StyleSheet, Text, View, Image } from 'react-native';
import noImage from "../../assets/photo-soon.jpg";
import DisplaySalePrice from "./displaySalePrice";
import { Card, Title, Divider } from 'react-native-paper'


export default function DisplayItem(props){
    return(
        <Card
            containerStyle = {styles.cardContainer}
            onPress = {() => Alert.alert(`${props.itemData.itemName}`)}
            onLongPress = {() => Alert.alert(`LONNGGGGGGGGGGGGGGGGGGGGGGG Press`)}>

            <View style = {styles.itemContainer}>
                
                {props.itemData.itemPic1? 
                    <Image style = {styles.image1} source = {{uri: (props.itemData.itemPic1)}}></Image>
                :
                    <Image style = {styles.image1} source = {noImage}></Image>
                }
                
                <View style = {styles.itemInfoContainer}>
                    <Text style = {styles.itemText1}>{props.itemData.itemName}</Text>
                    
                    {props.itemData.onSale === "NONE"? 
                        <Text style = {styles.itemText2}>Price: ${props.itemData.itemPrice}{"\n"}</Text>
                    : 
                        <DisplaySalePrice 
                            itemPrice = {props.itemData.itemPrice}
                            salePrice = {props.itemData.itemSalePrice} 
                            onSale = {props.itemData.onSale}
                            itemDiscount = {props.itemData.itemDiscount}
                        />
                    
                    }
                    
                    {props.itemData.Qty > 0? 
                        <Text style = {styles.itemTextBlue}>In Stock Buy Now!</Text>
                    :
                        <Text style = {styles.itemTextRed}>Oops, Sorry No Stock!</Text>
                    }
                    
                </View>
            </View>
    </Card>
    )
}

const styles = StyleSheet.create({
    image1:{
        width:"50%",
        height:150,
        backgroundColor:"white",
    },
    itemContainer:{
        flex:1,
        flexDirection:"row",
        margin:5,
        backgroundColor:"#f1e9cb",
        
    },
    itemInfoContainer:{
        margin:5,
        justifyContent:"center",
        width:"50%",
        paddingRight:5,
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
        color:"red",
    },
    cardContainer: {
        elevation: 0,
        backgroundColor: "black",
        marginVertical: 4
    }
  
})