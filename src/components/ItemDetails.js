import { StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { useContext, useEffect, useState } from "react";
import noImage from "../../assets/photo-soon.jpg";
import { DataTable, Button } from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function ItemDetails({route, navigation}) {
    // check what data/format of data is given
    // console.log(route.params.itemInfo);

    const [qty, setQty] = useState(1);

    function incrementQty(){
        if(qty >= route.params.itemInfo.Qty){
            setQty(route.params.itemInfo.Qty)
            return
        }
        setQty(qty + 1)
        return qty;
    }

    function decrementQty(){
        if(qty <= 0 ){
            setQty(0)
            return
        }
        setQty(qty - 1)
        return qty;
    }

    function buyItem(qty){
        if(qty <= 0) return;
        return(Alert.alert(
            "Added to cart",
            `Amount : ${qty}x ${route.params.itemInfo.itemName}
            \nPrice: $${qty * route.params.itemInfo.itemPrice}`,
            [{text: "Okay"}],
            {cancelable: true}
        ))

    }

    const tableData = {
        tableData: [
            ['Item : ', route.params.itemInfo.itemName],
            ['Description : ', route.params.itemInfo.itemDescription],
            ['Price : ', `$${route.params.itemInfo.itemPrice}`],
            // ['SKU : ', route.params.itemInfo.SKU],
            ['Brand :', route.params.itemInfo.brand],
            ['Stock : ', route.params.itemInfo.Qty],
            ['Category :', `${route.params.itemInfo.itemCategory1}, ${route.params.itemInfo.itemCategory2}`]

        ]
    };

    const [data, setData] = useState(tableData);
    
    return(
        <ScrollView>
            <View style = {styles.container}>

                <View style = {styles.imageCon}>
                    {route.params.itemInfo.itemPic1? 
                        <Image style = {styles.image} source = {{uri: route.params.itemInfo.itemPic1}}></Image>
                    :
                        <Image style = {styles.image} source = {noImage}></Image>
                    }
                </View>
                <View style = {styles.buttonsCon}>
                    {route.params.itemInfo.Qty > 0 ?
                    <Text>
                        <Button
                            style = {styles.qtyButtons}
                            onPress = {() => {
                                decrementQty();
                            }}>-
                        </Button> 
                        <Button 
                            keyboardType = "numeric"
                            style = {styles.qtyField}>                        
                            {qty}                    
                        </Button>  
                        <Button 
                            style = {styles.qtyButtons}
                            onPress = {() => {
                                incrementQty();
                            }}>+
                        </Button>
                        <Button 
                            onPress = {() => {
                                buyItem(qty)
                            }}>
                            Buy
                        </Button>                            
                    </Text>: <Text style = {styles.qtyButtons}>Please check back soon!</Text>}
                </View>
            
                <View style = {styles.infoCon}>
                <Table 
                    borderStyle = {{ borderWidth: 0.2, borderColor: 'black' }}>
                    <Rows data = {data.tableData} textStyle = {styles.text} />
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
    qtyButtons:{
        fontSize: 20,
    },
    qtyField: {
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
    text: { margin: 6, fontSize: 16, fontWeight: 'bold' },

  });