import {Text, View, FlatList, Image, StyleSheet, Dimensions, Animated, ScrollView, TextInput} from "react-native";
import React,{useRef, useState, useEffect, useContext} from 'react';
import SelectorBar from './SelectorBar';
import {getCatList} from '../Api/Auth';
import RanCatDisplay from './RanCatDisplay';
import AuthContext from '../contexts/AuthContext';
import {getData as GetData} from "../Api/getData";

let windowWidth = Dimensions.get("screen").width;

export default function HomeMain({navigation}) {
    let {catList, setCatList, setFullList} = useContext(AuthContext);

    // used to prevent unnesssary rerendering of components when setting state to text
    let textInput;

    useEffect(()=>{
        (async function() {
            let responseFull = await GetData();
            setFullList(responseFull.data);
            let response = await getCatList();
            setCatList(response.data.data.cat1);
        })();
    }, [])

    // should find a way to do this without manually chaning the banner list, maybe an api call
    let bannerList = [
        'https://res.cloudinary.com/tgweesdi4/image/upload/v1657251553/Shopin_Ad_uzuph3.png',
        'https://res.cloudinary.com/tgweesdi4/image/upload/v1657251551/Skills_Union_Thank_You_Mini-Poster_yorfrf.png'
    ];

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

    //handle enter pressed to link to search page
    function handleSearch() {
        navigation.navigate('browse', {searchText: textInput});
    }

    //call back for selector bar
    function selectorFn(item) {
        navigation.navigate('browse', {searchCat: item});
    }

    return(
        <View style={{backgroundColor: "#fffaed", flex: 1}}>
            <TextInput placeholder="Search" style={styles.searchBar} onChangeText={(text)=> textInput = text} onSubmitEditing={handleSearch}/>
            <ScrollView contentContainerStyle={styles.container} > 
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