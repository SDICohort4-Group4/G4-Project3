import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {getCatList} from '../Api/Auth'

export default function SelectorBar({list, navigation, callBackFn}){

    function renderItem({item}) {

        return(
            <Text onPress={()=>callBackFn(item)} style={styles.catText}>{item}</Text>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <FlatList horizontal data={list} renderItem={renderItem} showsHorizontalScrollIndicator={false}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 5,
    },

    tabContainer:{
        alignSelf: "center",
        width: "90%",
        height: 35,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 5,
        padding: 5,
        elevation: 3,
    },

    catText:{
        paddingHorizontal: 10,
        minWidth: 50,
        backgroundColor: '#fcf1d9',
        marginHorizontal: 5,
        borderRadius: 5,
        textAlign: "center",
        textAlignVertical: "center",
    },


})