import { StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions, Alert, Animated } from 'react-native';
import React,{ useContext, useEffect, useState } from "react";
import noImage from "../../assets/photo-soon.jpg";

// import addToCart from '../components/addToCart.js'
import AuthContext from '../contexts/AuthContext';

import {updateCartData} from "../Api/updateCartData.js";
import axios from "axios";
import { MaterialIcons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function ItemDetails({route, navigation}) {
    // check what data/format of data is given
    // console.log(route.params.itemData);

    const [orderQty, setOrderQty] = useState(1);
    let {auth, userData} = useContext(AuthContext);
    let {dbCartArray, setDBCartArray} = useContext(AuthContext)

    let imageList = [];
    // push image url into img list if they are not empty
    if(route.params.itemData.itemPic1) imageList.push(route.params.itemData.itemPic1);
    if(route.params.itemData.itemPic2) imageList.push(route.params.itemData.itemPic2);

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

        let cartArray = [...dbCartArray];
        let exists = false;

        for(let i = 0; i < cartArray.length; i++){
            if(cartArray[i].itemID == itemData.itemID){
                exists = true;
                let payload = null;

                if(cartArray[i].itemQtyCart + orderQty > itemData.Qty){
                    cartArray[i].itemQtyCart = itemData.Qty
                } else {
                    cartArray[i].itemQtyCart = cartArray[i].itemQtyCart + orderQty;
                }
                payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: cartArray[i].itemQtyCart}
                axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
                break;
            }
        }
        
        if(exists == false){
            cartArray.push({
                item:{ 
                    itemName: itemData.itemName, 
                    itemPrice: itemData.itemPrice, 
                    Qty: itemData.Qty, itemPic1: 
                    itemData.itemPic1
                }, 
                itemQtyCart: orderQty, 
                itemID: itemData.itemID,
                userID: userData.userID,
            })
            // updateCartItem(userData.userID, itemData.itemID, orderQty)
            let payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: orderQty}
            axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
        }

        setDBCartArray(cartArray)
        // console.log(dbCartArray)
        // console.log(cartArray)
    
        return(Alert.alert(
            "Added to cart.",
            `Amount : ${orderQty}x ${itemName}
            \nPrice: $${(orderQty * itemData.itemPrice).toFixed(2)}`,
            [{text: "Accept"}],
            {cancelable: true}
        ))
    }
    
    const scrollX = React.useRef(new Animated.Value(0)).current;

    function renderDot(list) {
        return(
            <>
            {list.map((_,idx) => {
                const inputRange = [(idx - 1) * windowWidth, idx * windowWidth, (idx + 1)* windowWidth ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8,16,8],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                })

                return <Animated.View style={[styles.dot, {width: dotWidth, opacity}]} key={idx.toString()} ></Animated.View>
            })}
            </>
        )
    }

    function renderFunc({item}) {
        return (
            <Image style={styles.flatListImage} source={{uri: item}} />
        )
    }

    return(
        <>
            <ScrollView style={{backgroundColor: '#fffaed'}}>

                <View style={styles.flatListCon}>
                    {imageList.length?<>
                    <Animated.FlatList 
                    snapToAlignment="start" 
                    snapToInterval={windowWidth*0.90}
                    decelerationRate={"fast"} 
                    pagingEnabled
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: false}
                    )}
                    horizontal data={imageList} renderItem={renderFunc}
                    showsHorizontalScrollIndicator={false}/>
                    
                    <View style={styles.pagination}>
                        {renderDot(imageList)}
                    </View>
                    </>: <Image style={styles.flatListImage} source={noImage} />}
                </View>

                <View style={styles.card}>
                    <Text style={styles.header}>{route.params.itemData.itemName}</Text>
                    <Text style={styles.price}>$ {parseFloat(route.params.itemData.itemPrice).toFixed(2)}</Text>

                    <View style={styles.additionInfo}>

                        <View style={styles.infoRow}>
                            <Text style={[{...styles.infoText},{flex: 2}]}>Stock:</Text>
                            <Text style={[{...styles.infoText},{flex: 6}]}>{route.params.itemData.Qty}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={[{...styles.infoText},{flex: 2}]}>Brand:</Text>
                            <Text style={[{...styles.infoText},{flex: 6}]}>{route.params.itemData.brand}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={[{...styles.infoText},{flex: 2}]}>Catergory:</Text>
                            <Text style={[{...styles.infoText},{flex: 6}]}>{route.params.itemData.itemCategory1}, {route.params.itemData.itemCategory2}</Text>
                        </View>
                    </View>
                    
                    <Text style={styles.desHeader}>Description: </Text>
                    <View style={styles.desCon}>
                        <Text>{route.params.itemData.itemDescription}</Text>
                    </View>
                </View>
                
                {/* <View style = {styles.container}>

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
                </View> */}
            </ScrollView>
            <View style={styles.bottomBar}>
                <View style={styles.counterCon}>
                    <MaterialIcons onPress={decrementOrderQty} name="remove" size={25} color="#333333" />
                    <Text style={styles.counter}>{orderQty}</Text>
                    <MaterialIcons onPress={incrementOrderQty} name="add" size={25} color="#333333" />
                </View>
                <View style={styles.addBtnCon}>
                    {auth?
                    <Text onPress={() => {addToCart(route.params.itemData.itemName, orderQty, route.params.itemData)}} style={styles.addBtn}>Add</Text>:
                    <Text style={styles.addBtn} onPress={()=>{navigation.navigate('Account',{screen: 'Login'})}}>Login</Text>}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    flatListCon:{
        marginTop: 20,
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 * 3/4,
        alignSelf: "center",
        borderRadius: 5,
        overflow: "hidden",
        elevation: 5,
        backgroundColor: 'white',
    },

    flatListImage: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.9 * 3/4,
    },

    dot:{
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: '#333',
        marginHorizontal: 3,
    },

    pagination:{
        position: 'absolute',
        flexDirection: 'row',
        bottom: 10,
        alignSelf: "center"
    },

    card:{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 5,
        marginVertical: 15,
        borderRadius: 5,
    },

    header:{
        fontSize: 18,
        fontWeight: 'bold', 

    },

    price:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 5,
    },

    additionInfo:{
        backgroundColor: 'rgba(52, 52, 52, 0.05)',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
    },

    infoRow:{
        flexDirection:'row',
        justifyContent: 'flex-start',
    },

    desHeader:{
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

    desCon:{
        backgroundColor: 'rgba(52, 52, 52, 0.05)',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
    },

    bottomBar:{
        height: 55,
        backgroundColor: '#f1e9cb',
        borderTopWidth: 0.5,
        borderColor: "#edd9ad",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    counter:{
        fontSize: 20,
        backgroundColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 50,
        padding: 2,
        borderRadius: 2,
    },

    counterCon: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 150,
    },
    addBtn:{
        fontSize: 20,
        backgroundColor: '#fcf5cf',
        padding: 5,
        paddingHorizontal: 25,
        borderRadius: 5,
        elevation: 2,
    },

    addBtnCon:{
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
  });