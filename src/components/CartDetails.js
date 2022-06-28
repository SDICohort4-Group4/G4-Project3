import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-natiive';
import { useState, useEffect, useContext } from 'react';
import { DisplayCartItem } from '../components/displayCartItem.js'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function CartDetails({navigation}){

    let [tempCartArray, setCartArray] = useState(['Square', 'Circle', 'Triangle', "Non-euclidean space"])
    let [dbCartArray, setDBCartArray] = useState([]) //Need to use the API to pull from CartContents DB, filtering based on userID

    return(
        <ScrollView>
            <View>
                <Text>CartDetails component</Text>
                <View>
                    {tempCartArray.map((data) => {
                        <DisplayCartItem itemData = {data} navigation = {navigation}/>
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
})