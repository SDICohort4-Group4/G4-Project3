import { StyleSheet, View } from 'react-native';
import StartScreen from "./src/navigation/start";
import {DataProvider} from "./src/contexts/AuthContext"

export default function App() {
  return (
    <DataProvider>
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
