import { View, Button } from "react-native";
import { useState } from "react";
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';

const API = axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com/",
});

export default function PaymentScreen() {
  const { confirmPayment, loading } = useConfirmPayment();
  const [ card, setCard ] = useState("");

  // test data
  const amountPayable={amountPayable:100};
  const billingDetails = {
    email: "tg@yahoo.com",
    name: "tg",
  };

  const handlePayPress = async () => {

      if (card?.complete==false) {
          return;
      }

      const response = await API.post("/stripepayment/",amountPayable);
      const {clientSecret} = response.data.data;
    
      const {paymentIntent, error} = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
    
      });

      if (error) {
          console.log("Payment error:", error);
      } else if (paymentIntent) {
          console.log("Successfully Paid:", paymentIntent);
      }
  };

  
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
            marginTop: 30,
            
        }}
        onCardChange={(cardDetails) => {
            setCard(cardDetails);
        }}
              
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}