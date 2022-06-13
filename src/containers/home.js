import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {useEffect, useState} from "react";
import GetData from "../components/getData";
import DisplayItem from "../components/displayitem";

export default function AccountScreen() {

    const [itemData,setItemData]=useState();

    useEffect(()=>{
      
        const dataType="/item/"
        GetData({dataType,getItemData});
           
    },[]);

    function getItemData(data){
        setItemData(data);
    }

    return(
        <ScrollView style={styles.container}>
            
            {itemData===undefined ? null 
            :
            itemData.map((itemData, index)=>(
                <DisplayItem itemData={itemData} key={index}/>
            ))
            }
            
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"yellow",
    }
})
