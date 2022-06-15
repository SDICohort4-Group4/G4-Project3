import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../screens/home";
import AccountScreen from "../screens/account";

const Tab=createBottomTabNavigator();

export default function StartScreen() {
    return (
      <>
        <NavigationContainer>
        <Tab.Navigator screenOptions={{
                          headerStyle:{height:60, backgroundColor:"#D1920D"},
                          headerTitleStyle:{color:"white"},
                          tabBarStyle:{height:35, backgroundColor:"#FFD700"},
                          }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{title:"Let's go Shopin", tabBarLabelStyle:{fontSize:20,fontWeight:"bold"}}}/>
            <Tab.Screen name="Account" component={AccountScreen} options={{tabBarLabelStyle:{fontSize:20,fontWeight:"bold"}}}/>
        </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }


  
