// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";

// // const { userDetails } = route.params || {};

// // const UserListComponent = ({ showAvailable= false ,route}) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
// //   const [showAvailable, setShowAvailable] = useState(true);
//   // const { userDetails } = route.params;
//   // const currentUser = {
//   //     // id: 345679012, // Replace with the actual ID of the current user
//   //     // id: userDetails.id_use,
//   //     id: id_use
//   //   };

//   const { userDetails } = route.params || {};
//   const { id } = userDetails || {};
//   const currentUser = { id };
  
//   console.log("userDetails Listteam:", userDetails);
//   console.log("currentUser: Listteam", currentUser);
  

// const UserListComponent = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     console.log("showAvailable in useEffect:", showAvailable);
//     fetchUsersFromAPI();
//   }, [showAvailable]);

//   const fetchUsersFromAPI = async () => {
//     try {
//       // const response = await fetch('https://emsquad.onrender.com/user');
//       const response = await fetch("https://server-ems-rzdd.onrender.com/user");

//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//        const data = await response.json();
//     //   const filteredUsers = data.data.filter(
//     //     (user) => user.id_use !== currentUser.id
//     //   );

//     const filteredUsers = showAvailable
//     ? data.data.filter((user) => user.id_use !== currentUser.id && user.status_ability === "available")
//     : data.data.filter((user) => user.id_use !== currentUser.id);

//       setUsers(filteredUsers);
//       // setUsers(data.data); // Assuming the API response has a 'data' property containing the array of users
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchUsersFromAPI();
//   }, []);

  



//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="blue" />
//       </View>
//     );
//   }

//   if (!Array.isArray(users) || users.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>No users found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       {users.map((user, index) => (
//         <TouchableOpacity
//           key={`${user.id_use}_${index}`} // Use a combination of user ID and index
//           style={styles.card}
//           onPress={() => {
//             /* Handle onPress event */
//           }}
//         >
//           <Image source={{ uri: user.image }} style={styles.image} />
//           <View style={styles.userInfo}>
//             <Text
//               style={styles.userName}
//             >{`${user.first_name} ${user.last_name}`}</Text>
//             {/* <Text style={styles.userInfoText}>{`Phone: ${user.phone}`}</Text> */}
//             {/* <Text style={styles.userInfoText}>{`Status: ${user.status_ability}`}</Text>
//              */}
//             <Text
//               style={styles.userInfoText}
//             >{`סטטוס: ${user.status_ability}`}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1, // Ensure content can grow
//     width: "100%",
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     paddingTop: 30,
//     backgroundColor: "#fff",
//     flexDirection: "row-reverse",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     flexDirection: "row-reverse",
//     alignItems: "center",
//     backgroundColor: "#D9D9D9",
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     width: "100%",
//     justifyContent: "flex-end",
//   },
//   image: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     marginRight: 10,
//     marginLeft: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//     textAlign: "right",
//     paddingRight: 10,
//   },
//   userInfoText: {
//     fontSize: 16,
//     marginBottom: 3,
//     textAlign: "right",
//     paddingRight: 10,
//   },
// });

// export default UserListComponent; 
