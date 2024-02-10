import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WalkieTalkie from './component/walkieTalkie';

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
