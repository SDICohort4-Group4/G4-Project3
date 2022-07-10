export default function shortCountdownTImer(shortTimer, navigation, setShortTimer){
    let decrementCount = shortTimer;
    function decrementShortTimer(){
        console.log(decrementCount);
        decrementCount = decrementCount - 1;
        if(navigation.getState().index == 1){
            setShortTimer(decrementCount);
        } else {
            clearInterval(shortCounter)
        }

        if(decrementCount == 0){
            clearInterval(shortCounter)
            if(navigation.getState().index == 1){
                navigation.navigate('cartItems')
            }
        }
    }
    let shortCounter = setInterval(() => {decrementShortTimer()}, 1000)
}