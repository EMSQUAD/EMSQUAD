// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   Dimensions,
//   Modal,
//   Alert,
//   Platform,
// } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import { loadSound, playSound, stopSound } from "./SoundUtils";
// import Training from "./Training";
// import PersonalTraking from "./PersonalTraking";
// import Header from "./Header";
// import NavBar from "./Navbar";
// import jsonData from "../server/db/message.json";

// const Card = ({ name, description, selected, onSelect, width }) => (
//   <TouchableOpacity
//     style={[
//       styles.card,
//       { width: width, backgroundColor: selected ? "#FF5733" : "#D9D9D9" },
//     ]}
//     onPress={onSelect}
//   >
//     <Text style={[styles.cardTitle, { textAlign: "center", paddingTop: 5 }]}>
//       {name}
//     </Text>
//     <Text style={styles.cardDescription}>{description}</Text>
//   </TouchableOpacity>
// );

// export const sendData = async () => {
//   try {
//     console.log("Sending data...");
//     await pushDataNotifications();
//     console.log("Push notification sent successfully");
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//     // Handle error here
//   }
// };

// const pushDataNotifications = async () => {
//   console.log("Registering for push notifications...");
//   await registerForPushNotificationsAsync();
// };

// const registerForPushNotificationsAsync = async () => {
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       throw new Error("Failed to get push token for push notification!");
//     }
//     const expoPushToken = (await Notifications.getExpoPushTokenAsync({ projectId: '1d5e21f2-3fb7-4320-bfdb-cb6459067336' })).data;
//     console.log("Expo Push Token:", expoPushToken);

//     // Fetch user data
//     const usersResponse = await fetch("https://server-ems-rzdd.onrender.com/user");
//     if (!usersResponse.ok) {
//       throw new Error("Failed to fetch users' data");
//     }
//     const responseData = await usersResponse.json();
//     const usersData = responseData.data; // Access the 'data' property
//     console.log("Users Data:", usersData);

//     // Ensure usersData is an array
//     if (!Array.isArray(usersData)) {
//       throw new Error("Users' data is not in the expected format (not an array)");
//     }

//     // Filter out empty strings and undefined values
//     const usersTokens = usersData
//       .map(user => user.expoPushToken)
//       .filter(token => typeof token === "string" && token.trim().length > 0);

//     console.log("Filtered Users Expo Push Tokens:", usersTokens);

//     // Send push notifications to valid tokens
//     await Promise.all(usersTokens.map(sendNotification));
//     console.log("All notifications sent successfully");
//   } else {
//     throw new Error("Must use physical device for Push Notifications");
//   }
// };



// const sendNotification = async (expoPushToken) => {
//   console.log("Sending push notification to:", expoPushToken);
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "My first push notification!",
//     body: "This is my first push notification made with expo rn app",
//   };
//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       host: "exp.host",
//       accept: "application/json",
//       "accept-encoding": "gzip, deflate",
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
//   console.log("Notification sent to:", expoPushToken);
// };

// export default function Home({ navigation, route }) {
//   const [alarmActive, setAlarmActive] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
//   const pressTimer = useRef(null);
//   const { userDetails } = route.params;

//   const handleCardSelect = (index) => {
//     setSelectedCardIndex(index);
//   };

//   const stopAlarm = async () => {
//     setAlarmActive(false);
//     await stopSound();
//   };

//   const handleButtonPressIn = () => {
//     pressTimer.current = setTimeout(() => {
//       openModal();
//     }, 800);
//   };

//   const handleButtonPressOut = () => {
//     clearTimeout(pressTimer.current);
//   };

//   const press = () => {
//     console.log("Pressed");
//     console.log("Alarm sent...");
//   };

//   useEffect(() => {
//     return () => {
//       stopSound();
//     };
//   }, []);

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setSelectedMessage(null);
//     setModalVisible(false);
//   };

//   const calculateCardWidth = (content) => {
//     const charWidth = 10;
//     const minWidth = 380;
//     const calculatedWidth = Math.max(content.length * charWidth, minWidth);
//     return calculatedWidth;
//   };

//   return (
//     <View style={styles.container}>
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
//         onPress={() =>
//           navigation.navigate("List", { userDetails: userDetails })
//         }
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

//       <Header userDetails={userDetails} />
//       <Training />
//       <PersonalTraking />

//       <Modal animationType="slide" transparent={true} visible={modalVisible}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             {jsonData.map((item, index) => (
//               <Card
//                 style={styles.emergencyData}
//                 key={index}
//                 name={item.name}
//                 description={item.description}
//                 selected={index === selectedCardIndex}
//                 onSelect={() => handleCardSelect(index)}
//                 width={calculateCardWidth(item.name)}
//               />
//             ))}
//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 style={{ ...styles.openButton, backgroundColor: "#FF0000" }}
//                 onPress={() => pushDataNotifications()} // Wrap pushDataNotifications inside an arrow function
//               >
//                 <Text style={styles.textStyle}>שלח</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{ ...styles.openButton, backgroundColor: "#FFA800" }}
//                 onPress={closeModal}
//               >
//                 <Text style={styles.textStyle}>בטל</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <NavBar
//         navigation={navigation}
//         route={{ params: { userDetails: userDetails } }}
//       />
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
//     top: 200,
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
//     top: 350,
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
//     top: 350,
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
//     top: 600,
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

//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 0,
//   },

//   modalView: {
//     margin: 0,
//     backgroundColor: "#999999",
//     borderRadius: 20,
//     padding: 35,
//     top: 25,
//     width: "100%",
//     height: "70%",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },

//   modalText: {
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#D9D9D9",
//     borderRadius: 15,
//     padding: 16,
//     margin: 8,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 26,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 26,
//   },
//   emergencyData: {
//     textAlign: "center",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//     height: 100,
//   },
//   openButton: {
//     backgroundColor: "#F194FF",
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     margin: 10,
//     width: 160,
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "300",
//     paddingTop: 10,
//     textAlign: "center",
//     fontSize: 30,
//   },
// });






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
import updateAllLiveEvents from "./updateLiveEvent";

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
      const response = await fetch('https://server-ems-rzdd.onrender.com/user');
      const jsonResponse = await response.json();
      
      if (jsonResponse && Array.isArray(jsonResponse.data)) {
          const updatePromises = jsonResponse.data.filter(user => user.liveEvent === "No").map(user => {
              // Log the first name and liveEvent field of each user being updated
              console.log(`Updating user: ${user.first_name}, liveEvent: ${user.liveEvent}`);

              return fetch(`https://server-ems-rzdd.onrender.com/user/${user._id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      liveEvent: "Yes",
                  }),
              });
          });
          
          await Promise.all(updatePromises);
          console.log('All applicable users updated successfully.');
          console.log(`Updating user: ${user.first_name}, liveEvent: ${user.liveEvent}`);

      } else {
          console.log('No users need updating or unexpected response structure.');
      }
  } catch (error) {
      console.error('Error updating users:', error);
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

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

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

      <TouchableOpacity style={styles.seconderyLeftButton} onPress={press}>
        <Image
          source={require("../assets/images/kangaroo.png")}
          style={styles.buttonLeftImageSmall}
        />
        <Text style={styles.buttonLeftTextSmall}>תרגיל</Text>
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
                onPress={updateAllLiveEvents} 
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

