import React, { useState, useRef, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { loadSound, playSound, stopSound } from "./SoundUtils";
import NavBar from "./Navbar";
import GreetingMessage from "./DateMessage";
import Training from "./Training";
import PersonalTraking from "./PersonalTraking";


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
    }, 1500);
  };

  const handleButtonPressOut = () => {
    clearTimeout(pressTimer.current);
  };

  const press = () => {
    console.log("Pressed");
    console.log("Alarm sent...");
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

      <TouchableOpacity style={styles.presonInfo} onPress={press}>
        <Image source={require("../assets/images/person.png")} style={styles.presonInfoImage} />
      </TouchableOpacity>

      <GreetingMessage />


      <TouchableOpacity
        style={styles.button}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
      >
        <Image
          source={require("../assets/images/symbol1.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.contentContainer}>
          <Image
            source={require("../assets/images/emergency.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>אירוע אמת</Text>
        </View>
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
        <TouchableOpacity onPress={stopAlarm} style={[styles.stpButtonContainer , { zIndex: 999 }]}>
          <View style={styles.stpButton}>
            <Text style={styles.stpButtonText}>Stop Alarm</Text>
          </View>
        </TouchableOpacity>
      )}
      <Training />
      <PersonalTraking />
      <NavBar />
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 190,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 16,
    paddingLeft: 16,
    backgroundColor: "#060606",
    borderRadius: 20,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    alignSelf: "flex-start",

  },
  presonInfoImage: {
    position: 'absolute',
    top: 50,
    left: 305,
    width: 40,
    height: 40,
  },
  logo: {
    position: 'absolute',
    top: 30,
    left: 15,
    flex: 1,
    width: 200,
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
    width: 205,
    height: 200,
    top: 210,
    left: 115,
    borderWidth: 0,
    borderRadius: 40,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'relative',
    width: 540,
    height: 540,
    left: 5,
  },
  contentContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    left: -10,
    width: 90,
    height: 90,
  },
  buttonText: {
    left: -10,
    color: 'white',
    marginTop: 10,
    fontSize: 20,
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
  },
  stpButton: {
    position: 'absolute',
    top: 500,
    left: 115,
    width: 150,
    height: 50,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  stpButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
