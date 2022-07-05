import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import {getCat1Items} from '../Api/Auth';

export default function FlatListCat({catergory, navigation}) {

    // useEffect to get list of all item in category 
    let [catItems, setCatItems] = useState([]);

    useEffect(()=>{
        (async function() {
            let response = await getCat1Items(catergory);
            setCatItems((response.data.data).slice(0,5));
        })();
    }, [catergory])

    function renderFunc({item}){
        // every item should be an obj

        function handlePress() {
            navigation.navigate('itemDetails', {itemData: item});
        }

        return(
            <TouchableOpacity style={{flex: 1, justifyContent: "center"}} onPress={handlePress}>
                <View style={styles.subCon}>
                    <Image style={styles.subConImage} source={{uri: item?.itemPic1}}/>
                    <Text style={styles.subConText} numberOfLines={1}>{item?.itemName}</Text>
                    <Text style={[styles.subConText,{textAlign: "center"}]}>${item?.itemPrice}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return(
        <View style={styles.container}>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={catItems} renderItem={renderFunc}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    subCon:{
        height: 140,
        width: 120,
        marginHorizontal: 5,
        backgroundColor: 'white',
        justifyContent: "space-around",
        alignItems: "center",
        overflow: "hidden",
        elevation: 3,
        borderRadius: 5,
        alignSelf: "center",
    },

    subConImage:{
        height: 80,
        width: 100,
    },

    subConText:{
        width: 80,
    },
})