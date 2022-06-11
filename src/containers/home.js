import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from "react";
import GetData from "../API/getData";


export default function AccountScreen() {

    const [itemData,setItemData]=useState([]);

    useEffect(()=>{
      
        const dataType="/item/brand/intel"
        GetData({dataType,getItemData});
    
    },[]);

    function getItemData(data){
        setItemData(data);
    }

    return(
        <>
        <View style={styles.container}>
            <Text>Test Screen</Text>
            <Text>{itemData}</Text>
          
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf:"center",       
  
    }
  });