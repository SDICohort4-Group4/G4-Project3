import { StyleSheet, Text, View, Image } from 'react-native';

export default function DisplaySalePrice(props){
    
    function CalDiscount(){
        return (props.itemPrice*(1-(parseInt(props.itemDiscount)/100))).toFixed(2);
    }

    return(
        <View>
            {props.onSale==="DOLLAR" ? 
                <View>
                    <Text style={styles.itemTextSale}>Price: ${props.itemPrice}</Text>
                    <Text style={styles.itemTextBlue}>Sale Price: ${props.salePrice}</Text>
                </View>
            :
                <View>
                    <Text style={styles.itemTextSale}>Price: ${props.itemPrice}</Text>
                    <Text style={styles.itemTextBlue}>Sale Price: ${CalDiscount()}</Text>
                </View>
            }
            
        </View>
    )
}

const styles=StyleSheet.create({
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