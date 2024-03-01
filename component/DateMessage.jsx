import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GreetingMessage = () => {
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'בוקר טוב';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'צהריים טובים';
    } else if (currentHour >= 17 && currentHour < 22) {
      return 'ערב טוב';
    } else {
      return 'לילה טוב';
    }
  };

  return (
    <View style={styles.greetingContainer}>
      <Text style={styles.greetingText}>{`${getGreetingMessage()}, Jack`}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    greetingContainer: {
        // position: 'absolute',
        // top: '75%',
        // left: '15%',
        // display: 'flex',
        // position: 'relative',
        width: "100%",
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 20,
    },
    greetingText: {
        color: 'white',
        fontSize: 24,
        // position: 'absolute',
        // justifyContent: 'center',
        // textAlign: 'center',
        // alignItems: 'center',
    },
});


export default GreetingMessage;