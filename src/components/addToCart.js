import axios from 'axios'

export default function addToCart(orderQty, itemData, dbCartArray, setDBCartArray, setAddCartModalVisible, userData){
        
    if(orderQty <= 0) {
        return
    };

    let cartArray = [...dbCartArray];
    let exists = false;

    //Update Qty in cartArray & cart DB if itemID already exists in cartArray
    for(let i = 0; i < cartArray.length; i++){
        if(cartArray[i].itemID == itemData.itemID){
            exists = true;
            let payload = null;

            if(cartArray[i].itemQtyCart + orderQty > itemData.Qty){
                cartArray[i].itemQtyCart = itemData.Qty
            } else {
                cartArray[i].itemQtyCart = cartArray[i].itemQtyCart + orderQty;
            }
            payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: cartArray[i].itemQtyCart}
            try {
                axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
            } catch (error) {
                console.log(`Standalone function addToCart.js, updateCartQty:`, error)
            }
            break;
        }
    }
    
    //Push new item to cartArray & cart DB if itemID doesn't already exist cartArray
    if(exists == false){
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
        // updateCartItem(userData.userID, itemData.itemID, orderQty)
        let payload = {userID: userData.userID, itemID: itemData.itemID, itemQtyCart: orderQty}
        try {
            axios.post("https://sdic4-g4-project2.herokuapp.com/cart/save", payload)
        } catch (error) {
            console.log(`Standalone function addToCart.js, pushNewToCart;`, error)
        }
    }

    setDBCartArray(cartArray)
    setAddCartModalVisible(true);
    setTimeout(() => {setAddCartModalVisible(false)},500)
}