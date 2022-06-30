import { StyleSheet, Text, View, TextInput } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import { useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login.js';
import Registration from '../components/Registration.js'
import RegisterSuccess from '../components/RegisterSuccess';
import AccountDetails from '../components/AccountDetails';


const AccountStack = createNativeStackNavigator();
const AcountDetailStack = createNativeStackNavigator();

export function LoginStack() {
    return (
        <NavigationContainer independent={true}>
            <AccountStack.Navigator screenOptions={{headerShown: false, animation: "slide_from_right"}}>
                <AccountStack.Screen name='Login' component={Login}/>
                <AccountStack.Screen name='Registration' component={Registration}/>
                <AccountStack.Screen name='RegisterSuccess' component={RegisterSuccess}/>
            </AccountStack.Navigator>
        </NavigationContainer>
    )
}

function DetailStack() {
    return (
        <NavigationContainer independent={true}>
            <AcountDetailStack.Navigator screenOptions={{headerShown: false, animation: "slide_from_right"}}>
                <AcountDetailStack.Screen name='AccountDetails' component={AccountDetails}/>
            </AcountDetailStack.Navigator>
        </NavigationContainer>
    )
}


export default function AccountScreen() {

    // to be set after getting
    const {auth} = useContext(AuthContext);


    return(
        <>
        {auth? 
        <DetailStack />: 
        <LoginStack />
        }
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%', 
        backgroundColor: '#fffaed',
    },


  });
