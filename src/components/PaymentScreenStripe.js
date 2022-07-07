import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';


const API = axios.create({
    baseURL:"https://sdic4-g4-project2.herokuapp.com/",
});

export default function PaymentScreen(props) {
  const { confirmPayment, loading } = useConfirmPayment();
  const [card, setCard] = useState(false)
  
  const handlePayPress = async () => {
     
      if (card?.complete===false || card===false){
        return;
      }
      
      const amountPayable={amountPayable: props.totalPrice*100};
      let clientSecret;
      try {
          const response = await API.post("/stripepayment/",amountPayable);
          clientSecret = response.data.data.clientSecret;
        } catch (error) {
            console.log("Payment Screen:", error);
            return;
      } 
     
      const {paymentIntent, error} = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: {
            email: props.userData.userEmail,
            name: props.userData.userName
          }
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