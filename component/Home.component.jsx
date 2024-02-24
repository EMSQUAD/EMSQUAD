// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
// } from "react-native";
// import { loadSound, playSound, stopSound } from "./SoundUtils";
// import NavBar from "./Navbar";
// // import GreetingMessage from "./DateMessage";
// import Training from "./Training";
// import PersonalTraking from "./PersonalTraking";
// import Header from "./Header";
// // import { useNavigation } from "@react-navigation/native";
// export default function Home({ navigation }) {
//   const pressHandler = () => {
//     navigation.navigate('Users');
//   };

//   const [alarmActive, setAlarmActive] = useState(false);
//   const pressTimer = useRef(null);

//   const startAlarm = async () => {
//     await stopSound();
//     await loadSound();
//     setAlarmActive(true);
//     playSound();
//   };

//   const stopAlarm = async () => {
//     setAlarmActive(false);
//     await stopSound();
//   };

//   const handleButtonPressIn = () => {
//     pressTimer.current = setTimeout(() => {
//       startAlarm();
//     }, 1500);
//   };

//   const handleButtonPressOut = () => {
//     clearTimeout(pressTimer.current);
//   };

//   const press = () => {
//     console.log('Pressed');
//     console.log('Alarm sent...');
//   };

//   useEffect(() => {
//     loadSound();

//     return () => {
//       stopSound();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         onPressIn={handleButtonPressIn}
//         onPressOut={handleButtonPressOut}
//       >
//         <Image
//           source={require('../assets/images/symbol1.png')}
//           style={styles.backgroundImage}
//         />
//         <View style={styles.contentContainer}>
//           <Image
//             source={require('../assets/images/emergency.png')}
//             style={styles.buttonImage}
//           />
//           <Text style={styles.buttonText}>אירוע אמת</Text>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.seconderyLeftButton} onPress={press}>
//         <Image
//           source={require('../assets/images/kangaroo.png')}
//           style={styles.buttonLeftImageSmall}
//         />
//         <Text style={styles.buttonLeftTextSmall}>תרגיל</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.seconderyRightButton} onPress={pressHandler}>
//         <Image
//           source={require('../assets/images/team.png')}
//           style={styles.buttonRightImageSmall}
//         />
//         <Text style={styles.buttonRightTextSmall}>צוות</Text>
//       </TouchableOpacity>

//       {alarmActive && (
//         <TouchableOpacity
//           onPress={stopAlarm}
//           style={[styles.stpButtonContainer, { zIndex: 999 }]}
//         >
//           <View style={styles.stpButton}>
//             <Text style={styles.stpButtonText}>Stop Alarm</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//       <Header />
//       <Training />
//       <PersonalTraking />
//       <NavBar />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//      flex: 1,
//     backgroundColor: "#242424",
//     alignContent: "center",
//     justifyContent: "center",
//   },

//   image: {
//     marginTop: 40,
//     width: 200,
//     height: 50,
//     resizeMode: "contain",
//   },
//   button: {
//    position: "absolute",
//     width: 205,
//     height: 200,
//     top: 130,
//     left: 115,
//     borderWidth: 0,
//     borderRadius: 40,
//     borderColor: "pink",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   backgroundImage: {
//     position: "relative",
//     width: 540,
//     height: 540,
//     left: 5,
//   },
//   contentContainer: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",

//   },
//   buttonImage: {
//     left: -10,
//     width: 90,
//     height: 90,
//   },
//   buttonText: {
//     left: -10,
//     color: "white",
//     marginTop: 10,
//     fontSize: 20,
//   },
//   seconderyLeftButton: {
//     position: "absolute",
//     top: 300,
//     left: 40,
//     width: 80,
//     height: 80,
//     borderRadius: 100,
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonLeftImageSmall: {
//     width: 40,
//     height: 40,
//   },
//   buttonLeftTextSmall: {
//     color: "white",
//     fontSize: 14,
//   },
//   seconderyRightButton: {
//     position: "absolute",
//     top: 300,
//     right: 40,
//     width: 80,
//     height: 80,
//     borderRadius: 100,
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonRightImageSmall: {
//     width: 40,
//     height: 40,
//   },
//   buttonRightTextSmall: {
//     color: "white",
//     fontSize: 14,
//   },
//   stpButton: {
//     position: "absolute",
//     top: 500,
//     left: 115,
//     width: 150,
//     height: 50,
//     backgroundColor: "red",
//     padding: 12,
//     borderRadius: 8,
//   },
//   stpButtonText: {
//     color: "white",
//     fontSize: 20,
//     textAlign: "center",
//     alignItems: "center",
//   },
// });

// // export default HomeScreen;

// // ////////////////////////////////

// import React, { useState, useRef, useEffect } from "react";
// import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
// import { loadSound, playSound, stopSound } from "./SoundUtils";
// // import NavBar from "./Navbar";
// import Training from "./Training";
// import PersonalTraking from "./PersonalTraking";
// import { useHeaderHeight } from "@react-navigation/elements";
// // import Header from "./Header";

// export default function Home({ navigation }) {
//   const headerHeight = useHeaderHeight();
//   const pressHandlerUser = () => {
//     navigation.navigate("Users");
//   };

//   const [alarmActive, setAlarmActive] = useState(false);
//   const pressTimer = useRef(null);

//   const startAlarm = async () => {
//     await stopSound();
//     await loadSound();
//     setAlarmActive(true);
//     playSound();
//   };

//   const stopAlarm = async () => {
//     setAlarmActive(false);
//     await stopSound();
//   };

//   const handleButtonPressIn = () => {
//     pressTimer.current = setTimeout(() => {
//       startAlarm();
//     }, 1500);
//   };

//   const handleButtonPressOut = () => {
//     clearTimeout(pressTimer.current);
//   };

//   const press = () => {
//     console.log("Pressed");
//     console.log("Alarm sent...");
//   };

//   useEffect(() => {
//     loadSound();

//     return () => {
//       stopSound();
//     };
//   }, []);

//   return (
//     <View style={[styles.container, { paddingTop: headerHeight }]}>
//       <TouchableOpacity
//         style={styles.button}
//         onPressIn={handleButtonPressIn}
//         onPressOut={handleButtonPressOut}
//       >
//         <Image
//           source={require("../assets/images/symbol1.png")}
//           style={styles.backgroundImage}
//         />
//         <View style={styles.contentContainer}>
//           <Image
//             source={require("../assets/images/emergency.png")}
//             style={styles.buttonImage}
//           />
//           <Text style={styles.buttonText}>אירוע אמת</Text>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.seconderyLeftButton} onPress={press}>
//         <Image
//           source={require("../assets/images/kangaroo.png")}
//           style={styles.buttonLeftImageSmall}
//         />
//         <Text style={styles.buttonLeftTextSmall}>תרגיל</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.seconderyRightButton}
//         onPress={() => navigation.navigate("Users")}
//       >
//         <Image
//           source={require("../assets/images/team.png")}
//           style={styles.buttonRightImageSmall}
//         />
//         <Text style={styles.buttonRightTextSmall}>צוות</Text>
//       </TouchableOpacity>

//       {alarmActive && (
//         <TouchableOpacity
//           onPress={stopAlarm}
//           style={[styles.stpButtonContainer, { zIndex: 999 }]}
//         >
//           <View style={styles.stpButton}>
//             <Text style={styles.stpButtonText}>Stop Alarm</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//       {/* <Header /> */}
//       <Training />
//       <PersonalTraking />
//       {/* <NavBar /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#242424",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   button: {
//     position: "absolute",
//     width: 205,
//     height: 200,
//     top: 130,
//     left: 115,
//     borderWidth: 0,
//     borderRadius: 40,
//     borderColor: "pink",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   backgroundImage: {
//     position: "relative",
//     width: 540,
//     height: 540,
//     left: 5,
//   },
//   contentContainer: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonImage: {
//     left: -10,
//     width: 90,
//     height: 90,
//   },
//   buttonText: {
//     left: -10,
//     color: "white",
//     marginTop: 10,
//     fontSize: 20,
//   },
//   seconderyLeftButton: {
//     position: "absolute",
//     top: 300,
//     left: 40,
//     width: 80,
//     height: 80,
//     borderRadius: 100,
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonLeftImageSmall: {
//     width: 40,
//     height: 40,
//   },
//   buttonLeftTextSmall: {
//     color: "white",
//     fontSize: 14,
//   },
//   seconderyRightButton: {
//     position: "absolute",
//     top: 300,
//     right: 40,
//     width: 80,
//     height: 80,
//     borderRadius: 100,
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonRightImageSmall: {
//     width: 40,
//     height: 40,
//   },
//   buttonRightTextSmall: {
//     color: "white",
//     fontSize: 14,
//   },
//   stpButton: {
//     position: "absolute",
//     top: 500,
//     left: 115,
//     width: 150,
//     height: 50,
//     backgroundColor: "red",
//     padding: 12,
//     borderRadius: 8,
//   },
//   stpButtonText: {
//     color: "white",
//     fontSize: 20,
//     textAlign: "center",
//     alignItems: "center",
//   },
// });

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
import jsonData from "../db/message.json";

// const Card = ({ name, description,width, onPress}) => (
// <TouchableOpacity onPress={onPress}>
//     <View style={[styles.card, { width: width }]}>
//       <Text style={[styles.cardTitle, { textAlign: 'right' }]}>{name}</Text>
//       <Text style={[styles.cardDescription, { textAlign: 'right' }]}>{description}</Text>
//     </View>
//   </TouchableOpacity>
// );

const Card = ({ name, description, selected, onSelect,width}) => (
  <TouchableOpacity
    style={[styles.card, { width: width, backgroundColor: selected ? "#FF5733" : "#D9D9D9" }]}
    onPress={onSelect}
  >
 <Text style={[styles.cardTitle, { textAlign: 'right' }]}>{name}</Text>
     <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function Home({ navigation }) {
  const [alarmActive, setAlarmActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const pressTimer = useRef(null);


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
      openModal(); 
    }, 1500);
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
  const openModal = () => {
    // setSelectedMessage(jsonData[0]);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedMessage(null);
    setModalVisible(false);
  };


  // Function to calculate the width based on the content's length
  const calculateCardWidth = (content) => {
    const charWidth = 10; // Adjust as needed
    const minWidth = 230; // Minimum width to prevent very narrow cards
    const calculatedWidth = Math.max(content.length * charWidth, minWidth);
    return calculatedWidth;
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
        <Image
          source={require("../assets/images/kangaroo.png")}
          style={styles.buttonLeftImageSmall}
        />
        <Text style={styles.buttonLeftTextSmall}>תרגיל</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.seconderyRightButton}
        onPress={() => navigation.navigate("Users")}
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
      <Header />
      <Training />
      <PersonalTraking />

   {/* modal */}
   <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Map through the jsonData array and display each item */}
            {jsonData.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                description={item.description}
                selected={index === selectedCardIndex}
                onSelect={() => handleCardSelect(index)}
                width={calculateCardWidth(item.name)} // Pass calculated width to the Card component
              />
            ))}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#FF5733" }}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>בטל</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#4CAF50" }}
                onPress={() => sendData()}
              >
                <Text style={styles.textStyle}>שלח</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


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
    width: 40,
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 10,
    padding: 16,
    margin: 8,
    elevation: 3,
    width: '100%', // Set width to 100%
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

});
