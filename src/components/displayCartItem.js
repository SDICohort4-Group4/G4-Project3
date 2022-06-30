import { StyleSheet, Text, View, Image, Alert, Dimensions} from 'react-native';
import noImage from '../../assets/photo-soon.jpg';
import DisplaySalePrice from './displaySalePrice';
import { Card, Button } from 'react-native-paper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function DisplayCartItem(props){
    return(
        <Card style = {styles.cardContainer}>
            <View>
                <View style = {styles.itemContainer}>
                    {/* <Text>DisplayCartItem Test</Text> */}
                    {props.itemData.itemPic1? 
                            <Image style={styles.image1} source = {{uri:(props.itemData.itemPic1)}}></Image>
                        :
                            <Image style={styles.image1} source = {noImage}></Image>
                        }

                    
                    <View style = {styles.itemInfoContainer}>
                        <Text>{props.itemData.itemName}</Text>

                        {props.itemData.Qty > 0? 
                            <Text>In stock</Text>:<Text>Out of stock</Text>
                        }

                        <Text>Qty in Cart: {props.itemData.orderQty}</Text>

                        <Text>Price: $ {parseFloat(props.itemData.itemPrice).toFixed(2)}</Text>

                        <Text>Summary Price: ${parseFloat((props.itemData.itemPrice) * props.itemData.orderQty).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    image1:{
        width:"40%",
        height:120,
        borderRadius: 10,
        backgroundColor:"white",
    },
    itemContainer:{
        flex:1,
        flexDirection:"row",
        marginHorizontal: 5,
        padding: 0, 
        alignSelf: 'center',
        // padding: 8,
        borderRadius: 5,
    },
    itemInfoContainer:{
        margin:5,
        justifyContent:"center",
        textAlign: "center",
        width:"60%",
        paddingRight:5,
        paddingLeft: 5,
    },
    cardContainer: {
        elevation: 0,
        padding: 5,
        margin: 2,
        backgroundColor: '#f1e9cb',
        width: '100%',
        alignSelf: 'center',
        elevation: 0,
    },

    
})