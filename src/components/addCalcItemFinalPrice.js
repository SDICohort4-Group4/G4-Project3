export default function addCalcItemFinalPrice(itemData){
    for(let i = 0; i < itemData.length; i++){
        if(itemData[i].item.onSale === "PERCENTAGE"){
            itemData[i]['itemFinalPrice'] = itemData[i].item.itemPrice * (1 - (itemData[i].item.itemDiscount/100))
        } else if(itemData[i].item.onSale === "DOLLAR"){
            itemData[i]['itemFinalPrice'] = itemData[i].item.itemSalePrice
        } else {
            itemData[i]['itemFinalPrice'] = itemData[i].item.itemPrice;
        }
    }
    return itemData;
}
