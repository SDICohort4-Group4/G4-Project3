import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import {getCat1Items} from '../Api/Auth';
import noImage from '../../assets/photo-soon.jpg';

export default function FlatListCat({catergory, navigation}) {

    // useEffect to get list of all item in category 
    let [catItems, setCatItems] = useState([]);

    // function to get n random item in list of category
    function getMultiRan(list, num) {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    useEffect(()=>{
        (async function() {
            let response = await getCat1Items(catergory);
            let random5 = getMultiRan(response.data.data, 5)

            setCatItems(random5);
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
                    <Image style={styles.subConImage} source={item?.itemPic1?{uri: item?.itemPic1}: noImage} />
                    <Text style={styles.subConText} numberOfLines={1}>{item?.itemName}</Text>
                    {item.onSale === "PERCENTAGE"?
                        <Text style = {styles.price}>$ {parseFloat(item.itemPrice * (1 - (item.itemDiscount/100))).toFixed(2)}</Text>
                    :
                        item.onSale === "DOLLAR"?
                            <Text style = {styles.price}>$ {parseFloat(item.itemSalePrice).toFixed(2)}</Text>
                        :
                            <Text style = {styles.price}>$ {parseFloat(item.itemPrice).toFixed(2)}</Text>}
                    {/* <Text style={[styles.subConText,{textAlign: "center"}]}>${item?.itemPrice}</Text> */}
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
    price: {
        textAlign: "center",
        width: 80,
    },
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