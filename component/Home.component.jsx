// ////
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
// } from "react-native";
// import * as Notifications from "expo-notifications";
// import { loadSound, playSound, stopSound } from "./SoundUtils";
// // import { useHeaderHeight } from "@react-navigation/elements";
// import Training from "./Training";
// import PersonalTraking from "./PersonalTraking";
// import Header from "./Header";
// import NavBar from "./Navbar";
// import jsonData from "../server/db/message.json";
// // import * as Notifications from "expo-notifications";

// // const Card = ({ name, description,width, onPress}) => (
// // <TouchableOpacity onPress={onPress}>
// //     <View style={[styles.card, { width: width }]}>
// //       <Text style={[styles.cardTitle, { textAlign: 'right' }]}>{name}</Text>
// //       <Text style={[styles.cardDescription, { textAlign: 'right' }]}>{description}</Text>
// //     </View>
// //   </TouchableOpacity>
// // );

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

// export default function Home({ navigation, route }) {
//   const [alarmActive, setAlarmActive] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
//   const pressTimer = useRef(null);
//   const { userDetails } = route.params || {}; // console.log('userDetails in Home:', userDetails);
//   // const handleCardSelect = (index) => {
//   //   setSelectedCardIndex(index);

//     ////////////////////////try//////////////////////
//     const handleCardSelect = async (index) => {
//       setSelectedCardIndex(index);

//       // if (userDetails && userDetails.type_user === "Comander") {
//       //   try {
//       //     const response = await fetch(
//       //       "https://server-ems-rzdd.onrender.com/sendNotification",
//       //       {
//       //         method: "POST",
//       //         headers: {
//       //           "Content-Type": "application/json",
//       //         },
//       //         body: JSON.stringify({
//       //           title: "Your Notification Title",
//       //           body: "Your Notification Body",
//       //         }),
//       //       }
//       //     );

//       //     if (!response.ok) {
//       //       throw new Error("Failed to send notification");
//       //     }

//       //     const responseData = await response.json();
//       //     console.log("Notification response:", responseData);
//       //   } catch (error) {
//       //     console.error("Error sending notification:", error);
//       //   }
//       // }
//     // };

//     //////////////////////try////////////////////////

//     // console.log('Selected card index:', index);

//     // You can perform additional actions here if needed
//     // };

//     // const startAlarm = async () => {
//     //   await stopSound();
//     //   await loadSound();
//     //   setAlarmActive(true);
//     //   playSound();
//     // };

//     const stopAlarm = async () => {
//       setAlarmActive(false);
//       await stopSound();
//     };

//     const handleButtonPressIn = () => {
//       pressTimer.current = setTimeout(() => {
//         // startAlarm();
//         openModal();
//       }, 800);
//     };

//     const handleButtonPressOut = () => {
//       clearTimeout(pressTimer.current);
//     };

//     const press = () => {
//       console.log("Pressed");
//       console.log("Alarm sent...");
//     };

//     const sendData = async () => {
//       try {
//         console.log("Sending data...");

//         // Fetch all users from the provided endpoint
//         const response = await fetch(
//           "https://server-ems-rzdd.onrender.com/user"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const responseData = await response.json();

//         // Log the response to inspect its structure
//         console.log("Response from /user endpoint:", responseData);

//         // Check if the response contains data array
//         if (!responseData.data || !Array.isArray(responseData.data)) {
//           throw new Error("Invalid response: data is not an array");
//         }

//         const data = responseData.data;

//         // Filter soldiers
//         const soldiers = data.filter((user) => user.type_user === "Soldier");

//         // Get commander
//         const commander = data.find((user) => user.type_user === "Comander");

//         if (!commander) {
//           throw new Error("Commander not found");
//         }

//         // Prepare notifications for each soldier
//         const notifications = soldiers.map((soldier) => ({
//           to: soldier.push_token, // Push token of the soldier
//           sound: "default",
//           title: `Alert from Commander ${commander.first_name} ${commander.last_name}`,
//           body: `Attention, ${soldier.first_name}!`,
//           data: { data: "goes here" }, // Optional data payload
//         }));

//         // Send notifications
//         // Assuming Notifications is properly defined
//         for (const notification of notifications) {
//           await Notifications.scheduleNotificationAsync({
//             content: {
//               title: notification.title,
//               body: notification.body,
//             },
//             trigger: null, // Send immediately
//           });
//         }

//         console.log("Alerts sent to all soldiers.");
//         Alert.alert("התראה נשלחה בהצלחה");
//       } catch (error) {
//         console.error("Error sending data:", error);
//         Alert.alert("Error", "Failed to send alerts to soldiers");
//       }
//     };

//     const openModal = () => {
//       // setSelectedMessage(jsonData[0]);
//       setModalVisible(true);
//     };

//     // Function to close the modal
//     const closeModal = () => {
//       setSelectedMessage(null);
//       setModalVisible(false);
//     };

//     // Function to calculate the width based on the content's length
//     const calculateCardWidth = (content) => {
//       const charWidth = 10; // Adjust as needed
//       const minWidth = 380; // Minimum width to prevent very narrow cards
//       const calculatedWidth = Math.max(content.length * charWidth, minWidth);
//       return calculatedWidth;
//     };

//     useEffect(() => {
//       // console.log('HomeScreen height:', Dimensions.get('window').height);
//       // loadSound();

//       return () => {
//         stopSound();
//       };
//     }, []);
//     // console.log("userDetails:", userDetails);
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.button}
//           onPressIn={handleButtonPressIn}
//           onPressOut={handleButtonPressOut}
//           // onPress={() => openModal(jsonData.message)}
//         >
//           <Image
//             source={require("../assets/images/symbol1.png")}
//             style={styles.backgroundImage}
//           />
//           <View style={styles.contentContainer}>
//             <Image
//               source={require("../assets/images/emergency.png")}
//               style={styles.buttonImage}
//             />
//             <Text style={styles.buttonText}>אירוע אמת</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.seconderyLeftButton} onPress={press}>
//           <Image
//             source={require("../assets/images/kangaroo.png")}
//             style={styles.buttonLeftImageSmall}
//           />
//           <Text style={styles.buttonLeftTextSmall}>תרגיל</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.seconderyRightButton}
//           onPress={() => navigation.navigate("List", { userDetails })}
//         >
//           <Image
//             source={require("../assets/images/team.png")}
//             style={styles.buttonRightImageSmall}
//           />
//           <Text style={styles.buttonRightTextSmall}>צוות</Text>
//         </TouchableOpacity>

//         {alarmActive && (
//           <TouchableOpacity
//             onPress={stopAlarm}
//             style={[styles.stpButtonContainer, { zIndex: 999 }]}
//           >
//             <View style={styles.stpButton}>
//               <Text style={styles.stpButtonText}>Stop Alarm</Text>
//             </View>
//           </TouchableOpacity>
//         )}

//         <Header userDetails={userDetails} />
//         <Training />
//         <PersonalTraking />

//         {/* modal */}
//         <Modal animationType="slide" transparent={true} visible={modalVisible}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               {/* Map through the jsonData array and display each item */}
//               {jsonData.map((item, index) => (
//                 <Card
//                   style={styles.emergencyData}
//                   key={index}
//                   name={item.name}
//                   description={item.description}
//                   selected={index === selectedCardIndex}
//                   onSelect={() => handleCardSelect(index)}
//                   width={calculateCardWidth(item.name)} // Pass calculated width to the Card component
//                 />
//               ))}
//               <View style={styles.buttonRow}>
//                 <TouchableOpacity
//                   style={{ ...styles.openButton, backgroundColor: "#FF0000" }}
//                   onPress={() => sendData()}
//                 >
//                   <Text style={styles.textStyle}>שלח</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{ ...styles.openButton, backgroundColor: "#FFA800" }}
//                   onPress={closeModal}
//                 >
//                   <Text style={styles.textStyle}>בטל</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>

//         {/* <NavBar /> */}
//         {/* <NavBar navigation={navigation}  />
//          */}
//         <NavBar
//           navigation={navigation}
//           route={{ params: { userDetails: userDetails } }}
//         />
//       </View>
//     );
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#242424",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     button: {
//       position: "absolute",
//       width: 205,
//       height: 200,
//       top: 200,
//       left: 115,
//       borderWidth: 0,
//       borderRadius: 40,
//       borderColor: "pink",
//       justifyContent: "center",
//       alignItems: "center",
//       overflow: "hidden",
//     },
//     backgroundImage: {
//       position: "relative",
//       width: 540,
//       height: 540,
//       left: 5,
//     },
//     contentContainer: {
//       position: "absolute",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     buttonImage: {
//       left: -10,
//       width: 90,
//       height: 90,
//     },
//     buttonText: {
//       left: -10,
//       color: "white",
//       marginTop: 10,
//       fontSize: 20,
//     },
//     seconderyLeftButton: {
//       position: "absolute",
//       top: 350,
//       left: 40,
//       width: 80,
//       height: 80,
//       borderRadius: 100,
//       backgroundColor: "black",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     buttonLeftImageSmall: {
//       width: 40,
//       height: 40,
//     },
//     buttonLeftTextSmall: {
//       color: "white",
//       fontSize: 14,
//     },
//     seconderyRightButton: {
//       position: "absolute",
//       top: 350,
//       right: 40,
//       width: 80,
//       height: 80,
//       borderRadius: 100,
//       backgroundColor: "black",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     buttonRightImageSmall: {
//       width: 40,
//       height: 40,
//     },
//     buttonRightTextSmall: {
//       color: "white",
//       fontSize: 14,
//     },
//     stpButton: {
//       position: "absolute",
//       top: 600,
//       left: 115,
//       width: 150,
//       height: 50,
//       backgroundColor: "red",
//       padding: 12,
//       borderRadius: 8,
//     },
//     stpButtonText: {
//       color: "white",
//       fontSize: 20,
//       textAlign: "center",
//       alignItems: "center",
//     },

//     centeredView: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       marginTop: 0,
//     },

//     modalView: {
//       margin: 0,
//       backgroundColor: "#999999",
//       borderRadius: 20,
//       padding: 35,
//       top: 25,
//       width: "100%",
//       height: "70%",
//       alignItems: "center",
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 3.84,
//       elevation: 5,
//     },

//     modalText: {
//       marginBottom: 30,
//       textAlign: "center",
//     },
//     card: {
//       backgroundColor: "#D9D9D9",
//       borderRadius: 15,
//       padding: 16,
//       margin: 8,
//       elevation: 3,
//     },
//     cardTitle: {
//       fontSize: 26,
//       fontWeight: "bold",
//     },
//     cardDescription: {
//       fontSize: 26,
//     },
//     emergencyData: {
//       textAlign: "center",
//     },
//     buttonRow: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginTop: 10,
//       height: 100,
//     },
//     openButton: {
//       backgroundColor: "#F194FF",
//       borderRadius: 20,
//       padding: 10,
//       elevation: 2,
//       margin: 10,
//       width: 160,
//     },
//     textStyle: {
//       color: "white",
//       fontWeight: "300",
//       paddingTop: 10,
//       textAlign: "center",
//       fontSize: 30,
//     },
//   });
// }

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
} from "react-native";
import * as Notifications from "expo-notifications";
import { loadSound, playSound, stopSound } from "./SoundUtils";
// import { useHeaderHeight } from "@react-navigation/elements";
import Training from "./Training";
import PersonalTraking from "./PersonalTraking";
import Header from "./Header";
import NavBar from "./Navbar";
import jsonData from "../server/db/message.json";

// const Card = ({ name, description,width, onPress}) => (
// <TouchableOpacity onPress={onPress}>
//     <View style={[styles.card, { width: width }]}>
//       <Text style={[styles.cardTitle, { textAlign: 'right' }]}>{name}</Text>
//       <Text style={[styles.cardDescription, { textAlign: 'right' }]}>{description}</Text>
//     </View>
//   </TouchableOpacity>
// );

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

export default function Home({ navigation, route }) {
  const [alarmActive, setAlarmActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const pressTimer = useRef(null);
  const { userDetails } = route.params;
  // console.log('userDetails in Home:', userDetails);
  const handleCardSelect = (index) => {
    setSelectedCardIndex(index);
    // You can perform additional actions here if needed
  };
  // const startAlarm = async () => {
  //   await stopSound();
  //   await loadSound();
  //   setAlarmActive(true);
  //   playSound();
  // };

  const stopAlarm = async () => {
    setAlarmActive(false);
    await stopSound();
  };

  const handleButtonPressIn = () => {
    pressTimer.current = setTimeout(() => {
      // startAlarm();
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

  // const sendData = async () => {
  //   try {
  //     console.log("Sending data...");

  //     // Fetch all users from the provided endpoint
  //     const response = await fetch("https://server-ems-rzdd.onrender.com/user");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch users");
  //     }
  //     const responseData = await response.json();

  //     // Log the response to inspect its structure
  //     console.log("Response from /user endpoint:", responseData);

  //     // Check if the response contains data array
  //     if (!responseData.data || !Array.isArray(responseData.data)) {
  //       throw new Error("Invalid response: data is not an array");
  //     }

  //     const data = responseData.data;

  //     // Filter soldiers
  //     const soldiers = data.filter((user) => user.type_user === "Soldier");

  //     // Get commander
  //     const commander = data.find((user) => user.type_user === "Comander");

  //     if (!commander) {
  //       throw new Error("Commander not found");
  //     }

  //     // Prepare notifications for each soldier
  //     const notifications = soldiers.map((soldier) => ({
  //       to: soldier.push_token, // Push token of the soldier
  //       sound: "default",
  //       title: `Alert from Commander ${commander.first_name} ${commander.last_name}`,
  //       body: `Attention, ${soldier.first_name}!`,
  //       data: { data: "goes here" }, // Optional data payload
  //     }));

  //     // Send notifications
  //     // Assuming Notifications is properly defined
  //     for (const notification of notifications) {
  //       await Notifications.scheduleNotificationAsync({
  //         content: {
  //           title: notification.title,
  //           body: notification.body,
  //         },
  //         trigger: null, // Send immediately
  //       });
  //     }

  //     console.log("Alerts sent to all soldiers.");
  //     Alert.alert("התראה נשלחה בהצלחה");
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //     Alert.alert("Error", "Failed to send alerts to soldiers");
  //   }
  // };


// Update the sendData function in your client code
// Update the sendData function in your client code
const sendData = async () => {
  try {
    console.log("Sending data...");

    // Make a POST request to the server endpoint to send notifications to all users
    const response = await fetch("https://server-ems-rzdd.onrender.com/sendNotificationToAll", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Your Notification Title', // Specify your notification title
        body: 'Your Notification Body',   // Specify your notification body
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notifications');
    }

    const responseData = await response.json();

    // Log the response from the server
    console.log('Response from /sendNotificationToAll endpoint:', responseData);

    // Display success message to the user
    Alert.alert("התראה נשלחה בהצלחה");
  } catch (error) {
    console.error('Error sending data:', error);
    Alert.alert('Error', 'Failed to send notifications');
  }
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
    const minWidth = 380; // Minimum width to prevent very narrow cards
    const calculatedWidth = Math.max(content.length * charWidth, minWidth);
    return calculatedWidth;
  };

  useEffect(() => {
    // console.log('HomeScreen height:', Dimensions.get('window').height);
    // loadSound();

    return () => {
      stopSound();
    };
  }, []);
  // console.log("userDetails:", userDetails);
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

      {/* modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Map through the jsonData array and display each item */}
            {jsonData.map((item, index) => (
              <Card
                style={styles.emergencyData}
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
                style={{ ...styles.openButton, backgroundColor: "#FF0000" }}
                onPress={() => sendData()}
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

      {/* <NavBar /> */}
      {/* <NavBar navigation={navigation}  />
       */}
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
