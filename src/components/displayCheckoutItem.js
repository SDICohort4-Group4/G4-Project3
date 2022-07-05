import { StyleSheet, Text, View, Image, Alert, Dimensions} from 'react-native';
import noImage from '../../assets/photo-soon.jpg';
import { Card, Button } from 'react-native-paper';
import { useState, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';

export default function displayCheckoutItems(props){
    return(
        <Card style = {styles.cardContainer}>
            <View style = {styles.itemContainer}>
                <View style = {styles.itemInfoContainer}>
                    <Text numberOfLines={3} style={{fontWeight: "bold"}}>{props.itemData.item.itemName}</Text>
                    <Text>Price: $ {parseFloat(props.itemData.item.itemPrice).toFixed(2)}</Text>
                </View>

                <View style={{justifyContent: "flex-end"}}>
                    <Text>{`Qty: ${props.itemData.itemQtyCart}`}</Text>
                </View>
            </View>
            <View style = {styles.subTotal}>
                <Text>{`Sub Total: $${props.itemData.item.Qty > 0? parseFloat((props.itemData.item.itemPrice) * props.itemData.itemQtyCart).toFixed(2): 0}`}</Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        padding: 10,
        flexDirection:"row",
        alignSelf: 'center',
        borderBottomWidth: 1,
        width: '100%',
    },
    itemInfoContainer:{
        textAlign: "center",
        width:"60%",
        paddingRight:5,
        paddingLeft: 5,
        flex: 1,
    },
    cardContainer: {
        margin: 3,
        backgroundColor: "rgba(52, 52, 52, 0.10)",
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