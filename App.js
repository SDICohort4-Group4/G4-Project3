import { StyleSheet, View, Text, TextInput, StatusBar } from 'react-native';
import StartScreen from "./src/navigation/start";
import {DataProvider} from "./src/contexts/AuthContext";
Text.defaultProps = TextInput.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// for stripe
import { StripeProvider } from '@stripe/stripe-react-native';

// remove warnings (warning apparently due to stripe and react native versions)
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]);

export default function App() {
  return (
    <DataProvider>
      <StripeProvider>
      <StatusBar backgroundColor={'#00000080'}/>
      <View style={styles.container}>
        <StartScreen/>
      </View>    
    </StripeProvider>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
