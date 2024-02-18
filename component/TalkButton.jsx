import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TalkButton = ({ isRecording, onRecordStart, onRecordStop }) => {
  const [buttonColor, setButtonColor] = useState('#ccc');

  const onPressIn = () => {
    console.log('Button pressed in');
    setButtonColor('#f00');
    onRecordStart();
  };

  const onPressOut = () => {
    console.log('Button pressed out');
    setButtonColor('#ccc');
    onRecordStop();
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Text style={styles.text}>לחץ והחזק לדבר</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default TalkButton;