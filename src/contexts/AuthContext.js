import { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

const LoginContext = createContext({});

export const DataProvider = ({children}) => {
const [auth, setAuth] = useState(false);


//create function to check auth
let checkAuth = async() =>{
    try{
        let access = await SecureStore.getItemAsync('access');
        let decoded = jwt_decode(access);
    
        if(decoded.exp < new Date().getTime()) {
            //the token has expired
            setAuth(false);
            SecureStore.deleteItemAsync('access');
        } else {
            setAuth(true);
        }
    } catch(err) {
        //console.log(`jwt has expired/ does not exist`);
    }
};

// on launch check if key in secure store is still valid
useEffect(()=>{ 
    checkAuth();
}, [])


// useEffect with [] to load this once when component is loaded for the first time

    return(
        // functions and stats to be passed as value
        <LoginContext.Provider value={{ auth, setAuth}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;