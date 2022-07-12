import {Text, View, FlatList, Image, StyleSheet, Dimensions, Animated, ScrollView, TextInput, RefreshControl} from "react-native";
import React,{useRef, useState, useEffect, useContext, useCallback} from 'react';
import SelectorBar from './SelectorBar';
import {getCatList} from '../Api/Auth';
import RanCatDisplay from './RanCatDisplay';
import AuthContext from '../contexts/AuthContext';
import {getData as GetData} from "../Api/getData";

let windowWidth = Dimensions.get("screen").width;

export default function HomeMain({navigation}) {
    let {catList, setCatList, setFullList} = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    // load data and save to global, on first render
    useEffect(()=>{
        (async function() {
            let responseFull = await GetData();
            setFullList(responseFull.data);
            let response = await getCatList();
            setCatList(response.data.data.cat1);
        })();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        (async function() {
            let responseFull = await GetData();
            setFullList(responseFull.data);
            let response = await getCatList();
            setCatList(response.data.data.cat1);
        })();
        setRefreshing(false);
    },[])

    // use deperate searchbar component to prevent rerendering of whole component
    function SearchBar() {
        let [textInput, setTextInput] = useState("");

        //handle enter pressed to link to search page
        function handleSearch() {
            navigation.navigate('browse', {searchText: textInput});
            setTextInput("");
        }

        return(
            <TextInput placeholder="Search" style={styles.searchBar} value={textInput} onChangeText={(text)=> setTextInput(text)} onSubmitEditing={handleSearch}/>
        )
    }

    // should find a way to do this without manually chaning the banner list, maybe an api call
    let bannerList = [
        'https://res.cloudinary.com/tgweesdi4/image/upload/v1657251553/Shopin_Ad_uzuph3.png',
        'https://res.cloudinary.com/tgweesdi4/image/upload/v1657251551/Skills_Union_Thank_You_Mini-Poster_yorfrf.png'
    ];

    //---------------------------------For flatlist of banners-----------------------------------------------------------

    function renderFunc({item}) {

        return (
            <Image style={styles.flatListImage} source={{uri: item}} />
        )
    }

    const scrollX = React.useRef(new Animated.Value(0)).current;

    function renderDot(list) {
        return(
            <>
            {list.map((_,idx) => {
                const inputRange = [(idx - 1) * windowWidth, idx * windowWidth, (idx + 1)* windowWidth ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8,16,8],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                })

                return <Animated.View style={[styles.dot, {width: dotWidth, opacity}]} key={idx.toString()} ></Animated.View>
            })}
            </>
        )
    }

    //----------------------------------------------------------------------------------------------------------------

    //callback for selector bar
    function selectorFn(item) {
        navigation.navigate('browse', {searchCat: item});
    }

    return(
        <View style={{backgroundColor: "#fffaed", flex: 1}}>
            <SearchBar />
            <ScrollView contentContainerStyle={styles.container}
            refreshControl = {<RefreshControl refreshing = {refreshing} onRefresh = {onRefresh}/>} > 
                <View style={styles.flatListCon}>
                    <Animated.FlatList 
                    snapToAlignment="start" 
                    snapToInterval={windowWidth*0.90}
                    decelerationRate={"fast"} 
                    pagingEnabled
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: false}
                    )}
                    horizontal data={bannerList} renderItem={renderFunc}
                    showsHorizontalScrollIndicator={false}/>
                    
                    <View style={styles.pagination}>
                        {renderDot(bannerList)}
                    </View>
                </View>

                <SelectorBar list={catList} navigation={navigation} callBackFn={selectorFn}/>
                <RanCatDisplay list={catList} navigation={navigation}/>
            </ScrollView>
        </View>
    )
}
 
const styles = StyleSheet.create({

    container:{
        backgroundColor: '#fffaed',
    },

    searchBar:{
        width: "90%",
        alignSelf: "center",
        margin: 20,
        borderRadius: 5,
        backgroundColor: "white",
        elevation: 5,
        padding: 5,
        fontSize: 16,
        paddingHorizontal: 10,
    },

    flatListCon:{
        width: windowWidth * 0.9,
        aspectRatio: 16/9,
        alignSelf: "center",
        borderRadius: 5,
        overflow: "hidden",
    },

    flatListImage: {
        width: windowWidth * 0.9,
        aspectRatio: 16/9,
    },

    dot:{
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: '#333',
        marginHorizontal: 3,
    },

    pagination:{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 10,
        alignSelf: "center"
    },
})