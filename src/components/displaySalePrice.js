import { StyleSheet, Text, View } from 'react-native';

export default function DisplaySalePrice(props){
    
    function CalDiscount(){
        return (props.itemPrice*(1-((props.itemDiscount)/100))).toFixed(2);
    }

    return(
        <View>
            <Text style = {styles.itemTextSale}>Price: ${props.itemPrice}</Text>
            {props.onSale === "DOLLAR" ? 
                <Text style = {styles.itemTextBlue}>Sale Price: ${props.salePrice}</Text>
                
            :
                <Text style = {styles.itemTextBlue}>Sale Price: ${CalDiscount()}</Text>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    itemTextSale:{
        textDecorationLine:"line-through",
        color:"gray",
    },
    itemTextBlue:{
        fontSize:13,
        fontWeight:"bold",
        color:"blue",
    },
})