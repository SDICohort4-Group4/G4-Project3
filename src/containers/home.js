import { StyleSheet, Text, View, Image } from 'react-native';
import {useEffect, useState} from "react";
import GetData from "../API/getData";


export default function AccountScreen() {

    const [itemData,setItemData]=useState([]);

    useEffect(()=>{
      
        const dataType="/item/sku/filletofish"
        GetData({dataType,getItemData});
    
    },[]);

    function getItemData(data){
        setItemData(data);
    }

    return(
        <>
        <View style={styles.container}>
         
            <Text>{itemData}</Text>
            {/* {console.log("itemData:",itemData)} */}
            {/* {console.log("picture URL:",itemData[0])} */}
            {/* <Image style={styles.image1} source={{uri:itemData.itemPic1}}></Image> */}
          
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf:"center",       
  
    },
    image1:{
        width:"50%",
        height:150,
    }
  });