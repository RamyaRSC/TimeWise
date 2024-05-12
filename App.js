import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './src/StopWatch';
import Clock from './src/Clock';
import Timer from './src/Timer';
import Alarm from './src/Alarm';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start  on your app!</Text> */}

      <StopWatch />
      {/* <Clock /> */}
      {/* <Timer />  */}
      {/* <Alarm /> */}
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