import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {useEffect, useState} from "react";
import GetData from "../components/getData";
import DisplayItem from "../components/displayitem";

export default function AccountScreen() {

    const [itemData,setItemData]=useState();

    useEffect(()=>{
      
        const dataType="/item/brand/mac"
        GetData({dataType,getItemData});
           
    },[]);

    function getItemData(data){
        setItemData(data);
    }

    return(
        <ScrollView>
            
            {itemData===undefined ? null 
            :
            <DisplayItem itemData={itemData}/>
            }
            
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
        
    }
})
