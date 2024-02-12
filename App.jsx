import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import Permisions from './component/permissions';
import WalkieTalkie from './component/walkie_talkie';

const App = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <WalkieTalkie />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
