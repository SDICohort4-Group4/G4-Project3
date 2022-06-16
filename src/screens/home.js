import { StyleSheet, ScrollView, RefreshControl, ActivityIndicator, View, Image, Text } from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {getData as GetData} from "../components/getData";
import DisplayItem from "../components/displayitem.js";
import SearchBar from "../components/searchBar.js"
import CartIcon from "../../assets/cart-icon-gray.png"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from "../screens/product.js"
import ItemDetails from '../components/ItemDetails';
// import {searchData as SearchData} from "../components/getData";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const Stack = createNativeStackNavigator();

const ShopStack = createNativeStackNavigator();

function BrowseScreen({navigation}) {

    const [itemData, setItemData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [clicked, setClicked] = useState();
    const [filterData, setFilterData] = useState();

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
        setFilterData(data);
    }
    
    function searchChange(searchText) {
        setSearchText(searchText);

        if(searchText) {
            let filtered = [...itemData].filter((obj) => obj.itemName.toUpperCase().includes(searchText.toUpperCase()))
            setFilterData(filtered);
        };
    }



    return(
        <>
        <View style = {styles.container1}>
            <SearchBar
                searchChange = {searchChange}
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
            
            {itemData === undefined? 
                <ActivityIndicator size = "large"/>:
                filterData?.map((filteredData, index)=>(
                    <DisplayItem itemData = {filteredData} navigation={navigation} searchText={searchText} key = {index}/>
                ))
            }
        </ScrollView>
        </>
    )
}

export function HomeScreen() {
  
    return(
        <NavigationContainer independent={true}>
            <ShopStack.Navigator screenOptions={{headerShown: false, animation: "slide_from_right"}}>
                <ShopStack.Screen name='browse' component={BrowseScreen}/>
                <ShopStack.Screen name='itemDetails' component={ItemDetails}/>
            </ShopStack.Navigator>
        </NavigationContainer>       
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