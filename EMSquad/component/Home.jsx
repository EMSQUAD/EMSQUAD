import React, { useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Button, Text } from "react-native";
import { loadSound, playSound, stopSound } from "./SoundUtils";
import NavBar from "./Navbar";

const HomeScreen = () => {
  const [alarmActive, setAlarmActive] = useState(false);
  const pressTimer = useRef(null);

  const startAlarm = async () => {
    await stopSound();
    await loadSound();
    setAlarmActive(true);
    playSound();
  };

  const stopAlarm = async () => {
    setAlarmActive(false);
    await stopSound();
  };

  const handleButtonPressIn = () => {
    pressTimer.current = setTimeout(() => {
      startAlarm();
    }, 3000);
  };

  const handleButtonPressOut = () => {
    clearTimeout(pressTimer.current);
  };

  const press = () => {
    console.log("pressed");
  };

  useEffect(() => {
    loadSound();

    return () => {
      stopSound();
    };
  }, []);

  return (
    <View style={styles.container}>
     
    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
    
    
      <TouchableOpacity
        style={[styles.button]}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
      >
        <Image source={require("../assets/images/emergency.png")} style={styles.buttonImage} />
        <Text style={styles.buttonText}>אירוע אמת</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.seconderyLeftButton} onPress={press}>
        <Image source={require("../assets/images/kangaroo.png")} style={styles.buttonLeftImageSmall} />
        <Text style={styles.buttonLeftTextSmall}>תרגיל</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.seconderyRightButton} onPress={press}>
        <Image source={require("../assets/images/team.png")} style={styles.buttonRightImageSmall} />
        <Text style={styles.buttonRightTextSmall}>צוות</Text>
      </TouchableOpacity>
    
      {alarmActive && (
        <Button title="Stop Alarm" onPress={stopAlarm} />
      )}
      
      <NavBar />
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
     top: 0,
     width: "100%",
    //  height: 190,
     justifyContent: "space-between",
    alignItems: "center", 
    paddingTop: 16,
    paddingLeft: 16,
    backgroundColor: "#060606",
    borderRadius: 20,
    borderBottomRightRadius: 90,
    borderBottomLeftRadius: 90,
    alignSelf: "flex-start", 
  
  },

  logo: {
    flex:1,
    width: 300,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
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
    left: 105,
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
  seconderyLeftButton: {
    position: 'absolute',
    top: 400,
    left: 40,
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLeftImageSmall: {
    width: 40,
    height: 40,
  },
  buttonLeftTextSmall: {
    color: 'white',
    fontSize: 14,
  },
  seconderyRightButton: {
    position: 'absolute',
    top: 400,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRightImageSmall: {
    width: 40,
    height: 40,
  },
  buttonRightTextSmall: {
    color: 'white',
    fontSize: 14,
  }
});

export default HomeScreen;
