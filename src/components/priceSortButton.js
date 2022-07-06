import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function PriceSortButton({priceSortASC, setpriceSortASC, priceSort}){
    return(
        <View style={styles.container}>
            <TouchableOpacity style = {styles.toggleContainer} onPress = {() => {setpriceSortASC(!priceSortASC);priceSort()}}>
                <Text>Price</Text>
                <MaterialCommunityIcons style={styles.icon} name={priceSortASC?"sort-descending": "sort-ascending"} size={20} color="black"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'flex-end'
    },
    toggleContainer:{
        flexDirection:"row",
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        elevation: 5,
    },
    sortASC:{
        fontSize:15,
        fontWeight:"bold",
        color:"blue",
    },
    sortDESC:{
        fontSize:15,
        fontWeight:"bold",
        color:"black",
    },
    icon:{
    }

})