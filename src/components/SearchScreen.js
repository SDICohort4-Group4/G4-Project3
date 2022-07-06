import { StyleSheet, View, Text, ScrollView, RefreshControl, ActivityIndicator, TextInput } from "react-native";
import {useCallback, useEffect, useState, useContext} from "react";
import {getData as GetData} from "../Api/getData";
import DisplayItem from "../components/displayItem.js";
import PriceSortButton from "../components/priceSortButton";
import AuthContext from '../contexts/AuthContext';
import SelectorBar from "./SelectorBar";


export default function SearchScreen({route, navigation}) {
    let {catList, fullList, setFullList} = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [priceSortASC, setpriceSortASC]=useState(true); //true=price is sorted in ASC order, else sort in DESC order
    const [catergory, setCategory] = useState(null);

    

    useEffect(()=>{
        (async function() {
            setFilterData([...fullList]);
            setCategory(route.params.searchCat);
            setSearchText(route.params.searchText);
        })();
    },[]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        (async function() {
            let response = await GetData();
            setFullList(response.data);
            setFilterData([...response.data]);
            setpriceSortASC(true)
        })();
        setRefreshing(false);
    },[])
    
    //use effect to reload filter data 
    useEffect(()=>{
        // first check for category filter
        let filtered = [...fullList];

        if(catergory) {
            filtered = [...filtered].filter((obj)=> obj.itemCategory1.toUpperCase().includes(catergory.toUpperCase()));
        }

        if(searchText) {
            filtered = [...filtered].filter((obj) => obj.itemName.toUpperCase().includes(searchText.toUpperCase()));
        }

        setFilterData(filtered);
    }, [searchText, catergory])

    function priceSort(){
        let sorted=null;
        if(!priceSortASC){
            sorted=[...filterData].sort((a,b)=>{return a.itemPrice-b.itemPrice})           
        } else {
            sorted=[...filterData].sort((a,b)=>{return b.itemPrice-a.itemPrice})            
        }
        setFilterData(sorted);
    }

    //call back for selector 
    function selectorFn(item){
        // can use this to set catergory
        setCategory(item)
    }

    //handle enter pressed, to change search
    function handleSearch() {
        navigation.navigate('browse', {searchText: searchText});
    }

    function handleRemoveCat(){
        setCategory(null);
    }

    return(
        <>
        <View style = {styles.container1}>
        <TextInput placeholder="Search" style={styles.searchBar} onChangeText={(text)=>setSearchText(text)} onSubmitEditing={handleSearch} value={searchText}/>
            <View style={styles.categoryBar}>
                <SelectorBar list={catList} navigation={navigation} callBackFn={selectorFn}/>
                {catergory?<View style={styles.selectedCatCon}>
                    <Text style={styles.selectedHeader}>Applied filters: </Text>
                    <Text onPress={handleRemoveCat} style={styles.selectedCatText}>{catergory}</Text>
                </View>: null}
            </View>
            <PriceSortButton priceSortASC={priceSortASC} setpriceSortASC={setpriceSortASC} priceSort={priceSort}/>
        </View>
        
        <ScrollView 
            style = {styles.container2}
            refreshControl = {
                <RefreshControl refreshing = {refreshing} onRefresh = {onRefresh}/>
            }>
            
            {fullList === undefined? 
                <ActivityIndicator size = "large"/>:
                filterData?.map((filteredData, index)=>(
                    <DisplayItem itemData={filteredData} navigation={navigation} key={index}/>
                ))
            }
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container1:{
        backgroundColor:"#fffaed",
        alignItems:"center",
        
    },
    container2:{
        backgroundColor:"#fffaed",
    },

    searchBar:{
        width: "90%",
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: "white",
        elevation: 5,
        padding: 5,
        fontSize: 16,
        paddingHorizontal: 10,
    },

    categoryBar:{
        width: '100%',
        marginTop: 5,
    },

    selectedCatCon: {
        marginTop: 10,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 3,
        justifyContent: "flex-start",
        alignItems: "center",
        height: 35,
        width: '90%',
        alignSelf: "center",
        flexDirection: "row"
    },

    selectedCatText:{
        paddingHorizontal: 10,
        minWidth: 50,
        backgroundColor: '#fcf1d9',
        marginHorizontal: 5,
        borderRadius: 5,
        textAlign: "center",
        textAlignVertical: "center",
        padding: 3,
    },

    selectedHeader:{
        height: '100%',
        minWidth: 100,
        backgroundColor: '#fcf1d9',
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 16,
        padding: 5,
    },

})