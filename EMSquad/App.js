import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import EMSquadTitle from './EMSquadTitle'; // Assuming EMSquadTitle component is in the same directory

export default function App() {
  return (
    <View style={styles.container}>
      <EMSquadTitle />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
