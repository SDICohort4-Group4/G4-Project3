import { StyleSheet, Text, View, TextInput } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import { useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login.js';
import Registration from '../components/Registration.js'
import RegisterSuccess from '../components/RegisterSuccess';
import AccountDetails from '../components/AccountDetails';
import UpdateDetails from '../components/UpdateDetails';



const AccountStack = createNativeStackNavigator();
const AccountDetailStack = createNativeStackNavigator();

export function LoginStack() {
    return (
        <NavigationContainer independent={true}>
            <AccountStack.Navigator screenOptions={{
                                        animation: "slide_from_right",
                                        headerStyle:{height:60, backgroundColor: "#D1920D"},
                                        headerTitleStyle: {color: 'white'},
                                        }}>
                <AccountStack.Screen name='Login' component={Login}/>
                <AccountStack.Screen name='Registration' component={Registration} options={{title: 'Registration'}}/>
                <AccountStack.Screen name='RegisterSuccess' component={RegisterSuccess} options={{title: 'Registration Successful'}}/>
            </AccountStack.Navigator>
        </NavigationContainer>
    )
}

function DetailStack() {
    return (
        <NavigationContainer independent={true}>
            <AccountDetailStack.Navigator screenOptions={{
                                        animation: "slide_from_right",
                                        headerStyle:{height:60, backgroundColor: "#D1920D"},
                                        headerTitleStyle: {color: 'white'},
                                        }}>
                <AccountDetailStack.Screen name='AccountDetails' component={AccountDetails} options={{title: 'Account Details'}}/>
                <AccountDetailStack.Screen name='UpdateDetails' component={UpdateDetails} options={{title: 'Update Details'}}/>
            </AccountDetailStack.Navigator>
        </NavigationContainer>
    )
}


export default function AccountScreen() {

    // to be set after getting
    const {auth} = useContext(AuthContext);


    return(
        <>
        {auth? <DetailStack />: <LoginStack />}
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
