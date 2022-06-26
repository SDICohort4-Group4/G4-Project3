import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";


export default function PriceSortButton({priceSortASC, setpriceSortASC}){
    return(
        <View >
            <TouchableOpacity style={styles.container} onPress={()=>{setpriceSortASC(!priceSortASC)}}>
                <Text style={   priceSortASC?
                                styles.sortASC
                                :
                                styles.sortDESC}>
                Price</Text>
            
            {priceSortASC?
                <AntDesign style={styles.upArrow} name="up" size={20} color="blue"/>
            :
                <AntDesign style={styles.downArrow}name="down" size={20} color="black"/>
            }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        
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
    upArrow:{
        top:0,
    },
    downArrow:{
        top:7,
    }
})