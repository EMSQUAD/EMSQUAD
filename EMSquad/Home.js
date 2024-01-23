import React, { useState, useRef } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const HomeScreen = () => {
  const [buttonColor, setButtonColor] = useState("red");
  const pressTimer = useRef(null);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/security-alarm.mp3")
    );
    await sound.playAsync();
  };

  const handleButtonPressIn = () => {
    pressTimer.current = setTimeout(() => {
      setButtonColor("green");
      playSound();
    }, 3000);
  };

  const handleButtonPressOut = () => {
    clearTimeout(pressTimer.current);
    // Add your logic for the end of the press here if needed
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.image} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
      >
        {/* Your button content goes here */}
      </TouchableOpacity>
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
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
