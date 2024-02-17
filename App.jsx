import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Wokitoki from './component/walkieTalkie2'; // שינוי שם הקומפוננטה ל- wokitoki

const App = () => {
  const [isCalling, setIsCalling] = useState(false);

  const handleStartCall = () => {
    setIsCalling(true);
  };

  const handleEndCall = () => {
    setIsCalling(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ווקי טוקי</Text>
      {isCalling ? (
        <Wokitoki />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="התחל שיחה" onPress={handleStartCall} />
        </View>
      )}
      {isCalling && (
        <View style={styles.buttonContainer}>
          <Button title="סיים שיחה" onPress={handleEndCall} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default App;
