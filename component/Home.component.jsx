////
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  Alert,
  Platform,
} from "react-native";
import { loadSound, playSound, stopSound } from "./SoundUtils";
import Training from "./Training";
import PersonalTraking from "./PersonalTraking";
import Header from "./Header";
import NavBar from "./Navbar";
import jsonData from "../server/db/message.json";
import axios from "axios";

const BASE_URL = "https://server-ems-rzdd.onrender.com/user";
const Card = ({ name, description, selected, onSelect, width }) => (
  <TouchableOpacity
    style={[
      styles.card,
      { width: width, backgroundColor: selected ? "#FF5733" : "#D9D9D9" },
    ]}
    onPress={onSelect}
  >
    <Text style={[styles.cardTitle, { textAlign: "center", paddingTop: 5 }]}>
      {name}
    </Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

export const sendData = async () => {
  try {
    const response = await fetch("https://server-ems-rzdd.onrender.com/user");
    const jsonResponse = await response.json();

    if (jsonResponse && Array.isArray(jsonResponse.data)) {
      const updatePromises = jsonResponse.data
        .filter((user) => user.liveEvent === "No")
        .map((user) => {
          console.log(
            `Updating user: ${user.first_name}, liveEvent: ${user.liveEvent}`
          );

          return fetch(
            `https://server-ems-rzdd.onrender.com/user/${user._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                liveEvent: "Yes",
              }),
            }
          );
        });

      await Promise.all(updatePromises);
      console.log("All applicable users updated successfully.");
      console.log(
        `Updating user: ${user.first_name}, liveEvent: ${user.liveEvent}`
      );
    } else {
      console.log("No users need updating or unexpected response structure.");
    }
  } catch (error) {
    console.error("Error updating users:", error);
  }
};

export default function Home({ navigation, route }) {
  const [alarmActive, setAlarmActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const pressTimer = useRef(null);
  const { userDetails } = route.params;

  const handleCardSelect = (index) => {
    setSelectedCardIndex(index);
    setSelectedMessage(jsonData[index]);
  };

  const stopAlarm = async () => {
    setAlarmActive(false);
    await stopSound();
  };

  const handleButtonPressIn = () => {
    pressTimer.current = setTimeout(() => {
      openModal();
    }, 800);
  };

  const handleButtonPressOut = () => {
    clearTimeout(pressTimer.current);
  };

  const press = () => {
    console.log("Pressed");
    console.log("Alarm sent...");
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setModalVisible(false);
  };

  const calculateCardWidth = (content) => {
    const charWidth = 10;
    const minWidth = 380;
    const calculatedWidth = Math.max(content.length * charWidth, minWidth);
    return calculatedWidth;
  };

  const sendSelectedMessage = async (selectedMessage) => {
    try {
      if (!selectedMessage) {
        console.error("No selected message to send.");
        return;
      }

      const data = {
        message: selectedMessage.name,
      };

      console.log("Sending message:", data);
      const response = await axios.put(
        `${BASE_URL}/update-soldier-messages`,
        data
      );
      console.log("Response from server:", response.data);
      Alert.alert("התראה נשלחה בהצלחה");
    } catch (error) {
      console.error("Error sending message:", error.message);
      Alert.alert("Error", "Failed to send alerts to users");
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.seconderyLeftButton}  onPress={() =>
          navigation.navigate("HomeWalkiCommander", { userDetails: userDetails })
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
          navigation.navigate("List", { userDetails: userDetails })
        }
      >
        <Image
          source={require("../assets/images/team.png")}
          style={styles.buttonRightImageSmall}
        />
        <Text style={styles.buttonRightTextSmall}>צוות</Text>
      </TouchableOpacity>

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

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {jsonData.map((item, index) => (
              <Card
                style={styles.emergencyData}
                key={index}
                name={item.name}
                description={item.description}
                selected={index === selectedCardIndex}
                onSelect={() => handleCardSelect(index)}
                width={calculateCardWidth(item.name)}
              />
            ))}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#FF0000" }}
                onPress={() =>
                  sendSelectedMessage(selectedMessage, closeModal())
                }
              >
                <Text style={styles.textStyle}>שלח</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#FFA800" }}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>בטל</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <NavBar
        navigation={navigation}
        route={{ params: { userDetails: userDetails } }}
      />
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
    width: 205,
    height: 200,
    top: 200,
    left: 115,
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
    left: 5,
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
    backgroundColor: "#999999",
    borderRadius: 20,
    padding: 35,
    top: 25,
    width: "100%",
    height: "70%",
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
  },
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 16,
    margin: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 26,
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
