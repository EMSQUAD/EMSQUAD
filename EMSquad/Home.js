import React, { useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";

const HomeScreen = () => {
  const [alarmActive, setAlarmActive] = useState(false);
  const pressTimer = useRef(null);
  const alarmSound = useRef(new Audio.Sound());

  const loadSound = async () => {
    try {
      await alarmSound.current.loadAsync(
        require("./assets/security-alarm.mp3")
      );
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const playSound = async () => {
    try {
      await alarmSound.current.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const startAlarm = async () => {
    await alarmSound.current.unloadAsync(); 
    await loadSound();
    setAlarmActive(true);
    playSound();
  };

  const stopAlarm = async () => {
    setAlarmActive(false);
    await alarmSound.current.stopAsync();
  };

  const handleButtonPressIn = () => {
    pressTimer.current = setTimeout(() => {
      startAlarm();
    }, 3000);
  };

  const handleButtonPressOut = () => {
    clearTimeout(pressTimer.current);
  };

  useEffect(() => {
    loadSound();

    return () => {
      if (alarmSound.current) {
        alarmSound.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.image} />
      <TouchableOpacity
        style={[styles.button]}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
      >
        <Image source={require("./assets/emergency.png")} style={styles.buttonImage} />
        <Text style={styles.buttonText}>אירוע אמת</Text>
      </TouchableOpacity>

      {alarmActive && (
        <Button title="Stop Alarm" onPress={stopAlarm} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 190,
    paddingTop: 16,
    paddingLeft: 16,
    backgroundColor: "#060606",
    borderRadius: 20,
    borderBottomRightRadius: 90,
    borderBottomLeftRadius: 90,
    alignSelf: "flex-start",
  },
  image: {
    marginTop: 40,
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  button: {
    position: 'absolute',
    top: 220,
    left: 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
    fontSize: 24,
  },
});

export default HomeScreen;
