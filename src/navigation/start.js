import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from "../screens/home.js";
import AccountScreen from "../screens/account.js";

import CartIcon from "../../assets/cart-icon-gray.png"
import Icon from "../../assets/icon.png"
import { SimpleLineIcons } from '@expo/vector-icons'; 

import { EvilIcons } from '@expo/vector-icons'; 
import CartScreen from "../screens/cart.js"

const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function StartScreen() {
    return (
        <>
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions = {{
                    headerStyle: {height: 60, backgroundColor: "#D1920D"},
                    headerTitleStyle: {color: "white"},
                    tabBarStyle: {backgroundColor: "#FFD700", height: 50},
                }}>
                <Tab.Screen 
                    name = "Home" 
                    component = {HomeScreen} 
                    options = {{
                        title: "Let's go Shopin", 
                        tabBarLabelStyle: {fontSize: 15, fontWeight:"bold", flex: 1, textAlignVertical: 'center'},
                        // tabBarIconStyle:{display:'none',},
                        tabBarIcon : () => {
                            return (
                                // <Image
                                //     style = {styles.cartIconContainer}
                                //     source = {Icon} 
                                // />
                                <View style = {styles.cartIconContainer}>
                                    <SimpleLineIcons name="bag" size={20} color="black" />
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen 
                    name = "Account" 
                    component = {AccountScreen} 
                    options = {{
                        tabBarLabelStyle: {fontSize: 15, fontWeight: "bold", flex: 1, textAlignVertical: 'center'}, 
                        // tabBarIconStyle:{display:'none',},
                        tabBarIcon : () => {
                            return (
                                <View style = {styles.cartIconContainer}>
                                    <EvilIcons name = "user" size = {28} />
                                </View>

                            )
                        }
                    }}
                />
                <Tab.Screen 
                    name = "Cart" 
                    component = {CartScreen} 
                    options = {{
                        tabBarLabelStyle: {fontSize: 15, fontWeight: "bold", flex: 1, textAlignVertical: "center"},
                        tabBarIcon : () => {
                            return (
                                <Image
                                    style = {styles.cartIconContainer}
                                    source = {CartIcon} 
                                />
                            )
                        }
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    cartIconContainer:{
        width: windowWidth * 0.1,
        height: windowHeight * 0.03,
        // top:3,
        justifyContent: "center",
        // alignSelf: "center",
        alignItems: "center",
        top: 5,
    }
})
  
