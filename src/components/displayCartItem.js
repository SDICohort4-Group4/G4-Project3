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
                {/* <Text>DisplayCartItem Test</Text> */}
                <Text>{props.itemData.itemName}</Text>
                
                <Text>Price: ${props.itemData.itemPrice.toFixed(2)}</Text>

                {props.itemData.stock > 0? 
                    <Text>In stock</Text>:<Text>Out of stock</Text>
                }

                <Text>Qty: {props.itemData.qty}</Text>

                <Text>Summary Price: ${((props.itemData.itemPrice) * props.itemData.qty).toFixed(2)}</Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    image1:{

    },
    itemContainer:{

    },
    itemInfoContainer:{

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