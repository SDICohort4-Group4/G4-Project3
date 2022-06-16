import { StyleSheet, ScrollView, RefreshControl, ActivityIndicator, View, Image, Text } from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {getData as GetData} from "../components/getData";
import DisplayItem from "../components/displayitem.js";
import SearchBar from "../components/searchBar.js"
import CartIcon from "../../assets/cart-icon-gray.png"

import Product from "../screens/product.js"
// import {searchData as SearchData} from "../components/getData";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const Stack = createNativeStackNavigator();

function BrowseScreen() {

    const [itemData, setItemData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [clicked, setClicked] = useState();

    useEffect(()=>{
      
        const dataType = "/item/"
        GetData({dataType, getItemData});
           
    },[]);

    // useEffect(() => {
    //     if(searchText != undefined || searchText != ''){
    //         const searchType = `/item/description/${searchText}`
    //         SearchData({searchType, searchItemData});
    //     }
    // },[]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const dataType="/item/";
        GetData({dataType,getItemData});
        setRefreshing(false);
    },[])

    function getItemData(data){
        setItemData(data);
    }

  
    return(
        <>
        <View style = {styles.container1}>
            <SearchBar
                setSearchText = {setSearchText}
                searchText = {searchText}
                clicked = {clicked}
                setClicked = {setClicked}
            />
            <Image style = {styles.cartIconContainer} source = {CartIcon}/>
        </View>
        
        <ScrollView 
            style = {styles.container2}
            refreshControl = {
                <RefreshControl refreshing = {refreshing} onRefresh = {onRefresh}/>
            }>
            
            {itemData === undefined ? <ActivityIndicator size = "large"/>
                :
                itemData.map((itemData, index)=>(
                    <DisplayItem itemData = {itemData} searchText={searchText} key = {index}/>
                ))
            }
        </ScrollView>
        </>
    )
}

export function HomeScreen() {
  
    return(
        <>
            <BrowseScreen/>
        </>

    )
}

const styles = StyleSheet.create({
    container1:{
        backgroundColor:"#FDD100",
        flexDirection:"row",
        
    },
    container2:{
        backgroundColor:"#fffaed",
    },
    cartIconContainer:{
        width:40,
        height:40,
        position:"absolute",
        right:0,
        top:3,
    }

})