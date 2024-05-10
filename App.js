import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/stopWatch';
import Clock from './src/Clock';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start  on your app!</Text>

      {/* <StopWatch /> */}
      <Clock />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});