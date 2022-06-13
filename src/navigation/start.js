import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../containers/home";
import AccountScreen from "../containers/account";

const Tab=createBottomTabNavigator();

export default function StartScreen() {
    return (
      <>
        <NavigationContainer>
        <Tab.Navigator screenOptions={{
                          tabBarStyle:{height:35, backgroundColor:"#FFD700"},
                          headerStyle:{height:60, backgroundColor:"#FFD700"},
                          headerTitleStyle:{color:"white"},
                          }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{title:"Let's go Shopin", tabBarLabelStyle:{fontSize:20,fontWeight:"bold"}}}/>
            <Tab.Screen name="Account" component={AccountScreen} options={{tabBarLabelStyle:{fontSize:20,fontWeight:"bold"}}}/>
        </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }


  
