import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native'; 
import LoginScreen from './Login';
import HomeScreen from './Home';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(17, 17, 17)",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
