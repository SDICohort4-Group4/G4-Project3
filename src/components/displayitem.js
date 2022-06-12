import { StyleSheet, Text, View, Image } from 'react-native';

export default function DisplayItem(props){
    return(
    <View style={styles.itemContainer}>
        <Image style={styles.image1} source={{uri:(props.itemData[0].itemPic1)}}></Image>
        <View style={styles.itemInfoContainer}>
            <Text style={styles.itemText1}>{props.itemData[0].itemName}</Text>
            <Text style={styles.itemText2}>Price: ${props.itemData[0].itemPrice}</Text>
            
            <Text style={styles.itemText3}>{"\n"}In Stock Buy Now!</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    image1:{
        width:"50%",
        height:150,
    },
    itemContainer:{
        flex:1,
        flexDirection:"row",
        margin:5.
    },
    itemInfoContainer:{
        margin:5,
        justifyContent:"center",
        
    },
    itemText1:{
        fontSize:15,
        fontWeight:"bold",
    },
    itemText2:{

    },
    itemText3:{
        fontWeight:"bold",
        color:"blue",
    }
})