import { StyleSheet, Text, View } from 'react-native';

export default function DisplaySalePrice(props){
    
    function CalDiscount(){
        return (props.itemPrice*(1-((props.itemDiscount)/100))).toFixed(2);
    }

    return(
        <View>
            <Text style = {styles.itemTextSale}>Price: ${parseFloat(props.itemPrice).toFixed(2)}</Text>
            {props.onSale === "DOLLAR" ? 
                <Text style = {styles.itemTextBlue}>Sale Price: ${parseFloat(props.salePrice).toFixed(2)}</Text>
                
            :
                <Text style = {styles.itemTextBlue}>Sale Price: ${parseFloat(CalDiscount()).toFixed(2)}</Text>
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