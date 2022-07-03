import { StyleSheet, Text, View, Image, Alert, Dimensions} from 'react-native';
import noImage from '../../assets/photo-soon.jpg';
import DisplaySalePrice from './displaySalePrice';
import { Card, Button } from 'react-native-paper';
import { useState, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function DisplayCartItem(props, key){

    let {dbCartArray, setDBCartArray} = useContext(AuthContext)

    let [removedItem, setRemovedItem] = useState(false);

    function removeItem(){
        setRemovedItem(true);
        let cartArray = [...dbCartArray]
        for(let i = 0; i < cartArray.length; i++){
            // console.log(cartArray[i])
            if(cartArray[i].itemID == props.itemData.itemID){
                cartArray[i] = {}
                // cartArray.splice(i,1)
                // console.log(cartArray)
                setDBCartArray(cartArray)
            }
        }
        // setItemData({})
        // console.log(itemData)
    }



    return(
        <Card style = {styles.cardContainer}>
            {removedItem === false?
                <View >
                    <View style = {styles.itemContainer}>
    
                        <Image style={styles.image1} source={props.itemData.itemPic1?{uri:(props.itemData.itemPic1)}: noImage}></Image>
    
                        <View style = {styles.itemInfoContainer}>
                            <Text numberOfLines={1} style={{fontWeight: "bold"}}>{props.itemData.itemName}</Text>
    
                            {props.itemData.Qty > 0? 
                                <Text>In stock</Text>:<Text>Out of stock</Text>
                            }
    
                            <Text>Price: $ {parseFloat(props.itemData.itemPrice).toFixed(2)}</Text>
                            <Text onPress = {()=> removeItem()}>Remove</Text>
                        </View>
    
                        <View style={{justifyContent: "flex-end"}}>
                            <Text>{`Qty: ${props.itemData.orderQty}`}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.subTotal}>
                        <Text>{`Sub Total: $${parseFloat((props.itemData.itemPrice) * props.itemData.orderQty).toFixed(2)}`}</Text>
                    </View>
                </View>
            :
                <View>
                    <Text>Item was removed</Text>
                </View>
                
            }


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

    subTotal:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        margin: 5,
        marginHorizontal:10,
    },

    
})