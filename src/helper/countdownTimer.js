import {View, Text, StyleSheet} from 'react-native'

import {useState, useEffect} from 'react'

export default function countdownTimer({navigation}){
    // longTimer, setLongTimer
    // const [longTimer, setLongTimer] = useState(60)
    const [timer, setTimer] = useState(60)

    useEffect(()=>{
        // if(navigation.getState().index == 1){
        //     if(timer > 0){
        //         setTimeout(() => {
        //             setTimer(timer - 1);
        //             console.log(timer);
        //         }, 1000);
        //     } else {
        //         navigation.navigate('cartItems')
        //     }
        // } 
        if (timer > 0) {
            if(navigation.getState().index == 1){
                setTimeout(()=>{
                    setTimer(timer - 1);
                    console.log(timer, new Date); //for checking
                }, 970);
            }
        } 

        if (timer == 0) {
            if(navigation.getState().index == 1){
                navigation.navigate('cartItems')
            }
        }
        
    }, [timer])

    // let decrementCount = timer;
    // function decrementLongTimer(){
    //     console.log(decrementCount);
    //     decrementCount = decrementCount - 1;
    //     if(navigation.getState().index == 1){
    //         // setLongTimer(decrementCount);
    //         setTimer(decrementCount)
    //     } else {
    //         clearInterval(longCounter)
    //     }

    //     if(decrementCount == 0){
    //         clearInterval(longCounter)
    //         if(navigation.getState().index == 1){
    //             navigation.navigate('cartItems')
    //         }
    //     }
    // }
    // let longCounter = setInterval(() => {decrementLongTimer()}, 1000)

    return(
        <>
            <Text style = {styles.countdownTimer}>Timeout in {timer} seconds</Text>
        </>
    )
}

const styles = StyleSheet.create({
    countdownTimer:{
        color: "grey",
        textAlign: "center",
    },


})