import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function ItemDetails({route, navigation}) {
    // check what data/format of data is given
    console.log(route.params.itemInfo);

    return(
        <View style={styles.container}>

            <View style={styles.imageCon}>
                <Image style={styles.image} source={{uri: route.params.itemInfo.itemPic1}}></Image>
            </View>

           
            <View style={styles.infoCon}>

            </View> 

            <View style={styles.buttonsCon}>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%', 
        backgroundColor: '#fffaed',
        
    },

    icon: {
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 100,
        elevation: 3,
    },
    
    imageCon:{
        flex: 5,
        width: '100%',
    },

    image:{
        width: '100%',
        height: '100%',
    },

    infoCon: {
        flex: 5,
        borderWidth: 1,
        width: '100%',
    },

    buttonsCon:{
        flex: 1
    },

    userDetails: {
        width: '90%',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        margin: 20,
        paddingVertical: 10,
        elevation: 10,
    },

  });