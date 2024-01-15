import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EMSquadTitle = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFF9E4'); // Initial background color

  const changeBackgroundColor = () => {
    // Generate a random color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.blueText}>EM</Text>
      <Text style={styles.redText}>SQUAD</Text>
      <TouchableOpacity onPress={changeBackgroundColor} style={styles.button}>
        <Text style={styles.buttonText}>Change Color</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  blueText: {
    color: '#FFF9E4',
    fontSize: 24,
    fontWeight: 'bold',
  },
  redText: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EMSquadTitle;
