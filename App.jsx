import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import WalkieTalkie from './component/walkieTalkie';
// import HomeScreen from './component/Home';
// import  WalkieTalkie2 from './component/walkieTalki2';
// import WalkieTalkie2 from './component/walkieTalki2';  // Update the import
import WalkieTalkiePTT from './component/walkieTalkie.component';


import List from './component/List';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <WalkieTalkie /> */
      // <HomeScreen />
    // <WalkieTalkie2/>
    <WalkieTalkiePTT/>
    }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292424',

  },
});

export default App;
