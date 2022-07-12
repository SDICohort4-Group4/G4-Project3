import { View, Text, StyleSheet, Alert, Modal, Animated, Easing } from "react-native";
import { useState } from "react";
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { returnToHome } from "../helper/returnTo.js";

const API = axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com/",
});

export default function PaymentScreen({navigation, userData, totalPrice, checkoutData, setDBCartArray, setCheckoutArray, paySuccessModalVisible, setPaySuccessModalVisible}) {
  const { confirmPayment, loading } = useConfirmPayment();
  const [card, setCard] = useState(false)
  
  const handlePayPress = async () => {
      // check that card details are complete
      if (card?.complete===false || card===false){
        Alert.alert("","Please enter valid card information",'',{cancelable: true})
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
            console.log("Error getting Client secret:", error);
            Alert.alert("Connection Timeout","Please try again later")
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
          // console.log("Successfully Paid:\n", paymentIntent);
          paymentSuccess(paymentIntent);
          // clear cart contents in app
          setDBCartArray([])
          setCheckoutArray([])
          setTimeout(() => {returnToHome({navigation})}, 1200)
      }
  };

  async function paymentSuccess(paymentIntent){
    let buyHistoryData = buyHistoryArray(checkoutData ,paymentIntent);
    let payload = [...buyHistoryData];

    try {
      try {
        await API.put(`/cart/delete/${userData.userID}`);
      } catch (error) {
          Alert.alert("deleteCart failed")
          console.log('Payment Success->deleteCart: ', error);
      }

      try {
          await API.post("/buyhistory/save", payload)
      } catch (error) {
          Alert.alert('Saving buyHistory failed')
          console.log('Payment Success->saving buyHistory: ', error)
      }
      setTimeout(() => {setPaySuccessModalVisible(true)}, 200)
      setTimeout(() => {setPaySuccessModalVisible(false)}, 900)
    } catch (error) {
      console.log('PaymentScreenStripe.js :', error)
    }

    return     
    
  } 

function buyHistoryArray(itemData,paymentIntent){
  
  let spreadData = [...itemData]
  let filteredHistoryArray = [];
  for(let i = 0; i < spreadData.length; i++){
    // console.log(spreadData[i])
      filteredHistoryArray.push({
          userID: spreadData[i].userID, 
          itemID: spreadData[i].itemID, 
          itemSKU: spreadData[i].item.SKU,
          itemName: spreadData[i].item.itemName, 
          buyQty: spreadData[i].itemQtyCart, 
          buyPrice: spreadData[i].itemFinalPrice,
          stripeID: paymentIntent.id,
          currency: paymentIntent.currency,
          stripeAmount: paymentIntent.amount,
          stripePaymentMethodID: paymentIntent.paymentMethodId,
          stripeClientSecret: paymentIntent.clientSecret
      });
  }
  // console.log(filteredHistoryArray, new Date)
  return filteredHistoryArray
}

function LoadModal() {
  let spinValue = new Animated.Value(0);
  // setting up the animation
  Animated.loop(
      Animated.timing(
          spinValue, {
              toValue: 1,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true
          }
      )
  ).start();

  // interpolate for rotation values
  const spin = spinValue.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg', '360deg']
  });

  return(
      <Modal 
      animationType='fade'
      transparent={true}
      visible={loading}>
          <View style={styles.modalView}>
              <View style={styles.iconContainer}>
                  <Animated.View style={{transform: [{rotate: spin}]}}>
                      <MaterialCommunityIcons name="loading" size={50} color="white" />
                  </Animated.View>    
                  <Text style={{fontSize: 16, color:'white', fontWeight: 'bold'}}>Payment in progress</Text>
              </View>
          </View>
      </Modal>
  )
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
      <View>
          {!loading? 
          <Text style={styles.payButton} onPress={handlePayPress}>Confirm Payment</Text>
      : 
          <>
          <LoadModal/>
          <Text style={styles.paymentProgress}>Payment in Progress</Text>
          
          </>
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
  },
  modalView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},

iconContainer:{
    backgroundColor: '#00000060',
    width: 120,
    height: 120,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
})