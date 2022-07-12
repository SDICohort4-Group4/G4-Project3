import {View, Text, StyleSheet} from 'react-native'

import {useState} from 'react'

export default function countdownTimer({navigation,}){
    // longTimer, setLongTimer
    // const [longTimer, setLongTimer] = useState(60)
    const [timer, setTimer] = useState(60)

    let decrementCount = timer;
    function decrementLongTimer(){
        console.log(decrementCount);
        decrementCount = decrementCount - 1;
        if(navigation.getState().index == 1){
            // setLongTimer(decrementCount);
            setTimer(decrementCount)
        } else {
            clearInterval(longCounter)
        }

        if(decrementCount == 0){
            clearInterval(longCounter)
            if(navigation.getState().index == 1){
                navigation.navigate('cartItems')
            }
        }
    }
    let longCounter = setInterval(() => {decrementLongTimer()}, 1000)


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