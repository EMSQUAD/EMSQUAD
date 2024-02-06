import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './component/Login'; 
import HomeScreen from './component/Home';
import WalkieTalkie from "./component/walkieTalkie";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <HomeScreen />
      {/* <WalkieTalkie /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
