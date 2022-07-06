import { StyleSheet, ScrollView, RefreshControl, ActivityIndicator, View, Image, Text, Pressable, TouchableHighlight } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetails from '../components/ItemDetails';
import HomeMain from '../components/HomeMain';
import SearchScreen from '../components/SearchScreen';

const ShopStack = createNativeStackNavigator();

export function HomeScreen() {
    return(

            <ShopStack.Navigator 
                screenOptions = {{
                    animation: "slide_from_right",
                    headerStyle: {height:60, backgroundColor: "#D1920D"},
                    headerTitleStyle: {color: 'white'},
                }}>
                
                <ShopStack.Screen 
                    name = 'homeMain' 
                    component = {HomeMain}
                    options={{headerShown: false}}/>
                
                <ShopStack.Screen 
                    name = 'browse' 
                    component = {SearchScreen}                     
                    options = {{title: "Let's go Shopin"}} 
                />
                <ShopStack.Screen 
                    name = 'itemDetails' 
                    component = {ItemDetails}
                    options = {{title: "Item Details"}}
                />

                {/* <ShopStack.Screen name = 'cartDetails' component = {CartDetails} /> */}
            </ShopStack.Navigator>  
    )
}

const styles = StyleSheet.create({
    container1:{
        backgroundColor:"#FDD100",
        flexDirection:"row",
        alignItems:"center",
        
    },
    container2:{
        backgroundColor:"#fffaed",
    },

})