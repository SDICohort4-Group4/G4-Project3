import { StyleSheet, Text, View, Image, Alert, Dimensions} from 'react-native';
import { useState, useContext } from 'react'
import AuthContext from '../contexts/AuthContext';
import { Card, Button } from 'react-native-paper';


export default function displayHistoryItems(props){
    function yyyymmdd(date){
        let removedTime = date.slice(0,10)
        return removedTime;
    }

    function timeOnly(date){
        let removedDate = date.slice(11,16)
        return removedDate;
    }
    // console.log(props.itemData.createdAt)
    return(
        <Card style = {styles.cardContainer}>
            <View style = {styles.itemContainer}>
                <View style = {styles.itemInfoContainer}>
                    <Text numberOfLines = {3} style = {{fontWeight: "bold"}}>{props.itemData.itemName}</Text>
                    <Text>Price: $ {parseFloat(props.itemData.buyPrice).toFixed(2)} each</Text>
                    <Text>Bought on: {yyyymmdd(props.itemData.createdAt)}, {timeOnly(props.itemData.createdAt)}</Text>
                </View>
                <View style = {{justifyContent: "flex-end"}}>
                    <Text>{`Qty: ${props.itemData.buyQty}`}</Text>

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
        margin: 0.5,
        backgroundColor: "rgba(52, 52, 52, 0.10)",
        width: '95%',
        alignSelf: 'center',
    }
})