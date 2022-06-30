import { StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { useContext, useEffect, useState } from "react";
import noImage from "../../assets/photo-soon.jpg";
import { DataTable, Button } from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component'

// import addToCart from '../components/addToCart.js'
import AuthContext from '../contexts/AuthContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function ItemDetails({route, navigation}) {
    // check what data/format of data is given
    // console.log(route.params.itemData);

    const [orderQty, setOrderQty] = useState(1);
    let {auth, setAuth} = useContext(AuthContext);
    let {dbCartArray, setDBCartArray} = useContext(AuthContext)

    function incrementOrderQty(){
        if(orderQty >= route.params.itemData.Qty){
            setOrderQty(route.params.itemData.Qty)
            return
        }
        setOrderQty(orderQty + 1)
        return orderQty;
    }

    function decrementOrderQty(){
        if(orderQty <= 0 ){
            setOrderQty(0)
            return
        }
        setOrderQty(orderQty - 1)
        return orderQty;
    }

    function addToCart(itemName, orderQty, itemData){
        
        if(orderQty <= 0) {
            return
        };

        let cartArray = dbCartArray;
        cartArray.push({itemName: itemData.itemName, itemPrice: itemData.itemPrice, orderQty: orderQty, Qty: itemData.Qty, itemID: itemData.itemID, itemPic1: itemData.itemPic1})
        setDBCartArray(cartArray)
        console.log(dbCartArray)
    
        return(Alert.alert(
            "Added to cart.",
            `Amount : ${orderQty}x ${itemName}
            \nPrice: $${(orderQty * itemData.itemPrice).toFixed(2)}`,
            [{text: "Accept"}],
            {cancelable: true}
        ))
    }

    // useEffect(() => {
    //     setDBCartArray(dbCartArray)
    // }, [dbCartArray])

    const tableData = {
        tableData: [
            ['Item : ', route.params.itemData.itemName],
            ['Description : ', route.params.itemData.itemDescription],
            ['Price : ', `$${parseFloat(route.params.itemData.itemPrice).toFixed(2)}`],
            // ['SKU : ', route.params.itemData.SKU],
            ['Brand :', route.params.itemData.brand],
            ['Stock : ', route.params.itemData.Qty],
            ['Category :', `${route.params.itemData.itemCategory1}, ${route.params.itemData.itemCategory2}`]

        ]
    };

    const [data, setData] = useState(tableData);
    
    return(
        <ScrollView>
            <View style = {styles.container}>

                <View style = {styles.imageCon}>
                    {route.params.itemData.itemPic1? 
                        <Image style = {styles.image} source = {{uri: route.params.itemData.itemPic1}}></Image>
                    :
                        <Image style = {styles.image} source = {noImage}></Image>
                    }
                </View>
                <View style = {styles.buttonsCon}>
                    {route.params.itemData.Qty > 0 ?
                    <Text>
                        <Button
                            style = {styles.orderQtyButtons}
                            onPress = {() => {
                                decrementOrderQty();
                            }}>-
                        </Button> 
                        <Button 
                            keyboardType = "numeric"
                            style = {styles.orderQtyField}>                        
                            {orderQty}                    
                        </Button>  
                        <Button 
                            style = {styles.orderQtyButtons}
                            onPress = {() => {
                                incrementOrderQty();
                            }}>+
                        </Button>
                        {auth === true? 
                            <Button 
                                onPress = {() => {
                                    addToCart(route.params.itemData.itemName, orderQty, route.params.itemData)
                                }}>
                                Add to Cart
                            </Button>       
                        :
                            <Button>Please Login</Button>}
                     
                    </Text>: <Text style = {styles.orderQtyButtons}>Please check back soon!</Text>}
                </View>
            
                <View style = {styles.infoCon}>
                <Table 
                    borderStyle = {{ borderWidth: 0.2, borderColor: 'black' }}>
                    <Rows data = {data.tableData} textStyle = {styles.rowTableText} />
                </Table>
                </View> 
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%', 
        backgroundColor: '#fffaed',
        
    },

    icon: {
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 100,
        elevation: 3,
    },
    
    imageCon:{
        // flex: 5,
        height: windowHeight*0.4,
        width: '100%',
        backgroundColor: "white",
    },

    image:{
        width: '100%',
        height: '100%',
    },

    infoCon: {
        flex: 0,
        borderWidth: 1,
        width: '100%',
    },
    nameCon: {
        flex: 1,
    },
    valueCon: {
        flex: 3,
    },
    qtyCon: {
        flex: 1
    },
    buttonsCon:{
        flex: 1
    },
    orderQtyButtons:{
        fontSize: 20,
    },
    orderQtyField: {
        fontSize: 20,
    },
    userDetails: {
        width: '90%',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        margin: 20,
        paddingVertical: 10,
        elevation: 10,
    },
    // head: { height: 44, backgroundColor: 'darkblue' },
    // headText: { fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
    rowTableText: { 
        margin: 6, 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
  });