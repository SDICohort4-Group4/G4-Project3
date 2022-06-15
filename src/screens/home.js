import { StyleSheet, ScrollView, RefreshControl, ActivityIndicator,View, Image } from 'react-native';
import {useCallback, useEffect, useState} from "react";
import GetData from "../components/getData";
import DisplayItem from "../components/displayItem";
import SearchBar from "../components/searchBar"
import CartIcon from "../../assets/cart-icon.png"



export default function AccountScreen() {

    const [itemData, setItemData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [clicked, setClicked] = useState();

    useEffect(()=>{
      
        const dataType = "/item/"
        GetData({dataType, getItemData});
           
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
        <>
        <View style ={ styles.container1}>
            <SearchBar
                searchText = {searchText}
                setSearchText = {setSearchText}
                clicked = {clicked}
                setClicked = {setClicked}
            />
            <Image style = {styles.cartIconContainer} source = {CartIcon}/>
        </View>
        
        <ScrollView 
            style = {styles.container2}
            refreshControl = {
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
            
            {itemData === undefined ? <ActivityIndicator size = "large"/>
            :
            itemData.map((itemData, index)=>(
                <DisplayItem itemData = {itemData} key = {index}/>
            ))
            }
            
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container1:{
        backgroundColor:"#FDD100",
        flexDirection:"row",
        
    },
    container2:{
        backgroundColor:"#FDD100",
    },
    cartIconContainer:{
        width:40,
        height:40,
        position:"absolute",
        right:0,
        top:3,
        
    }

})