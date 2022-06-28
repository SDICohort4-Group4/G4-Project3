import { StyleSheet, Text, View, Image, Alert} from 'react-native';
import noImage from '../../assets/photo-soon.jpg';
import DisplaySalePrice from './displaySalePrice';
import { Card, Button } from 'react-native-paper';


export default function DisplayCartItem(props){
    return(
        <Card>
            <View>
                <Text>DisplayCartItem Test</Text>
                <Text>{props.itemData}</Text>
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
    cartContainer:{
        
    }
    
})