import { StyleSheet, View, Text, TextInput, StatusBar } from 'react-native';
import StartScreen from "./src/navigation/start";
import {DataProvider} from "./src/contexts/AuthContext";
Text.defaultProps = TextInput.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {
  return (
    <DataProvider>
      <StatusBar backgroundColor={'#00000080'}/>
      <View style={styles.container}>
        <StartScreen/>
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
