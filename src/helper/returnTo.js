export function returnToPreviousScreen({navigation}){
    navigation.goBack(null)
}

export function returnToHome({navigation}){
    navigation.navigate('Home')
}

export function returnToHomeMain({navigation}){
    navigation.navigate('Home', {screen: 'homeMain'})
}

export function returnToBrowse({navigation}){
    navigation.navigate('Home', {screen: 'browse'})
}

export function returnToItemDetails({navigation}){
    navigation.navigate('Home', {screen: 'itemDetails'})
}

export function returnToCart({navigation}){
    navigation.navigate('Cart')
}

export function returnToCartItems({navigation}){
    navigation.navigate('Cart', {screen: 'cartItems'})
}

export function returnToCheckoutItems({navigation}){
    navigation.navigate('Cart', {screen: 'checkoutItems'})
}

export function returnToAccount({navigation}){
    navigation.navigate('Account')
}

export function returnToUpdateDetails({navigation}){
    navigation.navigate('UpdateDetails')
}

export function returnToBuyHistory({navigation}){
    navigation.navigate('BuyHistory')
}