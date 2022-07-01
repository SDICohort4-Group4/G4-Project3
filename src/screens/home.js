import { StyleSheet, ScrollView, RefreshControl, ActivityIndicator, View, Image, Text, Pressable, TouchableHighlight } from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {getData as GetData} from "../Api/getData";
import DisplayItem from "../components/displayItem.js";
import SearchBar from "../components/searchBar.js"
import CartIcon from "../../assets/cart-icon-gray.png"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PriceSortButton from "../components/priceSortButton";
import ItemDetails from '../components/ItemDetails';
import {CartDetails} from '../components/CartDetails.js'


const ShopStack = createNativeStackNavigator();

function BrowseScreen({navigation}) {

    const [itemData, setItemData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [clicked, setClicked] = useState(); // status for whether search bar is clicked
    const [filterData, setFilterData] = useState();
    const [priceSortASC, setpriceSortASC]=useState(true); //true=price is sorted in ASC order, else sort in DESC order

    useEffect(()=>{
        const dataType = "/item/"
        GetData({dataType, getItemData});
             
    },[]);

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
        } else { setFilterData(itemData)}
        
    }

    function priceSort(){
        let sorted=null;
        if(!priceSortASC){
            sorted=[...filterData].sort((a,b)=>{return a.itemPrice-b.itemPrice})           
        } else {
            sorted=[...filterData].sort((a,b)=>{return b.itemPrice-a.itemPrice})            
        }
        setFilterData(sorted);
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
            <PriceSortButton priceSortASC={priceSortASC} setpriceSortASC={setpriceSortASC} priceSort={priceSort}/>
            {/* <Pressable 
                style = {styles.cartIconContainer} 
                onPress={() => navigation.navigate('cartDetails')}> */}
            {/* </Pressable> */}
            {/* <Image style = {styles.cartIconContainer} source = {CartIcon}/> */}
        </View>
        
        <ScrollView 
            style = {styles.container2}
            refreshControl = {
                <RefreshControl refreshing = {refreshing} onRefresh = {onRefresh}/>
            }>
            
            {itemData === undefined? 
                <ActivityIndicator size = "large"/>:
                filterData?.map((filteredData, index)=>(
                    <DisplayItem itemData = {filteredData} navigation={navigation} key = {index}/>
                ))
            }
        </ScrollView>
        </>
    )
}

export function HomeScreen() {
  
    return(
        <NavigationContainer independent = {true}>
            <ShopStack.Navigator screenOptions = {{ animation: "slide_from_right"}}>
                <ShopStack.Screen 
                name = 'browse' 
                component = {BrowseScreen}                     
                options = {{
                    title: "Let's go Shopin"}} />
                <ShopStack.Screen name = 'itemDetails' component = {ItemDetails}/>
                {/* <ShopStack.Screen name = 'cartDetails' component = {CartDetails} /> */}
            </ShopStack.Navigator>
        </NavigationContainer>       
    )
}

const styles = StyleSheet.create({
    container1:{
        backgroundColor:"#FDD100",
        flexDirection:"row",
        alignItems:"center",
        
    },
    container2:{
        backgroundColor:"#fffaed",
    },
    priceSortText:{
        fontSize:15,
        fontWeight:"bold",
        color:"blue",
    },
    cartIconContainer:{
        width:40,
        height:40,
        position:"absolute",
        right:0,
        // top:3,
    }

})