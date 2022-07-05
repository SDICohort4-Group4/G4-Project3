import { StyleSheet, View, Text } from 'react-native';
import StartScreen from "./src/navigation/start";
import {DataProvider} from "./src/contexts/AuthContext";

// block text size increase due to android system settings
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// for stripe
import { StripeProvider } from '@stripe/stripe-react-native';

// remove warnings (warning apparently due to stripe and react native versions)
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]);

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51LIAztC2VmHakyazuShGaaWj7GHzkJC1TuPteGJMg3r4uxUdXaa1TIu2vcw7q4kIYPCeZWuITUJxF0ngR65mAjS300GyCVSIAt">
      <DataProvider>
        <View style={styles.container}>
          <StartScreen/>
        </View>
      </DataProvider>
    </StripeProvider>
  );
}


// <DataProvider>
//  <View style={styles.container}>
//    <StartScreen/>
//  </View>
// </DataProvider> 



const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
