import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';


const API = axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com/",
});

export default function PaymentScreen({navigation, userData, totalPrice, checkoutData, setDBCartArray, setCheckoutArray}) {
  const { confirmPayment, loading } = useConfirmPayment();
  const [card, setCard] = useState(false)
  
  const handlePayPress = async () => {
      // check that card details are complete
      if (card?.complete===false || card===false){
        return;
      }
      
      // multiply totalprice by 100 as stripe assumes price are in cents and integers only
      const amountPayable={amountPayable: parseInt(totalPrice*100)};
      let clientSecret;
      
      // get payment intent from backend server
      try {
          const response = await API.post("/stripepayment/",amountPayable);
          clientSecret = response.data.data.clientSecret;
        } catch (error) {
            console.log("Getting Client secret:", error);
            return;
      } 
      
      // request payment to stripe
      const {paymentIntent, error} = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: {
            email: userData.userEmail,
            name: userData.userName
          }
      });

      if (error) {
        // on payment failure, alert with reason for failure from stripe
          Alert.alert("Payment failure due to:",error.message);
      } else if (paymentIntent) {
          // on successful payment call paymentSuccess function to clear cart and save history to db
          // then navigate back to cart Items page
          console.log("Successfully Paid:\n", paymentIntent);
          paymentSuccess();
          // clear cart contents in app
          setDBCartArray([])
          setCheckoutArray([])
          navigation.navigate("Home");
      }
  };

  async function paymentSuccess(){
    let buyHistoryData = buyHistoryArray(checkoutData);
    let payload = [...buyHistoryData];
    try {
        await API.put(`/cart/delete/${userData.userID}`);
    } catch (error) {
        console.log('Payment Success->deleteCart: ', error);
    }

    try {
        await API.post("/buyhistory/save", payload)
    } catch (error) {
        console.log('Payment Success->saving buyHistory: ', error)
    }
    return     
    
  } 

function buyHistoryArray(itemData){
  let spreadData = [...itemData]
  let filteredHistoryArray = [];
  for(let i = 0; i < spreadData.length; i++){
      filteredHistoryArray.push({
          userID: spreadData[i].userID, 
          itemID: spreadData[i].itemID, 
          itemSKU: spreadData[i].item.SKU,
          itemName: spreadData[i].item.itemName, 
          buyQty: spreadData[i].itemQtyCart, 
          buyPrice: spreadData[i].item.itemPrice
      });
  }
  // console.log(filteredHistoryArray, new Date)
  return filteredHistoryArray
}
  
  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number:"4242 4242 4242 4242",
        }}
        cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            borderColor:"#000000",
            borderRadius:10,
            borderWidth:1
        }}
        style={{
            alignSelf:"center",
            width: '95%',
            height: 50,
            marginTop: 10,
            
        }}
        onCardChange={(cardDetails) => {
            setCard(cardDetails);
        }}
              
      />
      <View>{!loading? 
        <Text style={styles.payButton} onPress={handlePayPress}>Confirm Payment</Text>
      : 
        <Text style={styles.paymentProgress}>Payment in Progress</Text>
      }
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  payButton:{
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
    borderWidth: 0.02,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFD700",
    height: 40,
    marginTop:10,
    
},
  paymentProgress:{
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
    borderWidth: 0.02,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "gray",
    height: 40,
    marginTop:10,
  }
})