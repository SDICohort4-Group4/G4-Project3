import { StyleSheet, ScrollView, RefreshControl, TextInput } from 'react-native';
import {useCallback, useEffect, useState} from "react";
import GetData from "../components/getData";
import DisplayItem from "../components/displayitem";


export default function AccountScreen() {

    const [itemData, setItemData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, onChangeText] = useState();

    useEffect(() => {
      
        const dataType = "/item/"
        GetData({dataType,getItemData});
           
    },[]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const dataType = "/item/";
        GetData({dataType, getItemData});
        setRefreshing(false);
    },[])

    function getItemData(data){
        setItemData(data);
    }

    return(
        <ScrollView 
            style = {styles.container}
            refreshControl = {
                <RefreshControl refreshing = {refreshing} onRefresh = {onRefresh}/>
            }>
            
            <TextInput 
                style = {styles.searchBox}
                onChangeText = {onChangeText}
                value = {searchText}
            />
            
            {itemData === undefined ? null 
            :
            itemData.map((itemData, index)=>(
                <DisplayItem itemData = {itemData} key = {index}/>
            ))
            }
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FDD100",
    },
    searchBox:{
        borderRadius:20,
        width:250,
        height:30,
        backgroundColor:"#ffffc0",
        alignSelf:"center",
        marginTop:5,
        paddingLeft:10,
        paddingRight:10,
    }
})
