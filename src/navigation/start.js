import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from "../screens/home.js";
import AccountScreen from "../screens/account.js";


const Tab = createBottomTabNavigator();

export default function StartScreen() {
    return (
        <>
        <NavigationContainer>
        <Tab.Navigator screenOptions={{
                          headerStyle:{height:60, backgroundColor:"#FFD700"},
                          headerTitleStyle:{color:"white"},
                          tabBarStyle:{backgroundColor:"#FFD700", height: 40},
                          }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{title:"Let's go Shopin", 
                                                                    tabBarLabelStyle:{fontSize:20,fontWeight:"bold", flex: 1, textAlignVertical: 'center'},
                                                                    tabBarIconStyle:{display:'none',},
                                                                    }}/>
            <Tab.Screen name="Account" component={AccountScreen} options={{tabBarLabelStyle:{fontSize:20,fontWeight:"bold", flex: 1, textAlignVertical: 'center'}, 
                                                                            tabBarIconStyle:{display:'none'},}}/>
        </Tab.Navigator>
        </NavigationContainer>
        </>
    );
}


  
