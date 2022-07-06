import {Text, View, FlatList, Image, StyleSheet, Dimensions, Animated, ScrollView, TextInput} from "react-native";
import React,{useRef, useState, useEffect} from 'react';
import SelectorBar from './SelectorBar';
import {getCatList} from '../Api/Auth';
import RanCatDisplay from './RanCatDisplay';

let windowWidth = Dimensions.get("screen").width;

export default function HomeMain({navigation}) {

    let [catList, setCatList] = useState([]);
    let [searchText, setSearchText] = useState();

    useEffect(()=>{
        (async function() {
            let response = await getCatList();
            setCatList(response.data.data.cat1);
        })();
    }, [])

    // should find a way to do this without manually chaning the banner list, maybe an api call
    let bannerList = [
        'https://www.elegantthemes.com/blog/wp-content/uploads/2017/04/divi-images-featured.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/16x9_by_Pengo.svg/1280px-16x9_by_Pengo.svg.png'
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
        navigation.navigate('browse', {searchText: searchText});
    }


    return(
        <View style={{backgroundColor: "#fffaed", flex: 1}}>
            <TextInput placeholder="Search" style={styles.seachBar} onChangeText={(text)=>setSearchText(text)} onSubmitEditing={handleSearch}/>
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

                <SelectorBar list={catList} navigation={navigation}/>
                <RanCatDisplay list={catList} navigation={navigation}/>
            </ScrollView>
        </View>
    )
}
 
const styles = StyleSheet.create({

    container:{
        backgroundColor: '#fffaed',
    },

    seachBar:{
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