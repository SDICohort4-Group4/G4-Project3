export default function TotalPayablePrice(itemData){
    let totalSummaryPrice = 0;
    let itemSummaryPrice = null;

    let spreadData = [...itemData]
    spreadData.forEach((data) => {
        if(!isNaN(data.itemQtyCart) || !isNaN(data.item) && data.item != undefined){
            if(data.item.Qty <= 0 && data.itemFinalPrice < 0){

            } else {
                itemSummaryPrice = data.itemQtyCart * data.itemFinalPrice;
                totalSummaryPrice = totalSummaryPrice + itemSummaryPrice;
            }
        }
        // console.log(itemSummaryPrice)
        // console.log(totalSummaryPrice)
    })
    
    return totalSummaryPrice;
}