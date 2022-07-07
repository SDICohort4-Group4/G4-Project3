import { StyleSheet, Text, View, Image, Alert, Dimensions} from 'react-native';
import { useState, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';
import { Card, Button } from 'react-native-paper';


export default function displayHistoryItems(props){
    return(
        <Card style = {styles.cardContainer}>
            <View style = {styles.itemContainer}>
                <View style = {styles.itemInfoContainer}>
                    {/* <Text numberOfLines = {3} style = {{fontWeight: "bold"}}>{props.itemData.itemName}</Text>
                    <Text>Price: $ {parseFloat(props.itemData.buyPrice).toFixed(2)}</Text> */}
                    <Text>ItemName</Text>
                    <Text>buyPrice</Text>
                </View>
                <View style = {{justifyContent: "flex-end"}}>
                    {/* <Text>{`Qty: ${props.itemData.buyQty}`}</Text> */}
                    <Text>buyQty</Text>
                </View>
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