import { StyleSheet, View } from 'react-native';

import StartScreen from "./src/navigation/start"

export default function App() {
  return (
    <View style={styles.container}>
      <StartScreen/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
