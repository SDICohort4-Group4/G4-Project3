export default function longCountdownTimer(longTimer, navigation, setLongTimer){
    let decrementCount = longTimer;
    function decrementLongTimer(){
        console.log(decrementCount);
        decrementCount = decrementCount - 1;
        if(navigation.getState().index == 1){
            setLongTimer(decrementCount);
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
}