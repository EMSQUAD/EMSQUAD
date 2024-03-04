
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
} from "react-native";
import { loadSound, playSound, stopSound } from "./SoundUtils";
// import { useHeaderHeight } from "@react-navigation/elements";
import Training from "./Training";
import PersonalTraking from "./PersonalTraking";
import Header from "./Header";
import NavBar from "./Navbar";
// import jsonData from "../server/db/message.json";
import { AntDesign } from '@expo/vector-icons';


const Card = ({ name, description, selected, onSelect,width}) => (
  <TouchableOpacity
    style={[styles.card, { width: width, backgroundColor: selected ? "#FF5733" : "#D9D9D9" }]}
    onPress={onSelect}
  >
 <Text style={[styles.cardTitle, { textAlign: 'center', paddingTop: 5 }]}>{name}</Text>
     <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function Home({ navigation, route}) {
  const [alarmActive, setAlarmActive] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const pressTimer = useRef(null);
  const userDetails = route.params ? route.params.userDetails : null;

  const handleCardSelect = (index) => {
    setSelectedCardIndex(index);
    // You can perform additional actions here if needed
  };
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
    //   openModal(); 
    }, 800);
  };

  const handleButtonPressOut = () => {
    clearTimeout(pressTimer.current);
  };

  const press = () => {
    console.log("Pressed");
    console.log("Alarm sent...");
  };
  const sendData = () => {
    console.log('Sending data...');
    // Add your logic to send data here
  };


  
  useEffect(() => {
    // console.log('HomeScreen height:', Dimensions.get('window').height);
    loadSound();

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
        // onPress={() => openModal(jsonData.message)}
      >
        <Image
          source={require("../assets/images/symbol_solider.png")}
          style={[styles.backgroundImage, { width: 200, height: 200 }]}

        />
     
      </TouchableOpacity>

      <TouchableOpacity style={styles.seconderyLeftButton} onPress={press}>
      <AntDesign name="loading1" size={30} color="white" />
        <Text style={styles.buttonLeftTextSmall}>סטוטוס</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.seconderyRightButton}
        onPress={() => navigation.navigate("Users")}
      >
        <Image
          source={require("../assets/images/icon_work.png")}
          style={styles.buttonRightImageSmall}
        />
        <Text style={styles.buttonRightTextSmall}>ס.עבודה</Text>
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
      
      <Header userDetails={userDetails }/>
      <Training />
      <PersonalTraking />

  


      <NavBar />
      <NavBar navigation={navigation} />
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
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLeftImageSmall: {
    width: 40,
    height: 40,
  },
  buttonLeftTextSmall: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  seconderyRightButton: {
    position: "absolute",
    top: 350,
    right: 40,
    width: 90,
    height: 90,
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
    backgroundColor: '#999999',
    borderRadius: 20,
    padding: 35,
    top: 25,
    width: '100%',
    height: '70%',
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
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    padding: 16,
    margin: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 26,
  },
  emergencyData: {
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontWeight: '300',
    paddingTop: 10,
    textAlign: "center",
    fontSize: 30,
  },

});
