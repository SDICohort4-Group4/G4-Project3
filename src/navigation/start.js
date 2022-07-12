import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from "../screens/home.js";
import AccountScreen from "../screens/account.js";

import CartIcon from "../../assets/cart-icon-gray.png"
import Icon from "../../assets/icon.png"
import CartScreen from "../screens/cart.js"

import { MaterialIcons } from '@expo/vector-icons';

import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function StartScreen() {

    const {auth, dbCartArray, setDBCartArray, checkoutArray, setCheckoutArray} = useContext(AuthContext);

    return (
        <>
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions = {{
                    headerStyle: {height: 60, backgroundColor: "#D1920D"},
                    headerShown: false,
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
                                    {/* <SimpleLineIcons name="bag" size={20} color="black" /> */}
                                    <MaterialIcons name="store" size={24} color="#333333" />
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
                                    <MaterialIcons name="account-circle" size={24} color="#333333" />
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
                                <View style = {{...styles.cartIconContainer}}>
                                    <MaterialIcons name="shopping-cart" size={24} color="#333333" />
                                    {auth === true && dbCartArray.length > 0? 
                                        <View style = {styles.cartIconBadge}>
                                            <Text style = {styles.cartIconBadgeNumber}>
                                                {dbCartArray.length <= 99 ? dbCartArray.length: "99+"}</Text>
                                        </View>
                                    :
                                        null}

                                </View>
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
        height: windowHeight * 0.033,
        // top:3,
        justifyContent: "center",
        // alignSelf: "center",
        alignItems: "center",
        top: 5,
    },
    cartIconBadge: {
        position: 'absolute',
        backgroundColor: "rgba(255, 0, 0, 0.9)",
        width: 14,
        height: 14,
        borderRadius: 15 / 2,
        right: 0,
        top: -5,
        // right: 10,
        // top: +10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartIconBadgeNumber: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "#FFFFFF",
        fontSize: 8,
    }
})
  
