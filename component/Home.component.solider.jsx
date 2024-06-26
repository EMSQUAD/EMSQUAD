import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
} from "react-native";
import { loadSound, playSound, stopSound } from "./SoundUtils";
import Training from "./Training";
import PersonalTraking from "./PersonalTraking";
import Header from "./Header";
import NavBar from "./NavbarSoliser";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";

export default function Home({ navigation, route }) {
  const [alarmActive, setAlarmActive] = useState(false);
  const pressTimer = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  const userDetails = route.params ? route.params.userDetails : null;

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

  const handleButtonPressOut = () => {
    clearTimeout(pressTimer.current);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://server-ems-rzdd.onrender.com/user");
      const responseData = await response.json();

      if (responseData.data && Array.isArray(responseData.data)) {
        const loggedInUser = responseData.data.find(
          (user) => user.id_use === userDetails.id
        );

        if (loggedInUser && loggedInUser.message && !lastMessage) {
          setLastMessage(loggedInUser.message);
        } else if (
          loggedInUser &&
          loggedInUser.message &&
          loggedInUser.message !== lastMessage
        ) {
          startAlarm();
          setModalVisible(true);
          setModalMessage(loggedInUser.message);
          setLastMessage(loggedInUser.message);
        }
      } else {
        console.error(
          "Error: Response data does not have the expected structure"
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [userDetails, lastMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPressOut={handleButtonPressOut}>
        <Image
          source={require("../assets/images/symbol_solider.png")}
          style={[styles.backgroundImage, { width: 200, height: 200 }]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.seconderyLeftButton}  onPress={() =>
          navigation.navigate("HomeWalkiSolider", { userDetails: userDetails })
        }>
        
        <Image
          source={require("../assets/images/walkie-talkie.png")}
          style={styles.buttonLeftImageSmall}
          
        />
        <Text style={styles.buttonLeftTextSmall}>ווקי טוקי</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.seconderyRightButton}
        onPress={() =>
          navigation.navigate("Status", { userDetails: userDetails })
        }
      >
        <AntDesign name="loading1" size={30} color="white" />
        <Text style={styles.buttonLeftTextSmall}>סטטוס</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.seconderyRightButton}>
        <Feather name="repeat" size={30} color="white" />
        <Text style={styles.buttonRightTextSmall}>ס.עבודה</Text>
      </TouchableOpacity> */}


      {alarmActive && (
        <TouchableOpacity
          onPress={stopAlarm}
          style={[styles.stpButtonContainer, { zIndex: 999 }]}
        >
          <View style={styles.stpButton}>
            <Text style={styles.stpButtonText}>Stop Alarm</Text>
          </View>
        </TouchableOpacity>
      )}

      <Header userDetails={userDetails} />
      <Training />
      <PersonalTraking />
      <NavBar navigation={navigation} route={route} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Emergency Alert</Text>
            <Text style={styles.modalMessage}>
              Emergency message: {modalMessage}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                stopAlarm();
              }}
            >
              <Text style={styles.okButton}>אישור</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    width: 250,
    height: 200,
    top: 200,
    left: 90,
    borderWidth: 0,
    borderRadius: 40,
    borderColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "relative",
    width: 540,
    height: 540,
    right: 9,
  },
  contentContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    left: -10,
    width: 90,
    height: 90,
  },
  buttonText: {
    left: -10,
    color: "white",
    marginTop: 10,
    fontSize: 20,
  },
  seconderyLeftButton: {
    position: "absolute",
    top: 350,
    left: 40,
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLeftImageSmall: {
    width: 20,
    height: 40,
  },
  buttonLeftTextSmall: {
    color: "white",
    fontSize: 14,
    marginTop: 2,
  },
  seconderyRightButton: {
    position: "absolute",
    top: 350,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRightImageSmall: {
    width: 40,
    height: 40,
  },
  buttonRightTextSmall: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  stpButton: {
    position: "absolute",
    top: 600,
    left: 115,
    width: 150,
    height: 50,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
  },
  stpButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  modalView: {
    margin: 0,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    width: "80%",
    height: "20%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalText: {
    marginBottom: 30,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalMessage: {
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  okButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    color: "white",
    fontSize: 20,
  },

  emergencyData: {
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    height: 100,
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: 160,
  },
  textStyle: {
    color: "white",
    fontWeight: "300",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 30,
  },
});
