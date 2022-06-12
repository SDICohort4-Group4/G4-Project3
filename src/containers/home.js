import { StyleSheet, Text, View, Image } from 'react-native';
import {useEffect, useState} from "react";
import GetData from "../API/getData";




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
        <View style={styles.container}>
          
            {itemData===undefined ? null 
            :
            <View style={styles.itemContainer}>
                <Image style={styles.image1} source={{uri:(itemData[0].itemPic1)}}></Image>
                <View style={styles.itemInfoContainer}>
                    <Text style={styles.itemText}>{itemData[0].itemName}</Text>
                    <Text style={styles.itemText}>Price: ${itemData[0].itemPrice}</Text>
                    <Text style={styles.itemText}>In Stock Buy Now!</Text>
                </View>
            </View>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignSelf:"center",       
        
    },
    image1:{
        width:"50%",
        height:150,
    },
    itemContainer:{
        flexDirection:"row",
    },
    itemInfoContainer:{
        // flexDirection:"column",
        margin:5,
        
    },
    itemText:{
        fontSize:15,
    }
  });