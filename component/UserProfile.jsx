// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const UserProfileScreen = ({ route }) => {
//     const { user } = route.params;

//     return (
//         <View style={styles.container}>
//             <View style={styles.card}>
//                 <Image source={{ uri: user.image }} style={styles.image} />
//                 <View style={styles.infoContainer}>
//                     <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
//                     <Text>{`ת"ז: ${user.id_use}`}</Text>
//                     <Text>{`אישורים: ${user.certifications || 'N/A'}`}</Text>
//                     <Text>{`מספר טלפון: ${user.phone}`}</Text>
//                     <Text>{`סטטוס זמינות: ${user.status_ability}`}</Text>

//                 </View>
//             </View>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.button} onPress={() => console.log('Delete User pressed')}>
//                     <Text style={styles.buttonText}>מחיקה משתמש</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//         alignItems: 'center',
//     },
//     image: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         marginBottom: 20,
//     },
//     infoContainer: {
//         alignItems: 'center',
//     },
//     userName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         marginTop: 20,
//     },
//     button: {
//         backgroundColor: '#FE001A',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginRight: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default UserProfileScreen;

// //version 2 delete work!!
// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// const UserProfileScreen = ({ route, navigation }) => {
//     const { user } = route.params;

//     const deleteUser = async () => {
//         try {
//             // Use the server URL you provided, ensuring to append the user's id_use for deletion
//             const response = await fetch(`https://server-ems-rzdd.onrender.com/user/${user.id_use}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 // If the server responds with a non-2xx status, throw an error
//                 throw new Error('Something went wrong with the delete operation');
//             }

//             // You can process the response if needed
//             const result = await response.json();
//             console.log(result);

//             // Show a success message
//             Alert.alert('Success', 'מחיקה בוצעה בהצלחה', [{ text: 'OK' }]);

//             // Optionally navigate back or update the UI as needed
//             // navigation.goBack(); or navigation.navigate('YourScreen');
//         } catch (error) {
//             console.error('Delete operation failed:', error);
//             Alert.alert('Error', 'Failed to delete user', [{ text: 'OK' }]);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.card}>
//                 <Image source={{ uri: user.image }} style={styles.image} />
//                 <View style={styles.infoContainer}>
//                     <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
//                     <Text>{`ת"ז: ${user.id_use}`}</Text>
//                     <Text>{`אישורים: ${user.certifications || 'N/A'}`}</Text>
//                     <Text>{`מספר טלפון: ${user.phone}`}</Text>
//                     <Text>{`סטטוס זמינות: ${user.status_ability}`}</Text>
//                 </View>
//             </View>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.button} onPress={deleteUser}>
//                     <Text style={styles.buttonText}>מחיקה משתמש</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//         alignItems: 'center',
//     },
//     image: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         marginBottom: 20,
//     },
//     infoContainer: {
//         alignItems: 'center',
//     },
//     userName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         marginTop: 20,
//     },
//     button: {
//         backgroundColor: '#FE001A',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginRight: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default UserProfileScreen;

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const UserProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `https://server-ems-rzdd.onrender.com/user/${user.id_use}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong with the delete operation");
      }

      // Successful deletion
      // Alert.alert('Success', 'User deleted successfully', [
      //     { text: 'OK', onPress: () => navigation.goBack() } // Navigate back on success
      // ]);
      // Successful deletion
      Alert.alert("מחיקה", `${user.first_name} ${user.last_name} הוסר בהצלחה .`, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("List", { refresh: true });
          },
        },
      ]);
    } catch (error) {
      console.error("Delete operation failed:", error);
      Alert.alert("Error", "Failed to delete user", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: user.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text
            style={styles.userName}
          >{`${user.first_name} ${user.last_name}`}</Text>
          <Text>{`ת"ז: ${user.id_use}`}</Text>
          <Text>{`אישורים: ${user.certifications || "N/A"}`}</Text>
          <Text>{`מספר טלפון: ${user.phone}`}</Text>
          <Text>{`סטטוס זמינות: ${user.status_ability}`}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={deleteUser}>
          <Text style={styles.buttonText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FE001A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfileScreen;
