import { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

const LoginContext = createContext({});

export const DataProvider = ({children}) => {
const [auth, setAuth] = useState(false);
const[userData, setUserData] = useState({});

const [DBcartArray, setDBCartArray] = useState(
    [
        {itemName: 'Square', itemPrice: 1.70, qty: 10, stock: 100}, 
        {itemName: 'Circle', itemPrice: 100, stock: 50}, 
        {itemName: 'Triangle', itemPrice: 7, qty: 10}, 
        {itemName: 'Non-euclidean space', qty: 3, stock: 20},
        {itemName: 'Pentagon', itemPrice: 2.50, qty: 20, stock: 100},
        {itemName: 'Oreo McFlurry', itemPrice: 4, qty: 20, stock: 300},
        {itemName: 'Happy Meal', itemPrice: 3.5, qty: 50, stock: 2500},
        {itemName: '20pc McNuggets', itemPrice: 13.70, qty: 2, stock: 50},
        {itemName: 'Dbl Filet-O-Fish Extra Value Meal', itemPrice: 9, qty: 5, stock: 5},
    ]
);


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
        <LoginContext.Provider value={{ auth, setAuth, userData, setUserData, DBcartArray, setDBCartArray}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;