import axios from 'axios'
import { Alert } from 'react-native';

export default async function addToCart(orderQty, itemData, dbCartArray, setDBCartArray, setAddCartModalVisible, userData){
        
    if(orderQty <= 0) {
        return
    };

    let cartArray = [...dbCartArray];
    let exists = false;
    let tempCartArray = [...cartArray];

    //Update Qty in cartArray & cart DB if itemID already exists in cartArray
    for(let i = 0; i < cartArray.length; i++){
        if(cartArray[i].itemID == itemData.itemID){
            exists = true;
            let payload = null;

            if(cartArray[i].itemQtyCart + orderQty > itemData.Qty){
                tempCartArray[i].itemQtyCart = itemData.Qty
            } else {
                tempCartArray[i].itemQtyCart = cartArray[i].itemQtyCart + orderQty;
            }
            payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: tempCartArray[i].itemQtyCart}
            try {
                await axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
                cartArray = [...tempCartArray];
                ifNoErr();
            } catch (error) {
                Alert.alert("Connection Timeout", "Could not add to Cart")
                console.log(`Standalone function addToCart.js, updateCartQty:`, error)
                return;
            }
            break;
        }
    }
    
    //Push new item to cartArray & cart DB if itemID doesn't already exist cartArray
    if(exists == false){
        // updateCartItem(userData.userID, itemData.itemID, orderQty)
        let payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: orderQty}
        try {
            await axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
            cartArray.push({
                item:{ 
                    itemName: itemData.itemName, 
                    itemPrice: itemData.itemPrice, 
                    Qty: itemData.Qty, 
                    itemPic1: itemData.itemPic1,
                    onSale: itemData.onSale,
                    itemDiscount: itemData.itemDiscount,
                    itemSalePrice: itemData.itemSalePrice,
                }, 
                itemQtyCart: orderQty, 
                itemID: itemData.itemID,
                userID: userData.userID,
            })
            ifNoErr();
        } catch (error) {
            Alert.alert("Connection Timeout", "Could not add to Cart")
            console.log(`Standalone function addToCart.js, pushNewToCart;`, error)
        }
    }

    function ifNoErr(){
        setDBCartArray(cartArray)
        setAddCartModalVisible(true);
        setTimeout(() => {setAddCartModalVisible(false)},800)
    }
}